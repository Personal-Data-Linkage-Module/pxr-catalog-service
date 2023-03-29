/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Connection, EntityManager, InsertResult, UpdateResult } from 'typeorm';
import { Service } from 'typedi';
import CmatrixIndexDomain from '../../domains/CmatrixIndexDomain';
import CmatrixIndexEntity from './CmatrixIndexEntity';
/* eslint-enable */
import Log from '../../common/LogDecorator';

@Service()
export default class CmatrixIndexRepository {
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
     * Cmatrixインデックス取得
     * @param em
     * @param domain
     */
    @Log()
    public async getRecord (em: EntityManager, domain: CmatrixIndexDomain): Promise<CmatrixIndexEntity[]> {
        // SQLを生成
        const connection = em || this.connection;
        let sql = connection
            .createQueryBuilder()
            .from(CmatrixIndexEntity, 'cmatrix_index')
            .where('is_disabled = :is_disabled', { is_disabled: false });
        if (domain.id) {
            sql = sql.andWhere('id = :id', { id: domain.id });
        }
        if (domain.catalogItemId) {
            sql = sql.andWhere('catalog_item_id = :catalog_item_id', { catalog_item_id: domain.catalogItemId });
        }
        if (domain.indexKey) {
            sql = sql.andWhere('index_key = :index_key', { index_key: domain.indexKey });
        }
        // SQLを実行
        const ret = await sql.getRawMany();
        const list: CmatrixIndexEntity[] = [];
        for (const info of ret) {
            list.push(new CmatrixIndexEntity(info));
        }
        return list;
    }

    /**
     * Cmatrixインデックス追加
     * @param em
     * @param domain
     */
    @Log()
    public async insertRecord (em: EntityManager, domain: CmatrixIndexDomain): Promise<InsertResult> {
        const ret = await em
            .createQueryBuilder()
            .insert()
            .into(CmatrixIndexEntity)
            .values({
                catalogItemId: domain.catalogItemId,
                indexKey: domain.indexKey,
                value: domain.value,
                reserved: domain.reserved,
                isDisabled: false,
                attributes: domain.attributes,
                createdBy: domain.updatedBy,
                updatedBy: domain.updatedBy
            })
            .execute();
        return ret;
    }

    /**
     * Cmatrixインデックス更新
     * @param em
     * @param domain
     */
    @Log()
    public async updateRecord (em: EntityManager, domain: CmatrixIndexDomain): Promise<UpdateResult> {
        const ret = await em
            .createQueryBuilder()
            .update(CmatrixIndexEntity)
            .set({
                catalogItemId: domain.catalogItemId,
                indexKey: domain.indexKey,
                value: domain.value,
                reserved: domain.reserved,
                updatedBy: domain.updatedBy
            })
            .where('id = :id', { id: domain.id })
            .andWhere('is_disabled = :is_disabled', { is_disabled: false })
            .execute();
        return ret;
    }

    /**
     * Cmatrixインデックス削除
     * @param em
     * @param domain
     */
    @Log()
    public async deleteRecord (em: EntityManager, domain: CmatrixIndexDomain): Promise<UpdateResult> {
        const ret = await em
            .createQueryBuilder()
            .update(CmatrixIndexEntity)
            .set({
                isDisabled: true,
                updatedBy: domain.updatedBy
            })
            .where('id = :id', { id: domain.id })
            .execute();
        return ret;
    }
}
