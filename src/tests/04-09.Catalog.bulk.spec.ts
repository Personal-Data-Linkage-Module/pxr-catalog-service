/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import * as supertest from 'supertest';
import { Application } from '../resources/config/Application';
import Common, { Url } from './Common';
import { Session } from './Session';
import { CatalogBulkRequest } from './CatalogBulkRequest';
import { CatalogBulkResponse } from './CatalogBulkResponse';
import { CatalogBulkNsRequest } from './CatalogBulkNsRequest';
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

        // ネームスペースリクエストファイルを読込
        const nsRequestList = CatalogBulkNsRequest.list;

        // ネームスペースを追加
        for (let index = 0; index < nsRequestList.length; index++) {
            const ns: string = nsRequestList[index]['ns'];
            let type: string = 'model';
            type = ns.indexOf('/model/') < 0 ? type : 'model';
            type = ns.indexOf('/built_in/') < 0 ? type : 'built_in';
            type = ns.indexOf('/ext/') < 0 ? type : 'ext';

            // URLを生成
            const url = urljoin(Url.nsURI, type);

            // 対象APIに送信
            await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(nsRequestList[index]);
        }
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
        // カタログを追加
        for (let index = 0; index < CatalogBulkRequest.list.length; index++) {
            const ns: string = CatalogBulkRequest.list[index]['catalogItem']['ns'];
            let type: string = 'model';
            type = ns.indexOf('/model/') < 0 ? type : 'model';
            type = ns.indexOf('/built_in/') < 0 ? type : 'built_in';
            type = ns.indexOf('/ext/') < 0 ? type : 'ext';

            test('正常 前提：登録 code=' + CatalogBulkRequest.list[index]['catalogItem']['_code']['_value'], async () => {
                // 対象APIに送信
                const response = await supertest(expressApp)
                    .post(urljoin(Url.baseURI, type))
                    .set({ accept: 'application/json' })
                    .set({ session: JSON.stringify(Session.pxrRoot) })
                    .send(CatalogBulkRequest.list[index]);

                // レスポンスチェック
                expect(response.status).toBe(200);
                expect(response.body).toMatchObject(CatalogBulkResponse.list[index]);
                expect(JSON.stringify(response.body)).toBe(JSON.stringify(CatalogBulkResponse.list[index]));
            });
        }
    });
});
