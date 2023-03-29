/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import CatalogItemDomain from '../domains/CatalogItemDomain';
import CatalogItemEntity from '../repositories/postgres/CatalogItemEntity';
import { EntityManager, InsertResult, UpdateResult } from 'typeorm';
/* eslint-enable */
import * as supertest from 'supertest';
import { Application } from '../resources/config/Application';
import Common, { Url } from './Common';
import { Session } from './Session';
import Config from '../common/Config';
import { CatalogExtRequest } from './CatalogExtRequest';
import { CatalogBuiltInRequest } from './CatalogBuiltInRequest';
import { CatalogModelRequest } from './CatalogModelRequest';
const Message = Config.ReadConfig('./config/message.json');

// テストモジュールをインポート
jest.mock('../repositories/postgres/CatalogItemRepository', () => {
    return {
        default: jest.fn().mockImplementation((async) => {
            return {
                getRecord: jest.fn(async (em: EntityManager, domain: CatalogItemDomain): Promise<CatalogItemEntity[]> => {
                    const list: CatalogItemEntity[] = [];
                    return list;
                }),
                getCatalogId: jest.fn(async (em: EntityManager, domain: CatalogItemDomain, isReservedCheck: boolean = true): Promise<number> => {
                    return null;
                }),
                getMaxCode: jest.fn(async (em: EntityManager, domain: CatalogItemDomain): Promise<number> => {
                    return 1;
                }),
                getMaxVersion: jest.fn(async (em: EntityManager, domain: CatalogItemDomain): Promise<number> => {
                    return 1;
                }),
                insertRecord: jest.fn(async (em: EntityManager, domain: CatalogItemDomain): Promise<InsertResult> => {
                    // throw new Error('Unit Test DB Error');
                    const ret = new InsertResult();
                    ret.identifiers = [{ id: 1 }];
                    return ret;
                }),
                updateRecord: jest.fn(async (em: EntityManager, domain: CatalogItemDomain): Promise<UpdateResult> => {
                    throw new Error('Unit Test DB Error');
                }),
                updateResponseRecord: jest.fn(async (em: EntityManager, domain: CatalogItemDomain): Promise<UpdateResult> => {
                    throw new Error('Unit Test DB Error');
                }),
                deleteRecord: jest.fn(async (em: EntityManager, domain: CatalogItemDomain): Promise<UpdateResult> => {
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
        await common.executeSqlFile('nameSpace.sql');
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
     * カタログ追加
     */
    describe('カタログ追加', () => {
        test('異常 前提：モデル、DBエラー', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.minimum);

            // レスポンスチェック
            expect(response.status).toBe(404);
            expect(response.body.message).toBe(Message.CATALOG_NOT_FOUND);
        });
        test('異常 前提：ビルトイン、DBエラー', async () => {
            // URLを生成
            const url = Url.builtInURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInRequest.minimum);

            // レスポンスチェック
            expect(response.status).toBe(404);
            expect(response.body.message).toBe(Message.CATALOG_NOT_FOUND);
        });
        test('異常 前提：拡張、DBエラー', async () => {
            // URLを生成
            const url = Url.extURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtRequest.minimum);

            // レスポンスチェック
            expect(response.status).toBe(404);
            expect(response.body.message).toBe(Message.CATALOG_NOT_FOUND);
        });
    });
});
