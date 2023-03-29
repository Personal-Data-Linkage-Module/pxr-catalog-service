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
     * ネームスペース追加
     */
    describe('ネームスペース追加', () => {
        test('異常 前提：未アクティベート', async () => {
            // アクティベート解除
            await common.executeSqlString(`
                DELETE FROM pxr_catalog.catalog
            `);

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

            // アクティベート
            await common.executeSqlFile('activate.sql');

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_ACTIVATE);
        });
        test('正常 前提：なし モデル', async () => {
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
            expect(response.status).toBe(200);
            expect(response.body.id).toBe(1);
            expect(response.body.ns).toBe('catalog/model/test');
            expect(response.body.description).toBe('テストネームスペース(model)');
        });
        test('正常 前提：なし ビルトイン', async () => {
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
            expect(response.status).toBe(200);
            expect(response.body.id).toBe(2);
            expect(response.body.ns).toBe('catalog/built_in/test');
            expect(response.body.description).toBe('テストネームスペース(built_in)');
        });
        test('正常 前提：なし 拡張', async () => {
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
            expect(response.status).toBe(200);
            expect(response.body.id).toBe(3);
            expect(response.body.ns).toBe('catalog/ext/test');
            expect(response.body.description).toBe('テストネームスペース(ext)');
        });
        test('正常 前提：Cookie(個人メンバー)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 0);

            // URLを生成
            const url = Url.nsModelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_PERSONAL_KEY + '=81654181b851542feec3ee0ba3be7695f1472af4702f3aa2a6aa1971c5e3d645'])
                .send({
                    ns: 'catalog/model/test/cookie/personal',
                    description: 'テストネームスペース(model)'
                });

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.id).toBe(4);
            expect(response.body.ns).toBe('catalog/model/test/cookie/personal');
            expect(response.body.description).toBe('テストネームスペース(model)');
        });
        test('正常 前提：Cookie(アプリケーションメンバー)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 1);

            // URLを生成
            const url = Url.nsModelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_APPLICATION_KEY + '=879777267f854aa3fb49993ca2d1488a7ef2ca5c743297ad6f4b155c88c12c16'])
                .send({
                    ns: 'catalog/model/test/cookie/app',
                    description: 'テストネームスペース(model)'
                });

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.id).toBe(5);
            expect(response.body.ns).toBe('catalog/model/test/cookie/app');
            expect(response.body.description).toBe('テストネームスペース(model)');
        });
        test('正常 前提：Cookie(運営メンバー)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 3);

            // URLを生成
            const url = Url.nsModelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send({
                    ns: 'catalog/model/test/cookie/member',
                    description: 'テストネームスペース(model)'
                });

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.id).toBe(6); // この値は「ネームスペース追加」テストで登録されたときのシリアル値
            expect(response.body.ns).toBe('catalog/model/test/cookie/member');
            expect(response.body.description).toBe('テストネームスペース(model)');
        });
        test('異常 前提：登録済みデータ モデル', async () => {
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
            expect(response.status).toBe(409);
            expect(response.body.message).toBe(Message.NAMESPACE_ALREADY);
        });
        test('異常 前提：Cookie(空)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 3);

            // URLを生成
            const url = Url.nsModelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set('Cookie', null)
                .send({
                    ns: 'catalog/model/test',
                    description: 'テストネームスペース(model)'
                });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常 前提：Cookie、オペレータサービス接続失敗', async () => {
            // URLを生成
            const url = Url.nsModelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send({
                    ns: 'catalog/model/test',
                    description: 'テストネームスペース(model)'
                });

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_OPERATOR);
        });
        test('異常 前提：Cookie、オペレータサービス応答204', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(204, 3);

            // URLを生成
            const url = Url.nsModelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send({
                    ns: 'catalog/model/test',
                    description: 'テストネームスペース(model)'
                });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常 前提：Cookie、オペレータサービス応答400', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(400, 3);

            // URLを生成
            const url = Url.nsModelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send({
                    ns: 'catalog/model/test',
                    description: 'テストネームスペース(model)'
                });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常 前提：Cookie、オペレータサービス応答500', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(500, 3);

            // URLを生成
            const url = Url.nsModelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send({
                    ns: 'catalog/model/test',
                    description: 'テストネームスペース(model)'
                });

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_TAKE_SESSION);
        });
        test('異常 前提：セッションなし モデル', async () => {
            // URLを生成
            const url = Url.nsModelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .send({
                    ns: 'catalog/model/test',
                    description: 'テストネームスペース(モデル)'
                });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常 前提：セッションなし ビルトイン', async () => {
            // URLを生成
            const url = Url.nsBuiltInURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .send({
                    ns: 'catalog/built_in/test',
                    description: 'テストネームスペース(ビルトイン)'
                });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常 前提：セッションなし 拡張', async () => {
            // URLを生成
            const url = Url.nsExtURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .send({
                    ns: 'catalog/ext/test',
                    description: 'テストネームスペース(拡張)'
                });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常 前提：URL内のタイプと指定ns内のタイプが異なる モデル', async () => {
            // URLを生成
            const url = Url.nsModelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    ns: 'catalog/unit/test',
                    description: 'テストネームスペース(unit)'
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.INVALID_NS_TYPE);
        });
        test('異常 前提：URL内のタイプと指定ns内のタイプが異なる ビルトイン', async () => {
            // URLを生成
            const url = Url.nsBuiltInURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    ns: 'catalog/unit/test',
                    description: 'テストネームスペース(unit)'
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.INVALID_NS_TYPE);
        });
        test('異常 前提：URL内のタイプと指定ns内のタイプが異なる 拡張', async () => {
            // URLを生成
            const url = Url.nsExtURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    ns: 'catalog/unit/test',
                    description: 'テストネームスペース(unit)'
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.INVALID_NS_TYPE);
        });
        test('パラメータ異常 前提：ns未定義 モデル', async () => {
            // URLを生成
            const url = Url.nsModelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    description: 'テストネームスペース(model)'
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons).toBeDefined();
            expect(response.body.reasons.length).toBe(1);
            expect(response.body.reasons[0].property).toBe('ns');
            expect(response.body.reasons[0].value).toBe(null);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常 前提：description未定義 モデル', async () => {
            // URLを生成
            const url = Url.nsModelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    ns: 'catalog/model/test'
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons).toBeDefined();
            expect(response.body.reasons.length).toBe(1);
            expect(response.body.reasons[0].property).toBe('description');
            expect(response.body.reasons[0].value).toBe(null);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常 前提：ns空文字 モデル', async () => {
            // URLを生成
            const url = Url.nsModelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    ns: '',
                    description: 'テストネームスペース(model)'
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons).toBeDefined();
            expect(response.body.reasons.length).toBe(1);
            expect(response.body.reasons[0].property).toBe('ns');
            expect(response.body.reasons[0].value).toBe(null);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNotEmpty);
        });
        test('パラメータ異常 前提：description空文字 モデル', async () => {
            // URLを生成
            const url = Url.nsModelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    ns: 'catalog/model/test',
                    description: ''
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons).toBeDefined();
            expect(response.body.reasons.length).toBe(1);
            expect(response.body.reasons[0].property).toBe('description');
            expect(response.body.reasons[0].value).toBe(null);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNotEmpty);
        });
        test('パラメータ異常 前提：ns未定義 ビルトイン', async () => {
            // URLを生成
            const url = Url.nsBuiltInURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    description: 'テストネームスペース(built_in)'
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons).toBeDefined();
            expect(response.body.reasons.length).toBe(1);
            expect(response.body.reasons[0].property).toBe('ns');
            expect(response.body.reasons[0].value).toBe(null);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常 前提：description未定義 ビルトイン', async () => {
            // URLを生成
            const url = Url.nsBuiltInURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    ns: 'catalog/built_in/test'
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons).toBeDefined();
            expect(response.body.reasons.length).toBe(1);
            expect(response.body.reasons[0].property).toBe('description');
            expect(response.body.reasons[0].value).toBe(null);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常 前提：ns空文字 ビルトイン', async () => {
            // URLを生成
            const url = Url.nsBuiltInURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    ns: '',
                    description: 'テストネームスペース(built_in)'
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons).toBeDefined();
            expect(response.body.reasons.length).toBe(1);
            expect(response.body.reasons[0].property).toBe('ns');
            expect(response.body.reasons[0].value).toBe(null);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNotEmpty);
        });
        test('パラメータ異常 前提：description空文字 ビルトイン', async () => {
            // URLを生成
            const url = Url.nsBuiltInURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    ns: 'catalog/built_in/test',
                    description: ''
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons).toBeDefined();
            expect(response.body.reasons.length).toBe(1);
            expect(response.body.reasons[0].property).toBe('description');
            expect(response.body.reasons[0].value).toBe(null);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNotEmpty);
        });
        test('パラメータ異常 前提：ns未定義 拡張', async () => {
            // URLを生成
            const url = Url.nsExtURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    description: 'テストネームスペース(ext)'
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons).toBeDefined();
            expect(response.body.reasons.length).toBe(1);
            expect(response.body.reasons[0].property).toBe('ns');
            expect(response.body.reasons[0].value).toBe(null);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常 前提：description未定義 拡張', async () => {
            // URLを生成
            const url = Url.nsExtURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    ns: 'catalog/ext/test'
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons).toBeDefined();
            expect(response.body.reasons.length).toBe(1);
            expect(response.body.reasons[0].property).toBe('description');
            expect(response.body.reasons[0].value).toBe(null);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常 前提：ns空文字 拡張', async () => {
            // URLを生成
            const url = Url.nsExtURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    ns: '',
                    description: 'テストネームスペース(ext)'
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons).toBeDefined();
            expect(response.body.reasons.length).toBe(1);
            expect(response.body.reasons[0].property).toBe('ns');
            expect(response.body.reasons[0].value).toBe(null);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNotEmpty);
        });
        test('パラメータ異常 前提：description空文字 拡張', async () => {
            // URLを生成
            const url = Url.nsExtURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    ns: 'catalog/ext/test',
                    description: ''
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons).toBeDefined();
            expect(response.body.reasons.length).toBe(1);
            expect(response.body.reasons[0].property).toBe('description');
            expect(response.body.reasons[0].value).toBe(null);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNotEmpty);
        });
        test('正常 前提：descriptionオブジェクト', async () => {
            // URLを生成
            const url = Url.nsModelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    ns: 'catalog/model/test/description',
                    description: [
                        {
                            // 空オブジェクトが含まれる場合, nullが含まれる場合も同時にテスト
                        },
                        null,
                        {
                            key: 'title',
                            value: 'ユニットテストタイトル'
                        },
                        {
                            key: 'section',
                            value: [
                                {
                                    key: 'title',
                                    value: 'ユニットテストセクションタイトル１'
                                },
                                {
                                    key: 'content',
                                    value: [
                                        {
                                            key: 'sentence',
                                            value: 'ユニットテストの説明１'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            key: 'section',
                            value: [
                                {
                                    key: 'title',
                                    value: 'ユニットテストセクションタイトル２'
                                },
                                {
                                    key: 'content',
                                    value: [
                                        {
                                            key: 'sentence',
                                            value: 'ユニットテストの説明２'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            key: 'section',
                            value: [
                                {
                                    key: 'title',
                                    value: 'ユニットテストセクションタイトル３'
                                },
                                {
                                    key: 'content',
                                    value: [
                                        {
                                            key: 'sentence',
                                            value: 'ユニットテストの説明３'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                });

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.id).toBe(7); // この値は「ネームスペース追加」テストで登録されたときのシリアル値
            expect(response.body.ns).toBe('catalog/model/test/description');
            expect(response.body.description).toMatchObject({
                title: 'ユニットテストタイトル',
                section: [
                    {
                        title: 'ユニットテストセクションタイトル１',
                        content: {
                            sentence: 'ユニットテストの説明１'
                        }
                    },
                    {
                        title: 'ユニットテストセクションタイトル２',
                        content: {
                            sentence: 'ユニットテストの説明２'
                        }
                    },
                    {
                        title: 'ユニットテストセクションタイトル３',
                        content: {
                            sentence: 'ユニットテストの説明３'
                        }
                    }
                ]
            });
        });
    });

    /**
     * ネームスペース取得
     */
    describe('ネームスペース取得', () => {
        test('異常 前提：未アクティベート', async () => {
            // アクティベート解除
            await common.executeSqlString(`
                DELETE FROM pxr_catalog.catalog
            `);

            // URLを生成
            const url = urljoin(Url.nsURI, '?ns=catalog/model/test');

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
            const url = urljoin(Url.nsURI, '?ns=catalog/model/test');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(5); // この値は「ネームスペース追加」テストで登録された個数
            expect(response.body[0].id).toBe(1); // この値は「ネームスペース追加」テストで登録されたときのシリアル値
            expect(response.body[0].ns).toBe('catalog/model/test');
            expect(response.body[0].description).toBe('テストネームスペース(model)');
        });
        test('正常 前提：なし ビルトイン', async () => {
            // URLを生成
            const url = urljoin(Url.nsURI, '?ns=catalog/built_in/test');

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
            expect(response.body[0].ns).toBe('catalog/built_in/test');
            expect(response.body[0].description).toBe('テストネームスペース(built_in)');
        });
        test('正常 前提：なし 拡張', async () => {
            // URLを生成
            const url = urljoin(Url.nsURI, '?ns=catalog/ext/test');

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
            expect(response.body[0].ns).toBe('catalog/ext/test');
            expect(response.body[0].description).toBe('テストネームスペース(ext)');
        });
        test('正常 前提：対象データなし', async () => {
            // URLを生成
            const url = urljoin(Url.nsURI, '?ns=XXXXX');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(404);
            expect(response.body.message).toBe(Message.NAMESPACE_NOT_FOUND);
        });
        test('正常 前提：Cookie(個人メンバー)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 0);

            // URLを生成
            const url = urljoin(Url.nsURI, '?ns=catalog/model/test');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_PERSONAL_KEY + '=81654181b851542feec3ee0ba3be7695f1472af4702f3aa2a6aa1971c5e3d645'])
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(5); // この値は「ネームスペース追加」テストで登録された個数
            expect(response.body[0].id).toBe(1); // この値は「ネームスペース追加」テストで登録されたときのシリアル値
            expect(response.body[0].ns).toBe('catalog/model/test');
            expect(response.body[0].description).toBe('テストネームスペース(model)');
            expect(response.body[1].id).toBe(4); // body[index]は「ネームスペース追加」テストの実行順に依存
            expect(response.body[1].ns).toBe('catalog/model/test/cookie/personal');
            expect(response.body[1].description).toBe('テストネームスペース(model)');
            expect(response.body[2].id).toBe(5);
            expect(response.body[2].ns).toBe('catalog/model/test/cookie/app');
            expect(response.body[2].description).toBe('テストネームスペース(model)');
            expect(response.body[3].id).toBe(6);
            expect(response.body[3].ns).toBe('catalog/model/test/cookie/member');
            expect(response.body[3].description).toBe('テストネームスペース(model)');
        });
        test('正常 前提：Cookie(アプリケーションメンバー)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 1);

            // URLを生成
            const url = urljoin(Url.nsURI, '?ns=catalog/model/test');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_APPLICATION_KEY + '=879777267f854aa3fb49993ca2d1488a7ef2ca5c743297ad6f4b155c88c12c16'])
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(5); // この値は「ネームスペース追加」テストで登録された個数
            expect(response.body[0].id).toBe(1); // この値は「ネームスペース追加」テストで登録されたときのシリアル値
            expect(response.body[0].ns).toBe('catalog/model/test');
            expect(response.body[0].description).toBe('テストネームスペース(model)');
            expect(response.body[1].id).toBe(4); // body[index]は「ネームスペース追加」テストの実行順に依存
            expect(response.body[1].ns).toBe('catalog/model/test/cookie/personal');
            expect(response.body[1].description).toBe('テストネームスペース(model)');
            expect(response.body[2].id).toBe(5);
            expect(response.body[2].ns).toBe('catalog/model/test/cookie/app');
            expect(response.body[2].description).toBe('テストネームスペース(model)');
            expect(response.body[3].id).toBe(6); // この値は「ネームスペース追加」テストで登録されたときのシリアル値
            expect(response.body[3].ns).toBe('catalog/model/test/cookie/member');
            expect(response.body[3].description).toBe('テストネームスペース(model)');
        });
        test('正常 前提：Cookie(運営メンバー)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 3);

            // URLを生成
            const url = urljoin(Url.nsURI, '?ns=catalog/model/test');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(5); // この値は「ネームスペース追加」テストで登録された個数
            expect(response.body[0].id).toBe(1); // この値は「ネームスペース追加」テストで登録されたときのシリアル値
            expect(response.body[0].ns).toBe('catalog/model/test');
            expect(response.body[0].description).toBe('テストネームスペース(model)');
            expect(response.body[1].id).toBe(4);
            expect(response.body[1].ns).toBe('catalog/model/test/cookie/personal');
            expect(response.body[1].description).toBe('テストネームスペース(model)');
            expect(response.body[2].id).toBe(5);
            expect(response.body[2].ns).toBe('catalog/model/test/cookie/app');
            expect(response.body[2].description).toBe('テストネームスペース(model)');
            expect(response.body[3].id).toBe(6);
            expect(response.body[3].ns).toBe('catalog/model/test/cookie/member');
            expect(response.body[3].description).toBe('テストネームスペース(model)');
        });
        test('異常 前提：Cookie(空)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 3);

            // URLを生成
            const url = urljoin(Url.nsURI, '?ns=catalog/model/test');

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
            const url = urljoin(Url.nsURI, '?ns=catalog/model/test');

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
            const url = urljoin(Url.nsURI, '?ns=catalog/model/test');

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
            const url = urljoin(Url.nsURI, '?ns=catalog/model/test');

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
            const url = urljoin(Url.nsURI, '?ns=catalog/model/test');

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
            const url = urljoin(Url.nsURI, '?ns=catalog/model/test');

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
            const url = urljoin(Url.nsURI, '?ns=catalog/built_in/test');

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
            const url = urljoin(Url.nsURI, '?ns=catalog/ext/test');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('パラメータ異常 前提：ns未定義', async () => {
            // URLを生成
            const url = urljoin(Url.nsURI, '?');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons).toBeDefined();
            expect(response.body.reasons.length).toBe(1);
            expect(response.body.reasons[0].property).toBe('ns');
            expect(response.body.reasons[0].value).toBe(null);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常 前提：ns空文字', async () => {
            // URLを生成
            const url = urljoin(Url.nsURI, '?ns=');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons).toBeDefined();
            expect(response.body.reasons.length).toBe(1);
            expect(response.body.reasons[0].property).toBe('ns');
            expect(response.body.reasons[0].value).toBe(null);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNotEmpty);
        });
        test('正常 前提：descriptionオブジェクト', async () => {
            // URLを生成
            const url = urljoin(Url.nsURI, '?ns=catalog/model/test/description');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(1);
            expect(response.body[0].id).toBe(7); // この値は「ネームスペース追加」テストで登録されたときのシリアル値
            expect(response.body[0].ns).toBe('catalog/model/test/description');
            expect(response.body[0].description).toMatchObject({
                title: 'ユニットテストタイトル',
                section: [
                    {
                        title: 'ユニットテストセクションタイトル１',
                        content: {
                            sentence: 'ユニットテストの説明１'
                        }
                    },
                    {
                        title: 'ユニットテストセクションタイトル２',
                        content: {
                            sentence: 'ユニットテストの説明２'
                        }
                    },
                    {
                        title: 'ユニットテストセクションタイトル３',
                        content: {
                            sentence: 'ユニットテストの説明３'
                        }
                    }
                ]
            });
        });
    });

    /**
     * ネームスペース取得(:nsId)
     */
    describe('ネームスペース取得(:nsId)', () => {
        test('異常 前提：未アクティベート', async () => {
            // アクティベート解除
            await common.executeSqlString(`
                DELETE FROM pxr_catalog.catalog
            `);

            // URLを生成
            const url = urljoin(Url.nsURI, '1');

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
            const url = urljoin(Url.nsURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.id).toBe(1);
            expect(response.body.ns).toBe('catalog/model/test');
            expect(response.body.description).toBe('テストネームスペース(model)');
        });
        test('正常 前提：なし ビルトイン', async () => {
            // URLを生成
            const url = urljoin(Url.nsURI, '2');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.id).toBe(2);
            expect(response.body.ns).toBe('catalog/built_in/test');
            expect(response.body.description).toBe('テストネームスペース(built_in)');
        });
        test('正常 前提：なし 拡張', async () => {
            // URLを生成
            const url = urljoin(Url.nsURI, '3');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.id).toBe(3);
            expect(response.body.ns).toBe('catalog/ext/test');
            expect(response.body.description).toBe('テストネームスペース(ext)');
        });
        test('正常 前提：対象データなし', async () => {
            // URLを生成
            const url = urljoin(Url.nsURI, '99999');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(404);
            expect(response.body.message).toBe(Message.NAMESPACE_NOT_FOUND);
        });
        test('正常 前提：Cookie(個人メンバー)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 0);

            // URLを生成
            const url = urljoin(Url.nsURI, '4');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_PERSONAL_KEY + '=81654181b851542feec3ee0ba3be7695f1472af4702f3aa2a6aa1971c5e3d645'])
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.id).toBe(4);
            expect(response.body.ns).toBe('catalog/model/test/cookie/personal');
            expect(response.body.description).toBe('テストネームスペース(model)');
        });
        test('正常 前提：Cookie(アプリケーションメンバー)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 1);

            // URLを生成
            const url = urljoin(Url.nsURI, '5');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_APPLICATION_KEY + '=879777267f854aa3fb49993ca2d1488a7ef2ca5c743297ad6f4b155c88c12c16'])
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.id).toBe(5);
            expect(response.body.ns).toBe('catalog/model/test/cookie/app');
            expect(response.body.description).toBe('テストネームスペース(model)');
        });
        test('正常 前提：Cookie(運営メンバー)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 3);

            // URLを生成
            const url = urljoin(Url.nsURI, '6'); // この値は「ネームスペース追加」テストで登録されたときのシリアル値

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.id).toBe(6); // この値は「ネームスペース追加」テストで登録されたときのシリアル値
            expect(response.body.ns).toBe('catalog/model/test/cookie/member');
            expect(response.body.description).toBe('テストネームスペース(model)');
        });
        test('異常 前提：Cookie(空)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 3);

            // URLを生成
            const url = urljoin(Url.nsURI, '7');

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
            const url = urljoin(Url.nsURI, '7');

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
            const url = urljoin(Url.nsURI, '7');

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
            const url = urljoin(Url.nsURI, '7');

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
            const url = urljoin(Url.nsURI, '7');

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
            const url = urljoin(Url.nsURI, '1');

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
            const url = urljoin(Url.nsURI, '2');

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
            const url = urljoin(Url.nsURI, '3');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('パラメータ異常 前提：nsId文字列', async () => {
            // URLを生成
            const url = urljoin(Url.nsURI, 'XXXXX');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons).toBeDefined();
            expect(response.body.reasons.length).toBe(1);
            expect(response.body.reasons[0].property).toBe('nsId');
            expect(response.body.reasons[0].value).toBe(null);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('正常 前提：descriptionオブジェクト', async () => {
            // URLを生成
            const url = urljoin(Url.nsURI, '7'); // この値は「ネームスペース追加」テストで登録されたときのシリアル値

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.id).toBe(7); // この値は「ネームスペース追加」テストで登録されたときのシリアル値
            expect(response.body.ns).toBe('catalog/model/test/description');
            expect(response.body.description).toMatchObject({
                title: 'ユニットテストタイトル',
                section: [
                    {
                        title: 'ユニットテストセクションタイトル１',
                        content: {
                            sentence: 'ユニットテストの説明１'
                        }
                    },
                    {
                        title: 'ユニットテストセクションタイトル２',
                        content: {
                            sentence: 'ユニットテストの説明２'
                        }
                    },
                    {
                        title: 'ユニットテストセクションタイトル３',
                        content: {
                            sentence: 'ユニットテストの説明３'
                        }
                    }
                ]
            });
        });
    });

    /**
     * ネームスペース更新
     */
    describe('ネームスペース更新', () => {
        test('異常 前提：未アクティベート', async () => {
            // アクティベート解除
            await common.executeSqlString(`
                DELETE FROM pxr_catalog.catalog
            `);

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

            // アクティベート
            await common.executeSqlFile('activate.sql');

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_ACTIVATE);
        });
        test('正常 前提：なし モデル', async () => {
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
            expect(response.status).toBe(200);
            expect(response.body.id).toBe(1);
            expect(response.body.ns).toBe('catalog/model/test');
            expect(response.body.description).toBe('テストネームスペース(model)');
        });
        test('正常 前提：なし ビルトイン', async () => {
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
            expect(response.status).toBe(200);
            expect(response.body.id).toBe(2);
            expect(response.body.ns).toBe('catalog/built_in/test');
            expect(response.body.description).toBe('テストネームスペース(built_in)');
        });
        test('正常 前提：なし 拡張', async () => {
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
            expect(response.status).toBe(200);
            expect(response.body.id).toBe(3);
            expect(response.body.ns).toBe('catalog/ext/test');
            expect(response.body.description).toBe('テストネームスペース(ext)');
        });
        test('正常 前提：Cookie(個人メンバー)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 1);

            // URLを生成
            const url = urljoin(Url.nsModelURI, '4');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_PERSONAL_KEY + '=81654181b851542feec3ee0ba3be7695f1472af4702f3aa2a6aa1971c5e3d645'])
                .send({
                    ns: 'catalog/model/test',
                    description: 'テストネームスペース(model)'
                });

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.id).toBe(4);
            expect(response.body.ns).toBe('catalog/model/test');
            expect(response.body.description).toBe('テストネームスペース(model)');
        });
        test('正常 前提：Cookie(アプリケーションメンバー)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 1);

            // URLを生成
            const url = urljoin(Url.nsModelURI, '5');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_APPLICATION_KEY + '=879777267f854aa3fb49993ca2d1488a7ef2ca5c743297ad6f4b155c88c12c16'])
                .send({
                    ns: 'catalog/model/test',
                    description: 'テストネームスペース(model)'
                });

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.id).toBe(5);
            expect(response.body.ns).toBe('catalog/model/test');
            expect(response.body.description).toBe('テストネームスペース(model)');
        });
        test('正常 前提：Cookie(運営メンバー)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 3);

            // URLを生成
            const url = urljoin(Url.nsModelURI, '7');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send({
                    ns: 'catalog/model/test',
                    description: 'テストネームスペース(model)'
                });

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.id).toBe(7);
            expect(response.body.ns).toBe('catalog/model/test');
            expect(response.body.description).toBe('テストネームスペース(model)');
        });
        test('異常 前提：Cookie(空)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 3);

            // URLを生成
            const url = urljoin(Url.nsModelURI, '7');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set('Cookie', null)
                .send({
                    ns: 'catalog/model/test',
                    description: 'テストネームスペース(model)'
                });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常 前提：Cookie、オペレータサービス接続失敗', async () => {
            // URLを生成
            const url = urljoin(Url.nsModelURI, '7');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send({
                    ns: 'catalog/model/test',
                    description: 'テストネームスペース(model)'
                });

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_OPERATOR);
        });
        test('異常 前提：Cookie、オペレータサービス応答204', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(204, 3);

            // URLを生成
            const url = urljoin(Url.nsModelURI, '7');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send({
                    ns: 'catalog/model/test',
                    description: 'テストネームスペース(model)'
                });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常 前提：Cookie、オペレータサービス応答400', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(400, 3);

            // URLを生成
            const url = urljoin(Url.nsModelURI, '7');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send({
                    ns: 'catalog/model/test',
                    description: 'テストネームスペース(model)'
                });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常 前提：Cookie、オペレータサービス応答500', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(500, 3);

            // URLを生成
            const url = urljoin(Url.nsModelURI, '7');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send({
                    ns: 'catalog/model/test',
                    description: 'テストネームスペース(model)'
                });

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_TAKE_SESSION);
        });
        test('異常 前提：セッションなし モデル', async () => {
            // URLを生成
            const url = urljoin(Url.nsModelURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .send({
                    ns: 'catalog/model/test',
                    description: 'テストネームスペース(モデル)'
                });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常 前提：セッションなし ビルトイン', async () => {
            // URLを生成
            const url = urljoin(Url.nsBuiltInURI, '2');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .send({
                    ns: 'catalog/built_in/test',
                    description: 'テストネームスペース(ビルトイン)'
                });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常 前提：セッションなし 拡張', async () => {
            // URLを生成
            const url = urljoin(Url.nsExtURI, '3');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .send({
                    ns: 'catalog/ext/test',
                    description: 'テストネームスペース(拡張)'
                });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常 前提：URL内のタイプと指定ns内のタイプが異なる モデル', async () => {
            // URLを生成
            const url = urljoin(Url.nsModelURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    ns: 'catalog/unit/test',
                    description: 'テストネームスペース(unit)'
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.INVALID_NS_TYPE);
        });
        test('異常 前提：URL内のタイプと指定ns内のタイプが異なる ビルトイン', async () => {
            // URLを生成
            const url = urljoin(Url.nsBuiltInURI, '2');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    ns: 'catalog/unit/test',
                    description: 'テストネームスペース(unit)'
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.INVALID_NS_TYPE);
        });
        test('異常 前提：URL内のタイプと指定ns内のタイプが異なる 拡張', async () => {
            // URLを生成
            const url = urljoin(Url.nsExtURI, '3');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    ns: 'catalog/unit/test',
                    description: 'テストネームスペース(unit)'
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.INVALID_NS_TYPE);
        });
        test('パラメータ異常 前提：nsId未定義 モデル', async () => {
            // URLを生成
            const url = urljoin(Url.nsModelURI);

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    description: 'テストネームスペース(model)'
                });

            // レスポンスチェック
            expect(response.status).toBe(404);
        });
        test('パラメータ異常 前提：ns未定義 モデル', async () => {
            // URLを生成
            const url = urljoin(Url.nsModelURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    description: 'テストネームスペース(model)'
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons).toBeDefined();
            expect(response.body.reasons.length).toBe(1);
            expect(response.body.reasons[0].property).toBe('ns');
            expect(response.body.reasons[0].value).toBe(null);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常 前提：description未定義 モデル', async () => {
            // URLを生成
            const url = urljoin(Url.nsModelURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    ns: 'catalog/model/test'
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons).toBeDefined();
            expect(response.body.reasons.length).toBe(1);
            expect(response.body.reasons[0].property).toBe('description');
            expect(response.body.reasons[0].value).toBe(null);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常 前提：nsId空文字 モデル', async () => {
            // URLを生成
            const url = urljoin(Url.nsModelURI, '');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    description: 'テストネームスペース(model)'
                });

            // レスポンスチェック
            expect(response.status).toBe(404);
        });
        test('パラメータ異常 前提：ns空文字 モデル', async () => {
            // URLを生成
            const url = urljoin(Url.nsModelURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    ns: '',
                    description: 'テストネームスペース(model)'
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons).toBeDefined();
            expect(response.body.reasons.length).toBe(1);
            expect(response.body.reasons[0].property).toBe('ns');
            expect(response.body.reasons[0].value).toBe(null);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNotEmpty);
        });
        test('パラメータ異常 前提：description空文字 モデル', async () => {
            // URLを生成
            const url = urljoin(Url.nsModelURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    ns: 'catalog/model/test',
                    description: ''
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons).toBeDefined();
            expect(response.body.reasons.length).toBe(1);
            expect(response.body.reasons[0].property).toBe('description');
            expect(response.body.reasons[0].value).toBe(null);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNotEmpty);
        });
        test('パラメータ異常 前提：nsId未定義 ビルトイン', async () => {
            // URLを生成
            const url = urljoin(Url.nsBuiltInURI);

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    description: 'テストネームスペース(built_in)'
                });

            // レスポンスチェック
            expect(response.status).toBe(404);
        });
        test('パラメータ異常 前提：ns未定義 ビルトイン', async () => {
            // URLを生成
            const url = urljoin(Url.nsBuiltInURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    description: 'テストネームスペース(built_in)'
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons).toBeDefined();
            expect(response.body.reasons.length).toBe(1);
            expect(response.body.reasons[0].property).toBe('ns');
            expect(response.body.reasons[0].value).toBe(null);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常 前提：description未定義 ビルトイン', async () => {
            // URLを生成
            const url = urljoin(Url.nsBuiltInURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    ns: 'catalog/built_in/test'
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons).toBeDefined();
            expect(response.body.reasons.length).toBe(1);
            expect(response.body.reasons[0].property).toBe('description');
            expect(response.body.reasons[0].value).toBe(null);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常 前提：nsId空文字 ビルトイン', async () => {
            // URLを生成
            const url = urljoin(Url.nsBuiltInURI, '');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    description: 'テストネームスペース(built_in)'
                });

            // レスポンスチェック
            expect(response.status).toBe(404);
        });
        test('パラメータ異常 前提：ns空文字 ビルトイン', async () => {
            // URLを生成
            const url = urljoin(Url.nsBuiltInURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    ns: '',
                    description: 'テストネームスペース(built_in)'
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons).toBeDefined();
            expect(response.body.reasons.length).toBe(1);
            expect(response.body.reasons[0].property).toBe('ns');
            expect(response.body.reasons[0].value).toBe(null);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNotEmpty);
        });
        test('パラメータ異常 前提：description空文字 ビルトイン', async () => {
            // URLを生成
            const url = urljoin(Url.nsBuiltInURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    ns: 'catalog/built_in/test',
                    description: ''
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons).toBeDefined();
            expect(response.body.reasons.length).toBe(1);
            expect(response.body.reasons[0].property).toBe('description');
            expect(response.body.reasons[0].value).toBe(null);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNotEmpty);
        });
        test('パラメータ異常 前提：nsId未定義 拡張', async () => {
            // URLを生成
            const url = urljoin(Url.nsExtURI);

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    description: 'テストネームスペース(ext)'
                });

            // レスポンスチェック
            expect(response.status).toBe(404);
        });
        test('パラメータ異常 前提：ns未定義 拡張', async () => {
            // URLを生成
            const url = urljoin(Url.nsExtURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    description: 'テストネームスペース(ext)'
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons).toBeDefined();
            expect(response.body.reasons.length).toBe(1);
            expect(response.body.reasons[0].property).toBe('ns');
            expect(response.body.reasons[0].value).toBe(null);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常 前提：description未定義 拡張', async () => {
            // URLを生成
            const url = urljoin(Url.nsExtURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    ns: 'catalog/ext/test'
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons).toBeDefined();
            expect(response.body.reasons.length).toBe(1);
            expect(response.body.reasons[0].property).toBe('description');
            expect(response.body.reasons[0].value).toBe(null);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常 前提：nsId空文字 拡張', async () => {
            // URLを生成
            const url = urljoin(Url.nsExtURI, '');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    description: 'テストネームスペース(ext)'
                });

            // レスポンスチェック
            expect(response.status).toBe(404);
        });
        test('パラメータ異常 前提：ns空文字 拡張', async () => {
            // URLを生成
            const url = urljoin(Url.nsExtURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    ns: '',
                    description: 'テストネームスペース(ext)'
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons).toBeDefined();
            expect(response.body.reasons.length).toBe(1);
            expect(response.body.reasons[0].property).toBe('ns');
            expect(response.body.reasons[0].value).toBe(null);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNotEmpty);
        });
        test('パラメータ異常 前提：description空文字 拡張', async () => {
            // URLを生成
            const url = urljoin(Url.nsExtURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    ns: 'catalog/ext/test',
                    description: ''
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons).toBeDefined();
            expect(response.body.reasons.length).toBe(1);
            expect(response.body.reasons[0].property).toBe('description');
            expect(response.body.reasons[0].value).toBe(null);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNotEmpty);
        });
        test('正常 前提：descriptionオブジェクト', async () => {
            // URLを生成
            const url = urljoin(Url.nsModelURI, '8');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    ns: 'catalog/model/test/description',
                    description: [
                        {
                            // 空オブジェクトが含まれる場合, nullが含まれる場合も同時にテスト
                        },
                        null,
                        {
                            key: 'title',
                            value: 'ユニットテストタイトル'
                        },
                        {
                            key: 'section',
                            value: [
                                {
                                    key: 'title',
                                    value: 'ユニットテストセクションタイトル１'
                                },
                                {
                                    key: 'content',
                                    value: [
                                        {
                                            key: 'sentence',
                                            value: 'ユニットテストの説明１'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            key: 'section',
                            value: [
                                {
                                    key: 'title',
                                    value: 'ユニットテストセクションタイトル２'
                                },
                                {
                                    key: 'content',
                                    value: [
                                        {
                                            key: 'sentence',
                                            value: 'ユニットテストの説明２'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            key: 'section',
                            value: [
                                {
                                    key: 'title',
                                    value: 'ユニットテストセクションタイトル３'
                                },
                                {
                                    key: 'content',
                                    value: [
                                        {
                                            key: 'sentence',
                                            value: 'ユニットテストの説明３'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                });

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.id).toBe(8);
            expect(response.body.ns).toBe('catalog/model/test/description');
            expect(response.body.description).toMatchObject({
                title: 'ユニットテストタイトル',
                section: [
                    {
                        title: 'ユニットテストセクションタイトル１',
                        content: {
                            sentence: 'ユニットテストの説明１'
                        }
                    },
                    {
                        title: 'ユニットテストセクションタイトル２',
                        content: {
                            sentence: 'ユニットテストの説明２'
                        }
                    },
                    {
                        title: 'ユニットテストセクションタイトル３',
                        content: {
                            sentence: 'ユニットテストの説明３'
                        }
                    }
                ]
            }
            );
        });
    });

    /**
     * ネームスペース削除
     */
    describe('ネームスペース削除', () => {
        test('異常 前提：未アクティベート', async () => {
            // アクティベート解除
            await common.executeSqlString(`
                DELETE FROM pxr_catalog.catalog
            `);

            // URLを生成
            const url = urljoin(Url.nsModelURI, '1');

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
            const url = urljoin(Url.nsModelURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .delete(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.nsId).toBe(1);
        });
        test('正常 前提：なし ビルトイン', async () => {
            // URLを生成
            const url = urljoin(Url.nsBuiltInURI, '2');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .delete(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.nsId).toBe(2);
        });
        test('正常 前提：なし 拡張', async () => {
            // URLを生成
            const url = urljoin(Url.nsExtURI, '3');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .delete(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.nsId).toBe(3);
        });
        test('正常 前提：Cookie(個人メンバー)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 0);

            // URLを生成
            const url = urljoin(Url.nsModelURI, '4');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .delete(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_PERSONAL_KEY + '=81654181b851542feec3ee0ba3be7695f1472af4702f3aa2a6aa1971c5e3d645'])
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.nsId).toBe(4);
        });
        test('正常 前提：Cookie(アプリケーションメンバー)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 1);

            // URLを生成
            const url = urljoin(Url.nsModelURI, '5');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .delete(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_APPLICATION_KEY + '=879777267f854aa3fb49993ca2d1488a7ef2ca5c743297ad6f4b155c88c12c16'])
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.nsId).toBe(5);
        });
        test('正常 前提：Cookie(運営メンバー)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 3);

            // URLを生成
            const url = urljoin(Url.nsModelURI, '7');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .delete(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.nsId).toBe(7);
        });
        test('異常 削除対象NSを使用しているカタログがある', async () => {
            // テストデータ準備
            await common.executeSqlString(`
                INSERT INTO pxr_catalog.catalog_item
                (
                    id, code, version, ns_id, name, description,
                    inherit_code, inherit_version, is_reserved, is_disabled,
                    response,
                    attributes,
                    created_by, created_at, updated_by, updated_at
                ) VALUES 
                (
                    101, 46, 1, 8, 'アクター', 'ユニットテスト用(model)',
                    NULL, NULL, False, False,
                    '{"catalogItem":{"ns":"catalog/model/unit-test","name":"アクター","_code":{"_value":46,"_ver":1},"inherit":null,"description":"ユニットテスト用(model)"},"template":{"_code":{"_value":46,"_ver":1},"information-site":null,"region-alliance":null,"share":null,"store":null},"prop":null,"attribute":null}',
                    NULL,
                    'catalog_registrant', '2021/11/10 11:30:01.087', 'catalog_registrant', '2021/11/10 11:30:01.087'
                )
            `);
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 3);

            // URLを生成
            const url = urljoin(Url.nsModelURI, '8');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .delete(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send();

            // レスポンスチェック
            expect(response.status).toBe(409);
            expect(response.body.message).toBe(Message.NAMESPACE_USED);
        });
        test('異常 前提：Cookie(空)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 3);

            // URLを生成
            const url = urljoin(Url.nsModelURI, '7');

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
            const url = urljoin(Url.nsModelURI, '7');

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
            const url = urljoin(Url.nsModelURI, '7');

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
            const url = urljoin(Url.nsModelURI, '7');

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
            const url = urljoin(Url.nsModelURI, '7');

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
            const url = urljoin(Url.nsModelURI, '1');

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
            const url = urljoin(Url.nsBuiltInURI, '2');

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
            const url = urljoin(Url.nsExtURI, '3');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .delete(url)
                .set({ accept: 'application/json' })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('パラメータ異常 前提：nsId未定義', async () => {
            // URLを生成
            const url = urljoin(Url.nsModelURI);

            // 対象APIに送信
            const response = await supertest(expressApp)
                .delete(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(404);
        });
        test('パラメータ異常 前提：nsId空文字', async () => {
            // URLを生成
            const url = urljoin(Url.nsModelURI, '');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .delete(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(404);
        });
    });
});
