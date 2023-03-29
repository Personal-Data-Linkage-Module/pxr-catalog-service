/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import * as supertest from 'supertest';
import { Application } from '../resources/config/Application';
import Common, { Url } from './Common';
import { Session } from './Session';
import Config from '../common/Config';
import { UpdateSetRequest } from './UpdateSetRequest';
import urljoin = require('url-join');
const Message = Config.ReadConfig('./config/message.json');

// テストモジュールをインポート
jest.mock('../repositories/postgres/UpdateSetRepository');
jest.mock('../repositories/postgres/NameSpaceRepository');
jest.mock('../repositories/postgres/CatalogItemRepository');

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
     * 各テスト実行の後処理
     */
    afterEach(async () => {
    });

    /**
     * 変更セット登録
     */
    describe('変更セット登録', () => {
        test('異常 前提：DBエラー', async () => {
            // URLを生成
            const url = Url.updateSetRegisterURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(UpdateSetRequest.addlist[0]);

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.UNDEFINED_ERROR);
        });
    });

    /**
     * 変更セット登録変更
     */
    describe('変更セット登録変更', () => {
        test('異常 前提：DBエラー', async () => {
            // URLを生成
            const url = urljoin(Url.updateSetRegisterURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(UpdateSetRequest.addlist[0]);

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.UNDEFINED_ERROR);
        });
    });

    /**
     * 変更セット情報取得
     */
    describe('変更セット情報取得', () => {
        test('異常 前提：DBエラー', async () => {
            // URLを生成
            const url = urljoin(Url.updateSetSearchInfoURI, '1');

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
     * 未承認変更セットリスト取得
     */
    describe('未承認変更セットリスト取得', () => {
        test('異常 前提：DBエラー', async () => {
            // URLを生成
            const url = Url.updateSetSearchRequestURI;

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
     * 承認済変更セットリスト取得
     */
    describe('承認済変更セットリスト取得', () => {
        test('異常 前提：DBエラー', async () => {
            // URLを生成
            const url = Url.updateSetSearchApprovalURI;

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
     * 変更セット登録削除
     */
    describe('変更セット登録削除', () => {
        test('異常 前提：DBエラー', async () => {
            // URLを生成
            const url = urljoin(Url.updateSetRegisterURI, '1');

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

    /**
     * 変更セット申請
     */
    describe('変更セット申請', () => {
        test('異常 前提：DBエラー', async () => {
            // URLを生成
            const url = Url.updateSetRequestURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    id: 2,
                    approvalActor: 1000001
                });

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.UNDEFINED_ERROR);
        });
    });

    /**
     * 変更セット承認
     */
    describe('変更セット承認', () => {
        test('異常 前提：DBエラー', async () => {
            // URLを生成
            const url = urljoin(Url.updateSetApprovalURI, '2');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    status: 2,
                    comment: '承認コメント'
                });

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.UNDEFINED_ERROR);
        });
    });
});
