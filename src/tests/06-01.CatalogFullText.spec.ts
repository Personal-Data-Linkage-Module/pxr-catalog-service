/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import * as supertest from 'supertest';
import { Application } from '../resources/config/Application';
import Common, { Url } from './Common';
import { Session } from './Session';
import StubOperatorServer from './StubOperatorServer';
import StubCloudSearchServer from './StubCloudSearchServer';
import OperatorDomain from '../domains/OperatorDomain';
import Config from '../common/Config';
// import { CatalogModelRequest } from './CatalogModelRequest';
const Message = Config.ReadConfig('./config/message.json');

// CloudSearchServiceに繋ぐurlのモック化(endpoint -> localhost:3011)
jest.mock('../common/Config', () => ({
    ...jest.requireActual('../common/Config'),
    default: {
        ReadConfig: jest.fn((path: string) => {
            const fs = require('fs');
            if (path === './config/config.json') {
                return {
                    code_scope: [
                        {
                            type: 'model',
                            start_code: 1,
                            end_code: 10000
                        },
                        {
                            type: 'built_in',
                            start_code: 10001,
                            end_code: 1000000
                        },
                        {
                            type: 'ext',
                            start_code: 1000001,
                            end_code: 10000000
                        }
                    ],
                    publicCodes: [
                        30001,
                        30007,
                        30009,
                        30019,
                        30020,
                        30021,
                        30035,
                        30036,
                        30037,
                        30038,
                        1000371,
                        1000372,
                        1000373,
                        1000374
                    ],
                    publicNss: [
                        'catalog/ext/{ext_name}/category/share/service',
                        'catalog/ext/{ext_name}/setting/global',
                        'catalog/ext/{ext_name}/actor/pxr-root',
                        'catalog/ext/{ext_name}/actor/region-root',
                        'catalog/ext/{ext_name}/actor/app',
                        'catalog/ext/{ext_name}/actor/wf',
                        'catalog/ext/{ext_name}/actor/region-root/actor_%/region',
                        'catalog/ext/{ext_name}/actor/app/actor_%/application',
                        'catalog/ext/{ext_name}/actor/wf/actor_%/workflow',
                        'catalog/ext/{ext_name}/terms-of-use/platform',
                        'catalog/ext/{ext_name}/terms-of-use/region/actor_%'
                    ],
                    timezone: 'Asia/Tokyo',
                    cloud_search: {
                        post_url: 'http://{endpoint}/{authcode}/documents/batch',
                        get_url: 'http://{endpoint}/{authcode}/search',
                        endpoint: 'localhost:3011',
                        authcode: '2013-01-01',
                        size: 100,
                        isUpdate: false
                    },
                    corePerThread: 1
                };
            } else {
                return JSON.parse(fs.readFileSync(path, 'UTF-8'));
            }
        })
    }
}));

// 対象アプリケーションを取得
const app = new Application();
const expressApp = app.express.app;
const common = new Common();

// スタブサービスの宣言
let operatorServer: StubOperatorServer = null;
let cloudSearchServer: StubCloudSearchServer = null;

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
        await common.executeSqlFile('initialFullTextData.sql');
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
        if (cloudSearchServer) {
            cloudSearchServer._server.close();
            cloudSearchServer._server = null;
            cloudSearchServer = null;
        }
    });

    /**
     * カタログ全文検索
     */
    describe('カタログ全文検索', () => {
        test('異常 前提：未アクティベート', async () => {
            // アクティベート解除
            await common.executeSqlString(`
                DELETE FROM pxr_catalog.catalog
            `);

            // URLを生成
            const url = Url.textURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    keyword: 'アクター',
                    namespace: [
                        'catalog/model/unit-test'
                    ],
                    attribute: [
                        {
                            _value: 10,
                            _ver: 1
                        }
                    ]
                });

            // アクティベート
            await common.executeSqlFile('activate.sql');

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_ACTIVATE);
        });
        test('正常 前提：なし', async () => {
            // スタブサービス起動
            cloudSearchServer = new StubCloudSearchServer(200, 3011);
            // URLを生成
            const url = Url.textURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    keyword: 'アクター',
                    namespace: null,
                    attribute: null
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
        });
        test('正常 前提：該当データなし', async () => {
            // スタブサービス起動
            cloudSearchServer = new StubCloudSearchServer(200, 3011);
            // URLを生成
            const url = Url.textURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    keyword: 'XXXXX',
                    namespace: [
                        'XXXXX'
                    ],
                    attribute: [{
                        objects: [
                            {
                                key: {
                                    _value: 1000,
                                    _ver: 1
                                },
                                value: {}
                            },
                            {
                                key: {
                                    _value: 100,
                                    _ver: 1
                                },
                                value: {}
                            }
                        ]
                    }]
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
        });
        test('正常 前提：keyword指定なし、ns指定あり', async () => {
            // スタブサービス起動
            cloudSearchServer = new StubCloudSearchServer(200, 3011);
            // URLを生成
            const url = Url.textURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    keyword: null,
                    namespace: ['catalog/model/unit-test'],
                    attribute: null
                });

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(1);
        });
        test('正常 前提：keyword指定なし、attribute指定あり', async () => {
            // スタブサービス起動
            cloudSearchServer = new StubCloudSearchServer(200, 3011);
            // URLを生成
            const url = Url.textURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    keyword: null,
                    namespace: null,
                    attribute: [{
                        objects: [
                            {
                                key: {
                                    _value: 100001,
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
                        ]
                    }]
                });

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(1);
        });
        test('正常 前提：keyword指定なし、namespace指定なし', async () => {
            // スタブサービス起動
            cloudSearchServer = new StubCloudSearchServer(200, 3011);
            // URLを生成
            const url = Url.textURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    keyword: null,
                    namespace: [],
                    attribute: [{
                        tags: [
                            {
                                ns: 'catalog/model/unit-test',
                                values: [
                                    {
                                        _value: 124124,
                                        _ver: 1
                                    }
                                ]
                            }
                        ]
                    }]
                });

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(1);
        });
        test('正常 前提：keyword指定あり、namespace指定なし', async () => {
            // スタブサービス起動
            cloudSearchServer = new StubCloudSearchServer(200, 3011);
            // URLを生成
            const url = Url.textURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    keyword: 'アクター',
                    namespace: [],
                    attribute: [{
                        tags: [
                            {
                                ns: 'catalog/model/unit-test',
                                values: [
                                    {
                                        _value: 124124,
                                        _ver: 1
                                    }
                                ]
                            }
                        ]
                    }]
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
        });
        test('正常 前提：attribute指定なし', async () => {
            // スタブサービス起動
            cloudSearchServer = new StubCloudSearchServer(200, 3011);
            // URLを生成
            const url = Url.textURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    keyword: 'アクター',
                    namespace: [
                        'catalog/model/unit-test'
                    ],
                    attribute: null
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
        });
        test('正常 前提：Cookie(個人メンバー)', async () => {
            // カタログコード範囲削除
            await common.executeSqlString(`
                DELETE FROM pxr_catalog.catalog_code_scope;
                SELECT SETVAL('pxr_catalog.catalog_code_scope_id_seq', 1, false);
            `);

            // スタブサービス起動
            cloudSearchServer = new StubCloudSearchServer(200, 3011);
            operatorServer = new StubOperatorServer(200, 0);

            // URLを生成
            const url = Url.textURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_PERSONAL_KEY + '=81654181b851542feec3ee0ba3be7695f1472af4702f3aa2a6aa1971c5e3d645'])
                .send({
                    keyword: 'アクター',
                    namespace: [
                        'catalog/model/unit-test'
                    ],
                    attribute: [{
                        objects: [
                            {
                                key: {
                                    _value: 100001,
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
                        ]
                    }]
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
        });
        test('正常 前提：Cookie(アプリケーションメンバー)', async () => {
            // スタブサービス起動
            cloudSearchServer = new StubCloudSearchServer(200, 3011);
            operatorServer = new StubOperatorServer(200, 1);

            // URLを生成
            const url = Url.textURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_APPLICATION_KEY + '=879777267f854aa3fb49993ca2d1488a7ef2ca5c743297ad6f4b155c88c12c16'])
                .send({
                    keyword: 'アクター',
                    namespace: [
                        'catalog/model/unit-test'
                    ],
                    attribute: [{
                        objects: [
                            {
                                key: {
                                    _value: 100001,
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
                        ]
                    }]
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
        });
        test('正常 前提：Cookie(運営メンバー)', async () => {
            // スタブサービス起動
            cloudSearchServer = new StubCloudSearchServer(200, 3011);
            operatorServer = new StubOperatorServer(200, 3);

            // URLを生成
            const url = Url.textURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send({
                    keyword: 'アクター',
                    namespace: [
                        'catalog/model/unit-test'
                    ],
                    attribute: [{
                        objects: [
                            {
                                key: {
                                    _value: 100001,
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
                        ]
                    }]
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
        });
        test('正常 前提：keyword指定とns指定, attribute指定の結果がそれぞれ複数存在する(分岐網羅用テスト)', async () => {
            // スタブサービス起動
            cloudSearchServer = new StubCloudSearchServer(200, 3011);
            operatorServer = new StubOperatorServer(200, 0);

            // URLを生成
            const url = Url.textURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_PERSONAL_KEY + '=81654181b851542feec3ee0ba3be7695f1472af4702f3aa2a6aa1971c5e3d645'])
                .send({
                    keyword: 'actorCmatrix',
                    namespace: [
                        'catalog/model/unit-test',
                        'catalog/model/cmatrix/unit-test',
                        'catalog/built_in/unit-test'
                    ],
                    attribute: [{
                        objects: [
                            {
                                key: {
                                    _value: 100001,
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
                            },
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
                        ]
                    }]
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
        });
        test('異常 前提：keyword, ns, attribute指定時にnsがkeyword検索結果と不一致 (分岐網羅)', async () => {
            // スタブサービス起動
            cloudSearchServer = new StubCloudSearchServer(200, 3011);
            operatorServer = new StubOperatorServer(200, 0);

            // URLを生成
            const url = Url.textURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_PERSONAL_KEY + '=81654181b851542feec3ee0ba3be7695f1472af4702f3aa2a6aa1971c5e3d645'])
                .send({
                    keyword: 'アクター',
                    namespace: [
                        'catalog/model/cmatrix/unit-test'
                    ],
                    attribute: [{
                        objects: [
                            {
                                key: {
                                    _value: 100001,
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
                        ]
                    }]
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
        });
        test('異常 前提：Cookie(空)', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(200, 3);

            // URLを生成
            const url = Url.textURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set('Cookie', null)
                .send({
                    keyword: 'model',
                    namespace: ['catalog/model/unit-test'],
                    attribute: [
                        {
                            _value: 1,
                            _ver: 1
                        }
                    ]
                });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常 前提：Cookie、オペレータサービス接続失敗', async () => {
            // URLを生成
            const url = Url.textURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send({
                    keyword: 'model',
                    namespace: ['catalog/model/unit-test'],
                    attribute: [
                        {
                            _value: 1,
                            _ver: 1
                        }
                    ]
                });

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_OPERATOR);
        });
        test('異常 前提：Cookie、オペレータサービス応答204', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(204, 3);

            // URLを生成
            const url = Url.textURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send({
                    keyword: 'model',
                    namespace: ['catalog/model/unit-test'],
                    attribute: [
                        {
                            _value: 1,
                            _ver: 1
                        }
                    ]
                });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常 前提：Cookie、オペレータサービス応答400', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(400, 3);

            // URLを生成
            const url = Url.textURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send({
                    keyword: 'model',
                    namespace: ['catalog/model/unit-test'],
                    attribute: [
                        {
                            _value: 1,
                            _ver: 1
                        }
                    ]
                });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常 前提：Cookie、オペレータサービス応答500', async () => {
            // オペレータサービス起動
            operatorServer = new StubOperatorServer(500, 3);

            // URLを生成
            const url = Url.textURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send({
                    keyword: 'model',
                    namespace: ['catalog/model/unit-test'],
                    attribute: [
                        {
                            _value: 1,
                            _ver: 1
                        }
                    ]
                });

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_TAKE_SESSION);
        });
        test('異常 前提：セッションなし', async () => {
            // URLを生成
            const url = Url.textURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .send({
                    keyword: 'model',
                    namespace: ['catalog/model/unit-test'],
                    attribute: [
                        {
                            _value: 1,
                            _ver: 1
                        }
                    ]
                });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('正常 前提：attribute指定、_valueのみで検索(objects[n].key._valueと一致)', async () => {
            // スタブサービス起動
            cloudSearchServer = new StubCloudSearchServer(200, 3011);
            // URLを生成
            const url = Url.textURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    keyword: null,
                    namespace: null,
                    attribute: [{
                        _value: 100001
                    },
                    // _value以外のプロパティがある場合は無視
                    {
                        value: 124124
                    }]
                });

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(2);
        });
        test('正常 前提：attribute指定、_valueのみで検索(tags[n].values[n]._valueと一致)', async () => {
            // スタブサービス起動
            cloudSearchServer = new StubCloudSearchServer(200, 3011);
            // URLを生成
            const url = Url.textURI;

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    keyword: null,
                    namespace: null,
                    attribute: [{
                        _value: 124124
                    }]
                });

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(1);
        });
    });
});
