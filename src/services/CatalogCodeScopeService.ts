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
import CatalogCodeScopeServiceDto from './dto/CatalogCodeScopeServiceDto';
import CatalogCodeScopeRepository from '../repositories/postgres/CatalogCodeScopeRepository';
import CatalogCodeScopeDomain from '../domains/CatalogCodeScopeDomain';
import CatalogRepository from '../repositories/postgres/CatalogRepository';
import CatalogDomain from '../domains/CatalogDomain';
import OperatorDomain from '../domains/OperatorDomain';
import CatalogCodeScopeGetResDto, { CatalogCodeScopeDto } from '../resources/dto/CatalogCodeScopeGetResDto';
import CatalogCodeScopeGetByTypeResDto from '../resources/dto/CatalogCodeScopeGetByTypeResDto';
import CatalogCodeScopePostResDto from '../resources/dto/CatalogCodeScopePostResDto';
import CatalogCodeScopePutResDto from '../resources/dto/CatalogCodeScopePutResDto';
import CatalogCodeScopeDeleteResDto from '../resources/dto/CatalogCodeScopeDeleteResDto';
/* eslint-enable */
import Config from '../common/Config';
const Message = Config.ReadConfig('./config/message.json');

/**
 * カタログコード範囲操作サービス
 */
export default class CatalogCodeScopeService {
    /**
     * カタログコード範囲取得
     * @param connection
     * @param dto
     */
    public async getCatalogCodeScope (connection: Connection, dto: CatalogCodeScopeServiceDto): Promise<{}> {
        // カタログ名の存在確認
        const catalogDomain = new CatalogDomain();
        const catalogRepository = new CatalogRepository(connection);
        const catalogInfoCount = await catalogRepository.getRecordCount(null, catalogDomain);
        if (catalogInfoCount <= 0) {
            // カタログ名が存在しない場合、エラーをthrow
            throw new AppError(Message.NOT_ACTIVATE, ResponseCode.UNAUTHORIZED);
        }

        // 対象ネームスペースを取得
        const scopeDomain = new CatalogCodeScopeDomain();
        const nsRepository = new CatalogCodeScopeRepository(connection);
        const list = await nsRepository.getRecord(null, scopeDomain);
        if (list === undefined || !list || list.length <= 0) {
            // 対象カタログコード範囲が存在しない場合、エラーをthrow
            throw new AppError(Message.CODE_NOT_FOUND, ResponseCode.NOT_FOUND);
        }

        // レスポンスを返す
        const res: CatalogCodeScopeGetResDto = new CatalogCodeScopeGetResDto();
        for (const info of list) {
            const nsInfo = new CatalogCodeScopeDto();
            nsInfo.id = info.id;
            nsInfo.type = info.type;
            nsInfo.startCode = info.startCode;
            nsInfo.endCode = info.endCode;
            res.list.push(nsInfo);
        }
        return res.getAsJson();
    }

    /**
     * カタログコード範囲取得
     * @param connection
     * @param dto
     */
    public async getCatalogCodeScopeByType (connection: Connection, dto: CatalogCodeScopeServiceDto): Promise<{}> {
        // カタログ名の存在確認
        const catalogDomain = new CatalogDomain();
        const catalogRepository = new CatalogRepository(connection);
        const catalogInfoCount = await catalogRepository.getRecordCount(null, catalogDomain);
        if (catalogInfoCount <= 0) {
            // カタログ名が存在しない場合、エラーをthrow
            throw new AppError(Message.NOT_ACTIVATE, ResponseCode.UNAUTHORIZED);
        }

        // 対象カタログコード範囲を取得
        const nsDomain = new CatalogCodeScopeDomain();
        nsDomain.type = dto.getType();
        const nsRepository = new CatalogCodeScopeRepository(connection);
        const list = await nsRepository.getRecord(null, nsDomain);
        if (list === undefined || !list || list.length <= 0) {
            // 対象カタログコード範囲が存在しない場合、エラーをthrow
            throw new AppError(Message.CODE_NOT_FOUND, ResponseCode.NOT_FOUND);
        }

        // レスポンスを返す
        const res: CatalogCodeScopeGetByTypeResDto = new CatalogCodeScopeGetByTypeResDto();
        for (const info of list) {
            const nsInfo = new CatalogCodeScopeDto();
            nsInfo.id = info.id;
            nsInfo.type = info.type;
            nsInfo.startCode = info.startCode;
            nsInfo.endCode = info.endCode;
            res.list.push(nsInfo);
        }
        return res.getAsJson();
    }

    /**
     * カタログコード範囲追加
     * @param connection
     * @param dto
     */
    public async insertCatalogCodeScope (connection: Connection, dto: CatalogCodeScopeServiceDto): Promise<{}> {
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

        // カタログコード範囲の存在確認
        let scopeDomain = new CatalogCodeScopeDomain();
        scopeDomain.type = dto.getType();
        scopeDomain.startCode = dto.getStartCode();
        scopeDomain.endCode = dto.getEndCode();
        let scopeRepository = new CatalogCodeScopeRepository(connection);
        const isCatalogCodeExists: boolean = await scopeRepository.isCatalogCodeExists(null, scopeDomain);
        if (isCatalogCodeExists) {
            // 既に有効なカタログコード範囲が存在する場合、エラーをthrow
            throw new AppError(Message.CODE_SCOPE_ALREADY, ResponseCode.BAD_REQUEST);
        }

        // カタログコード範囲を追加
        let ret: InsertResult = null;
        await connection.transaction(async em => {
            scopeDomain = new CatalogCodeScopeDomain();
            scopeDomain.type = dto.getType();
            scopeDomain.startCode = dto.getStartCode();
            scopeDomain.endCode = dto.getEndCode();
            scopeDomain.updatedBy = operator.loginId;
            scopeRepository = new CatalogCodeScopeRepository(connection);
            ret = await scopeRepository.insertRecord(em, scopeDomain);
        }).catch(err => {
            throw err;
        });

        // レスポンスを返す
        const res: CatalogCodeScopePostResDto = new CatalogCodeScopePostResDto();
        res.id = Number(ret.identifiers[0].id);
        res.type = dto.getType();
        res.startCode = dto.getStartCode();
        res.endCode = dto.getEndCode();
        return res.getAsJson();
    }

    /**
     * カタログコード範囲更新
     * @param connection
     * @param dto
     */
    public async updateCatalogCodeScope (connection: Connection, dto: CatalogCodeScopeServiceDto): Promise<{}> {
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

        // カタログコード範囲の存在確認
        let scopeDomain = new CatalogCodeScopeDomain();
        scopeDomain.id = dto.getId();
        scopeDomain.type = dto.getType();
        scopeDomain.startCode = dto.getStartCode();
        scopeDomain.endCode = dto.getEndCode();
        let scopeRepository = new CatalogCodeScopeRepository(connection);
        const isCatalogCodeExists: boolean = await scopeRepository.isCatalogCodeExists(null, scopeDomain);
        if (isCatalogCodeExists) {
            // 既に有効なカタログコード範囲が存在する場合、エラーをthrow
            throw new AppError(Message.CODE_SCOPE_ALREADY, ResponseCode.BAD_REQUEST);
        }

        // カタログコード範囲を更新
        await connection.transaction(async em => {
            scopeDomain = new CatalogCodeScopeDomain();
            scopeDomain.type = dto.getType();
            scopeDomain.startCode = dto.getStartCode();
            scopeDomain.endCode = dto.getEndCode();
            scopeDomain.updatedBy = operator.loginId;
            scopeRepository = new CatalogCodeScopeRepository(connection);
            await scopeRepository.updateRecord(em, scopeDomain);
        }).catch(err => {
            throw err;
        });

        // レスポンスを返す
        const res: CatalogCodeScopePutResDto = new CatalogCodeScopePutResDto();
        res.id = dto.getId();
        res.type = dto.getType();
        res.startCode = dto.getStartCode();
        res.endCode = dto.getEndCode();
        return res.getAsJson();
    }

    /**
     * カタログコード範囲削除
     * @param connection
     * @param dto
     */
    public async deleteCatalogCodeScope (connection: Connection, dto: CatalogCodeScopeServiceDto): Promise<{}> {
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

        // カタログコード範囲を削除
        await connection.transaction(async em => {
            const scopeDomain = new CatalogCodeScopeDomain();
            scopeDomain.id = dto.getId();
            scopeDomain.updatedBy = operator.loginId;
            const scopeRepository = new CatalogCodeScopeRepository(connection);
            await scopeRepository.deleteRecord(em, scopeDomain);
        }).catch(err => {
            throw err;
        });

        // レスポンスを返す
        const ret: CatalogCodeScopeDeleteResDto = new CatalogCodeScopeDeleteResDto();
        ret.id = dto.getId();
        return ret.getAsJson();
    }
}
