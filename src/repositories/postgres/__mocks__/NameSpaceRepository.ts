/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Connection, EntityManager, InsertResult, UpdateResult } from 'typeorm';
import { Service } from 'typedi';
import NameSpaceDomain from '../../../domains/NameSpaceDomain';
import NameSpaceEntity from '../NameSpaceEntity';
/* eslint-enable */
import Log from '../../../common/LogDecorator';

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
        throw new Error('Unit Test DB Error');
    }

    /**
     * 対象ネームスペース取得
     * @param em
     * @param domain
     */
    @Log()
    public async getRecordById (em: EntityManager, domain: NameSpaceDomain): Promise<NameSpaceEntity> {
        throw new Error('Unit Test DB Error');
    }

    /**
     * 対象ネームスペースID取得
     * @param em
     * @param domain
     */
    @Log()
    public async getNamespaceId (em: EntityManager, domain: NameSpaceDomain): Promise<number> {
        throw new Error('Unit Test DB Error');
    }

    /**
     * 変更後ネームスペース存在確認
     * @param em
     * @param domain
     */
    @Log()
    public async isExists (em: EntityManager, domain: NameSpaceDomain): Promise<boolean> {
        throw new Error('Unit Test DB Error');
    }

    /**
     * ネームスペース追加
     * @param em
     * @param domain
     */
    @Log()
    public async insertRecord (em: EntityManager, domain: NameSpaceDomain): Promise<InsertResult> {
        throw new Error('Unit Test DB Error');
    }

    /**
     * ネームスペース更新
     * @param em
     * @param domain
     */
    @Log()
    public async updateRecord (em: EntityManager, domain: NameSpaceDomain): Promise<UpdateResult> {
        throw new Error('Unit Test DB Error');
    }

    /**
     * ネームスペース削除
     * @param em
     * @param domain
     */
    @Log()
    public async deleteRecord (em: EntityManager, domain: NameSpaceDomain): Promise<UpdateResult> {
        throw new Error('Unit Test DB Error');
    }
}
