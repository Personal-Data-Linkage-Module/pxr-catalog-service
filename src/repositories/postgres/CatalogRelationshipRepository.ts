/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Connection, EntityManager, InsertResult, UpdateResult } from 'typeorm';
import { Service } from 'typedi';
import CatalogRelationshipDomain from '../../domains/CatalogRelationshipDomain';
import CatalogRelationshipEntity from './CatalogRelationshipEntity';
/* eslint-enable */
import Log from '../../common/LogDecorator';

@Service()
export default class CatalogRelationshipRepository {
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
     * カタログリレーション取得
     * @param em
     * @param domain
     */
    @Log()
    public async getRecord (em: EntityManager, domain: CatalogRelationshipDomain): Promise<CatalogRelationshipEntity[]> {
        // SQLを生成
        const connection = em || this.connection;
        let sql = connection
            .createQueryBuilder()
            .from(CatalogRelationshipEntity, 'template_property')
            .where('is_disabled = :is_disabled', { is_disabled: false });
        if (domain.id) {
            sql = sql.andWhere('id = :id', { id: domain.id });
        }
        if (domain.catalogItemId) {
            sql = sql.andWhere('catalog_item_id = :catalog_item_id', { catalog_item_id: domain.catalogItemId });
        }
        if (domain.itemTemplateId) {
            sql = sql.andWhere('item_template_id = :item_template_id', { item_template_id: domain.itemTemplateId });
        }
        if (domain.templatePropertyId) {
            sql = sql.andWhere('template_property_id = :template_property_id', { template_property_id: domain.templatePropertyId });
        }
        // SQLを実行
        const ret = await sql.getRawMany();
        const list: CatalogRelationshipEntity[] = [];
        for (const info of ret) {
            list.push(new CatalogRelationshipEntity(info));
        }
        return list;
    }

    /**
     * カタログリレーション追加
     * @param em
     * @param domain
     */
    @Log()
    public async insertRecord (em: EntityManager, domain: CatalogRelationshipDomain): Promise<InsertResult> {
        const ret = await em
            .createQueryBuilder()
            .insert()
            .into(CatalogRelationshipEntity)
            .values({
                catalogItemId: domain.catalogItemId,
                refCatalogItemId: domain.refCatalogItemId,
                refType: domain.refType,
                isGetLatest: domain.isGetLatest,
                itemTemplateId: domain.itemTemplateId,
                templatePropertyId: domain.templatePropertyId,
                propertyCandidateId: domain.propertyCandidateId,
                isDisabled: false,
                attributes: domain.attributes,
                createdBy: domain.updatedBy,
                updatedBy: domain.updatedBy
            })
            .execute();
        return ret;
    }

    /**
     * カタログリレーション更新
     * @param em
     * @param domain
     */
    @Log()
    public async updateRecord (em: EntityManager, domain: CatalogRelationshipDomain): Promise<UpdateResult> {
        const ret = await em
            .createQueryBuilder()
            .update(CatalogRelationshipEntity)
            .set({
                catalogItemId: domain.catalogItemId,
                refCatalogItemId: domain.refCatalogItemId,
                refType: domain.refType,
                isGetLatest: domain.isGetLatest,
                itemTemplateId: domain.itemTemplateId,
                templatePropertyId: domain.templatePropertyId,
                propertyCandidateId: domain.propertyCandidateId,
                updatedBy: domain.updatedBy
            })
            .where('id = :id', { id: domain.id })
            .andWhere('is_disabled = :is_disabled', { is_disabled: false })
            .execute();
        return ret;
    }

    /**
     * カタログリレーション削除
     * @param em
     * @param domain
     */
    @Log()
    public async deleteRecord (em: EntityManager, domain: CatalogRelationshipDomain): Promise<UpdateResult> {
        const ret = await em
            .createQueryBuilder()
            .update(CatalogRelationshipEntity)
            .set({
                isDisabled: true,
                updatedBy: domain.updatedBy
            })
            .where('id = :id', { id: domain.id })
            .execute();
        return ret;
    }
}
