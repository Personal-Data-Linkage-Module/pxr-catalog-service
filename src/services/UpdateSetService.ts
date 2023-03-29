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
import { Connection, EntityManager, getConnection } from 'typeorm';
import AppError from '../common/AppError';
import { ResponseCode } from '../common/ResponseCode';
import OperatorDomain from '../domains/OperatorDomain';
import UpdateSetServiceDto from './dto/UpdateSetServiceDto';
import CatalogDomain from '../domains/CatalogDomain';
import CatalogRepository from '../repositories/postgres/CatalogRepository';
/* eslint-enable */
import { UpdateSetStatus, UpdateSetType } from '../common/UpdateSet';
import Config from '../common/Config';
import UpdateSetSearchGetResDto from '../resources/dto/UpdateSetSearchGetResDto';
import UpdateSetDomain from '../domains/UpdateSetDomain';
import UpdateSetRepository from '../repositories/postgres/UpdateSetRepository';
import UpdateSetNsDomain from '../domains/UpdateSetNsDomain';
import UpdateSetNsRepository from '../repositories/postgres/UpdateSetNsRepository';
import UpdateSetCatalogDomain from '../domains/UpdateSetCatalogDomain';
import UpdateSetCatalogRepository from '../repositories/postgres/UpdateSetCatalogRepository';
import UpdateSetAttributeDomain from '../domains/UpdateSetAttributeDomain';
import UpdateSetAttributeRepository from '../repositories/postgres/UpdateSetAttributeRepository';
import UpdateSetSearchRequestGetResDto from '../resources/dto/UpdateSetSearchRequestGetResDto';
import UpdateSetSearchApprovalGetResDto, { UpdateSetSearchDto } from '../resources/dto/UpdateSetSearchApprovalGetResDto';
import NameSpaceDomain from '../domains/NameSpaceDomain';
import NameSpaceRepository from '../repositories/postgres/NameSpaceRepository';
import CatalogItemDomain from '../domains/CatalogItemDomain';
import CatalogItemRepository from '../repositories/postgres/CatalogItemRepository';
import UpdateSetDeletePostResDto from '../resources/dto/UpdateSetDeletePostResDto';
import CatalogCodeScopeRepository from '../repositories/postgres/CatalogCodeScopeRepository';
import CatalogService from './CatalogService';
import SearchService from '../common/SearchService_Stub';
import CatalogServiceDto from './dto/CatalogServiceDto';
import AttributeService from '../services/AttributeService';
import { sprintf } from 'sprintf-js';
const Message = Config.ReadConfig('./config/message.json');

/**
 * 変更セット操作サービス
 */
export default class UpdateSetService {
    /**
     * 変更セット情報取得
     * @param connection
     * @param dto
     */
    public async getUpdateSetById (connection: Connection, dto: UpdateSetServiceDto): Promise<{}> {
        // カタログ名の存在確認
        const catalogDomain = new CatalogDomain();
        const catalogRepository = new CatalogRepository(connection);
        const catalogInfoCount = await catalogRepository.getRecordCount(null, catalogDomain);
        if (catalogInfoCount <= 0) {
            // カタログ名が存在しない場合、エラーをthrow
            throw new AppError(Message.NOT_ACTIVATE, ResponseCode.UNAUTHORIZED);
        }

        // 対象変更セットのフルセットを取得
        const updateSetDomain = new UpdateSetDomain();
        updateSetDomain.id = dto.getUpdateSetId();
        const updateSetRepository = new UpdateSetRepository(connection);
        const updateSetInfo = await updateSetRepository.getRecordById(null, updateSetDomain);
        if (!updateSetInfo) {
            // 対象変更セットが存在しない場合、エラーをthrow
            throw new AppError(Message.NOT_EXISTS_TARGET, ResponseCode.NOT_FOUND);
        }

        // 対象変更セットのフル情報を取得
        const res: {} = await this.getUpdateSetInfo(connection, dto);

        // 変更セット情報を返す
        return res;
    }

    /**
     * 未承認変更セットリスト取得
     * @param connection
     * @param dto
     */
    public async getUpdateSetRequest (connection: Connection, dto: UpdateSetServiceDto): Promise<{}> {
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

        // 対象変更セットを取得
        const updateSetDomain = new UpdateSetDomain();
        updateSetDomain.isIgnore = true;
        updateSetDomain.status = UpdateSetStatus.APPROVAL;
        updateSetDomain.callerActorCode = operator.actorCode;
        updateSetDomain.approvalActorCode = operator.actorCode;
        updateSetDomain.registerActorCode = operator.actorCode;
        const updateSetRepository = new UpdateSetRepository(connection);
        const updateSetList = await updateSetRepository.getRecord(null, updateSetDomain);
        if (!updateSetList || updateSetList.length === 0) {
            // 対象変更セットが存在しない場合、エラーをthrow
            throw new AppError(Message.NOT_EXISTS_TARGET, ResponseCode.NOT_FOUND);
        }

        // レスポンスを生成
        const res: UpdateSetSearchRequestGetResDto = new UpdateSetSearchRequestGetResDto();
        res.list = [];
        for (let index = 0; index < updateSetList.length; index++) {
            const info: UpdateSetSearchDto = new UpdateSetSearchDto();
            info.id = updateSetList[index].id;
            info.name = updateSetList[index].name;
            info.type = updateSetList[index].type;
            info.description = updateSetList[index].description;
            info.callerActorCode = updateSetList[index].callerActorCode;
            info.approvalActorCode = updateSetList[index].approvalActorCode;
            info.approver = updateSetList[index].approver;
            info.approvalAt = updateSetList[index].approvalAt;
            info.comment = updateSetList[index].comment;
            info.status = updateSetList[index].status;
            info.registerActorCode = updateSetList[index].registerActorCode;
            info.register = updateSetList[index].register;
            info.registAt = updateSetList[index].registAt;
            res.list.push(info);
        }
        // 変更セット情報を返す
        return res.getAsJson();
    }

    /**
     * 承認済変更セットリスト取得
     * @param connection
     * @param dto
     */
    public async getUpdateSetApproval (connection: Connection, dto: UpdateSetServiceDto): Promise<{}> {
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

        // 対象変更セットのフルセットを取得
        const updateSetDomain = new UpdateSetDomain();
        updateSetDomain.status = UpdateSetStatus.APPROVAL;
        updateSetDomain.callerActorCode = operator.actorCode;
        updateSetDomain.approvalActorCode = operator.actorCode;
        updateSetDomain.registerActorCode = operator.actorCode;
        const updateSetRepository = new UpdateSetRepository(connection);
        const updateSetList = await updateSetRepository.getRecord(null, updateSetDomain);
        if (!updateSetList || updateSetList.length === 0) {
            // 対象変更セットが存在しない場合、エラーをthrow
            throw new AppError(Message.NOT_EXISTS_TARGET, ResponseCode.NOT_FOUND);
        }

        // レスポンスを生成
        const res: UpdateSetSearchApprovalGetResDto = new UpdateSetSearchApprovalGetResDto();
        res.list = [];
        for (let index = 0; index < updateSetList.length; index++) {
            const info: UpdateSetSearchDto = new UpdateSetSearchDto();
            info.id = updateSetList[index].id;
            info.name = updateSetList[index].name;
            info.description = updateSetList[index].description;
            info.type = updateSetList[index].type;
            info.callerActorCode = updateSetList[index].callerActorCode;
            info.approvalActorCode = updateSetList[index].approvalActorCode;
            info.approver = updateSetList[index].approver;
            info.approvalAt = updateSetList[index].approvalAt;
            info.comment = updateSetList[index].comment;
            info.status = updateSetList[index].status;
            info.registerActorCode = updateSetList[index].registerActorCode;
            info.register = updateSetList[index].register;
            info.registAt = updateSetList[index].registAt;
            res.list.push(info);
        }
        // 変更セット情報を返す
        return res.getAsJson();
    }

    /**
     * 変更セット登録
     * @param connection
     * @param dto
     */
    public async insertUpdateSet (connection: Connection, dto: UpdateSetServiceDto): Promise<{}> {
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

        let updateSetId: number = null;
        let res: {} = {};
        await connection.transaction(async em => {
            // 対象変更セットを登録
            const updateSetDomain = new UpdateSetDomain();
            updateSetDomain.name = dto.getName();
            updateSetDomain.description = dto.getDescription();
            updateSetDomain.type = dto.getType();
            updateSetDomain.callerActorCode = operator.actorCode;
            updateSetDomain.callerActorVersion = operator.actorVersion;
            updateSetDomain.approvalActorCode = null;
            updateSetDomain.approvalActorVersion = null;
            updateSetDomain.approver = null;
            updateSetDomain.approvalAt = null;
            updateSetDomain.comment = null;
            updateSetDomain.status = UpdateSetStatus.REGIST;
            updateSetDomain.registerActorCode = operator.actorCode;
            updateSetDomain.register = operator.loginId;
            updateSetDomain.registAt = new Date();
            updateSetDomain.appendix = dto.getAppendix() ? JSON.stringify(dto.getAppendix()) : null;
            updateSetDomain.updatedBy = operator.loginId;
            const updateSetRepository = new UpdateSetRepository(connection);
            const ret = await updateSetRepository.insertRecord(em, updateSetDomain);

            // 変更セットIDを取得
            updateSetId = Number(ret.identifiers[0].id);

            // 対象変更セットのネームスペースリストを登録
            const nsList: {}[] = dto.getNsList() ? dto.getNsList() : [];
            const updateSetNsRepository = new UpdateSetNsRepository(connection);
            for (let index = 0; index < nsList.length; index++) {
                // ネームスペースチェック
                const nsId: number = await this.nsCheck(connection, em, nsList[index]);

                // 変更セットカタログテーブルに申請情報を追加
                const updateSetNsDomain = new UpdateSetNsDomain();
                updateSetNsDomain.updateSetId = updateSetId;
                updateSetNsDomain.type = Number(nsList[index]['type']);
                updateSetNsDomain.nsId = nsId;
                updateSetNsDomain.comment = nsList[index]['comment'];
                updateSetNsDomain.template = JSON.stringify(nsList[index]['template']);
                updateSetNsDomain.updatedBy = operator.loginId;
                await updateSetNsRepository.insertRecord(em, updateSetNsDomain);
            }

            // 対象変更セットのカタログリストを登録
            const catalogList: {}[] = dto.getCatalogList() ? dto.getCatalogList() : [];
            const updateSetCatalogRepository = new UpdateSetCatalogRepository(connection);
            for (let index = 0; index < catalogList.length; index++) {
                // カタログチェック
                const catalogItemId: number = await this.catalogCheck(connection, em, catalogList[index]);

                // 変更セットカタログテーブルに申請情報を追加
                const updateSetCatalogDomain = new UpdateSetCatalogDomain();
                updateSetCatalogDomain.updateSetId = updateSetId;
                updateSetCatalogDomain.type = Number(catalogList[index]['type']);
                updateSetCatalogDomain.catalogItemId = catalogItemId;
                updateSetCatalogDomain.catalogItemCode = catalogList[index]['catalogCode'] ? Number(catalogList[index]['catalogCode']) : null;
                updateSetCatalogDomain.comment = catalogList[index]['comment'];
                updateSetCatalogDomain.template = JSON.stringify(catalogList[index]['template']);
                updateSetCatalogDomain.updatedBy = operator.loginId;
                await updateSetCatalogRepository.insertRecord(em, updateSetCatalogDomain);
            }

            // 対象変更セットの属性リストを登録
            const attributeList: {}[] = dto.getAttributeList() ? dto.getAttributeList() : [];
            const updateSetAttributeRepository = new UpdateSetAttributeRepository(connection);
            for (let index = 0; index < attributeList.length; index++) {
                // 属性チェック
                const catalogCode: number = await this.attributeCheck(connection, em, attributeList[index]);

                // 変更セット属性テーブルに申請情報を追加
                const updateSetAttributeDomain = new UpdateSetAttributeDomain();
                updateSetAttributeDomain.updateSetId = updateSetId;
                updateSetAttributeDomain.type = Number(attributeList[index]['type']);
                updateSetAttributeDomain.catalogCode = catalogCode;
                updateSetAttributeDomain.attribute = JSON.stringify(attributeList[index]['attribute']);
                updateSetAttributeDomain.updatedBy = operator.loginId;
                await updateSetAttributeRepository.insertRecord(em, updateSetAttributeDomain);
            }
            // 対象変更セットのフル情報を取得
            dto.setUpdateSetId(updateSetId);
            res = await this.getUpdateSetInfo(connection, dto, em);
        }).catch(err => {
            throw err;
        });

        // 変更セット情報を返す
        return res;
    }

    /**
     * 変更セット登録変更
     * @param connection
     * @param dto
     */
    public async updateUpdateSet (connection: Connection, dto: UpdateSetServiceDto): Promise<{}> {
        // カタログ名の存在確認
        const catalogDomain = new CatalogDomain();
        const catalogRepository = new CatalogRepository(connection);
        const catalogInfoCount = await catalogRepository.getRecordCount(null, catalogDomain);
        if (catalogInfoCount <= 0) {
            // カタログ名が存在しない場合、エラーをthrow
            throw new AppError(Message.NOT_ACTIVATE, ResponseCode.UNAUTHORIZED);
        }

        // 変更対象変更セットIDを取得
        const updateSetId: number = dto.getUpdateSetId();

        // オペレータ情報を取得
        const operator: OperatorDomain = dto.getOperator();

        // 申請対象がステータス(登録)であることを確認する
        await this.checkStatusRegist(updateSetId, connection, operator);
        let res: {} = {};
        await connection.transaction(async em => {
            // 既存の変更セットネームスペースを削除する
            let updateSetNsDomain = new UpdateSetNsDomain();
            updateSetNsDomain.updateSetId = updateSetId;
            updateSetNsDomain.updatedBy = operator.loginId;
            const updateSetNsRepository = new UpdateSetNsRepository(connection);
            await updateSetNsRepository.deleteRecord(em, updateSetNsDomain);

            // 既存の変更セットカタログを削除する
            let updateSetCatalogDomain = new UpdateSetCatalogDomain();
            updateSetCatalogDomain.updateSetId = updateSetId;
            updateSetCatalogDomain.updatedBy = operator.loginId;
            const updateSetCatalogRepository = new UpdateSetCatalogRepository(connection);
            await updateSetCatalogRepository.deleteRecord(em, updateSetCatalogDomain);

            // 既存の変更セット属性を削除する
            let updateSetAttributeDomain = new UpdateSetAttributeDomain();
            updateSetAttributeDomain.updateSetId = updateSetId;
            updateSetAttributeDomain.updatedBy = operator.loginId;
            const updateSetAttributeRepository = new UpdateSetAttributeRepository(connection);
            await updateSetAttributeRepository.deleteRecord(em, updateSetAttributeDomain);

            // 対象変更セットを更新
            const updateSetDomain = new UpdateSetDomain();
            updateSetDomain.id = dto.getUpdateSetId();
            updateSetDomain.name = dto.getName();
            updateSetDomain.description = dto.getDescription();
            updateSetDomain.type = dto.getType();
            updateSetDomain.callerActorCode = operator.actorCode;
            updateSetDomain.callerActorVersion = operator.actorVersion;
            updateSetDomain.approvalActorCode = null;
            updateSetDomain.approvalActorVersion = null;
            updateSetDomain.approver = null;
            updateSetDomain.approvalAt = null;
            updateSetDomain.comment = null;
            updateSetDomain.status = UpdateSetStatus.REGIST;
            updateSetDomain.registerActorCode = operator.actorCode;
            updateSetDomain.register = operator.loginId;
            updateSetDomain.registAt = new Date();
            updateSetDomain.appendix = dto.getAppendix() ? JSON.stringify(dto.getAppendix()) : null;
            updateSetDomain.updatedBy = operator.loginId;
            const updateSetRepository = new UpdateSetRepository(connection);
            await updateSetRepository.updateRecord(em, updateSetDomain);

            // 対象変更セットのネームスペースリストを登録
            const nsList: {}[] = dto.getNsList() ? dto.getNsList() : [];
            for (let index = 0; index < nsList.length; index++) {
                // ネームスペースチェック
                const nsId: number = await this.nsCheck(connection, em, nsList[index]);

                // 変更セットカタログテーブルに申請情報を追加
                updateSetNsDomain = new UpdateSetNsDomain();
                updateSetNsDomain.updateSetId = updateSetId;
                updateSetNsDomain.type = Number(nsList[index]['type']);
                updateSetNsDomain.nsId = nsId;
                updateSetNsDomain.comment = nsList[index]['comment'];
                updateSetNsDomain.template = JSON.stringify(nsList[index]['template']);
                updateSetNsDomain.updatedBy = operator.loginId;
                await updateSetNsRepository.insertRecord(em, updateSetNsDomain);
            }

            // 対象変更セットのカタログリストを登録
            const catalogList: {}[] = dto.getCatalogList() ? dto.getCatalogList() : [];
            for (let index = 0; index < catalogList.length; index++) {
                // カタログチェック
                const catalogItemId: number = await this.catalogCheck(connection, em, catalogList[index]);

                // 変更セットカタログテーブルに申請情報を追加
                updateSetCatalogDomain = new UpdateSetCatalogDomain();
                updateSetCatalogDomain.updateSetId = updateSetId;
                updateSetCatalogDomain.type = Number(catalogList[index]['type']);
                updateSetCatalogDomain.catalogItemId = catalogItemId;
                updateSetCatalogDomain.catalogItemCode = catalogList[index]['catalogCode'] ? Number(catalogList[index]['catalogCode']) : null;
                updateSetCatalogDomain.comment = catalogList[index]['comment'];
                updateSetCatalogDomain.template = JSON.stringify(catalogList[index]['template']);
                updateSetCatalogDomain.updatedBy = operator.loginId;
                await updateSetCatalogRepository.insertRecord(em, updateSetCatalogDomain);
            }

            // 対象変更セットのカタログリストを登録
            const attributeList: {}[] = dto.getAttributeList() ? dto.getAttributeList() : [];
            for (let index = 0; index < attributeList.length; index++) {
                // 属性チェック
                const catalogCode: number = await this.attributeCheck(connection, em, attributeList[index]);

                // 変更セット属性テーブルに申請情報を追加
                updateSetAttributeDomain = new UpdateSetAttributeDomain();
                updateSetAttributeDomain.updateSetId = updateSetId;
                updateSetAttributeDomain.type = Number(attributeList[index]['type']);
                updateSetAttributeDomain.catalogCode = catalogCode;
                updateSetAttributeDomain.attribute = JSON.stringify(attributeList[index]['attribute']);
                updateSetAttributeDomain.updatedBy = operator.loginId;
                await updateSetAttributeRepository.insertRecord(em, updateSetAttributeDomain);
            }
            // 対象変更セットのフル情報を取得
            res = await this.getUpdateSetInfo(connection, dto, em);
        }).catch(err => {
            throw err;
        });

        // 変更セット情報を返す
        return res;
    }

    /**
     * 変更セット登録削除
     * @param connection
     * @param dto
     */
    public async deleteUpdateSet (connection: Connection, dto: UpdateSetServiceDto): Promise<{}> {
        // カタログ名の存在確認
        const catalogDomain = new CatalogDomain();
        const catalogRepository = new CatalogRepository(connection);
        const catalogInfoCount = await catalogRepository.getRecordCount(null, catalogDomain);
        if (catalogInfoCount <= 0) {
            // カタログ名が存在しない場合、エラーをthrow
            throw new AppError(Message.NOT_ACTIVATE, ResponseCode.UNAUTHORIZED);
        }

        // 変更対象変更セットIDを取得
        const updateSetId: number = dto.getUpdateSetId();

        // オペレータ情報を取得
        const operator: OperatorDomain = dto.getOperator();

        // 申請対象がステータス(登録)であることを確認する
        await this.checkStatusRegist(updateSetId, connection, operator);

        await connection.transaction(async em => {
            // 対象変更セットを更新
            const updateSetDomain = new UpdateSetDomain();
            updateSetDomain.id = dto.getUpdateSetId();
            updateSetDomain.status = UpdateSetStatus.CANCEL;
            updateSetDomain.updatedBy = operator.loginId;
            const updateSetRepository = new UpdateSetRepository(connection);
            await updateSetRepository.updateStatus(em, updateSetDomain);
        }).catch(err => {
            throw err;
        });

        // レスポンスを生成
        const res: UpdateSetDeletePostResDto = new UpdateSetDeletePostResDto();
        res.id = updateSetId;

        // レスポンスを返す
        return res.getAsJson();
    }

    /**
     * 変更セット申請
     * @param connection
     * @param dto
     */
    public async requestUpdateSet (connection: Connection, dto: UpdateSetServiceDto): Promise<{}> {
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

        // 対象変更セットIDを取得
        const updateSetId: number = dto.getUpdateSetId();

        // 申請対象がステータス(登録)であることを確認する
        await this.checkStatusRegist(updateSetId, connection, operator);

        // 対象変更セットのネームスペースを取得
        const updateSetNsDomain = new UpdateSetNsDomain();
        updateSetNsDomain.updateSetId = updateSetId;
        const updateSetNsRepository = new UpdateSetNsRepository(connection);
        const nsList = await updateSetNsRepository.getRecord(null, updateSetNsDomain);

        // 対象カタログを取得
        const updateSetCatalogDomain = new UpdateSetCatalogDomain();
        updateSetCatalogDomain.updateSetId = updateSetId;
        const updateSetCatalogRepository = new UpdateSetCatalogRepository(connection);
        const catalogList = await updateSetCatalogRepository.getRecord(null, updateSetCatalogDomain);

        // 対象属性を取得
        const updateSetAttributeDomain = new UpdateSetAttributeDomain();
        updateSetAttributeDomain.updateSetId = updateSetId;
        const updateSetAttributeRepository = new UpdateSetAttributeRepository(connection);
        const attributeList = await updateSetAttributeRepository.getRecord(null, updateSetAttributeDomain);

        // 取得したネームスペースを基にネームスペースを追加
        for (let index = 0; index < nsList.length; index++) {
            // ネームスペースチェック
            await this.nsCheck(connection, null, nsList[index]);
        }

        // 取得したカタログを基にカタログを追加
        for (let index = 0; index < catalogList.length; index++) {
            // カタログチェック
            await this.catalogCheck(connection, null, catalogList[index]);
            // 申請種別が削除以外(追加or更新)の場合、prop内で紐づけられているカタログの存在チェックを行う
            if (Number(catalogList[index]['type']) !== UpdateSetType.DELETE) {
                await this.catalogPropCheck(connection, null, catalogList[index], operator);
            }
        }

        // 取得した属性を基に属性を追加
        for (let index = 0; index < attributeList.length; index++) {
            // 属性チェック
            await this.attributeCheck(connection, null, attributeList[index]);
        }

        // カタログのnsにdocument, event, thingが含まれているかどうかを確認する
        let isSelfApproval = true;
        for (const catalog of catalogList) {
            const template = JSON.parse(catalog['template']);
            if (template && template['catalogItem'] && template['catalogItem']['ns']) {
                const ns: string = template['catalogItem']['ns'];
                if (/^catalog\/(model|built_in|ext\/.*)\/(document|event|thing).*/.test(ns)) {
                    isSelfApproval = false;
                    continue;
                }
            }
        }

        // カタログのnsがdocument, event, thingだった場合、承認アクターがpxr-rootまたは提携しているregion-rootか確認する
        if (!isSelfApproval) {
            await this.checkApprovalActor(operator, dto.getApprovalActor());
        }
        let res: {} = {};
        await connection.transaction(async em => {
            // 対象変更セットを更新
            const updateSetDomain = new UpdateSetDomain();
            updateSetDomain.id = updateSetId;
            updateSetDomain.approvalActorCode = dto.getApprovalActor();
            updateSetDomain.approvalActorVersion = 1;
            updateSetDomain.status = UpdateSetStatus.REQUEST;
            updateSetDomain.updatedBy = operator.loginId;
            const updateSetRepository = new UpdateSetRepository(connection);
            await updateSetRepository.updateRequest(em, updateSetDomain);
            // 対象変更セットのフル情報を取得
            res = await this.getUpdateSetInfo(connection, dto, em);
            if (isSelfApproval || operator.actorCode === Number(dto.getApprovalActor())) {
                dto.setStatus(UpdateSetStatus.APPROVAL);
                res = this.approvalUpdateSet(connection, dto, em);
            }
        }).catch(err => {
            throw err;
        });
        // 変更セット情報を返す
        return res;
    }

    /**
     * 申請対象がステータス(登録)であることを確認する
     * @param updateSetId
     * @param connection
     * @param operator
     */
    private async checkStatusRegist (updateSetId: number, connection: Connection, operator?: OperatorDomain) {
        const updateSetDomain = new UpdateSetDomain();
        updateSetDomain.id = updateSetId;
        updateSetDomain.callerActorCode = operator ? operator.actorCode : null;
        updateSetDomain.callerActorVersion = operator ? operator.actorVersion : null;
        updateSetDomain.status = UpdateSetStatus.REGIST;
        const updateSetRepository = new UpdateSetRepository(connection);
        const ret = await updateSetRepository.getRecordById(null, updateSetDomain);
        if (!ret) {
            // 対象変更セットが存在しない場合、エラーをthrow
            throw new AppError(Message.NOT_EXISTS_TARGET, ResponseCode.BAD_REQUEST);
        }
    }

    /**
     * 変更セット承認
     * @param connection
     * @param dto
     * @param em
     * リファクタ履歴
     *  separate : updateNs (複雑度緩和のため)
     *  separate : updateCatalog (複雑度緩和のため)
     *  separate : updateAttribute (複雑度緩和のため)
     */
    public async approvalUpdateSet (connection: Connection, dto: UpdateSetServiceDto, em: EntityManager = null): Promise<{}> {
        // カタログ名の存在確認
        const catalogDomain = new CatalogDomain();
        const catalogRepository = new CatalogRepository(connection);
        const catalogInfoCount = await catalogRepository.getRecordCount(em, catalogDomain);
        if (catalogInfoCount <= 0) {
            // カタログ名が存在しない場合、エラーをthrow
            throw new AppError(Message.NOT_ACTIVATE, ResponseCode.UNAUTHORIZED);
        }

        // オペレータ情報を取得
        const operator: OperatorDomain = dto.getOperator();

        // 対象変更セットIDを取得
        const updateSetId: number = dto.getUpdateSetId();

        // 申請対象がステータス(申請中)であることを確認する
        let updateSetDomain = new UpdateSetDomain();
        updateSetDomain.id = updateSetId;
        updateSetDomain.approvalActorCode = operator.actorCode;
        updateSetDomain.status = UpdateSetStatus.REQUEST;
        const updateSetRepository = new UpdateSetRepository(connection);
        const ret = await updateSetRepository.getRecordById(em, updateSetDomain);
        if (!ret) {
            // 対象変更セットが存在しない場合、エラーをthrow
            throw new AppError(Message.NOT_EXISTS_TARGET, ResponseCode.BAD_REQUEST);
        }
        let res: {} = {};
        await connection.transaction(async em => {
            // 承認の場合のみ
            if (dto.getStatus() === UpdateSetStatus.APPROVAL) {
                // 対象変更セットのネームスペースを取得・更新
                await this.updateNs(updateSetId, connection, em, operator);

                // 対象変更セットのカタログを取得・更新
                await this.updateCatalog(updateSetId, connection, em, operator);

                // 対象変更セットの属性を取得・更新
                await this.updateAttribute(updateSetId, connection, em, operator);
            }

            // 対象変更セットを更新
            updateSetDomain = new UpdateSetDomain();
            updateSetDomain.id = updateSetId;
            updateSetDomain.approver = operator.loginId;
            updateSetDomain.approvalAt = new Date();
            updateSetDomain.comment = dto.getComment();
            updateSetDomain.status = dto.getStatus();
            updateSetDomain.updatedBy = operator.loginId;
            await updateSetRepository.updateApproval(em, updateSetDomain);
            // 対象変更セットのフル情報を取得
            res = await this.getUpdateSetInfo(connection, dto, em);
        }).catch(err => {
            throw err;
        });
        // 変更セット情報を返す
        return res;
    }

    /**
     * 変更セットのネームスペースを追加/変更/削除する
     * @param updateSetId
     * @param connection
     * @param em
     * @param operator
     * @param catalogItemRepository
     */
    private async updateNs (updateSetId: number, connection: Connection, em: EntityManager, operator: OperatorDomain) {
        // 対象変更セットのネームスペースを取得
        let updateSetNsDomain = new UpdateSetNsDomain();
        updateSetNsDomain.updateSetId = updateSetId;
        const updateSetNsRepository = new UpdateSetNsRepository(connection);
        const nsList = await updateSetNsRepository.getRecord(em, updateSetNsDomain);

        // 取得したネームスペースを基にネームスペースを追加
        const nsRepository: NameSpaceRepository = new NameSpaceRepository(connection);
        for (const namespace of nsList) {
            // ネームスペースチェック
            const nsId: number = await this.nsCheck(connection, em, namespace);

            // タイプを取得
            const type: number = namespace.type;
            const template = JSON.parse(namespace.template);
            if (type === UpdateSetType.ADD) {
                // 申請種別が追加の場合
                // ネームスペースを追加
                const nsDomain = new NameSpaceDomain();
                nsDomain.type = this.getTypeByName(template['ns']);
                nsDomain.name = template['ns'];
                nsDomain.description = template['description'];
                nsDomain.attributes = null;
                nsDomain.updatedBy = operator.loginId;
                const result = await nsRepository.insertRecord(em, nsDomain);

                // ネームスペースIDを取得
                const newNsId = Number(result.identifiers[0].id);

                // 変更セットネームスペーステーブルの申請情報を更新
                updateSetNsDomain = new UpdateSetNsDomain();
                updateSetNsDomain.id = namespace.id;
                updateSetNsDomain.updateSetId = updateSetId;
                updateSetNsDomain.type = type;
                updateSetNsDomain.nsId = newNsId;
                updateSetNsDomain.template = JSON.stringify(template);
                updateSetNsDomain.updatedBy = operator.loginId;
                await updateSetNsRepository.updateRecord(em, updateSetNsDomain);
            } else if (type === UpdateSetType.UPDATE) {
                // 申請種別が更新の場合
                // ネームスペースを更新
                const nsDomain = new NameSpaceDomain();
                nsDomain.id = nsId;
                nsDomain.type = this.getTypeByName(template['ns']);
                nsDomain.name = template['ns'];
                nsDomain.description = template['description'];
                nsDomain.updatedBy = operator.loginId;
                await nsRepository.updateRecord(em, nsDomain);
            } else {
                // 申請種別が削除の場合
                // 本ネームスペースを使用しているカタログが存在するか確認
                const catalogItemDomain = new CatalogItemDomain();
                catalogItemDomain.nsId = nsId;
                const catalogItemRepository = new CatalogItemRepository(connection);
                const usedCount = await catalogItemRepository.getRecordCountByNsId(null, catalogItemDomain);
                if (usedCount > 0) {
                    // カタログで対象ネームスペースが使用中の場合、エラーをthrow
                    throw new AppError(Message.NAMESPACE_USED, ResponseCode.CONFLICT);
                }

                // ネームスペースを削除
                const nsDomain = new NameSpaceDomain();
                nsDomain.id = nsId;
                nsDomain.updatedBy = operator.loginId;
                await nsRepository.deleteRecord(em, nsDomain);
            }
        }
    }

    /**
     * 変更セットのカタログを追加/変更/削除する
     * @param updateSetId
     * @param connection
     * @param em
     * @param catalogItemRepository
     * @param operator
     */
    private async updateCatalog (updateSetId: number, connection: Connection, em: EntityManager, operator: OperatorDomain) {
        // 対象カタログを取得
        let updateSetCatalogDomain = new UpdateSetCatalogDomain();
        updateSetCatalogDomain.updateSetId = updateSetId;
        const updateSetCatalogRepository = new UpdateSetCatalogRepository(connection);
        const catalogList = await updateSetCatalogRepository.getRecord(em, updateSetCatalogDomain);
        // 取得したカタログを基にカタログを追加
        const catalogService = new CatalogService();
        const codeConvert: {} = {};

        for (let index = 0; index < catalogList.length; index++) {
            // カタログチェック
            await this.catalogCheck(connection, em, catalogList[index]);

            // タイプを取得
            const type: number = catalogList[index].type;
            const catalogItemId: number = catalogList[index].catalogItemId;
            const template = JSON.parse(catalogList[index].template);
            const catalogNs = template && template['catalogItem'] ? template['catalogItem']['ns'] : null;
            const catalogType = this.getTypeByName(catalogNs);

            // 対象ネームスペースIDを取得
            const nsDomain = new NameSpaceDomain();
            nsDomain.type = catalogType;
            nsDomain.name = catalogNs;
            const nsRepository: NameSpaceRepository = new NameSpaceRepository(connection);
            const nsId: number = await nsRepository.getNamespaceId(em, nsDomain);
            if (!nsId) {
                // 対象ネームスペースが存在しない場合
                throw new AppError(Message.NAMESPACE_NOT_FOUND, ResponseCode.BAD_REQUEST);
            }

            // Domain, Repositoryを予め宣言
            const catalogItemDomain = new CatalogItemDomain();
            const catalogItemRepository = new CatalogItemRepository(connection);
            if (type === UpdateSetType.ADD) {
                // 申請種別が追加の場合
                // 対象コードを取得
                let code = template['catalogItem']['_code'] ? template['catalogItem']['_code']['_value'] : null;

                // 継承コードがマイナス値の場合、正しいコードに置き換え
                const inheritCode = template['catalogItem']['inherit'] ? template['catalogItem']['inherit']['_value'] : null;
                if (inheritCode < 0) {
                    template['catalogItem']['inherit']['_value'] = codeConvert[inheritCode];
                }

                // コードがマイナス値の場合は、_code: nullと同等動作
                const preCode: number = code;
                if (code < 0) {
                    codeConvert[preCode] = null;
                    code = null;
                }
                const scopeRepository = new CatalogCodeScopeRepository(connection);
                if (!code) {
                    // 最大コードを取得
                    catalogItemDomain.type = catalogType;
                    code = await catalogItemRepository.getMaxCode(em, catalogItemDomain);

                    // コードを1つアップ
                    code++;

                    while (true) {
                        // コードが有効でない場合
                        if (!await scopeRepository.isCatalogCodeValid(em, catalogType, code)) {
                            // 次の有効なコードを取得
                            code = await scopeRepository.getNextCatalogCode(em, catalogType, code);
                        } else {
                            // コードが有効な場合、処理を抜ける
                            break;
                        }
                    }
                    // 取得コードに更新
                    if (template['catalogItem']['_code']) {
                        template['catalogItem']['_code']['_value'] = code;
                    } else {
                        template['catalogItem']['_code'] = {
                            _value: code,
                            _ver: null
                        };
                    }
                } else {
                    // コードが有効でない場合
                    if (!await scopeRepository.isCatalogCodeValid(null, catalogType, code)) {
                        throw new AppError(Message.CODE_SCOPE_OUT_CODE, ResponseCode.BAD_REQUEST);
                    }
                }

                // バージョン指定がない場合
                let version = template['catalogItem']['_code']['_ver'];
                if (!version) {
                    // バージョンに1を設定
                    version = 1;
                    // 取得バージョンに更新
                    template['catalogItem']['_code']['_ver'] = version;
                }

                // コードがマイナス値の場合、採番後のコードを確保
                if (preCode < 0) {
                    codeConvert[preCode] = code;
                }

                // カタログを追加
                const newCatalogItemId: number = await catalogService.insertCatalogInfo(
                    connection,
                    em,
                    nsId,
                    code,
                    version,
                    catalogType,
                    template,
                    operator,
                    true
                );

                // 変更セットカタログテーブルの申請情報を更新
                updateSetCatalogDomain = new UpdateSetCatalogDomain();
                updateSetCatalogDomain.id = catalogList[index].id;
                updateSetCatalogDomain.updateSetId = updateSetId;
                updateSetCatalogDomain.type = type;
                updateSetCatalogDomain.catalogItemId = newCatalogItemId;
                updateSetCatalogDomain.template = JSON.stringify(template);
                updateSetCatalogDomain.updatedBy = operator.loginId;
                await updateSetCatalogRepository.updateRecord(em, updateSetCatalogDomain);
            } else if (type === UpdateSetType.UPDATE) {
                // 申請種別が更新の場合
                // 継承コードがマイナス値の場合、正しいコードに置き換え
                const inheritCode = template['catalogItem']['inherit'] ? template['catalogItem']['inherit']['_value'] : null;
                if (inheritCode < 0) {
                    template['catalogItem']['inherit']['_value'] = codeConvert[inheritCode];
                }

                // 最大バージョンを取得
                const code = template['catalogItem']['_code']['_value'];
                catalogItemDomain.code = code;
                let version: number = await catalogItemRepository.getMaxVersion(em, catalogItemDomain);

                // バージョンを1つアップ
                version++;

                // カタログを更新
                const newCatalogItemId: number = await catalogService.insertCatalogInfo(
                    connection,
                    em,
                    nsId,
                    code,
                    version,
                    catalogType,
                    template,
                    operator,
                    true
                );
                // 変更セットカタログテーブルの申請情報を更新
                updateSetCatalogDomain = new UpdateSetCatalogDomain();
                updateSetCatalogDomain.id = catalogList[index].id;
                updateSetCatalogDomain.updateSetId = updateSetId;
                updateSetCatalogDomain.type = type;
                updateSetCatalogDomain.catalogItemId = newCatalogItemId;
                updateSetCatalogDomain.template = JSON.stringify(template);
                updateSetCatalogDomain.updatedBy = operator.loginId;
                await updateSetCatalogRepository.updateRecord(em, updateSetCatalogDomain);
            } else {
                // 申請種別が削除の場合
                // カタログを削除
                catalogItemDomain.id = catalogItemId;
                catalogItemDomain.updatedBy = operator.loginId;
                await catalogItemRepository.deleteRecordById(em, catalogItemDomain);

                // 検索サービスのデータ削除
                await this.deleteSearchService(catalogItemId);
            }
        }
    }

    /**
     * 検索サービスのデータを削除する
     * @param catalogItemId
     */
    private async deleteSearchService (catalogItemId: number) {
        const searchService = new SearchService();
        await searchService.deleteRecord(catalogItemId);
    }

    /**
     * 変更セットの属性を追加/変更/削除する
     * @param updateSetId
     * @param connection
     * @param em
     * @param operator
     */
    private async updateAttribute (updateSetId: number, connection: Connection, em: EntityManager, operator: OperatorDomain) {
        const updateSetAttributeDomain = new UpdateSetAttributeDomain();
        updateSetAttributeDomain.updateSetId = updateSetId;
        const updateSetAttributeRepository = new UpdateSetAttributeRepository(connection);
        const attributeList = await updateSetAttributeRepository.getRecord(null, updateSetAttributeDomain);
        // 取得した属性を基に属性を追加
        for (let index = 0; index < attributeList.length; index++) {
            // 属性チェック
            const catalogCode: number = await this.attributeCheck(connection, em, attributeList[index]);

            // タイプを取得
            const type: number = attributeList[index].type;
            const attribute = JSON.parse(attributeList[index].attribute);
            if (type === UpdateSetType.ADD || type === UpdateSetType.UPDATE) {
                // 申請種別が追加/更新の場合、AttributeService.putAttributeを呼んで更新処理を行う
                const catalogServideDto = new CatalogServiceDto();
                catalogServideDto.setOperator(operator);
                catalogServideDto.setCode(catalogCode);
                const catalogItem = {};
                catalogItem['attribute'] = attribute;
                catalogServideDto.setCatalog(catalogItem);
                // 属性を更新
                const attributeService = new AttributeService();
                await attributeService.putAttribute(connection, em, catalogServideDto);
            } else {
                // 申請種別が削除の場合、属性にnullを設定してAttributeService.putAttributeを呼び、更新処理を行う
                const catalogServideDto = new CatalogServiceDto();
                catalogServideDto.setOperator(operator);
                catalogServideDto.setCode(catalogCode);
                const catalogItem = {};
                catalogItem['attribute'] = null;
                catalogServideDto.setCatalog(catalogItem);
                // 属性を更新
                const attributeService = new AttributeService();
                await attributeService.putAttribute(connection, em, catalogServideDto);
            }
        }
    }

    /**
     * 承認アクターがオペレーターのアクターと関係があるか確認する
     * @param operator
     * @param approvalActor
     */
    private async checkApprovalActor (operator: OperatorDomain, approvalActor: number) {
        let isError = true;

        // Rootのカタログ取得
        const catalogServiceDto = new CatalogServiceDto();
        catalogServiceDto.setOperator(operator);
        catalogServiceDto.setCode(approvalActor);
        const catalogService = new CatalogService();
        let approvalActorCatalog;
        try {
            approvalActorCatalog = await catalogService.getCatalogByCodeVersion(getConnection('postgres'), null, catalogServiceDto);
        } catch (e) {
            throw new AppError(Message.CATALOG_NOT_FOUND, ResponseCode.BAD_REQUEST);
        }
        const approvalActorNs: string = approvalActorCatalog['catalogItem']['ns'];

        if (/^catalog\/ext\/.*\/actor\/pxr-root$/.test(approvalActorNs)) {
            isError = false;
        } else {
            const regions = approvalActorCatalog['template']['region'];
            if (regions && Array.isArray(regions) && regions.length > 0) {
                // オペレーターアクターのカタログ取得
                catalogServiceDto.setCode(operator.actorCode);
                let actorCatalog;
                try {
                    actorCatalog = await catalogService.getCatalogByCodeVersion(getConnection('postgres'), null, catalogServiceDto);
                } catch (e) {
                    throw new AppError(Message.CATALOG_NOT_FOUND, ResponseCode.BAD_REQUEST);
                }
                // オペレーターのアクターカタログに設定されているappの中で、承認アクターのregionと提携しているものがあるかチェックする
                if (actorCatalog['template']['application'] && Array.isArray(actorCatalog['template']['application']) && actorCatalog['template']['application'].length > 0) {
                    isError = await this.checkRegionAlliance(actorCatalog, regions, isError, 'application');
                }
            }
        }
        if (isError) {
            throw new AppError(Message.INVALID_APPROVAL_ACTOR, ResponseCode.BAD_REQUEST);
        }
    }

    private async checkRegionAlliance (actorCatalog: {}, regions: any[], isError: boolean, app: string) {
        const catalogServiceDto = new CatalogServiceDto();
        const catalogService = new CatalogService();
        for (const appCode of actorCatalog['template'][app]) {
            catalogServiceDto.setCode(appCode._value);
            let appCatalog;
            try {
                appCatalog = await catalogService.getCatalogByCodeVersion(getConnection('postgres'), null, catalogServiceDto);
            } catch (e) {
                continue;
            }
            const regionAlliances = appCatalog['template']['region-alliance'];
            if (regionAlliances && Array.isArray(regionAlliances)) {
                for (const regionAlliance of regionAlliances) {
                    const isMatch = regions.some(ele => Number(ele['_value']) === Number(regionAlliance['_value'])
                    );
                    if (isMatch) {
                        isError = false;
                        return isError;
                    }
                }
            }
        }
        return isError;
    }

    /**
     * 変更セットフル情報取得
     * @param connection
     * @param dto
     * @param em
     */
    private async getUpdateSetInfo (connection: Connection, dto: UpdateSetServiceDto, em: EntityManager = null): Promise<{}> {
        // 対象変更セットのフルセットを取得
        const updateSetDomain = new UpdateSetDomain();
        updateSetDomain.id = dto.getUpdateSetId();
        const updateSetRepository = new UpdateSetRepository(connection);
        const updateSetInfo = await updateSetRepository.getRecordById(em, updateSetDomain);

        // 対象変更セットのネームスペースリストを取得
        const updateSetNsDomain = new UpdateSetNsDomain();
        updateSetNsDomain.updateSetId = dto.getUpdateSetId();
        const updateSetNsRepository = new UpdateSetNsRepository(connection);
        const updateSetNsList = await updateSetNsRepository.getRecord(em, updateSetNsDomain);

        // 対象変更セットのカタログスリストを取得
        const updateSetCatalogDomain = new UpdateSetCatalogDomain();
        updateSetCatalogDomain.updateSetId = dto.getUpdateSetId();
        const updateSetCatalogRepository = new UpdateSetCatalogRepository(connection);
        const updateSetCatalogList = await updateSetCatalogRepository.getRecord(em, updateSetCatalogDomain);

        // 対象変更セットの属性スリストを取得
        const updateSetAttributeDomain = new UpdateSetAttributeDomain();
        updateSetAttributeDomain.updateSetId = dto.getUpdateSetId();
        const updateSetAttributeRepository = new UpdateSetAttributeRepository(connection);
        const updateSetAttributeList = await updateSetAttributeRepository.getRecord(em, updateSetAttributeDomain);

        // レスポンスを生成
        const res: UpdateSetSearchGetResDto = new UpdateSetSearchGetResDto();
        res.id = updateSetInfo.id;
        res.name = updateSetInfo.name;
        res.description = updateSetInfo.description;
        res.type = updateSetInfo.type;
        res.callerActorCode = updateSetInfo.callerActorCode;
        res.approvalActorCode = updateSetInfo.approvalActorCode;
        res.approver = updateSetInfo.approver;
        res.approvalAt = updateSetInfo.approvalAt;
        res.comment = updateSetInfo.comment;
        res.status = updateSetInfo.status;
        res.registerActorCode = updateSetInfo.registerActorCode;
        res.register = updateSetInfo.register;
        res.registAt = updateSetInfo.registAt;
        res.ns = updateSetNsList && updateSetNsList.length > 0 ? [] : null;
        for (let index = 0; index < updateSetNsList.length; index++) {
            res.ns.push({
                type: updateSetNsList[index].type,
                nsId: updateSetNsList[index].nsId,
                comment: updateSetNsList[index].comment,
                template: JSON.parse(updateSetNsList[index].template)
            });
        }
        res.catalog = updateSetCatalogList && updateSetCatalogList.length > 0 ? [] : null;
        for (let index = 0; index < updateSetCatalogList.length; index++) {
            res.catalog.push({
                type: updateSetCatalogList[index].type,
                catalogCode: updateSetCatalogList[index].catalogItemCode,
                comment: updateSetCatalogList[index].comment,
                template: JSON.parse(updateSetCatalogList[index].template)
            });
        }
        res.attribute = updateSetAttributeList && updateSetAttributeList.length > 0 ? [] : null;
        for (let index = 0; index < updateSetAttributeList.length; index++) {
            res.attribute.push({
                type: updateSetAttributeList[index].type,
                catalogCode: updateSetAttributeList[index].catalogCode,
                attribute: JSON.parse(updateSetAttributeList[index].attribute)
            });
        }
        res.appendix = updateSetInfo.appendix ? JSON.parse(updateSetInfo.appendix) : null;
        return res.getAsJson();
    }

    /**
     * ネームスペースチェック
     * @param connection
     * @param em
     * @param nsInfo
     */
    private async nsCheck (connection: Connection, em: EntityManager, nsInfo: {}): Promise<number> {
        const nsRepository = new NameSpaceRepository(connection);
        const type: number = Number(nsInfo['type']);
        const template: {} = typeof nsInfo['template'] === 'string' ? JSON.parse(nsInfo['template']) : nsInfo['template'];
        let nsId: number = nsInfo['nsId'] ? Number(nsInfo['nsId']) : null;
        if (type === UpdateSetType.ADD) {
            // 申請種別が追加の場合
            // 対象ネームスペースがネームスペーステーブルに存在しないことを確認する;
            const nsDomain = new NameSpaceDomain();
            nsDomain.name = template['ns'];
            nsId = await nsRepository.getNamespaceId(em, nsDomain);
            if (nsId) {
                // 対象ネームスペースが存在する場合、エラーをthrow
                throw new AppError(Message.NAMESPACE_ALREADY, ResponseCode.BAD_REQUEST);
            }
        } else if (type === UpdateSetType.UPDATE) {
            // 申請種別が更新の場合
            // 対象ネームスペースがネームスペーステーブルに存在することを確認する
            let nsDomain = new NameSpaceDomain();
            nsDomain.id = nsId;
            const ns = await nsRepository.getRecordById(em, nsDomain);
            if (!ns) {
                // 対象ネームスペースが存在しない場合、エラーをthrow
                throw new AppError(Message.NAMESPACE_NOT_FOUND, ResponseCode.BAD_REQUEST);
            }
            // 変更後のネームスペースが存在するしないことを確認する
            nsDomain = new NameSpaceDomain();
            nsDomain.id = nsId;
            nsDomain.name = template['ns'];
            const isExists: boolean = await nsRepository.isExists(em, nsDomain);
            if (isExists) {
                // 変更後のネームスペースが存在する場合、エラーをthrow
                throw new AppError(Message.NAMESPACE_ALREADY, ResponseCode.BAD_REQUEST);
            }
        } else {
            // 申請種別が削除の場合 (type === UpdateSetType.DELETE)
            // 対象ネームスペースがネームスペーステーブルに存在することを確認する;
            const nsDomain = new NameSpaceDomain();
            nsDomain.id = nsId;
            const ns = await nsRepository.getRecordById(em, nsDomain);
            if (!ns) {
                // 対象ネームスペースが存在しない場合、エラーをthrow
                throw new AppError(Message.NAMESPACE_NOT_FOUND, ResponseCode.BAD_REQUEST);
            }
        }
        return nsId;
    }

    /**
     * カタログチェック
     * @param connection
     * @param em
     * @param catalogInfo
     */
    private async catalogCheck (connection: Connection, em: EntityManager, catalogInfo: {}): Promise<number> {
        const catalogRepository = new CatalogItemRepository(connection);
        const type: number = Number(catalogInfo['type']);
        const template: {} = typeof catalogInfo['template'] === 'string' ? JSON.parse(catalogInfo['template']) : catalogInfo['template'];
        const catalogCode: number = catalogInfo['catalogCode'] ? Number(catalogInfo['catalogCode']) : (catalogInfo['catalogItemCode'] ? Number(catalogInfo['catalogItemCode']) : null);
        let catalogItemId: number = null;
        if (type === UpdateSetType.ADD) {
            // 申請種別が追加の場合

            // コード指定がある場合
            if (template['catalogItem']['_code'] && template['catalogItem']['_code']['_value']) {
                // 対象カタログがカタログ項目テーブルに存在しないことを確認する;
                const catalogDomain = new CatalogItemDomain();
                catalogDomain.code = template['catalogItem']['_code']['_value'];
                catalogDomain.version = template['catalogItem']['_code']['_ver'];
                catalogItemId = await catalogRepository.getCatalogIdIncludeDisable(em, catalogDomain, false);
                if (catalogItemId) {
                    // 対象カタログが存在する場合、エラーをthrow
                    throw new AppError(Message.CODE_ALREADY, ResponseCode.BAD_REQUEST);
                }
            }
        } else if (type === UpdateSetType.UPDATE) {
            // 申請種別が更新の場合
            // 対象カタログがカタログ項目テーブルに存在することを確認する;
            const catalogDomain = new CatalogItemDomain();
            catalogDomain.code = catalogCode;
            catalogItemId = await catalogRepository.getCatalogId(em, catalogDomain, false);
            if (!catalogItemId) {
                // 対象カタログが存在しない場合、エラーをthrow
                throw new AppError(Message.CODE_NOT_FOUND, ResponseCode.BAD_REQUEST);
            }

            // バージョン指定がある場合
            const version = template['catalogItem']['_code']['_ver'];
            if (version) {
                // 最大バージョンを取得
                let maxVersion: number = await catalogRepository.getMaxVersion(em, catalogDomain);
                maxVersion++;
                if (maxVersion !== Number(version)) {
                    // 最大Version以外が指定されている場合、エラーをthrow
                    throw new AppError(Message.VERSION_DIFFERENCE, ResponseCode.BAD_REQUEST);
                }
            }
        } else {
            // 申請種別が削除の場合 (type === UpdateSetType.DELETE)
            // 対象カタログがカタログ項目テーブルに存在することを確認する;
            const catalogDomain = new CatalogItemDomain();
            catalogDomain.code = catalogCode;
            catalogItemId = await catalogRepository.getCatalogId(em, catalogDomain, false);
            if (!catalogItemId) {
                // 対象カタログが存在しない場合、エラーをthrow
                throw new AppError(Message.CODE_NOT_FOUND, ResponseCode.BAD_REQUEST);
            }
        }
        return catalogItemId;
    }

    /**
     * 属性チェック
     * @param connection
     * @param em
     * @param attributeInfo
     */
    private async attributeCheck (connection: Connection, em: EntityManager, attributeInfo: {}): Promise<number> {
        const catalogRepository = new CatalogItemRepository(connection);
        const catalogCode: number = Number(attributeInfo['catalogCode']);

        // 対象カタログコードのカタログがカタログ項目テーブルに存在することを確認する;
        const catalogDomain = new CatalogItemDomain();
        catalogDomain.code = catalogCode;
        const catalogItemId = await catalogRepository.getCatalogId(em, catalogDomain, false);
        if (!catalogItemId) {
            // 対象カタログが存在しない場合、エラーをthrow
            throw new AppError(Message.CODE_NOT_FOUND, ResponseCode.BAD_REQUEST);
        }
        return catalogCode;
    }

    /**
     * カタログプロパティチェック
     * @param connection
     * @param em
     * @param catalogInfo
     * @param operator
     */
    private async catalogPropCheck (connection: Connection, em: EntityManager, catalogInfo: {}, operator: OperatorDomain): Promise<void> {
        const catalogRepository = new CatalogItemRepository(connection);
        const template: {} = typeof catalogInfo['template'] === 'string' ? JSON.parse(catalogInfo['template']) : catalogInfo['template'];

        // 紐づけられているカタログコードがある場合、そのカタログがカタログ項目テーブルあるいは未承認の変更セットに存在するかチェックする
        if ((template['template'] && template['template']['prop'] && template['template']['prop'].length > 0) ||
            (template['template'] && template['template']['value'] && template['template']['value'].length > 0)) {
            // 先に未承認の変更セットで追加されるカタログコードを取得しておく
            const updateSetNewCatalogCode: number[] = [];
            // 申請中の変更セットIDを取得
            const updateSetIdList: number[] = [];
            const updateSetDomain = new UpdateSetDomain();
            updateSetDomain.status = UpdateSetStatus.REQUEST;
            updateSetDomain.callerActorCode = operator.actorCode;
            updateSetDomain.approvalActorCode = operator.actorCode;
            updateSetDomain.registerActorCode = operator.actorCode;
            const updateSetRepository = new UpdateSetRepository(connection);
            const updateSetListRequest = await updateSetRepository.getRecord(null, updateSetDomain);
            for (const updateSetRequest of updateSetListRequest) {
                updateSetIdList.push(updateSetRequest.id);
            }
            // 登録の変更セットIDを取得
            updateSetDomain.status = UpdateSetStatus.REGIST;
            const updateSetListRegist = await updateSetRepository.getRecord(null, updateSetDomain);
            for (const updateSetRegist of updateSetListRegist) {
                updateSetIdList.push(updateSetRegist.id);
            }
            // 変更セットで新規追加されるカタログコードを取得
            const updateSetCatalogDomain = new UpdateSetCatalogDomain();
            const updateSetCatalogRepository = new UpdateSetCatalogRepository(connection);
            for (const updateSetId of updateSetIdList) {
                updateSetCatalogDomain.updateSetId = updateSetId;
                const updateSetCatalogList = await updateSetCatalogRepository.getRecord(null, updateSetCatalogDomain);
                for (const updateSetCatalog of updateSetCatalogList) {
                    if (updateSetCatalog.type === UpdateSetType.ADD && updateSetCatalog.catalogItemCode) {
                        updateSetNewCatalogCode.push(updateSetCatalog.catalogItemCode);
                    }
                }
            }

            let values: number[] = [];
            // prop配列内の各コードをチェック対象に追加
            if (template['template']['prop'] && template['template']['prop'].length > 0) {
                for (const prop of template['template']['prop']) {
                    // type._code オブジェクト内の_valueを取得
                    if (prop['type']['_code'] && prop['type']['_code']['_value']) {
                        values.push(prop['type']['_code']['_value']);
                    }
                    // type.candidate._code 配列内の_valueを取得
                    if (prop['type']['candidate'] && prop['type']['candidate']['_code'] && prop['type']['candidate']['_code'].length > 0) {
                        for (const code of prop['type']['candidate']['_code']) {
                            values.push(code['_value']);
                        }
                    }
                    // type.candidate.base オブジェクト内の_valueを取得
                    if (prop['type']['candidate'] && prop['type']['candidate']['base'] && prop['type']['candidate']['base']['_value']) {
                        values.push(prop['type']['candidate']['base']['_value']);
                    }
                }
            }

            // value配列内の各コードをチェック対象に追加
            if (template['template']['value'] && Array.isArray(template['template']['value']) && template['template']['value'].length > 0) {
                values = await this.catalogValueCheck(template['template']['value'], values);
            }

            for (const value of values) {
                // 対象カタログがカタログ項目テーブルに存在することを確認する
                const catalogDomain = new CatalogItemDomain();
                catalogDomain.code = value;
                const catalogItemId = await catalogRepository.getCatalogId(em, catalogDomain, false);
                if (catalogItemId) {
                    continue;
                } else {
                    // 無ければ未承認の変更セットで追加されるカタログコードに存在するか確認する
                    if (!(updateSetNewCatalogCode.length > 0 && updateSetNewCatalogCode.includes(value))) {
                        throw new AppError(sprintf(Message.INVALID_CANDIDATE_CODE, value), ResponseCode.BAD_REQUEST);
                    }
                }
            }
        }
    }

    /**
     * カタログバリューチェック
     * value配列内のコードを存在チェック対象に追加する
     * @param keyValues
     * @param values
     */
    private async catalogValueCheck (keyValues: Array<object>, values: number[]) {
        for (const keyValue of keyValues) {
            // valueがネストしている場合、再帰呼出する
            if (Array.isArray(keyValue['value'])) {
                values = await this.catalogValueCheck(keyValue['value'], values);
            }
            if (keyValue['key'] === '_value') {
                values.push(keyValue['value']);
            }
        }
        return values;
    }

    /**
     * 名称から該当タイプを設定
     * @param name
     */
    private getTypeByName (name: string): string {
        if (!name) {
            return null;
        }
        if (name.indexOf('/model') >= 0) {
            return 'model';
        }
        if (name.indexOf('/built_in') >= 0) {
            return 'built_in';
        }
        return 'ext';
    }
}
