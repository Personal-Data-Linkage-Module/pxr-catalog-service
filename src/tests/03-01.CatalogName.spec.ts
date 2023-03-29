/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import * as supertest from 'supertest';
import { Application } from '../resources/config/Application';
import Common, { Url } from './Common';
import { Session } from './Session';
import StubOperatorServer from './StubOperatorServer';
import OperatorDomain from '../domains/OperatorDomain';
import Config from '../common/Config';
const Message = Config.ReadConfig('./config/message.json');

// 対象アプリケーションを取得
const app = new Application();
const expressApp = app.express.app;
const common = new Common();

// オペレーターサービスの宣言
let operatorServer: StubOperatorServer = null;

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
     * 各テスト実行の後処理
     */
    afterEach(async () => {
        // スタブサーバー停止
        if (operatorServer) {
            operatorServer._server.close();
            operatorServer._server = null;
            operatorServer = null;
        }
    });

    /**
     * アクティベート
     */
    describe('アクティベート', () => {
        test('正常 前提：未アクティベート、カタログコード範囲あり', async () => {
            // アクティベート解除
            await common.executeSqlString(`
                DELETE FROM pxr_catalog.catalog
            `);

            // URLを生成
            const url = Url.nameURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    name: 'PXRカタログ',
                    description: '組織が運営するPLR基盤が提供するデータカタログです。',
                    ext_name: 'test-org'
                });

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.id).not.toBeNull();
            expect(response.body.name).toBe('PXRカタログ');
            expect(response.body.description).toBe('組織が運営するPLR基盤が提供するデータカタログです。');
            expect(response.body.ext_name).toBe('test-org');
        });
        test('正常 前提：未アクティベート、カタログコード範囲なし', async () => {
            // アクティベート解除
            await common.executeSqlString(`
                DELETE FROM pxr_catalog.catalog
            `);
            // カタログコード範囲削除
            await common.executeSqlString(`
                DELETE FROM pxr_catalog.catalog_code_scope;
                SELECT SETVAL('pxr_catalog.catalog_code_scope_id_seq', 1, false);
            `);

            // URLを生成
            const url = Url.nameURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    name: 'PXRカタログ',
                    description: '組織が運営するPLR基盤が提供するデータカタログです。',
                    ext_name: 'test-org'
                });

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.id).not.toBeNull();
            expect(response.body.name).toBe('PXRカタログ');
            expect(response.body.description).toBe('組織が運営するPLR基盤が提供するデータカタログです。');
            expect(response.body.ext_name).toBe('test-org');
        });
        test('正常 前提：アクティベート済み', async () => {
            // URLを生成
            const url = Url.nameURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    name: 'PXRカタログ',
                    description: '組織が運営するPLR基盤が提供するデータカタログです。',
                    ext_name: 'test-org'
                });

            // レスポンスチェック
            expect(response.status).toBe(409);
            expect(response.body.message).toBe(Message.ALREADY_ACTIVATE);
        });
        test('正常 前提：Cookie(個人メンバー)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 0);

            // アクティベート解除
            await common.executeSqlString(`
                DELETE FROM pxr_catalog.catalog
            `);

            // URLを生成
            const url = Url.nameURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_PERSONAL_KEY + '=81654181b851542feec3ee0ba3be7695f1472af4702f3aa2a6aa1971c5e3d645'])
                .send({
                    name: 'PXRカタログ',
                    description: '組織が運営するPLR基盤が提供するデータカタログです。',
                    ext_name: 'test-org'
                });

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.id).not.toBeNull();
            expect(response.body.name).toBe('PXRカタログ');
            expect(response.body.description).toBe('組織が運営するPLR基盤が提供するデータカタログです。');
            expect(response.body.ext_name).toBe('test-org');
        });
        test('正常 前提：Cookie(アプリケーションメンバー)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 1);

            // アクティベート解除
            await common.executeSqlString(`
                DELETE FROM pxr_catalog.catalog
            `);

            // URLを生成
            const url = Url.nameURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_APPLICATION_KEY + '=879777267f854aa3fb49993ca2d1488a7ef2ca5c743297ad6f4b155c88c12c16'])
                .send({
                    name: 'PXRカタログ',
                    description: '組織が運営するPLR基盤が提供するデータカタログです。',
                    ext_name: 'test-org'
                });

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.id).not.toBeNull();
            expect(response.body.name).toBe('PXRカタログ');
            expect(response.body.description).toBe('組織が運営するPLR基盤が提供するデータカタログです。');
            expect(response.body.ext_name).toBe('test-org');
        });
        test('正常 前提：Cookie(運営メンバー)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 3);

            // アクティベート解除
            await common.executeSqlString(`
                DELETE FROM pxr_catalog.catalog
            `);

            // URLを生成
            const url = Url.nameURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send({
                    name: 'PXRカタログ',
                    description: '組織が運営するPLR基盤が提供するデータカタログです。',
                    ext_name: 'test-org'
                });

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.id).not.toBeNull();
            expect(response.body.name).toBe('PXRカタログ');
            expect(response.body.description).toBe('組織が運営するPLR基盤が提供するデータカタログです。');
            expect(response.body.ext_name).toBe('test-org');
        });
        test('異常 前提：Cookie(空)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 3);

            // URLを生成
            const url = Url.nameURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set('Cookie', null)
                .send({
                    name: 'PXRカタログ',
                    description: '組織が運営するPLR基盤が提供するデータカタログです。',
                    ext_name: 'test-org'
                });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常 前提：Cookie、オペレータサービス接続失敗', async () => {
            // URLを生成
            const url = Url.nameURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send({
                    name: 'PXRカタログ',
                    description: '組織が運営するPLR基盤が提供するデータカタログです。',
                    ext_name: 'test-org'
                });

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_OPERATOR);
        });
        test('異常 前提：Cookie、オペレータサービス応答204', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(204, 3);

            // URLを生成
            const url = Url.nameURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send({
                    name: 'PXRカタログ',
                    description: '組織が運営するPLR基盤が提供するデータカタログです。',
                    ext_name: 'test-org'
                });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常 前提：Cookie、オペレータサービス応答400', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(400, 3);

            // URLを生成
            const url = Url.nameURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send({
                    name: 'PXRカタログ',
                    description: '組織が運営するPLR基盤が提供するデータカタログです。',
                    ext_name: 'test-org'
                });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常 前提：Cookie、オペレータサービス応答500', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(500, 3);

            // URLを生成
            const url = Url.nameURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send({
                    name: 'PXRカタログ',
                    description: '組織が運営するPLR基盤が提供するデータカタログです。',
                    ext_name: 'test-org'
                });

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_TAKE_SESSION);
        });
        test('異常 前提：セッションなし', async () => {
            // URLを生成
            const url = Url.nameURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .send({
                    name: 'PXRカタログ',
                    description: '組織が運営するPLR基盤が提供するデータカタログです。',
                    ext_name: 'test-org'
                });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('パラメータ異常 前提：name未定義', async () => {
            // URLを生成
            const url = Url.nameURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    description: '組織が運営するPLR基盤が提供するデータカタログです。',
                    ext_name: 'test-org'
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons).toBeDefined();
            expect(response.body.reasons.length).toBe(1);
            expect(response.body.reasons[0].property).toBe('name');
            expect(response.body.reasons[0].value).toBe(null);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常 前提：description未定義', async () => {
            // URLを生成
            const url = Url.nameURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    name: 'PXRカタログ',
                    ext_name: 'test-org'
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons).toBeDefined();
            expect(response.body.reasons.length).toBe(1);
            expect(response.body.reasons[0].property).toBe('description');
            expect(response.body.reasons[0].value).toBe(null);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常 前提：ext_name未定義', async () => {
            // URLを生成
            const url = Url.nameURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    name: 'PXRカタログ',
                    description: '組織が運営するPLR基盤が提供するデータカタログです。'
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons).toBeDefined();
            expect(response.body.reasons.length).toBe(1);
            expect(response.body.reasons[0].property).toBe('ext_name');
            expect(response.body.reasons[0].value).toBe(null);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常 前提：name空文字', async () => {
            // URLを生成
            const url = Url.nameURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    name: '',
                    description: '組織が運営するPLR基盤が提供するデータカタログです。',
                    ext_name: 'test-org'
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons).toBeDefined();
            expect(response.body.reasons.length).toBe(1);
            expect(response.body.reasons[0].property).toBe('name');
            expect(response.body.reasons[0].value).toBe(null);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNotEmpty);
        });
        test('パラメータ異常 前提：description空文字', async () => {
            // URLを生成
            const url = Url.nameURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    name: 'PXRカタログ',
                    description: '',
                    ext_name: 'test-org'
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons).toBeDefined();
            expect(response.body.reasons.length).toBe(1);
            expect(response.body.reasons[0].property).toBe('description');
            expect(response.body.reasons[0].value).toBe(null);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNotEmpty);
        });
        test('パラメータ異常 前提：ext_name空文字', async () => {
            // URLを生成
            const url = Url.nameURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    name: 'PXRカタログ',
                    description: '組織が運営するPLR基盤が提供するデータカタログです。',
                    ext_name: ''
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons).toBeDefined();
            expect(response.body.reasons.length).toBe(1);
            expect(response.body.reasons[0].property).toBe('ext_name');
            expect(response.body.reasons[0].value).toBe(null);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNotEmpty);
        });
    });

    /**
     * カタログ名取得
     */
    describe('カタログ名取得', () => {
        test('異常 前提：未アクティベート、対象データなし', async () => {
            // アクティベート解除
            await common.executeSqlString(`
                DELETE FROM pxr_catalog.catalog
            `);

            // URLを生成
            const url = Url.nameURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // アクティベート
            await common.executeSqlFile('activate.sql');

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_ACTIVATE);
        });
        test('正常 前提：なし', async () => {
            // URLを生成
            const url = Url.nameURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.id).not.toBeNull();
            expect(response.body.name).toBe('PXRカタログ');
            expect(response.body.description).toBe('組織が運営するPLR基盤が提供するデータカタログです。');
            expect(response.body.ext_name).toBe('test-org');
        });
        test('正常 前提：Cookie(個人メンバー)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 0);

            // URLを生成
            const url = Url.nameURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_PERSONAL_KEY + '=81654181b851542feec3ee0ba3be7695f1472af4702f3aa2a6aa1971c5e3d645'])
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.id).not.toBeNull();
            expect(response.body.name).toBe('PXRカタログ');
            expect(response.body.description).toBe('組織が運営するPLR基盤が提供するデータカタログです。');
            expect(response.body.ext_name).toBe('test-org');
        });
        test('正常 前提：Cookie(アプリケーションメンバー)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 1);

            // URLを生成
            const url = Url.nameURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_APPLICATION_KEY + '=879777267f854aa3fb49993ca2d1488a7ef2ca5c743297ad6f4b155c88c12c16'])
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.id).not.toBeNull();
            expect(response.body.name).toBe('PXRカタログ');
            expect(response.body.description).toBe('組織が運営するPLR基盤が提供するデータカタログです。');
            expect(response.body.ext_name).toBe('test-org');
        });
        test('正常 前提：Cookie(運営メンバー)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 3);

            // URLを生成
            const url = Url.nameURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.id).not.toBeNull();
            expect(response.body.name).toBe('PXRカタログ');
            expect(response.body.description).toBe('組織が運営するPLR基盤が提供するデータカタログです。');
            expect(response.body.ext_name).toBe('test-org');
        });
        test('異常 前提：Cookie(空)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 3);

            // URLを生成
            const url = Url.nameURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set('Cookie', null)
                .send();

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常 前提：Cookie、オペレータサービス接続失敗', async () => {
            // URLを生成
            const url = Url.nameURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send();

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_OPERATOR);
        });
        test('異常 前提：Cookie、オペレータサービス応答204', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(204, 3);

            // URLを生成
            const url = Url.nameURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send();

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常 前提：Cookie、オペレータサービス応答400', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(400, 3);

            // URLを生成
            const url = Url.nameURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send();

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常 前提：Cookie、オペレータサービス応答500', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(500, 3);

            // URLを生成
            const url = Url.nameURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send();

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_TAKE_SESSION);
        });
        test('異常 前提：セッションなし', async () => {
            // URLを生成
            const url = Url.nameURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
    });

    /**
     * カタログ名更新
     */
    describe('カタログ名更新', () => {
        test('異常 前提：未アクティベート', async () => {
            // アクティベート解除
            await common.executeSqlString(`
                DELETE FROM pxr_catalog.catalog
            `);

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

            // アクティベート
            await common.executeSqlFile('activate.sql');

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_ACTIVATE);
        });
        test('正常 前提：なし', async () => {
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
            expect(response.status).toBe(200);
            expect(response.body.id).not.toBeNull();
            expect(response.body.name).toBe('PXRカタログ');
            expect(response.body.description).toBe('組織が運営するPLR基盤が提供するデータカタログです。');
            expect(response.body.ext_name).toBe('test-org');
        });
        test('正常 前提：Cookie(個人メンバー)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 0);

            // URLを生成
            const url = Url.nameURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_PERSONAL_KEY + '=81654181b851542feec3ee0ba3be7695f1472af4702f3aa2a6aa1971c5e3d645'])
                .send({
                    name: 'PXRカタログ',
                    description: '組織が運営するPLR基盤が提供するデータカタログです。',
                    ext_name: 'test-org'
                });

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.id).not.toBeNull();
            expect(response.body.name).toBe('PXRカタログ');
            expect(response.body.description).toBe('組織が運営するPLR基盤が提供するデータカタログです。');
            expect(response.body.ext_name).toBe('test-org');
        });
        test('正常 前提：Cookie(アプリケーションメンバー)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 1);

            // URLを生成
            const url = Url.nameURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_APPLICATION_KEY + '=879777267f854aa3fb49993ca2d1488a7ef2ca5c743297ad6f4b155c88c12c16'])
                .send({
                    name: 'PXRカタログ',
                    description: '組織が運営するPLR基盤が提供するデータカタログです。',
                    ext_name: 'test-org'
                });

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.id).not.toBeNull();
            expect(response.body.name).toBe('PXRカタログ');
            expect(response.body.description).toBe('組織が運営するPLR基盤が提供するデータカタログです。');
            expect(response.body.ext_name).toBe('test-org');
        });
        test('正常 前提：Cookie(運営メンバー)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 3);

            // URLを生成
            const url = Url.nameURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send({
                    name: 'PXRカタログ',
                    description: '組織が運営するPLR基盤が提供するデータカタログです。',
                    ext_name: 'test-org'
                });

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.id).not.toBeNull();
            expect(response.body.name).toBe('PXRカタログ');
            expect(response.body.description).toBe('組織が運営するPLR基盤が提供するデータカタログです。');
            expect(response.body.ext_name).toBe('test-org');
        });
        test('異常 前提：Cookie(空)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 3);

            // URLを生成
            const url = Url.nameURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set('Cookie', null)
                .send({
                    name: 'PXRカタログ',
                    description: '組織が運営するPLR基盤が提供するデータカタログです。',
                    ext_name: 'test-org'
                });
            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常 前提：Cookie、オペレータサービス接続失敗', async () => {
            // URLを生成
            const url = Url.nameURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send({
                    name: 'PXRカタログ',
                    description: '組織が運営するPLR基盤が提供するデータカタログです。',
                    ext_name: 'test-org'
                });

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_OPERATOR);
        });
        test('異常 前提：Cookie、オペレータサービス応答204', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(204, 3);

            // URLを生成
            const url = Url.nameURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send({
                    name: 'PXRカタログ',
                    description: '組織が運営するPLR基盤が提供するデータカタログです。',
                    ext_name: 'test-org'
                });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常 前提：Cookie、オペレータサービス応答400', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(400, 3);

            // URLを生成
            const url = Url.nameURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send({
                    name: 'PXRカタログ',
                    description: '組織が運営するPLR基盤が提供するデータカタログです。',
                    ext_name: 'test-org'
                });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常 前提：Cookie、オペレータサービス応答500', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(500, 3);

            // URLを生成
            const url = Url.nameURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send({
                    name: 'PXRカタログ',
                    description: '組織が運営するPLR基盤が提供するデータカタログです。',
                    ext_name: 'test-org'
                });

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_TAKE_SESSION);
        });
        test('異常 前提：セッションなし', async () => {
            // URLを生成
            const url = Url.nameURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .send({
                    name: 'PXRカタログ',
                    description: '組織が運営するPLR基盤が提供するデータカタログです。',
                    ext_name: 'test-org'
                });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('パラメータ異常 前提：name未定義 モデル', async () => {
            // URLを生成
            const url = Url.nameURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    description: '組織が運営するPLR基盤が提供するデータカタログです。',
                    ext_name: 'test-org'
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons).toBeDefined();
            expect(response.body.reasons.length).toBe(1);
            expect(response.body.reasons[0].property).toBe('name');
            expect(response.body.reasons[0].value).toBe(null);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常 前提：description未定義 モデル', async () => {
            // URLを生成
            const url = Url.nameURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    name: 'PXRカタログ',
                    ext_name: 'test-org'
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons).toBeDefined();
            expect(response.body.reasons.length).toBe(1);
            expect(response.body.reasons[0].property).toBe('description');
            expect(response.body.reasons[0].value).toBe(null);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常 前提：ext_name未定義 モデル', async () => {
            // URLを生成
            const url = Url.nameURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    name: 'PXRカタログ',
                    description: '組織が運営するPLR基盤が提供するデータカタログです。'
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons).toBeDefined();
            expect(response.body.reasons.length).toBe(1);
            expect(response.body.reasons[0].property).toBe('ext_name');
            expect(response.body.reasons[0].value).toBe(null);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常 前提：name空文字', async () => {
            // URLを生成
            const url = Url.nameURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    name: '',
                    description: '組織が運営するPLR基盤が提供するデータカタログです。',
                    ext_name: 'test-org'
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons).toBeDefined();
            expect(response.body.reasons.length).toBe(1);
            expect(response.body.reasons[0].property).toBe('name');
            expect(response.body.reasons[0].value).toBe(null);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNotEmpty);
        });
        test('パラメータ異常 前提：description空文字 モデル', async () => {
            // URLを生成
            const url = Url.nameURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    name: 'PXRカタログ',
                    description: '',
                    ext_name: 'test-org'
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons).toBeDefined();
            expect(response.body.reasons.length).toBe(1);
            expect(response.body.reasons[0].property).toBe('description');
            expect(response.body.reasons[0].value).toBe(null);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNotEmpty);
        });
        test('パラメータ異常 前提：ext_name空文字 モデル', async () => {
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
                    ext_name: ''
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons).toBeDefined();
            expect(response.body.reasons.length).toBe(1);
            expect(response.body.reasons[0].property).toBe('ext_name');
            expect(response.body.reasons[0].value).toBe(null);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNotEmpty);
        });
    });
});
