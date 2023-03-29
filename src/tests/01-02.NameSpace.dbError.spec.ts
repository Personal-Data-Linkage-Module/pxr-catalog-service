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
jest.mock('../repositories/postgres/NameSpaceRepository');

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
     * ネームスペース追加
     */
    describe('ネームスペース追加', () => {
        test('異常 前提：DBエラー モデル', async () => {
            // URLを生成
            const url = Url.nsModelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    ns: 'catalog/model/test',
                    description: 'テストネームスペース(model)'
                });

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.UNDEFINED_ERROR);
        });
        test('異常 前提：DBエラー ビルトイン', async () => {
            // URLを生成
            const url = Url.nsBuiltInURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    ns: 'catalog/built_in/test',
                    description: 'テストネームスペース(built_in)'
                });

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.UNDEFINED_ERROR);
        });
        test('異常 前提：DBエラー 拡張', async () => {
            // URLを生成
            const url = Url.nsExtURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    ns: 'catalog/ext/test',
                    description: 'テストネームスペース(ext)'
                });

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.UNDEFINED_ERROR);
        });
    });

    /**
     * ネームスペース取得
     */
    describe('ネームスペース取得', () => {
        test('異常 前提：DBエラー モデル', async () => {
            // URLを生成
            const url = urljoin(Url.nsURI, '?ns=catalog/model/test');

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
            const url = urljoin(Url.nsURI, '?ns=catalog/built_in/test');

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
            const url = urljoin(Url.nsURI, '?ns=catalog/ext/test');

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
     * ネームスペース取得(:nsId)
     */
    describe('ネームスペース取得(:nsId)', () => {
        test('異常 前提：DBエラー モデル', async () => {
            // URLを生成
            const url = urljoin(Url.nsURI, '1');

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
            const url = urljoin(Url.nsURI, '2');

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
            const url = urljoin(Url.nsURI, '3');

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
     * ネームスペース更新
     */
    describe('ネームスペース更新', () => {
        test('異常 前提：DBエラー モデル', async () => {
            // URLを生成
            const url = urljoin(Url.nsModelURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    ns: 'catalog/model/test',
                    description: 'テストネームスペース(model)'
                });

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.UNDEFINED_ERROR);
        });
        test('異常 前提：DBエラー ビルトイン', async () => {
            // URLを生成
            const url = urljoin(Url.nsBuiltInURI, '2');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    ns: 'catalog/built_in/test',
                    description: 'テストネームスペース(built_in)'
                });

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.UNDEFINED_ERROR);
        });
        test('異常 前提：DBエラー 拡張', async () => {
            // URLを生成
            const url = urljoin(Url.nsExtURI, '3');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    ns: 'catalog/ext/test',
                    description: 'テストネームスペース(ext)'
                });

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.UNDEFINED_ERROR);
        });
    });

    /**
     * ネームスペース削除
     */
    describe('ネームスペース削除', () => {
        test('異常 前提：DBエラー モデル', async () => {
            // URLを生成
            const url = urljoin(Url.nsModelURI, '1');

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
            const url = urljoin(Url.nsBuiltInURI, '2');

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
            const url = urljoin(Url.nsExtURI, '3');

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
