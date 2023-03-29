/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Connection, EntityManager, InsertResult, UpdateResult } from 'typeorm';
import { Service } from 'typedi';
import NameSpaceDomain from '../../domains/NameSpaceDomain';
import NameSpaceEntity from './NameSpaceEntity';
/* eslint-enable */
import Log from '../../common/LogDecorator';

@Service()
export default class NameSpaceRepository {
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
     * 対象ネームスペース取得
     * @param em
     * @param domain
     */
    @Log()
    public async getRecord (em: EntityManager, domain: NameSpaceDomain): Promise<NameSpaceEntity[]> {
        // SQLを生成
        const connection = em || this.connection;
        let sql = connection
            .createQueryBuilder()
            .from(NameSpaceEntity, 'ns')
            .where('is_disabled = :is_disabled', { is_disabled: false });
        if (domain.type) {
            sql = sql.andWhere('type = :type', { type: domain.type });
        }
        if (domain.name) {
            sql = sql.andWhere('name LIKE :name', { name: domain.name + '%' });
        }
        sql = sql.orderBy('id', 'ASC');

        // SQLを実行
        const ret = await sql.getRawMany();
        const list: NameSpaceEntity[] = [];
        for (const info of ret) {
            list.push(new NameSpaceEntity(info));
        }
        return list;
    }

    /**
     * 対象ネームスペース取得
     * @param em
     * @param domain
     */
    @Log()
    public async getRecordById (em: EntityManager, domain: NameSpaceDomain): Promise<NameSpaceEntity> {
        // SQLを生成
        const connection = em || this.connection;
        let sql = connection
            .createQueryBuilder()
            .from(NameSpaceEntity, 'ns')
            .where('is_disabled = :is_disabled', { is_disabled: false });
        if (domain.id) {
            sql = sql.andWhere('id = :id', { id: domain.id });
        }
        // SQLを実行
        const ret = await sql.getRawOne();
        return ret ? new NameSpaceEntity(ret) : null;
    }

    /**
     * 対象ネームスペースID取得
     * @param em
     * @param domain
     */
    @Log()
    public async getNamespaceId (em: EntityManager, domain: NameSpaceDomain): Promise<number> {
        // SQLを生成
        const connection = em || this.connection;
        let sql = connection
            .createQueryBuilder()
            .from(NameSpaceEntity, 'ns')
            .where('is_disabled = :is_disabled', { is_disabled: false });
        if (domain.type) {
            sql = sql.andWhere('type = :type', { type: domain.type });
        }
        if (domain.name) {
            sql = sql.andWhere('name LIKE :name', { name: domain.name });
        }

        // SQLを実行
        const ret = await sql.getRawOne();
        return ret ? Number(ret['id']) : null;
    }

    /**
     * 変更後ネームスペース存在確認
     * @param em
     * @param domain
     */
    @Log()
    public async isExists (em: EntityManager, domain: NameSpaceDomain): Promise<boolean> {
        // SQLを生成
        const connection = em || this.connection;
        let sql = connection
            .createQueryBuilder()
            .from(NameSpaceEntity, 'ns')
            .where('is_disabled = :is_disabled', { is_disabled: false });
        if (domain.id) {
            sql = sql.andWhere('id != :id', { id: domain.id });
        }
        if (domain.name) {
            sql = sql.andWhere('name = :name', { name: domain.name });
        }
        // SQLを実行
        const ret = await sql.getRawOne();
        return !!ret;
    }

    /**
     * ネームスペース追加
     * @param em
     * @param domain
     */
    @Log()
    public async insertRecord (em: EntityManager, domain: NameSpaceDomain): Promise<InsertResult> {
        const ret = await em
            .createQueryBuilder()
            .insert()
            .into(NameSpaceEntity)
            .values({
                type: domain.type,
                name: domain.name,
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
     * ネームスペース更新
     * @param em
     * @param domain
     */
    @Log()
    public async updateRecord (em: EntityManager, domain: NameSpaceDomain): Promise<UpdateResult> {
        const ret = await em
            .createQueryBuilder()
            .update(NameSpaceEntity)
            .set({
                name: domain.name,
                description: domain.description,
                updatedBy: domain.updatedBy
            })
            .where('id = :id', { id: domain.id })
            .andWhere('is_disabled = :is_disabled', { is_disabled: false })
            .andWhere('type = :type', { type: domain.type })
            .execute();
        return ret;
    }

    /**
     * ネームスペース削除
     * @param em
     * @param domain
     */
    @Log()
    public async deleteRecord (em: EntityManager, domain: NameSpaceDomain): Promise<UpdateResult> {
        const ret = await em
            .createQueryBuilder()
            .update(NameSpaceEntity)
            .set({
                isDisabled: true,
                updatedBy: domain.updatedBy
            })
            .where('id = :id', { id: domain.id })
            .execute();
        return ret;
    }

    /**
     * NS.Id複数取得（LIKE）
     */
    public async getNsIds (em: EntityManager, names: string[]): Promise<number[]> {
        const connection = em || this.connection;
        const res: number[] = [];
        for (const name of names) {
            // SQLを実行
            const nss = await connection
                .createQueryBuilder()
                .from(NameSpaceEntity, 'ns')
                .where('is_disabled = :is_disabled', { is_disabled: false })
                .andWhere('name LIKE :name', { name: name })
                .getRawMany();
            nss.forEach(ns => res.push(Number(ns['id'])));
        }
        return res;
    }
}
