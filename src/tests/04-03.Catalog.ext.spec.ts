/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import * as supertest from 'supertest';
import { Application } from '../resources/config/Application';
import Common, { Url } from './Common';
import { Session } from './Session';
import { CatalogExtRequest } from './CatalogExtRequest';
import { CatalogExtResponse } from './CatalogExtResponse';
import { CatalogExtUpdateRequest } from './CatalogExtUpdateRequest';
import { CatalogExtUpdateResponse } from './CatalogExtUpdateResponse';
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
        test('異常 前提：拡張、未アクティベート', async () => {
            // アクティベート解除
            await common.executeSqlString(`
                DELETE FROM pxr_catalog.catalog
            `);

            // URLを生成
            const url = Url.extURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtRequest.minimumCode);

            // アクティベート
            await common.executeSqlFile('activate.sql');

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_ACTIVATE);
        });
        test('正常 前提：拡張、コード指定なし', async () => {
            // URLを生成
            const url = Url.extURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtRequest.minimum);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.minimum);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.minimum));
        });
        test('正常 前提：拡張、コード指定', async () => {
            // URLを生成
            const url = Url.extURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtRequest.minimumCode);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.minimumCode);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.minimumCode));
        });
        test('正常 前提：拡張、コード、バージョン指定', async () => {
            // URLを生成
            const url = Url.extURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtRequest.minimumCodeVersion);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.minimumCodeVersion);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.minimumCodeVersion));
        });
        test('正常 前提：拡張、テンプレートプロパティnumber指定', async () => {
            // URLを生成
            const url = Url.extURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtRequest.templatePropertyNumber);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.templatePropertyNumber);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.templatePropertyNumber));
        });
        test('正常 前提：拡張、テンプレートプロパティstring指定', async () => {
            // URLを生成
            const url = Url.extURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtRequest.templatePropertyString);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.templatePropertyString);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.templatePropertyString));
        });
        test('正常 前提：拡張、テンプレートプロパティboolean指定', async () => {
            // URLを生成
            const url = Url.extURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtRequest.templatePropertyBoolean);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.templatePropertyBoolean);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.templatePropertyBoolean));
        });
        test('正常 前提：拡張、テンプレートプロパティcode指定', async () => {
            // URLを生成
            const url = Url.extURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtRequest.templatePropertyCode);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.templatePropertyCode);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.templatePropertyCode));
        });
        test('正常 前提：拡張、テンプレートプロパティitem指定', async () => {
            // URLを生成
            const url = Url.extURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtRequest.templatePropertyItem);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.templatePropertyItem);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.templatePropertyItem));
        });
        test('正常 前提：拡張、テンプレートプロパティinner指定', async () => {
            // URLを生成
            const url = Url.extURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtRequest.templatePropertyInner);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.templatePropertyInner);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.templatePropertyInner));
        });
        test('正常 前提：拡張、テンプレートプロパティnumber[]指定', async () => {
            // URLを生成
            const url = Url.extURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtRequest.templatePropertyNumberArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.templatePropertyNumberArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.templatePropertyNumberArray));
        });
        test('正常 前提：拡張、テンプレートプロパティstring[]指定', async () => {
            // URLを生成
            const url = Url.extURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtRequest.templatePropertyStringArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.templatePropertyStringArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.templatePropertyStringArray));
        });
        test('正常 前提：拡張、テンプレートプロパティboolean[]指定', async () => {
            // URLを生成
            const url = Url.extURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtRequest.templatePropertyBooleanArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.templatePropertyBooleanArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.templatePropertyBooleanArray));
        });
        test('正常 前提：拡張、テンプレートプロパティcode[]指定', async () => {
            // URLを生成
            const url = Url.extURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtRequest.templatePropertyCodeArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.templatePropertyCodeArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.templatePropertyCodeArray));
        });
        test('正常 前提：拡張、テンプレートプロパティitem[]指定', async () => {
            // URLを生成
            const url = Url.extURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtRequest.templatePropertyItemArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.templatePropertyItemArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.templatePropertyItemArray));
        });
        test('正常 前提：拡張、テンプレートプロパティinner[]指定', async () => {
            // URLを生成
            const url = Url.extURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtRequest.templatePropertyInnerArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.templatePropertyInnerArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.templatePropertyInnerArray));
        });
        test('正常 前提：拡張、属性指定値なし', async () => {
            // URLを生成
            const url = Url.extURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtRequest.attributeValueNone);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.attributeValueNone);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.attributeValueNone));
        });
        test('正常 前提：拡張、属性指定値あり', async () => {
            // URLを生成
            const url = Url.extURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtRequest.attributeValueAvail);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.attributeValueAvail);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.attributeValueAvail));
        });
        test('正常 前提：拡張、値指定number', async () => {
            // URLを生成
            const url = Url.extURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtRequest.valueNumber);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.valueNumber);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.valueNumber));
        });
        test('正常 前提：拡張、値指定string', async () => {
            // URLを生成
            const url = Url.extURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtRequest.valueString);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.valueString);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.valueString));
        });
        test('正常 前提：拡張、値指定boolean', async () => {
            // URLを生成
            const url = Url.extURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtRequest.valueBoolean);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.valueBoolean);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.valueBoolean));
        });
        test('正常 前提：拡張、値指定code', async () => {
            // URLを生成
            const url = Url.extURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtRequest.valueCode);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.valueCode);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.valueCode));
        });
        test('正常 前提：拡張、値指定item', async () => {
            // URLを生成
            const url = Url.extURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtRequest.valueItem);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.valueItem);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.valueItem));
        });
        test('正常 前提：拡張、値指定inner', async () => {
            // URLを生成
            const url = Url.extURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtRequest.valueInner);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.valueInner);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.valueInner));
        });
        test('正常 前提：拡張、値指定number[]', async () => {
            // URLを生成
            const url = Url.extURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtRequest.valueNumberArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.valueNumberArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.valueNumberArray));
        });
        test('正常 前提：拡張、値指定string[]', async () => {
            // URLを生成
            const url = Url.extURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtRequest.valueStringArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.valueStringArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.valueStringArray));
        });
        test('正常 前提：拡張、値指定boolean[]', async () => {
            // URLを生成
            const url = Url.extURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtRequest.valueBooleanArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.valueBooleanArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.valueBooleanArray));
        });
        test('正常 前提：拡張、値指定code[]', async () => {
            // URLを生成
            const url = Url.extURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtRequest.valueCodeArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.valueCodeArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.valueCodeArray));
        });
        test('正常 前提：拡張、値指定item[]', async () => {
            // URLを生成
            const url = Url.extURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtRequest.valueItemArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.valueItemArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.valueItemArray));
        });
        test('正常 前提：拡張、値指定inner[]', async () => {
            // URLを生成
            const url = Url.extURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtRequest.valueInnerArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.valueInnerArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.valueInnerArray));
        });
        test('正常 前提：拡張、継承、バージョン指定なし', async () => {
            // URLを生成
            const url = Url.extURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtRequest.inheritVersionNone);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.inheritVersionNone);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.inheritVersionNone));
        });
        test('正常 前提：拡張、継承、バージョン指定あり', async () => {
            // URLを生成
            const url = Url.extURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtRequest.inheritVersionAvail);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.inheritVersionAvail);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.inheritVersionAvail));
        });
        test('正常 前提：拡張、継承、プロパティnumber', async () => {
            // URLを生成
            const url = Url.extURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtRequest.inheritPropertyNumber);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.inheritPropertyNumber);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.inheritPropertyNumber));
        });
        test('正常 前提：拡張、継承、プロパティstring', async () => {
            // URLを生成
            const url = Url.extURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtRequest.inheritPropertyString);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.inheritPropertyString);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.inheritPropertyString));
        });
        test('正常 前提：拡張、継承、プロパティboolean', async () => {
            // URLを生成
            const url = Url.extURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtRequest.inheritPropertyBoolean);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.inheritPropertyBoolean);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.inheritPropertyBoolean));
        });
        test('正常 前提：拡張、継承、プロパティcode', async () => {
            // URLを生成
            const url = Url.extURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtRequest.inheritPropertyCode);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.inheritPropertyCode);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.inheritPropertyCode));
        });
        test('正常 前提：拡張、継承、プロパティitem', async () => {
            // URLを生成
            const url = Url.extURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtRequest.inheritPropertyItem);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.inheritPropertyItem);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.inheritPropertyItem));
        });
        test('正常 前提：拡張、継承、プロパティinner', async () => {
            // URLを生成
            const url = Url.extURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtRequest.inheritPropertyInner);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.inheritPropertyInner);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.inheritPropertyInner));
        });
        test('正常 前提：拡張、継承、プロパティnumber[]', async () => {
            // URLを生成
            const url = Url.extURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtRequest.inheritPropertyNumberArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.inheritPropertyNumberArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.inheritPropertyNumberArray));
        });
        test('正常 前提：拡張、継承、プロパティstring[]', async () => {
            // URLを生成
            const url = Url.extURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtRequest.inheritPropertyStringArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.inheritPropertyStringArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.inheritPropertyStringArray));
        });
        test('正常 前提：拡張、継承、プロパティboolean[]', async () => {
            // URLを生成
            const url = Url.extURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtRequest.inheritPropertyBooleanArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.inheritPropertyBooleanArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.inheritPropertyBooleanArray));
        });
        test('正常 前提：拡張、継承、プロパティcode[]', async () => {
            // URLを生成
            const url = Url.extURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtRequest.inheritPropertyCodeArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.inheritPropertyCodeArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.inheritPropertyCodeArray));
        });
        test('正常 前提：拡張、継承、プロパティitem[]', async () => {
            // URLを生成
            const url = Url.extURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtRequest.inheritPropertyItemArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.inheritPropertyItemArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.inheritPropertyItemArray));
        });
        test('正常 前提：拡張、継承、プロパティinner[]', async () => {
            // URLを生成
            const url = Url.extURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtRequest.inheritPropertyInnerArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.inheritPropertyInnerArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.inheritPropertyInnerArray));
        });
        test('正常 前提：拡張、プロパティnumber各種設定', async () => {
            // URLを生成
            const url = Url.extURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtRequest.templatePropertyFullNumber);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.templatePropertyFullNumber);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.templatePropertyFullNumber));
        });
        test('正常 前提：拡張、プロパティstring各種設定', async () => {
            // URLを生成
            const url = Url.extURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtRequest.templatePropertyFullString);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.templatePropertyFullString);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.templatePropertyFullString));
        });
        test('正常 前提：拡張、プロパティboolean各種設定', async () => {
            // URLを生成
            const url = Url.extURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtRequest.templatePropertyFullBoolean);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.templatePropertyFullBoolean);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.templatePropertyFullBoolean));
        });
        test('正常 前提：拡張、プロパティcode各種設定', async () => {
            // URLを生成
            const url = Url.extURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtRequest.templatePropertyFullCode);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.templatePropertyFullCode);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.templatePropertyFullCode));
        });
        test('正常 前提：拡張、プロパティitem各種設定', async () => {
            // URLを生成
            const url = Url.extURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtRequest.templatePropertyFullItem);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.templatePropertyFullItem);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.templatePropertyFullItem));
        });
        test('正常 前提：拡張、プロパティinner各種設定', async () => {
            // URLを生成
            const url = Url.extURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtRequest.templatePropertyFullInner);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.templatePropertyFullInner);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.templatePropertyFullInner));
        });
        test('正常 前提：拡張、プロパティnumber[]各種設定', async () => {
            // URLを生成
            const url = Url.extURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtRequest.templatePropertyFullNumberArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.templatePropertyFullNumberArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.templatePropertyFullNumberArray));
        });
        test('正常 前提：拡張、プロパティstring[]各種設定', async () => {
            // URLを生成
            const url = Url.extURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtRequest.templatePropertyFullStringArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.templatePropertyFullStringArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.templatePropertyFullStringArray));
        });
        test('正常 前提：拡張、プロパティboolean[]各種設定', async () => {
            // URLを生成
            const url = Url.extURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtRequest.templatePropertyFullBooleanArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.templatePropertyFullBooleanArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.templatePropertyFullBooleanArray));
        });
        test('正常 前提：拡張、プロパティcode[]各種設定', async () => {
            // URLを生成
            const url = Url.extURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtRequest.templatePropertyFullCodeArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.templatePropertyFullCodeArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.templatePropertyFullCodeArray));
        });
        test('正常 前提：拡張、プロパティitem[]各種設定', async () => {
            // URLを生成
            const url = Url.extURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtRequest.templatePropertyFullItemArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.templatePropertyFullItemArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.templatePropertyFullItemArray));
        });
        test('正常 前提：拡張、プロパティinner[]各種設定', async () => {
            // URLを生成
            const url = Url.extURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtRequest.templatePropertyFullInnerArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.templatePropertyFullInnerArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.templatePropertyFullInnerArray));
        });
    });

    /**
     * カタログ取得
     */
    describe('カタログ取得', () => {
        test('異常 前提：拡張、未アクティベート', async () => {
            // アクティベート解除
            await common.executeSqlString(`
                DELETE FROM pxr_catalog.catalog
            `);

            // URLを生成
            const url = urljoin(Url.baseURI, '?ns=catalog/ext/unit-test');

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
        test('正常 前提：拡張', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '?ns=catalog/ext/unit-test');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            let index: number = 0;
            expect(response.status).toBe(200);
            expect(response.body[index]).toMatchObject(CatalogExtResponse.minimum);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogExtResponse.minimum));
            index++;
            expect(response.body[index]).toMatchObject(CatalogExtResponse.minimumCode);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogExtResponse.minimumCode));
            index++;
            expect(response.body[index]).toMatchObject(CatalogExtResponse.minimumCodeVersion);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogExtResponse.minimumCodeVersion));
            index++;
            expect(response.body[index]).toMatchObject(CatalogExtResponse.templatePropertyNumber);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogExtResponse.templatePropertyNumber));
            index++;
            expect(response.body[index]).toMatchObject(CatalogExtResponse.templatePropertyString);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogExtResponse.templatePropertyString));
            index++;
            expect(response.body[index]).toMatchObject(CatalogExtResponse.templatePropertyBoolean);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogExtResponse.templatePropertyBoolean));
            index++;
            expect(response.body[index]).toMatchObject(CatalogExtResponse.templatePropertyCode);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogExtResponse.templatePropertyCode));
            index++;
            expect(response.body[index]).toMatchObject(CatalogExtResponse.templatePropertyItem);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogExtResponse.templatePropertyItem));
            index++;
            expect(response.body[index]).toMatchObject(CatalogExtResponse.templatePropertyInner);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogExtResponse.templatePropertyInner));
            index++;
            expect(response.body[index]).toMatchObject(CatalogExtResponse.templatePropertyNumberArray);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogExtResponse.templatePropertyNumberArray));
            index++;
            expect(response.body[index]).toMatchObject(CatalogExtResponse.templatePropertyStringArray);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogExtResponse.templatePropertyStringArray));
            index++;
            expect(response.body[index]).toMatchObject(CatalogExtResponse.templatePropertyBooleanArray);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogExtResponse.templatePropertyBooleanArray));
            index++;
            expect(response.body[index]).toMatchObject(CatalogExtResponse.templatePropertyCodeArray);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogExtResponse.templatePropertyCodeArray));
            index++;
            expect(response.body[index]).toMatchObject(CatalogExtResponse.templatePropertyItemArray);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogExtResponse.templatePropertyItemArray));
            index++;
            expect(response.body[index]).toMatchObject(CatalogExtResponse.templatePropertyInnerArray);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogExtResponse.templatePropertyInnerArray));
            index++;
            expect(response.body[index]).toMatchObject(CatalogExtResponse.attributeValueNone);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogExtResponse.attributeValueNone));
            index++;
            expect(response.body[index]).toMatchObject(CatalogExtResponse.attributeValueAvail);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogExtResponse.attributeValueAvail));
            index++;
            expect(response.body[index]).toMatchObject(CatalogExtResponse.valueNumber);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogExtResponse.valueNumber));
            index++;
            expect(response.body[index]).toMatchObject(CatalogExtResponse.valueString);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogExtResponse.valueString));
            index++;
            expect(response.body[index]).toMatchObject(CatalogExtResponse.valueBoolean);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogExtResponse.valueBoolean));
            index++;
            expect(response.body[index]).toMatchObject(CatalogExtResponse.valueCode);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogExtResponse.valueCode));
            index++;
            expect(response.body[index]).toMatchObject(CatalogExtResponse.valueItem);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogExtResponse.valueItem));
            index++;
            expect(response.body[index]).toMatchObject(CatalogExtResponse.valueInner);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogExtResponse.valueInner));
            index++;
            expect(response.body[index]).toMatchObject(CatalogExtResponse.valueNumberArray);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogExtResponse.valueNumberArray));
            index++;
            expect(response.body[index]).toMatchObject(CatalogExtResponse.valueStringArray);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogExtResponse.valueStringArray));
            index++;
            expect(response.body[index]).toMatchObject(CatalogExtResponse.valueBooleanArray);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogExtResponse.valueBooleanArray));
            index++;
            expect(response.body[index]).toMatchObject(CatalogExtResponse.valueCodeArray);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogExtResponse.valueCodeArray));
            index++;
            expect(response.body[index]).toMatchObject(CatalogExtResponse.valueItemArray);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogExtResponse.valueItemArray));
            index++;
            expect(response.body[index]).toMatchObject(CatalogExtResponse.valueInnerArray);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogExtResponse.valueInnerArray));
            index++;
            expect(response.body[index]).toMatchObject(CatalogExtResponse.inheritVersionNone);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogExtResponse.inheritVersionNone));
            index++;
            expect(response.body[index]).toMatchObject(CatalogExtResponse.inheritVersionAvail);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogExtResponse.inheritVersionAvail));
            index++;
            expect(response.body[index]).toMatchObject(CatalogExtResponse.inheritPropertyNumber);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogExtResponse.inheritPropertyNumber));
            index++;
            expect(response.body[index]).toMatchObject(CatalogExtResponse.inheritPropertyString);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogExtResponse.inheritPropertyString));
            index++;
            expect(response.body[index]).toMatchObject(CatalogExtResponse.inheritPropertyBoolean);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogExtResponse.inheritPropertyBoolean));
            index++;
            expect(response.body[index]).toMatchObject(CatalogExtResponse.inheritPropertyCode);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogExtResponse.inheritPropertyCode));
            index++;
            expect(response.body[index]).toMatchObject(CatalogExtResponse.inheritPropertyItem);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogExtResponse.inheritPropertyItem));
            index++;
            expect(response.body[index]).toMatchObject(CatalogExtResponse.inheritPropertyInner);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogExtResponse.inheritPropertyInner));
            index++;
            expect(response.body[index]).toMatchObject(CatalogExtResponse.inheritPropertyNumberArray);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogExtResponse.inheritPropertyNumberArray));
            index++;
            expect(response.body[index]).toMatchObject(CatalogExtResponse.inheritPropertyStringArray);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogExtResponse.inheritPropertyStringArray));
            index++;
            expect(response.body[index]).toMatchObject(CatalogExtResponse.inheritPropertyBooleanArray);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogExtResponse.inheritPropertyBooleanArray));
            index++;
            expect(response.body[index]).toMatchObject(CatalogExtResponse.inheritPropertyCodeArray);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogExtResponse.inheritPropertyCodeArray));
            index++;
            expect(response.body[index]).toMatchObject(CatalogExtResponse.inheritPropertyItemArray);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogExtResponse.inheritPropertyItemArray));
            index++;
            expect(response.body[index]).toMatchObject(CatalogExtResponse.inheritPropertyInnerArray);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogExtResponse.inheritPropertyInnerArray));
            index++;
        });
        test('正常 前提：拡張 cmatrix', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '?ns=catalog/ext/cmatrix/unit-test');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            let index: number = 0;
            expect(response.status).toBe(200);
            expect(response.body[index]).toMatchObject(CatalogExtResponse.templatePropertyFullNumber);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogExtResponse.templatePropertyFullNumber));
            index++;
            expect(response.body[index]).toMatchObject(CatalogExtResponse.templatePropertyFullString);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogExtResponse.templatePropertyFullString));
            index++;
            expect(response.body[index]).toMatchObject(CatalogExtResponse.templatePropertyFullBoolean);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogExtResponse.templatePropertyFullBoolean));
            index++;
            expect(response.body[index]).toMatchObject(CatalogExtResponse.templatePropertyFullCode);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogExtResponse.templatePropertyFullCode));
            index++;
            expect(response.body[index]).toMatchObject(CatalogExtResponse.templatePropertyFullItem);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogExtResponse.templatePropertyFullItem));
            index++;
            expect(response.body[index]).toMatchObject(CatalogExtResponse.templatePropertyFullInner);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogExtResponse.templatePropertyFullInner));
            index++;
            expect(response.body[index]).toMatchObject(CatalogExtResponse.templatePropertyFullNumberArray);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogExtResponse.templatePropertyFullNumberArray));
            index++;
            expect(response.body[index]).toMatchObject(CatalogExtResponse.templatePropertyFullStringArray);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogExtResponse.templatePropertyFullStringArray));
            index++;
            expect(response.body[index]).toMatchObject(CatalogExtResponse.templatePropertyFullBooleanArray);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogExtResponse.templatePropertyFullBooleanArray));
            index++;
            expect(response.body[index]).toMatchObject(CatalogExtResponse.templatePropertyFullCodeArray);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogExtResponse.templatePropertyFullCodeArray));
            index++;
            expect(response.body[index]).toMatchObject(CatalogExtResponse.templatePropertyFullItemArray);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogExtResponse.templatePropertyFullItemArray));
            index++;
            expect(response.body[index]).toMatchObject(CatalogExtResponse.templatePropertyFullInnerArray);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogExtResponse.templatePropertyFullInnerArray));
            index++;
        });
    });

    /**
     * カタログ取得(/:code)
     */
    describe('カタログ取得(/:code)', () => {
        test('異常 前提：拡張、未アクティベート', async () => {
            // アクティベート解除
            await common.executeSqlString(`
                DELETE FROM pxr_catalog.catalog
            `);

            // URLを生成
            const url = urljoin(Url.baseURI, '1000001');

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
        test('正常 前提：拡張、コード指定なし', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000001');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.minimum);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.minimum));
        });
        test('正常 前提：拡張、コード指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000002');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.minimumCode);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.minimumCode));
        });
        test('正常 前提：拡張、コード、バージョン指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000003');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.minimumCodeVersion);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.minimumCodeVersion));
        });
        test('正常 前提：拡張、テンプレートプロパティnumber指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000011');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.templatePropertyNumber);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.templatePropertyNumber));
        });
        test('正常 前提：拡張、テンプレートプロパティstring指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000012');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.templatePropertyString);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.templatePropertyString));
        });
        test('正常 前提：拡張、テンプレートプロパティboolean指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000013');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.templatePropertyBoolean);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.templatePropertyBoolean));
        });
        test('正常 前提：拡張、テンプレートプロパティcode指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000014');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.templatePropertyCode);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.templatePropertyCode));
        });
        test('正常 前提：拡張、テンプレートプロパティitem指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000015');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.templatePropertyItem);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.templatePropertyItem));
        });
        test('正常 前提：拡張、テンプレートプロパティinner指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000016');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.templatePropertyInner);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.templatePropertyInner));
        });
        test('正常 前提：拡張、テンプレートプロパティnumber[]指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000021');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.templatePropertyNumberArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.templatePropertyNumberArray));
        });
        test('正常 前提：拡張、テンプレートプロパティstring[]指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000022');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.templatePropertyStringArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.templatePropertyStringArray));
        });
        test('正常 前提：拡張、テンプレートプロパティboolean[]指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000023');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.templatePropertyBooleanArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.templatePropertyBooleanArray));
        });
        test('正常 前提：拡張、テンプレートプロパティcode[]指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000024');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.templatePropertyCodeArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.templatePropertyCodeArray));
        });
        test('正常 前提：拡張、テンプレートプロパティitem[]指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000025');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.templatePropertyItemArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.templatePropertyItemArray));
        });
        test('正常 前提：拡張、テンプレートプロパティinner[]指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000026');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.templatePropertyInnerArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.templatePropertyInnerArray));
        });
        test('正常 前提：拡張、属性指定値なし', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000031');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.attributeValueNone);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.attributeValueNone));
        });
        test('正常 前提：拡張、属性指定値あり', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000032');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.attributeValueAvail);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.attributeValueAvail));
        });
        test('正常 前提：拡張、値指定number', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000041');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.valueNumber);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.valueNumber));
        });
        test('正常 前提：拡張、値指定string', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000042');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.valueString);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.valueString));
        });
        test('正常 前提：拡張、値指定boolean', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000043');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.valueBoolean);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.valueBoolean));
        });
        test('正常 前提：拡張、値指定code', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000044');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.valueCode);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.valueCode));
        });
        test('正常 前提：拡張、値指定item', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000045');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.valueItem);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.valueItem));
        });
        test('正常 前提：拡張、値指定inner', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000046');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.valueInner);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.valueInner));
        });
        test('正常 前提：拡張、値指定number[]', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000051');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.valueNumberArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.valueNumberArray));
        });
        test('正常 前提：拡張、値指定string[]', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000052');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.valueStringArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.valueStringArray));
        });
        test('正常 前提：拡張、値指定boolean[]', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000053');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.valueBooleanArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.valueBooleanArray));
        });
        test('正常 前提：拡張、値指定code[]', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000054');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.valueCodeArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.valueCodeArray));
        });
        test('正常 前提：拡張、値指定item[]', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000055');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.valueItemArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.valueItemArray));
        });
        test('正常 前提：拡張、値指定inner[]', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000056');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.valueInnerArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.valueInnerArray));
        });
        test('正常 前提：拡張、継承、バージョン指定なし', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000061');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.inheritVersionNone);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.inheritVersionNone));
        });
        test('正常 前提：拡張、継承、バージョン指定あり', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000062');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.inheritVersionAvail);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.inheritVersionAvail));
        });
        test('正常 前提：拡張、継承、プロパティnumber', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000063');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.inheritPropertyNumber);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.inheritPropertyNumber));
        });
        test('正常 前提：拡張、継承、プロパティstring', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000064');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.inheritPropertyString);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.inheritPropertyString));
        });
        test('正常 前提：拡張、継承、プロパティboolean', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000065');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.inheritPropertyBoolean);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.inheritPropertyBoolean));
        });
        test('正常 前提：拡張、継承、プロパティcode', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000066');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.inheritPropertyCode);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.inheritPropertyCode));
        });
        test('正常 前提：拡張、継承、プロパティitem', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000067');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.inheritPropertyItem);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.inheritPropertyItem));
        });
        test('正常 前提：拡張、継承、プロパティinner', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000068');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.inheritPropertyInner);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.inheritPropertyInner));
        });
        test('正常 前提：拡張、継承、プロパティnumber[]', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000071');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.inheritPropertyNumberArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.inheritPropertyNumberArray));
        });
        test('正常 前提：拡張、継承、プロパティstring[]', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000072');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.inheritPropertyStringArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.inheritPropertyStringArray));
        });
        test('正常 前提：拡張、継承、プロパティboolean[]', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000073');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.inheritPropertyBooleanArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.inheritPropertyBooleanArray));
        });
        test('正常 前提：拡張、継承、プロパティcode[]', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000074');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.inheritPropertyCodeArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.inheritPropertyCodeArray));
        });
        test('正常 前提：拡張、継承、プロパティitem[]', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000075');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.inheritPropertyItemArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.inheritPropertyItemArray));
        });
        test('正常 前提：拡張、継承、プロパティinner[]', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000076');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.inheritPropertyInnerArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.inheritPropertyInnerArray));
        });
        test('正常 前提：拡張、テンプレートプロパティnumber各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000081');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.templatePropertyFullNumber);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.templatePropertyFullNumber));
        });
        test('正常 前提：拡張、テンプレートプロパティstring各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000082');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.templatePropertyFullString);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.templatePropertyFullString));
        });
        test('正常 前提：拡張、テンプレートプロパティboolean各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000083');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.templatePropertyFullBoolean);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.templatePropertyFullBoolean));
        });
        test('正常 前提：拡張、テンプレートプロパティcode各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000084');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.templatePropertyFullCode);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.templatePropertyFullCode));
        });
        test('正常 前提：拡張、テンプレートプロパティitem各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000085');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.templatePropertyFullItem);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.templatePropertyFullItem));
        });
        test('正常 前提：拡張、テンプレートプロパティinner各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000086');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.templatePropertyFullInner);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.templatePropertyFullInner));
        });
        test('正常 前提：拡張、テンプレートプロパティnumber[]各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000091');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.templatePropertyFullNumberArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.templatePropertyFullNumberArray));
        });
        test('正常 前提：拡張、テンプレートプロパティstring[]各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000092');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.templatePropertyFullStringArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.templatePropertyFullStringArray));
        });
        test('正常 前提：拡張、テンプレートプロパティboolean[]各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000093');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.templatePropertyFullBooleanArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.templatePropertyFullBooleanArray));
        });
        test('正常 前提：拡張、テンプレートプロパティcode[]各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000094');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.templatePropertyFullCodeArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.templatePropertyFullCodeArray));
        });
        test('正常 前提：拡張、テンプレートプロパティitem[]各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000095');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.templatePropertyFullItemArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.templatePropertyFullItemArray));
        });
        test('正常 前提：拡張、テンプレートプロパティinner[]各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000096');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.templatePropertyFullInnerArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.templatePropertyFullInnerArray));
        });
    });

    /**
     * カタログ取得(/:code/:ver)
     */
    describe('カタログ取得(/:code/:ver)', () => {
        test('異常 前提：拡張、未アクティベート', async () => {
            // アクティベート解除
            await common.executeSqlString(`
                DELETE FROM pxr_catalog.catalog
            `);

            // URLを生成
            const url = urljoin(Url.baseURI, '100001', '1');

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
        test('正常 前提：拡張、コード指定なし', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000001', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.minimum);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.minimum));
        });
        test('正常 前提：拡張、コード指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000002', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.minimumCode);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.minimumCode));
        });
        test('正常 前提：拡張、コード、バージョン指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000003', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.minimumCodeVersion);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.minimumCodeVersion));
        });
        test('正常 前提：拡張、テンプレートプロパティnumber指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000011', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.templatePropertyNumber);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.templatePropertyNumber));
        });
        test('正常 前提：拡張、テンプレートプロパティstring指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000012', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.templatePropertyString);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.templatePropertyString));
        });
        test('正常 前提：拡張、テンプレートプロパティboolean指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000013', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.templatePropertyBoolean);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.templatePropertyBoolean));
        });
        test('正常 前提：拡張、テンプレートプロパティcode指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000014', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.templatePropertyCode);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.templatePropertyCode));
        });
        test('正常 前提：拡張、テンプレートプロパティitem指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000015', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.templatePropertyItem);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.templatePropertyItem));
        });
        test('正常 前提：拡張、テンプレートプロパティinner指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000016', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.templatePropertyInner);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.templatePropertyInner));
        });
        test('正常 前提：拡張、テンプレートプロパティnumber[]指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000021', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.templatePropertyNumberArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.templatePropertyNumberArray));
        });
        test('正常 前提：拡張、テンプレートプロパティstring[]指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000022', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.templatePropertyStringArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.templatePropertyStringArray));
        });
        test('正常 前提：拡張、テンプレートプロパティboolean[]指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000023', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.templatePropertyBooleanArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.templatePropertyBooleanArray));
        });
        test('正常 前提：拡張、テンプレートプロパティcode[]指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000024', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.templatePropertyCodeArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.templatePropertyCodeArray));
        });
        test('正常 前提：拡張、テンプレートプロパティitem[]指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000025', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.templatePropertyItemArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.templatePropertyItemArray));
        });
        test('正常 前提：拡張、テンプレートプロパティinner[]指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000026', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.templatePropertyInnerArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.templatePropertyInnerArray));
        });
        test('正常 前提：拡張、属性指定値なし', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000031', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.attributeValueNone);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.attributeValueNone));
        });
        test('正常 前提：拡張、属性指定値あり', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000032', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.attributeValueAvail);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.attributeValueAvail));
        });
        test('正常 前提：拡張、値指定number', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000041', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.valueNumber);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.valueNumber));
        });
        test('正常 前提：拡張、値指定string', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000042', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.valueString);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.valueString));
        });
        test('正常 前提：拡張、値指定boolean', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000043', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.valueBoolean);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.valueBoolean));
        });
        test('正常 前提：拡張、値指定code', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000044', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.valueCode);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.valueCode));
        });
        test('正常 前提：拡張、値指定item', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000045', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.valueItem);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.valueItem));
        });
        test('正常 前提：拡張、値指定inner', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000046', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.valueInner);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.valueInner));
        });
        test('正常 前提：拡張、値指定number[]', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000051', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.valueNumberArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.valueNumberArray));
        });
        test('正常 前提：拡張、値指定string[]', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000052', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.valueStringArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.valueStringArray));
        });
        test('正常 前提：拡張、値指定boolean[]', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000053', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.valueBooleanArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.valueBooleanArray));
        });
        test('正常 前提：拡張、値指定code[]', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000054', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.valueCodeArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.valueCodeArray));
        });
        test('正常 前提：拡張、値指定item[]', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000055', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.valueItemArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.valueItemArray));
        });
        test('正常 前提：拡張、値指定inner[]', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000056', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.valueInnerArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.valueInnerArray));
        });
        test('正常 前提：拡張、継承、バージョン指定なし', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000061', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.inheritVersionNone);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.inheritVersionNone));
        });
        test('正常 前提：拡張、継承、バージョン指定あり', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000062', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.inheritVersionAvail);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.inheritVersionAvail));
        });
        test('正常 前提：拡張、継承、プロパティnumber', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000063', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.inheritPropertyNumber);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.inheritPropertyNumber));
        });
        test('正常 前提：拡張、継承、プロパティstring', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000064', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.inheritPropertyString);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.inheritPropertyString));
        });
        test('正常 前提：拡張、継承、プロパティboolean', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000065', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.inheritPropertyBoolean);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.inheritPropertyBoolean));
        });
        test('正常 前提：拡張、継承、プロパティcode', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000066', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.inheritPropertyCode);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.inheritPropertyCode));
        });
        test('正常 前提：拡張、継承、プロパティitem', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000067', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.inheritPropertyItem);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.inheritPropertyItem));
        });
        test('正常 前提：拡張、継承、プロパティinner', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000068', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.inheritPropertyInner);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.inheritPropertyInner));
        });

        test('正常 前提：拡張、継承、プロパティnumber[]', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000071', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.inheritPropertyNumberArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.inheritPropertyNumberArray));
        });
        test('正常 前提：拡張、継承、プロパティstring[]', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000072', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.inheritPropertyStringArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.inheritPropertyStringArray));
        });
        test('正常 前提：拡張、継承、プロパティboolean[]', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000073', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.inheritPropertyBooleanArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.inheritPropertyBooleanArray));
        });
        test('正常 前提：拡張、継承、プロパティcode[]', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000074', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.inheritPropertyCodeArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.inheritPropertyCodeArray));
        });
        test('正常 前提：拡張、継承、プロパティitem[]', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000075', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.inheritPropertyItemArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.inheritPropertyItemArray));
        });
        test('正常 前提：拡張、継承、プロパティinner[]', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000076', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.inheritPropertyInnerArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.inheritPropertyInnerArray));
        });
        test('正常 前提：拡張、テンプレートプロパティnumber各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000081', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.templatePropertyFullNumber);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.templatePropertyFullNumber));
        });
        test('正常 前提：拡張、テンプレートプロパティstring各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000082', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.templatePropertyFullString);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.templatePropertyFullString));
        });
        test('正常 前提：拡張、テンプレートプロパティboolean各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000083', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.templatePropertyFullBoolean);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.templatePropertyFullBoolean));
        });
        test('正常 前提：拡張、テンプレートプロパティcode各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000084', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.templatePropertyFullCode);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.templatePropertyFullCode));
        });
        test('正常 前提：拡張、テンプレートプロパティitem各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000085', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.templatePropertyFullItem);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.templatePropertyFullItem));
        });
        test('正常 前提：拡張、テンプレートプロパティinner各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000086', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.templatePropertyFullInner);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.templatePropertyFullInner));
        });
        test('正常 前提：拡張、テンプレートプロパティnumber[]各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000091', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.templatePropertyFullNumberArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.templatePropertyFullNumberArray));
        });
        test('正常 前提：拡張、テンプレートプロパティstring[]各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000092', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.templatePropertyFullStringArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.templatePropertyFullStringArray));
        });
        test('正常 前提：拡張、テンプレートプロパティboolean[]各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000093', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.templatePropertyFullBooleanArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.templatePropertyFullBooleanArray));
        });
        test('正常 前提：拡張、テンプレートプロパティcode[]各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000094', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.templatePropertyFullCodeArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.templatePropertyFullCodeArray));
        });
        test('正常 前提：拡張、テンプレートプロパティitem[]各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000095', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.templatePropertyFullItemArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.templatePropertyFullItemArray));
        });
        test('正常 前提：拡張、テンプレートプロパティinner[]各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1000096', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtResponse.templatePropertyFullInnerArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtResponse.templatePropertyFullInnerArray));
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
            const url = urljoin(Url.extURI, '1000001', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtUpdateRequest.minimumCode);

            // アクティベート
            await common.executeSqlFile('activate.sql');

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_ACTIVATE);
        });
        test('正常 前提：モデル、コード指定なし', async () => {
            // URLを生成
            const url = urljoin(Url.extURI, '1000001', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtUpdateRequest.minimum);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtUpdateResponse.minimum);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtUpdateResponse.minimum));
        });
        test('正常 前提：モデル、コード指定', async () => {
            // URLを生成
            const url = urljoin(Url.extURI, '1000002', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtUpdateRequest.minimumCode);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtUpdateResponse.minimumCode);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtUpdateResponse.minimumCode));
        });
        test('正常 前提：モデル、コード、バージョン指定', async () => {
            // URLを生成
            const url = urljoin(Url.extURI, '1000003', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtUpdateRequest.minimumCodeVersion);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtUpdateResponse.minimumCodeVersion);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtUpdateResponse.minimumCodeVersion));
        });
        test('正常 前提：モデル、テンプレートプロパティnumber指定', async () => {
            // URLを生成
            const url = urljoin(Url.extURI, '1000011', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtUpdateRequest.templatePropertyNumber);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtUpdateResponse.templatePropertyNumber);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtUpdateResponse.templatePropertyNumber));
        });
        test('正常 前提：モデル、テンプレートプロパティstring指定', async () => {
            // URLを生成
            const url = urljoin(Url.extURI, '1000012', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtUpdateRequest.templatePropertyString);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtUpdateResponse.templatePropertyString);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtUpdateResponse.templatePropertyString));
        });
        test('正常 前提：モデル、テンプレートプロパティboolean指定', async () => {
            // URLを生成
            const url = urljoin(Url.extURI, '1000013', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtUpdateRequest.templatePropertyBoolean);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtUpdateResponse.templatePropertyBoolean);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtUpdateResponse.templatePropertyBoolean));
        });
        test('正常 前提：モデル、テンプレートプロパティcode指定', async () => {
            // URLを生成
            const url = urljoin(Url.extURI, '1000014', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtUpdateRequest.templatePropertyCode);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtUpdateResponse.templatePropertyCode);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtUpdateResponse.templatePropertyCode));
        });
        test('正常 前提：モデル、テンプレートプロパティitem指定', async () => {
            // URLを生成
            const url = urljoin(Url.extURI, '1000015', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtUpdateRequest.templatePropertyItem);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtUpdateResponse.templatePropertyItem);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtUpdateResponse.templatePropertyItem));
        });
        test('正常 前提：モデル、テンプレートプロパティinner指定', async () => {
            // URLを生成
            const url = urljoin(Url.extURI, '1000016', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtUpdateRequest.templatePropertyInner);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtUpdateResponse.templatePropertyInner);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtUpdateResponse.templatePropertyInner));
        });
        test('正常 前提：モデル、テンプレートプロパティnumber[]指定', async () => {
            // URLを生成
            const url = urljoin(Url.extURI, '1000021', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtUpdateRequest.templatePropertyNumberArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtUpdateResponse.templatePropertyNumberArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtUpdateResponse.templatePropertyNumberArray));
        });
        test('正常 前提：モデル、テンプレートプロパティstring[]指定', async () => {
            // URLを生成
            const url = urljoin(Url.extURI, '1000022', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtUpdateRequest.templatePropertyStringArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtUpdateResponse.templatePropertyStringArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtUpdateResponse.templatePropertyStringArray));
        });
        test('正常 前提：モデル、テンプレートプロパティboolean[]指定', async () => {
            // URLを生成
            const url = urljoin(Url.extURI, '1000023', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtUpdateRequest.templatePropertyBooleanArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtUpdateResponse.templatePropertyBooleanArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtUpdateResponse.templatePropertyBooleanArray));
        });
        test('正常 前提：モデル、テンプレートプロパティcode[]指定', async () => {
            // URLを生成
            const url = urljoin(Url.extURI, '1000024', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtUpdateRequest.templatePropertyCodeArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtUpdateResponse.templatePropertyCodeArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtUpdateResponse.templatePropertyCodeArray));
        });
        test('正常 前提：モデル、テンプレートプロパティitem[]指定', async () => {
            // URLを生成
            const url = urljoin(Url.extURI, '1000025', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtUpdateRequest.templatePropertyItemArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtUpdateResponse.templatePropertyItemArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtUpdateResponse.templatePropertyItemArray));
        });
        test('正常 前提：モデル、テンプレートプロパティinner[]指定', async () => {
            // URLを生成
            const url = urljoin(Url.extURI, '1000026', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtUpdateRequest.templatePropertyInnerArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtUpdateResponse.templatePropertyInnerArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtUpdateResponse.templatePropertyInnerArray));
        });
        test('正常 前提：モデル、属性指定値なし', async () => {
            // URLを生成
            const url = urljoin(Url.extURI, '1000031', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtUpdateRequest.attributeValueNone);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtUpdateResponse.attributeValueNone);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtUpdateResponse.attributeValueNone));
        });
        test('正常 前提：モデル、属性指定値あり', async () => {
            // URLを生成
            const url = urljoin(Url.extURI, '1000032', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtUpdateRequest.attributeValueAvail);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtUpdateResponse.attributeValueAvail);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtUpdateResponse.attributeValueAvail));
        });
        test('正常 前提：モデル、値指定number', async () => {
            // URLを生成
            const url = urljoin(Url.extURI, '1000041', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtUpdateRequest.valueNumber);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtUpdateResponse.valueNumber);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtUpdateResponse.valueNumber));
        });
        test('正常 前提：モデル、値指定string', async () => {
            // URLを生成
            const url = urljoin(Url.extURI, '1000042', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtUpdateRequest.valueString);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtUpdateResponse.valueString);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtUpdateResponse.valueString));
        });
        test('正常 前提：モデル、値指定boolean', async () => {
            // URLを生成
            const url = urljoin(Url.extURI, '1000043', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtUpdateRequest.valueBoolean);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtUpdateResponse.valueBoolean);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtUpdateResponse.valueBoolean));
        });
        test('正常 前提：モデル、値指定code', async () => {
            // URLを生成
            const url = urljoin(Url.extURI, '1000044', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtUpdateRequest.valueCode);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtUpdateResponse.valueCode);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtUpdateResponse.valueCode));
        });
        test('正常 前提：モデル、値指定item', async () => {
            // URLを生成
            const url = urljoin(Url.extURI, '1000045', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtUpdateRequest.valueItem);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtUpdateResponse.valueItem);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtUpdateResponse.valueItem));
        });
        test('正常 前提：モデル、値指定inner', async () => {
            // URLを生成
            const url = urljoin(Url.extURI, '1000046', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtUpdateRequest.valueInner);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtUpdateResponse.valueInner);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtUpdateResponse.valueInner));
        });
        test('正常 前提：モデル、値指定number[]', async () => {
            // URLを生成
            const url = urljoin(Url.extURI, '1000051', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtUpdateRequest.valueNumberArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtUpdateResponse.valueNumberArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtUpdateResponse.valueNumberArray));
        });
        test('正常 前提：モデル、値指定string[]', async () => {
            // URLを生成
            const url = urljoin(Url.extURI, '1000052', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtUpdateRequest.valueStringArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtUpdateResponse.valueStringArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtUpdateResponse.valueStringArray));
        });
        test('正常 前提：モデル、値指定boolean[]', async () => {
            // URLを生成
            const url = urljoin(Url.extURI, '1000053', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtUpdateRequest.valueBooleanArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtUpdateResponse.valueBooleanArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtUpdateResponse.valueBooleanArray));
        });
        test('正常 前提：モデル、値指定code[]', async () => {
            // URLを生成
            const url = urljoin(Url.extURI, '1000054', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtUpdateRequest.valueCodeArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtUpdateResponse.valueCodeArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtUpdateResponse.valueCodeArray));
        });
        test('正常 前提：モデル、値指定item[]', async () => {
            // URLを生成
            const url = urljoin(Url.extURI, '1000055', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtUpdateRequest.valueItemArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtUpdateResponse.valueItemArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtUpdateResponse.valueItemArray));
        });
        test('正常 前提：モデル、値指定inner[]', async () => {
            // URLを生成
            const url = urljoin(Url.extURI, '1000056', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtUpdateRequest.valueInnerArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtUpdateResponse.valueInnerArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtUpdateResponse.valueInnerArray));
        });
        test('正常 前提：モデル、継承、バージョン指定なし', async () => {
            // URLを生成
            const url = urljoin(Url.extURI, '1000061', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtUpdateRequest.inheritVersionNone);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtUpdateResponse.inheritVersionNone);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtUpdateResponse.inheritVersionNone));
        });
        test('正常 前提：モデル、継承、バージョン指定あり', async () => {
            // URLを生成
            const url = urljoin(Url.extURI, '1000062', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtUpdateRequest.inheritVersionAvail);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtUpdateResponse.inheritVersionAvail);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtUpdateResponse.inheritVersionAvail));
        });
        test('正常 前提：モデル、継承、プロパティnumber', async () => {
            // URLを生成
            const url = urljoin(Url.extURI, '1000063', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtUpdateRequest.inheritPropertyNumber);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtUpdateResponse.inheritPropertyNumber);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtUpdateResponse.inheritPropertyNumber));
        });
        test('正常 前提：モデル、継承、プロパティstring', async () => {
            // URLを生成
            const url = urljoin(Url.extURI, '1000064', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtUpdateRequest.inheritPropertyString);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtUpdateResponse.inheritPropertyString);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtUpdateResponse.inheritPropertyString));
        });
        test('正常 前提：モデル、継承、プロパティboolean', async () => {
            // URLを生成
            const url = urljoin(Url.extURI, '1000065', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtUpdateRequest.inheritPropertyBoolean);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtUpdateResponse.inheritPropertyBoolean);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtUpdateResponse.inheritPropertyBoolean));
        });
        test('正常 前提：モデル、継承、プロパティcode', async () => {
            // URLを生成
            const url = urljoin(Url.extURI, '1000066', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtUpdateRequest.inheritPropertyCode);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtUpdateResponse.inheritPropertyCode);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtUpdateResponse.inheritPropertyCode));
        });
        test('正常 前提：モデル、継承、プロパティitem', async () => {
            // URLを生成
            const url = urljoin(Url.extURI, '1000067', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtUpdateRequest.inheritPropertyItem);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtUpdateResponse.inheritPropertyItem);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtUpdateResponse.inheritPropertyItem));
        });
        test('正常 前提：モデル、継承、プロパティinner', async () => {
            // URLを生成
            const url = urljoin(Url.extURI, '1000068', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtUpdateRequest.inheritPropertyInner);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtUpdateResponse.inheritPropertyInner);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtUpdateResponse.inheritPropertyInner));
        });
        test('正常 前提：モデル、継承、プロパティnumber[]', async () => {
            // URLを生成
            const url = urljoin(Url.extURI, '1000071', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtUpdateRequest.inheritPropertyNumberArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtUpdateResponse.inheritPropertyNumberArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtUpdateResponse.inheritPropertyNumberArray));
        });
        test('正常 前提：モデル、継承、プロパティstring[]', async () => {
            // URLを生成
            const url = urljoin(Url.extURI, '1000072', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtUpdateRequest.inheritPropertyStringArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtUpdateResponse.inheritPropertyStringArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtUpdateResponse.inheritPropertyStringArray));
        });
        test('正常 前提：モデル、継承、プロパティboolean[]', async () => {
            // URLを生成
            const url = urljoin(Url.extURI, '1000073', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtUpdateRequest.inheritPropertyBooleanArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtUpdateResponse.inheritPropertyBooleanArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtUpdateResponse.inheritPropertyBooleanArray));
        });
        test('正常 前提：モデル、継承、プロパティcode[]', async () => {
            // URLを生成
            const url = urljoin(Url.extURI, '1000074', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtUpdateRequest.inheritPropertyCodeArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtUpdateResponse.inheritPropertyCodeArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtUpdateResponse.inheritPropertyCodeArray));
        });
        test('正常 前提：モデル、継承、プロパティitem[]', async () => {
            // URLを生成
            const url = urljoin(Url.extURI, '1000075', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtUpdateRequest.inheritPropertyItemArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtUpdateResponse.inheritPropertyItemArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtUpdateResponse.inheritPropertyItemArray));
        });
        test('正常 前提：モデル、継承、プロパティinner[]', async () => {
            // URLを生成
            const url = urljoin(Url.extURI, '1000076', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtUpdateRequest.inheritPropertyInnerArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtUpdateResponse.inheritPropertyInnerArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtUpdateResponse.inheritPropertyInnerArray));
        });
        test('正常 前提：モデル、プロパティnumber各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.extURI, '1000081', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtUpdateRequest.templatePropertyFullNumber);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtUpdateResponse.templatePropertyFullNumber);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtUpdateResponse.templatePropertyFullNumber));
        });
        test('正常 前提：モデル、プロパティstring各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.extURI, '1000082', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtUpdateRequest.templatePropertyFullString);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtUpdateResponse.templatePropertyFullString);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtUpdateResponse.templatePropertyFullString));
        });
        test('正常 前提：モデル、プロパティboolean各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.extURI, '1000083', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtUpdateRequest.templatePropertyFullBoolean);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtUpdateResponse.templatePropertyFullBoolean);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtUpdateResponse.templatePropertyFullBoolean));
        });
        test('正常 前提：モデル、プロパティcode各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.extURI, '1000084', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtUpdateRequest.templatePropertyFullCode);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtUpdateResponse.templatePropertyFullCode);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtUpdateResponse.templatePropertyFullCode));
        });
        test('正常 前提：モデル、プロパティitem各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.extURI, '1000085', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtUpdateRequest.templatePropertyFullItem);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtUpdateResponse.templatePropertyFullItem);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtUpdateResponse.templatePropertyFullItem));
        });
        test('正常 前提：モデル、プロパティinner各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.extURI, '1000086', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtUpdateRequest.templatePropertyFullInner);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtUpdateResponse.templatePropertyFullInner);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtUpdateResponse.templatePropertyFullInner));
        });
        test('正常 前提：モデル、プロパティnumber[]各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.extURI, '1000091', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtUpdateRequest.templatePropertyFullNumberArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtUpdateResponse.templatePropertyFullNumberArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtUpdateResponse.templatePropertyFullNumberArray));
        });
        test('正常 前提：モデル、プロパティstring[]各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.extURI, '1000092', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtUpdateRequest.templatePropertyFullStringArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtUpdateResponse.templatePropertyFullStringArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtUpdateResponse.templatePropertyFullStringArray));
        });
        test('正常 前提：モデル、プロパティboolean[]各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.extURI, '1000093', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtUpdateRequest.templatePropertyFullBooleanArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtUpdateResponse.templatePropertyFullBooleanArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtUpdateResponse.templatePropertyFullBooleanArray));
        });
        test('正常 前提：モデル、プロパティcode[]各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.extURI, '1000094', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtUpdateRequest.templatePropertyFullCodeArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtUpdateResponse.templatePropertyFullCodeArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtUpdateResponse.templatePropertyFullCodeArray));
        });
        test('正常 前提：モデル、プロパティitem[]各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.extURI, '1000095', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtUpdateRequest.templatePropertyFullItemArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtUpdateResponse.templatePropertyFullItemArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtUpdateResponse.templatePropertyFullItemArray));
        });
        test('正常 前提：モデル、プロパティinner[]各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.extURI, '1000096', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogExtUpdateRequest.templatePropertyFullInnerArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogExtUpdateResponse.templatePropertyFullInnerArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogExtUpdateResponse.templatePropertyFullInnerArray));
        });
    });

    /**
     * カタログ削除
     */
    describe('カタログ削除', () => {
        test('異常 前提：拡張、未アクティベート', async () => {
            // アクティベート解除
            await common.executeSqlString(`
                DELETE FROM pxr_catalog.catalog
            `);

            // URLを生成
            const url = urljoin(Url.extURI, '1000001');

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
        test('正常 前提：拡張', async () => {
            // URLを生成
            const url = urljoin(Url.extURI, '1000001');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .delete(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.code).toBe(1000001);
        });
    });
});
