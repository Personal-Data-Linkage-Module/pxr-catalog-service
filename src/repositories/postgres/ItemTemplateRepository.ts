/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Connection, EntityManager, InsertResult, UpdateResult } from 'typeorm';
import { Service } from 'typedi';
import ItemTemplateDomain from '../../domains/ItemTemplateDomain';
import ItemTemplateEntity from './ItemTemplateEntity';
/* eslint-enable */
import Log from '../../common/LogDecorator';

@Service()
export default class ItemTemplateRepository {
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
     * アイテムテンプレート取得
     * @param em
     * @param domain
     * @param isNullInnerName
     */
    @Log()
    public async getRecord (em: EntityManager, domain: ItemTemplateDomain, isNullInnerName: boolean): Promise<ItemTemplateEntity[]> {
        // SQLを生成
        const connection = em || this.connection;
        let sql = connection
            .createQueryBuilder()
            .from(ItemTemplateEntity, 'item_template')
            .where('is_disabled = :is_disabled', { is_disabled: false });
        if (domain.id) {
            sql = sql.andWhere('id = :id', { id: domain.id });
        }
        if (domain.catalogItemId) {
            sql = sql.andWhere('catalog_item_id = :catalog_item_id', { catalog_item_id: domain.catalogItemId });
        }
        if (domain.templatePropertyId) {
            sql = sql.andWhere('template_property_id = :template_property_id', { template_property_id: domain.templatePropertyId });
        }
        if (domain.innerName) {
            sql = sql.andWhere('inner_name = :inner_name', { inner_name: domain.innerName });
        } else if (isNullInnerName) {
            sql = sql.andWhere('inner_name IS NULL');
        }
        if (domain.innerInheritCode) {
            sql = sql.andWhere('inner_inherit_code = :inner_inherit_code', { inner_inherit_code: domain.innerInheritCode });
        }
        if (domain.innerInheritVersion) {
            sql = sql.andWhere('inner_inherit_version = :inner_inherit_version', { inner_inherit_version: domain.innerInheritVersion });
        }
        sql = sql.orderBy('id', 'ASC')
            .addOrderBy('inner_name', 'ASC');

        // SQLを実行
        const ret = await sql.getRawMany();
        const list: ItemTemplateEntity[] = [];
        for (const info of ret) {
            list.push(new ItemTemplateEntity(info));
        }
        return list;
    }

    /**
     * カタログアイテムID取得
     * @param em
     * @param domain
     */
    @Log()
    public async getCatalogItemId (em: EntityManager, domain: ItemTemplateDomain): Promise<number> {
        // SQLを生成
        const connection = em || this.connection;
        let sql = connection
            .createQueryBuilder()
            .from(ItemTemplateEntity, 'item_template')
            .where('is_disabled = :is_disabled', { is_disabled: false });
        if (domain.id) {
            sql = sql.andWhere('id = :id', { id: domain.id });
        }

        // SQLを実行
        const ret = await sql.getRawOne();
        return ret ? Number(ret['catalog_item_id']) : null;
    }

    /**
     * 内部クラスアイテムテンプレート取得
     * @param em
     * @param domain
     */
    @Log()
    public async getInnerRecord (em: EntityManager, domain: ItemTemplateDomain): Promise<ItemTemplateEntity[]> {
        // SQLを生成
        const connection = em || this.connection;
        let sql = connection
            .createQueryBuilder()
            .from(ItemTemplateEntity, 'item_template')
            .where('is_disabled = :is_disabled', { is_disabled: false });
        if (domain.id) {
            sql = sql.andWhere('id = :id', { id: domain.id });
        }
        if (domain.catalogItemId) {
            sql = sql.andWhere('catalog_item_id = :catalog_item_id', { catalog_item_id: domain.catalogItemId });
        }
        if (domain.templatePropertyId) {
            sql = sql.andWhere('template_property_id = :template_property_id', { template_property_id: domain.templatePropertyId });
        }
        if (domain.innerName) {
            sql = sql.andWhere('inner_name = :inner_name', { inner_name: domain.innerName });
        } else {
            sql = sql.andWhere('inner_name IS NOT NULL');
        }
        if (domain.innerInheritCode) {
            sql = sql.andWhere('inner_inherit_code = :inner_inherit_code', { inner_inherit_code: domain.innerInheritCode });
        }
        if (domain.innerInheritVersion) {
            sql = sql.andWhere('inner_inherit_version = :inner_inherit_version', { inner_inherit_version: domain.innerInheritVersion });
        }
        sql = sql.orderBy('inner_name', 'ASC');

        // SQLを実行
        const ret = await sql.getRawMany();
        const list: ItemTemplateEntity[] = [];
        for (const info of ret) {
            list.push(new ItemTemplateEntity(info));
        }
        return list;
    }

    /**
     * アイテムテンプレート追加
     * @param em
     * @param domain
     */
    @Log()
    public async insertRecord (em: EntityManager, domain: ItemTemplateDomain): Promise<InsertResult> {
        const ret = await em
            .createQueryBuilder()
            .insert()
            .into(ItemTemplateEntity)
            .values({
                catalogItemId: domain.catalogItemId,
                templatePropertyId: domain.templatePropertyId,
                template: domain.template,
                innerName: domain.innerName,
                innerInheritCode: domain.innerInheritCode,
                innerInheritVersion: domain.innerInheritVersion,
                isDisabled: false,
                response: domain.response,
                attributes: domain.attributes,
                createdBy: domain.updatedBy,
                updatedBy: domain.updatedBy
            })
            .execute();
        return ret;
    }

    /**
     * アイテムテンプレート更新
     * @param em
     * @param domain
     */
    @Log()
    public async updateRecord (em: EntityManager, domain: ItemTemplateDomain): Promise<UpdateResult> {
        const ret = await em
            .createQueryBuilder()
            .update(ItemTemplateEntity)
            .set({
                catalogItemId: domain.catalogItemId,
                templatePropertyId: domain.templatePropertyId,
                template: domain.template,
                innerName: domain.innerName,
                innerInheritCode: domain.innerInheritCode,
                innerInheritVersion: domain.innerInheritVersion,
                response: domain.response,
                updatedBy: domain.updatedBy
            })
            .where('id = :id', { id: domain.id })
            .andWhere('is_disabled = :is_disabled', { is_disabled: false })
            .execute();
        return ret;
    }

    /**
     * アイテムテンプレート更新
     * @param em
     * @param domain
     */
    @Log()
    public async updateResponseRecord (em: EntityManager, domain: ItemTemplateDomain): Promise<UpdateResult> {
        const ret = await em
            .createQueryBuilder()
            .update(ItemTemplateEntity)
            .set({
                response: domain.response,
                updatedBy: domain.updatedBy
            })
            .where('id = :id', { id: domain.id })
            .andWhere('is_disabled = :is_disabled', { is_disabled: false })
            .execute();
        return ret;
    }

    /**
     * アイテムテンプレート削除
     * @param em
     * @param domain
     */
    @Log()
    public async deleteRecord (em: EntityManager, domain: ItemTemplateDomain): Promise<UpdateResult> {
        const ret = await em
            .createQueryBuilder()
            .update(ItemTemplateEntity)
            .set({
                isDisabled: true,
                updatedBy: domain.updatedBy
            })
            .where('id = :id', { id: domain.id })
            .execute();
        return ret;
    }
}
