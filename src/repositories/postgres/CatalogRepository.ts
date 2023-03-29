/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Connection, EntityManager, InsertResult, UpdateResult } from 'typeorm';
import { Service } from 'typedi';
import CatalogEntity from './CatalogEntity';
import CatalogDomain from '../../domains/CatalogDomain';
/* eslint-enable */
import Log from '../../common/LogDecorator';
// import { applicationLogger } from '../../common/logging';

@Service()
export default class CatalogRepository {
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
     * 対象カタログ取得
     * @param em
     * @param domain
     */
    @Log()
    public async getRecord (em: EntityManager, domain: CatalogDomain): Promise<CatalogEntity> {
        // SQLを生成
        const connection = em || this.connection;
        let sql = connection
            .createQueryBuilder()
            .from(CatalogEntity, 'catalog')
            .where('is_disabled = :is_disabled', { is_disabled: false });
        if (domain.id) {
            sql = sql.andWhere('id = :id', { id: domain.id });
        }
        sql = sql.orderBy('id', 'ASC');
        // SQLを実行
        const ret = await sql.getRawOne();
        return ret ? new CatalogEntity(ret) : null;
    }

    /**
     * 対象カタログ件数取得
     * @param em
     * @param domain
     */
    @Log()
    public async getRecordCount (em: EntityManager, domain: CatalogDomain): Promise<number> {
        // SQLを生成
        const connection = em || this.connection;
        let sql = connection
            .createQueryBuilder()
            .from(CatalogEntity, 'catalog')
            .where('is_disabled = :is_disabled', { is_disabled: false });
        if (domain.id) {
            sql = sql.andWhere('id = :id', { id: domain.id });
        }
        // SQLを実行
        const ret = await sql.getCount();
        return ret;
    }

    /**
     * カタログ追加
     * @param em
     * @param domain
     */
    @Log()
    public async insertRecord (em: EntityManager, domain: CatalogDomain): Promise<InsertResult> {
        const ret = await em
            .createQueryBuilder()
            .insert()
            .into(CatalogEntity)
            .values({
                id: domain.id,
                name: domain.name,
                description: domain.description,
                extName: domain.extName,
                isDisabled: false,
                attributes: domain.attributes,
                createdBy: domain.updatedBy,
                updatedBy: domain.updatedBy
            })
            .execute();
        return ret;
    }

    /**
     * カタログ更新
     * @param em
     * @param domain
     */
    @Log()
    public async updateRecord (em: EntityManager, domain: CatalogDomain): Promise<UpdateResult> {
        const ret = await em
            .createQueryBuilder()
            .update(CatalogEntity)
            .set({
                name: domain.name,
                description: domain.description,
                extName: domain.extName,
                updatedBy: domain.updatedBy
            })
            .where('id = :id', { id: domain.id })
            .andWhere('is_disabled = :is_disabled', { is_disabled: false })
            .execute();
        return ret;
    }

    /**
     * カタログ削除
     * @param em
     * @param domain
     */
    @Log()
    public async deleteRecord (em: EntityManager, domain: CatalogDomain): Promise<UpdateResult> {
        const ret = await em
            .createQueryBuilder()
            .update(CatalogEntity)
            .set({
                isDisabled: true,
                updatedBy: domain.updatedBy
            })
            .where('id = :id', { id: domain.id })
            .execute();
        return ret;
    }
}
