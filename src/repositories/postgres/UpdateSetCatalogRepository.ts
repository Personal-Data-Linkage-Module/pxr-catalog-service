/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Connection, EntityManager, InsertResult, UpdateResult } from 'typeorm';
import { Service } from 'typedi';
import UpdateSetCatalogDomain from '../../domains/UpdateSetCatalogDomain';
/* eslint-enable */
import Log from '../../common/LogDecorator';
import UpdateSetCatalogEntity from './UpdateSetCatalogEntity';

@Service()
export default class UpdateSetCatalogRepository {
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
     * 変更セットカタログ取得
     * @param em
     * @param domain
     */
    @Log()
    public async getRecord (em: EntityManager, domain: UpdateSetCatalogDomain): Promise<UpdateSetCatalogEntity[]> {
        // SQLを生成
        const connection = em || this.connection;
        let sql = connection
            .createQueryBuilder()
            .from(UpdateSetCatalogEntity, 'update_set_catalog')
            .where('is_disabled = :is_disabled', { is_disabled: false });
        if (domain.updateSetId) {
            sql = sql.andWhere('update_set_id = :update_set_id', { update_set_id: domain.updateSetId });
        }
        if (domain.catalogItemId) {
            sql = sql.andWhere('catalog_item_id = :catalog_item_id', { catalog_item_id: domain.catalogItemId });
        }
        if (domain.type) {
            sql = sql.andWhere('type = :type', { type: domain.type });
        }
        sql = sql.orderBy('id', 'ASC');

        // SQLを実行
        const ret = await sql.getRawMany();
        const list: UpdateSetCatalogEntity[] = [];
        for (const info of ret) {
            list.push(new UpdateSetCatalogEntity(info));
        }
        return list;
    }

    /**
     * 変更セットカタログ追加
     * @param em
     * @param domain
     */
    @Log()
    public async insertRecord (em: EntityManager, domain: UpdateSetCatalogDomain): Promise<InsertResult> {
        const ret = await em
            .createQueryBuilder()
            .insert()
            .into(UpdateSetCatalogEntity)
            .values({
                updateSetId: domain.updateSetId,
                type: domain.type,
                catalogItemId: domain.catalogItemId,
                catalogItemCode: domain.catalogItemCode,
                comment: domain.comment,
                template: domain.template,
                createdBy: domain.updatedBy,
                updatedBy: domain.updatedBy
            })
            .execute();
        return ret;
    }

    /**
     * 変更セットカタログ更新
     * @param em
     * @param domain
     */
    @Log()
    public async updateRecord (em: EntityManager, domain: UpdateSetCatalogDomain): Promise<UpdateResult> {
        const ret = await em
            .createQueryBuilder()
            .update(UpdateSetCatalogEntity)
            .set({
                updateSetId: domain.updateSetId,
                type: domain.type,
                catalogItemId: domain.catalogItemId,
                catalogItemCode: domain.catalogItemCode,
                comment: domain.comment,
                template: domain.template,
                updatedBy: domain.updatedBy
            })
            .where('is_disabled = :is_disabled', { is_disabled: false })
            .andWhere('id = :id', { id: domain.id })
            .execute();
        return ret;
    }

    /**
     * 変更セットカタログ削除
     * @param em
     * @param domain
     */
    @Log()
    public async deleteRecord (em: EntityManager, domain: UpdateSetCatalogDomain): Promise<UpdateResult> {
        const ret = await em
            .createQueryBuilder()
            .update(UpdateSetCatalogEntity)
            .set({
                isDisabled: true,
                updatedBy: domain.updatedBy
            })
            .where('update_set_id = :update_set_id', { update_set_id: domain.updateSetId })
            .execute();
        return ret;
    }
}
