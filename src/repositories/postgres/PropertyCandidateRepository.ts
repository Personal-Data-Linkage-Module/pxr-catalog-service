/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Connection, EntityManager, InsertResult, UpdateResult } from 'typeorm';
import { Service } from 'typedi';
import PropertyCandidateDomain from '../../domains/PropertyCandidateDomain';
import PropertyCandidateEntity from './PropertyCandidateEntity';
/* eslint-enable */
import Log from '../../common/LogDecorator';

@Service()
export default class PropertyCandidateRepository {
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
     * プロパティ候補取得
     * @param em
     * @param domain
     */
    @Log()
    public async getRecord (em: EntityManager, domain: PropertyCandidateDomain): Promise<PropertyCandidateEntity[]> {
        // SQLを生成
        const connection = em || this.connection;
        let sql = connection
            .createQueryBuilder()
            .from(PropertyCandidateEntity, 'template_property')
            .where('is_disabled = :is_disabled', { is_disabled: false });
        if (domain.id) {
            sql = sql.andWhere('id = :id', { id: domain.id });
        }
        if (domain.templatePropertyId) {
            sql = sql.andWhere('template_property_id = :template_property_id', { template_property_id: domain.templatePropertyId });
        }
        sql = sql.orderBy('id', 'ASC');

        // SQLを実行
        const ret = await sql.getRawMany();
        const list: PropertyCandidateEntity[] = [];
        for (const info of ret) {
            list.push(new PropertyCandidateEntity(info));
        }
        return list;
    }

    /**
     * プロパティ候補追加
     * @param em
     * @param domain
     */
    @Log()
    public async insertRecord (em: EntityManager, domain: PropertyCandidateDomain): Promise<InsertResult> {
        const ret = await em
            .createQueryBuilder()
            .insert()
            .into(PropertyCandidateEntity)
            .values({
                templatePropertyId: domain.templatePropertyId,
                nsId: domain.nsId,
                isDescendant: domain.isDescendant,
                code: domain.code,
                version: domain.version,
                baseCode: domain.baseCode,
                baseVersion: domain.baseVersion,
                value: domain.value,
                inners: domain.inners,
                description: domain.description,
                isDisabled: false,
                createdBy: domain.updatedBy,
                updatedBy: domain.updatedBy
            })
            .execute();
        return ret;
    }

    /**
     * プロパティ候補更新
     * @param em
     * @param domain
     */
    @Log()
    public async updateRecord (em: EntityManager, domain: PropertyCandidateDomain): Promise<UpdateResult> {
        const ret = await em
            .createQueryBuilder()
            .update(PropertyCandidateEntity)
            .set({
                templatePropertyId: domain.templatePropertyId,
                nsId: domain.nsId,
                isDescendant: domain.isDescendant,
                code: domain.code,
                version: domain.version,
                baseCode: domain.baseCode,
                baseVersion: domain.baseVersion,
                value: domain.value,
                inners: domain.inners,
                description: domain.description,
                updatedBy: domain.updatedBy
            })
            .where('id = :id', { id: domain.id })
            .andWhere('is_disabled = :is_disabled', { is_disabled: false })
            .execute();
        return ret;
    }

    /**
     * プロパティ候補削除
     * @param em
     * @param domain
     */
    @Log()
    public async deleteRecord (em: EntityManager, domain: PropertyCandidateDomain): Promise<UpdateResult> {
        const ret = await em
            .createQueryBuilder()
            .update(PropertyCandidateEntity)
            .set({
                isDisabled: true,
                updatedBy: domain.updatedBy
            })
            .where('id = :id', { id: domain.id })
            .execute();
        return ret;
    }
}
