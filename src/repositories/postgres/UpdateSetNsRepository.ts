/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Connection, EntityManager, InsertResult, UpdateResult } from 'typeorm';
import { Service } from 'typedi';
import UpdateSetNsDomain from '../../domains/UpdateSetNsDomain';
/* eslint-enable */
import Log from '../../common/LogDecorator';
import UpdateSetNsEntity from './UpdateSetNsEntity';

@Service()
export default class UpdateSetNsRepository {
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
     * 変更セットネームスペース取得
     * @param em
     * @param domain
     */
    @Log()
    public async getRecord (em: EntityManager, domain: UpdateSetNsDomain): Promise<UpdateSetNsEntity[]> {
        // SQLを生成
        const connection = em || this.connection;
        let sql = connection
            .createQueryBuilder()
            .from(UpdateSetNsEntity, 'update_set_catalog')
            .where('is_disabled = :is_disabled', { is_disabled: false });
        if (domain.updateSetId) {
            sql = sql.andWhere('update_set_id = :update_set_id', { update_set_id: domain.updateSetId });
        }
        if (domain.nsId) {
            sql = sql.andWhere('ns_id = :ns_id', { ns_id: domain.nsId });
        }
        if (domain.type) {
            sql = sql.andWhere('type = :type', { type: domain.type });
        }
        sql = sql.orderBy('id', 'ASC');

        // SQLを実行
        const ret = await sql.getRawMany();
        const list: UpdateSetNsEntity[] = [];
        for (const info of ret) {
            list.push(new UpdateSetNsEntity(info));
        }
        return list;
    }

    /**
     * 変更セットネームスペース追加
     * @param em
     * @param domain
     */
    @Log()
    public async insertRecord (em: EntityManager, domain: UpdateSetNsDomain): Promise<InsertResult> {
        const ret = await em
            .createQueryBuilder()
            .insert()
            .into(UpdateSetNsEntity)
            .values({
                updateSetId: domain.updateSetId,
                type: domain.type,
                nsId: domain.nsId,
                comment: domain.comment,
                template: domain.template,
                createdBy: domain.updatedBy,
                updatedBy: domain.updatedBy
            })
            .execute();
        return ret;
    }

    /**
     * 変更セットネームスペース更新
     * @param em
     * @param domain
     */
    @Log()
    public async updateRecord (em: EntityManager, domain: UpdateSetNsDomain): Promise<UpdateResult> {
        const ret = await em
            .createQueryBuilder()
            .update(UpdateSetNsEntity)
            .set({
                updateSetId: domain.updateSetId,
                type: domain.type,
                nsId: domain.nsId,
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
     * 変更セットネームスペース削除
     * @param em
     * @param domain
     */
    @Log()
    public async deleteRecord (em: EntityManager, domain: UpdateSetNsDomain): Promise<UpdateResult> {
        const ret = await em
            .createQueryBuilder()
            .update(UpdateSetNsEntity)
            .set({
                isDisabled: true,
                updatedBy: domain.updatedBy
            })
            .where('update_set_id = :update_set_id', { update_set_id: domain.updateSetId })
            .execute();
        return ret;
    }
}
