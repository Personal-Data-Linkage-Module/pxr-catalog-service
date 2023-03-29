/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Connection, EntityManager, InsertResult, UpdateResult } from 'typeorm';
import { Service } from 'typedi';
import CatalogCodeScopeDomain from '../../domains/CatalogCodeScopeDomain';
import CatalogCodeScopeEntity from './CatalogCodeScopeEntity';
/* eslint-enable */
import Log from '../../common/LogDecorator';

@Service()
export default class CatalogCodeScopeRepository {
    /**
     * DB接続オブジェクト
     */
    private connection: Connection;

    /**
     * コンストラクタ
     * @param connection
     */
    public constructor (connection: Connection) {
        this.connection = connection;
    }

    /**
     * カタログコード範囲取得
     * @param em
     * @param domain
     */
    @Log()
    public async getRecord (em: EntityManager, domain: CatalogCodeScopeDomain): Promise<CatalogCodeScopeEntity[]> {
        // SQLを生成
        const connection = em || this.connection;
        let sql = connection
            .createQueryBuilder()
            .from(CatalogCodeScopeEntity, 'catalog_code_scope')
            .where('is_disabled = :is_disabled', { is_disabled: false });
        if (domain.type) {
            sql = sql.andWhere('type = :type', { type: domain.type });
        }
        sql = sql.orderBy('start_code', 'ASC');

        // SQLを実行
        const ret = await sql.getRawMany();
        const list: CatalogCodeScopeEntity[] = [];
        for (const info of ret) {
            list.push(new CatalogCodeScopeEntity(info));
        }
        return list;
    }

    /**
     * カタログコード範囲件数取得
     * @param em
     * @param domain
     */
    @Log()
    public async getRecordCount (em: EntityManager, domain: CatalogCodeScopeDomain): Promise<number> {
        // SQLを生成
        const connection = em || this.connection;
        let sql = connection
            .createQueryBuilder()
            .from(CatalogCodeScopeEntity, 'catalog_code_scope')
            .where('is_disabled = :is_disabled', { is_disabled: false });
        if (domain.type) {
            sql = sql.andWhere('type = :type', { type: domain.type });
        }

        // SQLを実行
        const ret = await sql.getCount();
        return ret;
    }

    /**
     * カタログコード有効確認
     * @param em
     * @param type
     * @param code
     */
    @Log()
    public async isCatalogCodeValid (em: EntityManager, type: string, code: number): Promise<boolean> {
        // SQLを生成
        const connection = em || this.connection;
        let sql = connection
            .createQueryBuilder()
            .from(CatalogCodeScopeEntity, 'catalog_code_scope')
            .where('is_disabled = :is_disabled', { is_disabled: false });
        if (type) {
            sql = sql.andWhere('type = :type', { type: type });
        }
        if (code) {
            sql = sql.andWhere('start_code <= :start_code', { start_code: code })
                .andWhere('end_code >= :end_code', { end_code: code });
        }

        // SQLを実行
        const ret = await sql.getCount();
        return ret > 0;
    }

    /**
     * カタログコード範囲の存在確認
     * @param em
     * @param domain
     */
    @Log()
    public async isCatalogCodeExists (em: EntityManager, domain: CatalogCodeScopeDomain): Promise<boolean> {
        // SQLを生成
        const connection = em || this.connection;
        let sql = connection
            .createQueryBuilder()
            .from(CatalogCodeScopeEntity, 'catalog_code_scope')
            .where('is_disabled = :is_disabled', { is_disabled: false });
        if (domain.id) {
            sql = sql.andWhere('id != :id', { id: domain.id });
        }
        if (domain.startCode && domain.endCode) {
            sql = sql.andWhere(`
            (
                (
                        start_code <= :startCode
                    AND end_code >= :startCode
                )
                OR
                (
                        start_code <= :endCode
                    AND end_code >= :endCode
                )
            )`, {
                startCode: domain.startCode,
                endCode: domain.endCode
            });
        }

        // SQLを実行
        const ret = await sql.getCount();
        return ret > 0;
    }

    /**
     * 次コード取得
     * @param em
     * @param type
     * @param code
     */
    @Log()
    public async getNextCatalogCode (em: EntityManager, type: string, code: number): Promise<number> {
        // SQLを生成
        const connection = em || this.connection;
        let sql = connection
            .createQueryBuilder()
            .from(CatalogCodeScopeEntity, 'catalog_code_scope')
            .where('is_disabled = :is_disabled', { is_disabled: false });
        if (type) {
            sql = sql.andWhere('type = :type', { type: type });
        }
        if (code) {
            sql = sql.andWhere('start_code > :start_code', { start_code: code });
        }

        // SQLを実行
        const ret = await sql.getRawOne();
        return ret ? Number(ret['start_code']) : null;
    }

    /**
     * カタログコード範囲追加
     * @param em
     * @param domain
     */
    @Log()
    public async insertRecord (em: EntityManager, domain: CatalogCodeScopeDomain): Promise<InsertResult> {
        const ret = await em
            .createQueryBuilder()
            .insert()
            .into(CatalogCodeScopeEntity)
            .values({
                type: domain.type,
                startCode: domain.startCode,
                endCode: domain.endCode,
                isDisabled: false,
                createdBy: domain.updatedBy,
                updatedBy: domain.updatedBy
            })
            .execute();
        return ret;
    }

    /**
     * カタログコード範囲更新
     * @param em
     * @param domain
     */
    @Log()
    public async updateRecord (em: EntityManager, domain: CatalogCodeScopeDomain): Promise<UpdateResult> {
        const ret = await em
            .createQueryBuilder()
            .update(CatalogCodeScopeEntity)
            .set({
                startCode: domain.startCode,
                endCode: domain.endCode,
                updatedBy: domain.updatedBy
            })
            .where('id = :id', { id: domain.id })
            .andWhere('is_disabled = :is_disabled', { is_disabled: false })
            .execute();
        return ret;
    }

    /**
     * カタログコード範囲削除
     * @param em
     * @param domain
     */
    @Log()
    public async deleteRecord (em: EntityManager, domain: CatalogCodeScopeDomain): Promise<UpdateResult> {
        const ret = await em
            .createQueryBuilder()
            .update(CatalogCodeScopeEntity)
            .set({
                isDisabled: true,
                updatedBy: domain.updatedBy
            })
            .where('id = :id', { id: domain.id })
            .execute();
        return ret;
    }
}
