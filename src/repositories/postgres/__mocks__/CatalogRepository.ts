/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Connection, EntityManager, InsertResult, UpdateResult } from 'typeorm';
import { Service } from 'typedi';
import CatalogDomain from '../../../domains/CatalogDomain';
import CatalogEntity from '../CatalogEntity';
/* eslint-enable */
import Log from '../../../common/LogDecorator';

@Service()
export default class CatalogRepository {
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
     * 対象カタログ取得
     * @param em
     * @param domain
     */
    @Log()
    public async getRecord (em: EntityManager, domain: CatalogDomain): Promise<CatalogEntity> {
        throw new Error('Unit Test DB Error');
    }

    /**
     * カタログ追加
     * @param em
     * @param domain
     */
    @Log()
    public async insertRecord (em: EntityManager, domain: CatalogDomain): Promise<InsertResult> {
        throw new Error('Unit Test DB Error');
    }

    /**
     * カタログ更新
     * @param em
     * @param domain
     */
    @Log()
    public async updateRecord (em: EntityManager, domain: CatalogDomain): Promise<UpdateResult> {
        throw new Error('Unit Test DB Error');
    }

    /**
     * カタログ削除
     * @param em
     * @param domain
     */
    @Log()
    public async deleteRecord (em: EntityManager, domain: CatalogDomain): Promise<UpdateResult> {
        throw new Error('Unit Test DB Error');
    }
}
