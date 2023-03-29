/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Connection, EntityManager, InsertResult, UpdateResult } from 'typeorm';
import { Service } from 'typedi';
import TemplatePropertyDomain from '../../domains/TemplatePropertyDomain';
import TemplatePropertyEntity from './TemplatePropertyEntity';
/* eslint-enable */
import Log from '../../common/LogDecorator';
import CatalogItemEntity from './CatalogItemEntity';
import ItemTemplateEntity from './ItemTemplateEntity';

@Service()
export default class TemplatePropertyRepository {
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
     * テンプレートプロパティ取得
     * @param em
     * @param domain
     */
    @Log()
    public async getRecord (em: EntityManager, domain: TemplatePropertyDomain): Promise<TemplatePropertyEntity[]> {
        // SQLを生成
        const connection = em || this.connection;
        let sql = connection
            .createQueryBuilder()
            .from(TemplatePropertyEntity, 'template_property')
            .where('is_disabled = :is_disabled', { is_disabled: false });
        if (domain.id) {
            sql = sql.andWhere('id = :id', { id: domain.id });
        }
        if (domain.itemTemplateId) {
            sql = sql.andWhere('item_template_id = :item_template_id', { item_template_id: domain.itemTemplateId });
        }
        sql = sql.orderBy('key_name', 'ASC');

        // SQLを実行
        const ret = await sql.getRawMany();
        const list: TemplatePropertyEntity[] = [];
        for (const info of ret) {
            list.push(new TemplatePropertyEntity(info));
        }
        return list;
    }

    /**
     * テンプレートプロパティ取得
     * @param em
     * @param domain
     */
    @Log()
    public async getRecordByCatalogItemId (em: EntityManager, domain: TemplatePropertyDomain): Promise<TemplatePropertyEntity> {
        // SQLを生成
        const connection = em || this.connection;
        let sql = connection
            .createQueryBuilder()
            .from(CatalogItemEntity, 'catalog_item')
            .innerJoin(ItemTemplateEntity, 'item_template', 'item_template.catalog_item_id = catalog_item.id')
            .innerJoin(TemplatePropertyEntity, 'template_property', 'template_property.item_template_id = item_template.id')
            .where('template_property.is_disabled = :is_disabled', { is_disabled: false });
        if (domain.catalogItemid) {
            sql = sql.andWhere('catalog_item.id = :id', { id: domain.catalogItemid });
        }
        if (domain.keyName) {
            sql = sql.andWhere('template_property.keyName = :keyName', { keyName: domain.keyName });
        }

        // SQLを実行
        let slaveQueryRunner = null;
        if (!em) {
            slaveQueryRunner = this.connection.createQueryRunner('slave');
            sql.setQueryRunner(slaveQueryRunner);
        }
        try {
            const ret = await sql.getRawOne();
            return ret ? new TemplatePropertyEntity(ret) : null;
        } finally {
            if (slaveQueryRunner) {
                await slaveQueryRunner.release();
            }
        }
    }

    /**
     * テンプレートプロパティ追加
     * @param em
     * @param domain
     */
    @Log()
    public async insertRecord (em: EntityManager, domain: TemplatePropertyDomain): Promise<InsertResult> {
        const ret = await em
            .createQueryBuilder()
            .insert()
            .into(TemplatePropertyEntity)
            .values({
                itemTemplateId: domain.itemTemplateId,
                keyName: domain.keyName,
                type: domain.type,
                code: domain.code,
                version: domain.version,
                filter: domain.filter,
                indexKey: domain.indexKey,
                formatCode: domain.formatCode,
                formatVersion: domain.formatVersion,
                unitCode: domain.unitCode,
                unitVersion: domain.unitVersion,
                description: domain.description,
                isDisabled: false,
                attributes: domain.attributes,
                createdBy: domain.updatedBy,
                updatedBy: domain.updatedBy
            })
            .execute();
        return ret;
    }

    /**
     * テンプレートプロパティ更新
     * @param em
     * @param domain
     */
    @Log()
    public async updateRecord (em: EntityManager, domain: TemplatePropertyDomain): Promise<UpdateResult> {
        const ret = await em
            .createQueryBuilder()
            .update(TemplatePropertyEntity)
            .set({
                itemTemplateId: domain.itemTemplateId,
                keyName: domain.keyName,
                type: domain.type,
                code: domain.code,
                version: domain.version,
                filter: domain.filter,
                indexKey: domain.indexKey,
                formatCode: domain.formatCode,
                formatVersion: domain.formatVersion,
                unitCode: domain.unitCode,
                unitVersion: domain.unitVersion,
                description: domain.description,
                updatedBy: domain.updatedBy
            })
            .where('id = :id', { id: domain.id })
            .andWhere('is_disabled = :is_disabled', { is_disabled: false })
            .execute();
        return ret;
    }

    /**
     * テンプレートプロパティ削除
     * @param em
     * @param domain
     */
    @Log()
    public async deleteRecord (em: EntityManager, domain: TemplatePropertyDomain): Promise<UpdateResult> {
        const ret = await em
            .createQueryBuilder()
            .update(TemplatePropertyEntity)
            .set({
                isDisabled: true,
                updatedBy: domain.updatedBy
            })
            .where('id = :id', { id: domain.id })
            .execute();
        return ret;
    }
}
