/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import * as supertest from 'supertest';
import { Application } from '../resources/config/Application';
import Common, { Url } from './Common';
import { Session } from './Session';
import { CatalogInnerRequest } from './CataloglnnerRequest';
import { CatalogInnerResponse } from './CatalogInnerResponse';
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
     * 内部クラス取得(/inner/:code/:name)
     */
    describe('内部クラス取得(/inner/:code/:name)', () => {
        test('異常 前提：未アクティベート', async () => {
            // アクティベート解除
            await common.executeSqlString(`
                DELETE FROM pxr_catalog.catalog
            `);

            // URLを生成
            const url = urljoin(Url.innerURI, '1', 'ValueInner');

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
        test('正常 前提：inner', async () => {
            // URLを生成
            const baseUrl = Url.modelURI;

            // 対象APIに送信
            const baseResponse = await supertest(expressApp)
                .post(baseUrl)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogInnerRequest.valueInner);

            // レスポンスチェック
            expect(baseResponse.status).toBe(200);

            // URLを生成
            const url = urljoin(Url.innerURI, '1', 'ValueInner');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogInnerResponse.valueInner);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogInnerResponse.valueInner));
        });
        test('正常 前提：inner[]', async () => {
            // URLを生成
            const baseUrl = Url.modelURI;

            // 対象APIに送信
            const baseResponse = await supertest(expressApp)
                .post(baseUrl)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogInnerRequest.valueInnerArray);

            // レスポンスチェック
            expect(baseResponse.status).toBe(200);

            // URLを生成
            const url = urljoin(Url.innerURI, '2', 'ValueInnerArray');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogInnerResponse.valueInnerArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogInnerResponse.valueInnerArray));
        });
        test('正常 前提：継承カタログ', async () => {
            // URLを生成
            const baseUrl = Url.modelURI;

            // 対象APIに送信
            const baseResponse = await supertest(expressApp)
                .post(baseUrl)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogInnerRequest.inheritPropertyInner);

            // レスポンスチェック
            expect(baseResponse.status).toBe(200);

            // URLを生成
            const url = urljoin(Url.innerURI, '3', 'InheritInner');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogInnerResponse.inheritPropertyInner);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogInnerResponse.inheritPropertyInner));
        });
        test('正常 前提：継承カタログ(プロパティなし)', async () => {
            // URLを生成
            const baseUrl = Url.modelURI;

            // 対象APIに送信
            let baseResponse = await supertest(expressApp)
                .post(baseUrl)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogInnerRequest.minimum);

            // レスポンスチェック
            expect(baseResponse.status).toBe(200);

            // 対象APIに送信
            baseResponse = await supertest(expressApp)
                .post(baseUrl)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogInnerRequest.inheritNonePropertyInner);

            // レスポンスチェック
            expect(baseResponse.status).toBe(200);

            // URLを生成
            const url = urljoin(Url.innerURI, '5', 'InheritInner');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogInnerResponse.inheritNonePropertyInner);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogInnerResponse.inheritNonePropertyInner));
        });
        test('正常 前提：継承カタログ(プロパティなし)', async () => {
            // URLを生成
            const baseUrl = Url.modelURI;

            // 対象APIに送信
            let baseResponse = await supertest(expressApp)
                .post(baseUrl)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogInnerRequest.notFoundPropery);

            // レスポンスチェック
            expect(baseResponse.status).toBe(200);

            // 対象APIに送信
            baseResponse = await supertest(expressApp)
                .post(baseUrl)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogInnerRequest.inheritNonePropertyInner2);

            // レスポンスチェック
            expect(baseResponse.status).toBe(200);

            // URLを生成
            const url = urljoin(Url.innerURI, '7', 'InheritInner');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogInnerResponse.inheritNonePropertyInner2);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogInnerResponse.inheritNonePropertyInner2));
        });
        test('正常 前提：継承カタログ(存在しない型)', async () => {
            // URLを生成
            const baseUrl = Url.modelURI;

            // 対象APIに送信
            let baseResponse = await supertest(expressApp)
                .post(baseUrl)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogInnerRequest.notFoundType);

            // レスポンスチェック
            expect(baseResponse.status).toBe(200);

            // 対象APIに送信
            baseResponse = await supertest(expressApp)
                .post(baseUrl)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogInnerRequest.inheritNotFoundType);

            // レスポンスチェック
            expect(baseResponse.status).toBe(200);

            // URLを生成
            const url = urljoin(Url.innerURI, '9', 'InheritInner');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogInnerResponse.inheritNotFoundType);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogInnerResponse.inheritNotFoundType));
        });
        test('正常 前提：継承カタログ, Cmatrix', async () => {
            // URLを生成
            const baseUrl = Url.modelURI;

            // 対象APIに送信
            const baseResponse1 = await supertest(expressApp)
                .post(baseUrl)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogInnerRequest.inheritCatalog11);

            // レスポンスチェック
            expect(baseResponse1.status).toBe(200);

            // 対象APIに送信
            const baseResponse2 = await supertest(expressApp)
                .post(baseUrl)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogInnerRequest.inheritCatalog12);

            // レスポンスチェック
            expect(baseResponse2.status).toBe(200);
            // データ準備
            await common.executeSqlString(`
                UPDATE pxr_catalog.catalog_item
                SET response = null
                WHERE code = 12
                ;
            `);
            // URLを生成
            const url = urljoin(Url.innerURI, '12', '@value');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogInnerResponse.inheritCatalog12);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogInnerResponse.inheritCatalog12));
        });
        test('正常 前提：継承カタログ, Cmatrix以外', async () => {
            // URLを生成
            const baseUrl = Url.modelURI;

            // 対象APIに送信
            const baseResponse = await supertest(expressApp)
                .post(baseUrl)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(CatalogInnerRequest.inheritNotCmatrix);

            // レスポンスチェック
            expect(baseResponse.status).toBe(200);

            // データ準備
            await common.executeSqlString(`
                UPDATE pxr_catalog.catalog_item
                SET response = null
                WHERE code = 13
                ;
            `);
            // URLを生成
            const url = urljoin(Url.innerURI, '13', '@value');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogInnerResponse.inheritNotCmatrix);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogInnerResponse.inheritNotCmatrix));
        });
        test('異常 前提：存在しないカタログ(コード違い)', async () => {
            // URLを生成
            const url = urljoin(Url.innerURI, '99999', 'ValueInner');

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
        test('異常 前提：存在しないカタログ(内部クラス名違い、item_template取得0件)', async () => {
            // URLを生成
            const url = urljoin(Url.innerURI, '1', 'XXXXX');

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
     * 内部クラス取得(/inner/:code/:version/:name)
     */
    describe('内部クラス取得(/inner/:code/:version/:name)', () => {
        test('異常 前提：未アクティベート', async () => {
            // アクティベート解除
            await common.executeSqlString(`
                DELETE FROM pxr_catalog.catalog
            `);

            // URLを生成
            const url = urljoin(Url.innerURI, '1', '1', 'ValueInner');

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
        test('正常 前提：inner', async () => {
            // URLを生成
            const url = urljoin(Url.innerURI, '1', '1', 'ValueInner');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogInnerResponse.valueInner);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogInnerResponse.valueInner));
        });
        test('正常 前提：inner[]', async () => {
            // URLを生成
            const url = urljoin(Url.innerURI, '2', '1', 'ValueInnerArray');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogInnerResponse.valueInnerArray);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogInnerResponse.valueInnerArray));
        });
        test('正常 前提：継承カタログ', async () => {
            // URLを生成
            const url = urljoin(Url.innerURI, '3', '1', 'InheritInner');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogInnerResponse.inheritPropertyInner);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogInnerResponse.inheritPropertyInner));
        });
        test('正常 前提：継承カタログ(プロパティなし)', async () => {
            // URLを生成
            const url = urljoin(Url.innerURI, '5', '1', 'InheritInner');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogInnerResponse.inheritNonePropertyInner);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogInnerResponse.inheritNonePropertyInner));
        });
        test('正常 前提：継承カタログ(プロパティなし)', async () => {
            // URLを生成
            const url = urljoin(Url.innerURI, '7', 'InheritInner');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogInnerResponse.inheritNonePropertyInner2);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogInnerResponse.inheritNonePropertyInner2));
        });
        test('正常 前提：継承カタログ(存在しない型)', async () => {
            // URLを生成
            const url = urljoin(Url.innerURI, '9', '1', 'InheritInner');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(CatalogInnerResponse.inheritNotFoundType);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogInnerResponse.inheritNotFoundType));
        });
        test('異常 前提：存在しないカタログ(コード違い)', async () => {
            // URLを生成
            const url = urljoin(Url.innerURI, '99999', '1', 'ValueInner');

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
        test('異常 前提：存在しないカタログ(内部クラス名違い)', async () => {
            // URLを生成
            const url = urljoin(Url.innerURI, '1', '1', 'XXXXX');

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
});
