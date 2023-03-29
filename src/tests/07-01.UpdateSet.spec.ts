/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import * as supertest from 'supertest';
import { Application } from '../resources/config/Application';
import Common, { Url } from './Common';
import { Session } from './Session';
import Config from '../common/Config';
import StubOperatorServer from './StubOperatorServer';
import OperatorDomain from '../domains/OperatorDomain';
import { UpdateSetResponse } from './UpdateSetResponse';
import { UpdateSetRequest } from './UpdateSetRequest';
import { UpdateSetStatus } from '../common/UpdateSet';
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
        await common.executeSqlFile('initialCatalogUpdateSet.sql');
        await common.executeSqlFile('catalogCodeScope.sql');
        // await common.executeSqlFile('nameSpace.sql');
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
    let index: number = 0;
    describe('変更セット登録', () => {
        test('正常 前提：なし', async () => {
            // URLを生成
            const url = Url.updateSetRegisterURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(UpdateSetRequest.addlist[index]);

            // レスポンスを生成
            const responseJson = response.body;
            const registAt: string = response.body.registAt;
            responseJson['registAt'] = null;

            // レスポンス期待値を生成
            const responseExpect = UpdateSetResponse.addlist[index];
            responseExpect['registAt'] = null;

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(responseJson).toMatchObject(responseExpect);
            expect(JSON.stringify(responseJson)).toBe(JSON.stringify(responseExpect));
            const dateRegistAt = new Date(registAt);
            const strRegistAt = moment(dateRegistAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strRegistAt).toBe(registAt);
            updateSetIdList.push(response.body.id);
            index++;
        });
        test('正常 前提：Cookie(個人メンバー)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 0);

            // URLを生成
            const url = Url.updateSetRegisterURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_PERSONAL_KEY + '=81654181b851542feec3ee0ba3be7695f1472af4702f3aa2a6aa1971c5e3d645'])
                .send(UpdateSetRequest.addlist[index]);

            // レスポンスを生成
            const responseJson = response.body;
            const registAt: string = response.body.registAt;
            responseJson['registAt'] = null;

            // レスポンス期待値を生成
            const responseExpect = UpdateSetResponse.addlist[index];
            responseExpect['registAt'] = null;

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(responseJson).toMatchObject(responseExpect);
            expect(JSON.stringify(responseJson)).toBe(JSON.stringify(responseExpect));
            const dateRegistAt = new Date(registAt);
            const strRegistAt = moment(dateRegistAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strRegistAt).toBe(registAt);
            updateSetIdList.push(response.body.id);
            index++;
        });
        test('正常 前提：Cookie(アプリケーションメンバー)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 0);

            // URLを生成
            const url = Url.updateSetRegisterURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_APPLICATION_KEY + '=879777267f854aa3fb49993ca2d1488a7ef2ca5c743297ad6f4b155c88c12c16'])
                .send(UpdateSetRequest.addlist[index]);

            // レスポンスを生成
            const responseJson = response.body;
            const registAt: string = response.body.registAt;
            responseJson['registAt'] = null;

            // レスポンス期待値を生成
            const responseExpect = UpdateSetResponse.addlist[index];
            responseExpect['registAt'] = null;

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(responseJson).toMatchObject(responseExpect);
            expect(JSON.stringify(responseJson)).toBe(JSON.stringify(responseExpect));
            const dateRegistAt = new Date(registAt);
            const strRegistAt = moment(dateRegistAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strRegistAt).toBe(registAt);
            updateSetIdList.push(response.body.id);
            index++;
        });
        test('正常 前提：Cookie(アプリケーションメンバー) 変更セット申請/未承認変更セットリスト取得/承認済変更セットリスト取得テスト用', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 0);

            // URLを生成
            const url = Url.updateSetRegisterURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_APPLICATION_KEY + '=879777267f854aa3fb49993ca2d1488a7ef2ca5c743297ad6f4b155c88c12c16'])
                .send(UpdateSetRequest.addlist[index]);

            // レスポンスを生成
            const responseJson = response.body;
            const registAt: string = response.body.registAt;
            responseJson['registAt'] = null;

            // レスポンス期待値を生成
            const responseExpect = UpdateSetResponse.addlist[index];
            responseExpect['registAt'] = null;

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(responseJson).toMatchObject(responseExpect);
            expect(JSON.stringify(responseJson)).toBe(JSON.stringify(responseExpect));
            const dateRegistAt = new Date(registAt);
            const strRegistAt = moment(dateRegistAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strRegistAt).toBe(registAt);
            updateSetIdList.push(response.body.id);
            index++;
        });
        test('正常 前提：Cookie(運営メンバー)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 0);

            // URLを生成
            const url = Url.updateSetRegisterURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send(UpdateSetRequest.addlist[index]);

            // レスポンスを生成
            const responseJson = response.body;
            const registAt: string = response.body.registAt;
            responseJson['registAt'] = null;

            // レスポンス期待値を生成
            const responseExpect = UpdateSetResponse.addlist[index];
            responseExpect['registAt'] = null;

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(responseJson).toMatchObject(responseExpect);
            expect(JSON.stringify(responseJson)).toBe(JSON.stringify(responseExpect));
            const dateRegistAt = new Date(registAt);
            const strRegistAt = moment(dateRegistAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strRegistAt).toBe(registAt);
            updateSetIdList.push(response.body.id);
            index++;
        });
        test('正常 前提：ns 追加', async () => {
            // URLを生成
            const url = Url.updateSetRegisterURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(UpdateSetRequest.addlist[index]);

            // レスポンスを生成
            const responseJson = response.body;
            const registAt: string = response.body.registAt;
            responseJson['registAt'] = null;

            // レスポンス期待値を生成
            const responseExpect = UpdateSetResponse.addlist[index];
            responseExpect['registAt'] = null;

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(responseJson).toMatchObject(responseExpect);
            expect(JSON.stringify(responseJson)).toBe(JSON.stringify(responseExpect));
            const dateRegistAt = new Date(registAt);
            const strRegistAt = moment(dateRegistAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strRegistAt).toBe(registAt);
            updateSetIdList.push(response.body.id);
            index++;
        });
        test('正常 前提：ns 更新', async () => {
            await common.executeSqlString(`
                INSERT INTO pxr_catalog.ns
                (
                    type, name, description,
                    is_disabled, attributes,
                    created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    'model', 'catalog/model/unit-test', 'ユニットテスト用(model)',
                    false, null,
                    'pxr_user', NOW(), 'pxr_user', NOW()
                )
            `);
            // URLを生成
            const url = Url.updateSetRegisterURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(UpdateSetRequest.addlist[index]);

            // レスポンスを生成
            const responseJson = response.body;
            const registAt: string = response.body.registAt;
            responseJson['registAt'] = null;

            // レスポンス期待値を生成
            const responseExpect = UpdateSetResponse.addlist[index];
            responseExpect['registAt'] = null;

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(responseJson).toMatchObject(responseExpect);
            expect(JSON.stringify(responseJson)).toBe(JSON.stringify(responseExpect));
            const dateRegistAt = new Date(registAt);
            const strRegistAt = moment(dateRegistAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strRegistAt).toBe(registAt);
            updateSetIdList.push(response.body.id);
            index++;
        });
        test('正常 前提：ns 削除', async () => {
            // URLを生成
            const url = Url.updateSetRegisterURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(UpdateSetRequest.addlist[index]);

            // レスポンスを生成
            const responseJson = response.body;
            const registAt: string = response.body.registAt;
            responseJson['registAt'] = null;

            // レスポンス期待値を生成
            const responseExpect = UpdateSetResponse.addlist[index];
            responseExpect['registAt'] = null;

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(responseJson).toMatchObject(responseExpect);
            expect(JSON.stringify(responseJson)).toBe(JSON.stringify(responseExpect));
            const dateRegistAt = new Date(registAt);
            const strRegistAt = moment(dateRegistAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strRegistAt).toBe(registAt);
            updateSetIdList.push(response.body.id);
            index++;
        });
        test('正常 前提：catalog 追加', async () => {
            // URLを生成
            const url = Url.updateSetRegisterURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(UpdateSetRequest.addlist[index]);

            // レスポンスを生成
            const responseJson = response.body;
            const registAt: string = response.body.registAt;
            responseJson['registAt'] = null;

            // レスポンス期待値を生成
            const responseExpect = UpdateSetResponse.addlist[index];
            responseExpect['registAt'] = null;

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(responseJson).toMatchObject(responseExpect);
            expect(JSON.stringify(responseJson)).toBe(JSON.stringify(responseExpect));
            const dateRegistAt = new Date(registAt);
            const strRegistAt = moment(dateRegistAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strRegistAt).toBe(registAt);
            updateSetIdList.push(response.body.id);
            index++;
        });
        test('正常 前提：catalog 更新', async () => {
            await common.executeSqlString(`
                INSERT INTO pxr_catalog.catalog_item
                (
                    code, version, ns_id, name, description, inherit_code, inherit_version,
                    is_reserved, is_disabled, response, attributes,
                    created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    11, 1, 1, null, null, null, null,
                    false, false, null, null,
                    'pxr_user', NOW(), 'pxr_user', NOW()
                )
            `);

            // URLを生成
            const url = Url.updateSetRegisterURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(UpdateSetRequest.addlist[index]);

            // レスポンスを生成
            const responseJson = response.body;
            const registAt: string = response.body.registAt;
            responseJson['registAt'] = null;

            // レスポンス期待値を生成
            const responseExpect = UpdateSetResponse.addlist[index];
            responseExpect['registAt'] = null;

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(responseJson).toMatchObject(responseExpect);
            expect(JSON.stringify(responseJson)).toBe(JSON.stringify(responseExpect));
            const dateRegistAt = new Date(registAt);
            const strRegistAt = moment(dateRegistAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strRegistAt).toBe(registAt);
            updateSetIdList.push(response.body.id);
            index++;
        });
        test('正常 前提：複数ns', async () => {
            // URLを生成
            const url = Url.updateSetRegisterURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(UpdateSetRequest.addlist[index]);

            // レスポンスを生成
            const responseJson = response.body;
            const registAt: string = response.body.registAt;
            responseJson['registAt'] = null;

            // レスポンス期待値を生成
            const responseExpect = UpdateSetResponse.addlist[index];
            responseExpect['registAt'] = null;

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(responseJson).toMatchObject(responseExpect);
            expect(JSON.stringify(responseJson)).toBe(JSON.stringify(responseExpect));
            const dateRegistAt = new Date(registAt);
            const strRegistAt = moment(dateRegistAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strRegistAt).toBe(registAt);
            updateSetIdList.push(response.body.id);
            index++;
        });
        test('正常 前提：複数catalog', async () => {
            // URLを生成
            const url = Url.updateSetRegisterURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(UpdateSetRequest.addlist[index]);

            // レスポンスを生成
            const responseJson = response.body;
            const registAt: string = response.body.registAt;
            responseJson['registAt'] = null;

            // レスポンス期待値を生成
            const responseExpect = UpdateSetResponse.addlist[index];
            responseExpect['registAt'] = null;

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(responseJson).toMatchObject(responseExpect);
            expect(JSON.stringify(responseJson)).toBe(JSON.stringify(responseExpect));
            const dateRegistAt = new Date(registAt);
            const strRegistAt = moment(dateRegistAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strRegistAt).toBe(registAt);
            updateSetIdList.push(response.body.id);
            index++;
        });
        test('正常 前提：複数catalog継承 追加', async () => {
            // URLを生成
            const url = Url.updateSetRegisterURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(UpdateSetRequest.addlist[index]);

            // レスポンスを生成
            const responseJson = response.body;
            const registAt: string = response.body.registAt;
            responseJson['registAt'] = null;

            // レスポンス期待値を生成
            const responseExpect = UpdateSetResponse.addlist[index];
            responseExpect['registAt'] = null;

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(responseJson).toMatchObject(responseExpect);
            expect(JSON.stringify(responseJson)).toBe(JSON.stringify(responseExpect));
            const dateRegistAt = new Date(registAt);
            const strRegistAt = moment(dateRegistAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strRegistAt).toBe(registAt);
            updateSetIdList.push(response.body.id);
            index++;
        });
        test('正常 前提：複数catalog継承 変更', async () => {
            // URLを生成
            const url = Url.updateSetRegisterURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(UpdateSetRequest.addlist[index]);

            // レスポンスを生成
            const responseJson = response.body;
            const registAt: string = response.body.registAt;
            responseJson['registAt'] = null;

            // レスポンス期待値を生成
            const responseExpect = UpdateSetResponse.addlist[index];
            responseExpect['registAt'] = null;

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(responseJson).toMatchObject(responseExpect);
            expect(JSON.stringify(responseJson)).toBe(JSON.stringify(responseExpect));
            const dateRegistAt = new Date(registAt);
            const strRegistAt = moment(dateRegistAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strRegistAt).toBe(registAt);
            updateSetIdList.push(response.body.id);
            index++;
        });
        test('正常 前提：catalog code,version:null', async () => {
            // URLを生成
            const url = Url.updateSetRegisterURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(UpdateSetRequest.addlist[index]);

            // レスポンスを生成
            const responseJson = response.body;
            const registAt: string = response.body.registAt;
            responseJson['registAt'] = null;

            // レスポンス期待値を生成
            const responseExpect = UpdateSetResponse.addlist[index];
            responseExpect['registAt'] = null;

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(responseJson).toMatchObject(responseExpect);
            expect(JSON.stringify(responseJson)).toBe(JSON.stringify(responseExpect));
            const dateRegistAt = new Date(registAt);
            const strRegistAt = moment(dateRegistAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strRegistAt).toBe(registAt);
            updateSetIdList.push(response.body.id);
            index++;
        });
        test('正常 前提：catalog code:null', async () => {
            // URLを生成
            const url = Url.updateSetRegisterURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(UpdateSetRequest.addlist[index]);

            // レスポンスを生成
            const responseJson = response.body;
            const registAt: string = response.body.registAt;
            responseJson['registAt'] = null;

            // レスポンス期待値を生成
            const responseExpect = UpdateSetResponse.addlist[index];
            responseExpect['registAt'] = null;

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(responseJson).toMatchObject(responseExpect);
            expect(JSON.stringify(responseJson)).toBe(JSON.stringify(responseExpect));
            const dateRegistAt = new Date(registAt);
            const strRegistAt = moment(dateRegistAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strRegistAt).toBe(registAt);
            updateSetIdList.push(response.body.id);
            index++;
        });
        test('正常 前提：catalog 削除', async () => {
            // URLを生成
            const url = Url.updateSetRegisterURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(UpdateSetRequest.addlist[index]);

            // レスポンスを生成
            const responseJson = response.body;
            const registAt: string = response.body.registAt;
            responseJson['registAt'] = null;

            // レスポンス期待値を生成
            const responseExpect = UpdateSetResponse.addlist[index];
            responseExpect['registAt'] = null;

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(responseJson).toMatchObject(responseExpect);
            expect(JSON.stringify(responseJson)).toBe(JSON.stringify(responseExpect));
            const dateRegistAt = new Date(registAt);
            const strRegistAt = moment(dateRegistAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strRegistAt).toBe(registAt);
            updateSetIdList.push(response.body.id);
            index++;
        });
        test('正常 前提：attribute 追加', async () => {
            // URLを生成
            const url = Url.updateSetRegisterURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(UpdateSetRequest.addlist[index]);

            // レスポンスを生成
            const responseJson = response.body;
            const registAt: string = response.body.registAt;
            responseJson['registAt'] = null;

            // レスポンス期待値を生成
            const responseExpect = UpdateSetResponse.addlist[index];
            responseExpect['registAt'] = null;

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(responseJson).toMatchObject(responseExpect);
            expect(JSON.stringify(responseJson)).toBe(JSON.stringify(responseExpect));
            const dateRegistAt = new Date(registAt);
            const strRegistAt = moment(dateRegistAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strRegistAt).toBe(registAt);
            updateSetIdList.push(response.body.id);
            index++;
        });
        test('正常 前提：複数attribute', async () => {
            // URLを生成
            const url = Url.updateSetRegisterURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(UpdateSetRequest.addlist[index]);

            // レスポンスを生成
            const responseJson = response.body;
            const registAt: string = response.body.registAt;
            responseJson['registAt'] = null;

            // レスポンス期待値を生成
            const responseExpect = UpdateSetResponse.addlist[index];
            responseExpect['registAt'] = null;

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(responseJson).toMatchObject(responseExpect);
            expect(JSON.stringify(responseJson)).toBe(JSON.stringify(responseExpect));
            const dateRegistAt = new Date(registAt);
            const strRegistAt = moment(dateRegistAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strRegistAt).toBe(registAt);
            updateSetIdList.push(response.body.id);
            index++;
        });
        test('正常 前提：attribute 更新', async () => {
            // URLを生成
            const url = Url.updateSetRegisterURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(UpdateSetRequest.addlist[index]);

            // レスポンスを生成
            const responseJson = response.body;
            const registAt: string = response.body.registAt;
            responseJson['registAt'] = null;

            // レスポンス期待値を生成
            const responseExpect = UpdateSetResponse.addlist[index];
            responseExpect['registAt'] = null;

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(responseJson).toMatchObject(responseExpect);
            expect(JSON.stringify(responseJson)).toBe(JSON.stringify(responseExpect));
            const dateRegistAt = new Date(registAt);
            const strRegistAt = moment(dateRegistAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strRegistAt).toBe(registAt);
            updateSetIdList.push(response.body.id);
            index++;
        });
        test('正常 前提：attribute 削除', async () => {
            // URLを生成
            const url = Url.updateSetRegisterURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(UpdateSetRequest.addlist[index]);

            // レスポンスを生成
            const responseJson = response.body;
            const registAt: string = response.body.registAt;
            responseJson['registAt'] = null;

            // レスポンス期待値を生成
            const responseExpect = UpdateSetResponse.addlist[index];
            responseExpect['registAt'] = null;

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(responseJson).toMatchObject(responseExpect);
            expect(JSON.stringify(responseJson)).toBe(JSON.stringify(responseExpect));
            const dateRegistAt = new Date(registAt);
            const strRegistAt = moment(dateRegistAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strRegistAt).toBe(registAt);
            updateSetIdList.push(response.body.id);
            index++;
        });
        test('正常 前提：カタログ追加(nsタイプがbuilt_in)', async () => {
            // URLを生成
            const url = Url.updateSetRegisterURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(UpdateSetRequest.addlist[index]);

            // レスポンスを生成
            const responseJson = response.body;
            const registAt: string = response.body.registAt;
            responseJson['registAt'] = null;

            // レスポンス期待値を生成
            const responseExpect = UpdateSetResponse.addlist[index];
            responseExpect['registAt'] = null;

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(responseJson).toMatchObject(responseExpect);
            expect(JSON.stringify(responseJson)).toBe(JSON.stringify(responseExpect));
            const dateRegistAt = new Date(registAt);
            const strRegistAt = moment(dateRegistAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strRegistAt).toBe(registAt);
        });
    });

    /**
     * 変更セット登録変更
     */
    describe('変更セット登録変更', () => {
        test('正常 前提：なし', async () => {
            // インデックスを初期化
            index = 0;

            // URLを生成
            const url = urljoin(Url.updateSetRegisterURI, updateSetIdList[index].toString());

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(UpdateSetRequest.addlist[index]);

            // レスポンスを生成
            const responseJson = response.body;
            const registAt: string = response.body.registAt;
            responseJson['registAt'] = null;

            // レスポンス期待値を生成
            const responseExpect = UpdateSetResponse.addlist[index];
            responseExpect['registAt'] = null;

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(responseJson).toMatchObject(responseExpect);
            expect(JSON.stringify(responseJson)).toBe(JSON.stringify(responseExpect));
            const dateRegistAt = new Date(registAt);
            const strRegistAt = moment(dateRegistAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strRegistAt).toBe(registAt);
            index++;
        });
        test('正常 前提：Cookie(個人メンバー)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 0);

            // URLを生成
            const url = urljoin(Url.updateSetRegisterURI, updateSetIdList[index].toString());

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_PERSONAL_KEY + '=81654181b851542feec3ee0ba3be7695f1472af4702f3aa2a6aa1971c5e3d645'])
                .send(UpdateSetRequest.addlist[index]);

            // レスポンスを生成
            const responseJson = response.body;
            const registAt: string = response.body.registAt;
            responseJson['registAt'] = null;

            // レスポンス期待値を生成
            const responseExpect = UpdateSetResponse.addlist[index];
            responseExpect['registAt'] = null;

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(responseJson).toMatchObject(responseExpect);
            expect(JSON.stringify(responseJson)).toBe(JSON.stringify(responseExpect));
            const dateRegistAt = new Date(registAt);
            const strRegistAt = moment(dateRegistAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strRegistAt).toBe(registAt);
            updateSetIdList.push(response.body.id);
            index++;
        });
        test('正常 前提：Cookie(アプリケーションメンバー)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 0);

            // URLを生成
            const url = urljoin(Url.updateSetRegisterURI, updateSetIdList[index].toString());

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_APPLICATION_KEY + '=879777267f854aa3fb49993ca2d1488a7ef2ca5c743297ad6f4b155c88c12c16'])
                .send(UpdateSetRequest.addlist[index]);

            // レスポンスを生成
            const responseJson = response.body;
            const registAt: string = response.body.registAt;
            responseJson['registAt'] = null;

            // レスポンス期待値を生成
            const responseExpect = UpdateSetResponse.addlist[index];
            responseExpect['registAt'] = null;

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(responseJson).toMatchObject(responseExpect);
            expect(JSON.stringify(responseJson)).toBe(JSON.stringify(responseExpect));
            const dateRegistAt = new Date(registAt);
            const strRegistAt = moment(dateRegistAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strRegistAt).toBe(registAt);
            updateSetIdList.push(response.body.id);
            index++;
        });
        test('正常 前提：Cookie(運営メンバー)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 0);

            // URLを生成
            const url = urljoin(Url.updateSetRegisterURI, updateSetIdList[index].toString());

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send(UpdateSetRequest.addlist[index]);

            // レスポンスを生成
            const responseJson = response.body;
            const registAt: string = response.body.registAt;
            responseJson['registAt'] = null;

            // レスポンス期待値を生成
            const responseExpect = UpdateSetResponse.addlist[index];
            responseExpect['registAt'] = null;

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(responseJson).toMatchObject(responseExpect);
            expect(JSON.stringify(responseJson)).toBe(JSON.stringify(responseExpect));
            const dateRegistAt = new Date(registAt);
            const strRegistAt = moment(dateRegistAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strRegistAt).toBe(registAt);
            updateSetIdList.push(response.body.id);
            index++;
        });
        test('正常 前提：ns 追加', async () => {
            // URLを生成
            const url = urljoin(Url.updateSetRegisterURI, updateSetIdList[index].toString());

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(UpdateSetRequest.addlist[index]);

            // レスポンスを生成
            const responseJson = response.body;
            const registAt: string = response.body.registAt;
            responseJson['registAt'] = null;

            // レスポンス期待値を生成
            const responseExpect = UpdateSetResponse.addlist[index];
            responseExpect['registAt'] = null;

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(responseJson).toMatchObject(responseExpect);
            expect(JSON.stringify(responseJson)).toBe(JSON.stringify(responseExpect));
            const dateRegistAt = new Date(registAt);
            const strRegistAt = moment(dateRegistAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strRegistAt).toBe(registAt);
            updateSetIdList.push(response.body.id);
            index++;
        });
        test('正常 前提：ns 更新', async () => {
            // URLを生成
            const url = urljoin(Url.updateSetRegisterURI, updateSetIdList[index].toString());

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(UpdateSetRequest.addlist[index]);

            // レスポンスを生成
            const responseJson = response.body;
            const registAt: string = response.body.registAt;
            responseJson['registAt'] = null;

            // レスポンス期待値を生成
            const responseExpect = UpdateSetResponse.addlist[index];
            responseExpect['registAt'] = null;

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(responseJson).toMatchObject(responseExpect);
            expect(JSON.stringify(responseJson)).toBe(JSON.stringify(responseExpect));
            const dateRegistAt = new Date(registAt);
            const strRegistAt = moment(dateRegistAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strRegistAt).toBe(registAt);
            updateSetIdList.push(response.body.id);
            index++;
        });
        test('正常 前提：ns 削除', async () => {
            // URLを生成
            const url = urljoin(Url.updateSetRegisterURI, updateSetIdList[index].toString());

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(UpdateSetRequest.addlist[index]);

            // レスポンスを生成
            const responseJson = response.body;
            const registAt: string = response.body.registAt;
            responseJson['registAt'] = null;

            // レスポンス期待値を生成
            const responseExpect = UpdateSetResponse.addlist[index];
            responseExpect['registAt'] = null;

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(responseJson).toMatchObject(responseExpect);
            expect(JSON.stringify(responseJson)).toBe(JSON.stringify(responseExpect));
            const dateRegistAt = new Date(registAt);
            const strRegistAt = moment(dateRegistAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strRegistAt).toBe(registAt);
            updateSetIdList.push(response.body.id);
            index++;
        });
        test('正常 前提：catalog 追加', async () => {
            // URLを生成
            const url = urljoin(Url.updateSetRegisterURI, updateSetIdList[index].toString());

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(UpdateSetRequest.addlist[index]);

            // レスポンスを生成
            const responseJson = response.body;
            const registAt: string = response.body.registAt;
            responseJson['registAt'] = null;

            // レスポンス期待値を生成
            const responseExpect = UpdateSetResponse.addlist[index];
            responseExpect['registAt'] = null;

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(responseJson).toMatchObject(responseExpect);
            expect(JSON.stringify(responseJson)).toBe(JSON.stringify(responseExpect));
            const dateRegistAt = new Date(registAt);
            const strRegistAt = moment(dateRegistAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strRegistAt).toBe(registAt);
            updateSetIdList.push(response.body.id);
            index++;
        });
        test('正常 前提：catalog 更新', async () => {
            // URLを生成
            const url = urljoin(Url.updateSetRegisterURI, updateSetIdList[index].toString());

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(UpdateSetRequest.addlist[index]);

            // レスポンスを生成
            const responseJson = response.body;
            const registAt: string = response.body.registAt;
            responseJson['registAt'] = null;

            // レスポンス期待値を生成
            const responseExpect = UpdateSetResponse.addlist[index];
            responseExpect['registAt'] = null;

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(responseJson).toMatchObject(responseExpect);
            expect(JSON.stringify(responseJson)).toBe(JSON.stringify(responseExpect));
            const dateRegistAt = new Date(registAt);
            const strRegistAt = moment(dateRegistAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strRegistAt).toBe(registAt);
            updateSetIdList.push(response.body.id);
            index++;
        });
        test('正常 前提：複数ns', async () => {
            // URLを生成
            const url = urljoin(Url.updateSetRegisterURI, updateSetIdList[index].toString());

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(UpdateSetRequest.addlist[index]);

            // レスポンスを生成
            const responseJson = response.body;
            const registAt: string = response.body.registAt;
            responseJson['registAt'] = null;

            // レスポンス期待値を生成
            const responseExpect = UpdateSetResponse.addlist[index];
            responseExpect['registAt'] = null;

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(responseJson).toMatchObject(responseExpect);
            expect(JSON.stringify(responseJson)).toBe(JSON.stringify(responseExpect));
            const dateRegistAt = new Date(registAt);
            const strRegistAt = moment(dateRegistAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strRegistAt).toBe(registAt);
            updateSetIdList.push(response.body.id);
            index++;
        });
        test('正常 前提：複数catalog', async () => {
            // URLを生成
            const url = urljoin(Url.updateSetRegisterURI, updateSetIdList[index].toString());

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(UpdateSetRequest.addlist[index]);

            // レスポンスを生成
            const responseJson = response.body;
            const registAt: string = response.body.registAt;
            responseJson['registAt'] = null;

            // レスポンス期待値を生成
            const responseExpect = UpdateSetResponse.addlist[index];
            responseExpect['registAt'] = null;

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(responseJson).toMatchObject(responseExpect);
            expect(JSON.stringify(responseJson)).toBe(JSON.stringify(responseExpect));
            const dateRegistAt = new Date(registAt);
            const strRegistAt = moment(dateRegistAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strRegistAt).toBe(registAt);
            updateSetIdList.push(response.body.id);
            index++;
        });
        test('正常 前提：複数catalog継承 追加', async () => {
            // URLを生成
            const url = urljoin(Url.updateSetRegisterURI, updateSetIdList[index].toString());

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(UpdateSetRequest.addlist[index]);

            // レスポンスを生成
            const responseJson = response.body;
            const registAt: string = response.body.registAt;
            responseJson['registAt'] = null;

            // レスポンス期待値を生成
            const responseExpect = UpdateSetResponse.addlist[index];
            responseExpect['registAt'] = null;

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(responseJson).toMatchObject(responseExpect);
            expect(JSON.stringify(responseJson)).toBe(JSON.stringify(responseExpect));
            const dateRegistAt = new Date(registAt);
            const strRegistAt = moment(dateRegistAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strRegistAt).toBe(registAt);
            updateSetIdList.push(response.body.id);
            index++;
        });
        test('正常 前提：複数catalog継承 変更', async () => {
            // URLを生成
            const url = urljoin(Url.updateSetRegisterURI, updateSetIdList[index].toString());

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(UpdateSetRequest.addlist[index]);

            // レスポンスを生成
            const responseJson = response.body;
            const registAt: string = response.body.registAt;
            responseJson['registAt'] = null;

            // レスポンス期待値を生成
            const responseExpect = UpdateSetResponse.addlist[index];
            responseExpect['registAt'] = null;

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(responseJson).toMatchObject(responseExpect);
            expect(JSON.stringify(responseJson)).toBe(JSON.stringify(responseExpect));
            const dateRegistAt = new Date(registAt);
            const strRegistAt = moment(dateRegistAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strRegistAt).toBe(registAt);
            updateSetIdList.push(response.body.id);
            index++;
        });
        test('正常 前提：catalog code,version:null', async () => {
            // URLを生成
            const url = urljoin(Url.updateSetRegisterURI, updateSetIdList[index].toString());

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(UpdateSetRequest.addlist[index]);

            // レスポンスを生成
            const responseJson = response.body;
            const registAt: string = response.body.registAt;
            responseJson['registAt'] = null;

            // レスポンス期待値を生成
            const responseExpect = UpdateSetResponse.addlist[index];
            responseExpect['registAt'] = null;

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(responseJson).toMatchObject(responseExpect);
            expect(JSON.stringify(responseJson)).toBe(JSON.stringify(responseExpect));
            const dateRegistAt = new Date(registAt);
            const strRegistAt = moment(dateRegistAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strRegistAt).toBe(registAt);
            updateSetIdList.push(response.body.id);
            index++;
        });
        test('正常 前提：catalog code:null', async () => {
            // URLを生成
            const url = urljoin(Url.updateSetRegisterURI, updateSetIdList[index].toString());

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(UpdateSetRequest.addlist[index]);

            // レスポンスを生成
            const responseJson = response.body;
            const registAt: string = response.body.registAt;
            responseJson['registAt'] = null;

            // レスポンス期待値を生成
            const responseExpect = UpdateSetResponse.addlist[index];
            responseExpect['registAt'] = null;

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(responseJson).toMatchObject(responseExpect);
            expect(JSON.stringify(responseJson)).toBe(JSON.stringify(responseExpect));
            const dateRegistAt = new Date(registAt);
            const strRegistAt = moment(dateRegistAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strRegistAt).toBe(registAt);
            updateSetIdList.push(response.body.id);
            index++;
        });
        test('正常 前提：catalog 削除', async () => {
            // URLを生成
            const url = urljoin(Url.updateSetRegisterURI, updateSetIdList[index].toString());

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(UpdateSetRequest.addlist[index]);

            // レスポンスを生成
            const responseJson = response.body;
            const registAt: string = response.body.registAt;
            responseJson['registAt'] = null;

            // レスポンス期待値を生成
            const responseExpect = UpdateSetResponse.addlist[index];
            responseExpect['registAt'] = null;

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(responseJson).toMatchObject(responseExpect);
            expect(JSON.stringify(responseJson)).toBe(JSON.stringify(responseExpect));
            const dateRegistAt = new Date(registAt);
            const strRegistAt = moment(dateRegistAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strRegistAt).toBe(registAt);
            updateSetIdList.push(response.body.id);
            index++;
        });
        test('正常 前提：attribute 追加', async () => {
            // URLを生成
            const url = urljoin(Url.updateSetRegisterURI, updateSetIdList[index].toString());

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(UpdateSetRequest.addlist[index]);

            // レスポンスを生成
            const responseJson = response.body;
            const registAt: string = response.body.registAt;
            responseJson['registAt'] = null;

            // レスポンス期待値を生成
            const responseExpect = UpdateSetResponse.addlist[index];
            responseExpect['registAt'] = null;

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(responseJson).toMatchObject(responseExpect);
            expect(JSON.stringify(responseJson)).toBe(JSON.stringify(responseExpect));
            const dateRegistAt = new Date(registAt);
            const strRegistAt = moment(dateRegistAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strRegistAt).toBe(registAt);
            updateSetIdList.push(response.body.id);
            index++;
        });
    });

    /**
     * 変更セット情報取得
     */
    describe('変更セット情報取得', () => {
        test('正常 前提：なし', async () => {
            // インデックスを初期化
            index = 0;

            // URLを生成
            const url = urljoin(Url.updateSetSearchInfoURI, updateSetIdList[index].toString());

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスを生成
            const responseJson = response.body;
            const registAt: string = response.body.registAt;
            responseJson['registAt'] = null;

            // レスポンス期待値を生成
            const responseExpect = UpdateSetResponse.addlist[index];
            responseExpect['registAt'] = null;

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(responseJson).toMatchObject(responseExpect);
            expect(JSON.stringify(responseJson)).toBe(JSON.stringify(responseExpect));
            const dateRegistAt = new Date(registAt);
            const strRegistAt = moment(dateRegistAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strRegistAt).toBe(registAt);
            index++;
        });
        test('正常 前提：存在しないID指定', async () => {
            // URLを生成
            const url = urljoin(Url.updateSetSearchInfoURI, '999');

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
        test('正常 前提：なし', async () => {
            // URLを生成
            const url = Url.updateSetSearchRequestURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            const responseJson = response.body;
            const registAtList: string[] = [];
            for (let listIndex = 0; listIndex < responseJson.length; listIndex++) {
                registAtList.push(responseJson[listIndex]['registAt']);
                responseJson[listIndex]['registAt'] = null;
            }
            const responseExpect: {}[] = [];
            for (let listIndex = 0; listIndex < UpdateSetResponse.addlist.length; listIndex++) {
                const info: {} = UpdateSetResponse.addlist[listIndex];
                delete info['ns'];
                delete info['catalog'];
                delete info['attribute'];
                delete info['appendix'];
                responseExpect.push(info);
            }

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(responseJson).toMatchObject(responseExpect);
            expect(JSON.stringify(responseJson)).toBe(JSON.stringify(responseExpect));

            // 日付書式チェック
            for (let listIndex = 0; listIndex < responseJson.length; listIndex++) {
                const dateRegistAt = new Date(registAtList[listIndex]);
                const strRegistAt = moment(dateRegistAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
                expect(strRegistAt).toBe(registAtList[listIndex]);
            }
        });
    });

    /**
     * 変更セット登録削除
     */
    describe('変更セット登録削除', () => {
        test('正常 前提：なし', async () => {
            // URLを生成
            const url = urljoin(Url.updateSetRegisterURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .delete(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            const responseJson: {} = {
                id: 1
            };

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(responseJson);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(responseJson));
        });
    });

    /**
     * 変更セット申請・自動承認
     */
    describe('変更セット申請', () => {
        test('正常 前提：申請 ns 追加', async () => {
            const targetId: number = 6;

            // URLを生成
            const url = Url.updateSetRequestURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    id: targetId,
                    approvalActor: 1000001
                });

            // 日付を確保
            const approvalAt: string = response.body.approvalAt;
            const registAt: string = response.body.registAt;
            const body = response.body;
            body['approvalAt'] = null;
            body['registAt'] = null;

            // 想定レスポンスを作成
            const responseJson: {} = {
                id: targetId,
                name: '新規変更セット名',
                description: '新規変更セット(説明)',
                callerActorCode: 1000001,
                approvalActorCode: 1000001,
                approver: 'loginid',
                approvalAt: null,
                comment: null,
                status: UpdateSetStatus.APPROVAL,
                registerActorCode: 1000001,
                register: 'loginid',
                registAt: null,
                ns: [
                    {
                        type: 1,
                        nsId: 4,
                        comment: null,
                        template: {
                            ns: 'catalog/model/unit',
                            description: 'ユニットテストネームスペース'
                        }
                    }
                ],
                catalog: null,
                attribute: null,
                appendix: null
            };

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(body).toMatchObject(responseJson);
            expect(JSON.stringify(body)).toBe(JSON.stringify(responseJson));

            // 日付書式チェック
            const dateApprovalAt = new Date(approvalAt);
            const strApprovalAt = moment(dateApprovalAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strApprovalAt).toBe(approvalAt);
            const dateRegistAt = new Date(registAt);
            const strRegistAt = moment(dateRegistAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strRegistAt).toBe(registAt);
        });
        test('正常 前提：申請 ns 更新', async () => {
            const targetId: number = 7;

            // URLを生成
            const url = Url.updateSetRequestURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    id: targetId,
                    approvalActor: 1000001
                });

            // 日付を確保
            const approvalAt: string = response.body.approvalAt;
            const registAt: string = response.body.registAt;
            const body = response.body;
            body['approvalAt'] = null;
            body['registAt'] = null;

            // 想定レスポンスを作成
            const responseJson: {} = {
                id: targetId,
                name: '新規変更セット名',
                description: '新規変更セット(説明)',
                callerActorCode: 1000001,
                approvalActorCode: 1000001,
                approver: 'loginid',
                approvalAt: null,
                comment: null,
                status: UpdateSetStatus.APPROVAL,
                registerActorCode: 1000001,
                register: 'loginid',
                registAt: null,
                ns: [
                    {
                        type: 2,
                        nsId: 1,
                        comment: null,
                        template: {
                            ns: 'catalog/built_in/unit/update',
                            description: 'ユニットテストネームスペース'
                        }
                    }
                ],
                catalog: null,
                attribute: null,
                appendix: null
            };

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(body).toMatchObject(responseJson);
            expect(JSON.stringify(body)).toBe(JSON.stringify(responseJson));

            // 日付書式チェック
            const dateApprovalAt = new Date(approvalAt);
            const strApprovalAt = moment(dateApprovalAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strApprovalAt).toBe(approvalAt);
            const dateRegistAt = new Date(registAt);
            const strRegistAt = moment(dateRegistAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strRegistAt).toBe(registAt);
        });
        test('正常 前提：申請 ns 削除(異常 前提：承認 ns 削除(カタログ使用中))', async () => {
            const targetId: number = 8;

            // URLを生成
            const url = Url.updateSetRequestURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    id: targetId,
                    approvalActor: 1000001
                });

            // // 日付を確保
            // const registAt: string = response.body.registAt;
            // const body = response.body;
            // body['registAt'] = null;

            // // 想定レスポンスを作成
            // const responseJson: {} = {
            //     id: targetId,
            //     name: '新規変更セット名',
            //     description: '新規変更セット(説明)',
            //     callerActorCode: 1000001,
            //     approvalActorCode: 1000001,
            //     approver: null,
            //     approvalAt: null,
            //     comment: null,
            //     status: UpdateSetStatus.REQUEST,
            //     registerActorCode: 1000001,
            //     register: 'loginid',
            //     registAt: null,
            //     ns: [
            //         {
            //             type: 3,
            //             nsId: 1,
            //             comment: null,
            //             template: null
            //         }
            //     ],
            //     catalog: null,
            //     attribute: null,
            //     appendix: null
            // };

            // // レスポンスチェック
            // expect(response.status).toBe(200);
            // expect(body).toMatchObject(responseJson);
            // expect(JSON.stringify(body)).toBe(JSON.stringify(responseJson));

            // // 日付書式チェック
            // const dateRegistAt = new Date(registAt);
            // const strRegistAt = moment(dateRegistAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            // expect(strRegistAt).toBe(registAt);

            // レスポンスチェック
            expect(response.status).toBe(409);
            expect(response.body.message).toBe(Message.NAMESPACE_USED);
        });
        test('正常 前提：申請 catalog 追加', async () => {
            const targetId: number = 9;

            // URLを生成
            const url = Url.updateSetRequestURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    id: targetId,
                    approvalActor: 1000001
                });

            // 日付を確保
            const approvalAt: string = response.body.approvalAt;
            const registAt: string = response.body.registAt;
            const body = response.body;
            body['approvalAt'] = null;
            body['registAt'] = null;

            // 想定レスポンスを作成
            const responseJson: {} = {
                id: targetId,
                name: '新規変更セット名',
                description: '新規変更セット(説明)',
                callerActorCode: 1000001,
                approvalActorCode: 1000001,
                approver: 'loginid',
                approvalAt: null,
                comment: null,
                status: UpdateSetStatus.APPROVAL,
                registerActorCode: 1000001,
                register: 'loginid',
                registAt: null,
                ns: [
                    {
                        type: 1,
                        nsId: 5,
                        comment: null,
                        template: {
                            ns: 'catalog/ext/unit/catalog',
                            description: 'ユニットテストネームスペース'
                        }
                    }
                ],
                catalog: [
                    {
                        type: 1,
                        catalogCode: null,
                        comment: null,
                        template: {
                            catalogItem: {
                                ns: 'catalog/ext/unit/catalog',
                                name: 'cm',
                                description: 'センチメートル',
                                _code: {
                                    _value: 1000012,
                                    _ver: 1
                                },
                                inherit: null
                            },
                            template: {
                                prop: null,
                                value: null
                            },
                            inner: null
                        }
                    }
                ],
                attribute: null,
                appendix: null
            };

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(body).toMatchObject(responseJson);
            expect(JSON.stringify(body)).toBe(JSON.stringify(responseJson));

            // 日付書式チェック
            const dateApprovalAt = new Date(approvalAt);
            const strApprovalAt = moment(dateApprovalAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strApprovalAt).toBe(approvalAt);
            const dateRegistAt = new Date(registAt);
            const strRegistAt = moment(dateRegistAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strRegistAt).toBe(registAt);
        });
        test('正常 前提：申請 catalog 更新', async () => {
            const targetId: number = 10;

            // URLを生成
            const url = Url.updateSetRequestURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    id: targetId,
                    approvalActor: 1000001
                });

            // 日付を確保
            const approvalAt: string = response.body.approvalAt;
            const registAt: string = response.body.registAt;
            const body = response.body;
            body['approvalAt'] = null;
            body['registAt'] = null;

            // 想定レスポンスを作成
            const responseJson: {} = {
                id: targetId,
                name: '新規変更セット名',
                description: '新規変更セット(説明)',
                callerActorCode: 1000001,
                approvalActorCode: 1000001,
                approver: 'loginid',
                approvalAt: null,
                comment: null,
                status: UpdateSetStatus.APPROVAL,
                registerActorCode: 1000001,
                register: 'loginid',
                registAt: null,
                ns: [
                    {
                        type: 1,
                        nsId: 6,
                        comment: null,
                        template: {
                            ns: 'catalog/model/unit/catalog/update',
                            description: 'ユニットテストネームスペース'
                        }
                    }
                ],
                catalog: [
                    {
                        type: 2,
                        catalogCode: null,
                        comment: null,
                        template: {
                            catalogItem: {
                                ns: 'catalog/model/unit/catalog/update',
                                name: 'cm',
                                description: 'センチメートル',
                                _code: {
                                    _value: 11,
                                    _ver: 2
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
                                                        _value: 46,
                                                        _ver: 1
                                                    }
                                                ],
                                                base: null
                                            }
                                        },
                                        description: 'モノの配列'
                                    }
                                ],
                                value: []
                            },
                            inner: null
                        }
                    }
                ],
                attribute: null,
                appendix: null
            };

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(body).toMatchObject(responseJson);
            expect(JSON.stringify(body)).toBe(JSON.stringify(responseJson));

            // 日付書式チェック
            const dateApprovalAt = new Date(approvalAt);
            const strApprovalAt = moment(dateApprovalAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strApprovalAt).toBe(approvalAt);
            const dateRegistAt = new Date(registAt);
            const strRegistAt = moment(dateRegistAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strRegistAt).toBe(registAt);
        });
        test('正常 前提：申請 ns 複数', async () => {
            const targetId: number = 11;

            // URLを生成
            const url = Url.updateSetRequestURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    id: targetId,
                    approvalActor: 1000001
                });

            // 日付を確保
            const approvalAt: string = response.body.approvalAt;
            const registAt: string = response.body.registAt;
            const body = response.body;
            body['approvalAt'] = null;
            body['registAt'] = null;

            // 想定レスポンスを作成
            const responseJson: {} = {
                id: targetId,
                name: '新規変更セット名',
                description: '新規変更セット(説明)',
                callerActorCode: 1000001,
                approvalActorCode: 1000001,
                approver: 'loginid',
                approvalAt: null,
                comment: null,
                status: UpdateSetStatus.APPROVAL,
                registerActorCode: 1000001,
                register: 'loginid',
                registAt: null,
                ns: [
                    {
                        type: 1,
                        nsId: 7,
                        comment: null,
                        template: {
                            ns: 'catalog/model/unit/multi/1',
                            description: 'ユニットテストネームスペース1'
                        }
                    },
                    {
                        type: 1,
                        nsId: 8,
                        comment: null,
                        template: {
                            ns: 'catalog/model/unit/multi/2',
                            description: 'ユニットテストネームスペース2'
                        }
                    }
                ],
                catalog: null,
                attribute: null,
                appendix: null
            };

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(body).toMatchObject(responseJson);
            expect(JSON.stringify(body)).toBe(JSON.stringify(responseJson));

            // 日付書式チェック
            const dateApprovalAt = new Date(approvalAt);
            const strApprovalAt = moment(dateApprovalAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strApprovalAt).toBe(approvalAt);
            const dateRegistAt = new Date(registAt);
            const strRegistAt = moment(dateRegistAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strRegistAt).toBe(registAt);
        });
        test('正常 前提：申請 catalog 複数', async () => {
            const targetId: number = 12;

            // URLを生成
            const url = Url.updateSetRequestURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    id: targetId,
                    approvalActor: 1000001
                });

            // 日付を確保
            const approvalAt: string = response.body.approvalAt;
            const registAt: string = response.body.registAt;
            const body = response.body;
            body['approvalAt'] = null;
            body['registAt'] = null;

            // 想定レスポンスを作成
            const responseJson: {} = {
                id: targetId,
                name: '新規変更セット名',
                description: '新規変更セット(説明)',
                callerActorCode: 1000001,
                approvalActorCode: 1000001,
                approver: 'loginid',
                approvalAt: null,
                comment: null,
                status: UpdateSetStatus.APPROVAL,
                registerActorCode: 1000001,
                register: 'loginid',
                registAt: null,
                ns: [
                    {
                        type: 1,
                        nsId: 9,
                        comment: null,
                        template: {
                            ns: 'catalog/model/unit/multi/3',
                            description: 'ユニットテストネームスペース3'
                        }
                    },
                    {
                        type: 1,
                        nsId: 10,
                        comment: null,
                        template: {
                            ns: 'catalog/model/unit/multi/4',
                            description: 'ユニットテストネームスペース4'
                        }
                    }
                ],
                catalog: [
                    {
                        type: 1,
                        catalogCode: null,
                        comment: null,
                        template: {
                            catalogItem: {
                                ns: 'catalog/model/unit/multi/3',
                                name: 'cm',
                                description: 'センチメートル',
                                _code: {
                                    _value: 21,
                                    _ver: 1
                                },
                                inherit: null
                            },
                            template: {
                                prop: null,
                                value: null
                            },
                            inner: null
                        }
                    },
                    {
                        type: 1,
                        catalogCode: null,
                        comment: null,
                        template: {
                            catalogItem: {
                                ns: 'catalog/model/unit/multi/4',
                                name: 'cm',
                                description: 'センチメートル',
                                _code: {
                                    _value: 22,
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
                                                        _value: 11,
                                                        _ver: 1
                                                    },
                                                    {
                                                        _value: 21,
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
                                                value: 11
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
                                                        value: 21
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
                            inner: null
                        }
                    }
                ],
                attribute: null,
                appendix: null
            };

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(body).toMatchObject(responseJson);
            expect(JSON.stringify(body)).toBe(JSON.stringify(responseJson));

            // 日付書式チェック
            const dateApprovalAt = new Date(approvalAt);
            const strApprovalAt = moment(dateApprovalAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strApprovalAt).toBe(approvalAt);
            const dateRegistAt = new Date(registAt);
            const strRegistAt = moment(dateRegistAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strRegistAt).toBe(registAt);
        });
        test('正常 前提：申請 catalog 継承 追加', async () => {
            const targetId: number = 13;

            // URLを生成
            const url = Url.updateSetRequestURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    id: targetId,
                    approvalActor: 1000001
                });

            // 日付を確保
            const approvalAt: string = response.body.approvalAt;
            const registAt: string = response.body.registAt;
            const body = response.body;
            body['approvalAt'] = null;
            body['registAt'] = null;

            // 想定レスポンスを作成
            const responseJson: {} = {
                id: targetId,
                name: '新規変更セット名',
                description: '新規変更セット(説明)',
                callerActorCode: 1000001,
                approvalActorCode: 1000001,
                approver: 'loginid',
                approvalAt: null,
                comment: null,
                status: UpdateSetStatus.APPROVAL,
                registerActorCode: 1000001,
                register: 'loginid',
                registAt: null,
                ns: [
                    {
                        type: 1,
                        nsId: 11,
                        comment: null,
                        template: {
                            ns: 'catalog/model/unit/auto',
                            description: 'ユニットテストネームスペース'
                        }
                    }
                ],
                catalog: [
                    {
                        type: 1,
                        catalogCode: null,
                        comment: null,
                        template: {
                            catalogItem: {
                                ns: 'catalog/model/unit/auto',
                                name: 'cm',
                                description: 'センチメートル',
                                _code: {
                                    _value: 23,
                                    _ver: 1
                                },
                                inherit: null
                            },
                            template: {
                                prop: null,
                                value: null
                            },
                            inner: null
                        }
                    },
                    {
                        type: 1,
                        catalogCode: null,
                        comment: null,
                        template: {
                            catalogItem: {
                                ns: 'catalog/model/unit/auto',
                                name: 'cm',
                                description: 'センチメートル',
                                _code: {
                                    _value: 24,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 23,
                                    _ver: 1
                                }
                            },
                            template: {
                                prop: null,
                                value: null
                            },
                            inner: null
                        }
                    }
                ],
                attribute: null,
                appendix: null
            };

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(body).toMatchObject(responseJson);
            expect(JSON.stringify(body)).toBe(JSON.stringify(responseJson));

            // 日付書式チェック
            const dateApprovalAt = new Date(approvalAt);
            const strApprovalAt = moment(dateApprovalAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strApprovalAt).toBe(approvalAt);
            const dateRegistAt = new Date(registAt);
            const strRegistAt = moment(dateRegistAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strRegistAt).toBe(registAt);
        });
        test('正常 前提：申請 catalog 継承 変更', async () => {
            const targetId: number = 14;

            // URLを生成
            const url = Url.updateSetRequestURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    id: targetId,
                    approvalActor: 1000001
                });

            // 日付を確保
            const approvalAt: string = response.body.approvalAt;
            const registAt: string = response.body.registAt;
            const body = response.body;
            body['approvalAt'] = null;
            body['registAt'] = null;

            // 想定レスポンスを作成
            const responseJson: {} = {
                id: targetId,
                name: '新規変更セット名',
                description: '新規変更セット(説明)',
                callerActorCode: 1000001,
                approvalActorCode: 1000001,
                approver: 'loginid',
                approvalAt: null,
                comment: null,
                status: UpdateSetStatus.APPROVAL,
                registerActorCode: 1000001,
                register: 'loginid',
                registAt: null,
                ns: [
                    {
                        type: 1,
                        nsId: 12,
                        comment: null,
                        template: {
                            ns: 'catalog/model/unit/auto2',
                            description: 'ユニットテストネームスペース'
                        }
                    }
                ],
                catalog: [
                    {
                        type: 1,
                        catalogCode: null,
                        comment: null,
                        template: {
                            catalogItem: {
                                ns: 'catalog/model/unit/auto2',
                                name: 'cm',
                                description: 'センチメートル',
                                _code: {
                                    _value: 25,
                                    _ver: 1
                                },
                                inherit: null
                            },
                            template: {
                                prop: null,
                                value: null
                            },
                            inner: null
                        }
                    },
                    {
                        type: 2,
                        catalogCode: null,
                        comment: null,
                        template: {
                            catalogItem: {
                                ns: 'catalog/model/unit/auto2',
                                name: 'cm',
                                description: 'センチメートル',
                                _code: {
                                    _value: 11,
                                    _ver: null
                                },
                                inherit: {
                                    _value: 25,
                                    _ver: 1
                                }
                            },
                            template: {
                                prop: null,
                                value: null
                            },
                            inner: null
                        }
                    }
                ],
                attribute: null,
                appendix: null
            };

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(body).toMatchObject(responseJson);
            expect(JSON.stringify(body)).toBe(JSON.stringify(responseJson));

            // 日付書式チェック
            const dateApprovalAt = new Date(approvalAt);
            const strApprovalAt = moment(dateApprovalAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strApprovalAt).toBe(approvalAt);
            const dateRegistAt = new Date(registAt);
            const strRegistAt = moment(dateRegistAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strRegistAt).toBe(registAt);
        });
        test('正常 前提：申請 catalog code,version:null', async () => {
            const targetId: number = 15;

            // URLを生成
            const url = Url.updateSetRequestURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    id: targetId,
                    approvalActor: 1000001
                });

            // 日付を確保
            const approvalAt: string = response.body.approvalAt;
            const registAt: string = response.body.registAt;
            const body = response.body;
            body['approvalAt'] = null;
            body['registAt'] = null;

            // 想定レスポンスを作成
            const responseJson: {} = {
                id: targetId,
                name: '新規変更セット名',
                description: '新規変更セット(説明)',
                callerActorCode: 1000001,
                approvalActorCode: 1000001,
                approver: 'loginid',
                approvalAt: null,
                comment: null,
                status: UpdateSetStatus.APPROVAL,
                registerActorCode: 1000001,
                register: 'loginid',
                registAt: null,
                ns: [
                    {
                        type: 1,
                        nsId: 13,
                        comment: null,
                        template: {
                            ns: 'catalog/model/unit/null',
                            description: 'ユニットテストネームスペース'
                        }
                    }
                ],
                catalog: [
                    {
                        type: 1,
                        catalogCode: null,
                        comment: null,
                        template: {
                            catalogItem: {
                                ns: 'catalog/model/unit/null',
                                name: 'cm',
                                description: 'センチメートル',
                                _code: {
                                    _value: 26,
                                    _ver: 1
                                },
                                inherit: null
                            },
                            template: {
                                prop: null,
                                value: null
                            },
                            inner: null
                        }
                    }
                ],
                attribute: null,
                appendix: null
            };

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(body).toMatchObject(responseJson);
            expect(JSON.stringify(body)).toBe(JSON.stringify(responseJson));

            // 日付書式チェック
            const dateApprovalAt = new Date(approvalAt);
            const strApprovalAt = moment(dateApprovalAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strApprovalAt).toBe(approvalAt);
            const dateRegistAt = new Date(registAt);
            const strRegistAt = moment(dateRegistAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strRegistAt).toBe(registAt);
        });
        test('正常 前提：申請 catalog code:null', async () => {
            const targetId: number = 16;

            // URLを生成
            const url = Url.updateSetRequestURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    id: targetId,
                    approvalActor: 1000001
                });

            // 日付を確保
            const approvalAt: string = response.body.approvalAt;
            const registAt: string = response.body.registAt;
            const body = response.body;
            body['approvalAt'] = null;
            body['registAt'] = null;

            // 想定レスポンスを作成
            const responseJson: {} = {
                id: targetId,
                name: '新規変更セット名',
                description: '新規変更セット(説明)',
                callerActorCode: 1000001,
                approvalActorCode: 1000001,
                approver: 'loginid',
                approvalAt: null,
                comment: null,
                status: UpdateSetStatus.APPROVAL,
                registerActorCode: 1000001,
                register: 'loginid',
                registAt: null,
                ns: [
                    {
                        type: 1,
                        nsId: 14,
                        comment: null,
                        template: {
                            ns: 'catalog/model/unit/base/null',
                            description: 'ユニットテストネームスペース'
                        }
                    }
                ],
                catalog: [
                    {
                        type: 1,
                        catalogCode: null,
                        comment: null,
                        template: {
                            catalogItem: {
                                ns: 'catalog/model/unit/base/null',
                                name: 'cm',
                                description: 'センチメートル',
                                _code: {
                                    _value: 27,
                                    _ver: 1
                                },
                                inherit: null
                            },
                            template: {
                                prop: null,
                                value: null
                            },
                            inner: null
                        }
                    }
                ],
                attribute: null,
                appendix: null
            };

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(body).toMatchObject(responseJson);
            expect(JSON.stringify(body)).toBe(JSON.stringify(responseJson));

            // 日付書式チェック
            const dateApprovalAt = new Date(approvalAt);
            const strApprovalAt = moment(dateApprovalAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strApprovalAt).toBe(approvalAt);
            const dateRegistAt = new Date(registAt);
            const strRegistAt = moment(dateRegistAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strRegistAt).toBe(registAt);
        });
        test('正常 前提：申請 catalog 削除', async () => {
            const targetId: number = 17;

            // URLを生成
            const url = Url.updateSetRequestURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    id: targetId,
                    approvalActor: 1000001
                });

            // 日付を確保
            const approvalAt: string = response.body.approvalAt;
            const registAt: string = response.body.registAt;
            const body = response.body;
            body['approvalAt'] = null;
            body['registAt'] = null;

            // 想定レスポンスを作成
            const responseJson: {} = {
                id: targetId,
                name: '新規変更セット名',
                description: '新規変更セット(説明)',
                callerActorCode: 1000001,
                approvalActorCode: 1000001,
                approver: 'loginid',
                approvalAt: null,
                comment: null,
                status: UpdateSetStatus.APPROVAL,
                registerActorCode: 1000001,
                register: 'loginid',
                registAt: null,
                ns: null,
                catalog: [
                    {
                        type: 3,
                        catalogCode: 11,
                        comment: null,
                        template: null
                    }
                ],
                attribute: null,
                appendix: null
            };

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(body).toMatchObject(responseJson);
            expect(JSON.stringify(body)).toBe(JSON.stringify(responseJson));

            // 日付書式チェック
            const dateApprovalAt = new Date(approvalAt);
            const strApprovalAt = moment(dateApprovalAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strApprovalAt).toBe(approvalAt);
            const dateRegistAt = new Date(registAt);
            const strRegistAt = moment(dateRegistAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strRegistAt).toBe(registAt);
        });
        test('正常 前提：申請 属性追加', async () => {
            const targetId: number = 18;

            // URLを生成
            const url = Url.updateSetRequestURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    id: targetId,
                    approvalActor: 1000001
                });

            // 日付を確保
            const approvalAt: string = response.body.approvalAt;
            const registAt: string = response.body.registAt;
            const body = response.body;
            body['approvalAt'] = null;
            body['registAt'] = null;

            // 想定レスポンスを作成
            const responseJson: {} = {
                id: targetId,
                name: '新規変更セット',
                description: '新規属性変更セット(追加)',
                callerActorCode: 1000001,
                approvalActorCode: 1000001,
                approver: 'loginid',
                approvalAt: null,
                comment: null,
                status: UpdateSetStatus.APPROVAL,
                registerActorCode: 1000001,
                register: 'loginid',
                registAt: null,
                ns: null,
                catalog: null,
                attribute: [
                    {
                        type: 1,
                        catalogCode: 46,
                        attribute: {
                            objects: [
                                {
                                    key: {
                                        _value: 30004,
                                        _ver: 1
                                    },
                                    value: {
                                        company: {
                                            _value: 1000055,
                                            _ver: 1
                                        },
                                        'manufacturing-name': '鼓膜温センサー',
                                        'model-number': 'C-Temp'
                                    },
                                    description: 'センサー属性'
                                }
                            ],
                            tags: [
                                {
                                    ns: 'catalog/ext/aaa-healthcare-consortium/setting/global',
                                    values: [
                                        {
                                            _value: 124124,
                                            _ver: 1
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                ],
                appendix: null
            };

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(body).toMatchObject(responseJson);
            expect(JSON.stringify(body)).toBe(JSON.stringify(responseJson));

            // 日付書式チェック
            const dateApprovalAt = new Date(approvalAt);
            const strApprovalAt = moment(dateApprovalAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strApprovalAt).toBe(approvalAt);
            const dateRegistAt = new Date(registAt);
            const strRegistAt = moment(dateRegistAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strRegistAt).toBe(registAt);
        });
        test('正常 前提：申請 属性 複数追加', async () => {
            const targetId: number = 19;

            // URLを生成
            const url = Url.updateSetRequestURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    id: targetId,
                    approvalActor: 1000001
                });

            // 日付を確保
            const approvalAt: string = response.body.approvalAt;
            const registAt: string = response.body.registAt;
            const body = response.body;
            body['approvalAt'] = null;
            body['registAt'] = null;

            // 想定レスポンスを作成
            const responseJson: {} = {
                id: targetId,
                name: '新規変更セット',
                description: '新規属性変更セット(複数追加)',
                callerActorCode: 1000001,
                approvalActorCode: 1000001,
                approver: 'loginid',
                approvalAt: null,
                comment: null,
                status: UpdateSetStatus.APPROVAL,
                registerActorCode: 1000001,
                register: 'loginid',
                registAt: null,
                ns: null,
                catalog: null,
                attribute: [
                    {
                        type: 1,
                        catalogCode: 30001,
                        attribute: {
                            objects: [
                                {
                                    key: {
                                        _value: 30004,
                                        _ver: 1
                                    },
                                    value: {
                                        company: {
                                            _value: 1000055,
                                            _ver: 1
                                        },
                                        'manufacturing-name': '鼓膜温センサー',
                                        'model-number': 'C-Temp'
                                    },
                                    description: 'センサー属性'
                                }
                            ],
                            tags: [
                                {
                                    ns: 'catalog/ext/aaa-healthcare-consortium/setting/global',
                                    values: [
                                        {
                                            _value: 124124,
                                            _ver: 1
                                        }
                                    ]
                                }
                            ]
                        }
                    },
                    {
                        type: 1,
                        catalogCode: 11,
                        attribute: {
                            objects: [
                                {
                                    key: {
                                        _value: 1111,
                                        _ver: 1
                                    },
                                    value: {
                                        company: {
                                            _value: 133332,
                                            _ver: 1
                                        },
                                        'manufacturing-name': 'テスト用製品',
                                        'model-number': 'Test'
                                    },
                                    description: 'テスト用'
                                }
                            ],
                            tags: null
                        }
                    }
                ],
                appendix: null
            };

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(body).toMatchObject(responseJson);
            expect(JSON.stringify(body)).toBe(JSON.stringify(responseJson));

            // 日付書式チェック
            const dateApprovalAt = new Date(approvalAt);
            const strApprovalAt = moment(dateApprovalAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strApprovalAt).toBe(approvalAt);
            const dateRegistAt = new Date(registAt);
            const strRegistAt = moment(dateRegistAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strRegistAt).toBe(registAt);
        });
        test('正常 前提：申請 属性更新', async () => {
            const targetId: number = 20;

            // URLを生成
            const url = Url.updateSetRequestURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    id: targetId,
                    approvalActor: 1000001
                });

            // 日付を確保
            const approvalAt: string = response.body.approvalAt;
            const registAt: string = response.body.registAt;
            const body = response.body;
            body['approvalAt'] = null;
            body['registAt'] = null;

            // 想定レスポンスを作成
            const responseJson: {} = {
                id: targetId,
                name: '新規変更セット',
                description: '新規属性変更セット(更新)',
                callerActorCode: 1000001,
                approvalActorCode: 1000001,
                approver: 'loginid',
                approvalAt: null,
                comment: null,
                status: UpdateSetStatus.APPROVAL,
                registerActorCode: 1000001,
                register: 'loginid',
                registAt: null,
                ns: null,
                catalog: null,
                attribute: [
                    {
                        type: 2,
                        catalogCode: 46,
                        attribute: {
                            objects: [
                                {
                                    key: {
                                        _value: 30004,
                                        _ver: 1
                                    },
                                    value: {
                                        company: {
                                            _value: 1000055,
                                            _ver: 1
                                        },
                                        'manufacturing-name': '鼓膜温センサー',
                                        'model-number': 'C-Temp'
                                    },
                                    description: 'センサー属性'
                                }
                            ],
                            tags: [
                                {
                                    ns: 'catalog/ext/aaa-healthcare-consortium/setting/global',
                                    values: [
                                        {
                                            _value: 124124,
                                            _ver: 1
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                ],
                appendix: null
            };

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(body).toMatchObject(responseJson);
            expect(JSON.stringify(body)).toBe(JSON.stringify(responseJson));

            // 日付書式チェック
            const dateApprovalAt = new Date(approvalAt);
            const strApprovalAt = moment(dateApprovalAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strApprovalAt).toBe(approvalAt);
            const dateRegistAt = new Date(registAt);
            const strRegistAt = moment(dateRegistAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strRegistAt).toBe(registAt);
        });
        test('正常 前提：申請 属性削除', async () => {
            const targetId: number = 21;

            // URLを生成
            const url = Url.updateSetRequestURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    id: targetId,
                    approvalActor: 1000001
                });

            // 日付を確保
            const approvalAt: string = response.body.approvalAt;
            const registAt: string = response.body.registAt;
            const body = response.body;
            body['approvalAt'] = null;
            body['registAt'] = null;

            // 想定レスポンスを作成
            const responseJson: {} = {
                id: targetId,
                name: '新規変更セット',
                description: '新規属性変更セット(削除)',
                callerActorCode: 1000001,
                approvalActorCode: 1000001,
                approver: 'loginid',
                approvalAt: null,
                comment: null,
                status: UpdateSetStatus.APPROVAL,
                registerActorCode: 1000001,
                register: 'loginid',
                registAt: null,
                ns: null,
                catalog: null,
                attribute: [
                    {
                        type: 3,
                        catalogCode: 46,
                        attribute: {
                            objects: null,
                            tags: null
                        }
                    }
                ],
                appendix: null
            };

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(body).toMatchObject(responseJson);
            expect(JSON.stringify(body)).toBe(JSON.stringify(responseJson));

            // 日付書式チェック
            const dateApprovalAt = new Date(approvalAt);
            const strApprovalAt = moment(dateApprovalAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strApprovalAt).toBe(approvalAt);
            const dateRegistAt = new Date(registAt);
            const strRegistAt = moment(dateRegistAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strRegistAt).toBe(registAt);
        });
        test('正常 前提：申請 カタログ追加(built_in)', async () => {
            const targetId: number = 22;

            // URLを生成
            const url = Url.updateSetRequestURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    id: targetId,
                    approvalActor: 1000001
                });

            // 日付を確保
            const approvalAt: string = response.body.approvalAt;
            const registAt: string = response.body.registAt;
            const body = response.body;
            body['approvalAt'] = null;
            body['registAt'] = null;

            // 想定レスポンスを作成
            const responseJson: {} = {
                id: targetId,
                name: '新規変更セット名',
                description: '新規変更セット(説明)',
                callerActorCode: 1000001,
                approvalActorCode: 1000001,
                approver: 'loginid',
                approvalAt: null,
                comment: null,
                status: UpdateSetStatus.APPROVAL,
                registerActorCode: 1000001,
                register: 'loginid',
                registAt: null,
                ns: [
                    {
                        type: 1,
                        nsId: 15,
                        comment: null,
                        template: {
                            ns: 'catalog/built_in/unit/test',
                            description: 'ユニットテストネームスペース'
                        }
                    }
                ],
                catalog: [
                    {
                        type: 1,
                        catalogCode: null,
                        comment: null,
                        template: {
                            catalogItem: {
                                ns: 'catalog/built_in/unit/test',
                                name: 'initial',
                                description: 'スコープ内で1番目のカタログ',
                                _code: {
                                    _value: 10001,
                                    _ver: 1
                                },
                                inherit: null
                            },
                            template: {
                                prop: null,
                                value: null
                            },
                            inner: null
                        }
                    }
                ],
                attribute: null,
                appendix: 'unittest'
            };

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(body).toMatchObject(responseJson);
            expect(JSON.stringify(body)).toBe(JSON.stringify(responseJson));

            // 日付書式チェック
            const dateApprovalAt = new Date(approvalAt);
            const strApprovalAt = moment(dateApprovalAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strApprovalAt).toBe(approvalAt);
            const dateRegistAt = new Date(registAt);
            const strRegistAt = moment(dateRegistAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strRegistAt).toBe(registAt);
        });
    });

    /**
     * 変更セット申請
     */
    describe('変更セット申請', () => {
        test('正常 前提：申請 catalog 追加', async () => {
            // カタログ準備
            await common.executeSqlString(`
                INSERT INTO pxr_catalog.ns
                (
                    type, name, description, is_disabled,
                    attributes,
                    created_by, created_at, updated_by, updated_at
                ) VALUES
                (
                    'ext', 'catalog/ext/model/actor/pxr-root', 'テスト用承認アクター', False,
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
                    301, 1000020, 1, 2, 'approval', 'テスト用承認アクター',
                    NULL, NULL, False, False,
                    '{"catalogItem":{"ns":"catalog/ext/model/actor/pxr-root","name":"テスト用承認アクター","_code":{"_value":1000001,"_ver":1},"inherit":null,"description":"テスト用承認アクター"},"template":{"_code":{"_value":1000001,"_ver":1},"information-site":null,"region-alliance":null,"share":null,"store":null},"prop":null,"attribute":null}',
                    NULL,
                    'catalog_registrant', '2021/11/10 11:30:01.087', 'catalog_registrant', '2021/11/10 11:30:01.087'
                );
            `);
            const targetId: number = 2;

            // URLを生成
            const url = Url.updateSetRequestURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    id: targetId,
                    approvalActor: 1000020
                });

            // 日付を確保
            const registAt: string = response.body.registAt;
            const body = response.body;
            body['registAt'] = null;

            // 想定レスポンスを作成
            const responseJson: {} = {
                id: targetId,
                name: '新規変更セット名',
                description: '新規変更セット(説明)',
                callerActorCode: 1000001,
                approvalActorCode: 1000020,
                approver: null,
                approvalAt: null,
                comment: null,
                status: UpdateSetStatus.REQUEST,
                registerActorCode: 1000001,
                register: 'loginid',
                registAt: null,
                ns: [
                    {
                        type: 1,
                        nsId: null,
                        comment: null,
                        template: {
                            ns: 'catalog/model/document',
                            description: 'ユニットテストネームスペース'
                        }
                    }
                ],
                catalog: [
                    {
                        type: 1,
                        catalogCode: null,
                        comment: null,
                        template: {
                            catalogItem: {
                                ns: 'catalog/model/document',
                                name: 'document',
                                description: 'ドキュメント',
                                _code: {
                                    _value: 9665,
                                    _ver: 1
                                },
                                inherit: null
                            },
                            template: {
                                prop: null,
                                value: null
                            },
                            inner: null
                        }
                    }
                ],
                attribute: null,
                appendix: null
            };

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(body).toMatchObject(responseJson);
            expect(JSON.stringify(body)).toBe(JSON.stringify(responseJson));

            // 日付書式チェック
            const dateRegistAt = new Date(registAt);
            const strRegistAt = moment(dateRegistAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strRegistAt).toBe(registAt);
        });
        test('正常 前提：申請 catalog 追加、オペレーターアクターのカタログ参照して承認アクターとの関係確認', async () => {
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
                    'ext', 'catalog/ext/model/actor/approval/actor_1000001/application', 'テスト用承認appカタログ', False,
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
                    302, 1000021, 1, 17, 'approval', 'テスト用承認アクター2',
                    NULL, NULL, False, False,
                    '{"catalogItem":{"ns":"catalog/ext/model/actor/approval","name":"テスト用承認アクター2","_code":{"_value":1000011,"_ver":1},"inherit":null,"description":"テスト用承認アクター2"},"template":{"_code":{"_value":1000011,"_ver":1},"information-site":null,"region":[{"_value":1000021}],"share":null,"store":null},"prop":null,"attribute":null}',
                    NULL,
                    'catalog_registrant', '2021/11/10 11:30:01.087', 'catalog_registrant', '2021/11/10 11:30:01.087'
                ),
                (
                    303, 1000001, 1, 18, 'approval', 'テスト用承認アクターカタログ',
                    NULL, NULL, False, False,
                    '{"catalogItem":{"ns":"catalog/ext/model/actor/approval","name":"テスト用承認アクターカタログ","_code":{"_value":1000001,"_ver":1},"inherit":null,"description":"テスト用承認アクターカタログ"},"template":{"_code":{"_value":1000001,"_ver":1},"information-site":null,"application":[{"_value":1000121,"_ver": 1}],"share":null,"store":null},"prop":null,"attribute":null}',
                    NULL,
                    'catalog_registrant', '2021/11/10 11:30:01.087', 'catalog_registrant', '2021/11/10 11:30:01.087'
                ),
                (
                    304, 1000121, 1, 19, 'approval', 'テスト用承認appカタログ(region未提携)',
                    NULL, NULL, False, False,
                    '{"catalogItem":{"ns":"catalog/ext/model/actor/approval","name":"テスト用承認appカタログ(region未提携)","_code":{"_value":1000001,"_ver":1},"inherit":null,"description":"テスト用承認appカタログ"},"template":{"_code":{"_value":1000001,"_ver":1},"information-site":null,"region-alliance":null,"share":null,"store":null},"prop":null,"attribute":null}',
                    NULL,
                    'catalog_registrant', '2021/11/10 11:30:01.087', 'catalog_registrant', '2021/11/10 11:30:01.087'
                ),
                (
                    305, 1000121, 2, 19, 'approval', 'テスト用承認appカタログ(region提携済)',
                    NULL, NULL, False, False,
                    '{"catalogItem":{"ns":"catalog/ext/model/actor/approval","name":"テスト用承認appカタログ(region提携済)","_code":{"_value":1000001,"_ver":1},"inherit":null,"description":"テスト用承認appカタログ"},"template":{"_code":{"_value":1000001,"_ver":1},"information-site":null,"region-alliance":[{"_value":1000021}],"share":null,"store":null},"prop":null,"attribute":null}',
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
                    approvalActor: 1000021
                });

            // 日付を確保
            const registAt: string = response.body.registAt;
            const body = response.body;
            body['registAt'] = null;

            // 想定レスポンスを作成
            const responseJson: {} = {
                id: targetId,
                name: '新規変更セット名',
                description: '新規変更セット(説明)',
                callerActorCode: 1000001,
                approvalActorCode: 1000021,
                approver: null,
                approvalAt: null,
                comment: null,
                status: UpdateSetStatus.REQUEST,
                registerActorCode: 1000001,
                register: 'loginid',
                registAt: null,
                ns: [
                    {
                        type: 1,
                        nsId: null,
                        comment: null,
                        template: {
                            ns: 'catalog/model/document',
                            description: 'ユニットテストネームスペース'
                        }
                    }
                ],
                catalog: [
                    {
                        type: 1,
                        catalogCode: null,
                        comment: null,
                        template: {
                            catalogItem: {
                                ns: 'catalog/model/document',
                                name: 'document',
                                description: 'ドキュメント',
                                _code: {
                                    _value: 9666,
                                    _ver: 1
                                },
                                inherit: null
                            },
                            template: {
                                prop: null,
                                value: null
                            },
                            inner: null
                        }
                    }
                ],
                attribute: null,
                appendix: null
            };

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(body).toMatchObject(responseJson);
            expect(JSON.stringify(body)).toBe(JSON.stringify(responseJson));

            // 日付書式チェック
            const dateRegistAt = new Date(registAt);
            const strRegistAt = moment(dateRegistAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strRegistAt).toBe(registAt);
        });
    });
    /**
     * 変更セット承認
     */
    describe('変更セット承認', () => {
        test('正常 前提：否認', async () => {
            const targetId: number = 2;

            // URLを生成
            const url = urljoin(Url.updateSetApprovalURI, targetId.toString());

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.dataTrader) })
                .send({
                    status: UpdateSetStatus.DENY,
                    comment: '否認コメント'
                });

            // 日付を確保
            const approvalAt: string = response.body.approvalAt;
            const registAt: string = response.body.registAt;
            const body = response.body;
            body['approvalAt'] = null;
            body['registAt'] = null;

            // 想定レスポンスを作成
            const responseJson: {} = {
                id: targetId,
                name: '新規変更セット名',
                description: '新規変更セット(説明)',
                callerActorCode: 1000001,
                approvalActorCode: 1000020,
                approver: 'loginid',
                approvalAt: null,
                comment: '否認コメント',
                status: UpdateSetStatus.DENY,
                registerActorCode: 1000001,
                register: 'loginid',
                registAt: null,
                ns: [
                    {
                        type: 1,
                        nsId: null,
                        comment: null,
                        template: {
                            ns: 'catalog/model/document',
                            description: 'ユニットテストネームスペース'
                        }
                    }
                ],
                catalog: [
                    {
                        type: 1,
                        catalogCode: null,
                        comment: null,
                        template: {
                            catalogItem: {
                                ns: 'catalog/model/document',
                                name: 'document',
                                description: 'ドキュメント',
                                _code: {
                                    _value: 9665,
                                    _ver: 1
                                },
                                inherit: null
                            },
                            template: {
                                prop: null,
                                value: null
                            },
                            inner: null
                        }
                    }
                ],
                attribute: null,
                appendix: null
            };

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(body).toMatchObject(responseJson);
            expect(JSON.stringify(body)).toBe(JSON.stringify(responseJson));

            // 日付書式チェック
            const dateApprovalAt = new Date(approvalAt);
            const strApprovalAt = moment(dateApprovalAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strApprovalAt).toBe(approvalAt);
            const dateRegistAt = new Date(registAt);
            const strRegistAt = moment(dateRegistAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strRegistAt).toBe(registAt);
        });
        test('正常 前提： ns削除', async () => {
            // 対象データの作成
            await common.executeSqlString(`
                INSERT INTO pxr_catalog.ns
                (
                    id, type, name, description, is_disabled,
                    attributes,
                    created_by, created_at, updated_by, updated_at
                ) VALUES
                (
                    500, 'ext', 'catalog/model/actor/wf/workflow', 'ワークフローの定義です。', False,
                    NULL,
                    'catalog_registrant', '2021/11/09 17:17:01.783', 'catalog_registrant', '2021/11/09 17:17:01.783'
                );
                INSERT INTO pxr_catalog.update_set
                (
                    id, name, description, type, caller_actor_code, caller_actor_version, 
                    approval_actor_code, approval_actor_version, status, 
                    register_actor_code, register, regist_at, 
                    is_disabled, created_by, created_at, updated_by, updated_at
                ) VALUES
                (
                    500, 'ns', 'ns削除', 3, 1000001, 1,
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
                    500, 3, 500, null, '{"ns":"catalog/model/actor/wf/workflow","description":"ワークフローの定義です。"}',
                    false, 'loginid', NOW(), 'loginid', NOW()
                );
            `);
            // URLを生成
            const url = urljoin(Url.updateSetApprovalURI, '500');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    status: 1,
                    comment: '承認コメント'
                });

            // 日付を確保
            const approvalAt: string = response.body.approvalAt;
            const registAt: string = response.body.registAt;
            const body = response.body;
            body['approvalAt'] = null;
            body['registAt'] = null;

            // 想定レスポンスを作成
            const responseJson: {} = {
                id: 500,
                name: 'ns',
                description: 'ns削除',
                callerActorCode: 1000001,
                approvalActorCode: 1000001,
                approver: 'loginid',
                approvalAt: null,
                comment: '承認コメント',
                status: UpdateSetStatus.APPROVAL,
                registerActorCode: 1000001,
                register: 'loginid',
                registAt: null,
                ns: [
                    {
                        type: 3,
                        nsId: 500,
                        comment: null,
                        template: {
                            ns: 'catalog/model/actor/wf/workflow',
                            description: 'ワークフローの定義です。'
                        }
                    }
                ],
                catalog: null,
                attribute: null,
                appendix: null
            };

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(body).toMatchObject(responseJson);
            expect(JSON.stringify(body)).toBe(JSON.stringify(responseJson));

            // 日付書式チェック
            const dateApprovalAt = new Date(approvalAt);
            const strApprovalAt = moment(dateApprovalAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strApprovalAt).toBe(approvalAt);
            const dateRegistAt = new Date(registAt);
            const strRegistAt = moment(dateRegistAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
            expect(strRegistAt).toBe(registAt);
        });
    });

    /**
     * 承認済変更セットリスト取得
     */
    describe('承認済変更セットリスト取得', () => {
        test('正常 前提：なし', async () => {
            // URLを生成
            const url = Url.updateSetSearchApprovalURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // 日付を確保
            const body = response.body;

            const approvalAtList: string[] = [];
            const registAtList: string[] = [];
            for (let listIndex = 0; listIndex < response.body.length; listIndex++) {
                approvalAtList.push(response.body[listIndex].approvalAt);
                registAtList.push(response.body[listIndex].registAt);
                body[listIndex]['approvalAt'] = null;
                body[listIndex]['registAt'] = null;
            }

            // 想定レスポンスを作成
            const responseJson: {}[] = [
                {
                    id: 6,
                    name: '新規変更セット名',
                    description: '新規変更セット(説明)',
                    callerActorCode: 1000001,
                    approvalActorCode: 1000001,
                    approver: 'loginid',
                    approvalAt: null,
                    comment: null,
                    status: UpdateSetStatus.APPROVAL,
                    registerActorCode: 1000001,
                    register: 'loginid',
                    registAt: null
                },
                {
                    id: 7,
                    name: '新規変更セット名',
                    description: '新規変更セット(説明)',
                    callerActorCode: 1000001,
                    approvalActorCode: 1000001,
                    approver: 'loginid',
                    approvalAt: null,
                    comment: null,
                    status: UpdateSetStatus.APPROVAL,
                    registerActorCode: 1000001,
                    register: 'loginid',
                    registAt: null
                },
                /*
                {
                    id: 8,
                    name: '新規変更セット名',
                    description: '新規変更セット(説明)',
                    callerActorCode: 1000001,
                    approvalActorCode: 1000001,
                    approver: 'loginid',
                    approvalAt: null,
                    comment: null,
                    status: UpdateSetStatus.APPROVAL,
                    registerActorCode: 1000001,
                    register: 'loginid',
                    registAt: null
                },
                */
                {
                    id: 9,
                    name: '新規変更セット名',
                    description: '新規変更セット(説明)',
                    callerActorCode: 1000001,
                    approvalActorCode: 1000001,
                    approver: 'loginid',
                    approvalAt: null,
                    comment: null,
                    status: UpdateSetStatus.APPROVAL,
                    registerActorCode: 1000001,
                    register: 'loginid',
                    registAt: null
                },
                {
                    id: 10,
                    name: '新規変更セット名',
                    description: '新規変更セット(説明)',
                    callerActorCode: 1000001,
                    approvalActorCode: 1000001,
                    approver: 'loginid',
                    approvalAt: null,
                    comment: null,
                    status: UpdateSetStatus.APPROVAL,
                    registerActorCode: 1000001,
                    register: 'loginid',
                    registAt: null
                },
                {
                    id: 11,
                    name: '新規変更セット名',
                    description: '新規変更セット(説明)',
                    callerActorCode: 1000001,
                    approvalActorCode: 1000001,
                    approver: 'loginid',
                    approvalAt: null,
                    comment: null,
                    status: UpdateSetStatus.APPROVAL,
                    registerActorCode: 1000001,
                    register: 'loginid',
                    registAt: null
                },
                {
                    id: 12,
                    name: '新規変更セット名',
                    description: '新規変更セット(説明)',
                    callerActorCode: 1000001,
                    approvalActorCode: 1000001,
                    approver: 'loginid',
                    approvalAt: null,
                    comment: null,
                    status: UpdateSetStatus.APPROVAL,
                    registerActorCode: 1000001,
                    register: 'loginid',
                    registAt: null
                },
                {
                    id: 13,
                    name: '新規変更セット名',
                    description: '新規変更セット(説明)',
                    callerActorCode: 1000001,
                    approvalActorCode: 1000001,
                    approver: 'loginid',
                    approvalAt: null,
                    comment: null,
                    status: UpdateSetStatus.APPROVAL,
                    registerActorCode: 1000001,
                    register: 'loginid',
                    registAt: null
                },
                {
                    id: 14,
                    name: '新規変更セット名',
                    description: '新規変更セット(説明)',
                    callerActorCode: 1000001,
                    approvalActorCode: 1000001,
                    approver: 'loginid',
                    approvalAt: null,
                    comment: null,
                    status: UpdateSetStatus.APPROVAL,
                    registerActorCode: 1000001,
                    register: 'loginid',
                    registAt: null
                },
                {
                    id: 15,
                    name: '新規変更セット名',
                    description: '新規変更セット(説明)',
                    callerActorCode: 1000001,
                    approvalActorCode: 1000001,
                    approver: 'loginid',
                    approvalAt: null,
                    comment: null,
                    status: UpdateSetStatus.APPROVAL,
                    registerActorCode: 1000001,
                    register: 'loginid',
                    registAt: null
                },
                {
                    id: 16,
                    name: '新規変更セット名',
                    description: '新規変更セット(説明)',
                    callerActorCode: 1000001,
                    approvalActorCode: 1000001,
                    approver: 'loginid',
                    approvalAt: null,
                    comment: null,
                    status: UpdateSetStatus.APPROVAL,
                    registerActorCode: 1000001,
                    register: 'loginid',
                    registAt: null
                },
                {
                    id: 17,
                    name: '新規変更セット名',
                    description: '新規変更セット(説明)',
                    callerActorCode: 1000001,
                    approvalActorCode: 1000001,
                    approver: 'loginid',
                    approvalAt: null,
                    comment: null,
                    status: UpdateSetStatus.APPROVAL,
                    registerActorCode: 1000001,
                    register: 'loginid',
                    registAt: null
                },
                {
                    id: 18,
                    name: '新規変更セット',
                    description: '新規属性変更セット(追加)',
                    callerActorCode: 1000001,
                    approvalActorCode: 1000001,
                    approver: 'loginid',
                    approvalAt: null,
                    comment: null,
                    status: UpdateSetStatus.APPROVAL,
                    registerActorCode: 1000001,
                    register: 'loginid',
                    registAt: null
                },
                {
                    id: 19,
                    name: '新規変更セット',
                    description: '新規属性変更セット(複数追加)',
                    callerActorCode: 1000001,
                    approvalActorCode: 1000001,
                    approver: 'loginid',
                    approvalAt: null,
                    comment: null,
                    status: UpdateSetStatus.APPROVAL,
                    registerActorCode: 1000001,
                    register: 'loginid',
                    registAt: null
                },
                {
                    id: 20,
                    name: '新規変更セット',
                    description: '新規属性変更セット(更新)',
                    callerActorCode: 1000001,
                    approvalActorCode: 1000001,
                    approver: 'loginid',
                    approvalAt: null,
                    comment: null,
                    status: UpdateSetStatus.APPROVAL,
                    registerActorCode: 1000001,
                    register: 'loginid',
                    registAt: null
                },
                {
                    id: 21,
                    name: '新規変更セット',
                    description: '新規属性変更セット(削除)',
                    callerActorCode: 1000001,
                    approvalActorCode: 1000001,
                    approver: 'loginid',
                    approvalAt: null,
                    comment: null,
                    status: UpdateSetStatus.APPROVAL,
                    registerActorCode: 1000001,
                    register: 'loginid',
                    registAt: null
                },
                {
                    id: 22,
                    name: '新規変更セット名',
                    description: '新規変更セット(説明)',
                    callerActorCode: 1000001,
                    approvalActorCode: 1000001,
                    approver: 'loginid',
                    approvalAt: null,
                    comment: null,
                    status: UpdateSetStatus.APPROVAL,
                    registerActorCode: 1000001,
                    register: 'loginid',
                    registAt: null
                },
                {
                    id: 500,
                    name: 'ns',
                    description: 'ns削除',
                    callerActorCode: 1000001,
                    approvalActorCode: 1000001,
                    approver: 'loginid',
                    approvalAt: null,
                    comment: '承認コメント',
                    status: UpdateSetStatus.APPROVAL,
                    registerActorCode: 1000001,
                    register: 'loginid',
                    registAt: null
                }

            ];

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(body).toMatchObject(responseJson);
            expect(JSON.stringify(body)).toBe(JSON.stringify(responseJson));

            // 日付書式チェック
            for (let listIndex = 0; listIndex < responseJson.length; listIndex++) {
                const dateApprovalAt = new Date(approvalAtList[listIndex]);
                const strApprovalAt = moment(dateApprovalAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
                expect(strApprovalAt).toBe(approvalAtList[listIndex]);

                const dateRegistAt = new Date(registAtList[listIndex]);
                const strRegistAt = moment(dateRegistAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
                expect(strRegistAt).toBe(registAtList[listIndex]);
            }
        });
    });
});
