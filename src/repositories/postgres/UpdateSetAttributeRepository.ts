/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Connection, EntityManager, InsertResult, UpdateResult } from 'typeorm';
import { Service } from 'typedi';
import UpdateSetAttributeDomain from '../../domains/UpdateSetAttributeDomain';
/* eslint-enable */
import Log from '../../common/LogDecorator';
import UpdateSetAttributeEntity from './UpdateSetAttributeEntity';

@Service()
export default class UpdateSetAttributeRepository {
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
     * 変更セット属性取得
     * @param em
     * @param domain
     */
    @Log()
    public async getRecord (em: EntityManager, domain: UpdateSetAttributeDomain): Promise<UpdateSetAttributeEntity[]> {
        // SQLを生成
        const connection = em || this.connection;
        let sql = connection
            .createQueryBuilder()
            .from(UpdateSetAttributeEntity, 'update_set_attribute')
            .where('is_disabled = :is_disabled', { is_disabled: false });
        if (domain.updateSetId) {
            sql = sql.andWhere('update_set_id = :update_set_id', { update_set_id: domain.updateSetId });
        }
        if (domain.catalogCode) {
            sql = sql.andWhere('catalog_code = :catalog_code', { catalog_code: domain.catalogCode });
        }
        if (domain.type) {
            sql = sql.andWhere('type = :type', { type: domain.type });
        }
        sql = sql.orderBy('id', 'ASC');

        // SQLを実行
        const ret = await sql.getRawMany();
        const list: UpdateSetAttributeEntity[] = [];
        for (const info of ret) {
            list.push(new UpdateSetAttributeEntity(info));
        }
        return list;
    }

    /**
     * 変更セット属性追加
     * @param em
     * @param domain
     */
    @Log()
    public async insertRecord (em: EntityManager, domain: UpdateSetAttributeDomain): Promise<InsertResult> {
        const ret = await em
            .createQueryBuilder()
            .insert()
            .into(UpdateSetAttributeEntity)
            .values({
                updateSetId: domain.updateSetId,
                type: domain.type,
                catalogCode: domain.catalogCode,
                attribute: domain.attribute,
                createdBy: domain.updatedBy,
                updatedBy: domain.updatedBy
            })
            .execute();
        return ret;
    }

    /**
     * 変更セット属性更新
     * @param em
     * @param domain
     */
    @Log()
    public async updateRecord (em: EntityManager, domain: UpdateSetAttributeDomain): Promise<UpdateResult> {
        const ret = await em
            .createQueryBuilder()
            .update(UpdateSetAttributeEntity)
            .set({
                updateSetId: domain.updateSetId,
                type: domain.type,
                catalogCode: domain.catalogCode,
                attribute: domain.attribute,
                updatedBy: domain.updatedBy
            })
            .where('is_disabled = :is_disabled', { is_disabled: false })
            .andWhere('id = :id', { id: domain.id })
            .execute();
        return ret;
    }

    /**
     * 変更セット属性削除
     * @param em
     * @param domain
     */
    @Log()
    public async deleteRecord (em: EntityManager, domain: UpdateSetAttributeDomain): Promise<UpdateResult> {
        const ret = await em
            .createQueryBuilder()
            .update(UpdateSetAttributeEntity)
            .set({
                isDisabled: true,
                updatedBy: domain.updatedBy
            })
            .where('update_set_id = :update_set_id', { update_set_id: domain.updateSetId })
            .execute();
        return ret;
    }
}
