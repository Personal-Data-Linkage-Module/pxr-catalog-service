/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import CatalogDomain from '../domains/CatalogDomain';
import CatalogEntity from '../repositories/postgres/CatalogEntity';
import { EntityManager, InsertResult, UpdateResult } from 'typeorm';
/* eslint-enable */
import * as supertest from 'supertest';
import { Application } from '../resources/config/Application';
import Common, { Url } from './Common';
import { Session } from './Session';
import Config from '../common/Config';
const Message = Config.ReadConfig('./config/message.json');

// テストモジュールをインポート
jest.mock('../repositories/postgres/CatalogRepository', () => {
    return {
        default: jest.fn().mockImplementation((async) => {
            return {
                getRecord: jest.fn(async (em: EntityManager, domain: CatalogDomain): Promise<CatalogEntity> => {
                    return new CatalogEntity({
                        id: 1,
                        name: 'name',
                        description: 'description',
                        extName: 'ext_name',
                        isDisabled: false,
                        attributes: null
                    });
                }),
                insertRecord: jest.fn(async (em: EntityManager, domain: CatalogDomain): Promise<InsertResult> => {
                    throw new Error('Unit Test DB Error');
                }),
                updateRecord: jest.fn(async (em: EntityManager, domain: CatalogDomain): Promise<UpdateResult> => {
                    throw new Error('Unit Test DB Error');
                }),
                deleteRecord: jest.fn(async (em: EntityManager, domain: CatalogDomain): Promise<UpdateResult> => {
                    throw new Error('Unit Test DB Error');
                })
            };
        })
    };
});

// 対象アプリケーションを取得
const app = new Application();
const expressApp = app.express.app;
const common = new Common();

// サーバをlisten
app.start();

/**
 * catalog API のユニットテスト
 */
describe('catalog API', () => {
    /**
     * 全テスト実行前の処理
     */
    beforeAll(async () => {
        // DB接続
        await common.connect();
        // DB初期化
        await common.executeSqlFile('initialData.sql');
        await common.executeSqlFile('activate.sql');
        await common.executeSqlFile('catalogCodeScope.sql');
    });
    /**
     * 全テスト実行後の処理
     */
    afterAll(async () => {
        // DB切断
        // await common.disconnect();
        // サーバ停止
        app.stop();
    });

    /**
     * カタログ名更新
     */
    describe('カタログ名更新', () => {
        test('異常 前提：DBエラー', async () => {
            // URLを生成
            const url = Url.nameURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    name: 'PXRカタログ',
                    description: '組織が運営するPLR基盤が提供するデータカタログです。',
                    ext_name: 'test-org'
                });

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.UNDEFINED_ERROR);
        });
    });
});
