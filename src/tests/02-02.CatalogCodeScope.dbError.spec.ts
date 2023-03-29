/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import * as supertest from 'supertest';
import { Application } from '../resources/config/Application';
import Common, { Url } from './Common';
import { Session } from './Session';
import Config from '../common/Config';
const Message = Config.ReadConfig('./config/message.json');
import urljoin = require('url-join');

// テストモジュールをインポート
jest.mock('../repositories/postgres/CatalogCodeScopeRepository');

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
     * カタログコード範囲取得
     */
    describe('カタログコード範囲取得', () => {
        test('異常 前提：DBエラー', async () => {
            // URLを生成
            const url = Url.codeURI;

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
     * カタログコード範囲取得(:type)
     */
    describe('カタログコード範囲取得(:type)', () => {
        test('異常 前提：DBエラー モデル', async () => {
            // URLを生成
            const url = urljoin(Url.codeURI, 'model');

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
        test('異常 前提：DBエラー ビルトイン', async () => {
            // URLを生成
            const url = urljoin(Url.codeURI, 'built_in');

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
        test('異常 前提：DBエラー 拡張', async () => {
            // URLを生成
            const url = urljoin(Url.codeURI, 'ext');

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

    /**
     * カタログコード範囲削除
     */
    describe('カタログコード範囲削除', () => {
        test('異常 前提：DBエラー モデル', async () => {
            // URLを生成
            const url = urljoin(Url.codeURI, '1');

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
        test('異常 前提：DBエラー ビルトイン', async () => {
            // URLを生成
            const url = urljoin(Url.codeURI, '2');

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
        test('異常 前提：DBエラー 拡張', async () => {
            // URLを生成
            const url = urljoin(Url.codeURI, '3');

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
