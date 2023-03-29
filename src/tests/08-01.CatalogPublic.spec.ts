/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import * as supertest from 'supertest';
import { Application } from '../resources/config/Application';
import Common, { Url } from './Common';
import Config from '../common/Config';
const Message = Config.ReadConfig('./config/message.json');
/* eslint-enable */

// 対象アプリケーションを取得
const app = new Application();
const expressApp = app.express.app;
const common = new Common();

// サーバをlisten
app.start();

/**
 * 公開カタログ取得 API
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
        await common.executeSqlString(`
        UPDATE pxr_catalog.catalog SET ext_name = 'aaa-healthcare-consortium'
        WHERE id = '8669de76-5843-4581-b61a-e73b642bf1e0';
        `);
        await common.executeSqlFile('initialCatalogPublic.sql');
    });
    /**
     * 全テスト実行後の処理
     */
    afterAll(async () => {
        app.stop();
    });

    describe('公開カタログ取得 API', () => {
        test('正常（responseが空のcatalog_itemが存在しない）', async () => {
            const url = Url.getCatalogPubilcURI;

            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' });
            expect(response.status).toBe(200);
        });

        test('正常（responseが空のcatalog_itemが存在する）', async () => {
            await common.executeSqlString(`
                INSERT INTO pxr_catalog.catalog_item(id,code,version,ns_id,name,description,inherit_code,inherit_version,is_reserved,is_disabled,response,attributes,created_by,created_at,updated_by,updated_at) VALUES
                (542,1000601,1,312,'高齢者向け健康増進イベント','高齢者向け健康増進イベントの定義です。',46,1,False,False,null,null,'catalog_registrant','2021/11/09 15:18:12.330','catalog_registrant','2021/11/09 15:18:12.330');
            `);
            const url = Url.getCatalogPubilcURI;

            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' });
            expect(response.status).toBe(200);
        });

        test('正常：responseが空のカタログの継承元カタログが存在しない', async () => {
            await common.executeSqlString(`
                UPDATE pxr_catalog.catalog_item SET response = null
                WHERE code = 1000601;
                DELETE FROM pxr_catalog.catalog_item
                WHERE code = 46;
            `);
            const url = Url.getCatalogPubilcURI;

            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' });
            expect(response.status).toBe(200);
        });

        test('異常：カタログがアクティベートされていない', async () => {
            await common.executeSqlString(`
                DELETE FROM pxr_catalog.catalog
            `);
            const url = Url.getCatalogPubilcURI;

            const response = await supertest(expressApp)
                .get(url)
                .set({ accept: 'application/json' });
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_ACTIVATE);
        });
    });
});
