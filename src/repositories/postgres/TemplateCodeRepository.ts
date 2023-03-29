/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Connection, EntityManager, InsertResult, UpdateResult } from 'typeorm';
import { Service } from 'typedi';
import TemplateCodeDomain from '../../domains/TemplateCodeDomain';
import TemplateCodeEntity from './TemplateCodeEntity';
/* eslint-enable */
import Log from '../../common/LogDecorator';

@Service()
export default class TemplateCodeRepository {
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
     * テンプレートコード取得
     * @param em
     * @param domain
     */
    @Log()
    public async getRecord (em: EntityManager, domain: TemplateCodeDomain): Promise<TemplateCodeEntity[]> {
        // SQLを生成
        const connection = em || this.connection;
        let sql = connection
            .createQueryBuilder()
            .from(TemplateCodeEntity, 'template_code')
            .where('is_disabled = :is_disabled', { is_disabled: false });
        if (domain.id) {
            sql = sql.andWhere('id = :id', { id: domain.id });
        }
        if (domain.templatePropertyId) {
            sql = sql.andWhere('template_property_id = :template_property_id', { template_property_id: domain.templatePropertyId });
        }
        // SQLを実行
        const ret = await sql.getRawMany();
        const list: TemplateCodeEntity[] = [];
        for (const info of ret) {
            list.push(new TemplateCodeEntity(info));
        }
        return list;
    }

    /**
     * テンプレートコード追加
     * @param em
     * @param domain
     */
    @Log()
    public async insertRecord (em: EntityManager, domain: TemplateCodeDomain): Promise<InsertResult> {
        const ret = await em
            .createQueryBuilder()
            .insert()
            .into(TemplateCodeEntity)
            .values({
                templatePropertyId: domain.templatePropertyId,
                code: domain.code,
                version: domain.version,
                isDisabled: false,
                attributes: domain.attributes,
                createdBy: domain.updatedBy,
                updatedBy: domain.updatedBy
            })
            .execute();
        return ret;
    }

    /**
     * テンプレートコード更新
     * @param em
     * @param domain
     */
    @Log()
    public async updateRecord (em: EntityManager, domain: TemplateCodeDomain): Promise<UpdateResult> {
        const ret = await em
            .createQueryBuilder()
            .update(TemplateCodeEntity)
            .set({
                templatePropertyId: domain.templatePropertyId,
                code: domain.code,
                version: domain.version,
                updatedBy: domain.updatedBy
            })
            .where('id = :id', { id: domain.id })
            .andWhere('is_disabled = :is_disabled', { is_disabled: false })
            .execute();
        return ret;
    }

    /**
     * テンプレートコード削除
     * @param em
     * @param domain
     */
    @Log()
    public async deleteRecord (em: EntityManager, domain: TemplateCodeDomain): Promise<UpdateResult> {
        const ret = await em
            .createQueryBuilder()
            .update(TemplateCodeEntity)
            .set({
                isDisabled: true,
                updatedBy: domain.updatedBy
            })
            .where('id = :id', { id: domain.id })
            .execute();
        return ret;
    }
}
