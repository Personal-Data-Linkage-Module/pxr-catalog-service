/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/**
 *
 *
 *
 * $Date$
 * $Revision$
 * $Author$
 *
 * TEMPLATE VERSION :  76463
 */

/* eslint-disable */
import { Connection, InsertResult, UpdateResult } from 'typeorm';
import AppError from '../common/AppError';
import { ResponseCode } from '../common/ResponseCode';
import NameSpaceServiceDto from './dto/NameSpaceServiceDto';
import NameSpaceRepository from '../repositories/postgres/NameSpaceRepository';
import NameSpaceDomain from '../domains/NameSpaceDomain';
import CatalogRepository from '../repositories/postgres/CatalogRepository';
import CatalogDomain from '../domains/CatalogDomain';
import OperatorDomain from '../domains/OperatorDomain';
import NameSpaceGetResDto, { NameSpaceDto } from '../resources/dto/NameSpaceGetResDto';
import NameSpaceGetByNsIdResDto from '../resources/dto/NameSpaceGetByNsIdResDto';
import NameSpacePostResDto from '../resources/dto/NameSpacePostResDto';
import NameSpacePutResDto from '../resources/dto/NameSpacePutResDto';
import NameSpaceDeleteResDto from '../resources/dto/NameSpaceDeleteResDto';
/* eslint-enable */
import Config from '../common/Config';
import CatalogItemDomain from '../domains/CatalogItemDomain';
import CatalogItemRepository from '../repositories/postgres/CatalogItemRepository';
const Message = Config.ReadConfig('./config/message.json');

/**
 * ネームスペース操作サービス
 */
export default class NameSpaceService {
    /**
     * ネームスペース取得
     * @param connection
     * @param dto
     */
    public async getNameSpace (connection: Connection, dto: NameSpaceServiceDto): Promise<{}> {
        // カタログ名の存在確認
        const catalogDomain = new CatalogDomain();
        const catalogRepository = new CatalogRepository(connection);
        const catalogInfoCount = await catalogRepository.getRecordCount(null, catalogDomain);
        if (catalogInfoCount <= 0) {
            // カタログ名が存在しない場合、エラーをthrow
            throw new AppError(Message.NOT_ACTIVATE, ResponseCode.UNAUTHORIZED);
        }

        // 対象ネームスペースを取得
        const nsDomain = new NameSpaceDomain();
        nsDomain.name = dto.getNs();
        const nsRepository = new NameSpaceRepository(connection);
        const list = await nsRepository.getRecord(null, nsDomain);
        if (!list || list.length <= 0) {
            // 対象ネームスペースが存在しない場合、エラーをthrow
            throw new AppError(Message.NAMESPACE_NOT_FOUND, ResponseCode.NOT_FOUND);
        }

        // レスポンスを返す
        const res: NameSpaceGetResDto = new NameSpaceGetResDto();
        for (const info of list) {
            // descriptionを生成
            let description = null;
            try {
                description = JSON.parse(info.description);
            } catch (ex) {
                description = info.description;
            }
            const nsInfo = new NameSpaceDto();
            nsInfo.id = info.id;
            nsInfo.ns = info.name;
            nsInfo.description = description;
            res.list.push(nsInfo);
        }
        return res.getAsJson();
    }

    /**
     * ネームスペース取得
     * @param connection
     * @param dto
     */
    public async getNameSpaceByNsId (connection: Connection, dto: NameSpaceServiceDto): Promise<{}> {
        // カタログ名の存在確認
        const catalogDomain = new CatalogDomain();
        const catalogRepository = new CatalogRepository(connection);
        const catalogInfoCount = await catalogRepository.getRecordCount(null, catalogDomain);
        if (catalogInfoCount <= 0) {
            // カタログ名が存在しない場合、エラーをthrow
            throw new AppError(Message.NOT_ACTIVATE, ResponseCode.UNAUTHORIZED);
        }

        // 対象ネームスペースを取得
        const nsDomain = new NameSpaceDomain();
        nsDomain.id = dto.getNsId();
        const nsRepository = new NameSpaceRepository(connection);
        const ret = await nsRepository.getRecordById(null, nsDomain);
        if (!ret) {
            // 対象ネームスペースが存在しない場合、エラーをthrow
            throw new AppError(Message.NAMESPACE_NOT_FOUND, ResponseCode.NOT_FOUND);
        }
        // descriptionを生成
        let description = null;
        try {
            description = JSON.parse(ret.description);
        } catch (ex) {
            description = ret.description;
        }
        // レスポンスを返す
        const res: NameSpaceGetByNsIdResDto = new NameSpaceGetByNsIdResDto();
        res.id = ret.id;
        res.ns = ret.name;
        res.description = description;

        // レスポンスを返す
        return res.getAsJson();
    }

    /**
     * ネームスペース追加
     * @param connection
     * @param dto
     */
    public async insertNameSpace (connection: Connection, dto: NameSpaceServiceDto): Promise<{}> {
        // カタログ名の存在確認
        const catalogDomain = new CatalogDomain();
        const catalogRepository = new CatalogRepository(connection);
        const catalogInfoCount = await catalogRepository.getRecordCount(null, catalogDomain);
        if (catalogInfoCount <= 0) {
            // カタログ名が存在しない場合、エラーをthrow
            throw new AppError(Message.NOT_ACTIVATE, ResponseCode.UNAUTHORIZED);
        }

        // オペレータ情報を取得
        const operator: OperatorDomain = dto.getOperator();

        // descriptionを生成
        let description: string = dto.getDescription();
        if (Array.isArray(description)) {
            const descriptionList: {}[] = description;
            const tempList: {} = {};
            for (let index = 0; index < descriptionList.length; index++) {
                const keyValue = this.getKeyValueObject(descriptionList[index]);
                if (!keyValue) {
                    continue;
                }
                if (tempList[descriptionList[index]['key']]) {
                    if (!Array.isArray(tempList[descriptionList[index]['key']])) {
                        const tempValue = tempList[descriptionList[index]['key']];
                        tempList[descriptionList[index]['key']] = [];
                        tempList[descriptionList[index]['key']].push(tempValue);
                    }
                    tempList[descriptionList[index]['key']].push(keyValue[descriptionList[index]['key']]);
                } else {
                    tempList[descriptionList[index]['key']] = keyValue[descriptionList[index]['key']];
                }
            }
            description = JSON.stringify(tempList);
        }

        // ネームスペースを追加
        let ret: InsertResult = null;
        await connection.transaction(async em => {
            // 既存に同一ネームスペースが存在するかチェック
            let nsDomain = new NameSpaceDomain();
            nsDomain.name = dto.getNs();
            const nsRepository = new NameSpaceRepository(connection);
            const nsId = await nsRepository.getNamespaceId(em, nsDomain);
            if (nsId > 0) {
                // カタログ名が存在する場合、エラーをthrow
                throw new AppError(Message.NAMESPACE_ALREADY, ResponseCode.CONFLICT);
            }

            nsDomain = new NameSpaceDomain();
            nsDomain.type = dto.getType();
            nsDomain.name = dto.getNs();
            nsDomain.description = description;
            nsDomain.attributes = null;
            nsDomain.updatedBy = operator.loginId;
            ret = await nsRepository.insertRecord(em, nsDomain);
        }).catch(err => {
            throw err;
        });

        // descriptionを生成
        let resDescription = null;
        try {
            resDescription = JSON.parse(description);
        } catch (ex) {
            resDescription = description;
        }
        // レスポンスを返す
        const res: NameSpacePostResDto = new NameSpacePostResDto();
        res.id = Number(ret.identifiers[0].id);
        res.ns = dto.getNs();
        res.description = resDescription;
        return res.getAsJson();
    }

    /**
     * ネームスペース更新
     * @param connection
     * @param dto
     */
    public async updateNameSpace (connection: Connection, dto: NameSpaceServiceDto): Promise<{}> {
        // カタログ名の存在確認
        const catalogDomain = new CatalogDomain();
        const catalogRepository = new CatalogRepository(connection);
        const catalogInfoCount = await catalogRepository.getRecordCount(null, catalogDomain);
        if (catalogInfoCount <= 0) {
            // カタログ名が存在しない場合、エラーをthrow
            throw new AppError(Message.NOT_ACTIVATE, ResponseCode.UNAUTHORIZED);
        }

        // オペレータ情報を取得
        const operator: OperatorDomain = dto.getOperator();

        // descriptionを生成
        let description: string = dto.getDescription();
        if (Array.isArray(description)) {
            const descriptionList: {}[] = description;
            const tempList: {} = {};
            for (let index = 0; index < descriptionList.length; index++) {
                const keyValue = this.getKeyValueObject(descriptionList[index]);
                if (!keyValue) {
                    continue;
                }
                if (tempList[descriptionList[index]['key']]) {
                    if (!Array.isArray(tempList[descriptionList[index]['key']])) {
                        const tempValue = tempList[descriptionList[index]['key']];
                        tempList[descriptionList[index]['key']] = [];
                        tempList[descriptionList[index]['key']].push(tempValue);
                    }
                    tempList[descriptionList[index]['key']].push(keyValue[descriptionList[index]['key']]);
                } else {
                    tempList[descriptionList[index]['key']] = keyValue[descriptionList[index]['key']];
                }
            }
            description = JSON.stringify(tempList);
        }

        // ネームスペースを更新
        await connection.transaction(async em => {
            const nsDomain = new NameSpaceDomain();
            nsDomain.id = dto.getNsId();
            nsDomain.type = dto.getType();
            nsDomain.name = dto.getNs();
            nsDomain.description = description;
            nsDomain.updatedBy = operator.loginId;
            const nsRepository = new NameSpaceRepository(connection);
            await nsRepository.updateRecord(em, nsDomain);
        }).catch(err => {
            throw err;
        });

        // descriptionを生成
        let resDescription = null;
        try {
            resDescription = JSON.parse(description);
        } catch (ex) {
            resDescription = description;
        }
        // レスポンスを返す
        const res: NameSpacePutResDto = new NameSpacePutResDto();
        res.id = dto.getNsId();
        res.ns = dto.getNs();
        res.description = resDescription;
        return res.getAsJson();
    }

    /**
     * ネームスペース削除
     * @param connection
     * @param dto
     */
    public async deleteNameSpace (connection: Connection, dto: NameSpaceServiceDto): Promise<{}> {
        // カタログ名の存在確認
        const catalogDomain = new CatalogDomain();
        const catalogRepository = new CatalogRepository(connection);
        const catalogInfoCount = await catalogRepository.getRecordCount(null, catalogDomain);
        if (catalogInfoCount <= 0) {
            // カタログ名が存在しない場合、エラーをthrow
            throw new AppError(Message.NOT_ACTIVATE, ResponseCode.UNAUTHORIZED);
        }

        // オペレータ情報を取得
        const operator: OperatorDomain = dto.getOperator();

        // 本ネームスペースを使用しているカタログが存在するか確認
        const catalogItemDomain = new CatalogItemDomain();
        catalogItemDomain.nsId = dto.getNsId();
        const catalogItemRepository = new CatalogItemRepository(connection);
        const usedCount = await catalogItemRepository.getRecordCountByNsId(null, catalogItemDomain);
        if (usedCount > 0) {
            // カタログで対象ネームスペースが使用中の場合、エラーをthrow
            throw new AppError(Message.NAMESPACE_USED, ResponseCode.CONFLICT);
        }

        // ネームスペースを削除
        await connection.transaction(async em => {
            const nsDomain = new NameSpaceDomain();
            nsDomain.id = dto.getNsId();
            nsDomain.updatedBy = operator.loginId;
            const nsRepository = new NameSpaceRepository(connection);
            await nsRepository.deleteRecord(em, nsDomain);
        }).catch(err => {
            throw err;
        });

        // レスポンスを返す
        const ret: NameSpaceDeleteResDto = new NameSpaceDeleteResDto();
        ret.nsId = dto.getNsId();
        return ret;
    }

    /**
     * KeyValueオブジェクト取得
     * @param template
     */
    private getKeyValueObject (template: {} | {}[]): {} {
        if (!template) {
            return null;
        }
        if (Array.isArray(template['value'])) {
            const templateList: {}[] = template['value'];
            const resObject = {};
            for (let index = 0; index < templateList.length; index++) {
                const value = this.getKeyValueObject(templateList[index]);
                resObject[templateList[index]['key']] = value[templateList[index]['key']];
            }
            return {
                [template['key']]: resObject
            };
        } else {
            const value = template['value'];
            return {
                [template['key']]: value
            };
        }
    }
}
