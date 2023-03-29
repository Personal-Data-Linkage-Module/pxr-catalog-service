/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import * as supertest from 'supertest';
import { sprintf } from 'sprintf-js';
import { Application } from '../resources/config/Application';
import Common, { Url } from './Common';
import { Session } from './Session';
import Config from '../common/Config';
import StubOperatorServer from './StubOperatorServer';
import OperatorDomain from '../domains/OperatorDomain';
import { UpdateSetResponse } from './UpdateSetResponse';
import { UpdateSetRequest } from './UpdateSetRequest';
import moment = require('moment-timezone');
import urljoin = require('url-join');
const config = Config.ReadConfig('./config/config.json');
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
     * 変更セット登録
     */
    const updateSetIdList: number[] = [];
    let errorIndex: number = 0;
    describe('変更セット登録', () => {
        test('異常 前提：未アクティベート', async () => {
            // アクティベート解除
            await common.executeSqlFile('initialData.sql');
            await common.executeSqlFile('catalogCodeScope.sql');
            await common.executeSqlFile('nameSpace.sql');
            await common.executeSqlString(`
                DELETE FROM pxr_catalog.catalog
            `);

            // URLを生成
            const url = Url.updateSetRegisterURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(UpdateSetRequest.addErrorlist[errorIndex]);

            // アクティベート
            await common.executeSqlFile('activate.sql');

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_ACTIVATE);
            errorIndex++;
        });
        test('正常 前提：Cookie(空)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 0);

            // URLを生成
            const url = Url.updateSetRegisterURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set('Cookie', null)
                .send(UpdateSetRequest.addErrorlist[errorIndex]);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
            errorIndex++;
        });
        test('異常 前提：Cookie、オペレータサービス接続失敗', async () => {
            // URLを生成
            const url = Url.updateSetRegisterURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send(UpdateSetRequest.addErrorlist[errorIndex]);

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_OPERATOR);
            errorIndex++;
        });
        test('異常 前提：Cookie、オペレータサービス応答204', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(204, 3);

            // URLを生成
            const url = Url.updateSetRegisterURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send(UpdateSetRequest.addErrorlist[errorIndex]);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
            errorIndex++;
        });
        test('異常 前提：Cookie、オペレータサービス応答400', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(400, 3);

            // URLを生成
            const url = Url.updateSetRegisterURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send(UpdateSetRequest.addErrorlist[errorIndex]);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
            errorIndex++;
        });
        test('異常 前提：Cookie、オペレータサービス応答500', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(500, 3);

            // URLを生成
            const url = Url.updateSetRegisterURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send(UpdateSetRequest.addErrorlist[errorIndex]);

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_TAKE_SESSION);
            errorIndex++;
        });
        test('異常 前提：セッションなし', async () => {
            // URLを生成
            const url = Url.updateSetRegisterURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .send(UpdateSetRequest.addErrorlist[errorIndex]);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
            errorIndex++;
        });
        test('パラメータ異常 前提：name 未定義', async () => {
            // URLを生成
            const url = Url.updateSetRegisterURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(UpdateSetRequest.addErrorlist[errorIndex]);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons.length).toBe(1);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
            errorIndex++;
        });
        test('パラメータ異常 前提：description 未定義', async () => {
            // URLを生成
            const url = Url.updateSetRegisterURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(UpdateSetRequest.addErrorlist[errorIndex]);

            // レスポンスを生成
            const responseJson = response.body;
            const registAt: string = response.body.registAt;
            responseJson['registAt'] = null;

            // レスポンス期待値を生成
            const responseExpect = UpdateSetResponse.addErrorlist[errorIndex];
            responseExpect['registAt'] = null;

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(responseJson).toMatchObject(responseExpect);
            expect(JSON.stringify(responseJson)).toBe(JSON.stringify(responseExpect));
            const dateRegistAt = new Date(registAt);
            const strRegistAt = moment(dateRegistAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strRegistAt).toBe(registAt);
            updateSetIdList.push(response.body.id);
            errorIndex++;
        });
        test('パラメータ異常 前提：ns 未定義', async () => {
            // URLを生成
            const url = Url.updateSetRegisterURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(UpdateSetRequest.addErrorlist[errorIndex]);

            // レスポンスを生成
            const responseJson = response.body;
            const registAt: string = response.body.registAt;
            responseJson['registAt'] = null;

            // レスポンス期待値を生成
            const responseExpect = UpdateSetResponse.addErrorlist[errorIndex];
            responseExpect['registAt'] = null;

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(responseJson).toMatchObject(responseExpect);
            expect(JSON.stringify(responseJson)).toBe(JSON.stringify(responseExpect));
            const dateRegistAt = new Date(registAt);
            const strRegistAt = moment(dateRegistAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strRegistAt).toBe(registAt);
            updateSetIdList.push(response.body.id);
            errorIndex++;
        });
        test('パラメータ異常 前提：catalog 未定義', async () => {
            // URLを生成
            const url = Url.updateSetRegisterURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(UpdateSetRequest.addErrorlist[errorIndex]);

            // レスポンスを生成
            const responseJson = response.body;
            const registAt: string = response.body.registAt;
            responseJson['registAt'] = null;

            // レスポンス期待値を生成
            const responseExpect = UpdateSetResponse.addErrorlist[errorIndex];
            responseExpect['registAt'] = null;

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(responseJson).toMatchObject(responseExpect);
            expect(JSON.stringify(responseJson)).toBe(JSON.stringify(responseExpect));
            const dateRegistAt = new Date(registAt);
            const strRegistAt = moment(dateRegistAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strRegistAt).toBe(registAt);
            updateSetIdList.push(response.body.id);
            errorIndex++;
        });
        test('パラメータ異常 前提：name null', async () => {
            // URLを生成
            const url = Url.updateSetRegisterURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(UpdateSetRequest.addErrorlist[errorIndex]);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons.length).toBe(1);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
            errorIndex++;
        });
        test('パラメータ異常 前提：description null', async () => {
            // URLを生成
            const url = Url.updateSetRegisterURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(UpdateSetRequest.addErrorlist[errorIndex]);

            // レスポンスを生成
            const responseJson = response.body;
            const registAt: string = response.body.registAt;
            responseJson['registAt'] = null;

            // レスポンス期待値を生成
            const responseExpect = UpdateSetResponse.addErrorlist[errorIndex];
            responseExpect['registAt'] = null;

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(responseJson).toMatchObject(responseExpect);
            expect(JSON.stringify(responseJson)).toBe(JSON.stringify(responseExpect));
            const dateRegistAt = new Date(registAt);
            const strRegistAt = moment(dateRegistAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strRegistAt).toBe(registAt);
            updateSetIdList.push(response.body.id);
            errorIndex++;
        });
        test('パラメータ異常 前提：ns null', async () => {
            // URLを生成
            const url = Url.updateSetRegisterURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(UpdateSetRequest.addErrorlist[errorIndex]);

            // レスポンスを生成
            const responseJson = response.body;
            const registAt: string = response.body.registAt;
            responseJson['registAt'] = null;

            // レスポンス期待値を生成
            const responseExpect = UpdateSetResponse.addErrorlist[errorIndex];
            responseExpect['registAt'] = null;

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(responseJson).toMatchObject(responseExpect);
            expect(JSON.stringify(responseJson)).toBe(JSON.stringify(responseExpect));
            const dateRegistAt = new Date(registAt);
            const strRegistAt = moment(dateRegistAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strRegistAt).toBe(registAt);
            updateSetIdList.push(response.body.id);
            errorIndex++;
        });
        test('パラメータ異常 前提：catalog null', async () => {
            // URLを生成
            const url = Url.updateSetRegisterURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(UpdateSetRequest.addErrorlist[errorIndex]);

            // レスポンスを生成
            const responseJson = response.body;
            const registAt: string = response.body.registAt;
            responseJson['registAt'] = null;

            // レスポンス期待値を生成
            const responseExpect = UpdateSetResponse.addErrorlist[errorIndex];
            responseExpect['registAt'] = null;

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(responseJson).toMatchObject(responseExpect);
            expect(JSON.stringify(responseJson)).toBe(JSON.stringify(responseExpect));
            const dateRegistAt = new Date(registAt);
            const strRegistAt = moment(dateRegistAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strRegistAt).toBe(registAt);
            updateSetIdList.push(response.body.id);
            errorIndex++;
        });
        test('パラメータ異常 前提：name 文字列以外', async () => {
            // URLを生成
            const url = Url.updateSetRegisterURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(UpdateSetRequest.addErrorlist[errorIndex]);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons.length).toBe(1);
            expect(response.body.reasons[0].message).toBe(Message.validation.isString);
            errorIndex++;
        });
        test('パラメータ異常 description 文字列以外', async () => {
            // URLを生成
            const url = Url.updateSetRegisterURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(UpdateSetRequest.addErrorlist[errorIndex]);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons.length).toBe(1);
            expect(response.body.reasons[0].message).toBe(Message.validation.isString);
            errorIndex++;
        });
        test('パラメータ異常 ns 配列以外', async () => {
            // URLを生成
            const url = Url.updateSetRegisterURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(UpdateSetRequest.addErrorlist[errorIndex]);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons.length).toBe(1);
            expect(response.body.reasons[0].message).toBe(Message.validation.isArray);
            errorIndex++;
        });
        test('パラメータ異常 catalog 配列以外', async () => {
            // URLを生成
            const url = Url.updateSetRegisterURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(UpdateSetRequest.addErrorlist[errorIndex]);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons.length).toBe(1);
            expect(response.body.reasons[0].message).toBe(Message.validation.isArray);
            errorIndex++;
        });
        test('パラメータ異常 ns 更新時にnsId指定なし', async () => {
            // URLを生成
            const url = Url.updateSetRegisterURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(UpdateSetRequest.addErrorlist[errorIndex]);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.NOT_NS_ID);
            errorIndex++;
        });
        test('パラメータ異常 catalog 更新時にcatalogId指定なし', async () => {
            // URLを生成
            const url = Url.updateSetRegisterURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(UpdateSetRequest.addErrorlist[errorIndex]);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.NOT_CODE);
            errorIndex++;
        });
        test('パラメータ異常 ns 削除時にnsId指定なし', async () => {
            // URLを生成
            const url = Url.updateSetRegisterURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(UpdateSetRequest.addErrorlist[errorIndex]);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.NOT_NS_ID);
            errorIndex++;
        });
        test('パラメータ異常 catalog 削除時にcatalogId指定なし', async () => {
            // URLを生成
            const url = Url.updateSetRegisterURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(UpdateSetRequest.addErrorlist[errorIndex]);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.NOT_CODE);
            errorIndex++;
        });
        test('パラメータ異常 ns 追加時にtemplate指定なし', async () => {
            // URLを生成
            const url = Url.updateSetRegisterURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(UpdateSetRequest.addErrorlist[errorIndex]);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.NOT_TEMPLATE);
            errorIndex++;
        });
        test('パラメータ異常 catalog 追加時にtemplate指定なし', async () => {
            // URLを生成
            const url = Url.updateSetRegisterURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(UpdateSetRequest.addErrorlist[errorIndex]);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.NOT_TEMPLATE);
            errorIndex++;
        });
        test('パラメータ異常 ns 更新時にtemplate指定なし', async () => {
            // URLを生成
            const url = Url.updateSetRegisterURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(UpdateSetRequest.addErrorlist[errorIndex]);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.NOT_TEMPLATE);
            errorIndex++;
        });
        test('パラメータ異常 catalog 更新時にtemplate指定なし', async () => {
            // URLを生成
            const url = Url.updateSetRegisterURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(UpdateSetRequest.addErrorlist[errorIndex]);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.NOT_TEMPLATE);
            errorIndex++;
        });
        test('パラメータ異常 attribute 配列以外', async () => {
            // URLを生成
            const url = Url.updateSetRegisterURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(UpdateSetRequest.addErrorlist[errorIndex]);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons.length).toBe(1);
            expect(response.body.reasons[0].message).toBe(Message.validation.isArray);
            errorIndex++;
        });
        test('パラメータ異常 attribute 追加時にattribute指定なし', async () => {
            // URLを生成
            const url = Url.updateSetRegisterURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(UpdateSetRequest.addErrorlist[errorIndex]);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.NOT_ATTRIBUTE);
            errorIndex++;
        });
        test('パラメータ異常 attribute 更新時にattribute指定なし', async () => {
            // URLを生成
            const url = Url.updateSetRegisterURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(UpdateSetRequest.addErrorlist[errorIndex]);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.NOT_ATTRIBUTE);
            errorIndex++;
        });
    });

    /**
     * 変更セット登録変更
     */
    describe('変更セット登録変更', () => {
        test('異常 前提：未アクティベート', async () => {
            // インデックスを初期化
            errorIndex = 0;

            // アクティベート解除
            await common.executeSqlString(`
                DELETE FROM pxr_catalog.catalog
            `);

            // URLを生成
            const url = urljoin(Url.updateSetRegisterURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(UpdateSetRequest.addErrorlist[errorIndex]);

            // アクティベート
            await common.executeSqlFile('activate.sql');

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_ACTIVATE);
            errorIndex++;
        });
        test('異常 前提：対象データなし', async () => {
            // URLを生成
            const url = urljoin(Url.updateSetRegisterURI, '999');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(UpdateSetRequest.addErrorlist[errorIndex]);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.NOT_EXISTS_TARGET);
            errorIndex++;
        });
        test('異常 前提：登録アクター不一致', async () => {
            // 変更セット準備
            await common.executeSqlString(`
                INSERT INTO pxr_catalog.update_set
                (
                    id, name, description, type, caller_actor_code, caller_actor_version, 
                    status, 
                    register_actor_code, register, regist_at, 
                    is_disabled, created_by, created_at, updated_by, updated_at
                ) VALUES
                (
                    7, 'ns', '登録アクター不一致', 1, 1000111, 1,
                    0,
                    1000111, 'loginid', NOW(),
                    false, 'loginid', NOW(), 'loginid', NOW()
                );
            `);
            // URLを生成
            const url = urljoin(Url.updateSetRegisterURI, '7');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    name: 'nsError',
                    description: '登録アクター不一致',
                    type: 0,
                    ns: [
                        {
                            type: 1,
                            nsId: null,
                            comment: null,
                            template: {
                                ns: 'catalog/model/unit',
                                description: 'ユニットテストネームスペース'
                            }
                        }
                    ],
                    catalog: null,
                    appendix: null
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.NOT_EXISTS_TARGET);
        });
    });

    /**
     * 変更セット情報取得
     */
    describe('変更セット情報取得', () => {
        test('異常 前提：未アクティベート', async () => {
            // アクティベート解除
            await common.executeSqlFile('initialData.sql');
            await common.executeSqlFile('catalogCodeScope.sql');
            await common.executeSqlFile('nameSpace.sql');
            await common.executeSqlString(`
                DELETE FROM pxr_catalog.catalog
            `);

            // URLを生成
            const url = urljoin(Url.updateSetSearchInfoURI, '1');

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
        test('異常 前提：対象データなし', async () => {
            // URLを生成
            const url = urljoin(Url.updateSetSearchInfoURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(404);
            expect(response.body.message).toBe(Message.NOT_EXISTS_TARGET);
        });
    });

    /**
     * 未承認変更セットリスト取得
     */
    describe('未承認変更セットリスト取得', () => {
        test('異常 前提：未アクティベート', async () => {
            // アクティベート解除
            await common.executeSqlFile('initialData.sql');
            await common.executeSqlFile('catalogCodeScope.sql');
            await common.executeSqlFile('nameSpace.sql');
            await common.executeSqlString(`
                DELETE FROM pxr_catalog.catalog
            `);

            // URLを生成
            const url = Url.updateSetSearchRequestURI;

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
        test('異常 前提：対象データなし', async () => {
            // URLを生成
            const url = Url.updateSetSearchRequestURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(404);
            expect(response.body.message).toBe(Message.NOT_EXISTS_TARGET);
        });
    });

    /**
     * 承認済変更セットリスト取得
     */
    describe('承認済変更セットリスト取得', () => {
        test('異常 前提：未アクティベート', async () => {
            // アクティベート解除
            await common.executeSqlFile('initialData.sql');
            await common.executeSqlFile('catalogCodeScope.sql');
            await common.executeSqlFile('nameSpace.sql');
            await common.executeSqlString(`
                DELETE FROM pxr_catalog.catalog
            `);

            // URLを生成
            const url = Url.updateSetSearchApprovalURI;

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
        test('異常 前提：対象データなし', async () => {
            // URLを生成
            const url = Url.updateSetSearchApprovalURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(404);
            expect(response.body.message).toBe(Message.NOT_EXISTS_TARGET);
        });
    });

    /**
     * 変更セット登録削除
     */
    describe('変更セット登録削除', () => {
        test('異常 前提：未アクティベート', async () => {
            // アクティベート解除
            await common.executeSqlFile('initialData.sql');
            await common.executeSqlFile('catalogCodeScope.sql');
            await common.executeSqlFile('nameSpace.sql');
            await common.executeSqlString(`
                DELETE FROM pxr_catalog.catalog
            `);

            // URLを生成
            const url = urljoin(Url.updateSetRegisterURI, '1');

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
        test('異常 前提：対象データなし', async () => {
            // URLを生成
            const url = urljoin(Url.updateSetRegisterURI, '999');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .delete(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.NOT_EXISTS_TARGET);
        });
        test('異常 前提：登録アクター不一致', async () => {
            // 変更セット準備
            await common.executeSqlString(`
                INSERT INTO pxr_catalog.update_set
                (
                    id, name, description, type, caller_actor_code, caller_actor_version, 
                    status, 
                    register_actor_code, register, regist_at, 
                    is_disabled, created_by, created_at, updated_by, updated_at
                ) VALUES
                (
                    1, 'ns', '登録アクター不一致', 1, 1000111, 1,
                    0,
                    1000111, 'loginid', NOW(),
                    false, 'loginid', NOW(), 'loginid', NOW()
                );
            `);
            // URLを生成
            const url = urljoin(Url.updateSetRegisterURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .delete(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.NOT_EXISTS_TARGET);
        });
    });

    /**
     * 変更セット申請
     */
    describe('変更セット申請', () => {
        test('異常 前提：未アクティベート', async () => {
            // アクティベート解除
            await common.executeSqlFile('initialData.sql');
            await common.executeSqlFile('catalogCodeScope.sql');
            await common.executeSqlFile('nameSpace.sql');
            await common.executeSqlString(`
                DELETE FROM pxr_catalog.catalog
            `);

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

            // アクティベート
            await common.executeSqlFile('activate.sql');

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_ACTIVATE);
        });
        test('異常 前提：対象データなし', async () => {
            // URLを生成
            const url = Url.updateSetRequestURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    id: 999,
                    approvalActor: 1000001
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.NOT_EXISTS_TARGET);
        });
        test('異常 前提：対象データなし', async () => {
            // 変更セット準備
            await common.executeSqlString(`
                INSERT INTO pxr_catalog.update_set
                (
                    name, description, type, caller_actor_code, caller_actor_version, 
                    status, 
                    register_actor_code, register, regist_at, 
                    is_disabled, created_by, created_at, updated_by, updated_at
                ) VALUES
                (
                    'ns', '登録アクター不一致', 1, 1000111, 1,
                    0,
                    1000111, 'loginid', NOW(),
                    false, 'loginid', NOW(), 'loginid', NOW()
                );
            `);
            // URLを生成
            const url = Url.updateSetRequestURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    id: 1,
                    approvalActor: 1000001
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.NOT_EXISTS_TARGET);
        });
        test('異常 前提：申請 catalog 追加、オペレーターアクターのカタログ参照して承認アクターとの関係確認　承認アクターカタログ取得失敗', async () => {
            // カタログ準備
            await common.executeSqlString(`
                INSERT INTO pxr_catalog.ns
                (
                    type, name, description, is_disabled,
                    attributes,
                    created_by, created_at, updated_by, updated_at
                ) VALUES
                (
                    'ext', 'catalog/ext/model/actor/approval', 'テスト用承認アクター2', False,
                    NULL,
                    'catalog_registrant', '2021/11/09 17:17:01.783', 'catalog_registrant', '2021/11/09 17:17:01.783'
                ),
                (
                    'ext', 'catalog/ext/model/actor/approval/actor_1000001', 'テスト用承認アクターカタログ', False,
                    NULL,
                    'catalog_registrant', '2021/11/09 17:17:01.783', 'catalog_registrant', '2021/11/09 17:17:01.783'
                ),
                (
                    'ext', 'catalog/ext/model/actor/approval/actor_1000001/workflow', 'テスト用承認wfカタログ', False,
                    NULL,
                    'catalog_registrant', '2021/11/09 17:17:01.783', 'catalog_registrant', '2021/11/09 17:17:01.783'
                );
                INSERT INTO pxr_catalog.catalog_item
                (
                    id, code, version, ns_id, name, description,
                    inherit_code, inherit_version, is_reserved, is_disabled,
                    response,
                    attributes,
                    created_by, created_at, updated_by, updated_at
                ) VALUES 
                (
                    302, 1000021, 1, 9, 'approval', 'テスト用承認アクター2',
                    NULL, NULL, False, False,
                    '{"catalogItem":{"ns":"catalog/ext/model/actor/approval","name":"テスト用承認アクター2","_code":{"_value":1000011,"_ver":1},"inherit":null,"description":"テスト用承認アクター2"},"template":{"_code":{"_value":1000011,"_ver":1},"information-site":null,"region":[{"_value":1000021}],"share":null,"store":null},"prop":null,"attribute":null}',
                    NULL,
                    'catalog_registrant', '2021/11/10 11:30:01.087', 'catalog_registrant', '2021/11/10 11:30:01.087'
                ),
                (
                    303, 1000001, 1, 10, 'approval', 'テスト用承認アクターカタログ',
                    NULL, NULL, False, False,
                    '{"catalogItem":{"ns":"catalog/ext/model/actor/approval","name":"テスト用承認アクターカタログ","_code":{"_value":1000001,"_ver":1},"inherit":null,"description":"テスト用承認アクターカタログ"},"template":{"_code":{"_value":1000001,"_ver":1},"information-site":null,"workflow":[{"_value":1000121,"ver": 1}],"share":null,"store":null},"prop":null,"attribute":null}',
                    NULL,
                    'catalog_registrant', '2021/11/10 11:30:01.087', 'catalog_registrant', '2021/11/10 11:30:01.087'
                ),
                (
                    304, 1000121, 1, 11, 'approval', 'テスト用承認wfカタログ',
                    NULL, NULL, False, False,
                    '{"catalogItem":{"ns":"catalog/ext/model/actor/approval","name":"テスト用承認wfカタログ","_code":{"_value":1000001,"_ver":1},"inherit":null,"description":"テスト用承認wfカタログ"},"template":{"_code":{"_value":1000001,"_ver":1},"information-site":null,"region-alliance":[{"_value":1000022}],"share":null,"store":null},"prop":null,"attribute":null}',
                    NULL,
                    'catalog_registrant', '2021/11/10 11:30:01.087', 'catalog_registrant', '2021/11/10 11:30:01.087'
                );
                INSERT INTO pxr_catalog.update_set
                (
                    id, name, description, type, caller_actor_code, caller_actor_version, 
                    approval_actor_code, approval_actor_version, status, 
                    register_actor_code, register, regist_at, 
                    is_disabled, created_by, created_at, updated_by, updated_at
                ) VALUES
                (
                    303, '新規変更セット名', '新規変更セット(説明)', 1, 1000001, 1,
                    1000001, 1, 0,
                    1000001, 'loginid', NOW(),
                    false, 'loginid', NOW(), 'loginid', NOW()
                );
                INSERT INTO pxr_catalog.ns_update_set
                (
                    id, update_set_id, type, ns_id, comment, template,
                    is_disabled, created_by, created_at, updated_by, updated_at
                ) VALUES
                (
                    303, 303, 1, null, null, '{"ns":"catalog/model/document","description":"ユニットテストネームスペース"}',
                    false, 'loginid', NOW(), 'loginid', NOW()
                );
                INSERT INTO pxr_catalog.catalog_update_set
                (
                    update_set_id, type, catalog_item_id, comment, template,
                    is_disabled, created_by, created_at, updated_by, updated_at
                ) VALUES
                (
                    303, 1, null, null, '{"catalogItem": {"ns": "catalog/model/document","name": "document","description": "ドキュメント", "_code": {"_value": 9666,"_ver": 1},"inherit": null},"template": {"prop": null,"value": null},"inner": null}',
                    false, 'loginid', NOW(), 'loginid', NOW()
                );
            `);
            const targetId: number = 303;

            // URLを生成
            const url = Url.updateSetRequestURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    id: targetId,
                    approvalActor: 1000022
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('対象カタログがありません');
        });
        test('異常 前提：申請 catalog 追加、承認アクターとの関係確認　オペレーターアクターカタログ取得失敗', async () => {
            // データ準備
            await common.executeSqlString(`
                UPDATE pxr_catalog.catalog_item
                SET is_disabled = true
                WHERE code = 1000001;
            `);
            const targetId: number = 303;

            // URLを生成
            const url = Url.updateSetRequestURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    id: targetId,
                    approvalActor: 1000021
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('対象カタログがありません');
        });
        test('異常 前提：申請 catalog 追加、承認アクターとの関係確認　オペレーターアクターカタログのwfが承認アクターのregionと提携していない', async () => {
            // データ準備
            await common.executeSqlString(`
                UPDATE pxr_catalog.catalog_item
                SET is_disabled = false
                WHERE code = 1000001;
            `);
            const targetId: number = 303;

            // URLを生成
            const url = Url.updateSetRequestURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    id: targetId,
                    approvalActor: 1000021
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(
                response.body.message).toBe('承認アクターが対象のアクターではありません。');
        });
        test('異常 前提：申請 catalog 追加、承認アクターとの関係確認　オペレーターアクターカタログのappが承認アクターのregionと提携していない', async () => {
            // データ準備
            await common.executeSqlString(`
                UPDATE pxr_catalog.catalog_item
                SET response = '{"catalogItem":{"ns":"catalog/ext/model/actor/approval","name":"テスト用承認appカタログ","_code":{"_value":1000001,"_ver":1},"inherit":null,"description":"テスト用承認appカタログ"},"template":{"_code":{"_value":1000001,"_ver":1},"information-site":null,"application":[{"_value":1000221,"ver": 1}, {"_value":1000121,"ver": 1}],"share":null,"store":null},"prop":null,"attribute":null}'
                WHERE code = 1000001;
            `);
            const targetId: number = 303;

            // URLを生成
            const url = Url.updateSetRequestURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    id: targetId,
                    approvalActor: 1000021
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('承認アクターが対象のアクターではありません。');
        });
        test('異常：catalog 追加　存在しないカタログを紐づけ(prop.type._code.value)', async () => {
            // 変更セット登録
            // URLを生成
            let url = Url.updateSetRegisterURI;

            // 対象APIに送信
            const registerResponse = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    name: '新規変更セット名',
                    description: '新規変更セット(documentカタログ、codeに存在しないカタログコードを紐づけ)',
                    type: 0,
                    ns: null,
                    catalog: [
                        {
                            type: 1,
                            catalogCode: 52,
                            comment: null,
                            template: {
                                catalogItem: {
                                    ns: 'catalog/ext/test-org/unit-test',
                                    name: 'ドキュメント',
                                    description: 'ドキュメントの定義です。',
                                    _code: {
                                        _value: 52,
                                        _ver: null
                                    },
                                    inherit: null
                                },
                                template: {
                                    prop: [
                                        {
                                            key: 'id',
                                            type: {
                                                of: 'item',
                                                _code: {
                                                    _value: 14,
                                                    _ver: 1
                                                },
                                                candidate: null
                                            },
                                            description: 'ドキュメント識別子'
                                        },
                                        {
                                            key: 'code',
                                            type: {
                                                of: 'item',
                                                _code: {
                                                    _value: 15,
                                                    _ver: 1
                                                },
                                                candidate: null
                                            },
                                            description: 'ドキュメント種別コード'
                                        },
                                        {
                                            key: 'createdAt',
                                            type: {
                                                of: 'item',
                                                _code: {
                                                    _value: 16,
                                                    _ver: 1
                                                },
                                                candidate: null
                                            },
                                            description: 'ドキュメント作成時刻'
                                        },
                                        {
                                            key: 'chapter',
                                            type: {
                                                of: 'inner[]',
                                                inner: 'Chapter'
                                            },
                                            description: 'チャプターの配列'
                                        }
                                    ],
                                    value: null
                                },
                                inner: [
                                    {
                                        name: 'Chapter',
                                        description: 'チャプター',
                                        template: {
                                            inherit: null,
                                            prop: [
                                                {
                                                    key: 'title',
                                                    type: {
                                                        of: 'string',
                                                        format: null,
                                                        unit: null
                                                    },
                                                    description: 'チャプタータイトル'
                                                },
                                                {
                                                    key: 'event',
                                                    type: {
                                                        of: 'string[]',
                                                        format: null,
                                                        unit: null
                                                    },
                                                    description: 'イベント識別子の配列'
                                                }
                                            ]
                                        },
                                        inner: null
                                    }
                                ],
                                attribute: null
                            }
                        }
                    ],
                    attribute: null,
                    appendix: null
                });

            // 変更セット申請
            // URLを生成
            url = Url.updateSetRequestURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    id: registerResponse.body.id,
                    approvalActor: 1000001
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(sprintf(Message.INVALID_CANDIDATE_CODE, 14));
        });
        test('異常：catalog 追加　存在しないカタログを紐づけ(prop.candidate._code[n].value)', async () => {
            // 変更セット登録
            // URLを生成
            let url = Url.updateSetRegisterURI;

            // 対象APIに送信
            const registerResponse = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    name: '新規変更セット名',
                    description: '新規変更セット(eventカタログ、thingに存在しないカタログコードを紐づけ)',
                    type: 0,
                    ns: null,
                    catalog: [
                        {
                            type: 1,
                            catalogCode: 1000148,
                            comment: null,
                            template: {
                                catalogItem: {
                                    ns: 'catalog/ext/test-org/unit-test',
                                    name: '個人が基本問診に答える（居住）',
                                    description: [
                                        {
                                            key: 'title',
                                            value: 'PJ①－3)虚弱高齢者見守り研究のイベント（個人が基本問診に答える（居住））の定義です。'
                                        },
                                        {
                                            key: 'section',
                                            value: [
                                                {
                                                    key: 'title',
                                                    value: '収集時期・期間'
                                                },
                                                {
                                                    key: 'content',
                                                    value: [
                                                        {
                                                            key: 'sentence',
                                                            value: '収集時期・期間を記載します。'
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ],
                                    _code: {
                                        _value: 1000148,
                                        _ver: 1
                                    },
                                    inherit: null
                                },
                                template: {
                                    prop: [
                                        {
                                            key: 'thing',
                                            type: {
                                                of: 'item[]',
                                                _code: null,
                                                candidate: {
                                                    ns: null,
                                                    _code: [
                                                        {
                                                            _value: 1000193,
                                                            _ver: 1
                                                        },
                                                        {
                                                            _value: 1000194,
                                                            _ver: 1
                                                        },
                                                        {
                                                            _value: 1000195,
                                                            _ver: 1
                                                        }
                                                    ],
                                                    base: null
                                                }
                                            },
                                            description: 'モノの配列'
                                        }
                                    ],
                                    value: [
                                        {
                                            key: 'code',
                                            value: [
                                                {
                                                    key: '_value',
                                                    value: 1000148
                                                },
                                                {
                                                    key: '_ver',
                                                    value: 1
                                                }
                                            ]
                                        },
                                        {
                                            key: 'wf',
                                            value: [
                                                {
                                                    key: 'code',
                                                    value: [
                                                        {
                                                            key: '_value',
                                                            value: 1000117
                                                        },
                                                        {
                                                            key: '_ver',
                                                            value: 1
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                inner: null,
                                attribute: null
                            }
                        }
                    ],
                    attribute: null,
                    appendix: null
                });

            // 変更セット申請
            // URLを生成
            url = Url.updateSetRequestURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    id: registerResponse.body.id,
                    approvalActor: 1000001
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(sprintf(Message.INVALID_CANDIDATE_CODE, 1000193));
        });
        test('異常：catalog 追加　存在しないカタログを紐づけ(prop.candidate.base._value)', async () => {
            // 変更セット登録
            // URLを生成
            let url = Url.updateSetRegisterURI;

            // 対象APIに送信
            const registerResponse = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    name: '新規変更セット名',
                    description: '新規変更セット(thingカタログ、qa-groupに存在しないカタログコードを紐づけ)',
                    type: 0,
                    ns: null,
                    catalog: [
                        {
                            type: 1,
                            catalogCode: 56,
                            comment: null,
                            template: {
                                catalogItem: {
                                    ns: 'catalog/ext/test-org/unit-test',
                                    name: '単一回答選択式の質問',
                                    description: '単一回答選択式の質問の定義です。',
                                    _code: {
                                        _value: 56,
                                        _ver: null
                                    },
                                    inherit: null
                                },
                                template: {
                                    prop: [
                                        {
                                            key: 'candidate',
                                            type: {
                                                of: 'code[]',
                                                _code: null,
                                                candidate: {
                                                    ns: [
                                                        'catalog/model/qualitative/*',
                                                        'catalog/built_in/qualitative/*',
                                                        'catalog/ext/{ext_name}/qualitative/*'
                                                    ],
                                                    _code: null,
                                                    base: null
                                                }
                                            },
                                            description: '回答候補'
                                        },
                                        {
                                            key: 'qa-group',
                                            type: {
                                                of: 'code',
                                                candidate: {
                                                    ns: null,
                                                    _code: null,
                                                    base: {
                                                        _value: 112,
                                                        _ver: 1
                                                    }
                                                },
                                                cmatrix: {
                                                    index: '4_2_1_2',
                                                    reserved: false
                                                }
                                            },
                                            description: '質問グループ'
                                        }
                                    ],
                                    value: null
                                },
                                inner: null,
                                attribute: null
                            }
                        }
                    ],
                    attribute: null,
                    appendix: null
                });

            // 変更セット申請
            // URLを生成
            url = Url.updateSetRequestURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    id: registerResponse.body.id,
                    approvalActor: 1000001
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(sprintf(Message.INVALID_CANDIDATE_CODE, 112));
        });
        test('異常：catalog 更新　存在しないカタログを紐づけ(prop.candidate._code[n].value)', async () => {
            // 変更セット登録
            // URLを生成
            let url = Url.updateSetRegisterURI;

            // 対象APIに送信
            const registerResponse = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    name: '新規変更セット名',
                    description: '新規変更セット(カタログ更新、存在しないカタログコードを紐づけ)',
                    type: 0,
                    ns: null,
                    catalog: [
                        {
                            type: 2,
                            catalogCode: 1000001,
                            comment: null,
                            template: {
                                catalogItem: {
                                    ns: 'catalog/ext/test-org/unit-test',
                                    name: '個人が基本問診に答える（居住）',
                                    description: [
                                        {
                                            key: 'title',
                                            value: 'PJ①－3)虚弱高齢者見守り研究のイベント（個人が基本問診に答える（居住））の定義です。'
                                        },
                                        {
                                            key: 'section',
                                            value: [
                                                {
                                                    key: 'title',
                                                    value: '収集時期・期間'
                                                },
                                                {
                                                    key: 'content',
                                                    value: [
                                                        {
                                                            key: 'sentence',
                                                            value: '収集時期・期間を記載します。'
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ],
                                    _code: {
                                        _value: 1000001
                                    },
                                    inherit: null
                                },
                                template: {
                                    prop: [
                                        {
                                            key: 'thing',
                                            type: {
                                                of: 'item[]',
                                                _code: null,
                                                candidate: {
                                                    ns: null,
                                                    _code: [
                                                        {
                                                            _value: 1000193,
                                                            _ver: 1
                                                        },
                                                        {
                                                            _value: 1000194,
                                                            _ver: 1
                                                        },
                                                        {
                                                            _value: 1000195,
                                                            _ver: 1
                                                        }
                                                    ],
                                                    base: null
                                                }
                                            },
                                            description: 'モノの配列'
                                        }
                                    ],
                                    value: [
                                        {
                                            key: 'code',
                                            value: [
                                                {
                                                    key: '_value',
                                                    value: 1000193
                                                },
                                                {
                                                    key: '_ver',
                                                    value: 1
                                                }
                                            ]
                                        },
                                        {
                                            key: 'wf',
                                            value: [
                                                {
                                                    key: 'code',
                                                    value: [
                                                        {
                                                            key: '_value',
                                                            value: 1000194
                                                        },
                                                        {
                                                            key: '_ver',
                                                            value: 1
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                inner: null,
                                attribute: null
                            }
                        }
                    ],
                    attribute: null,
                    appendix: null
                });

            // 変更セット申請
            // URLを生成
            url = Url.updateSetRequestURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    id: registerResponse.body.id,
                    approvalActor: 1000001
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(sprintf(Message.INVALID_CANDIDATE_CODE, 1000193));
        });
        test('異常：catalog 更新　存在しないカタログを紐づけ(value配列内のコード)', async () => {
            // 変更セット登録
            // URLを生成
            let url = Url.updateSetRegisterURI;

            // 対象APIに送信
            const registerResponse = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    name: '新規変更セット名',
                    description: '新規変更セット(カタログ更新、存在しないカタログコードを紐づけ)',
                    type: 0,
                    ns: null,
                    catalog: [
                        {
                            type: 2,
                            catalogCode: 1000001,
                            comment: null,
                            template: {
                                catalogItem: {
                                    ns: 'catalog/ext/test-org/unit-test',
                                    name: '個人が基本問診に答える（居住）',
                                    description: [
                                        {
                                            key: 'title',
                                            value: 'PJ①－3)虚弱高齢者見守り研究のイベント（個人が基本問診に答える（居住））の定義です。'
                                        },
                                        {
                                            key: 'section',
                                            value: [
                                                {
                                                    key: 'title',
                                                    value: '収集時期・期間'
                                                },
                                                {
                                                    key: 'content',
                                                    value: [
                                                        {
                                                            key: 'sentence',
                                                            value: '収集時期・期間を記載します。'
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ],
                                    _code: {
                                        _value: 1000001
                                    },
                                    inherit: null
                                },
                                template: {
                                    prop: [],
                                    value: [
                                        {
                                            key: 'item-group',
                                            value: [
                                                {
                                                    key: 'title',
                                                    value: '氏名'
                                                },
                                                {
                                                    key: 'item',
                                                    value: [
                                                        {
                                                            key: 'title',
                                                            value: '姓'
                                                        },
                                                        {
                                                            key: 'type',
                                                            value: [
                                                                {
                                                                    key: '_value',
                                                                    value: 1000021
                                                                },
                                                                {
                                                                    key: '_ver',
                                                                    value: 1
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            key: 'content',
                                                            value: null
                                                        }
                                                    ]
                                                },
                                                {
                                                    key: 'item',
                                                    value: [
                                                        {
                                                            key: 'title',
                                                            value: '名'
                                                        },
                                                        {
                                                            key: 'type',
                                                            value: [
                                                                {
                                                                    key: '_value',
                                                                    value: 30020
                                                                },
                                                                {
                                                                    key: '_ver',
                                                                    value: 1
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            key: 'content',
                                                            value: null
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            key: 'item-group',
                                            value: [
                                                {
                                                    key: 'title',
                                                    value: '性別'
                                                },
                                                {
                                                    key: 'item',
                                                    value: [
                                                        {
                                                            key: 'title',
                                                            value: '性別'
                                                        },
                                                        {
                                                            key: 'type',
                                                            value: [
                                                                {
                                                                    key: '_value',
                                                                    value: 30021
                                                                },
                                                                {
                                                                    key: '_ver',
                                                                    value: 1
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            key: 'content',
                                                            value: null
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                inner: null,
                                attribute: null
                            }
                        }
                    ],
                    attribute: null,
                    appendix: null
                });

            // 変更セット申請
            // URLを生成
            url = Url.updateSetRequestURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    id: registerResponse.body.id,
                    approvalActor: 1000001
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(sprintf(Message.INVALID_CANDIDATE_CODE, 30020));
        });
    });

    /**
     * 変更セット承認
     */
    describe('変更セット承認', () => {
        test('異常 前提：未アクティベート', async () => {
            // アクティベート解除
            await common.executeSqlFile('initialData.sql');
            await common.executeSqlFile('catalogCodeScope.sql');
            await common.executeSqlFile('nameSpace.sql');
            await common.executeSqlString(`
                DELETE FROM pxr_catalog.catalog
            `);

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

            // アクティベート
            await common.executeSqlFile('activate.sql');

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_ACTIVATE);
        });
        test('異常 前提：対象データなし', async () => {
            // URLを生成
            const url = urljoin(Url.updateSetApprovalURI, '999');

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
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.NOT_EXISTS_TARGET);
        });
        test('異常 前提： ns追加、対象ns既存', async () => {
            // 対象データの作成
            await common.executeSqlString(`
                INSERT INTO pxr_catalog.ns
                (
                    type, name, description, is_disabled,
                    attributes,
                    created_by, created_at, updated_by, updated_at
                ) VALUES
                (
                    'ext', 'catalog/model/actor/wf/workflow', 'ワークフローの定義です。', False,
                    NULL,
                    'catalog_registrant', '2021/11/09 17:17:01.783', 'catalog_registrant', '2021/11/09 17:17:01.783'
                );
                INSERT INTO pxr_catalog.update_set
                (
                    name, description, type, caller_actor_code, caller_actor_version, 
                    approval_actor_code, approval_actor_version, status, 
                    register_actor_code, register, regist_at, 
                    is_disabled, created_by, created_at, updated_by, updated_at
                ) VALUES
                (
                    'ns', '対象ns既存', 1, 1000001, 1,
                    1000001, 1, 3,
                    1000001, 'loginid', NOW(),
                    false, 'loginid', NOW(), 'loginid', NOW()
                );
                INSERT INTO pxr_catalog.ns_update_set
                (
                    update_set_id, type, ns_id, comment, template,
                    is_disabled, created_by, created_at, updated_by, updated_at
                ) VALUES
                (
                    1, 1, null, null, '{"ns":"catalog/model/actor/wf/workflow","description":"ワークフローの定義です。"}',
                    false, 'loginid', NOW(), 'loginid', NOW()
                );
            `);
            // URLを生成
            const url = urljoin(Url.updateSetApprovalURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    status: 1,
                    comment: '承認コメント'
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.NAMESPACE_ALREADY);
        });
        test('異常 前提： ns更新、非存在ns', async () => {
            // 対象データの作成
            await common.executeSqlString(`
                INSERT INTO pxr_catalog.update_set
                (
                    name, description, type, caller_actor_code, caller_actor_version, 
                    approval_actor_code, approval_actor_version, status, 
                    register_actor_code, register, regist_at, 
                    is_disabled, created_by, created_at, updated_by, updated_at
                ) VALUES
                (
                    'ns', '非存在ns', 2, 1000001, 1,
                    1000001, 1, 3,
                    1000001, 'loginid', NOW(),
                    false, 'loginid', NOW(), 'loginid', NOW()
                );
                INSERT INTO pxr_catalog.ns_update_set
                (
                    update_set_id, type, ns_id, comment, template,
                    is_disabled, created_by, created_at, updated_by, updated_at
                ) VALUES
                (
                    2, 2, 999, null, '{"ns":"catalog/model/actor/wf/workflow","description":"ワークフローの定義です。"}',
                    false, 'loginid', NOW(), 'loginid', NOW()
                );
            `);
            // URLを生成
            const url = urljoin(Url.updateSetApprovalURI, '2');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    status: 1,
                    comment: '承認コメント'
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.NAMESPACE_NOT_FOUND);
        });
        test('異常 前提： ns更新、更新後のnsが既存', async () => {
            // 対象データの作成
            await common.executeSqlString(`
            INSERT INTO pxr_catalog.update_set
                (
                    name, description, type, caller_actor_code, caller_actor_version, 
                    approval_actor_code, approval_actor_version, status, 
                    register_actor_code, register, regist_at, 
                    is_disabled, created_by, created_at, updated_by, updated_at
                ) VALUES
                (
                    'ns', '更新後のnsが既存', 2, 1000001, 1,
                    1000001, 1, 3,
                    1000001, 'loginid', NOW(),
                    false, 'loginid', NOW(), 'loginid', NOW()
                );
                INSERT INTO pxr_catalog.ns_update_set
                (
                    update_set_id, type, ns_id, comment, template,
                    is_disabled, created_by, created_at, updated_by, updated_at
                ) VALUES
                (
                    3, 2, 6, null, '{"ns":"catalog/model/actor/wf/workflow","description":"ワークフローの定義です。"}',
                    false, 'loginid', NOW(), 'loginid', NOW()
            );
            `);
            // URLを生成
            const url = urljoin(Url.updateSetApprovalURI, '3');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    status: 1,
                    comment: '承認コメント'
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.NAMESPACE_ALREADY);
        });
        test('異常 前提： ns削除、非存在ns', async () => {
            // 対象データの作成
            await common.executeSqlString(`
                INSERT INTO pxr_catalog.update_set
                (
                    name, description, type, caller_actor_code, caller_actor_version, 
                    approval_actor_code, approval_actor_version, status, 
                    register_actor_code, register, regist_at, 
                    is_disabled, created_by, created_at, updated_by, updated_at
                ) VALUES
                (
                    'ns', '非存在ns', 3, 1000001, 1,
                    1000001, 1, 3,
                    1000001, 'loginid', NOW(),
                    false, 'loginid', NOW(), 'loginid', NOW()
                );
                INSERT INTO pxr_catalog.ns_update_set
                (
                    update_set_id, type, ns_id, comment, template,
                    is_disabled, created_by, created_at, updated_by, updated_at
                ) VALUES
                (
                    4, 3, 999, null, '{"ns":"catalog/model/actor/wf/workflow","description":"ワークフローの定義です。"}',
                    false, 'loginid', NOW(), 'loginid', NOW()
                );
            `);
            // URLを生成
            const url = urljoin(Url.updateSetApprovalURI, '4');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    status: 1,
                    comment: '承認コメント'
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.NAMESPACE_NOT_FOUND);
        });
        test('異常 前提： catalog追加、対象catalog既存', async () => {
            // 対象データの作成
            await common.executeSqlString(`
                INSERT INTO pxr_catalog.catalog_item
                (
                    code, version, ns_id, name, description,
                    inherit_code, inherit_version, is_reserved, is_disabled,
                    response,
                    attributes,
                    created_by, created_at, updated_by, updated_at
                ) VALUES 
                (
                    46, 1, 1, 'ワークフロー', 'ワークフローの定義です。',
                    NULL, NULL, False, False,
                    '{"catalogItem":{"ns":"catalog/model/actor/wf/workflow","name":"ワークフロー","_code":{"_value":46,"_ver":1},"inherit":null,"description":"ワークフローの定義です。"},"template":{"_code":{"_value":46,"_ver":1},"information-site":null,"region-alliance":null,"share":null,"store":null},"prop":[{"key":"information-site","type":{"of":"string","cmatrix":null,"format":null,"unit":null,"candidate":null},"description":"ワークフローの情報サイト","isInherit":false},{"key":"region-alliance","type":{"of":"code[]","cmatrix":null,"candidate":{"ns":null,"_code":null,"base":{"_value":48,"_ver":1}}},"description":"参加している領域運営サービスプロバイダーのリージョンコード配列","isInherit":false},{"key":"share","type":{"of":"code[]","cmatrix":null,"candidate":{"ns":null,"_code":null,"base":{"_value":45,"_ver":1}}},"description":"ワークフローが提供する状態共有機能の定義","isInherit":false},{"key":"store","type":{"of":"code[]","cmatrix":null,"candidate":{"ns":null,"_code":null,"base":{"_value":44,"_ver":1}}},"description":"ワークフローが蓄積可能なデータの定義","isInherit":false}],"attribute":null}',
                    NULL,
                    'catalog_registrant', '2021/11/10 11:30:01.087', 'catalog_registrant', '2021/11/10 11:30:01.087'
                );
                INSERT INTO pxr_catalog.update_set
                (
                    name, description, type, caller_actor_code, caller_actor_version, 
                    approval_actor_code, approval_actor_version, status, 
                    register_actor_code, register, regist_at, 
                    is_disabled, created_by, created_at, updated_by, updated_at
                ) VALUES
                (
                    'catalog', '対象catalog既存', 1, 1000001, 1,
                    1000001, 1, 3,
                    1000001, 'loginid', NOW(),
                    false, 'loginid', NOW(), 'loginid', NOW()
                );
                INSERT INTO pxr_catalog.catalog_update_set
                (
                    update_set_id, type, catalog_item_id, comment, template,
                    is_disabled, created_by, created_at, updated_by, updated_at
                ) VALUES
                (
                    5, 1, 1, null, '{"catalogItem":{"ns":"catalog/model/actor/wf/workflow","name":"ワークフロー","_code":{"_value":46,"_ver":1},"inherit":null,"description":"ワークフローの定義です。"},"template":{"_code":{"_value":46,"_ver":1},"information-site":null,"region-alliance":null,"share":null,"store":null},"prop":[{"key":"information-site","type":{"of":"string","cmatrix":null,"format":null,"unit":null,"candidate":null},"description":"ワークフローの情報サイト","isInherit":false},{"key":"region-alliance","type":{"of":"code[]","cmatrix":null,"candidate":{"ns":null,"_code":null,"base":{"_value":48,"_ver":1}}},"description":"参加している領域運営サービスプロバイダーのリージョンコード配列","isInherit":false},{"key":"share","type":{"of":"code[]","cmatrix":null,"candidate":{"ns":null,"_code":null,"base":{"_value":45,"_ver":1}}},"description":"ワークフローが提供する状態共有機能の定義","isInherit":false},{"key":"store","type":{"of":"code[]","cmatrix":null,"candidate":{"ns":null,"_code":null,"base":{"_value":44,"_ver":1}}},"description":"ワークフローが蓄積可能なデータの定義","isInherit":false}],"attribute":null}',
                    false, 'loginid', NOW(), 'loginid', NOW()
                );
            `);
            // URLを生成
            const url = urljoin(Url.updateSetApprovalURI, '5');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    status: 1,
                    comment: '承認コメント'
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.CODE_ALREADY);
        });
        test('異常 前提： catalog更新、非存在catalog', async () => {
            // 対象データの作成
            await common.executeSqlString(`
                INSERT INTO pxr_catalog.update_set
                (
                    name, description, type, caller_actor_code, caller_actor_version, 
                    approval_actor_code, approval_actor_version, status, 
                    register_actor_code, register, regist_at, 
                    is_disabled, created_by, created_at, updated_by, updated_at
                ) VALUES
                (
                    'catalog', '非存在catalog', 2, 1000001, 1,
                    1000001, 1, 3,
                    1000001, 'loginid', NOW(),
                    false, 'loginid', NOW(), 'loginid', NOW()
                );
                INSERT INTO pxr_catalog.catalog_update_set
                (
                    update_set_id, type, catalog_item_id, catalog_item_code, comment, template,
                    is_disabled, created_by, created_at, updated_by, updated_at
                ) VALUES
                (
                    6, 2, 1, 999, null, '{"catalogItem":{"ns":"catalog/model/actor/wf/workflow","name":"ワークフロー","_code":{"_value":46,"_ver":1},"inherit":null,"description":"ワークフローの定義です。"},"template":{"_code":{"_value":46,"_ver":1},"information-site":null,"region-alliance":null,"share":null,"store":null},"prop":[{"key":"information-site","type":{"of":"string","cmatrix":null,"format":null,"unit":null,"candidate":null},"description":"ワークフローの情報サイト","isInherit":false},{"key":"region-alliance","type":{"of":"code[]","cmatrix":null,"candidate":{"ns":null,"_code":null,"base":{"_value":48,"_ver":1}}},"description":"参加している領域運営サービスプロバイダーのリージョンコード配列","isInherit":false},{"key":"share","type":{"of":"code[]","cmatrix":null,"candidate":{"ns":null,"_code":null,"base":{"_value":45,"_ver":1}}},"description":"ワークフローが提供する状態共有機能の定義","isInherit":false},{"key":"store","type":{"of":"code[]","cmatrix":null,"candidate":{"ns":null,"_code":null,"base":{"_value":44,"_ver":1}}},"description":"ワークフローが蓄積可能なデータの定義","isInherit":false}],"attribute":null}',
                    false, 'loginid', NOW(), 'loginid', NOW()
                );
            `);
            // URLを生成
            const url = urljoin(Url.updateSetApprovalURI, '6');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    status: 1,
                    comment: '承認コメント'
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.CODE_NOT_FOUND);
        });
        test('異常 前提： catalog更新、version指定が最大でない', async () => {
            // 対象データの作成
            await common.executeSqlString(`
                INSERT INTO pxr_catalog.update_set
                (
                    name, description, type, caller_actor_code, caller_actor_version, 
                    approval_actor_code, approval_actor_version, status, 
                    register_actor_code, register, regist_at, 
                    is_disabled, created_by, created_at, updated_by, updated_at
                ) VALUES
                (
                    'catalog', 'version指定が最大でない', 2, 1000001, 1,
                    1000001, 1, 3,
                    1000001, 'loginid', NOW(),
                    false, 'loginid', NOW(), 'loginid', NOW()
                );
                INSERT INTO pxr_catalog.catalog_update_set
                (
                    update_set_id, type, catalog_item_id, catalog_item_code, comment, template,
                    is_disabled, created_by, created_at, updated_by, updated_at
                ) VALUES
                (
                    7, 2, 1, 46, null, '{"catalogItem":{"ns":"catalog/model/actor/wf/workflow","name":"ワークフロー","_code":{"_value":46,"_ver":1},"inherit":null,"description":"ワークフローの定義です。"},"template":{"_code":{"_value":46,"_ver":1},"information-site":null,"region-alliance":null,"share":null,"store":null},"prop":[{"key":"information-site","type":{"of":"string","cmatrix":null,"format":null,"unit":null,"candidate":null},"description":"ワークフローの情報サイト","isInherit":false},{"key":"region-alliance","type":{"of":"code[]","cmatrix":null,"candidate":{"ns":null,"_code":null,"base":{"_value":48,"_ver":1}}},"description":"参加している領域運営サービスプロバイダーのリージョンコード配列","isInherit":false},{"key":"share","type":{"of":"code[]","cmatrix":null,"candidate":{"ns":null,"_code":null,"base":{"_value":45,"_ver":1}}},"description":"ワークフローが提供する状態共有機能の定義","isInherit":false},{"key":"store","type":{"of":"code[]","cmatrix":null,"candidate":{"ns":null,"_code":null,"base":{"_value":44,"_ver":1}}},"description":"ワークフローが蓄積可能なデータの定義","isInherit":false}],"attribute":null}',
                    false, 'loginid', NOW(), 'loginid', NOW()
                );
            `);
            // URLを生成
            const url = urljoin(Url.updateSetApprovalURI, '7');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    status: 1,
                    comment: '承認コメント'
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.VERSION_DIFFERENCE);
        });
        test('異常 前提： catalog削除、非存在catalog', async () => {
            // 対象データの作成
            await common.executeSqlString(`
                INSERT INTO pxr_catalog.update_set
                (
                    name, description, type, caller_actor_code, caller_actor_version, 
                    approval_actor_code, approval_actor_version, status, 
                    register_actor_code, register, regist_at, 
                    is_disabled, created_by, created_at, updated_by, updated_at
                ) VALUES
                (
                    'catalog', '非存在catalog', 3, 1000001, 1,
                    1000001, 1, 3,
                    1000001, 'loginid', NOW(),
                    false, 'loginid', NOW(), 'loginid', NOW()
                );
                INSERT INTO pxr_catalog.catalog_update_set
                (
                    update_set_id, type, catalog_item_id, catalog_item_code, comment, template,
                    is_disabled, created_by, created_at, updated_by, updated_at
                ) VALUES
                (
                    8, 3, 1, 999, null, '{"catalogItem":{"ns":"catalog/model/actor/wf/workflow","name":"ワークフロー","_code":{"_value":46,"_ver":1},"inherit":null,"description":"ワークフローの定義です。"},"template":{"_code":{"_value":46,"_ver":1},"information-site":null,"region-alliance":null,"share":null,"store":null},"prop":[{"key":"information-site","type":{"of":"string","cmatrix":null,"format":null,"unit":null,"candidate":null},"description":"ワークフローの情報サイト","isInherit":false},{"key":"region-alliance","type":{"of":"code[]","cmatrix":null,"candidate":{"ns":null,"_code":null,"base":{"_value":48,"_ver":1}}},"description":"参加している領域運営サービスプロバイダーのリージョンコード配列","isInherit":false},{"key":"share","type":{"of":"code[]","cmatrix":null,"candidate":{"ns":null,"_code":null,"base":{"_value":45,"_ver":1}}},"description":"ワークフローが提供する状態共有機能の定義","isInherit":false},{"key":"store","type":{"of":"code[]","cmatrix":null,"candidate":{"ns":null,"_code":null,"base":{"_value":44,"_ver":1}}},"description":"ワークフローが蓄積可能なデータの定義","isInherit":false}],"attribute":null}',
                    false, 'loginid', NOW(), 'loginid', NOW()
                );
            `);
            // URLを生成
            const url = urljoin(Url.updateSetApprovalURI, '8');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    status: 1,
                    comment: '承認コメント'
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.CODE_NOT_FOUND);
        });
        test('異常 前提： attribute追加、非存在catalog', async () => {
            // 対象データの作成
            await common.executeSqlString(`
                INSERT INTO pxr_catalog.update_set
                (
                    name, description, type, caller_actor_code, caller_actor_version, 
                    approval_actor_code, approval_actor_version, status, 
                    register_actor_code, register, regist_at, 
                    is_disabled, created_by, created_at, updated_by, updated_at
                ) VALUES
                (
                    'attribute', '非存在catalog', 1, 1000001, 1,
                    1000001, 1, 3,
                    1000001, 'loginid', NOW(),
                    false, 'loginid', NOW(), 'loginid', NOW()
                );
                INSERT INTO pxr_catalog.attribute_update_set
                (
                    update_set_id, type, catalog_code, comment, attribute,
                    is_disabled, created_by, created_at, updated_by, updated_at
                ) VALUES
                (
                    9, 3, 999, null, '{"objects":[],"tags":[]}',
                    false, 'loginid', NOW(), 'loginid', NOW()
                );
            `);
            // URLを生成
            const url = urljoin(Url.updateSetApprovalURI, '9');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    status: 1,
                    comment: '承認コメント'
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.CODE_NOT_FOUND);
        });
        test('異常 前提： catalog追加、非存在ns', async () => {
            // 対象データの作成
            await common.executeSqlString(`
                INSERT INTO pxr_catalog.update_set
                (
                    name, description, type, caller_actor_code, caller_actor_version, 
                    approval_actor_code, approval_actor_version, status, 
                    register_actor_code, register, regist_at, 
                    is_disabled, created_by, created_at, updated_by, updated_at
                ) VALUES
                (
                    'catalog', '非存在ns', 1, 1000001, 1,
                    1000001, 1, 3,
                    1000001, 'loginid', NOW(),
                    false, 'loginid', NOW(), 'loginid', NOW()
                );
                INSERT INTO pxr_catalog.catalog_update_set
                (
                    update_set_id, type, catalog_item_id, comment, template,
                    is_disabled, created_by, created_at, updated_by, updated_at
                ) VALUES
                (
                    10, 1, 1, null, '{"catalogItem":{"ns":"catalog/model/actor/app/application","name":"アプリケーション","_code":{"_value":56,"_ver":1},"inherit":null,"description":"アプリケーションの定義です。"},"template":{"_code":{"_value":46,"_ver":1},"information-site":null,"region-alliance":null,"share":null,"store":null},"prop":[{"key":"information-site","type":{"of":"string","cmatrix":null,"format":null,"unit":null,"candidate":null},"description":"ワークフローの情報サイト","isInherit":false},{"key":"region-alliance","type":{"of":"code[]","cmatrix":null,"candidate":{"ns":null,"_code":null,"base":{"_value":48,"_ver":1}}},"description":"参加している領域運営サービスプロバイダーのリージョンコード配列","isInherit":false},{"key":"share","type":{"of":"code[]","cmatrix":null,"candidate":{"ns":null,"_code":null,"base":{"_value":45,"_ver":1}}},"description":"ワークフローが提供する状態共有機能の定義","isInherit":false},{"key":"store","type":{"of":"code[]","cmatrix":null,"candidate":{"ns":null,"_code":null,"base":{"_value":44,"_ver":1}}},"description":"ワークフローが蓄積可能なデータの定義","isInherit":false}],"attribute":null}',
                    false, 'loginid', NOW(), 'loginid', NOW()
                );
            `);
            // URLを生成
            const url = urljoin(Url.updateSetApprovalURI, '10');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    status: 1,
                    comment: '承認コメント'
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.NAMESPACE_NOT_FOUND);
        });
        test('異常 前提： catalog追加、カタログコードがスコープ範囲外', async () => {
            // 対象データの作成
            await common.executeSqlString(`
                INSERT INTO pxr_catalog.ns
                (
                    type, name, description, is_disabled,
                    attributes,
                    created_by, created_at, updated_by, updated_at
                ) VALUES
                (
                    'model', 'catalog/model/actor/app/application', 'アプリケーションの定義です。', False,
                    NULL,
                    'catalog_registrant', '2021/11/09 17:17:01.783', 'catalog_registrant', '2021/11/09 17:17:01.783'
                );
                INSERT INTO pxr_catalog.update_set
                (
                    name, description, type, caller_actor_code, caller_actor_version, 
                    approval_actor_code, approval_actor_version, status, 
                    register_actor_code, register, regist_at, 
                    is_disabled, created_by, created_at, updated_by, updated_at
                ) VALUES
                (
                    'catalog', 'カタログコードがスコープ範囲外', 1, 1000001, 1,
                    1000001, 1, 3,
                    1000001, 'loginid', NOW(),
                    false, 'loginid', NOW(), 'loginid', NOW()
                );
                INSERT INTO pxr_catalog.catalog_update_set
                (
                    update_set_id, type, catalog_item_id, catalog_item_code, comment, template,
                    is_disabled, created_by, created_at, updated_by, updated_at
                ) VALUES
                (
                    11, 1, 1, 1000001, null, '{"catalogItem":{"ns":"catalog/model/actor/app/application","name":"アプリケーション","_code":{"_value":1000001,"_ver":1},"inherit":null,"description":"アプリケーションの定義です。"},"template":{"_code":{"_value":46,"_ver":1},"information-site":null,"region-alliance":null,"share":null,"store":null},"prop":[{"key":"information-site","type":{"of":"string","cmatrix":null,"format":null,"unit":null,"candidate":null},"description":"ワークフローの情報サイト","isInherit":false},{"key":"region-alliance","type":{"of":"code[]","cmatrix":null,"candidate":{"ns":null,"_code":null,"base":{"_value":48,"_ver":1}}},"description":"参加している領域運営サービスプロバイダーのリージョンコード配列","isInherit":false},{"key":"share","type":{"of":"code[]","cmatrix":null,"candidate":{"ns":null,"_code":null,"base":{"_value":45,"_ver":1}}},"description":"ワークフローが提供する状態共有機能の定義","isInherit":false},{"key":"store","type":{"of":"code[]","cmatrix":null,"candidate":{"ns":null,"_code":null,"base":{"_value":44,"_ver":1}}},"description":"ワークフローが蓄積可能なデータの定義","isInherit":false}],"attribute":null}',
                    false, 'loginid', NOW(), 'loginid', NOW()
                );
            `);
            // URLを生成
            const url = urljoin(Url.updateSetApprovalURI, '11');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    status: 1,
                    comment: '承認コメント'
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.CODE_SCOPE_OUT_CODE);
        });
        test('異常 前提：申請 catalog 追加、オペレーターアクターのカタログ参照して承認アクターとの関係確認、参照カタログなし', async () => {
            // カタログ準備
            await common.executeSqlString(`
                INSERT INTO pxr_catalog.update_set
                (
                    id, name, description, type, caller_actor_code, caller_actor_version,
                    approval_actor_code, approval_actor_version, status,
                    register_actor_code, register, regist_at,
                    is_disabled, created_by, created_at, updated_by, updated_at
                ) VALUES
                (
                    303, '新規変更セット名', '新規変更セット(説明)', 1, 1000001, 1,
                    1000001, 1, 0,
                    1000001, 'loginid', NOW(),
                    false, 'loginid', NOW(), 'loginid', NOW()
                );
                INSERT INTO pxr_catalog.ns_update_set
                (
                    id, update_set_id, type, ns_id, comment, template,
                    is_disabled, created_by, created_at, updated_by, updated_at
                ) VALUES
                (
                    303, 303, 1, null, null, '{"ns":"catalog/model/document","description":"ユニットテストネームスペース"}',
                    false, 'loginid', NOW(), 'loginid', NOW()
                );
                INSERT INTO pxr_catalog.catalog_update_set
                (
                    update_set_id, type, catalog_item_id, comment, template,
                    is_disabled, created_by, created_at, updated_by, updated_at
                ) VALUES
                (
                    303, 1, null, null, '{"catalogItem": {"ns": "catalog/model/document","name": "document","description": "ドキュメント", "_code": {"_value": 9666,"_ver": 1},"inherit": null},"template": {"prop": null,"value": null},"inner": null}',
                    false, 'loginid', NOW(), 'loginid', NOW()
                );
            `);
            const targetId: number = 303;

            // URLを生成
            const url = Url.updateSetRequestURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    id: targetId,
                    approvalActor: 1000021
                });
            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.CATALOG_NOT_FOUND);
        });
        test('異常 前提：申請 catalog 追加、オペレーターアクターのカタログ参照して承認アクターとの関係確認、参照アクターカタログなし', async () => {
            // カタログ準備
            await common.executeSqlString(`
                INSERT INTO pxr_catalog.ns
                (
                    type, name, description, is_disabled,
                    attributes,
                    created_by, created_at, updated_by, updated_at
                ) VALUES
                (
                    'ext', 'catalog/ext/model/actor/approval', 'テスト用承認アクター2', False,
                    NULL,
                    'catalog_registrant', '2021/11/09 17:17:01.783', 'catalog_registrant', '2021/11/09 17:17:01.783'
                );
                INSERT INTO pxr_catalog.catalog_item
                (
                    id, code, version, ns_id, name, description,
                    inherit_code, inherit_version, is_reserved, is_disabled,
                    response,
                    attributes,
                    created_by, created_at, updated_by, updated_at
                ) VALUES
                (
                    302, 1000021, 1, 16, 'approval', 'テスト用承認アクター2',
                    NULL, NULL, False, False,
                    '{"catalogItem":{"ns":"catalog/ext/model/actor/approval","name":"テスト用承認アクター2","_code":{"_value":1000011,"_ver":1},"inherit":null,"description":"テスト用承認アクター2"},"template":{"_code":{"_value":1000011,"_ver":1},"information-site":null,"region":[{"_value":1000021}],"share":null,"store":null},"prop":null,"attribute":null}',
                    NULL,
                    'catalog_registrant', '2021/11/10 11:30:01.087', 'catalog_registrant', '2021/11/10 11:30:01.087'
                );
            `);
            const targetId: number = 303;

            // URLを生成
            const url = Url.updateSetRequestURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    id: targetId,
                    approvalActor: 1000021
                });
            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.CATALOG_NOT_FOUND);
        });
        test('異常 前提：申請 catalog 追加、オペレーターアクターのカタログ参照して承認アクターとの関係確認、参照アクターカタログのregion-allianceが不一致', async () => {
            // カタログ準備
            await common.executeSqlString(`
                INSERT INTO pxr_catalog.ns
                (
                    type, name, description, is_disabled,
                    attributes,
                    created_by, created_at, updated_by, updated_at
                ) VALUES
                (
                    'ext', 'catalog/ext/model/actor/approval/catalog', 'テスト用承認アクターカタログ', False,
                    NULL,
                    'catalog_registrant', '2021/11/09 17:17:01.783', 'catalog_registrant', '2021/11/09 17:17:01.783'
                );
                INSERT INTO pxr_catalog.catalog_item
                (
                    id, code, version, ns_id, name, description,
                    inherit_code, inherit_version, is_reserved, is_disabled,
                    response,
                    attributes,
                    created_by, created_at, updated_by, updated_at
                ) VALUES
                (
                    303, 1000001, 1, 17, 'approval', 'テスト用承認アクターカタログ',
                    NULL, NULL, False, False,
                    '{"catalogItem":{"ns":"catalog/ext/model/actor/approval","name":"テスト用承認アクターカタログ","_code":{"_value":1000001,"_ver":1},"inherit":null,"description":"テスト用承認アクターカタログ"},"template":{"_code":{"_value":1000001,"_ver":1},"information-site":null,"region-alliance":[{"_value":1000031}],"share":null,"store":null},"prop":null,"attribute":null}',
                    NULL,
                    'catalog_registrant', '2021/11/10 11:30:01.087', 'catalog_registrant', '2021/11/10 11:30:01.087'
                );
            `);
            const targetId: number = 303;

            // URLを生成
            const url = Url.updateSetRequestURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    id: targetId,
                    approvalActor: 1000021
                });
            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.INVALID_APPROVAL_ACTOR);
        });
        test('異常 前提：申請 catalog 追加、オペレーターアクターのカタログ参照して承認アクターとの関係確認、参照アクターカタログのregion-allianceが無い', async () => {
            // カタログ準備
            await common.executeSqlString(`
            UPDATE pxr_catalog.catalog_item
            SET response = '{"catalogItem":{"ns":"catalog/ext/model/actor/approval","name":"テスト用承認アクターカタログ","_code":{"_value":1000001,"_ver":1},"inherit":null,"description":"テスト用承認アクターカタログ"},"template":{"_code":{"_value":1000001,"_ver":1},"information-site":null,"region-alliance":null,"share":null,"store":null},"prop":null,"attribute":null}'
            WHERE code = 1000001
            ;
            `);
            const targetId: number = 303;

            // URLを生成
            const url = Url.updateSetRequestURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    id: targetId,
                    approvalActor: 1000021
                });
            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.INVALID_APPROVAL_ACTOR);
        });
        test('異常 前提：申請 catalog 追加、オペレーターアクターのカタログ参照して承認アクターとの関係確認、承認アクターカタログのregionが空配列', async () => {
            // カタログ準備
            await common.executeSqlString(`
            UPDATE pxr_catalog.catalog_item
            SET response = '{"catalogItem":{"ns":"catalog/ext/model/actor/approval","name":"テスト用承認アクター2","_code":{"_value":1000011,"_ver":1},"inherit":null,"description":"テスト用承認アクター2"},"template":{"_code":{"_value":1000011,"_ver":1},"information-site":null,"region":[],"share":null,"store":null},"prop":null,"attribute":null}'
            WHERE code = 1000021
            ;
            `);
            const targetId: number = 303;

            // URLを生成
            const url = Url.updateSetRequestURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    id: targetId,
                    approvalActor: 1000021
                });
            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.INVALID_APPROVAL_ACTOR);
        });
    });
});
