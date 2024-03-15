/* eslint-disable */
import * as supertest from 'supertest';
import { Application } from '../resources/config/Application';
import Common, { Url } from './Common';
import { Session } from './Session';
import Config from '../common/Config';
import { CatalogHistoryCodeResponse } from './CatalogHistoryCodeResponse';
import urljoin = require('url-join');
/* eslint-enable */
const Message = Config.ReadConfig('./config/message.json');

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
        await common.executeSqlFile('initialCatalogHistoryCode.sql');
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
     * カタログ履歴取得(/history/:code)
     */
    describe('カタログ履歴取得(/history/:code)', () => {
        test('異常:codeが有効範囲外の数値(1より小さい)', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, 'history', '0', '?min=1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].property).toBe('code');
            expect(response.body.reasons[0].message).toBe(Message.validation.min);
        });
        test('異常:codeが有効範囲外の数値(Number.MAX_SAFE_INTEGERより大きい)', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, 'history', (Number.MAX_SAFE_INTEGER + 1).toString(), '?min=1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].property).toBe('code');
            expect(response.body.reasons[0].message).toBe(Message.validation.max);
        });
        test('異常:minが未指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, 'history', '1000001');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('異常:minが有効範囲外の数値(1より小さい)', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, 'history', '1000001', '?min=0');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].property).toBe('min');
            expect(response.body.reasons[0].message).toBe(Message.validation.min);
        });
        test('異常:minが有効範囲外の数値(Number.MAX_SAFE_INTEGERより大きい)', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, 'history', '1000001', '?min=' + (Number.MAX_SAFE_INTEGER + 1).toString());

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].property).toBe('min');
            expect(response.body.reasons[0].message).toBe(Message.validation.max);
        });
        test('異常:minが数値以外', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, 'history', '1000001', '?min=test');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].property).toBe('min');
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('異常:minが取得対象カタログの最新バージョンより大きい', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, 'history', '1000001', '?min=100');

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
        test('異常:maxが有効範囲外の数値(1より小さい)', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, 'history', '1000001', '?min=1&max=0');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].property).toBe('max');
            expect(response.body.reasons[0].message).toBe(Message.validation.min);
        });
        test('異常:maxが有効範囲外の数値(Number.MAX_SAFE_INTEGERより大きい)', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, 'history', '1000001', '?min=1&max=' + (Number.MAX_SAFE_INTEGER + 1).toString());

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].property).toBe('max');
            expect(response.body.reasons[0].message).toBe(Message.validation.max);
        });
        test('異常:maxが数値以外', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, 'history', '1000001', '?min=1&max=test');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].property).toBe('max');
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('異常:maxがminより大きい', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, 'history', '1000001', '?min=2&max=1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.INVALID_VERSION_RANGE);
        });
        test('異常:カタログの存在しないcodeを指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, 'history', '2000001', '?min=1');

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
        test('正常:max未指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, 'history', '1000001', '?min=1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(4);
            expect(response.body[0]).toMatchObject(CatalogHistoryCodeResponse.ext1000001ver1);
            expect(JSON.stringify(response.body[0])).toBe(JSON.stringify(CatalogHistoryCodeResponse.ext1000001ver1));
            expect(response.body[1]).toMatchObject(CatalogHistoryCodeResponse.ext1000001ver2);
            expect(JSON.stringify(response.body[1])).toBe(JSON.stringify(CatalogHistoryCodeResponse.ext1000001ver2));
            expect(response.body[2]).toMatchObject(CatalogHistoryCodeResponse.ext1000001ver4);
            expect(JSON.stringify(response.body[2])).toBe(JSON.stringify(CatalogHistoryCodeResponse.ext1000001ver4));
            expect(response.body[3]).toMatchObject(CatalogHistoryCodeResponse.ext1000001ver5);
            expect(JSON.stringify(response.body[3])).toBe(JSON.stringify(CatalogHistoryCodeResponse.ext1000001ver5));
        });
        test('正常:max指定,maxが取得対象カタログの最新バージョンより小さい', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, 'history', '1000001', '?min=2&max=4');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(2);
            expect(response.body[0]).toMatchObject(CatalogHistoryCodeResponse.ext1000001ver2);
            expect(JSON.stringify(response.body[0])).toBe(JSON.stringify(CatalogHistoryCodeResponse.ext1000001ver2));
            expect(response.body[1]).toMatchObject(CatalogHistoryCodeResponse.ext1000001ver4);
            expect(JSON.stringify(response.body[1])).toBe(JSON.stringify(CatalogHistoryCodeResponse.ext1000001ver4));
        });
        test('正常:max指定,maxが取得対象カタログの最新バージョンより大きい', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, 'history', '1000001', '?min=1&max=100');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(4);
            expect(response.body[0]).toMatchObject(CatalogHistoryCodeResponse.ext1000001ver1);
            expect(JSON.stringify(response.body[0])).toBe(JSON.stringify(CatalogHistoryCodeResponse.ext1000001ver1));
            expect(response.body[1]).toMatchObject(CatalogHistoryCodeResponse.ext1000001ver2);
            expect(JSON.stringify(response.body[1])).toBe(JSON.stringify(CatalogHistoryCodeResponse.ext1000001ver2));
            expect(response.body[2]).toMatchObject(CatalogHistoryCodeResponse.ext1000001ver4);
            expect(JSON.stringify(response.body[2])).toBe(JSON.stringify(CatalogHistoryCodeResponse.ext1000001ver4));
            expect(response.body[3]).toMatchObject(CatalogHistoryCodeResponse.ext1000001ver5);
            expect(JSON.stringify(response.body[3])).toBe(JSON.stringify(CatalogHistoryCodeResponse.ext1000001ver5));
        });
        test('正常:min=max指定', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, 'history', '1000001', '?min=2&max=2');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(1);
            expect(response.body[0]).toMatchObject(CatalogHistoryCodeResponse.ext1000001ver2);
            expect(JSON.stringify(response.body[0])).toBe(JSON.stringify(CatalogHistoryCodeResponse.ext1000001ver2));
        });
        test('異常:min=max指定(論理削除されたバージョンのみの指定)', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, 'history', '1000001', '?min=3&max=3');

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
        test('正常:min=max指定(最小バージョンのみの指定)', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, 'history', '1000001', '?min=1&max=1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(1);
            expect(response.body[0]).toMatchObject(CatalogHistoryCodeResponse.ext1000001ver1);
            expect(JSON.stringify(response.body[0])).toBe(JSON.stringify(CatalogHistoryCodeResponse.ext1000001ver1));
        });
        test('正常:min=max指定(最大バージョンのみの指定)', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, 'history', '1000001', '?min=5&max=5');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(1);
            expect(response.body[0]).toMatchObject(CatalogHistoryCodeResponse.ext1000001ver5);
            expect(JSON.stringify(response.body[0])).toBe(JSON.stringify(CatalogHistoryCodeResponse.ext1000001ver5));
        });
        test('正常:minが論理削除されたカタログのバージョン', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, 'history', '1000001', '?min=3&max=5');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(2);
            expect(response.body[0]).toMatchObject(CatalogHistoryCodeResponse.ext1000001ver4);
            expect(JSON.stringify(response.body[0])).toBe(JSON.stringify(CatalogHistoryCodeResponse.ext1000001ver4));
            expect(response.body[1]).toMatchObject(CatalogHistoryCodeResponse.ext1000001ver5);
            expect(JSON.stringify(response.body[1])).toBe(JSON.stringify(CatalogHistoryCodeResponse.ext1000001ver5));
        });
        test('正常:maxが論理削除されたカタログのバージョン', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, 'history', '1000001', '?min=1&max=3');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(2);
            expect(response.body[0]).toMatchObject(CatalogHistoryCodeResponse.ext1000001ver1);
            expect(JSON.stringify(response.body[0])).toBe(JSON.stringify(CatalogHistoryCodeResponse.ext1000001ver1));
            expect(response.body[1]).toMatchObject(CatalogHistoryCodeResponse.ext1000001ver2);
            expect(JSON.stringify(response.body[1])).toBe(JSON.stringify(CatalogHistoryCodeResponse.ext1000001ver2));
        });
        test('正常:最新バージョンが1のカタログの取得', async () => {
            // URLを生成
            const url = urljoin(Url.baseURI, 'history', '1000002', '?min=1');

            // 対象APIに送信
            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(1);
            expect(response.body[0]).toMatchObject(CatalogHistoryCodeResponse.ext1000002ver1);
            expect(JSON.stringify(response.body[0])).toBe(JSON.stringify(CatalogHistoryCodeResponse.ext1000002ver1));
        });
    });
});
