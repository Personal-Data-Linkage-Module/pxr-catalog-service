/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import * as supertest from 'supertest';
import { Application } from '../resources/config/Application';
import Common, { Url } from './Common';
import { Session } from './Session';
import { CatalogModelRequest } from './CatalogModelRequest';
import { CatalogModelResponse } from './CatalogModelResponse';
import { CatalogModelUpdateRequest } from './CatalogModelUpdateRequest';
import { CatalogModelUpdateResponse } from './CatalogModelUpdateResponse';
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
        test('正常 前提：モデル、コード指定なし', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.minimum);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.minimum);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.minimum));
        });
        test('正常 前提：モデル、コード指定', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.minimumCode);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.minimumCode);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.minimumCode));
        });
        test('正常 前提：モデル、コード、バージョン指定', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.minimumCodeVersion);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.minimumCodeVersion);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.minimumCodeVersion));
        });
        test('正常 前提：モデル、コード、バージョン指定2(削除済みGETテスト用データ作成)', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.minimumCodeVersionDeleted);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.minimumCodeVersionDeleted);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.minimumCodeVersionDeleted));
        });
        test('正常 前提：モデル、テンプレートプロパティnumber指定', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.templatePropertyNumber);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyNumber);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyNumber));
        });
        test('正常 前提：モデル、テンプレートプロパティstring指定', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.templatePropertyString);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyString);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyString));
        });
        test('正常 前提：モデル、テンプレートプロパティboolean指定', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.templatePropertyBoolean);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyBoolean);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyBoolean));
        });
        test('正常 前提：モデル、テンプレートプロパティcode指定', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.templatePropertyCode);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyCode);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyCode));
        });
        test('正常 前提：モデル、テンプレートプロパティitem指定', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.templatePropertyItem);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyItem);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyItem));
        });
        test('正常 前提：モデル、テンプレートプロパティinner指定', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.templatePropertyInner);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyInner);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyInner));
        });
        test('正常 前提：モデル、テンプレートプロパティnumber[]指定', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.templatePropertyNumberArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyNumberArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyNumberArray));
        });
        test('正常 前提：モデル、テンプレートプロパティstring[]指定', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.templatePropertyStringArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyStringArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyStringArray));
        });
        test('正常 前提：モデル、テンプレートプロパティboolean[]指定', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.templatePropertyBooleanArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyBooleanArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyBooleanArray));
        });
        test('正常 前提：モデル、テンプレートプロパティcode[]指定', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.templatePropertyCodeArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyCodeArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyCodeArray));
        });
        test('正常 前提：モデル、テンプレートプロパティitem[]指定', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.templatePropertyItemArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyItemArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyItemArray));
        });
        test('正常 前提：モデル、テンプレートプロパティinner[]指定', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.templatePropertyInnerArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyInnerArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyInnerArray));
        });
        test('正常 前提：モデル、属性指定値なし', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.attributeValueNone);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.attributeValueNone);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.attributeValueNone));
        });
        test('正常 前提：モデル、属性指定値あり', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.attributeValueAvail);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.attributeValueAvail);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.attributeValueAvail));
        });
        test('正常 前提：モデル、属性指定値あり、objectなし', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.attributeValueAvailNoObject);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.attributeValueAvailNoObject);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.attributeValueAvailNoObject));
        });
        test('正常 前提：モデル、属性指定値あり、keyなし', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.attributeValueAvailNokey);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.attributeValueAvailNokey);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.attributeValueAvailNokey));
        });
        test('正常 前提：モデル、値指定number', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.valueNumber);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.valueNumber);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.valueNumber));
        });
        test('正常 前提：モデル、値指定string', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.valueString);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.valueString);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.valueString));
        });
        test('正常 前提：モデル、値指定boolean', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.valueBoolean);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.valueBoolean);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.valueBoolean));
        });
        test('正常 前提：モデル、値指定code', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.valueCode);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.valueCode);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.valueCode));
        });
        test('正常 前提：モデル、値指定item', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.valueItem);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.valueItem);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.valueItem));
        });
        test('正常 前提：モデル、値指定inner', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.valueInner);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.valueInner);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.valueInner));
        });
        test('正常 前提：モデル、値指定number[]', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.valueNumberArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.valueNumberArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.valueNumberArray));
        });
        test('正常 前提：モデル、値指定string[]', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.valueStringArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.valueStringArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.valueStringArray));
        });
        test('正常 前提：モデル、値指定boolean[]', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.valueBooleanArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.valueBooleanArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.valueBooleanArray));
        });
        test('正常 前提：モデル、値指定code[]', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.valueCodeArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.valueCodeArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.valueCodeArray));
        });
        test('正常 前提：モデル、値指定item[]', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.valueItemArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.valueItemArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.valueItemArray));
        });
        test('正常 前提：モデル、値指定inner[]', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.valueInnerArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.valueInnerArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.valueInnerArray));
        });
        test('正常 前提：モデル、継承、バージョン指定なし', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.inheritVersionNone);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.inheritVersionNone);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.inheritVersionNone));
        });
        test('正常 前提：モデル、継承、バージョン指定あり', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.inheritVersionAvail);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.inheritVersionAvail);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.inheritVersionAvail));
        });
        test('正常 前提：モデル、継承、プロパティnumber', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.inheritPropertyNumber);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.inheritPropertyNumber);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.inheritPropertyNumber));
        });
        test('正常 前提：モデル、継承、プロパティstring', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.inheritPropertyString);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.inheritPropertyString);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.inheritPropertyString));
        });
        test('正常 前提：モデル、継承、プロパティboolean', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.inheritPropertyBoolean);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.inheritPropertyBoolean);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.inheritPropertyBoolean));
        });
        test('正常 前提：モデル、継承、プロパティcode', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.inheritPropertyCode);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.inheritPropertyCode);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.inheritPropertyCode));
        });
        test('正常 前提：モデル、継承、プロパティitem', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.inheritPropertyItem);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.inheritPropertyItem);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.inheritPropertyItem));
        });
        test('正常 前提：モデル、継承、プロパティinner', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.inheritPropertyInner);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.inheritPropertyInner);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.inheritPropertyInner));
        });
        test('正常 前提：モデル、継承、プロパティnumber[]', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.inheritPropertyNumberArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.inheritPropertyNumberArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.inheritPropertyNumberArray));
        });
        test('正常 前提：モデル、継承、プロパティstring[]', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.inheritPropertyStringArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.inheritPropertyStringArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.inheritPropertyStringArray));
        });
        test('正常 前提：モデル、継承、プロパティboolean[]', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.inheritPropertyBooleanArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.inheritPropertyBooleanArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.inheritPropertyBooleanArray));
        });
        test('正常 前提：モデル、継承、プロパティcode[]', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.inheritPropertyCodeArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.inheritPropertyCodeArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.inheritPropertyCodeArray));
        });
        test('正常 前提：モデル、継承、プロパティitem[]', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.inheritPropertyItemArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.inheritPropertyItemArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.inheritPropertyItemArray));
        });
        test('正常 前提：モデル、継承、プロパティinner[]', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.inheritPropertyInnerArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.inheritPropertyInnerArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.inheritPropertyInnerArray));
        });
        test('正常 前提：モデル、プロパティnumber各種設定', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.templatePropertyFullNumber);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyFullNumber);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyFullNumber));
        });
        test('正常 前提：モデル、プロパティstring各種設定', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.templatePropertyFullString);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyFullString);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyFullString));
        });
        test('正常 前提：モデル、プロパティboolean各種設定', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.templatePropertyFullBoolean);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyFullBoolean);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyFullBoolean));
        });
        test('正常 前提：モデル、プロパティcode各種設定', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.templatePropertyFullCode);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyFullCode);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyFullCode));
        });
        test('正常 前提：モデル、プロパティitem各種設定', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.templatePropertyFullItem);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyFullItem);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyFullItem));
        });
        test('正常 前提：モデル、プロパティinner各種設定', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.templatePropertyFullInner);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyFullInner);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyFullInner));
        });
        test('正常 前提：モデル、プロパティnumber[]各種設定', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.templatePropertyFullNumberArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyFullNumberArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyFullNumberArray));
        });
        test('正常 前提：モデル、プロパティstring[]各種設定', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.templatePropertyFullStringArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyFullStringArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyFullStringArray));
        });
        test('正常 前提：モデル、プロパティboolean[]各種設定', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.templatePropertyFullBooleanArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyFullBooleanArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyFullBooleanArray));
        });
        test('正常 前提：モデル、プロパティcode[]各種設定', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.templatePropertyFullCodeArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyFullCodeArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyFullCodeArray));
        });
        test('正常 前提：モデル、プロパティitem[]各種設定', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.templatePropertyFullItemArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyFullItemArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyFullItemArray));
        });
        test('正常 前提：モデル、プロパティinner[]各種設定', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.templatePropertyFullInnerArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyFullInnerArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyFullInnerArray));
        });
        test('正常 前提：モデル、プロパティinner[]各種設定2 L1030対応', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.templatePropertyFullInnerArray2);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyFullInnerArray2);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyFullInnerArray2));
        });
        test('正常 前提：モデル、プロパティinner[]各種設定3 L1026対応', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.templatePropertyFullInnerArray3);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyFullInnerArray3);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyFullInnerArray3));
        });
        test('正常 前提：モデル、プロパティinner[]各種設定(code: 96)を継承', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.fullInnerArrayInherit96);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.fullInnerArrayInherit96);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.fullInnerArrayInherit96));
        });

        test('正常 前提：モデル、プロパティinner[]各種設定2(code: 196)を継承', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.fullInnerArrayInherit196);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.fullInnerArrayInherit196);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.fullInnerArrayInherit196));
        });
        test('正常 前提：モデル、プロパティinner[]各種設定3(code: 296)を継承', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.fullInnerArrayInherit296);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.fullInnerArrayInherit296);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.fullInnerArrayInherit296));
        });
        test('正常 前提：モデル、プロパティinner[]各種設定(code: 196)を継承、templateがnull', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.fullInnerArrayInherit196NullTemp);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.fullInnerArrayInherit196NullTemp);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.fullInnerArrayInherit196NullTemp));
        });
        test('正常 前提：モデル、プロパティinner各種設定(code: 86)を継承', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.templatePropertyFullInnerInherit);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyFullInnerInherit);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyFullInnerInherit));
        });
        test('正常 前提：モデル、候補値value設定', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.candidateValue);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.candidateValue);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.candidateValue));
        });
        test('正常 前提：モデル、候補値inner設定', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.candidateInner);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.candidateInner);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.candidateInner));
        });
        test('正常 オブジェクト変換 typeがitem[]、対象キーが配列の場合', async () => {
            // L2753,L2762カバレッジ対応。継承のためにカタログ106,107を使用
            // URLを生成
            const url = Url.modelURI;

            // 継承用カタログ106を登録
            await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.inheritCatalog106);
            // 継承用カタログ107を登録
            await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.inheritCatalog107);

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.cataloginner);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.cataloginner);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.cataloginner));
        });
        test('正常 前提：モデル、値指定item[]、cmatrixあり', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.valueItemArray2);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.valueItemArray2);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.valueItemArray2));
        });
        test('異常 対象テンプレートプロパティ取得 対象カタログが存在しない', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.valueItemArray3);

            // レスポンスチェック
            expect(response.status).toBe(404);
            expect(response.body.message).toBe(Message.CATALOG_NOT_FOUND);
        });
        test('異常 コードがスコープ範囲外', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.minimumCodeVersionOutOfScope);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.CODE_SCOPE_OUT_CODE);
        });
        test('正常 templateの任意のプロパティが空配列', async () => {
            // URLを生成
            const url = Url.modelURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelRequest.templatePropertyEmpty);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyEmpty);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyEmpty));
        });
    });

    /**
     * カタログ取得
     */
    describe('カタログ取得', () => {
        test('正常 前提：モデル', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '?ns=catalog/model/unit-test');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
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
            expect(response.body[index]).toMatchObject(CatalogModelResponse.minimumCodeVersion);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogModelResponse.minimumCodeVersion));
            index++;
            expect(response.body[index]).toMatchObject(CatalogModelResponse.minimumCodeVersionDeleted);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogModelResponse.minimumCodeVersionDeleted));
            index++;
            expect(response.body[index]).toMatchObject(CatalogModelResponse.templatePropertyNumber);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogModelResponse.templatePropertyNumber));
            index++;
            expect(response.body[index]).toMatchObject(CatalogModelResponse.templatePropertyString);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogModelResponse.templatePropertyString));
            index++;
            expect(response.body[index]).toMatchObject(CatalogModelResponse.templatePropertyBoolean);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogModelResponse.templatePropertyBoolean));
            index++;
            expect(response.body[index]).toMatchObject(CatalogModelResponse.templatePropertyCode);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogModelResponse.templatePropertyCode));
            index++;
            expect(response.body[index]).toMatchObject(CatalogModelResponse.templatePropertyItem);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogModelResponse.templatePropertyItem));
            index++;
            expect(response.body[index]).toMatchObject(CatalogModelResponse.templatePropertyInner);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogModelResponse.templatePropertyInner));
            index++;
            expect(response.body[index]).toMatchObject(CatalogModelResponse.templatePropertyNumberArray);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogModelResponse.templatePropertyNumberArray));
            index++;
            expect(response.body[index]).toMatchObject(CatalogModelResponse.templatePropertyStringArray);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogModelResponse.templatePropertyStringArray));
            index++;
            expect(response.body[index]).toMatchObject(CatalogModelResponse.templatePropertyBooleanArray);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogModelResponse.templatePropertyBooleanArray));
            index++;
            expect(response.body[index]).toMatchObject(CatalogModelResponse.templatePropertyCodeArray);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogModelResponse.templatePropertyCodeArray));
            index++;
            expect(response.body[index]).toMatchObject(CatalogModelResponse.templatePropertyItemArray);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogModelResponse.templatePropertyItemArray));
            index++;
            expect(response.body[index]).toMatchObject(CatalogModelResponse.templatePropertyInnerArray);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogModelResponse.templatePropertyInnerArray));
            index++;
            expect(response.body[index]).toMatchObject(CatalogModelResponse.attributeValueNone);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogModelResponse.attributeValueNone));
            index++;
            expect(response.body[index]).toMatchObject(CatalogModelResponse.attributeValueAvail);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogModelResponse.attributeValueAvail));
            index++;
            expect(response.body[index]).toMatchObject(CatalogModelResponse.attributeValueAvailNoObject);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogModelResponse.attributeValueAvailNoObject));
            index++;
            expect(response.body[index]).toMatchObject(CatalogModelResponse.attributeValueAvailNokey);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogModelResponse.attributeValueAvailNokey));
            index++;
            expect(response.body[index]).toMatchObject(CatalogModelResponse.valueNumber);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogModelResponse.valueNumber));
            index++;
            expect(response.body[index]).toMatchObject(CatalogModelResponse.valueString);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogModelResponse.valueString));
            index++;
            expect(response.body[index]).toMatchObject(CatalogModelResponse.valueBoolean);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogModelResponse.valueBoolean));
            index++;
            expect(response.body[index]).toMatchObject(CatalogModelResponse.valueCode);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogModelResponse.valueCode));
            index++;
            expect(response.body[index]).toMatchObject(CatalogModelResponse.valueItem);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogModelResponse.valueItem));
            index++;
            expect(response.body[index]).toMatchObject(CatalogModelResponse.valueInner);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogModelResponse.valueInner));
            index++;
            expect(response.body[index]).toMatchObject(CatalogModelResponse.valueNumberArray);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogModelResponse.valueNumberArray));
            index++;
            expect(response.body[index]).toMatchObject(CatalogModelResponse.valueStringArray);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogModelResponse.valueStringArray));
            index++;
            expect(response.body[index]).toMatchObject(CatalogModelResponse.valueBooleanArray);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogModelResponse.valueBooleanArray));
            index++;
            expect(response.body[index]).toMatchObject(CatalogModelResponse.valueCodeArray);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogModelResponse.valueCodeArray));
            index++;
            expect(response.body[index]).toMatchObject(CatalogModelResponse.valueItemArray);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogModelResponse.valueItemArray));
            index++;
            expect(response.body[index]).toMatchObject(CatalogModelResponse.valueInnerArray);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogModelResponse.valueInnerArray));
            index++;
            expect(response.body[index]).toMatchObject(CatalogModelResponse.inheritVersionNone);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogModelResponse.inheritVersionNone));
            index++;
            expect(response.body[index]).toMatchObject(CatalogModelResponse.inheritVersionAvail);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogModelResponse.inheritVersionAvail));
            index++;
            expect(response.body[index]).toMatchObject(CatalogModelResponse.inheritPropertyNumber);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogModelResponse.inheritPropertyNumber));
            index++;
            expect(response.body[index]).toMatchObject(CatalogModelResponse.inheritPropertyString);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogModelResponse.inheritPropertyString));
            index++;
            expect(response.body[index]).toMatchObject(CatalogModelResponse.inheritPropertyBoolean);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogModelResponse.inheritPropertyBoolean));
            index++;
            expect(response.body[index]).toMatchObject(CatalogModelResponse.inheritPropertyCode);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogModelResponse.inheritPropertyCode));
            index++;
            expect(response.body[index]).toMatchObject(CatalogModelResponse.inheritPropertyItem);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogModelResponse.inheritPropertyItem));
            index++;
            expect(response.body[index]).toMatchObject(CatalogModelResponse.inheritPropertyInner);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogModelResponse.inheritPropertyInner));
            index++;
            expect(response.body[index]).toMatchObject(CatalogModelResponse.inheritPropertyNumberArray);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogModelResponse.inheritPropertyNumberArray));
            index++;
            expect(response.body[index]).toMatchObject(CatalogModelResponse.inheritPropertyStringArray);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogModelResponse.inheritPropertyStringArray));
            index++;
            expect(response.body[index]).toMatchObject(CatalogModelResponse.inheritPropertyBooleanArray);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogModelResponse.inheritPropertyBooleanArray));
            index++;
            expect(response.body[index]).toMatchObject(CatalogModelResponse.inheritPropertyCodeArray);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogModelResponse.inheritPropertyCodeArray));
            index++;
            expect(response.body[index]).toMatchObject(CatalogModelResponse.inheritPropertyItemArray);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogModelResponse.inheritPropertyItemArray));
            index++;
            expect(response.body[index]).toMatchObject(CatalogModelResponse.inheritPropertyInnerArray);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogModelResponse.inheritPropertyInnerArray));
            index++;
        });
        test('正常 前提：モデル cmatrix', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '?ns=catalog/model/cmatrix/unit-test');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            let index: number = 0;
            expect(response.status).toBe(200);
            expect(response.body[index]).toMatchObject(CatalogModelResponse.templatePropertyFullNumber);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogModelResponse.templatePropertyFullNumber));
            index++;
            expect(response.body[index]).toMatchObject(CatalogModelResponse.templatePropertyFullString);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogModelResponse.templatePropertyFullString));
            index++;
            expect(response.body[index]).toMatchObject(CatalogModelResponse.templatePropertyFullBoolean);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogModelResponse.templatePropertyFullBoolean));
            index++;
            expect(response.body[index]).toMatchObject(CatalogModelResponse.templatePropertyFullCode);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogModelResponse.templatePropertyFullCode));
            index++;
            expect(response.body[index]).toMatchObject(CatalogModelResponse.templatePropertyFullItem);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogModelResponse.templatePropertyFullItem));
            index++;
            expect(response.body[index]).toMatchObject(CatalogModelResponse.templatePropertyFullInner);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogModelResponse.templatePropertyFullInner));
            index++;
            expect(response.body[index]).toMatchObject(CatalogModelResponse.templatePropertyFullNumberArray);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogModelResponse.templatePropertyFullNumberArray));
            index++;
            expect(response.body[index]).toMatchObject(CatalogModelResponse.templatePropertyFullStringArray);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogModelResponse.templatePropertyFullStringArray));
            index++;
            expect(response.body[index]).toMatchObject(CatalogModelResponse.templatePropertyFullBooleanArray);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogModelResponse.templatePropertyFullBooleanArray));
            index++;
            expect(response.body[index]).toMatchObject(CatalogModelResponse.templatePropertyFullCodeArray);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogModelResponse.templatePropertyFullCodeArray));
            index++;
            expect(response.body[index]).toMatchObject(CatalogModelResponse.templatePropertyFullItemArray);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogModelResponse.templatePropertyFullItemArray));
            index++;
            expect(response.body[index]).toMatchObject(CatalogModelResponse.templatePropertyFullInnerArray);
            expect(JSON.stringify(response.body[index])).toBe(JSON.stringify(CatalogModelResponse.templatePropertyFullInnerArray));
            index++;
        });
    });

    /**
     * カタログ取得(/:code)
     */
    describe('カタログ取得(/:code)', () => {
        test('正常 前提：モデル、コード指定なし', async () => {
            // データ準備
            // 論理削除済みカタログに対してresponseが消されることはない想定でcode = 4 のテストは省く
            await common.executeSqlString(`
                UPDATE pxr_catalog.catalog_item
                SET response = null
                WHERE code != 4
                ;
            `);
            // URLを生成
            const url = urljoin(Url.baseURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.minimum);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.minimum));
        });
        test('正常 前提：モデル、コード指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '2');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.minimumCode);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.minimumCode));
        });
        test('正常 前提：モデル、コード、バージョン指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '3');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.minimumCodeVersion);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.minimumCodeVersion));
        });
        test('正常 前提：モデル、テンプレートプロパティnumber指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '11');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyNumber);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyNumber));
        });
        test('正常 前提：モデル、テンプレートプロパティstring指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '12');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyString);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyString));
        });
        test('正常 前提：モデル、テンプレートプロパティboolean指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '13');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyBoolean);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyBoolean));
        });
        test('正常 前提：モデル、テンプレートプロパティcode指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '14');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyCode);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyCode));
        });
        test('正常 前提：モデル、テンプレートプロパティitem指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '15');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyItem);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyItem));
        });
        test('正常 前提：モデル、テンプレートプロパティinner指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '16');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyInner);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyInner));
        });
        test('正常 前提：モデル、テンプレートプロパティnumber[]指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '21');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyNumberArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyNumberArray));
        });
        test('正常 前提：モデル、テンプレートプロパティstring[]指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '22');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyStringArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyStringArray));
        });
        test('正常 前提：モデル、テンプレートプロパティboolean[]指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '23');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyBooleanArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyBooleanArray));
        });
        test('正常 前提：モデル、テンプレートプロパティcode[]指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '24');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyCodeArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyCodeArray));
        });
        test('正常 前提：モデル、テンプレートプロパティitem[]指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '25');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyItemArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyItemArray));
        });
        test('正常 前提：モデル、テンプレートプロパティinner[]指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '26');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyInnerArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyInnerArray));
        });
        test('正常 前提：モデル、属性指定値なし', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '31');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.attributeValueNone);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.attributeValueNone));
        });
        test('正常 前提：モデル、属性指定値あり', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '32');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.attributeValueAvail);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.attributeValueAvail));
        });
        test('正常 前提：モデル、値指定number', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '41');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.valueNumber);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.valueNumber));
        });
        test('正常 前提：モデル、値指定string', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '42');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.valueString);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.valueString));
        });
        test('正常 前提：モデル、値指定boolean', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '43');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.valueBoolean);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.valueBoolean));
        });
        test('正常 前提：モデル、値指定code', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '44');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.valueCode);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.valueCode));
        });
        test('正常 前提：モデル、値指定item', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '45');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.valueItem);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.valueItem));
        });
        test('異常 前提：モデル、値指定inner、オブジェクト変換時にtemplate_propertyで指定されているカタログが存在しない', async () => {
            // データ準備
            await common.executeSqlString(`
                UPDATE pxr_catalog.item_template
                SET template = '[{"key":"value_inner","value":[{"key":"inner_number","value": 1}, {"key":"inner_number","value":[{"key":"_value", "value": 101},{"key":"_ver", "value": 1}]}]}]'
                WHERE id = 18
                ;
                UPDATE pxr_catalog.template_property
                SET code = 1111111, version = 1
                WHERE id = 19
                ;
            `);
            // URLを生成
            const url = urljoin(Url.baseURI, '46');

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
        test('正常 前提：モデル、値指定inner', async () => {
            await common.executeSqlString(`
                UPDATE pxr_catalog.catalog_item
                SET response = null
                WHERE code = 46
                ;
            `);
            // データ戻し
            await common.executeSqlString(`
                UPDATE pxr_catalog.item_template
                SET template = '[{"key":"value_inner","value":[{"key":"inner_number","value":101}]}]'
                WHERE id = 18
                ;
                UPDATE pxr_catalog.template_property
                SET code = 0, version = 0
                WHERE id = 19
                ;
            `);
            // URLを生成
            const url = urljoin(Url.baseURI, '46');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.valueInner);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.valueInner));
        });
        test('正常 前提：モデル、値指定number[]', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '51');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.valueNumberArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.valueNumberArray));
        });
        test('正常 前提：モデル、値指定string[]', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '52');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.valueStringArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.valueStringArray));
        });
        test('正常 前提：モデル、値指定boolean[]', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '53');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.valueBooleanArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.valueBooleanArray));
        });
        test('正常 前提：モデル、値指定code[]', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '54');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.valueCodeArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.valueCodeArray));
        });
        test('正常 前提：モデル、値指定item[]', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '55');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.valueItemArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.valueItemArray));
        });
        test('正常 前提：モデル、値指定item[]、対象テンプレートプロパティ取得時に対象テンプレートがない', async () => {
            // L2643のカバレッジ対応
            // データ準備
            await common.executeSqlString(`
                UPDATE pxr_catalog.catalog_item
                SET response = null
                WHERE code = 155
                ;
            `);
            await common.executeSqlString(`
                UPDATE pxr_catalog.template_property
                SET is_disabled = true
                WHERE id = 53
                ;
            `);
            // URLを生成
            const url = urljoin(Url.baseURI, '155');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.valueItemArray2);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.valueItemArray2));
        });
        test('正常 前提：モデル、値指定item[]、対象テンプレートプロパティ取得時にCMatrixがない', async () => {
            // L2663のカバレッジ対応
            // データ準備
            await common.executeSqlString(`
                UPDATE pxr_catalog.catalog_item
                SET response = null
                WHERE code = 155
                ;
            `);
            await common.executeSqlString(`
                UPDATE pxr_catalog.template_property
                SET is_disabled = false, index_key = '4_0_0_6'
                WHERE id = 53
                ;
            `);
            // URLを生成
            const url = urljoin(Url.baseURI, '155');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.valueItemArray2);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.valueItemArray2));
        });
        test('正常 前提：モデル、値指定inner[]', async () => {
            // データ戻し
            await common.executeSqlString(`
                UPDATE pxr_catalog.template_property
                SET index_key = '4_2_2_6'
                WHERE id = 53
                ;
            `);
            // URLを生成
            const url = urljoin(Url.baseURI, '56');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.valueInnerArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.valueInnerArray));
        });
        test('正常 前提：モデル、継承、バージョン指定なし', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '61');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.inheritVersionNone);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.inheritVersionNone));
        });
        test('正常 前提：モデル、継承、バージョン指定あり', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '62');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.inheritVersionAvail);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.inheritVersionAvail));
        });
        test('正常 前提：モデル、継承、プロパティnumber', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '63');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.inheritPropertyNumber);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.inheritPropertyNumber));
        });
        test('正常 前提：モデル、継承、プロパティstring', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '64');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.inheritPropertyString);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.inheritPropertyString));
        });
        test('正常 前提：モデル、継承、プロパティboolean', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '65');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.inheritPropertyBoolean);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.inheritPropertyBoolean));
        });
        test('正常 前提：モデル、継承、プロパティcode', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '66');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.inheritPropertyCode);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.inheritPropertyCode));
        });
        test('正常 前提：モデル、継承、プロパティitem', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '67');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.inheritPropertyItem);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.inheritPropertyItem));
        });
        test('正常 前提：モデル、継承、プロパティinner', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '68');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.inheritPropertyInner);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.inheritPropertyInner));
        });
        test('正常 前提：モデル、継承、プロパティnumber[]', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '71');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.inheritPropertyNumberArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.inheritPropertyNumberArray));
        });
        test('正常 前提：モデル、継承、プロパティstring[]', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '72');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.inheritPropertyStringArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.inheritPropertyStringArray));
        });
        test('正常 前提：モデル、継承、プロパティboolean[]', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '73');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.inheritPropertyBooleanArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.inheritPropertyBooleanArray));
        });
        test('正常 前提：モデル、継承、プロパティcode[]', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '74');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.inheritPropertyCodeArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.inheritPropertyCodeArray));
        });
        test('正常 前提：モデル、継承、プロパティitem[]', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '75');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.inheritPropertyItemArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.inheritPropertyItemArray));
        });
        test('正常 前提：モデル、継承、プロパティinner[]', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '76');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.inheritPropertyInnerArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.inheritPropertyInnerArray));
        });
        test('正常 前提：モデル、テンプレートプロパティnumber各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '81');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyFullNumber);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyFullNumber));
        });
        test('正常 前提：モデル、テンプレートプロパティstring各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '82');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyFullString);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyFullString));
        });
        test('正常 前提：モデル、テンプレートプロパティboolean各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '83');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyFullBoolean);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyFullBoolean));
        });
        test('正常 前提：モデル、テンプレートプロパティcode各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '84');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyFullCode);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyFullCode));
        });
        test('正常 前提：モデル、テンプレートプロパティitem各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '85');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyFullItem);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyFullItem));
        });
        test('正常 前提：モデル、テンプレートプロパティinner各種設定、inner対象プロパティリスト取得でアイテムテンプレート情報が存在しない', async () => {
            // データ準備
            await common.executeSqlString(`
                UPDATE pxr_catalog.item_template
                SET is_disabled = true
                WHERE id = 47
                ;
            `);
            // URLを生成
            const url = urljoin(Url.baseURI, '86');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyFullInnerNoitemTemplate);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyFullInnerNoitemTemplate));
        });
        test('正常 前提：モデル、テンプレートプロパティinner各種設定', async () => {
            // データ準備
            await common.executeSqlString(`
                UPDATE pxr_catalog.catalog_item
                SET response = null
                WHERE code = 86
                ;
            `);
            await common.executeSqlString(`
                UPDATE pxr_catalog.item_template
                SET is_disabled = false
                WHERE id = 47
                ;
            `);
            // URLを生成
            const url = urljoin(Url.baseURI, '86');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyFullInner);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyFullInner));
        });
        test('正常 前提：モデル、テンプレートプロパティnumber[]各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '91');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyFullNumberArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyFullNumberArray));
        });
        test('正常 前提：モデル、テンプレートプロパティstring[]各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '92');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyFullStringArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyFullStringArray));
        });
        test('正常 前提：モデル、テンプレートプロパティboolean[]各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '93');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyFullBooleanArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyFullBooleanArray));
        });
        test('正常 前提：モデル、テンプレートプロパティcode[]各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '94');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyFullCodeArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyFullCodeArray));
        });
        test('正常 前提：モデル、テンプレートプロパティitem[]各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '95');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyFullItemArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyFullItemArray));
        });
        test('異常 CMatrix情報取得失敗', async () => {
            // データ準備
            await common.executeSqlString(`
                UPDATE pxr_catalog.template_property
                SET index_key = '4_0_0_6'
                WHERE id = 53
                ;
                UPDATE pxr_catalog.template_property
                SET index_key = '4_0_0_1'
                WHERE id = 54
                ;
            `);
            // URLを生成
            const url = urljoin(Url.baseURI, '96');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(404);
            expect(response.body.message).toBe(Message.CMATRIX_NOT_FOUND);
        });
        test('正常 前提：モデル、テンプレートプロパティinner[]各種設定', async () => {
            // データ準備
            await common.executeSqlString(`
                UPDATE pxr_catalog.template_property
                SET index_key = '4_2_2_6'
                WHERE id = 53
                ;
                UPDATE pxr_catalog.template_property
                SET index_key = '4_2_2_1'
                WHERE id = 54
                ;
            `);
            await common.executeSqlString(`
                UPDATE pxr_catalog.catalog_item
                SET response = null
                WHERE code = 96
                ;
            `);
            // getTemplatePropertyListByInnerでテンプレートプロパティ情報が取得できない分岐の網羅用にカタログとアイテムテンプレート追加
            await common.executeSqlString(`
                INSERT INTO pxr_catalog.catalog_item
                (
                    id, code, version, ns_id, name, description, inherit_code, inherit_version, is_reserved,
                    is_disabled, response, attributes, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    500, 500, 1, 1, 'ユニットテスト網羅', 'ユニットテスト網羅用に追加したカタログです。', null, null, false,
                    false, null, null, 'unit_test', NOW(), 'unit_test', NOW()
                )
                ;
                INSERT INTO pxr_catalog.item_template
                (
                    catalog_item_id, template_property_id, template, inner_name, inner_inherit_code, inner_inherit_version,
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    500, 53, '', null, null, null,
                    false, 'unit_test', NOW(), 'unit_test', NOW()
                )
                ;
            `);
            // URLを生成
            const url = urljoin(Url.baseURI, '96');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyFullInnerArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyFullInnerArray));
        });
    });

    /**
     * カタログ取得(/:code/:ver)
     */
    describe('カタログ取得(/:code/:ver)', () => {
        test('正常 前提：モデル、コード指定なし', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '1', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.minimum);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.minimum));
        });
        test('正常 前提：モデル、コード指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '2', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.minimumCode);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.minimumCode));
        });
        test('正常 前提：モデル、コード、バージョン指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '3', '1', '?includeDeleted=false');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.minimumCodeVersion);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.minimumCodeVersion));
        });
        test('正常 前提：モデル、コード、バージョン指定、削除済み', async () => {
            // データ準備
            await common.executeSqlString(`
            UPDATE pxr_catalog.catalog_item 
            SET is_disabled = true
            WHERE code = 4 and version = 2
            ;
            `);
            // URLを生成
            const url = urljoin(Url.baseURI, '4', '2', '?includeDeleted=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.minimumCodeVersionDeleted);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.minimumCodeVersionDeleted));
        });
        test('正常 前提：モデル、テンプレートプロパティnumber指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '11', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyNumber);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyNumber));
        });
        test('正常 前提：モデル、テンプレートプロパティstring指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '12', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyString);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyString));
        });
        test('正常 前提：モデル、テンプレートプロパティboolean指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '13', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyBoolean);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyBoolean));
        });
        test('正常 前提：モデル、テンプレートプロパティcode指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '14', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyCode);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyCode));
        });
        test('正常 前提：モデル、テンプレートプロパティitem指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '15', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyItem);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyItem));
        });
        test('正常 前提：モデル、テンプレートプロパティinner指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '16', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyInner);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyInner));
        });
        test('正常 前提：モデル、テンプレートプロパティnumber[]指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '21', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyNumberArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyNumberArray));
        });
        test('正常 前提：モデル、テンプレートプロパティstring[]指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '22', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyStringArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyStringArray));
        });
        test('正常 前提：モデル、テンプレートプロパティboolean[]指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '23', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyBooleanArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyBooleanArray));
        });
        test('正常 前提：モデル、テンプレートプロパティcode[]指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '24', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyCodeArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyCodeArray));
        });
        test('正常 前提：モデル、テンプレートプロパティitem[]指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '25', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyItemArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyItemArray));
        });
        test('正常 前提：モデル、テンプレートプロパティinner[]指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '26', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyInnerArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyInnerArray));
        });
        test('正常 前提：モデル、属性指定値なし', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '31', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.attributeValueNone);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.attributeValueNone));
        });
        test('正常 前提：モデル、属性指定値あり', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '32', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.attributeValueAvail);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.attributeValueAvail));
        });
        test('正常 前提：モデル、値指定number', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '41', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.valueNumber);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.valueNumber));
        });
        test('正常 前提：モデル、値指定string', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '42', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.valueString);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.valueString));
        });
        test('正常 前提：モデル、値指定boolean', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '43', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.valueBoolean);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.valueBoolean));
        });
        test('正常 前提：モデル、値指定code', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '44', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.valueCode);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.valueCode));
        });
        test('正常 前提：モデル、値指定item', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '45', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.valueItem);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.valueItem));
        });
        test('正常 前提：モデル、値指定inner', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '46', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.valueInner);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.valueInner));
        });
        test('正常 前提：モデル、値指定number[]', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '51', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.valueNumberArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.valueNumberArray));
        });
        test('正常 前提：モデル、値指定string[]', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '52', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.valueStringArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.valueStringArray));
        });
        test('正常 前提：モデル、値指定boolean[]', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '53', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.valueBooleanArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.valueBooleanArray));
        });
        test('正常 前提：モデル、値指定code[]', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '54', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.valueCodeArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.valueCodeArray));
        });
        test('正常 前提：モデル、値指定item[]', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '55', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.valueItemArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.valueItemArray));
        });
        test('正常 前提：モデル、値指定inner[]', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '56', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.valueInnerArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.valueInnerArray));
        });
        test('正常 前提：モデル、継承、バージョン指定なし', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '61', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.inheritVersionNone);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.inheritVersionNone));
        });
        test('正常 前提：モデル、継承、バージョン指定あり', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '62', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.inheritVersionAvail);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.inheritVersionAvail));
        });
        test('正常 前提：モデル、継承、プロパティnumber', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '63', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.inheritPropertyNumber);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.inheritPropertyNumber));
        });
        test('正常 前提：モデル、継承、プロパティstring', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '64', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.inheritPropertyString);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.inheritPropertyString));
        });
        test('正常 前提：モデル、継承、プロパティboolean', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '65', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.inheritPropertyBoolean);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.inheritPropertyBoolean));
        });
        test('正常 前提：モデル、継承、プロパティcode', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '66', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.inheritPropertyCode);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.inheritPropertyCode));
        });
        test('正常 前提：モデル、継承、プロパティitem', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '67', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.inheritPropertyItem);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.inheritPropertyItem));
        });
        test('正常 前提：モデル、継承、プロパティinner', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '68', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.inheritPropertyInner);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.inheritPropertyInner));
        });

        test('正常 前提：モデル、継承、プロパティnumber[]', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '71', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.inheritPropertyNumberArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.inheritPropertyNumberArray));
        });
        test('正常 前提：モデル、継承、プロパティstring[]', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '72', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.inheritPropertyStringArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.inheritPropertyStringArray));
        });
        test('正常 前提：モデル、継承、プロパティboolean[]', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '73', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.inheritPropertyBooleanArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.inheritPropertyBooleanArray));
        });
        test('正常 前提：モデル、継承、プロパティcode[]', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '74', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.inheritPropertyCodeArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.inheritPropertyCodeArray));
        });
        test('正常 前提：モデル、継承、プロパティitem[]', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '75', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.inheritPropertyItemArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.inheritPropertyItemArray));
        });
        test('正常 前提：モデル、継承、プロパティinner[]', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '76', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.inheritPropertyInnerArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.inheritPropertyInnerArray));
        });
        test('正常 前提：モデル、テンプレートプロパティnumber各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '81', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyFullNumber);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyFullNumber));
        });
        test('正常 前提：モデル、テンプレートプロパティstring各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '82', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyFullString);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyFullString));
        });
        test('正常 前提：モデル、テンプレートプロパティboolean各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '83', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyFullBoolean);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyFullBoolean));
        });
        test('正常 前提：モデル、テンプレートプロパティcode各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '84', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyFullCode);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyFullCode));
        });
        test('正常 前提：モデル、テンプレートプロパティitem各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '85', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyFullItem);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyFullItem));
        });
        test('正常 前提：モデル、テンプレートプロパティinner各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '86', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyFullInner);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyFullInner));
        });
        test('正常 前提：モデル、テンプレートプロパティnumber[]各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '91', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyFullNumberArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyFullNumberArray));
        });
        test('正常 前提：モデル、テンプレートプロパティstring[]各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '92', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyFullStringArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyFullStringArray));
        });
        test('正常 前提：モデル、テンプレートプロパティboolean[]各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '93', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyFullBooleanArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyFullBooleanArray));
        });
        test('正常 前提：モデル、テンプレートプロパティcode[]各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '94', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyFullCodeArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyFullCodeArray));
        });
        test('正常 前提：モデル、テンプレートプロパティitem[]各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '95', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyFullItemArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyFullItemArray));
        });
        test('正常 前提：モデル、テンプレートプロパティinner[]各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, '96', '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelResponse.templatePropertyFullInnerArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelResponse.templatePropertyFullInnerArray));
        });
    });

    /**
     * カタログ取得(複数code)
     */
    describe('カタログ取得(複数code)', () => {
        test('正常 前提：モデル、バージョン指定なし', async () => {
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
                            _ver: null
                        }
                    }
                ]);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject([CatalogModelResponse.minimum]);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify([CatalogModelResponse.minimum]));
        });
        test('正常 前提：モデル、バージョン指定', async () => {
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
                            _value: 2,
                            _ver: 1
                        }
                    }
                ]);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject([CatalogModelResponse.minimumCode]);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify([CatalogModelResponse.minimumCode]));
        });
        test('正常 前提：モデル、コード、バージョン指定', async () => {
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
                            _value: 3,
                            _ver: 1
                        }
                    }
                ]);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject([CatalogModelResponse.minimumCodeVersion]);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify([CatalogModelResponse.minimumCodeVersion]));
        });
        test('正常 前提：モデル、テンプレートプロパティnumber指定', async () => {
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
                            _value: 11,
                            _ver: 1
                        }
                    }
                ]);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject([CatalogModelResponse.templatePropertyNumber]);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify([CatalogModelResponse.templatePropertyNumber]));
        });
        test('正常 前提：モデル、テンプレートプロパティstring指定', async () => {
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
                            _value: 12,
                            _ver: 1
                        }
                    }
                ]);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject([CatalogModelResponse.templatePropertyString]);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify([CatalogModelResponse.templatePropertyString]));
        });
        test('正常 前提：モデル、テンプレートプロパティboolean指定', async () => {
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
                            _value: 13,
                            _ver: 1
                        }
                    }
                ]);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject([CatalogModelResponse.templatePropertyBoolean]);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify([CatalogModelResponse.templatePropertyBoolean]));
        });
        test('正常 前提：モデル、テンプレートプロパティcode指定', async () => {
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
                            _value: 14,
                            _ver: 1
                        }
                    }
                ]);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject([CatalogModelResponse.templatePropertyCode]);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify([CatalogModelResponse.templatePropertyCode]));
        });
        test('正常 前提：モデル、テンプレートプロパティitem指定', async () => {
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
                            _value: 15,
                            _ver: 1
                        }
                    }
                ]);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject([CatalogModelResponse.templatePropertyItem]);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify([CatalogModelResponse.templatePropertyItem]));
        });
        test('正常 前提：モデル、テンプレートプロパティinner指定', async () => {
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
                            _value: 16,
                            _ver: 1
                        }
                    }
                ]);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject([CatalogModelResponse.templatePropertyInner]);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify([CatalogModelResponse.templatePropertyInner]));
        });
        test('正常 前提：モデル、テンプレートプロパティnumber[]指定', async () => {
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
                            _value: 21,
                            _ver: 1
                        }
                    }
                ]);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject([CatalogModelResponse.templatePropertyNumberArray]);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify([CatalogModelResponse.templatePropertyNumberArray]));
        });
        test('正常 前提：モデル、テンプレートプロパティstring[]指定', async () => {
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
                            _value: 22,
                            _ver: 1
                        }
                    }
                ]);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject([CatalogModelResponse.templatePropertyStringArray]);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify([CatalogModelResponse.templatePropertyStringArray]));
        });
        test('正常 前提：モデル、テンプレートプロパティboolean[]指定', async () => {
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
                            _value: 23,
                            _ver: 1
                        }
                    }
                ]);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject([CatalogModelResponse.templatePropertyBooleanArray]);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify([CatalogModelResponse.templatePropertyBooleanArray]));
        });
        test('正常 前提：モデル、テンプレートプロパティcode[]指定', async () => {
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
                            _value: 24,
                            _ver: 1
                        }
                    }
                ]);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject([CatalogModelResponse.templatePropertyCodeArray]);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify([CatalogModelResponse.templatePropertyCodeArray]));
        });
        test('正常 前提：モデル、テンプレートプロパティitem[]指定', async () => {
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
                            _value: 25,
                            _ver: 1
                        }
                    }
                ]);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject([CatalogModelResponse.templatePropertyItemArray]);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify([CatalogModelResponse.templatePropertyItemArray]));
        });
        test('正常 前提：モデル、テンプレートプロパティinner[]指定', async () => {
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
                            _value: 26,
                            _ver: 1
                        }
                    }
                ]);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject([CatalogModelResponse.templatePropertyInnerArray]);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify([CatalogModelResponse.templatePropertyInnerArray]));
        });
        test('正常 前提：モデル、属性指定値なし', async () => {
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
                            _value: 31,
                            _ver: 1
                        }
                    }
                ]);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject([CatalogModelResponse.attributeValueNone]);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify([CatalogModelResponse.attributeValueNone]));
        });
        test('正常 前提：モデル、属性指定値あり', async () => {
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
                            _value: 32,
                            _ver: 1
                        }
                    }
                ]);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject([CatalogModelResponse.attributeValueAvail]);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify([CatalogModelResponse.attributeValueAvail]));
        });
        test('正常 前提：モデル、値指定number', async () => {
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
                            _value: 41,
                            _ver: 1
                        }
                    }
                ]);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject([CatalogModelResponse.valueNumber]);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify([CatalogModelResponse.valueNumber]));
        });
        test('正常 前提：モデル、値指定string', async () => {
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
                            _value: 42,
                            _ver: 1
                        }
                    }
                ]);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject([CatalogModelResponse.valueString]);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify([CatalogModelResponse.valueString]));
        });
        test('正常 前提：モデル、値指定boolean', async () => {
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
                            _value: 43,
                            _ver: 1
                        }
                    }
                ]);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject([CatalogModelResponse.valueBoolean]);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify([CatalogModelResponse.valueBoolean]));
        });
        test('正常 前提：モデル、値指定code', async () => {
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
                            _value: 44,
                            _ver: 1
                        }
                    }
                ]);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject([CatalogModelResponse.valueCode]);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify([CatalogModelResponse.valueCode]));
        });
        test('正常 前提：モデル、値指定item', async () => {
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
                            _value: 45,
                            _ver: 1
                        }
                    }
                ]);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject([CatalogModelResponse.valueItem]);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify([CatalogModelResponse.valueItem]));
        });
        test('正常 前提：モデル、値指定inner', async () => {
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
                            _value: 46,
                            _ver: 1
                        }
                    }
                ]);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject([CatalogModelResponse.valueInner]);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify([CatalogModelResponse.valueInner]));
        });
        test('正常 前提：モデル、値指定number[]', async () => {
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
                            _value: 51,
                            _ver: 1
                        }
                    }
                ]);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject([CatalogModelResponse.valueNumberArray]);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify([CatalogModelResponse.valueNumberArray]));
        });
        test('正常 前提：モデル、値指定string[]', async () => {
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
                            _value: 52,
                            _ver: 1
                        }
                    }
                ]);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject([CatalogModelResponse.valueStringArray]);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify([CatalogModelResponse.valueStringArray]));
        });
        test('正常 前提：モデル、値指定boolean[]', async () => {
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
                            _value: 53,
                            _ver: 1
                        }
                    }
                ]);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject([CatalogModelResponse.valueBooleanArray]);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify([CatalogModelResponse.valueBooleanArray]));
        });
        test('正常 前提：モデル、値指定code[]', async () => {
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
                            _value: 54,
                            _ver: 1
                        }
                    }
                ]);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject([CatalogModelResponse.valueCodeArray]);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify([CatalogModelResponse.valueCodeArray]));
        });
        test('正常 前提：モデル、値指定item[]', async () => {
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
                            _value: 55,
                            _ver: 1
                        }
                    }
                ]);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject([CatalogModelResponse.valueItemArray]);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify([CatalogModelResponse.valueItemArray]));
        });
        test('正常 前提：モデル、値指定inner[]', async () => {
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
                            _value: 56,
                            _ver: 1
                        }
                    }
                ]);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject([CatalogModelResponse.valueInnerArray]);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify([CatalogModelResponse.valueInnerArray]));
        });
        test('正常 前提：モデル、継承、バージョン指定なし', async () => {
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
                            _value: 61,
                            _ver: 1
                        }
                    }
                ]);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject([CatalogModelResponse.inheritVersionNone]);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify([CatalogModelResponse.inheritVersionNone]));
        });
        test('正常 前提：モデル、継承、バージョン指定あり', async () => {
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
                            _value: 62,
                            _ver: 1
                        }
                    }
                ]);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject([CatalogModelResponse.inheritVersionAvail]);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify([CatalogModelResponse.inheritVersionAvail]));
        });
        test('正常 前提：モデル、継承、プロパティnumber', async () => {
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
                            _value: 63,
                            _ver: 1
                        }
                    }
                ]);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject([CatalogModelResponse.inheritPropertyNumber]);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify([CatalogModelResponse.inheritPropertyNumber]));
        });
        test('正常 前提：モデル、継承、プロパティstring', async () => {
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
                            _value: 64,
                            _ver: 1
                        }
                    }
                ]);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject([CatalogModelResponse.inheritPropertyString]);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify([CatalogModelResponse.inheritPropertyString]));
        });
        test('正常 前提：モデル、継承、プロパティboolean', async () => {
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
                            _value: 65,
                            _ver: 1
                        }
                    }
                ]);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject([CatalogModelResponse.inheritPropertyBoolean]);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify([CatalogModelResponse.inheritPropertyBoolean]));
        });
        test('正常 前提：モデル、継承、プロパティcode', async () => {
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
                            _value: 66,
                            _ver: 1
                        }
                    }
                ]);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject([CatalogModelResponse.inheritPropertyCode]);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify([CatalogModelResponse.inheritPropertyCode]));
        });
        test('正常 前提：モデル、継承、プロパティitem', async () => {
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
                            _value: 67,
                            _ver: 1
                        }
                    }
                ]);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject([CatalogModelResponse.inheritPropertyItem]);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify([CatalogModelResponse.inheritPropertyItem]));
        });
        test('正常 前提：モデル、継承、プロパティinner', async () => {
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
                            _value: 68,
                            _ver: 1
                        }
                    }
                ]);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject([CatalogModelResponse.inheritPropertyInner]);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify([CatalogModelResponse.inheritPropertyInner]));
        });

        test('正常 前提：モデル、継承、プロパティnumber[]', async () => {
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
                            _value: 71,
                            _ver: 1
                        }
                    }
                ]);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject([CatalogModelResponse.inheritPropertyNumberArray]);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify([CatalogModelResponse.inheritPropertyNumberArray]));
        });
        test('正常 前提：モデル、継承、プロパティstring[]', async () => {
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
                            _value: 72,
                            _ver: 1
                        }
                    }
                ]);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject([CatalogModelResponse.inheritPropertyStringArray]);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify([CatalogModelResponse.inheritPropertyStringArray]));
        });
        test('正常 前提：モデル、継承、プロパティboolean[]', async () => {
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
                            _value: 73,
                            _ver: 1
                        }
                    }
                ]);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject([CatalogModelResponse.inheritPropertyBooleanArray]);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify([CatalogModelResponse.inheritPropertyBooleanArray]));
        });
        test('正常 前提：モデル、継承、プロパティcode[]', async () => {
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
                            _value: 74,
                            _ver: 1
                        }
                    }
                ]);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject([CatalogModelResponse.inheritPropertyCodeArray]);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify([CatalogModelResponse.inheritPropertyCodeArray]));
        });
        test('正常 前提：モデル、継承、プロパティitem[]', async () => {
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
                            _value: 75,
                            _ver: 1
                        }
                    }
                ]);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject([CatalogModelResponse.inheritPropertyItemArray]);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify([CatalogModelResponse.inheritPropertyItemArray]));
        });
        test('正常 前提：モデル、継承、プロパティinner[]', async () => {
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
                            _value: 76,
                            _ver: 1
                        }
                    }
                ]);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject([CatalogModelResponse.inheritPropertyInnerArray]);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify([CatalogModelResponse.inheritPropertyInnerArray]));
        });
        test('正常 前提：モデル、テンプレートプロパティnumber各種設定', async () => {
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
                            _value: 81,
                            _ver: 1
                        }
                    }
                ]);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject([CatalogModelResponse.templatePropertyFullNumber]);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify([CatalogModelResponse.templatePropertyFullNumber]));
        });
        test('正常 前提：モデル、テンプレートプロパティstring各種設定', async () => {
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
                            _value: 82,
                            _ver: 1
                        }
                    }
                ]);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject([CatalogModelResponse.templatePropertyFullString]);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify([CatalogModelResponse.templatePropertyFullString]));
        });
        test('正常 前提：モデル、テンプレートプロパティboolean各種設定', async () => {
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
                            _value: 83,
                            _ver: 1
                        }
                    }
                ]);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject([CatalogModelResponse.templatePropertyFullBoolean]);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify([CatalogModelResponse.templatePropertyFullBoolean]));
        });
        test('正常 前提：モデル、テンプレートプロパティcode各種設定', async () => {
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
                            _value: 84,
                            _ver: 1
                        }
                    }
                ]);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject([CatalogModelResponse.templatePropertyFullCode]);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify([CatalogModelResponse.templatePropertyFullCode]));
        });
        test('正常 前提：モデル、テンプレートプロパティitem各種設定', async () => {
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
                            _value: 85,
                            _ver: 1
                        }
                    }
                ]);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject([CatalogModelResponse.templatePropertyFullItem]);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify([CatalogModelResponse.templatePropertyFullItem]));
        });
        test('正常 前提：モデル、テンプレートプロパティinner各種設定', async () => {
            // データ準備 (分岐網羅用)
            await common.executeSqlString(`
                UPDATE pxr_catalog.template_property
                SET is_disabled = true
                WHERE id = 47
                ;
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
                            _value: 86,
                            _ver: 1
                        }
                    }
                ]);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject([CatalogModelResponse.templatePropertyFullInner]);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify([CatalogModelResponse.templatePropertyFullInner]));
            // データ戻し
            await common.executeSqlString(`
                UPDATE pxr_catalog.template_property
                SET is_disabled = false
                WHERE id = 47
                ;
            `);
        });
        test('正常 前提：モデル、テンプレートプロパティnumber[]各種設定', async () => {
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
                            _value: 91,
                            _ver: 1
                        }
                    }
                ]);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject([CatalogModelResponse.templatePropertyFullNumberArray]);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify([CatalogModelResponse.templatePropertyFullNumberArray]));
        });
        test('正常 前提：モデル、テンプレートプロパティstring[]各種設定', async () => {
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
                            _value: 92,
                            _ver: 1
                        }
                    }
                ]);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject([CatalogModelResponse.templatePropertyFullStringArray]);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify([CatalogModelResponse.templatePropertyFullStringArray]));
        });
        test('正常 前提：モデル、テンプレートプロパティboolean[]各種設定', async () => {
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
                            _value: 93,
                            _ver: 1
                        }
                    }
                ]);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject([CatalogModelResponse.templatePropertyFullBooleanArray]);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify([CatalogModelResponse.templatePropertyFullBooleanArray]));
        });
        test('正常 前提：モデル、テンプレートプロパティcode[]各種設定', async () => {
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
                            _value: 94,
                            _ver: 1
                        }
                    }
                ]);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject([CatalogModelResponse.templatePropertyFullCodeArray]);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify([CatalogModelResponse.templatePropertyFullCodeArray]));
        });
        test('正常 前提：モデル、テンプレートプロパティitem[]各種設定', async () => {
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
                            _value: 95,
                            _ver: 1
                        }
                    }
                ]);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject([CatalogModelResponse.templatePropertyFullItemArray]);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify([CatalogModelResponse.templatePropertyFullItemArray]));
        });
        test('正常 前提：モデル、テンプレートプロパティinner[]各種設定', async () => {
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
                            _value: 96,
                            _ver: 1
                        }
                    }
                ]);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject([CatalogModelResponse.templatePropertyFullInnerArray]);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify([CatalogModelResponse.templatePropertyFullInnerArray]));
        });
    });

    /**
     * カタログ更新
     */
    describe('カタログ更新', () => {
        test('正常 前提：モデル、コード指定なし', async () => {
            // URLを生成
            const url = urljoin(Url.modelURI, '1', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelUpdateRequest.minimum);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelUpdateResponse.minimum);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelUpdateResponse.minimum));
        });
        test('正常 前提：モデル、コード指定', async () => {
            // URLを生成
            const url = urljoin(Url.modelURI, '2', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelUpdateRequest.minimumCode);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelUpdateResponse.minimumCode);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelUpdateResponse.minimumCode));
        });
        test('正常 前提：モデル、コード、バージョン指定', async () => {
            // URLを生成
            const url = urljoin(Url.modelURI, '3', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelUpdateRequest.minimumCodeVersion);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelUpdateResponse.minimumCodeVersion);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelUpdateResponse.minimumCodeVersion));
        });
        test('正常 前提：モデル、テンプレートプロパティnumber指定', async () => {
            // URLを生成
            const url = urljoin(Url.modelURI, '11', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelUpdateRequest.templatePropertyNumber);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelUpdateResponse.templatePropertyNumber);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelUpdateResponse.templatePropertyNumber));
        });
        test('正常 前提：モデル、テンプレートプロパティstring指定', async () => {
            // URLを生成
            const url = urljoin(Url.modelURI, '12', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelUpdateRequest.templatePropertyString);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelUpdateResponse.templatePropertyString);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelUpdateResponse.templatePropertyString));
        });
        test('正常 前提：モデル、テンプレートプロパティboolean指定', async () => {
            // URLを生成
            const url = urljoin(Url.modelURI, '13', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelUpdateRequest.templatePropertyBoolean);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelUpdateResponse.templatePropertyBoolean);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelUpdateResponse.templatePropertyBoolean));
        });
        test('正常 前提：モデル、テンプレートプロパティcode指定', async () => {
            // URLを生成
            const url = urljoin(Url.modelURI, '14', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelUpdateRequest.templatePropertyCode);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelUpdateResponse.templatePropertyCode);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelUpdateResponse.templatePropertyCode));
        });
        test('正常 前提：モデル、テンプレートプロパティitem指定', async () => {
            // URLを生成
            const url = urljoin(Url.modelURI, '15', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelUpdateRequest.templatePropertyItem);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelUpdateResponse.templatePropertyItem);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelUpdateResponse.templatePropertyItem));
        });
        test('正常 前提：モデル、テンプレートプロパティinner指定', async () => {
            // URLを生成
            const url = urljoin(Url.modelURI, '16', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelUpdateRequest.templatePropertyInner);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelUpdateResponse.templatePropertyInner);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelUpdateResponse.templatePropertyInner));
        });
        test('正常 前提：モデル、テンプレートプロパティnumber[]指定', async () => {
            // URLを生成
            const url = urljoin(Url.modelURI, '21', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelUpdateRequest.templatePropertyNumberArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelUpdateResponse.templatePropertyNumberArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelUpdateResponse.templatePropertyNumberArray));
        });
        test('正常 前提：モデル、テンプレートプロパティstring[]指定', async () => {
            // URLを生成
            const url = urljoin(Url.modelURI, '22', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelUpdateRequest.templatePropertyStringArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelUpdateResponse.templatePropertyStringArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelUpdateResponse.templatePropertyStringArray));
        });
        test('正常 前提：モデル、テンプレートプロパティboolean[]指定', async () => {
            // URLを生成
            const url = urljoin(Url.modelURI, '23', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelUpdateRequest.templatePropertyBooleanArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelUpdateResponse.templatePropertyBooleanArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelUpdateResponse.templatePropertyBooleanArray));
        });
        test('正常 前提：モデル、テンプレートプロパティcode[]指定', async () => {
            // URLを生成
            const url = urljoin(Url.modelURI, '24', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelUpdateRequest.templatePropertyCodeArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelUpdateResponse.templatePropertyCodeArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelUpdateResponse.templatePropertyCodeArray));
        });
        test('正常 前提：モデル、テンプレートプロパティitem[]指定', async () => {
            // URLを生成
            const url = urljoin(Url.modelURI, '25', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelUpdateRequest.templatePropertyItemArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelUpdateResponse.templatePropertyItemArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelUpdateResponse.templatePropertyItemArray));
        });
        test('正常 前提：モデル、テンプレートプロパティinner[]指定', async () => {
            // URLを生成
            const url = urljoin(Url.modelURI, '26', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelUpdateRequest.templatePropertyInnerArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelUpdateResponse.templatePropertyInnerArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelUpdateResponse.templatePropertyInnerArray));
        });
        test('正常 前提：モデル、属性指定値なし', async () => {
            // URLを生成
            const url = urljoin(Url.modelURI, '31', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelUpdateRequest.attributeValueNone);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelUpdateResponse.attributeValueNone);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelUpdateResponse.attributeValueNone));
        });
        test('正常 前提：モデル、属性指定値あり', async () => {
            // URLを生成
            const url = urljoin(Url.modelURI, '32', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelUpdateRequest.attributeValueAvail);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelUpdateResponse.attributeValueAvail);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelUpdateResponse.attributeValueAvail));
        });
        test('正常 前提：モデル、値指定number', async () => {
            // URLを生成
            const url = urljoin(Url.modelURI, '41', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelUpdateRequest.valueNumber);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelUpdateResponse.valueNumber);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelUpdateResponse.valueNumber));
        });
        test('正常 前提：モデル、値指定string', async () => {
            // URLを生成
            const url = urljoin(Url.modelURI, '42', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelUpdateRequest.valueString);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelUpdateResponse.valueString);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelUpdateResponse.valueString));
        });
        test('正常 前提：モデル、値指定boolean', async () => {
            // URLを生成
            const url = urljoin(Url.modelURI, '43', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelUpdateRequest.valueBoolean);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelUpdateResponse.valueBoolean);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelUpdateResponse.valueBoolean));
        });
        test('正常 前提：モデル、値指定code', async () => {
            // URLを生成
            const url = urljoin(Url.modelURI, '44', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelUpdateRequest.valueCode);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelUpdateResponse.valueCode);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelUpdateResponse.valueCode));
        });
        test('正常 前提：モデル、値指定item', async () => {
            // URLを生成
            const url = urljoin(Url.modelURI, '45', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelUpdateRequest.valueItem);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelUpdateResponse.valueItem);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelUpdateResponse.valueItem));
        });
        test('正常 前提：モデル、値指定inner46', async () => {
            // データ準備 (分岐網羅用)
            await common.executeSqlString(`
                UPDATE pxr_catalog.item_template
                SET is_disabled = true
                WHERE id = 77
                ;
                UPDATE pxr_catalog.template_property
                SET is_disabled = true
                WHERE id = 77
                ;
            `);
            // URLを生成
            const url = urljoin(Url.modelURI, '46', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelUpdateRequest.valueInner);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelUpdateResponse.valueInner);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelUpdateResponse.valueInner));
            // データ戻し
            await common.executeSqlString(`
                UPDATE pxr_catalog.item_template
                SET is_disabled = false
                WHERE id = 77
                ;
                UPDATE pxr_catalog.template_property
                SET is_disabled = false
                WHERE id = 77
                ;
            `);
        });
        test('正常 前提：モデル、値指定number[]', async () => {
            // URLを生成
            const url = urljoin(Url.modelURI, '51', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelUpdateRequest.valueNumberArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelUpdateResponse.valueNumberArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelUpdateResponse.valueNumberArray));
        });
        test('正常 前提：モデル、値指定string[]', async () => {
            // URLを生成
            const url = urljoin(Url.modelURI, '52', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelUpdateRequest.valueStringArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelUpdateResponse.valueStringArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelUpdateResponse.valueStringArray));
        });
        test('正常 前提：モデル、値指定boolean[]', async () => {
            // URLを生成
            const url = urljoin(Url.modelURI, '53', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelUpdateRequest.valueBooleanArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelUpdateResponse.valueBooleanArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelUpdateResponse.valueBooleanArray));
        });
        test('正常 前提：モデル、値指定code[]', async () => {
            // URLを生成
            const url = urljoin(Url.modelURI, '54', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelUpdateRequest.valueCodeArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelUpdateResponse.valueCodeArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelUpdateResponse.valueCodeArray));
        });
        test('正常 前提：モデル、値指定item[]', async () => {
            // URLを生成
            const url = urljoin(Url.modelURI, '55', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelUpdateRequest.valueItemArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelUpdateResponse.valueItemArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelUpdateResponse.valueItemArray));
        });
        test('正常 前提：モデル、値指定inner[]', async () => {
            // URLを生成
            const url = urljoin(Url.modelURI, '56', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelUpdateRequest.valueInnerArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelUpdateResponse.valueInnerArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelUpdateResponse.valueInnerArray));
        });
        test('正常 前提：モデル、継承、バージョン指定なし', async () => {
            // URLを生成
            const url = urljoin(Url.modelURI, '61', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelUpdateRequest.inheritVersionNone);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelUpdateResponse.inheritVersionNone);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelUpdateResponse.inheritVersionNone));
        });
        test('正常 前提：モデル、継承、バージョン指定あり', async () => {
            // URLを生成
            const url = urljoin(Url.modelURI, '62', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelUpdateRequest.inheritVersionAvail);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelUpdateResponse.inheritVersionAvail);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelUpdateResponse.inheritVersionAvail));
        });
        test('正常 前提：モデル、継承、プロパティnumber', async () => {
            // URLを生成
            const url = urljoin(Url.modelURI, '63', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelUpdateRequest.inheritPropertyNumber);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelUpdateResponse.inheritPropertyNumber);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelUpdateResponse.inheritPropertyNumber));
        });
        test('正常 前提：モデル、継承、プロパティstring', async () => {
            // URLを生成
            const url = urljoin(Url.modelURI, '64', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelUpdateRequest.inheritPropertyString);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelUpdateResponse.inheritPropertyString);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelUpdateResponse.inheritPropertyString));
        });
        test('正常 前提：モデル、継承、プロパティboolean', async () => {
            // URLを生成
            const url = urljoin(Url.modelURI, '65', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelUpdateRequest.inheritPropertyBoolean);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelUpdateResponse.inheritPropertyBoolean);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelUpdateResponse.inheritPropertyBoolean));
        });
        test('正常 前提：モデル、継承、プロパティcode', async () => {
            // URLを生成
            const url = urljoin(Url.modelURI, '66', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelUpdateRequest.inheritPropertyCode);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelUpdateResponse.inheritPropertyCode);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelUpdateResponse.inheritPropertyCode));
        });
        test('正常 前提：モデル、継承、プロパティitem', async () => {
            // URLを生成
            const url = urljoin(Url.modelURI, '67', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelUpdateRequest.inheritPropertyItem);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelUpdateResponse.inheritPropertyItem);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelUpdateResponse.inheritPropertyItem));
        });
        test('正常 前提：モデル、継承、プロパティinner', async () => {
            // URLを生成
            const url = urljoin(Url.modelURI, '68', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelUpdateRequest.inheritPropertyInner);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelUpdateResponse.inheritPropertyInner);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelUpdateResponse.inheritPropertyInner));
        });
        test('正常 前提：モデル、継承、プロパティnumber[]', async () => {
            // URLを生成
            const url = urljoin(Url.modelURI, '71', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelUpdateRequest.inheritPropertyNumberArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelUpdateResponse.inheritPropertyNumberArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelUpdateResponse.inheritPropertyNumberArray));
        });
        test('正常 前提：モデル、継承、プロパティstring[]', async () => {
            // URLを生成
            const url = urljoin(Url.modelURI, '72', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelUpdateRequest.inheritPropertyStringArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelUpdateResponse.inheritPropertyStringArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelUpdateResponse.inheritPropertyStringArray));
        });
        test('正常 前提：モデル、継承、プロパティboolean[]', async () => {
            // URLを生成
            const url = urljoin(Url.modelURI, '73', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelUpdateRequest.inheritPropertyBooleanArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelUpdateResponse.inheritPropertyBooleanArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelUpdateResponse.inheritPropertyBooleanArray));
        });
        test('正常 前提：モデル、継承、プロパティcode[]', async () => {
            // URLを生成
            const url = urljoin(Url.modelURI, '74', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelUpdateRequest.inheritPropertyCodeArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelUpdateResponse.inheritPropertyCodeArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelUpdateResponse.inheritPropertyCodeArray));
        });
        test('正常 前提：モデル、継承、プロパティitem[]', async () => {
            // URLを生成
            const url = urljoin(Url.modelURI, '75', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelUpdateRequest.inheritPropertyItemArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelUpdateResponse.inheritPropertyItemArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelUpdateResponse.inheritPropertyItemArray));
        });
        test('正常 前提：モデル、継承、プロパティinner[]', async () => {
            // URLを生成
            const url = urljoin(Url.modelURI, '76', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelUpdateRequest.inheritPropertyInnerArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelUpdateResponse.inheritPropertyInnerArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelUpdateResponse.inheritPropertyInnerArray));
        });
        test('正常 前提：モデル、プロパティnumber各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.modelURI, '81', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelUpdateRequest.templatePropertyFullNumber);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelUpdateResponse.templatePropertyFullNumber);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelUpdateResponse.templatePropertyFullNumber));
        });
        test('正常 前提：モデル、プロパティstring各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.modelURI, '82', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelUpdateRequest.templatePropertyFullString);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelUpdateResponse.templatePropertyFullString);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelUpdateResponse.templatePropertyFullString));
        });
        test('正常 前提：モデル、プロパティboolean各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.modelURI, '83', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelUpdateRequest.templatePropertyFullBoolean);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelUpdateResponse.templatePropertyFullBoolean);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelUpdateResponse.templatePropertyFullBoolean));
        });
        test('正常 前提：モデル、プロパティcode各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.modelURI, '84', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelUpdateRequest.templatePropertyFullCode);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelUpdateResponse.templatePropertyFullCode);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelUpdateResponse.templatePropertyFullCode));
        });
        test('正常 前提：モデル、プロパティitem各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.modelURI, '85', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelUpdateRequest.templatePropertyFullItem);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelUpdateResponse.templatePropertyFullItem);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelUpdateResponse.templatePropertyFullItem));
        });
        test('正常 前提：モデル、プロパティinner各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.modelURI, '86', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelUpdateRequest.templatePropertyFullInner);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelUpdateResponse.templatePropertyFullInner);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelUpdateResponse.templatePropertyFullInner));
        });
        test('正常 前提：モデル、プロパティnumber[]各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.modelURI, '91', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelUpdateRequest.templatePropertyFullNumberArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelUpdateResponse.templatePropertyFullNumberArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelUpdateResponse.templatePropertyFullNumberArray));
        });
        test('正常 前提：モデル、プロパティstring[]各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.modelURI, '92', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelUpdateRequest.templatePropertyFullStringArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelUpdateResponse.templatePropertyFullStringArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelUpdateResponse.templatePropertyFullStringArray));
        });
        test('正常 前提：モデル、プロパティboolean[]各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.modelURI, '93', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelUpdateRequest.templatePropertyFullBooleanArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelUpdateResponse.templatePropertyFullBooleanArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelUpdateResponse.templatePropertyFullBooleanArray));
        });
        test('正常 前提：モデル、プロパティcode[]各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.modelURI, '94', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelUpdateRequest.templatePropertyFullCodeArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelUpdateResponse.templatePropertyFullCodeArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelUpdateResponse.templatePropertyFullCodeArray));
        });
        test('正常 前提：モデル、プロパティitem[]各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.modelURI, '95', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelUpdateRequest.templatePropertyFullItemArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelUpdateResponse.templatePropertyFullItemArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelUpdateResponse.templatePropertyFullItemArray));
        });
        test('正常 前提：モデル、プロパティinner[]各種設定', async () => {
            // URLを生成
            const url = urljoin(Url.modelURI, '96', '?versionUpFlag=true');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelUpdateRequest.templatePropertyFullInnerArray);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelUpdateResponse.templatePropertyFullInnerArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelUpdateResponse.templatePropertyFullInnerArray));
        });
        test('正常 前提：versionUpFlag未定義', async () => {
            // URLを生成
            const url = urljoin(Url.modelURI, '96');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogModelUpdateRequest.templatePropertyFullInnerArray2);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogModelUpdateResponse.templatePropertyFullInnerArray2);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogModelUpdateResponse.templatePropertyFullInnerArray2));
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
            const url = urljoin(Url.builtInURI, '1');

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
        test('正常 前提：モデル', async () => {
            // URLを生成
            const url = urljoin(Url.modelURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .delete(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.code).toBe(1);
        });
    });
});
