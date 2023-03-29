/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import * as supertest from 'supertest';
import { Application } from '../resources/config/Application';
import Common, { Url } from './Common';
import { Session } from './Session';
import { CatalogBuiltInRequest } from './CatalogBuiltInRequest';
import { CatalogBuiltInResponse } from './CatalogBuiltInResponse';
import { CatalogBuiltInUpdateRequest } from './CatalogBuiltInUpdateRequest';
import { CatalogBuiltInUpdateResponse } from './CatalogBuiltInUpdateResponse';
import Config from '../common/Config';
const Message = Config.ReadConfig('./config/message.json');
import urljoin = require('url-join');

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
     * カタログ追加
     */
    describe('カタログ追加', () => {
        test('異常 前提：ビルトイン、未アクティベート', async () => {
            // アクティベート解除
            await common.executeSqlString(`
                DELETE FROM pxr_catalog.catalog
            `);

            // URLを生成
            const url = Url.builtInURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInRequest.minimumCode);

            // アクティベート
            await common.executeSqlFile('activate.sql');

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_ACTIVATE);
        });
        test('正常 前提：ビルトイン、コード指定なし', async () => {
            // URLを生成
            const url = Url.builtInURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInRequest.minimum);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.minimum);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.minimum));
        });
        test('正常 前提：ビルトイン、コード指定', async () => {
            // URLを生成
            const url = Url.builtInURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInRequest.minimumCode);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.minimumCode);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.minimumCode));
        });
        test('正常 前提：ビルトイン、コード、バージョン指定', async () => {
            // URLを生成
            const url = Url.builtInURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInRequest.minimumCodeVersion);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.minimumCodeVersion);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.minimumCodeVersion));
        });
        test('正常 前提：ビルトイン、テンプレートプロパティnumber指定', async () => {
            // URLを生成
            const url = Url.builtInURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInRequest.templatePropertyNumber);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.templatePropertyNumber);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyNumber));
        });
        test('正常 前提：ビルトイン、テンプレートプロパティstring指定', async () => {
            // URLを生成
            const url = Url.builtInURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInRequest.templatePropertyString);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.templatePropertyString);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyString));
        });
        test('正常 前提：ビルトイン、テンプレートプロパティboolean指定', async () => {
            // URLを生成
            const url = Url.builtInURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInRequest.templatePropertyBoolean);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.templatePropertyBoolean);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyBoolean));
        });
        test('正常 前提：ビルトイン、テンプレートプロパティcode指定', async () => {
            // URLを生成
            const url = Url.builtInURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInRequest.templatePropertyCode);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.templatePropertyCode);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyCode));
        });
        test('正常 前提：ビルトイン、テンプレートプロパティitem指定', async () => {
            // URLを生成
            const url = Url.builtInURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInRequest.templatePropertyItem);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.templatePropertyItem);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyItem));
        });
        test('正常 前提：ビルトイン、テンプレートプロパティinner指定', async () => {
            // URLを生成
            const url = Url.builtInURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInRequest.templatePropertyInner);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.templatePropertyInner);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyInner));
        });
        test('正常 前提：ビルトイン、テンプレートプロパティnumber[]指定', async () => {
            // URLを生成
            const url = Url.builtInURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInRequest.templatePropertyNumberArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.templatePropertyNumberArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyNumberArray));
        });
        test('正常 前提：ビルトイン、テンプレートプロパティstring[]指定', async () => {
            // URLを生成
            const url = Url.builtInURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInRequest.templatePropertyStringArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.templatePropertyStringArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyStringArray));
        });
        test('正常 前提：ビルトイン、テンプレートプロパティboolean[]指定', async () => {
            // URLを生成
            const url = Url.builtInURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInRequest.templatePropertyBooleanArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.templatePropertyBooleanArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyBooleanArray));
        });
        test('正常 前提：ビルトイン、テンプレートプロパティcode[]指定', async () => {
            // URLを生成
            const url = Url.builtInURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInRequest.templatePropertyCodeArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.templatePropertyCodeArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyCodeArray));
        });
        test('正常 前提：ビルトイン、テンプレートプロパティitem[]指定', async () => {
            // URLを生成
            const url = Url.builtInURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInRequest.templatePropertyItemArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.templatePropertyItemArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyItemArray));
        });
        test('正常 前提：ビルトイン、テンプレートプロパティinner[]指定', async () => {
            // URLを生成
            const url = Url.builtInURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInRequest.templatePropertyInnerArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.templatePropertyInnerArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyInnerArray));
        });
        test('正常 前提：ビルトイン、属性指定値なし', async () => {
            // URLを生成
            const url = Url.builtInURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInRequest.attributeValueNone);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.attributeValueNone);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.attributeValueNone));
        });
        test('正常 前提：ビルトイン、属性指定値あり', async () => {
            // URLを生成
            const url = Url.builtInURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInRequest.attributeValueAvail);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.attributeValueAvail);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.attributeValueAvail));
        });
        test('正常 前提：ビルトイン、値指定number', async () => {
            // URLを生成
            const url = Url.builtInURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInRequest.valueNumber);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.valueNumber);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.valueNumber));
        });
        test('正常 前提：ビルトイン、値指定string', async () => {
            // URLを生成
            const url = Url.builtInURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInRequest.valueString);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.valueString);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.valueString));
        });
        test('正常 前提：ビルトイン、値指定boolean', async () => {
            // URLを生成
            const url = Url.builtInURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInRequest.valueBoolean);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.valueBoolean);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.valueBoolean));
        });
        test('正常 前提：ビルトイン、値指定code', async () => {
            // URLを生成
            const url = Url.builtInURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInRequest.valueCode);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.valueCode);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.valueCode));
        });
        test('正常 前提：ビルトイン、値指定item', async () => {
            // URLを生成
            const url = Url.builtInURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInRequest.valueItem);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.valueItem);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.valueItem));
        });
        test('正常 前提：ビルトイン、値指定inner', async () => {
            // URLを生成
            const url = Url.builtInURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInRequest.valueInner);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.valueInner);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.valueInner));
        });
        test('正常 前提：ビルトイン、値指定number[]', async () => {
            // URLを生成
            const url = Url.builtInURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInRequest.valueNumberArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.valueNumberArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.valueNumberArray));
        });
        test('正常 前提：ビルトイン、値指定string[]', async () => {
            // URLを生成
            const url = Url.builtInURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInRequest.valueStringArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.valueStringArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.valueStringArray));
        });
        test('正常 前提：ビルトイン、値指定boolean[]', async () => {
            // URLを生成
            const url = Url.builtInURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInRequest.valueBooleanArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.valueBooleanArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.valueBooleanArray));
        });
        test('正常 前提：ビルトイン、値指定code[]', async () => {
            // URLを生成
            const url = Url.builtInURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInRequest.valueCodeArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.valueCodeArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.valueCodeArray));
        });
        test('正常 前提：ビルトイン、値指定item[]', async () => {
            // URLを生成
            const url = Url.builtInURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInRequest.valueItemArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.valueItemArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.valueItemArray));
        });
        test('正常 前提：ビルトイン、値指定inner[]', async () => {
            // URLを生成
            const url = Url.builtInURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInRequest.valueInnerArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.valueInnerArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.valueInnerArray));
        });
        test('正常 前提：ビルトイン、継承、バージョン指定なし', async () => {
            // URLを生成
            const url = Url.builtInURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInRequest.inheritVersionNone);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.inheritVersionNone);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.inheritVersionNone));
        });
        test('正常 前提：ビルトイン、継承、バージョン指定あり', async () => {
            // URLを生成
            const url = Url.builtInURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInRequest.inheritVersionAvail);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.inheritVersionAvail);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.inheritVersionAvail));
        });
        test('正常 前提：ビルトイン、継承、プロパティnumber', async () => {
            // URLを生成
            const url = Url.builtInURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInRequest.inheritPropertyNumber);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.inheritPropertyNumber);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.inheritPropertyNumber));
        });
        test('正常 前提：ビルトイン、継承、プロパティstring', async () => {
            // URLを生成
            const url = Url.builtInURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInRequest.inheritPropertyString);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.inheritPropertyString);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.inheritPropertyString));
        });
        test('正常 前提：ビルトイン、継承、プロパティboolean', async () => {
            // URLを生成
            const url = Url.builtInURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInRequest.inheritPropertyBoolean);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.inheritPropertyBoolean);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.inheritPropertyBoolean));
        });
        test('正常 前提：ビルトイン、継承、プロパティcode', async () => {
            // URLを生成
            const url = Url.builtInURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInRequest.inheritPropertyCode);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.inheritPropertyCode);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.inheritPropertyCode));
        });
        test('正常 前提：ビルトイン、継承、プロパティitem', async () => {
            // URLを生成
            const url = Url.builtInURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInRequest.inheritPropertyItem);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.inheritPropertyItem);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.inheritPropertyItem));
        });
        test('正常 前提：ビルトイン、継承、プロパティinner', async () => {
            // URLを生成
            const url = Url.builtInURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInRequest.inheritPropertyInner);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.inheritPropertyInner);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.inheritPropertyInner));
        });
        test('正常 前提：ビルトイン、継承、プロパティnumber[]', async () => {
            // URLを生成
            const url = Url.builtInURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInRequest.inheritPropertyNumberArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.inheritPropertyNumberArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.inheritPropertyNumberArray));
        });
        test('正常 前提：ビルトイン、継承、プロパティstring[]', async () => {
            // URLを生成
            const url = Url.builtInURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInRequest.inheritPropertyStringArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.inheritPropertyStringArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.inheritPropertyStringArray));
        });
        test('正常 前提：ビルトイン、継承、プロパティboolean[]', async () => {
            // URLを生成
            const url = Url.builtInURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInRequest.inheritPropertyBooleanArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.inheritPropertyBooleanArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.inheritPropertyBooleanArray));
        });
        test('正常 前提：ビルトイン、継承、プロパティcode[]', async () => {
            // URLを生成
            const url = Url.builtInURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInRequest.inheritPropertyCodeArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.inheritPropertyCodeArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.inheritPropertyCodeArray));
        });
        test('正常 前提：ビルトイン、継承、プロパティitem[]', async () => {
            // URLを生成
            const url = Url.builtInURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInRequest.inheritPropertyItemArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.inheritPropertyItemArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.inheritPropertyItemArray));
        });
        test('正常 前提：ビルトイン、継承、プロパティinner[]', async () => {
            // URLを生成
            const url = Url.builtInURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInRequest.inheritPropertyInnerArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.inheritPropertyInnerArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.inheritPropertyInnerArray));
        });
        test('正常 前提：ビルトイン、プロパティnumber各種設定', async () => {
            // URLを生成
            const url = Url.builtInURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInRequest.templatePropertyFullNumber);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.templatePropertyFullNumber);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyFullNumber));
        });
        test('正常 前提：ビルトイン、プロパティstring各種設定', async () => {
            // URLを生成
            const url = Url.builtInURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInRequest.templatePropertyFullString);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.templatePropertyFullString);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyFullString));
        });
        test('正常 前提：ビルトイン、プロパティboolean各種設定', async () => {
            // URLを生成
            const url = Url.builtInURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInRequest.templatePropertyFullBoolean);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.templatePropertyFullBoolean);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyFullBoolean));
        });
        test('正常 前提：ビルトイン、プロパティcode各種設定', async () => {
            // URLを生成
            const url = Url.builtInURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInRequest.templatePropertyFullCode);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.templatePropertyFullCode);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyFullCode));
        });
        test('正常 前提：ビルトイン、プロパティitem各種設定', async () => {
            // URLを生成
            const url = Url.builtInURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInRequest.templatePropertyFullItem);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.templatePropertyFullItem);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyFullItem));
        });
        test('正常 前提：ビルトイン、プロパティinner各種設定', async () => {
            // URLを生成
            const url = Url.builtInURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInRequest.templatePropertyFullInner);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.templatePropertyFullInner);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyFullInner));
        });
        test('正常 前提：ビルトイン、プロパティnumber[]各種設定', async () => {
            // URLを生成
            const url = Url.builtInURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInRequest.templatePropertyFullNumberArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.templatePropertyFullNumberArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyFullNumberArray));
        });
        test('正常 前提：ビルトイン、プロパティstring[]各種設定', async () => {
            // URLを生成
            const url = Url.builtInURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInRequest.templatePropertyFullStringArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.templatePropertyFullStringArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyFullStringArray));
        });
        test('正常 前提：ビルトイン、プロパティboolean[]各種設定', async () => {
            // URLを生成
            const url = Url.builtInURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInRequest.templatePropertyFullBooleanArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.templatePropertyFullBooleanArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyFullBooleanArray));
        });
        test('正常 前提：ビルトイン、プロパティcode[]各種設定', async () => {
            // URLを生成
            const url = Url.builtInURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInRequest.templatePropertyFullCodeArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.templatePropertyFullCodeArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyFullCodeArray));
        });
        test('正常 前提：ビルトイン、プロパティitem[]各種設定', async () => {
            // URLを生成
            const url = Url.builtInURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInRequest.templatePropertyFullItemArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.templatePropertyFullItemArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyFullItemArray));
        });
        test('正常 前提：ビルトイン、プロパティinner[]各種設定', async () => {
            // URLを生成
            const url = Url.builtInURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInRequest.templatePropertyFullInnerArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.templatePropertyFullInnerArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyFullInnerArray));
        });
    });

    /**
     * カタログ取得
     */
    describe('カタログ取得', () => {
        test('異常 前提：ビルトイン、未アクティベート', async () => {
            // アクティベート解除
            await common.executeSqlString(`
                DELETE FROM pxr_catalog.catalog
            `);

            // URLを生成
            const url = urljoin(Url.baseURI, '?ns=catalog/built_in/unit-test');

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
        test('正常 前提：ビルトイン', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '?ns=catalog/built_in/unit-test');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            let index: number = 0;
            expect(response.status).toBe(200);
            expect(response.body[index]).toMatchObject(CatalogBuiltInResponse.minimum);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogBuiltInResponse.minimum));
            index++;
            expect(response.body[index]).toMatchObject(CatalogBuiltInResponse.minimumCode);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogBuiltInResponse.minimumCode));
            index++;
            expect(response.body[index]).toMatchObject(CatalogBuiltInResponse.minimumCodeVersion);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogBuiltInResponse.minimumCodeVersion));
            index++;
            expect(response.body[index]).toMatchObject(CatalogBuiltInResponse.templatePropertyNumber);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyNumber));
            index++;
            expect(response.body[index]).toMatchObject(CatalogBuiltInResponse.templatePropertyString);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyString));
            index++;
            expect(response.body[index]).toMatchObject(CatalogBuiltInResponse.templatePropertyBoolean);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyBoolean));
            index++;
            expect(response.body[index]).toMatchObject(CatalogBuiltInResponse.templatePropertyCode);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyCode));
            index++;
            expect(response.body[index]).toMatchObject(CatalogBuiltInResponse.templatePropertyItem);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyItem));
            index++;
            expect(response.body[index]).toMatchObject(CatalogBuiltInResponse.templatePropertyInner);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyInner));
            index++;
            expect(response.body[index]).toMatchObject(CatalogBuiltInResponse.templatePropertyNumberArray);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyNumberArray));
            index++;
            expect(response.body[index]).toMatchObject(CatalogBuiltInResponse.templatePropertyStringArray);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyStringArray));
            index++;
            expect(response.body[index]).toMatchObject(CatalogBuiltInResponse.templatePropertyBooleanArray);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyBooleanArray));
            index++;
            expect(response.body[index]).toMatchObject(CatalogBuiltInResponse.templatePropertyCodeArray);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyCodeArray));
            index++;
            expect(response.body[index]).toMatchObject(CatalogBuiltInResponse.templatePropertyItemArray);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyItemArray));
            index++;
            expect(response.body[index]).toMatchObject(CatalogBuiltInResponse.templatePropertyInnerArray);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyInnerArray));
            index++;
            expect(response.body[index]).toMatchObject(CatalogBuiltInResponse.attributeValueNone);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogBuiltInResponse.attributeValueNone));
            index++;
            expect(response.body[index]).toMatchObject(CatalogBuiltInResponse.attributeValueAvail);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogBuiltInResponse.attributeValueAvail));
            index++;
            expect(response.body[index]).toMatchObject(CatalogBuiltInResponse.valueNumber);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogBuiltInResponse.valueNumber));
            index++;
            expect(response.body[index]).toMatchObject(CatalogBuiltInResponse.valueString);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogBuiltInResponse.valueString));
            index++;
            expect(response.body[index]).toMatchObject(CatalogBuiltInResponse.valueBoolean);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogBuiltInResponse.valueBoolean));
            index++;
            expect(response.body[index]).toMatchObject(CatalogBuiltInResponse.valueCode);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogBuiltInResponse.valueCode));
            index++;
            expect(response.body[index]).toMatchObject(CatalogBuiltInResponse.valueItem);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogBuiltInResponse.valueItem));
            index++;
            expect(response.body[index]).toMatchObject(CatalogBuiltInResponse.valueInner);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogBuiltInResponse.valueInner));
            index++;
            expect(response.body[index]).toMatchObject(CatalogBuiltInResponse.valueNumberArray);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogBuiltInResponse.valueNumberArray));
            index++;
            expect(response.body[index]).toMatchObject(CatalogBuiltInResponse.valueStringArray);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogBuiltInResponse.valueStringArray));
            index++;
            expect(response.body[index]).toMatchObject(CatalogBuiltInResponse.valueBooleanArray);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogBuiltInResponse.valueBooleanArray));
            index++;
            expect(response.body[index]).toMatchObject(CatalogBuiltInResponse.valueCodeArray);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogBuiltInResponse.valueCodeArray));
            index++;
            expect(response.body[index]).toMatchObject(CatalogBuiltInResponse.valueItemArray);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogBuiltInResponse.valueItemArray));
            index++;
            expect(response.body[index]).toMatchObject(CatalogBuiltInResponse.valueInnerArray);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogBuiltInResponse.valueInnerArray));
            index++;
            expect(response.body[index]).toMatchObject(CatalogBuiltInResponse.inheritVersionNone);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogBuiltInResponse.inheritVersionNone));
            index++;
            expect(response.body[index]).toMatchObject(CatalogBuiltInResponse.inheritVersionAvail);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogBuiltInResponse.inheritVersionAvail));
            index++;
            expect(response.body[index]).toMatchObject(CatalogBuiltInResponse.inheritPropertyNumber);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogBuiltInResponse.inheritPropertyNumber));
            index++;
            expect(response.body[index]).toMatchObject(CatalogBuiltInResponse.inheritPropertyString);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogBuiltInResponse.inheritPropertyString));
            index++;
            expect(response.body[index]).toMatchObject(CatalogBuiltInResponse.inheritPropertyBoolean);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogBuiltInResponse.inheritPropertyBoolean));
            index++;
            expect(response.body[index]).toMatchObject(CatalogBuiltInResponse.inheritPropertyCode);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogBuiltInResponse.inheritPropertyCode));
            index++;
            expect(response.body[index]).toMatchObject(CatalogBuiltInResponse.inheritPropertyItem);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogBuiltInResponse.inheritPropertyItem));
            index++;
            expect(response.body[index]).toMatchObject(CatalogBuiltInResponse.inheritPropertyInner);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogBuiltInResponse.inheritPropertyInner));
            index++;
            expect(response.body[index]).toMatchObject(CatalogBuiltInResponse.inheritPropertyNumberArray);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogBuiltInResponse.inheritPropertyNumberArray));
            index++;
            expect(response.body[index]).toMatchObject(CatalogBuiltInResponse.inheritPropertyStringArray);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogBuiltInResponse.inheritPropertyStringArray));
            index++;
            expect(response.body[index]).toMatchObject(CatalogBuiltInResponse.inheritPropertyBooleanArray);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogBuiltInResponse.inheritPropertyBooleanArray));
            index++;
            expect(response.body[index]).toMatchObject(CatalogBuiltInResponse.inheritPropertyCodeArray);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogBuiltInResponse.inheritPropertyCodeArray));
            index++;
            expect(response.body[index]).toMatchObject(CatalogBuiltInResponse.inheritPropertyItemArray);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogBuiltInResponse.inheritPropertyItemArray));
            index++;
            expect(response.body[index]).toMatchObject(CatalogBuiltInResponse.inheritPropertyInnerArray);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogBuiltInResponse.inheritPropertyInnerArray));
            index++;
        });
        test('正常 前提：ビルトイン cmatrix', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '?ns=catalog/built_in/cmatrix/unit-test');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            let index: number = 0;
            expect(response.status).toBe(200);
            expect(response.body[index]).toMatchObject(CatalogBuiltInResponse.templatePropertyFullNumber);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyFullNumber));
            index++;
            expect(response.body[index]).toMatchObject(CatalogBuiltInResponse.templatePropertyFullString);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyFullString));
            index++;
            expect(response.body[index]).toMatchObject(CatalogBuiltInResponse.templatePropertyFullBoolean);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyFullBoolean));
            index++;
            expect(response.body[index]).toMatchObject(CatalogBuiltInResponse.templatePropertyFullCode);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyFullCode));
            index++;
            expect(response.body[index]).toMatchObject(CatalogBuiltInResponse.templatePropertyFullItem);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyFullItem));
            index++;
            expect(response.body[index]).toMatchObject(CatalogBuiltInResponse.templatePropertyFullInner);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyFullInner));
            index++;
            expect(response.body[index]).toMatchObject(CatalogBuiltInResponse.templatePropertyFullNumberArray);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyFullNumberArray));
            index++;
            expect(response.body[index]).toMatchObject(CatalogBuiltInResponse.templatePropertyFullStringArray);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyFullStringArray));
            index++;
            expect(response.body[index]).toMatchObject(CatalogBuiltInResponse.templatePropertyFullBooleanArray);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyFullBooleanArray));
            index++;
            expect(response.body[index]).toMatchObject(CatalogBuiltInResponse.templatePropertyFullCodeArray);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyFullCodeArray));
            index++;
            expect(response.body[index]).toMatchObject(CatalogBuiltInResponse.templatePropertyFullItemArray);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyFullItemArray));
            index++;
            expect(response.body[index]).toMatchObject(CatalogBuiltInResponse.templatePropertyFullInnerArray);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyFullInnerArray));
            index++;
        });
    });

    /**
     * カタログ取得(/:code)
     */
    describe('カタログ取得(/:code)', () => {
        test('異常 前提：ビルトイン、未アクティベート', async () => {
            // アクティベート解除
            await common.executeSqlString(`
                DELETE FROM pxr_catalog.catalog
            `);

            // URLを生成
            const url = urljoin(Url.baseURI, '10001');

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
        test('正常 前提：ビルトイン、コード指定なし', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10001');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.minimum);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.minimum));
        });
        test('正常 前提：ビルトイン、コード指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10002');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.minimumCode);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.minimumCode));
        });
        test('正常 前提：ビルトイン、コード、バージョン指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10003');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.minimumCodeVersion);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.minimumCodeVersion));
        });
        test('正常 前提：ビルトイン、テンプレートプロパティnumber指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10011');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.templatePropertyNumber);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyNumber));
        });
        test('正常 前提：ビルトイン、テンプレートプロパティstring指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10012');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.templatePropertyString);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyString));
        });
        test('正常 前提：ビルトイン、テンプレートプロパティboolean指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10013');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.templatePropertyBoolean);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyBoolean));
        });
        test('正常 前提：ビルトイン、テンプレートプロパティcode指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10014');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.templatePropertyCode);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyCode));
        });
        test('正常 前提：ビルトイン、テンプレートプロパティitem指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10015');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.templatePropertyItem);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyItem));
        });
        test('正常 前提：ビルトイン、テンプレートプロパティinner指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10016');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.templatePropertyInner);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyInner));
        });
        test('正常 前提：ビルトイン、テンプレートプロパティnumber[]指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10021');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.templatePropertyNumberArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyNumberArray));
        });
        test('正常 前提：ビルトイン、テンプレートプロパティstring[]指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10022');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.templatePropertyStringArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyStringArray));
        });
        test('正常 前提：ビルトイン、テンプレートプロパティboolean[]指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10023');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.templatePropertyBooleanArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyBooleanArray));
        });
        test('正常 前提：ビルトイン、テンプレートプロパティcode[]指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10024');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.templatePropertyCodeArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyCodeArray));
        });
        test('正常 前提：ビルトイン、テンプレートプロパティitem[]指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10025');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.templatePropertyItemArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyItemArray));
        });
        test('正常 前提：ビルトイン、テンプレートプロパティinner[]指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10026');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.templatePropertyInnerArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyInnerArray));
        });
        test('正常 前提：ビルトイン、属性指定値なし', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10031');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.attributeValueNone);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.attributeValueNone));
        });
        test('正常 前提：ビルトイン、属性指定値あり', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10032');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.attributeValueAvail);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.attributeValueAvail));
        });
        test('正常 前提：ビルトイン、値指定number', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10041');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.valueNumber);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.valueNumber));
        });
        test('正常 前提：ビルトイン、値指定string', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10042');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.valueString);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.valueString));
        });
        test('正常 前提：ビルトイン、値指定boolean', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10043');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.valueBoolean);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.valueBoolean));
        });
        test('正常 前提：ビルトイン、値指定code', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10044');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.valueCode);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.valueCode));
        });
        test('正常 前提：ビルトイン、値指定item', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10045');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.valueItem);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.valueItem));
        });
        test('正常 前提：ビルトイン、値指定inner', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10046');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.valueInner);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.valueInner));
        });
        test('正常 前提：ビルトイン、値指定number[]', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10051');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.valueNumberArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.valueNumberArray));
        });
        test('正常 前提：ビルトイン、値指定string[]', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10052');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.valueStringArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.valueStringArray));
        });
        test('正常 前提：ビルトイン、値指定boolean[]', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10053');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.valueBooleanArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.valueBooleanArray));
        });
        test('正常 前提：ビルトイン、値指定code[]', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10054');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.valueCodeArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.valueCodeArray));
        });
        test('正常 前提：ビルトイン、値指定item[]', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10055');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.valueItemArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.valueItemArray));
        });
        test('正常 前提：ビルトイン、値指定inner[]', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10056');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.valueInnerArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.valueInnerArray));
        });
        test('正常 前提：ビルトイン、継承、バージョン指定なし', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10061');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.inheritVersionNone);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.inheritVersionNone));
        });
        test('正常 前提：ビルトイン、継承、バージョン指定あり', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10062');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.inheritVersionAvail);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.inheritVersionAvail));
        });
        test('正常 前提：ビルトイン、継承、プロパティnumber', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10063');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.inheritPropertyNumber);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.inheritPropertyNumber));
        });
        test('正常 前提：ビルトイン、継承、プロパティstring', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10064');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.inheritPropertyString);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.inheritPropertyString));
        });
        test('正常 前提：ビルトイン、継承、プロパティboolean', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10065');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.inheritPropertyBoolean);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.inheritPropertyBoolean));
        });
        test('正常 前提：ビルトイン、継承、プロパティcode', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10066');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.inheritPropertyCode);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.inheritPropertyCode));
        });
        test('正常 前提：ビルトイン、継承、プロパティitem', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10067');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.inheritPropertyItem);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.inheritPropertyItem));
        });
        test('正常 前提：ビルトイン、継承、プロパティinner', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10068');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.inheritPropertyInner);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.inheritPropertyInner));
        });
        test('正常 前提：ビルトイン、継承、プロパティnumber[]', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10071');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.inheritPropertyNumberArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.inheritPropertyNumberArray));
        });
        test('正常 前提：ビルトイン、継承、プロパティstring[]', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10072');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.inheritPropertyStringArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.inheritPropertyStringArray));
        });
        test('正常 前提：ビルトイン、継承、プロパティboolean[]', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10073');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.inheritPropertyBooleanArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.inheritPropertyBooleanArray));
        });
        test('正常 前提：ビルトイン、継承、プロパティcode[]', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10074');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.inheritPropertyCodeArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.inheritPropertyCodeArray));
        });
        test('正常 前提：ビルトイン、継承、プロパティitem[]', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10075');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.inheritPropertyItemArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.inheritPropertyItemArray));
        });
        test('正常 前提：ビルトイン、継承、プロパティinner[]', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10076');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.inheritPropertyInnerArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.inheritPropertyInnerArray));
        });
        test('正常 前提：ビルトイン、テンプレートプロパティnumber各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10081');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.templatePropertyFullNumber);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyFullNumber));
        });
        test('正常 前提：ビルトイン、テンプレートプロパティstring各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10082');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.templatePropertyFullString);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyFullString));
        });
        test('正常 前提：ビルトイン、テンプレートプロパティboolean各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10083');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.templatePropertyFullBoolean);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyFullBoolean));
        });
        test('正常 前提：ビルトイン、テンプレートプロパティcode各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10084');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.templatePropertyFullCode);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyFullCode));
        });
        test('正常 前提：ビルトイン、テンプレートプロパティitem各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10085');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.templatePropertyFullItem);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyFullItem));
        });
        test('正常 前提：ビルトイン、テンプレートプロパティinner各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10086');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.templatePropertyFullInner);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyFullInner));
        });
        test('正常 前提：ビルトイン、テンプレートプロパティnumber[]各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10091');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.templatePropertyFullNumberArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyFullNumberArray));
        });
        test('正常 前提：ビルトイン、テンプレートプロパティstring[]各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10092');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.templatePropertyFullStringArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyFullStringArray));
        });
        test('正常 前提：ビルトイン、テンプレートプロパティboolean[]各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10093');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.templatePropertyFullBooleanArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyFullBooleanArray));
        });
        test('正常 前提：ビルトイン、テンプレートプロパティcode[]各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10094');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.templatePropertyFullCodeArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyFullCodeArray));
        });
        test('正常 前提：ビルトイン、テンプレートプロパティitem[]各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10095');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.templatePropertyFullItemArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyFullItemArray));
        });
        test('正常 前提：ビルトイン、テンプレートプロパティinner[]各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10096');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.templatePropertyFullInnerArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyFullInnerArray));
        });
    });

    /**
     * カタログ取得(/:code/:ver)
     */
    describe('カタログ取得(/:code/:ver)', () => {
        test('異常 前提：ビルトイン、未アクティベート', async () => {
            // アクティベート解除
            await common.executeSqlString(`
                DELETE FROM pxr_catalog.catalog
            `);

            // URLを生成
            const url = urljoin(Url.baseURI, '10001', '1');

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
        test('正常 前提：ビルトイン、コード指定なし', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10001', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.minimum);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.minimum));
        });
        test('正常 前提：ビルトイン、コード指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10002', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.minimumCode);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.minimumCode));
        });
        test('正常 前提：ビルトイン、コード、バージョン指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10003', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.minimumCodeVersion);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.minimumCodeVersion));
        });
        test('正常 前提：ビルトイン、テンプレートプロパティnumber指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10011', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.templatePropertyNumber);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyNumber));
        });
        test('正常 前提：ビルトイン、テンプレートプロパティstring指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10012', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.templatePropertyString);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyString));
        });
        test('正常 前提：ビルトイン、テンプレートプロパティboolean指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10013', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.templatePropertyBoolean);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyBoolean));
        });
        test('正常 前提：ビルトイン、テンプレートプロパティcode指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10014', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.templatePropertyCode);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyCode));
        });
        test('正常 前提：ビルトイン、テンプレートプロパティitem指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10015', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.templatePropertyItem);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyItem));
        });
        test('正常 前提：ビルトイン、テンプレートプロパティinner指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10016', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.templatePropertyInner);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyInner));
        });
        test('正常 前提：ビルトイン、テンプレートプロパティnumber[]指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10021', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.templatePropertyNumberArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyNumberArray));
        });
        test('正常 前提：ビルトイン、テンプレートプロパティstring[]指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10022', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.templatePropertyStringArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyStringArray));
        });
        test('正常 前提：ビルトイン、テンプレートプロパティboolean[]指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10023', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.templatePropertyBooleanArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyBooleanArray));
        });
        test('正常 前提：ビルトイン、テンプレートプロパティcode[]指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10024', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.templatePropertyCodeArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyCodeArray));
        });
        test('正常 前提：ビルトイン、テンプレートプロパティitem[]指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10025', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.templatePropertyItemArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyItemArray));
        });
        test('正常 前提：ビルトイン、テンプレートプロパティinner[]指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10026', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.templatePropertyInnerArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyInnerArray));
        });
        test('正常 前提：ビルトイン、属性指定値なし', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10031', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.attributeValueNone);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.attributeValueNone));
        });
        test('正常 前提：ビルトイン、属性指定値あり', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10032', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.attributeValueAvail);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.attributeValueAvail));
        });
        test('正常 前提：ビルトイン、値指定number', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10041', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.valueNumber);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.valueNumber));
        });
        test('正常 前提：ビルトイン、値指定string', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10042', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.valueString);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.valueString));
        });
        test('正常 前提：ビルトイン、値指定boolean', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10043', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.valueBoolean);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.valueBoolean));
        });
        test('正常 前提：ビルトイン、値指定code', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10044', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.valueCode);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.valueCode));
        });
        test('正常 前提：ビルトイン、値指定item', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10045', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.valueItem);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.valueItem));
        });
        test('正常 前提：ビルトイン、値指定inner', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10046', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.valueInner);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.valueInner));
        });
        test('正常 前提：ビルトイン、値指定number[]', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10051', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.valueNumberArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.valueNumberArray));
        });
        test('正常 前提：ビルトイン、値指定string[]', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10052', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.valueStringArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.valueStringArray));
        });
        test('正常 前提：ビルトイン、値指定boolean[]', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10053', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.valueBooleanArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.valueBooleanArray));
        });
        test('正常 前提：ビルトイン、値指定code[]', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10054', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.valueCodeArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.valueCodeArray));
        });
        test('正常 前提：ビルトイン、値指定item[]', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10055', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.valueItemArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.valueItemArray));
        });
        test('正常 前提：ビルトイン、値指定inner[]', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10056', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.valueInnerArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.valueInnerArray));
        });
        test('正常 前提：ビルトイン、継承、バージョン指定なし', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10061', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.inheritVersionNone);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.inheritVersionNone));
        });
        test('正常 前提：ビルトイン、継承、バージョン指定あり', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10062', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.inheritVersionAvail);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.inheritVersionAvail));
        });
        test('正常 前提：ビルトイン、継承、プロパティnumber', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10063', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.inheritPropertyNumber);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.inheritPropertyNumber));
        });
        test('正常 前提：ビルトイン、継承、プロパティstring', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10064', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.inheritPropertyString);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.inheritPropertyString));
        });
        test('正常 前提：ビルトイン、継承、プロパティboolean', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10065', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.inheritPropertyBoolean);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.inheritPropertyBoolean));
        });
        test('正常 前提：ビルトイン、継承、プロパティcode', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10066', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.inheritPropertyCode);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.inheritPropertyCode));
        });
        test('正常 前提：ビルトイン、継承、プロパティitem', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10067', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.inheritPropertyItem);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.inheritPropertyItem));
        });
        test('正常 前提：ビルトイン、継承、プロパティinner', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10068', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.inheritPropertyInner);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.inheritPropertyInner));
        });

        test('正常 前提：ビルトイン、継承、プロパティnumber[]', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10071', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.inheritPropertyNumberArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.inheritPropertyNumberArray));
        });
        test('正常 前提：ビルトイン、継承、プロパティstring[]', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10072', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.inheritPropertyStringArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.inheritPropertyStringArray));
        });
        test('正常 前提：ビルトイン、継承、プロパティboolean[]', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10073', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.inheritPropertyBooleanArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.inheritPropertyBooleanArray));
        });
        test('正常 前提：ビルトイン、継承、プロパティcode[]', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10074', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.inheritPropertyCodeArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.inheritPropertyCodeArray));
        });
        test('正常 前提：ビルトイン、継承、プロパティitem[]', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10075', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.inheritPropertyItemArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.inheritPropertyItemArray));
        });
        test('正常 前提：ビルトイン、継承、プロパティinner[]', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10076', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.inheritPropertyInnerArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.inheritPropertyInnerArray));
        });
        test('正常 前提：ビルトイン、テンプレートプロパティnumber各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10081', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.templatePropertyFullNumber);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyFullNumber));
        });
        test('正常 前提：ビルトイン、テンプレートプロパティstring各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10082', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.templatePropertyFullString);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyFullString));
        });
        test('正常 前提：ビルトイン、テンプレートプロパティboolean各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10083', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.templatePropertyFullBoolean);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyFullBoolean));
        });
        test('正常 前提：ビルトイン、テンプレートプロパティcode各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10084', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.templatePropertyFullCode);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyFullCode));
        });
        test('正常 前提：ビルトイン、テンプレートプロパティitem各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10085', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.templatePropertyFullItem);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyFullItem));
        });
        test('正常 前提：ビルトイン、テンプレートプロパティinner各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10086', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.templatePropertyFullInner);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyFullInner));
        });
        test('正常 前提：ビルトイン、テンプレートプロパティnumber[]各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10091', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.templatePropertyFullNumberArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyFullNumberArray));
        });
        test('正常 前提：ビルトイン、テンプレートプロパティstring[]各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10092', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.templatePropertyFullStringArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyFullStringArray));
        });
        test('正常 前提：ビルトイン、テンプレートプロパティboolean[]各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10093', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.templatePropertyFullBooleanArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyFullBooleanArray));
        });
        test('正常 前提：ビルトイン、テンプレートプロパティcode[]各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10094', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.templatePropertyFullCodeArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyFullCodeArray));
        });
        test('正常 前提：ビルトイン、テンプレートプロパティitem[]各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10095', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.templatePropertyFullItemArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyFullItemArray));
        });
        test('正常 前提：ビルトイン、テンプレートプロパティinner[]各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '10096', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInResponse.templatePropertyFullInnerArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInResponse.templatePropertyFullInnerArray));
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
            const url = urljoin(Url.builtInURI, '10001', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInRequest.minimumCode);

            // アクティベート
            await common.executeSqlFile('activate.sql');

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_ACTIVATE);
        });
        test('正常 前提：モデル、コード指定なし', async () => {
            // URLを生成
            const url = urljoin(Url.builtInURI, '10001', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInUpdateRequest.minimum);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInUpdateResponse.minimum);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInUpdateResponse.minimum));
        });
        test('正常 前提：モデル、コード指定', async () => {
            // URLを生成
            const url = urljoin(Url.builtInURI, '10002', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInUpdateRequest.minimumCode);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInUpdateResponse.minimumCode);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInUpdateResponse.minimumCode));
        });
        test('正常 前提：モデル、コード、バージョン指定', async () => {
            // URLを生成
            const url = urljoin(Url.builtInURI, '10003', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInUpdateRequest.minimumCodeVersion);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInUpdateResponse.minimumCodeVersion);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInUpdateResponse.minimumCodeVersion));
        });
        test('正常 前提：モデル、テンプレートプロパティnumber指定', async () => {
            // URLを生成
            const url = urljoin(Url.builtInURI, '10011', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInUpdateRequest.templatePropertyNumber);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInUpdateResponse.templatePropertyNumber);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInUpdateResponse.templatePropertyNumber));
        });
        test('正常 前提：モデル、テンプレートプロパティstring指定', async () => {
            // URLを生成
            const url = urljoin(Url.builtInURI, '10012', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInUpdateRequest.templatePropertyString);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInUpdateResponse.templatePropertyString);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInUpdateResponse.templatePropertyString));
        });
        test('正常 前提：モデル、テンプレートプロパティboolean指定', async () => {
            // URLを生成
            const url = urljoin(Url.builtInURI, '10013', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInUpdateRequest.templatePropertyBoolean);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInUpdateResponse.templatePropertyBoolean);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInUpdateResponse.templatePropertyBoolean));
        });
        test('正常 前提：モデル、テンプレートプロパティcode指定', async () => {
            // URLを生成
            const url = urljoin(Url.builtInURI, '10014', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInUpdateRequest.templatePropertyCode);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInUpdateResponse.templatePropertyCode);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInUpdateResponse.templatePropertyCode));
        });
        test('正常 前提：モデル、テンプレートプロパティitem指定', async () => {
            // URLを生成
            const url = urljoin(Url.builtInURI, '10015', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInUpdateRequest.templatePropertyItem);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInUpdateResponse.templatePropertyItem);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInUpdateResponse.templatePropertyItem));
        });
        test('正常 前提：モデル、テンプレートプロパティinner指定', async () => {
            // URLを生成
            const url = urljoin(Url.builtInURI, '10016', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInUpdateRequest.templatePropertyInner);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInUpdateResponse.templatePropertyInner);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInUpdateResponse.templatePropertyInner));
        });
        test('正常 前提：モデル、テンプレートプロパティnumber[]指定', async () => {
            // URLを生成
            const url = urljoin(Url.builtInURI, '10021', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInUpdateRequest.templatePropertyNumberArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInUpdateResponse.templatePropertyNumberArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInUpdateResponse.templatePropertyNumberArray));
        });
        test('正常 前提：モデル、テンプレートプロパティstring[]指定', async () => {
            // URLを生成
            const url = urljoin(Url.builtInURI, '10022', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInUpdateRequest.templatePropertyStringArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInUpdateResponse.templatePropertyStringArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInUpdateResponse.templatePropertyStringArray));
        });
        test('正常 前提：モデル、テンプレートプロパティboolean[]指定', async () => {
            // URLを生成
            const url = urljoin(Url.builtInURI, '10023', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInUpdateRequest.templatePropertyBooleanArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInUpdateResponse.templatePropertyBooleanArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInUpdateResponse.templatePropertyBooleanArray));
        });
        test('正常 前提：モデル、テンプレートプロパティcode[]指定', async () => {
            // URLを生成
            const url = urljoin(Url.builtInURI, '10024', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInUpdateRequest.templatePropertyCodeArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInUpdateResponse.templatePropertyCodeArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInUpdateResponse.templatePropertyCodeArray));
        });
        test('正常 前提：モデル、テンプレートプロパティitem[]指定', async () => {
            // URLを生成
            const url = urljoin(Url.builtInURI, '10025', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInUpdateRequest.templatePropertyItemArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInUpdateResponse.templatePropertyItemArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInUpdateResponse.templatePropertyItemArray));
        });
        test('正常 前提：モデル、テンプレートプロパティinner[]指定', async () => {
            // URLを生成
            const url = urljoin(Url.builtInURI, '10026', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInUpdateRequest.templatePropertyInnerArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInUpdateResponse.templatePropertyInnerArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInUpdateResponse.templatePropertyInnerArray));
        });
        test('正常 前提：モデル、属性指定値なし', async () => {
            // URLを生成
            const url = urljoin(Url.builtInURI, '10031', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInUpdateRequest.attributeValueNone);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInUpdateResponse.attributeValueNone);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInUpdateResponse.attributeValueNone));
        });
        test('正常 前提：モデル、属性指定値あり', async () => {
            // URLを生成
            const url = urljoin(Url.builtInURI, '10032', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInUpdateRequest.attributeValueAvail);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInUpdateResponse.attributeValueAvail);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInUpdateResponse.attributeValueAvail));
        });
        test('正常 前提：モデル、値指定number', async () => {
            // URLを生成
            const url = urljoin(Url.builtInURI, '10041', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInUpdateRequest.valueNumber);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInUpdateResponse.valueNumber);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInUpdateResponse.valueNumber));
        });
        test('正常 前提：モデル、値指定string', async () => {
            // URLを生成
            const url = urljoin(Url.builtInURI, '10042', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInUpdateRequest.valueString);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInUpdateResponse.valueString);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInUpdateResponse.valueString));
        });
        test('正常 前提：モデル、値指定boolean', async () => {
            // URLを生成
            const url = urljoin(Url.builtInURI, '10043', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInUpdateRequest.valueBoolean);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInUpdateResponse.valueBoolean);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInUpdateResponse.valueBoolean));
        });
        test('正常 前提：モデル、値指定code', async () => {
            // URLを生成
            const url = urljoin(Url.builtInURI, '10044', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInUpdateRequest.valueCode);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInUpdateResponse.valueCode);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInUpdateResponse.valueCode));
        });
        test('正常 前提：モデル、値指定item', async () => {
            // URLを生成
            const url = urljoin(Url.builtInURI, '10045', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInUpdateRequest.valueItem);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInUpdateResponse.valueItem);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInUpdateResponse.valueItem));
        });
        test('正常 前提：モデル、値指定inner', async () => {
            // URLを生成
            const url = urljoin(Url.builtInURI, '10046', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInUpdateRequest.valueInner);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInUpdateResponse.valueInner);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInUpdateResponse.valueInner));
        });
        test('正常 前提：モデル、値指定number[]', async () => {
            // URLを生成
            const url = urljoin(Url.builtInURI, '10051', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInUpdateRequest.valueNumberArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInUpdateResponse.valueNumberArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInUpdateResponse.valueNumberArray));
        });
        test('正常 前提：モデル、値指定string[]', async () => {
            // URLを生成
            const url = urljoin(Url.builtInURI, '10052', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInUpdateRequest.valueStringArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInUpdateResponse.valueStringArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInUpdateResponse.valueStringArray));
        });
        test('正常 前提：モデル、値指定boolean[]', async () => {
            // URLを生成
            const url = urljoin(Url.builtInURI, '10053', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInUpdateRequest.valueBooleanArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInUpdateResponse.valueBooleanArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInUpdateResponse.valueBooleanArray));
        });
        test('正常 前提：モデル、値指定code[]', async () => {
            // URLを生成
            const url = urljoin(Url.builtInURI, '10054', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInUpdateRequest.valueCodeArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInUpdateResponse.valueCodeArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInUpdateResponse.valueCodeArray));
        });
        test('正常 前提：モデル、値指定item[]', async () => {
            // URLを生成
            const url = urljoin(Url.builtInURI, '10055', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInUpdateRequest.valueItemArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInUpdateResponse.valueItemArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInUpdateResponse.valueItemArray));
        });
        test('正常 前提：モデル、値指定inner[]', async () => {
            // URLを生成
            const url = urljoin(Url.builtInURI, '10056', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInUpdateRequest.valueInnerArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInUpdateResponse.valueInnerArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInUpdateResponse.valueInnerArray));
        });
        test('正常 前提：モデル、継承、バージョン指定なし', async () => {
            // URLを生成
            const url = urljoin(Url.builtInURI, '10061', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInUpdateRequest.inheritVersionNone);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInUpdateResponse.inheritVersionNone);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInUpdateResponse.inheritVersionNone));
        });
        test('正常 前提：モデル、継承、バージョン指定あり', async () => {
            // URLを生成
            const url = urljoin(Url.builtInURI, '10062', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInUpdateRequest.inheritVersionAvail);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInUpdateResponse.inheritVersionAvail);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInUpdateResponse.inheritVersionAvail));
        });
        test('正常 前提：モデル、継承、プロパティnumber', async () => {
            // URLを生成
            const url = urljoin(Url.builtInURI, '10063', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInUpdateRequest.inheritPropertyNumber);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInUpdateResponse.inheritPropertyNumber);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInUpdateResponse.inheritPropertyNumber));
        });
        test('正常 前提：モデル、継承、プロパティstring', async () => {
            // URLを生成
            const url = urljoin(Url.builtInURI, '10064', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInUpdateRequest.inheritPropertyString);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInUpdateResponse.inheritPropertyString);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInUpdateResponse.inheritPropertyString));
        });
        test('正常 前提：モデル、継承、プロパティboolean', async () => {
            // URLを生成
            const url = urljoin(Url.builtInURI, '10065', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInUpdateRequest.inheritPropertyBoolean);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInUpdateResponse.inheritPropertyBoolean);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInUpdateResponse.inheritPropertyBoolean));
        });
        test('正常 前提：モデル、継承、プロパティcode', async () => {
            // URLを生成
            const url = urljoin(Url.builtInURI, '10066', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInUpdateRequest.inheritPropertyCode);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInUpdateResponse.inheritPropertyCode);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInUpdateResponse.inheritPropertyCode));
        });
        test('正常 前提：モデル、継承、プロパティitem', async () => {
            // URLを生成
            const url = urljoin(Url.builtInURI, '10067', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInUpdateRequest.inheritPropertyItem);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInUpdateResponse.inheritPropertyItem);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInUpdateResponse.inheritPropertyItem));
        });
        test('正常 前提：モデル、継承、プロパティinner', async () => {
            // URLを生成
            const url = urljoin(Url.builtInURI, '10068', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInUpdateRequest.inheritPropertyInner);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInUpdateResponse.inheritPropertyInner);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInUpdateResponse.inheritPropertyInner));
        });
        test('正常 前提：モデル、継承、プロパティnumber[]', async () => {
            // URLを生成
            const url = urljoin(Url.builtInURI, '10071', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInUpdateRequest.inheritPropertyNumberArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInUpdateResponse.inheritPropertyNumberArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInUpdateResponse.inheritPropertyNumberArray));
        });
        test('正常 前提：モデル、継承、プロパティstring[]', async () => {
            // URLを生成
            const url = urljoin(Url.builtInURI, '10072', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInUpdateRequest.inheritPropertyStringArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInUpdateResponse.inheritPropertyStringArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInUpdateResponse.inheritPropertyStringArray));
        });
        test('正常 前提：モデル、継承、プロパティboolean[]', async () => {
            // URLを生成
            const url = urljoin(Url.builtInURI, '10073', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInUpdateRequest.inheritPropertyBooleanArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInUpdateResponse.inheritPropertyBooleanArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInUpdateResponse.inheritPropertyBooleanArray));
        });
        test('正常 前提：モデル、継承、プロパティcode[]', async () => {
            // URLを生成
            const url = urljoin(Url.builtInURI, '10074', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInUpdateRequest.inheritPropertyCodeArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInUpdateResponse.inheritPropertyCodeArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInUpdateResponse.inheritPropertyCodeArray));
        });
        test('正常 前提：モデル、継承、プロパティitem[]', async () => {
            // URLを生成
            const url = urljoin(Url.builtInURI, '10075', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInUpdateRequest.inheritPropertyItemArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInUpdateResponse.inheritPropertyItemArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInUpdateResponse.inheritPropertyItemArray));
        });
        test('正常 前提：モデル、継承、プロパティinner[]', async () => {
            // URLを生成
            const url = urljoin(Url.builtInURI, '10076', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInUpdateRequest.inheritPropertyInnerArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInUpdateResponse.inheritPropertyInnerArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInUpdateResponse.inheritPropertyInnerArray));
        });
        test('正常 前提：モデル、プロパティnumber各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.builtInURI, '10081', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInUpdateRequest.templatePropertyFullNumber);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInUpdateResponse.templatePropertyFullNumber);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInUpdateResponse.templatePropertyFullNumber));
        });
        test('正常 前提：モデル、プロパティstring各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.builtInURI, '10082', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInUpdateRequest.templatePropertyFullString);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInUpdateResponse.templatePropertyFullString);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInUpdateResponse.templatePropertyFullString));
        });
        test('正常 前提：モデル、プロパティboolean各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.builtInURI, '10083', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInUpdateRequest.templatePropertyFullBoolean);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInUpdateResponse.templatePropertyFullBoolean);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInUpdateResponse.templatePropertyFullBoolean));
        });
        test('正常 前提：モデル、プロパティcode各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.builtInURI, '10084', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInUpdateRequest.templatePropertyFullCode);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInUpdateResponse.templatePropertyFullCode);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInUpdateResponse.templatePropertyFullCode));
        });
        test('正常 前提：モデル、プロパティitem各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.builtInURI, '10085', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInUpdateRequest.templatePropertyFullItem);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInUpdateResponse.templatePropertyFullItem);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInUpdateResponse.templatePropertyFullItem));
        });
        test('正常 前提：モデル、プロパティinner各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.builtInURI, '10086', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInUpdateRequest.templatePropertyFullInner);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInUpdateResponse.templatePropertyFullInner);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInUpdateResponse.templatePropertyFullInner));
        });
        test('正常 前提：モデル、プロパティnumber[]各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.builtInURI, '10091', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInUpdateRequest.templatePropertyFullNumberArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInUpdateResponse.templatePropertyFullNumberArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInUpdateResponse.templatePropertyFullNumberArray));
        });
        test('正常 前提：モデル、プロパティstring[]各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.builtInURI, '10092', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInUpdateRequest.templatePropertyFullStringArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInUpdateResponse.templatePropertyFullStringArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInUpdateResponse.templatePropertyFullStringArray));
        });
        test('正常 前提：モデル、プロパティboolean[]各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.builtInURI, '10093', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInUpdateRequest.templatePropertyFullBooleanArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInUpdateResponse.templatePropertyFullBooleanArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInUpdateResponse.templatePropertyFullBooleanArray));
        });
        test('正常 前提：モデル、プロパティcode[]各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.builtInURI, '10094', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInUpdateRequest.templatePropertyFullCodeArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInUpdateResponse.templatePropertyFullCodeArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInUpdateResponse.templatePropertyFullCodeArray));
        });
        test('正常 前提：モデル、プロパティitem[]各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.builtInURI, '10095', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInUpdateRequest.templatePropertyFullItemArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInUpdateResponse.templatePropertyFullItemArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInUpdateResponse.templatePropertyFullItemArray));
        });
        test('正常 前提：モデル、プロパティinner[]各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.builtInURI, '10096', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogBuiltInUpdateRequest.templatePropertyFullInnerArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogBuiltInUpdateResponse.templatePropertyFullInnerArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBuiltInUpdateResponse.templatePropertyFullInnerArray));
        });
    });

    /**
     * カタログ削除
     */
    describe('カタログ削除', () => {
        test('異常 前提：ビルトイン、未アクティベート', async () => {
            // アクティベート解除
            await common.executeSqlString(`
                DELETE FROM pxr_catalog.catalog
            `);

            // URLを生成
            const url = urljoin(Url.builtInURI, '10001');

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
        test('正常 前提：ビルトイン', async () => {
            // URLを生成
            const url = urljoin(Url.builtInURI, '10001');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .delete(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.code).toBe(10001);
        });
    });
});
