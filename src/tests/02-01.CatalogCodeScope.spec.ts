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
import urljoin = require('url-join');

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
     * カタログコード範囲追加
     */
    describe('カタログコード範囲追加', () => {
        test('異常 前提：未アクティベート', async () => {
            // アクティベート解除
            await common.executeSqlString(`
                DELETE FROM pxr_catalog.catalog
            `);

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

            // アクティベート
            await common.executeSqlFile('activate.sql');

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_ACTIVATE);
        });
        test('正常 前提：なし モデル', async () => {
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
            expect(response.status).toBe(200);
            expect(response.body.id).toBe(1);
            expect(response.body.type).toBe('model');
            expect(response.body.start_code).toBe(1);
            expect(response.body.end_code).toBe(10000);
        });
        test('正常 前提：なし ビルトイン', async () => {
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
            expect(response.status).toBe(200);
            expect(response.body.id).toBe(2);
            expect(response.body.type).toBe('built_in');
            expect(response.body.start_code).toBe(10001);
            expect(response.body.end_code).toBe(1000000);
        });
        test('正常 前提：なし 拡張', async () => {
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
            expect(response.status).toBe(200);
            expect(response.body.id).toBe(3);
            expect(response.body.type).toBe('ext');
            expect(response.body.start_code).toBe(1000001);
            expect(response.body.end_code).toBe(10000000);
        });
        test('正常 前提：Cookie(個人メンバー)', async () => {
            // カタログコード範囲削除
            await common.executeSqlString(`
                DELETE FROM pxr_catalog.catalog_code_scope;
                SELECT SETVAL('pxr_catalog.catalog_code_scope_id_seq', 1, false);
            `);

            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 0);

            // URLを生成
            const url = Url.codeURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_PERSONAL_KEY + '=81654181b851542feec3ee0ba3be7695f1472af4702f3aa2a6aa1971c5e3d645'])
                .send({
                    type: 'model',
                    start_code: 1,
                    end_code: 10000
                });

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.id).toBe(1);
            expect(response.body.type).toBe('model');
            expect(response.body.start_code).toBe(1);
            expect(response.body.end_code).toBe(10000);
        });
        test('正常 前提：Cookie(アプリケーションメンバー)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 1);

            // URLを生成
            const url = Url.codeURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_APPLICATION_KEY + '=879777267f854aa3fb49993ca2d1488a7ef2ca5c743297ad6f4b155c88c12c16'])
                .send({
                    type: 'built_in',
                    start_code: 10001,
                    end_code: 1000000
                });

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.id).toBe(2);
            expect(response.body.type).toBe('built_in');
            expect(response.body.start_code).toBe(10001);
            expect(response.body.end_code).toBe(1000000);
        });
        test('正常 前提：Cookie(運営メンバー)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 3);

            // URLを生成
            const url = Url.codeURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send({
                    type: 'model',
                    start_code: 10000001,
                    end_code: 10010000
                });

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.id).toBe(3); // この値はシリアル値
            expect(response.body.type).toBe('model');
            expect(response.body.start_code).toBe(10000001);
            expect(response.body.end_code).toBe(10010000);
        });
        test('異常 前提：Cookie(空)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 3);

            // URLを生成
            const url = Url.codeURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set('Cookie', null)
                .send({
                    type: 'model',
                    start_code: 1,
                    end_code: 10000
                });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常 前提：Cookie、オペレータサービス接続失敗', async () => {
            // URLを生成
            const url = Url.codeURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send({
                    type: 'model',
                    start_code: 1,
                    end_code: 10000
                });

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_OPERATOR);
        });
        test('異常 前提：Cookie、オペレータサービス応答204', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(204, 3);

            // URLを生成
            const url = Url.codeURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send({
                    type: 'model',
                    start_code: 1,
                    end_code: 10000
                });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常 前提：Cookie、オペレータサービス応答400', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(400, 3);

            // URLを生成
            const url = Url.codeURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send({
                    type: 'model',
                    start_code: 1,
                    end_code: 10000
                });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常 前提：Cookie、オペレータサービス応答500', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(500, 3);

            // URLを生成
            const url = Url.codeURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send({
                    type: 'model',
                    start_code: 1,
                    end_code: 10000
                });

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_TAKE_SESSION);
        });
        test('異常 前提：セッションなし', async () => {
            // URLを生成
            const url = Url.codeURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .send({
                    type: 'built_in',
                    start_code: 10001,
                    end_code: 1000000
                });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常 前提：既に存在する範囲', async () => {
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
                    end_code: 1000000
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.CODE_SCOPE_ALREADY);
        });
        test('パラメータ異常 前提：type未定義', async () => {
            // URLを生成
            const url = Url.codeURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    start_code: 1,
                    end_code: 10000
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons).toBeDefined();
            expect(response.body.reasons.length).toBe(1);
            expect(response.body.reasons[0].property).toBe('type');
            expect(response.body.reasons[0].value).toBe(null);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常 前提：start_code未定義', async () => {
            // URLを生成
            const url = Url.codeURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    type: 'model',
                    end_code: 10000
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons).toBeDefined();
            expect(response.body.reasons.length).toBe(1);
            expect(response.body.reasons[0].property).toBe('start_code');
            expect(response.body.reasons[0].value).toBe(null);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常 前提：end_code未定義', async () => {
            // URLを生成
            const url = Url.codeURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    type: 'model',
                    start_code: 1
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons).toBeDefined();
            expect(response.body.reasons.length).toBe(1);
            expect(response.body.reasons[0].property).toBe('end_code');
            expect(response.body.reasons[0].value).toBe(null);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常 前提：type空文字', async () => {
            // URLを生成
            const url = Url.codeURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    type: '',
                    start_code: 1,
                    end_code: 10000
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons).toBeDefined();
            expect(response.body.reasons.length).toBe(1);
            expect(response.body.reasons[0].property).toBe('type');
            expect(response.body.reasons[0].value).toBe(null);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNotEmpty);
        });
        test('パラメータ異常 前提：start_code空文字', async () => {
            // URLを生成
            const url = Url.codeURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    type: 'model',
                    start_code: '',
                    end_code: 10000
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons).toBeDefined();
            expect(response.body.reasons.length).toBe(2);
            expect(response.body.reasons[0].property).toBe('start_code');
            expect(response.body.reasons[0].value).toBe(null);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
            expect(response.body.reasons[1].property).toBe('start_code');
            expect(response.body.reasons[1].value).toBe(null);
            expect(response.body.reasons[1].message).toBe(Message.validation.isNotEmpty);
        });
        test('パラメータ異常 前提：end_code空文字', async () => {
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
                    end_code: ''
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons).toBeDefined();
            expect(response.body.reasons.length).toBe(2);
            expect(response.body.reasons[0].property).toBe('end_code');
            expect(response.body.reasons[0].value).toBe(null);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
            expect(response.body.reasons[1].property).toBe('end_code');
            expect(response.body.reasons[1].value).toBe(null);
            expect(response.body.reasons[1].message).toBe(Message.validation.isNotEmpty);
        });
        test('パラメータ異常 前提：start_code文字列', async () => {
            // URLを生成
            const url = Url.codeURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    type: 'model',
                    start_code: 'XXXXX',
                    end_code: 10000
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons).toBeDefined();
            expect(response.body.reasons.length).toBe(1);
            expect(response.body.reasons[0].property).toBe('start_code');
            expect(response.body.reasons[0].value).toBe('XXXXX');
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ異常 前提：end_code文字列', async () => {
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
                    end_code: 'XXXXX'
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons).toBeDefined();
            expect(response.body.reasons.length).toBe(1);
            expect(response.body.reasons[0].property).toBe('end_code');
            expect(response.body.reasons[0].value).toBe('XXXXX');
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
    });

    /**
     * カタログコード範囲取得
     */
    describe('カタログコード範囲取得', () => {
        test('異常 前提：未アクティベート', async () => {
            // アクティベート解除
            await common.executeSqlString(`
                DELETE FROM pxr_catalog.catalog
            `);

            // URLを生成
            const url = Url.codeURI;

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
            const url = Url.codeURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(3); // この値は「カタログコード範囲追加」テストで登録されたカタログ数
            expect(response.body[0].id).toBe(1); // この値は「カタログコード範囲追加」テストで登録されたときのシリアル値
            expect(response.body[0].type).toBe('model');
            expect(response.body[0].start_code).toBe(1);
            expect(response.body[0].end_code).toBe(10000);
            expect(response.body[1].id).toBe(2); // body[index]は「カタログコード範囲追加」テストの実行順に依存
            expect(response.body[1].type).toBe('built_in');
            expect(response.body[1].start_code).toBe(10001);
            expect(response.body[1].end_code).toBe(1000000);
            expect(response.body[2].id).toBe(3); // この値は「カタログコード範囲追加」テストで登録されたときのシリアル値
            expect(response.body[2].type).toBe('model');
            expect(response.body[2].start_code).toBe(10000001);
            expect(response.body[2].end_code).toBe(10010000);
        });
        test('正常 前提：Cookie(個人メンバー)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 0);

            // URLを生成
            const url = Url.codeURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_PERSONAL_KEY + '=81654181b851542feec3ee0ba3be7695f1472af4702f3aa2a6aa1971c5e3d645'])
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(3);// この値は「カタログコード範囲追加」テストで登録されたカタログ数
            expect(response.body[0].id).toBe(1);// この値は「カタログコード範囲追加」テストで登録されたときのシリアル値
            expect(response.body[0].type).toBe('model');
            expect(response.body[0].start_code).toBe(1);
            expect(response.body[0].end_code).toBe(10000);
            expect(response.body[1].id).toBe(2); // body[index]は「カタログコード範囲追加」テストの実行順に依存
            expect(response.body[1].type).toBe('built_in');
            expect(response.body[1].start_code).toBe(10001);
            expect(response.body[1].end_code).toBe(1000000);
            expect(response.body[2].id).toBe(3); // // この値は「カタログコード範囲追加」テストで登録されたときのシリアル値
            expect(response.body[2].type).toBe('model');
            expect(response.body[2].start_code).toBe(10000001);
            expect(response.body[2].end_code).toBe(10010000);
        });
        test('正常 前提：Cookie(アプリケーションメンバー)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 1);

            // URLを生成
            const url = Url.codeURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_APPLICATION_KEY + '=879777267f854aa3fb49993ca2d1488a7ef2ca5c743297ad6f4b155c88c12c16'])
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(3); // この値は「カタログコード範囲追加」テストで登録されたカタログ数
            expect(response.body[0].id).toBe(1); // この値は「カタログコード範囲追加」テストで登録されたときのシリアル値
            expect(response.body[0].type).toBe('model');
            expect(response.body[0].start_code).toBe(1);
            expect(response.body[0].end_code).toBe(10000);
            expect(response.body[1].id).toBe(2); // body[index]は「カタログコード範囲追加」テストの実行順に依存
            expect(response.body[1].type).toBe('built_in');
            expect(response.body[1].start_code).toBe(10001);
            expect(response.body[1].end_code).toBe(1000000);
            expect(response.body[2].id).toBe(3); // この値は「カタログコード範囲追加」テストで登録されたときのシリアル値
            expect(response.body[2].type).toBe('model');
            expect(response.body[2].start_code).toBe(10000001);
            expect(response.body[2].end_code).toBe(10010000);
        });
        test('正常 前提：Cookie(運営メンバー)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 3);

            // URLを生成
            const url = Url.codeURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(3); // この値は「カタログコード範囲追加」テストで登録されたカタログ数
            expect(response.body[0].id).toBe(1); // この値は「カタログコード範囲追加」テストで登録されたときのシリアル値
            expect(response.body[0].type).toBe('model');
            expect(response.body[0].start_code).toBe(1);
            expect(response.body[0].end_code).toBe(10000);
            expect(response.body[1].id).toBe(2);
            expect(response.body[1].type).toBe('built_in');
            expect(response.body[1].start_code).toBe(10001);
            expect(response.body[1].end_code).toBe(1000000);
            expect(response.body[2].id).toBe(3); // この値は「カタログコード範囲追加」テストで登録されたときのシリアル値
            expect(response.body[2].type).toBe('model');
            expect(response.body[2].start_code).toBe(10000001);
            expect(response.body[2].end_code).toBe(10010000);
        });
        test('異常 前提：Cookie(空)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 3);

            // URLを生成
            const url = Url.codeURI;

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
            const url = Url.codeURI;

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
            const url = Url.codeURI;

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
            const url = Url.codeURI;

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
            const url = Url.codeURI;

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
            const url = Url.codeURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('正常 前提：対象データなし', async () => {
            // 対象データを全て削除
            await common.executeSqlString(`
                DELETE FROM pxr_catalog.catalog_code_scope;
                SELECT SETVAL('pxr_catalog.catalog_code_scope_id_seq', 1, false);
            `);

            // URLを生成
            const url = Url.codeURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // カタログコード範囲を追加
            await common.executeSqlFile('catalogCodeScope.sql');

            // レスポンスチェック
            expect(response.status).toBe(404);
            expect(response.body.message).toBe(Message.CODE_NOT_FOUND);
        });
    });

    /**
     * カタログコード範囲取得(:type)
     */
    describe('カタログコード範囲取得(:type)', () => {
        test('異常 前提：未アクティベート', async () => {
            // アクティベート解除
            await common.executeSqlString(`
                DELETE FROM pxr_catalog.catalog
            `);

            // URLを生成
            const url = urljoin(Url.codeURI, 'model');

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
        test('正常 前提：なし モデル', async () => {
            // URLを生成
            const url = urljoin(Url.codeURI, 'model');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(1);
            expect(response.body[0].id).toBe(1);
            expect(response.body[0].type).toBe('model');
            expect(response.body[0].start_code).toBe(1);
            expect(response.body[0].end_code).toBe(10000);
        });
        test('正常 前提：なし ビルトイン', async () => {
            // URLを生成
            const url = urljoin(Url.codeURI, 'built_in');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(1);
            expect(response.body[0].id).toBe(2);
            expect(response.body[0].type).toBe('built_in');
            expect(response.body[0].start_code).toBe(10001);
            expect(response.body[0].end_code).toBe(1000000);
        });
        test('正常 前提：なし 拡張', async () => {
            // URLを生成
            const url = urljoin(Url.codeURI, 'ext');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(1);
            expect(response.body[0].id).toBe(3);
            expect(response.body[0].type).toBe('ext');
            expect(response.body[0].start_code).toBe(1000001);
            expect(response.body[0].end_code).toBe(10000000);
        });
        test('正常 前提：対象データなし', async () => {
            // URLを生成
            const url = urljoin(Url.codeURI, '99999');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(404);
            expect(response.body.message).toBe(Message.CODE_NOT_FOUND);
        });
        test('正常 前提：Cookie(個人メンバー)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 0);

            // URLを生成
            const url = urljoin(Url.codeURI, 'model');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_PERSONAL_KEY + '=81654181b851542feec3ee0ba3be7695f1472af4702f3aa2a6aa1971c5e3d645'])
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(1);
            expect(response.body[0].id).toBe(1);
            expect(response.body[0].type).toBe('model');
            expect(response.body[0].start_code).toBe(1);
            expect(response.body[0].end_code).toBe(10000);
        });
        test('正常 前提：Cookie(アプリケーションメンバー)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 1);

            // URLを生成
            const url = urljoin(Url.codeURI, 'model');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_APPLICATION_KEY + '=879777267f854aa3fb49993ca2d1488a7ef2ca5c743297ad6f4b155c88c12c16'])
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(1);
            expect(response.body[0].id).toBe(1);
            expect(response.body[0].type).toBe('model');
            expect(response.body[0].start_code).toBe(1);
            expect(response.body[0].end_code).toBe(10000);
        });
        test('正常 前提：Cookie(運営メンバー)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 3);

            // URLを生成
            const url = urljoin(Url.codeURI, 'model');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(1);
            expect(response.body[0].id).toBe(1);
            expect(response.body[0].type).toBe('model');
            expect(response.body[0].start_code).toBe(1);
            expect(response.body[0].end_code).toBe(10000);
        });
        test('異常 前提：Cookie(空)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 3);

            // URLを生成
            const url = urljoin(Url.codeURI, 'model');

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
            const url = Url.codeURI;

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
            const url = Url.codeURI;

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
            const url = Url.codeURI;

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
            const url = Url.codeURI;

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
        test('異常 前提：セッションなし モデル', async () => {
            // URLを生成
            const url = urljoin(Url.codeURI, 'model');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常 前提：セッションなし ビルトイン', async () => {
            // URLを生成
            const url = urljoin(Url.codeURI, 'built_in');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常 前提：セッションなし 拡張', async () => {
            // URLを生成
            const url = urljoin(Url.codeURI, 'ext');

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
     * カタログコード範囲更新
     */
    describe('カタログコード範囲更新', () => {
        test('異常 前提：未アクティベート', async () => {
            // アクティベート解除
            await common.executeSqlString(`
                DELETE FROM pxr_catalog.catalog
            `);

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

            // アクティベート
            await common.executeSqlFile('activate.sql');

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_ACTIVATE);
        });
        test('正常 前提：なし モデル', async () => {
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
            expect(response.status).toBe(200);
            expect(response.body.id).toBe(1);
            expect(response.body.type).toBe('model');
            expect(response.body.start_code).toBe(1);
            expect(response.body.end_code).toBe(10000);
        });
        test('正常 前提：なし ビルトイン', async () => {
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
            expect(response.status).toBe(200);
            expect(response.body.id).toBe(2);
            expect(response.body.type).toBe('built_in');
            expect(response.body.start_code).toBe(10001);
            expect(response.body.end_code).toBe(1000000);
        });
        test('正常 前提：なし 拡張', async () => {
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
            expect(response.status).toBe(200);
            expect(response.body.id).toBe(3);
            expect(response.body.type).toBe('ext');
            expect(response.body.start_code).toBe(1000001);
            expect(response.body.end_code).toBe(10000000);
        });
        test('正常 前提：Cookie(個人メンバー)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 0);

            // URLを生成
            const url = urljoin(Url.codeURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_PERSONAL_KEY + '=81654181b851542feec3ee0ba3be7695f1472af4702f3aa2a6aa1971c5e3d645'])
                .send({
                    type: 'model',
                    start_code: 1,
                    end_code: 10000
                });

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.id).toBe(1);
            expect(response.body.type).toBe('model');
            expect(response.body.start_code).toBe(1);
            expect(response.body.end_code).toBe(10000);
        });
        test('正常 前提：Cookie(アプリケーションメンバー)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 1);

            // URLを生成
            const url = urljoin(Url.codeURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_APPLICATION_KEY + '=879777267f854aa3fb49993ca2d1488a7ef2ca5c743297ad6f4b155c88c12c16'])
                .send({
                    type: 'model',
                    start_code: 1,
                    end_code: 10000
                });

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.id).toBe(1);
            expect(response.body.type).toBe('model');
            expect(response.body.start_code).toBe(1);
            expect(response.body.end_code).toBe(10000);
        });
        test('正常 前提：Cookie(運営メンバー)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 3);

            // URLを生成
            const url = urljoin(Url.codeURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send({
                    type: 'model',
                    start_code: 1,
                    end_code: 10000
                });

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.id).toBe(1);
            expect(response.body.type).toBe('model');
            expect(response.body.start_code).toBe(1);
            expect(response.body.end_code).toBe(10000);
        });
        test('異常 前提：Cookie(空)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 3);

            // URLを生成
            const url = urljoin(Url.codeURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set('Cookie', null)
                .send({
                    type: 'model',
                    start_code: 1,
                    end_code: 10000
                });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常 前提：Cookie、オペレータサービス接続失敗', async () => {
            // URLを生成
            const url = urljoin(Url.codeURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send({
                    type: 'model',
                    start_code: 1,
                    end_code: 10000
                });

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_OPERATOR);
        });
        test('異常 前提：Cookie、オペレータサービス応答204', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(204, 3);

            // URLを生成
            const url = urljoin(Url.codeURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send({
                    type: 'model',
                    start_code: 1,
                    end_code: 10000
                });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常 前提：Cookie、オペレータサービス応答400', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(400, 3);

            // URLを生成
            const url = urljoin(Url.codeURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send({
                    type: 'model',
                    start_code: 1,
                    end_code: 10000
                });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常 前提：Cookie、オペレータサービス応答500', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(500, 3);

            // URLを生成
            const url = urljoin(Url.codeURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send({
                    type: 'model',
                    start_code: 1,
                    end_code: 10000
                });

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_TAKE_SESSION);
        });
        test('異常 前提：セッションなし モデル', async () => {
            // URLを生成
            const url = urljoin(Url.codeURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .send({
                    type: 'model',
                    start_code: 1,
                    end_code: 10000
                });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常 前提：セッションなし ビルトイン', async () => {
            // URLを生成
            const url = urljoin(Url.codeURI, '2');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .send({
                    type: 'built_in',
                    start_code: 10001,
                    end_code: 1000000
                });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常 前提：セッションなし 拡張', async () => {
            // URLを生成
            const url = urljoin(Url.codeURI, '3');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .send({
                    type: 'ext',
                    start_code: 1000001,
                    end_code: 10000000
                });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常 前提：既に存在する範囲', async () => {
            // URLを生成
            const url = urljoin(Url.codeURI, '3');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    type: 'model',
                    start_code: 1,
                    end_code: 1000000
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.CODE_SCOPE_ALREADY);
        });
        test('パラメータ異常 前提：id未定義 モデル', async () => {
            // URLを生成
            const url = urljoin(Url.codeURI);

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
            expect(response.status).toBe(404);
        });
        test('パラメータ異常 前提：type未定義 モデル', async () => {
            // URLを生成
            const url = urljoin(Url.codeURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    start_code: 1,
                    end_code: 10000
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons).toBeDefined();
            expect(response.body.reasons.length).toBe(1);
            expect(response.body.reasons[0].property).toBe('type');
            expect(response.body.reasons[0].value).toBe(null);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常 前提：start_code未定義 モデル', async () => {
            // URLを生成
            const url = urljoin(Url.codeURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    type: 'model',
                    end_code: 10000
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons).toBeDefined();
            expect(response.body.reasons.length).toBe(1);
            expect(response.body.reasons[0].property).toBe('start_code');
            expect(response.body.reasons[0].value).toBe(null);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常 前提：end_code未定義 モデル', async () => {
            // URLを生成
            const url = urljoin(Url.codeURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    type: 'model',
                    start_code: 1
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons).toBeDefined();
            expect(response.body.reasons.length).toBe(1);
            expect(response.body.reasons[0].property).toBe('end_code');
            expect(response.body.reasons[0].value).toBe(null);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常 前提：id空文字 モデル', async () => {
            // URLを生成
            const url = urljoin(Url.codeURI, '');

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
            expect(response.status).toBe(404);
        });
        test('パラメータ異常 前提：type空文字 モデル', async () => {
            // URLを生成
            const url = urljoin(Url.codeURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    type: '',
                    start_code: 1,
                    end_code: 10000
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons).toBeDefined();
            expect(response.body.reasons.length).toBe(1);
            expect(response.body.reasons[0].property).toBe('type');
            expect(response.body.reasons[0].value).toBe(null);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNotEmpty);
        });
        test('パラメータ異常 前提：start_code空文字 モデル', async () => {
            // URLを生成
            const url = urljoin(Url.codeURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    type: 'model',
                    start_code: '',
                    end_code: 10000
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons).toBeDefined();
            expect(response.body.reasons.length).toBe(2);
            expect(response.body.reasons[0].property).toBe('start_code');
            expect(response.body.reasons[0].value).toBe(null);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
            expect(response.body.reasons[1].property).toBe('start_code');
            expect(response.body.reasons[1].value).toBe(null);
            expect(response.body.reasons[1].message).toBe(Message.validation.isNotEmpty);
        });
        test('パラメータ異常 前提：end_code空文字 モデル', async () => {
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
                    end_code: ''
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons).toBeDefined();
            expect(response.body.reasons.length).toBe(1);
            expect(response.body.reasons[0].property).toBe('end_code');
            expect(response.body.reasons[0].value).toBe(null);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
    });

    /**
     * カタログコード範囲削除
     */
    describe('カタログコード範囲削除', () => {
        test('異常 前提：未アクティベート', async () => {
            // アクティベート解除
            await common.executeSqlString(`
                DELETE FROM pxr_catalog.catalog
            `);

            // URLを生成
            const url = urljoin(Url.codeURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .delete(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // アクティベート
            await common.executeSqlFile('activate.sql');

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_ACTIVATE);
        });
        test('正常 前提：なし モデル', async () => {
            // URLを生成
            const url = urljoin(Url.codeURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .delete(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.id).toBe(1);
        });
        test('正常 前提：なし ビルトイン', async () => {
            // URLを生成
            const url = urljoin(Url.codeURI, '2');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .delete(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.id).toBe(2);
        });
        test('正常 前提：なし 拡張', async () => {
            // URLを生成
            const url = urljoin(Url.codeURI, '3');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .delete(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.id).toBe(3);
        });
        test('正常 前提：Cookie(個人メンバー)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 0);

            // URLを生成
            const url = urljoin(Url.codeURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .delete(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_PERSONAL_KEY + '=81654181b851542feec3ee0ba3be7695f1472af4702f3aa2a6aa1971c5e3d645'])
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.id).toBe(1);
        });
        test('正常 前提：Cookie(アプリケーションメンバー)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 1);

            // URLを生成
            const url = urljoin(Url.codeURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .delete(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_APPLICATION_KEY + '=879777267f854aa3fb49993ca2d1488a7ef2ca5c743297ad6f4b155c88c12c16'])
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.id).toBe(1);
        });
        test('正常 前提：Cookie(運営メンバー)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 3);

            // URLを生成
            const url = urljoin(Url.codeURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .delete(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.id).toBe(1);
        });
        test('異常 前提：Cookie(空)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 3);

            // URLを生成
            const url = urljoin(Url.codeURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .delete(url)
                .set({ accept: 'application/json' })
                .set('Cookie', null)
                .send();

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常 前提：Cookie、オペレータサービス接続失敗', async () => {
            // URLを生成
            const url = urljoin(Url.codeURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .delete(url)
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
            const url = urljoin(Url.codeURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .delete(url)
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
            const url = urljoin(Url.codeURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .delete(url)
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
            const url = urljoin(Url.codeURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .delete(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send();

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_TAKE_SESSION);
        });
        test('異常 前提：セッションなし モデル', async () => {
            // URLを生成
            const url = urljoin(Url.codeURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .delete(url)
                .set({ accept: 'application/json' })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常 前提：セッションなし ビルトイン', async () => {
            // URLを生成
            const url = urljoin(Url.codeURI, '2');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .delete(url)
                .set({ accept: 'application/json' })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常 前提：セッションなし 拡張', async () => {
            // URLを生成
            const url = urljoin(Url.codeURI, '3');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .delete(url)
                .set({ accept: 'application/json' })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('パラメータ異常 前提：id未定義', async () => {
            // URLを生成
            const url = urljoin(Url.codeURI);

            // 対象APIに送信
            const response = await supertest(expressApp)
                .delete(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(404);
        });
        test('パラメータ異常 前提：id空文字', async () => {
            // URLを生成
            const url = urljoin(Url.codeURI, '');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .delete(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(404);
        });
        test('パラメータ異常 前提：id文字列', async () => {
            // URLを生成
            const url = urljoin(Url.codeURI, 'XXXXX');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .delete(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons).toBeDefined();
            expect(response.body.reasons.length).toBe(1);
            expect(response.body.reasons[0].property).toBe('id');
            expect(response.body.reasons[0].value).toBe(null);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
    });
});
