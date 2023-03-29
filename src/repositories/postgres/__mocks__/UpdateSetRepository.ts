/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Connection, EntityManager, InsertResult, UpdateResult, Brackets } from 'typeorm';
import { Service } from 'typedi';
import UpdateSetDomain from '../../../domains/UpdateSetDomain';
import UpdateSetEntity from '../UpdateSetEntity';
/* eslint-enable */
import Log from '../../../common/LogDecorator';

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
        throw new Error('Unit Test DB Error');
    }

    /**
     * 変更セット取得
     * @param em
     * @param domain
     */
    @Log()
    public async getRecordById (em: EntityManager, domain: UpdateSetDomain): Promise<UpdateSetEntity> {
        throw new Error('Unit Test DB Error');
    }

    /**
     * 変更セット追加
     * @param em
     * @param domain
     */
    @Log()
    public async insertRecord (em: EntityManager, domain: UpdateSetDomain): Promise<InsertResult> {
        throw new Error('Unit Test DB Error');
    }

    /**
     * 変更セット更新
     * @param em
     * @param domain
     */
    @Log()
    public async updateRecord (em: EntityManager, domain: UpdateSetDomain): Promise<UpdateResult> {
        throw new Error('Unit Test DB Error');
    }

    /**
     * 変更セット更新
     * @param em
     * @param domain
     */
    @Log()
    public async updateStatus (em: EntityManager, domain: UpdateSetDomain): Promise<UpdateResult> {
        throw new Error('Unit Test DB Error');
    }

    /**
     * 変更セット更新
     * @param em
     * @param domain
     */
    @Log()
    public async updateApproval (em: EntityManager, domain: UpdateSetDomain): Promise<UpdateResult> {
        throw new Error('Unit Test DB Error');
    }

    /**
     * 変更セット削除
     * @param em
     * @param domain
     */
    @Log()
    public async deleteRecord (em: EntityManager, domain: UpdateSetDomain): Promise<UpdateResult> {
        throw new Error('Unit Test DB Error');
    }
}
