/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Connection, EntityManager, InsertResult, UpdateResult } from 'typeorm';
import { Service } from 'typedi';
import CatalogItemDomain from '../../../domains/CatalogItemDomain';
import CatalogItemEntity from '../CatalogItemEntity';
/* eslint-enable */
import Log from '../../../common/LogDecorator';

@Service()
export default class CatalogItemRepository {
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
     * カタログ取得
     * @param em
     * @param domain
     */
    @Log()
    public async getRecord (em: EntityManager, domain: CatalogItemDomain): Promise<CatalogItemEntity[]> {
        throw new Error('Unit Test DB Error');
    }

    /**
     * カタログID取得
     * @param em
     * @param domain
     * @param isReservedCheck
     */
    @Log()
    public async getCatalogId (em: EntityManager, domain: CatalogItemDomain, isReservedCheck: boolean = true): Promise<number> {
        throw new Error('Unit Test DB Error');
    }

    /**
     * 最大コード取得
     * @param em
     * @param domain
     */
    @Log()
    public async getMaxCode (em: EntityManager, domain: CatalogItemDomain): Promise<number> {
        throw new Error('Unit Test DB Error');
    }

    /**
     * 最大バージョン取得
     * @param em
     * @param domain
     */
    @Log()
    public async getMaxVersion (em: EntityManager, domain: CatalogItemDomain): Promise<number> {
        throw new Error('Unit Test DB Error');
    }

    /**
     * カタログ追加
     * @param em
     * @param domain
     */
    @Log()
    public async insertRecord (em: EntityManager, domain: CatalogItemDomain): Promise<InsertResult> {
        throw new Error('Unit Test DB Error');
    }

    /**
     * カタログ更新
     * @param em
     * @param domain
     */
    @Log()
    public async updateRecord (em: EntityManager, domain: CatalogItemDomain): Promise<UpdateResult> {
        throw new Error('Unit Test DB Error');
    }

    /**
     * カタログ削除
     * @param em
     * @param domain
     */
    @Log()
    public async deleteRecord (em: EntityManager, domain: CatalogItemDomain): Promise<UpdateResult> {
        throw new Error('Unit Test DB Error');
    }

    /**
     * カタログ削除
     * @param em
     * @param domain
     */
    @Log()
    public async deleteRecordById (em: EntityManager, domain: CatalogItemDomain): Promise<UpdateResult> {
        throw new Error('Unit Test DB Error');
    }
}
