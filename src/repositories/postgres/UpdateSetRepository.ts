/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Connection, EntityManager, InsertResult, UpdateResult, Brackets } from 'typeorm';
import { Service } from 'typedi';
import UpdateSetDomain from '../../domains/UpdateSetDomain';
/* eslint-enable */
import Log from '../../common/LogDecorator';
import UpdateSetEntity from './UpdateSetEntity';

@Service()
export default class UpdateSetRepository {
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
     * 変更セット取得
     * @param em
     * @param domain
     */
    @Log()
    public async getRecord (em: EntityManager, domain: UpdateSetDomain): Promise<UpdateSetEntity[]> {
        // SQLを生成
        const connection = em || this.connection;
        let sql = connection
            .createQueryBuilder()
            .from(UpdateSetEntity, 'update_set')
            .where('is_disabled = :is_disabled', { is_disabled: false });
        if (!domain.isIgnore && (domain.status || domain.status === 0)) {
            sql = sql.andWhere('status = :status', { status: domain.status });
        }
        if (domain.isIgnore && (domain.status || domain.status === 0)) {
            sql = sql.andWhere('status != :status', { status: domain.status });
        }
        if (domain.callerActorCode && domain.approvalActorCode) {
            sql = sql.andWhere(
                new Brackets(subQb => {
                    subQb.where('caller_actor_code = :caller_actor_code', { caller_actor_code: domain.callerActorCode })
                        .orWhere('approval_actor_code = :approval_actor_code', { approval_actor_code: domain.approvalActorCode })
                        .orWhere('register_actor_code = :register_actor_code', { register_actor_code: domain.registerActorCode });
                })
            );
        }
        sql = sql.orderBy('id', 'ASC');

        // SQLを実行
        const ret = await sql.getRawMany();
        const list: UpdateSetEntity[] = [];
        for (const info of ret) {
            list.push(new UpdateSetEntity(info));
        }
        return list;
    }

    /**
     * 変更セット取得
     * @param em
     * @param domain
     */
    @Log()
    public async getRecordById (em: EntityManager, domain: UpdateSetDomain): Promise<UpdateSetEntity> {
        // SQLを生成
        const connection = em || this.connection;
        let sql = connection
            .createQueryBuilder()
            .from(UpdateSetEntity, 'update_set')
            .where('is_disabled = :is_disabled', { is_disabled: false });
        if (domain.id) {
            sql = sql.andWhere('id = :id', { id: domain.id });
        }
        if (domain.callerActorCode) {
            sql = sql.andWhere('caller_actor_code = :caller_actor_code', { caller_actor_code: domain.callerActorCode });
        }
        if (domain.callerActorVersion) {
            sql = sql.andWhere('caller_actor_version = :caller_actor_version', { caller_actor_version: domain.callerActorVersion });
        }
        if (domain.approvalActorCode) {
            sql = sql.andWhere('approval_actor_code = :approval_actor_code', { approval_actor_code: domain.approvalActorCode });
        }
        if (domain.approvalActorVersion) {
            sql = sql.andWhere('approval_actor_version = :approval_actor_version', { approval_actor_version: domain.approvalActorVersion });
        }
        if (domain.status || domain.status === 0) {
            sql = sql.andWhere('status = :status', { status: domain.status });
        }
        // SQLを実行
        const ret = await sql.getRawOne();
        return ret ? new UpdateSetEntity(ret) : null;
    }

    /**
     * 変更セット追加
     * @param em
     * @param domain
     */
    @Log()
    public async insertRecord (em: EntityManager, domain: UpdateSetDomain): Promise<InsertResult> {
        const ret = await em
            .createQueryBuilder()
            .insert()
            .into(UpdateSetEntity)
            .values({
                name: domain.name,
                description: domain.description,
                type: domain.type,
                callerActorCode: domain.callerActorCode,
                callerActorVersion: domain.callerActorVersion,
                approvalActorCode: domain.approvalActorCode,
                approvalActorVersion: domain.approvalActorVersion,
                approver: domain.approver,
                approvalAt: domain.approvalAt,
                comment: domain.comment,
                status: domain.status,
                registerActorCode: domain.registerActorCode,
                registerActorVersion: domain.registerActorVersion,
                register: domain.register,
                registAt: domain.registAt,
                appendix: domain.appendix,
                createdBy: domain.updatedBy,
                updatedBy: domain.updatedBy
            })
            .execute();
        return ret;
    }

    /**
     * 変更セット更新
     * @param em
     * @param domain
     */
    @Log()
    public async updateRecord (em: EntityManager, domain: UpdateSetDomain): Promise<UpdateResult> {
        const ret = await em
            .createQueryBuilder()
            .update(UpdateSetEntity)
            .set({
                name: domain.name,
                description: domain.description,
                type: domain.type,
                callerActorCode: domain.callerActorCode,
                callerActorVersion: domain.callerActorVersion,
                approvalActorCode: domain.approvalActorCode,
                approvalActorVersion: domain.approvalActorVersion,
                approver: domain.approver,
                approvalAt: domain.approvalAt,
                comment: domain.comment,
                status: domain.status,
                registerActorCode: domain.registerActorCode,
                registerActorVersion: domain.registerActorVersion,
                register: domain.register,
                registAt: domain.registAt,
                appendix: domain.appendix,
                updatedBy: domain.updatedBy
            })
            .where('is_disabled = :is_disabled', { is_disabled: false })
            .andWhere('id = :id', { id: domain.id })
            .execute();
        return ret;
    }

    /**
     * 変更セットステータス更新
     * @param em
     * @param domain
     */
    @Log()
    public async updateStatus (em: EntityManager, domain: UpdateSetDomain): Promise<UpdateResult> {
        const ret = await em
            .createQueryBuilder()
            .update(UpdateSetEntity)
            .set({
                status: domain.status,
                updatedBy: domain.updatedBy
            })
            .where('is_disabled = :is_disabled', { is_disabled: false })
            .andWhere('id = :id', { id: domain.id })
            .execute();
        return ret;
    }

    /**
     * 変更セット申請
     * @param em
     * @param domain
     */
    @Log()
    public async updateRequest (em: EntityManager, domain: UpdateSetDomain): Promise<UpdateResult> {
        const ret = await em
            .createQueryBuilder()
            .update(UpdateSetEntity)
            .set({
                approvalActorCode: domain.approvalActorCode,
                approvalActorVersion: domain.approvalActorVersion,
                status: domain.status,
                updatedBy: domain.updatedBy
            })
            .where('is_disabled = :is_disabled', { is_disabled: false })
            .andWhere('id = :id', { id: domain.id })
            .execute();
        return ret;
    }

    /**
     * 変更セット承認
     * @param em
     * @param domain
     */
    @Log()
    public async updateApproval (em: EntityManager, domain: UpdateSetDomain): Promise<UpdateResult> {
        const ret = await em
            .createQueryBuilder()
            .update(UpdateSetEntity)
            .set({
                approver: domain.approver,
                approvalAt: domain.approvalAt,
                comment: domain.comment,
                status: domain.status,
                updatedBy: domain.updatedBy
            })
            .where('is_disabled = :is_disabled', { is_disabled: false })
            .andWhere('id = :id', { id: domain.id })
            .execute();
        return ret;
    }

    /**
     * 変更セット削除
     * @param em
     * @param domain
     */
    @Log()
    public async deleteRecord (em: EntityManager, domain: UpdateSetDomain): Promise<UpdateResult> {
        const ret = await em
            .createQueryBuilder()
            .update(UpdateSetEntity)
            .set({
                isDisabled: true,
                updatedBy: domain.updatedBy
            })
            .where('id = :id', { id: domain.id })
            .execute();
        return ret;
    }
}
