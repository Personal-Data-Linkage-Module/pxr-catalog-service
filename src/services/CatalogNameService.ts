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
import CatalogNameServiceDto from './dto/CatalogNameServiceDto';
import CatalogRepository from '../repositories/postgres/CatalogRepository';
import CatalogDomain from '../domains/CatalogDomain';
import OperatorDomain from '../domains/OperatorDomain';
import CatalogCodeScopeRepository from '../repositories/postgres/CatalogCodeScopeRepository';
import CatalogCodeScopeDomain from '../domains/CatalogCodeScopeDomain';
import CatalogNameGetResDto from '../resources/dto/CatalogNameGetResDto';
import CatalogNamePostResDto from '../resources/dto/CatalogNamePostResDto';
import CatalogNamePutResDto from '../resources/dto/CatalogNamePutResDto';
/* eslint-enable */
import * as uuid from 'uuid';
import Config from '../common/Config';
const Message = Config.ReadConfig('./config/message.json');
const Configure = Config.ReadConfig('./config/config.json');

/**
 * カタログ名称操作サービス
 */
export default class CatalogNameService {
    /**
     * カタログ名称取得
     * @param connection
     * @param dto
     */
    public async getCatalogName (connection: Connection, dto: CatalogNameServiceDto): Promise<{}> {
        // カタログ名称を取得
        const catalogDomain = new CatalogDomain();
        const catalogRepository = new CatalogRepository(connection);
        const catalogInfo = await catalogRepository.getRecord(null, catalogDomain);
        if (!catalogInfo) {
            // 対象カタログコード範囲が存在しない場合
            throw new AppError(Message.NOT_ACTIVATE, ResponseCode.UNAUTHORIZED);
        }
        // レスポンスを返す
        const res: CatalogNameGetResDto = new CatalogNameGetResDto();
        res.id = catalogInfo.id;
        res.name = catalogInfo.name;
        res.description = catalogInfo.description;
        res.extName = catalogInfo.extName;
        return res.getAsJson();
    }

    /**
     * アクティベート
     * @param connection
     * @param dto
     */
    public async insertCatalogName (connection: Connection, dto: CatalogNameServiceDto): Promise<{}> {
        // カタログ名の存在確認
        const catalogDomain = new CatalogDomain();
        const catalogRepository = new CatalogRepository(connection);
        const catalogInfoCount = await catalogRepository.getRecordCount(null, catalogDomain);
        if (catalogInfoCount > 0) {
            // カタログ名が存在する場合、エラーをthrow
            throw new AppError(Message.ALREADY_ACTIVATE, ResponseCode.CONFLICT);
        }

        // オペレータ情報を取得
        const operator: OperatorDomain = dto.getOperator();

        // カタログコード範囲の件数を取得
        let scopeDomain = new CatalogCodeScopeDomain();
        const scopeRepository = new CatalogCodeScopeRepository(connection);
        const scopeCount: number = await scopeRepository.getRecordCount(null, scopeDomain);

        // UUIDを取得
        const uuidName: string = uuid();

        // カタログ名称を追加
        await connection.transaction(async em => {
            // カタログコード範囲が存在しない場合
            if (scopeCount <= 0) {
                // カタログコード範囲を追加
                const codeList: {}[] = Configure['code_scope'];
                for (const code of codeList) {
                    scopeDomain = new CatalogCodeScopeDomain();
                    scopeDomain.type = code['type'];
                    scopeDomain.startCode = code['start_code'];
                    scopeDomain.endCode = code['end_code'];
                    scopeDomain.updatedBy = operator.loginId;
                    await scopeRepository.insertRecord(em, scopeDomain);
                }
            }
            catalogDomain.id = uuidName;
            catalogDomain.name = dto.getName();
            catalogDomain.description = dto.getDescription();
            catalogDomain.extName = dto.getExtName();
            catalogDomain.updatedBy = operator.loginId;
            await catalogRepository.insertRecord(em, catalogDomain);
        }).catch(err => {
            throw err;
        });

        // レスポンスを返す
        const res: CatalogNamePostResDto = new CatalogNamePostResDto();
        res.id = uuidName;
        res.name = dto.getName();
        res.description = dto.getDescription();
        res.extName = dto.getExtName();
        return res.getAsJson();
    }

    /**
     * カタログ名称更新
     * @param connection
     * @param dto
     */
    public async updateCatalogName (connection: Connection, dto: CatalogNameServiceDto): Promise<{}> {
        // カタログ名の存在確認
        const catalogDomain = new CatalogDomain();
        const catalogRepository = new CatalogRepository(connection);
        const catalogInfo = await catalogRepository.getRecord(null, catalogDomain);
        if (!catalogInfo) {
            // カタログ名が存在しない場合、エラーをthrow
            throw new AppError(Message.NOT_ACTIVATE, ResponseCode.UNAUTHORIZED);
        }

        // オペレータ情報を取得
        const operator: OperatorDomain = dto.getOperator();

        // ネームスペースを更新
        await connection.transaction(async em => {
            catalogDomain.id = catalogInfo.id;
            catalogDomain.name = dto.getName();
            catalogDomain.description = dto.getDescription();
            catalogDomain.extName = dto.getExtName();
            catalogDomain.updatedBy = operator.loginId;
            await catalogRepository.updateRecord(em, catalogDomain);
        }).catch(err => {
            throw err;
        });

        // レスポンスを返す
        const res: CatalogNamePutResDto = new CatalogNamePutResDto();
        res.id = catalogInfo.id;
        res.name = dto.getName();
        res.description = dto.getDescription();
        res.extName = dto.getExtName();
        return res.getAsJson();
    }
}
