/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Connection, EntityManager, InsertResult, UpdateResult } from 'typeorm';
import { Service } from 'typedi';
import CatalogCodeScopeDomain from '../../../domains/CatalogCodeScopeDomain';
import CatalogCodeScopeEntity from '../CatalogCodeScopeEntity';
/* eslint-enable */
import Log from '../../../common/LogDecorator';

@Service()
export default class CatalogCodeScopeRepository {
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
     * カタログコード範囲取得
     * @param em
     * @param domain
     */
    @Log()
    public async getRecord (em: EntityManager, domain: CatalogCodeScopeDomain): Promise<CatalogCodeScopeEntity[]> {
        throw new Error('Unit Test DB Error');
    }

    /**
     * カタログコード有効確認
     * @param em
     * @param type
     * @param code
     */
    @Log()
    public async isCatalogCodeValid (em: EntityManager, type: string, code: number): Promise<boolean> {
        throw new Error('Unit Test DB Error');
    }

    /**
     * カタログコード範囲の存在確認
     * @param em
     * @param domain
     */
    @Log()
    public async isCatalogCodeExists (em: EntityManager, domain: CatalogCodeScopeDomain): Promise<boolean> {
        throw new Error('Unit Test DB Error');
    }

    /**
     * 次コード取得
     * @param em
     * @param type
     * @param code
     */
    @Log()
    public async getNextCatalogCode (em: EntityManager, type: string, code: number): Promise<number> {
        throw new Error('Unit Test DB Error');
    }

    /**
     * カタログコード範囲追加
     * @param em
     * @param domain
     */
    @Log()
    public async insertRecord (em: EntityManager, domain: CatalogCodeScopeDomain): Promise<InsertResult> {
        throw new Error('Unit Test DB Error');
    }

    /**
     * カタログコード範囲更新
     * @param em
     * @param domain
     */
    @Log()
    public async updateRecord (em: EntityManager, domain: CatalogCodeScopeDomain): Promise<UpdateResult> {
        throw new Error('Unit Test DB Error');
    }

    /**
     * カタログコード範囲削除
     * @param em
     * @param domain
     */
    @Log()
    public async deleteRecord (em: EntityManager, domain: CatalogCodeScopeDomain): Promise<UpdateResult> {
        throw new Error('Unit Test DB Error');
    }
}
