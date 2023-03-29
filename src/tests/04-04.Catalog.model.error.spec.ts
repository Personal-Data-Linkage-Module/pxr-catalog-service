/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import * as supertest from 'supertest';
import { Application } from '../resources/config/Application';
import Common, { Url } from './Common';
import { Session } from './Session';
import { CatalogModelRequest } from './CatalogModelRequest';
import StubOperatorServer from './StubOperatorServer';
import OperatorDomain from '../domains/OperatorDomain';
import { CatalogModelResponse } from './CatalogModelResponse';
import { CatalogModelUpdateRequest } from './CatalogModelUpdateRequest';
import { CatalogModelUpdateResponse } from './CatalogModelUpdateResponse';
import { CatalogModelErrorRequest } from './CatalogModelErrorRequest';
import { CatalogModelErrorResponse } from './CatalogModelErrorResponse';
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
        // スタブサーバー停止
        if (operatorServer) {
            operatorServer._server.close();
            operatorServer._server = null;
            operatorServer = null;
        }
    });

    /**
     * カタログ追加
     */
    describe('カタログ追加', () => {
        test('異常 前提：モデル、未アクティベート', async () => {
            // アクティベート解除
            await common.executeSqlString(`
                DELETE FROM pxr_catalog.catalog
            `);

            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.minimum);

            // アクティベート
            await common.executeSqlFile('activate.sql');

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_ACTIVATE);
        });
        test('正常 前提：Cookie(個人メンバー)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 0);

            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_PERSONAL_KEY + '=81654181b851542feec3ee0ba3be7695f1472af4702f3aa2a6aa1971c5e3d645'])
                .send(CatalogModelRequest.minimum);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.minimum);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.minimum));
        });
        test('正常 前提：Cookie(アプリケーションメンバー)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 1);

            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_APPLICATION_KEY + '=879777267f854aa3fb49993ca2d1488a7ef2ca5c743297ad6f4b155c88c12c16'])
                .send(CatalogModelRequest.minimumCode);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.minimumCode);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.minimumCode));
        });
        test('正常 前提：Cookie(運営メンバー)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 3);

            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send(CatalogModelRequest.templatePropertyNumber);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyNumber);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyNumber));
        });
        test('異常 前提：Cookie(空)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 3);

            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set('Cookie', null)
                .send(CatalogModelRequest.minimum);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常 前提：Cookie、オペレータサービス接続失敗', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send(CatalogModelRequest.minimum);

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_OPERATOR);
        });
        test('異常 前提：Cookie、オペレータサービス応答204', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(204, 3);

            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send(CatalogModelRequest.minimum);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常 前提：Cookie、オペレータサービス応答400', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(400, 3);

            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send(CatalogModelRequest.minimum);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常 前提：Cookie、オペレータサービス応答500', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(500, 3);

            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send(CatalogModelRequest.minimum);

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_TAKE_SESSION);
        });
        test('異常 前提：セッションなし', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .send(CatalogModelRequest.minimum);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常 前提：モデル、対象ネームスペースが存在しない', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelErrorRequest.notFoundNamespace);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.NAMESPACE_NOT_FOUND);
        });
        test('異常 前提：モデル、対象コードが存在する', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.templatePropertyNumber);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.CODE_ALREADY);
        });
        test('異常 前提：モデル、継承カタログが存在しない', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelErrorRequest.notFoundInheritCatalog);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelErrorResponse.notFoundInheritCatalog);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelErrorResponse.notFoundInheritCatalog));
        });
        test('異常 前提：モデル、プロパティのみ存在しない', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelErrorRequest.templateNoProp);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelErrorResponse.templateNoProp);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelErrorResponse.templateNoProp));
        });
        test('異常 前提：モデル、存在しないカタログコード(format, unit)', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelErrorRequest.notFoundCatalogFormatUnit);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelErrorResponse.notFoundCatalogFormatUnit);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelErrorResponse.notFoundCatalogFormatUnit));
        });
        test('異常 前提：モデル、存在しないカタログコード(_code)', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelErrorRequest.notFoundCatalogCode);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelErrorResponse.notFoundCatalogCode);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelErrorResponse.notFoundCatalogCode));
        });
        test('異常 前提：モデル、対象ネームスペースが存在しない(candidate-ns)', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelErrorRequest.candidateNotFoundNamespace);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.NAMESPACE_NOT_FOUND);
        });
        test('異常 前提：モデル、プロパティのないカタログを継承', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelErrorRequest.inheritNotTemplate);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelErrorResponse.inheritNotTemplate);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelErrorResponse.inheritNotTemplate));
        });
        test('異常 前提：モデル、内部クラスの参照先がコードオブジェクト', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelErrorRequest.innerCode);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelErrorResponse.innerCode);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelErrorResponse.innerCode));
        });
        test('異常 前提：モデル、存在しない型', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelErrorRequest.notFoundType);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelErrorResponse.notFoundType);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelErrorResponse.notFoundType));
        });
        test('異常 前提：モデル、対象のプロパティが存在しない', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelErrorRequest.notFoundPropery);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelErrorResponse.notFoundPropery);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelErrorResponse.notFoundPropery));
        });
    });

    /**
     * カタログ取得
     */
    describe('カタログ取得', () => {
        test('異常 前提：モデル、未アクティベート', async () => {
            // アクティベート解除
            await common.executeSqlString(`
                DELETE FROM pxr_catalog.catalog
            `);

            // URLを生成
            const url = urljoin(Url.baseURI, '?ns=catalog/model/unit-test');

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
        test('正常 前提：Cookie(個人メンバー)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 0);

            // URLを生成
            const url = urljoin(Url.baseURI, '?ns=catalog/model/unit-test');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_PERSONAL_KEY + '=81654181b851542feec3ee0ba3be7695f1472af4702f3aa2a6aa1971c5e3d645'])
                .send();

            // レスポンスチェック
            let index: number = 0;
            expect(response.status).toBe(200);
            expect(response.body[index]).toMatchObject(CatalogModelResponse.minimum);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogModelResponse.minimum));
            index++;
            expect(response.body[index]).toMatchObject(CatalogModelResponse.minimumCode);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogModelResponse.minimumCode));
            index++;
            expect(response.body[index]).toMatchObject(CatalogModelResponse.templatePropertyNumber);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogModelResponse.templatePropertyNumber));
            index++;
        });
        test('正常 前提：Cookie(アプリケーションメンバー)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 1);

            // URLを生成
            const url = urljoin(Url.baseURI, '?ns=catalog/model/unit-test');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_APPLICATION_KEY + '=879777267f854aa3fb49993ca2d1488a7ef2ca5c743297ad6f4b155c88c12c16'])
                .send();

            // レスポンスチェック
            let index: number = 0;
            expect(response.status).toBe(200);
            expect(response.body[index]).toMatchObject(CatalogModelResponse.minimum);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogModelResponse.minimum));
            index++;
            expect(response.body[index]).toMatchObject(CatalogModelResponse.minimumCode);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogModelResponse.minimumCode));
            index++;
            expect(response.body[index]).toMatchObject(CatalogModelResponse.templatePropertyNumber);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogModelResponse.templatePropertyNumber));
            index++;
        });
        test('正常 前提：Cookie(運営メンバー)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 3);

            // URLを生成
            const url = urljoin(Url.baseURI, '?ns=catalog/model/unit-test');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send();

            // レスポンスチェック
            let index: number = 0;
            expect(response.status).toBe(200);
            expect(response.body[index]).toMatchObject(CatalogModelResponse.minimum);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogModelResponse.minimum));
            index++;
            expect(response.body[index]).toMatchObject(CatalogModelResponse.minimumCode);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogModelResponse.minimumCode));
            index++;
            expect(response.body[index]).toMatchObject(CatalogModelResponse.templatePropertyNumber);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogModelResponse.templatePropertyNumber));
            index++;
        });
        test('異常 前提：Cookie(空)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 3);

            // URLを生成
            const url = urljoin(Url.baseURI, '?ns=catalog/model/unit-test');

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
            const url = urljoin(Url.baseURI, '?ns=catalog/model/unit-test');

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
            const url = urljoin(Url.baseURI, '?ns=catalog/model/unit-test');

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
            const url = urljoin(Url.baseURI, '?ns=catalog/model/unit-test');

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
            const url = urljoin(Url.baseURI, '?ns=catalog/model/unit-test');

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
            const url = urljoin(Url.baseURI, '?ns=catalog/model/unit-test');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常 前提：モデル、対象コードが存在しない', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '?ns=catalog/model/not-found/unit-test');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(404);
            expect(response.body.message).toBe(Message.CATALOG_NOT_FOUND);
        });
    });

    /**
     * カタログ取得(/:code)
     */
    describe('カタログ取得(/:code)', () => {
        test('異常 前提：モデル、未アクティベート', async () => {
            // アクティベート解除
            await common.executeSqlString(`
                DELETE FROM pxr_catalog.catalog
            `);

            // URLを生成
            const url = urljoin(Url.baseURI, '1');

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
        test('正常 前提：Cookie(個人メンバー)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 0);

            // URLを生成
            const url = urljoin(Url.baseURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_PERSONAL_KEY + '=81654181b851542feec3ee0ba3be7695f1472af4702f3aa2a6aa1971c5e3d645'])
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.minimum);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.minimum));
        });
        test('正常 前提：Cookie(アプリケーションメンバー)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 1);

            // URLを生成
            const url = urljoin(Url.baseURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_APPLICATION_KEY + '=879777267f854aa3fb49993ca2d1488a7ef2ca5c743297ad6f4b155c88c12c16'])
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.minimum);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.minimum));
        });
        test('正常 前提：Cookie(運営メンバー)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 3);

            // URLを生成
            const url = urljoin(Url.baseURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.minimum);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.minimum));
        });
        test('異常 前提：Cookie(空)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 3);

            // URLを生成
            const url = urljoin(Url.baseURI, '1');

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
            const url = urljoin(Url.baseURI, '1');

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
            const url = urljoin(Url.baseURI, '1');

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
            const url = urljoin(Url.baseURI, '1');

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
            const url = urljoin(Url.baseURI, '1');

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
            const url = urljoin(Url.baseURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常 前提：モデル、対象コードが存在しない', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '99999');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(404);
            expect(response.body.message).toBe(Message.CATALOG_NOT_FOUND);
        });
    });

    /**
     * カタログ取得(/:code/:ver)
     */
    describe('カタログ取得(/:code/:ver)', () => {
        test('異常 前提：モデル、未アクティベート', async () => {
            // アクティベート解除
            await common.executeSqlString(`
                DELETE FROM pxr_catalog.catalog
            `);

            // URLを生成
            const url = urljoin(Url.baseURI, '1', '1');

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
        test('正常 前提：Cookie(個人メンバー)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 0);

            // URLを生成
            const url = urljoin(Url.baseURI, '1', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_PERSONAL_KEY + '=81654181b851542feec3ee0ba3be7695f1472af4702f3aa2a6aa1971c5e3d645'])
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.minimum);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.minimum));
        });
        test('正常 前提：Cookie(アプリケーションメンバー)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 1);

            // URLを生成
            const url = urljoin(Url.baseURI, '1', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_APPLICATION_KEY + '=879777267f854aa3fb49993ca2d1488a7ef2ca5c743297ad6f4b155c88c12c16'])
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.minimum);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.minimum));
        });
        test('正常 前提：Cookie(運営メンバー)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 3);

            // URLを生成
            const url = urljoin(Url.baseURI, '1', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.minimum);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.minimum));
        });
        test('異常 前提：Cookie(空)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 3);

            // URLを生成
            const url = urljoin(Url.baseURI, '1', '1');

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
            const url = urljoin(Url.baseURI, '1', '1');

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
            const url = urljoin(Url.baseURI, '1', '1');

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
            const url = urljoin(Url.baseURI, '1', '1');

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
            const url = urljoin(Url.baseURI, '1', '1');

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
            const url = urljoin(Url.baseURI, '1', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常 前提：モデル、対象コードが存在しない', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '99999', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(404);
            expect(response.body.message).toBe(Message.CATALOG_NOT_FOUND);
        });
    });

    /**
     * カタログ取得(複数code)
     */
    describe('カタログ取得(複数code)', () => {
        test('異常 前提：モデル、未アクティベート', async () => {
            // アクティベート解除
            await common.executeSqlString(`
                DELETE FROM pxr_catalog.catalog
            `);

            // URLを生成
            const url = urljoin(Url.baseURI);

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send([
                    {
                        _code: {
                            _value: 1,
                            _ver: 1
                        }
                    }
                ]);

            // アクティベート
            await common.executeSqlFile('activate.sql');

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_ACTIVATE);
        });
        test('正常 前提：Cookie(個人メンバー)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 0);

            // URLを生成
            const url = urljoin(Url.baseURI);

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_PERSONAL_KEY + '=81654181b851542feec3ee0ba3be7695f1472af4702f3aa2a6aa1971c5e3d645'])
                .send([
                    {
                        _code: {
                            _value: 1,
                            _ver: 1
                        }
                    }
                ]);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject([CatalogModelResponse.minimum]);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify([CatalogModelResponse.minimum]));
        });
        test('正常 前提：Cookie(アプリケーションメンバー)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 1);

            // URLを生成
            const url = urljoin(Url.baseURI);

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_APPLICATION_KEY + '=879777267f854aa3fb49993ca2d1488a7ef2ca5c743297ad6f4b155c88c12c16'])
                .send([
                    {
                        _code: {
                            _value: 1,
                            _ver: 1
                        }
                    }
                ]);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject([CatalogModelResponse.minimum]);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify([CatalogModelResponse.minimum]));
        });
        test('正常 前提：Cookie(運営メンバー)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 3);

            // URLを生成
            const url = urljoin(Url.baseURI);

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send([
                    {
                        _code: {
                            _value: 1,
                            _ver: 1
                        }
                    }
                ]);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject([CatalogModelResponse.minimum]);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify([CatalogModelResponse.minimum]));
        });
        test('異常 前提：Cookie(空)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 3);

            // URLを生成
            const url = urljoin(Url.baseURI);

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set('Cookie', null)
                .send([
                    {
                        _code: {
                            _value: 1,
                            _ver: 1
                        }
                    }
                ]);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常 前提：Cookie、オペレータサービス接続失敗', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI);

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send([
                    {
                        _code: {
                            _value: 1,
                            _ver: 1
                        }
                    }
                ]);

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_OPERATOR);
        });
        test('異常 前提：Cookie、オペレータサービス応答204', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(204, 3);

            // URLを生成
            const url = urljoin(Url.baseURI);

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send([
                    {
                        _code: {
                            _value: 1,
                            _ver: 1
                        }
                    }
                ]);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常 前提：Cookie、オペレータサービス応答400', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(400, 3);

            // URLを生成
            const url = urljoin(Url.baseURI);

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send([
                    {
                        _code: {
                            _value: 1,
                            _ver: 1
                        }
                    }
                ]);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常 前提：Cookie、オペレータサービス応答500', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(500, 3);

            // URLを生成
            const url = urljoin(Url.baseURI);

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send([
                    {
                        _code: {
                            _value: 1,
                            _ver: 1
                        }
                    }
                ]);

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_TAKE_SESSION);
        });
        test('異常 前提：セッションなし', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI);

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .send([
                    {
                        _code: {
                            _value: 1,
                            _ver: 1
                        }
                    }
                ]);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常 前提：モデル、対象コードが存在しない', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI);

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send([
                    {
                        _code: {
                            _value: 99999,
                            _ver: 1
                        }
                    }
                ]);

            // レスポンスチェック
            expect(response.status).toBe(404);
            expect(response.body.message).toBe(Message.CATALOG_NOT_FOUND);
        });
    });

    /**
     * カタログ更新
     */
    describe('カタログ更新', () => {
        test('異常 前提：モデル、未アクティベート', async () => {
            // アクティベート解除
            await common.executeSqlString(`
                DELETE FROM pxr_catalog.catalog
            `);

            // URLを生成
            const url = urljoin(Url.modelURI, '1', '?versionUpFlag=false');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.minimumCode);

            // アクティベート
            await common.executeSqlFile('activate.sql');

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_ACTIVATE);
        });
        test('正常 前提：Cookie(個人メンバー)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 0);

            // URLを生成
            const url = urljoin(Url.modelURI, '1', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_PERSONAL_KEY + '=81654181b851542feec3ee0ba3be7695f1472af4702f3aa2a6aa1971c5e3d645'])
                .send(CatalogModelUpdateRequest.minimum);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelUpdateResponse.minimum);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelUpdateResponse.minimum));
        });
        test('正常 前提：Cookie(アプリケーションメンバー)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 1);

            // URLを生成
            const url = urljoin(Url.modelURI, '1', '?versionUpFlag=false');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_APPLICATION_KEY + '=879777267f854aa3fb49993ca2d1488a7ef2ca5c743297ad6f4b155c88c12c16'])
                .send(CatalogModelUpdateRequest.minimum);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelUpdateResponse.minimum);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelUpdateResponse.minimum));
        });
        test('正常 前提：Cookie(運営メンバー)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 3);

            // URLを生成
            const url = urljoin(Url.modelURI, '1', '?versionUpFlag=false');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send(CatalogModelUpdateRequest.minimum);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelUpdateResponse.minimum);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelUpdateResponse.minimum));
        });
        test('異常 前提：Cookie(空)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 3);

            // URLを生成
            const url = urljoin(Url.modelURI, '1', '?versionUpFlag=false');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set('Cookie', null)
                .send(CatalogModelUpdateRequest.minimum);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常 前提：Cookie、オペレータサービス接続失敗', async () => {
            // URLを生成
            const url = urljoin(Url.modelURI, '1', '?versionUpFlag=false');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send(CatalogModelUpdateRequest.minimum);

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_OPERATOR);
        });
        test('異常 前提：Cookie、オペレータサービス応答204', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(204, 3);

            // URLを生成
            const url = urljoin(Url.modelURI, '1', '?versionUpFlag=false');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send(CatalogModelUpdateRequest.minimum);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常 前提：Cookie、オペレータサービス応答400', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(400, 3);

            // URLを生成
            const url = urljoin(Url.modelURI, '1', '?versionUpFlag=false');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send(CatalogModelUpdateRequest.minimum);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常 前提：Cookie、オペレータサービス応答500', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(500, 3);

            // URLを生成
            const url = urljoin(Url.modelURI, '1', '?versionUpFlag=false');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send(CatalogModelUpdateRequest.minimum);

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_TAKE_SESSION);
        });
        test('異常 前提：セッションなし', async () => {
            // URLを生成
            const url = urljoin(Url.modelURI, '1', '?versionUpFlag=false');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .send(CatalogModelUpdateRequest.minimum);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常 前提：モデル、対象ネームスペースが存在しない', async () => {
            // URLを生成
            const url = urljoin(Url.modelURI, '1', '?versionUpFlag=false');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelErrorRequest.notFoundNamespace);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.NAMESPACE_NOT_FOUND);
        });
        test('異常 前提：モデル、対象コードが存在しない', async () => {
            // URLを生成
            const url = urljoin(Url.modelURI, '99999', '?versionUpFlag=false');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.minimum);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.CATALOG_NOT_FOUND);
        });
    });

    /**
     * カタログ削除
     */
    describe('カタログ削除', () => {
        test('異常 前提：モデル、未アクティベート', async () => {
            // アクティベート解除
            await common.executeSqlString(`
                DELETE FROM pxr_catalog.catalog
            `);

            // URLを生成
            const url = urljoin(Url.modelURI, '1');

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
        test('正常 前提：Cookie(個人メンバー)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 0);

            // URLを生成
            const url = urljoin(Url.modelURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .delete(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_PERSONAL_KEY + '=81654181b851542feec3ee0ba3be7695f1472af4702f3aa2a6aa1971c5e3d645'])
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.code).toBe(1);
        });
        test('正常 前提：Cookie(アプリケーションメンバー)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 1);

            // URLを生成
            const url = urljoin(Url.modelURI, '2');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .delete(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_APPLICATION_KEY + '=879777267f854aa3fb49993ca2d1488a7ef2ca5c743297ad6f4b155c88c12c16'])
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.code).toBe(2);
        });
        test('正常 前提：Cookie(運営メンバー)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 3);

            // URLを生成
            const url = urljoin(Url.modelURI, '11');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .delete(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.code).toBe(11);
        });
        test('異常 前提：Cookie(空)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 3);

            // URLを生成
            const url = urljoin(Url.modelURI, '1');

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
            const url = urljoin(Url.modelURI, '1');

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
            const url = urljoin(Url.modelURI, '1');

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
            const url = urljoin(Url.modelURI, '1');

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
            const url = urljoin(Url.modelURI, '1');

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
        test('異常 前提：セッションなし', async () => {
            // URLを生成
            const url = urljoin(Url.modelURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .delete(url)
                .set({ accept: 'application/json' })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常 前提：モデル、対象コードが存在しない', async () => {
            // URLを生成
            const url = urljoin(Url.modelURI, '99999');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .delete(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.CATALOG_NOT_FOUND);
        });
    });
});
