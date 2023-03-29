/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Connection, EntityManager, InsertResult, UpdateResult } from 'typeorm';
import { Service } from 'typedi';
import CatalogItemAttributeDomain from '../../domains/CatalogItemAttributeDomain';
import CatalogItemAttributeEntity from './CatalogItemAttributeEntity';
/* eslint-enable */
import Log from '../../common/LogDecorator';

@Service()
export default class CatalogItemAttributeRepository {
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
     * カタログ属性取得
     * @param em
     * @param domain
     */
    @Log()
    public async getRecord (em: EntityManager, domain: CatalogItemAttributeDomain): Promise<CatalogItemAttributeEntity[]> {
        // SQLを生成
        const connection = em || this.connection;
        let sql = connection
            .createQueryBuilder()
            .from(CatalogItemAttributeEntity, 'catalog_item_attribute')
            .where('is_disabled = :is_disabled', { is_disabled: false });
        if (domain.id) {
            sql = sql.andWhere('id = :id', { id: domain.id });
        }
        if (domain.catalogItemId) {
            sql = sql.andWhere('catalog_item_id = :catalog_item_id', { catalog_item_id: domain.catalogItemId });
        }
        if (domain.catalogCode) {
            sql = sql.andWhere('catalog_code = :catalog_code', { catalog_code: domain.catalogCode });
        }
        sql = sql.orderBy('key_code', 'ASC')
            .addOrderBy('key_version', 'ASC');

        // SQLを実行
        const ret = await sql.getRawMany();
        const list: CatalogItemAttributeEntity[] = [];
        for (const info of ret) {
            list.push(new CatalogItemAttributeEntity(info));
        }
        return list;
    }

    /**
     * 対象カタログコード取得
     * @param em
     * @param domain
     */
    @Log()
    public async getCatalogCode (em: EntityManager, domain: CatalogItemAttributeDomain): Promise<number> {
        // SQLを生成
        const connection = em || this.connection;
        let sql = connection
            .createQueryBuilder()
            .from(CatalogItemAttributeEntity, 'catalog_item_attribute')
            .where('is_disabled = :is_disabled', { is_disabled: false });
        if (domain.catalogItemId) {
            sql = sql.andWhere('catalog_item_id = :catalog_item_id', { catalog_item_id: domain.catalogItemId });
        }
        if (domain.catalogCode) {
            sql = sql.andWhere('catalog_code = :catalog_code', { catalog_code: domain.catalogCode });
        }

        // SQLを実行
        const ret = await sql.getRawOne();
        return ret ? Number(ret['catalog_code']) : null;
    }

    /**
     * カタログ属性追加
     * @param em
     * @param domain
     */
    @Log()
    public async insertRecord (em: EntityManager, domain: CatalogItemAttributeDomain): Promise<InsertResult> {
        const ret = await em
            .createQueryBuilder()
            .insert()
            .into(CatalogItemAttributeEntity)
            .values({
                catalogItemId: domain.catalogItemId,
                catalogCode: domain.catalogCode,
                type: domain.type,
                keyCode: domain.keyCode,
                keyVersion: domain.keyVersion,
                nsId: domain.nsId,
                value: domain.value,
                description: domain.description,
                isDisabled: false,
                createdBy: domain.updatedBy,
                updatedBy: domain.updatedBy
            })
            .execute();
        return ret;
    }

    /**
     * カタログ属性更新
     * @param em
     * @param domain
     */
    @Log()
    public async updateRecord (em: EntityManager, domain: CatalogItemAttributeDomain): Promise<UpdateResult> {
        const ret = await em
            .createQueryBuilder()
            .update(CatalogItemAttributeEntity)
            .set({
                catalogItemId: domain.catalogItemId,
                catalogCode: domain.catalogCode,
                type: domain.type,
                keyCode: domain.keyCode,
                keyVersion: domain.keyVersion,
                nsId: domain.nsId,
                value: domain.value,
                description: domain.description,
                updatedBy: domain.updatedBy
            })
            .where('id = :id', { id: domain.id })
            .andWhere('is_disabled = :is_disabled', { is_disabled: false })
            .execute();
        return ret;
    }

    /**
     * カタログ属性削除
     * @param em
     * @param domain
     */
    @Log()
    public async deleteRecord (em: EntityManager, domain: CatalogItemAttributeDomain): Promise<UpdateResult> {
        const ret = await em
            .createQueryBuilder()
            .update(CatalogItemAttributeEntity)
            .set({
                isDisabled: true,
                updatedBy: domain.updatedBy
            })
            .where('id = :id', { id: domain.id })
            .execute();
        return ret;
    }

    /**
     * カタログ属性削除
     * @param em
     * @param domain
     */
    @Log()
    public async deleteRecordByCatalogItemId (em: EntityManager, domain: CatalogItemAttributeDomain): Promise<UpdateResult> {
        const ret = await em
            .createQueryBuilder()
            .update(CatalogItemAttributeEntity)
            .set({
                isDisabled: true,
                updatedBy: domain.updatedBy
            })
            .where('catalog_item_id = :catalog_item_id', { catalog_item_id: domain.catalogItemId })
            .execute();
        return ret;
    }
}
