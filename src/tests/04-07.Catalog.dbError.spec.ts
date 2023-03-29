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
import urljoin = require('url-join');

// テストモジュールをインポート
jest.mock('../repositories/postgres/CatalogItemRepository', () => {
    return {
        default: jest.fn().mockImplementation((async) => {
            return {
                getRecord: jest.fn(async (em: EntityManager, domain: CatalogItemDomain): Promise<CatalogItemEntity[]> => {
                    const list: CatalogItemEntity[] = [];
                    list.push(new CatalogItemEntity({
                        id: 1,
                        code: 1,
                        version: 1,
                        nsId: 1,
                        name: 'name',
                        description: 'description',
                        inheritCode: null,
                        inheritVersion: null,
                        isReserved: false,
                        isDisabled: false,
                        response: null
                    }));
                    return list;
                }),
                getCatalogId: jest.fn(async (em: EntityManager, domain: CatalogItemDomain, isReservedCheck: boolean = true): Promise<number> => {
                    return 1;
                }),
                getMaxCode: jest.fn(async (em: EntityManager, domain: CatalogItemDomain): Promise<number> => {
                    return 1;
                }),
                getMaxVersion: jest.fn(async (em: EntityManager, domain: CatalogItemDomain): Promise<number> => {
                    return 1;
                }),
                insertRecord: jest.fn(async (em: EntityManager, domain: CatalogItemDomain): Promise<InsertResult> => {
                    throw new Error('Unit Test DB Error');
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
     * カタログ取得
     */
    describe('カタログ取得', () => {
        test('異常 前提：モデル、DBエラー', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '?ns=catalog/model/unit-test');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.UNDEFINED_ERROR);
        });
        test('異常 前提：ビルトイン、DBエラー', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '?ns=catalog/built_in/unit-test');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.UNDEFINED_ERROR);
        });
        test('異常 前提：拡張、DBエラー', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '?ns=catalog/ext/unit-test');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.UNDEFINED_ERROR);
        });
    });

    /**
     * カタログ取得(/:code)
     */
    describe('カタログ取得(/:code)', () => {
        test('異常 前提：モデル、DBエラー', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.UNDEFINED_ERROR);
        });
        test('異常 前提：ビルトイン、DBエラー', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10001');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.UNDEFINED_ERROR);
        });
        test('異常 前提：拡張、DBエラー', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000001');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.UNDEFINED_ERROR);
        });
    });

    /**
     * カタログ取得(/:code/:ver)
     */
    describe('カタログ取得(/:code/:ver)', () => {
        test('異常 前提：モデル、DBエラー', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.UNDEFINED_ERROR);
        });
        test('異常 前提：ビルトイン、DBエラー', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10001', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.UNDEFINED_ERROR);
        });
        test('異常 前提：拡張、DBエラー', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000001', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.UNDEFINED_ERROR);
        });
    });

    /**
     * カタログ更新
     */
    describe('カタログ更新', () => {
        test('異常 前提：モデル、DBエラー', async () => {
            // URLを生成
            const url = urljoin(Url.modelURI, '1', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.minimumCode);

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.UNDEFINED_ERROR);
        });
        test('異常 前提：ビルトイン、DBエラー', async () => {
            // URLを生成
            const url = urljoin(Url.builtInURI, '10001', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInRequest.minimumCode);

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.UNDEFINED_ERROR);
        });
        test('異常 前提：拡張、DBエラー', async () => {
            // URLを生成
            const url = urljoin(Url.extURI, '1000001', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtRequest.minimumCode);

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.UNDEFINED_ERROR);
        });
    });

    /**
     * カタログ削除
     */
    describe('カタログ削除', () => {
        test('異常 前提：モデル、DBエラー', async () => {
            // URLを生成
            const url = urljoin(Url.modelURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .delete(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.UNDEFINED_ERROR);
        });
        test('異常 前提：ビルトイン、DBエラー', async () => {
            // URLを生成
            const url = urljoin(Url.builtInURI, '10001');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .delete(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.UNDEFINED_ERROR);
        });
        test('異常 前提：拡張、DBエラー', async () => {
            // URLを生成
            const url = urljoin(Url.extURI, '1000001');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .delete(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.UNDEFINED_ERROR);
        });
    });
});
