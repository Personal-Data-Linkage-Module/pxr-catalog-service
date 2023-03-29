/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import CatalogCodeScopeDomain from '../domains/CatalogCodeScopeDomain';
import CatalogCodeScopeEntity from '../repositories/postgres/CatalogCodeScopeEntity';
import { EntityManager, InsertResult, UpdateResult } from 'typeorm';
/* eslint-enable */
import * as supertest from 'supertest';
import { Application } from '../resources/config/Application';
import Common, { Url } from './Common';
import { Session } from './Session';
import Config from '../common/Config';
const Message = Config.ReadConfig('./config/message.json');
import urljoin = require('url-join');

// テストモジュールをインポート
jest.mock('../repositories/postgres/CatalogCodeScopeRepository', () => {
    return {
        default: jest.fn().mockImplementation((async) => {
            return {
                getRecord: jest.fn(async (em: EntityManager, domain: CatalogCodeScopeDomain): Promise<CatalogCodeScopeEntity[]> => {
                    const list: CatalogCodeScopeEntity[] = [];
                    list.push(new CatalogCodeScopeEntity({
                        id: 1,
                        type: 'model',
                        start_code: 1,
                        end_code: 10000,
                        isDisabled: false,
                        attributes: null
                    }));
                    return list;
                }),
                isCatalogCodeValid: jest.fn(async (em: EntityManager, type: string, code: number): Promise<boolean> => {
                    return false;
                }),
                isCatalogCodeExists: jest.fn(async (em: EntityManager, domain: CatalogCodeScopeDomain): Promise<boolean> => {
                    return false;
                }),
                getNextCatalogCode: jest.fn(async (em: EntityManager, type: string, code: number): Promise<number> => {
                    return 1;
                }),
                insertRecord: jest.fn(async (em: EntityManager, domain: CatalogCodeScopeDomain): Promise<InsertResult> => {
                    throw new Error('Unit Test DB Error');
                }),
                updateRecord: jest.fn(async (em: EntityManager, domain: CatalogCodeScopeDomain): Promise<UpdateResult> => {
                    throw new Error('Unit Test DB Error');
                }),
                deleteRecord: jest.fn(async (em: EntityManager, domain: CatalogCodeScopeDomain): Promise<UpdateResult> => {
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
     * カタログコード範囲追加
     */
    describe('カタログコード範囲追加', () => {
        test('異常 前提：DBエラー モデル', async () => {
            // URLを生成
            const url = Url.codeURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    type: 'model',
                    start_code: 1,
                    end_code: 10000
                });

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.UNDEFINED_ERROR);
        });
        test('異常 前提：DBエラー ビルトイン', async () => {
            // URLを生成
            const url = Url.codeURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    type: 'built_in',
                    start_code: 10001,
                    end_code: 1000000
                });

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.UNDEFINED_ERROR);
        });
        test('異常 前提：DBエラー 拡張', async () => {
            // URLを生成
            const url = Url.codeURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    type: 'ext',
                    start_code: 1000001,
                    end_code: 10000000
                });

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.UNDEFINED_ERROR);
        });
    });

    /**
     * カタログコード範囲更新
     */
    describe('カタログコード範囲更新', () => {
        test('異常 前提：DBエラー モデル', async () => {
            // URLを生成
            const url = urljoin(Url.codeURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    type: 'model',
                    start_code: 1,
                    end_code: 10000
                });

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.UNDEFINED_ERROR);
        });
        test('異常 前提：DBエラー ビルトイン', async () => {
            // URLを生成
            const url = urljoin(Url.codeURI, '2');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    type: 'built_in',
                    start_code: 10001,
                    end_code: 1000000
                });

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.UNDEFINED_ERROR);
        });
        test('異常 前提：DBエラー 拡張', async () => {
            // URLを生成
            const url = urljoin(Url.codeURI, '3');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    type: 'ext',
                    start_code: 1000001,
                    end_code: 10000000
                });

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.UNDEFINED_ERROR);
        });
    });
});
