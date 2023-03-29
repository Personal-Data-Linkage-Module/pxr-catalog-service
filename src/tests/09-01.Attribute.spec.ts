/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import * as supertest from 'supertest';
import { Application } from '../resources/config/Application';
import Common, { Url } from './Common';
import { Session } from './Session';
import Config from '../common/Config';
import StubOperatorServer from './StubOperatorServer';
import OperatorDomain from '../domains/OperatorDomain';
const Message = Config.ReadConfig('./config/message.json');
/* eslint-enable */

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
        await common.executeSqlFile('initialCatalogAttribute.sql');
        await common.executeSqlFile('catalogCodeScope.sql');
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
     * 属性変更
     */
    describe('属性変更', () => {
        test('正常', async () => {
            // URLを生成
            const url: string = Url.baseURI + '/attribute';

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    code: 1000811,
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
                                ns: 'catalog/ext/aaa-healthcare-consortium/event/actor_1000438',
                                values: [
                                    {
                                        _value: 124124,
                                        _ver: 1
                                    }
                                ]
                            }
                        ]
                    }
                });

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.attribute).toStrictEqual(
                {
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
                            ns: 'catalog/ext/aaa-healthcare-consortium/event/actor_1000438',
                            values: [
                                {
                                    _value: 124124,
                                    _ver: 1
                                }
                            ]
                        }
                    ]
                }
            );
        });
        test('正常、cookie使用', async () => {
            // スタブサーバー起動
            operatorServer = new StubOperatorServer(200, 3);

            // URLを生成
            const url: string = Url.baseURI + '/attribute';

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send({
                    code: 1000811,
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
                                ns: 'catalog/ext/aaa-healthcare-consortium/event/actor_1000438',
                                values: [
                                    {
                                        _value: 124124,
                                        _ver: 1
                                    }
                                ]
                            }
                        ]
                    }
                });

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.attribute).toStrictEqual(
                {
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
                            ns: 'catalog/ext/aaa-healthcare-consortium/event/actor_1000438',
                            values: [
                                {
                                    _value: 124124,
                                    _ver: 1
                                }
                            ]
                        }
                    ]
                }
            );
        });
        test('パラメータ異常：全体が空', async () => {
            // URLを生成
            const url: string = Url.baseURI + '/attribute';

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUEST_IS_EMPTY);
        });
        test('パラメータ不足：code', async () => {
            // URLを生成
            const url: string = Url.baseURI + '/attribute';

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
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
                                ns: 'catalog/ext/aaa-healthcare-consortium/event/actor_1000438',
                                values: [
                                    {
                                        _value: 124124,
                                        _ver: 1
                                    }
                                ]
                            }
                        ]
                    }
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：code、数値以外', async () => {
            // URLを生成
            const url: string = Url.baseURI + '/attribute';

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    code: 'dummy',
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
                                ns: 'catalog/ext/aaa-healthcare-consortium/event/actor_1000438',
                                values: [
                                    {
                                        _value: 124124,
                                        _ver: 1
                                    }
                                ]
                            }
                        ]
                    }
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ不足：attribute', async () => {
            // URLを生成
            const url: string = Url.baseURI + '/attribute';

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    code: 46
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：attribute.objects、配列以外', async () => {
            // URLを生成
            const url: string = Url.baseURI + '/attribute';

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    code: 46,
                    attribute: {
                        objects: {
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
                        },
                        tags: [
                            {
                                ns: 'catalog/ext/aaa-healthcare-consortium/event/actor_1000438',
                                values: [
                                    {
                                        _value: 124124,
                                        _ver: 1
                                    }
                                ]
                            }
                        ]
                    }
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isArray);
        });
        test('パラメータ不足：atttribute.objects[n].key._value', async () => {
            // URLを生成
            const url: string = Url.baseURI + '/attribute';

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    code: 46,
                    attribute: {
                        objects: [
                            {
                                key: {
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
                                ns: 'catalog/ext/aaa-healthcare-consortium/event/actor_1000438',
                                values: [
                                    {
                                        _value: 124124,
                                        _ver: 1
                                    }
                                ]
                            }
                        ]
                    }
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：atttribute.objects[n].key._value、数値以外', async () => {
            // URLを生成
            const url: string = Url.baseURI + '/attribute';

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    code: 46,
                    attribute: {
                        objects: [
                            {
                                key: {
                                    _value: 'dummy',
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
                                ns: 'catalog/ext/aaa-healthcare-consortium/event/actor_1000438',
                                values: [
                                    {
                                        _value: 124124,
                                        _ver: 1
                                    }
                                ]
                            }
                        ]
                    }
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ不足：atttribute.objects[n].key._ver', async () => {
            // URLを生成
            const url: string = Url.baseURI + '/attribute';

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    code: 46,
                    attribute: {
                        objects: [
                            {
                                key: {
                                    _value: 30004
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
                                ns: 'catalog/ext/aaa-healthcare-consortium/event/actor_1000438',
                                values: [
                                    {
                                        _value: 124124,
                                        _ver: 1
                                    }
                                ]
                            }
                        ]
                    }
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：atttribute.objects[n].key._ver、数値以外', async () => {
            // URLを生成
            const url: string = Url.baseURI + '/attribute';

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    code: 46,
                    attribute: {
                        objects: [
                            {
                                key: {
                                    _value: 30004,
                                    _ver: 'dummy'
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
                                ns: 'catalog/ext/aaa-healthcare-consortium/event/actor_1000438',
                                values: [
                                    {
                                        _value: 124124,
                                        _ver: 1
                                    }
                                ]
                            }
                        ]
                    }
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ不足：atttribute.objects[n].value.company._value', async () => {
            // URLを生成
            const url: string = Url.baseURI + '/attribute';

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    code: 46,
                    attribute: {
                        objects: [
                            {
                                key: {
                                    _value: 30004,
                                    _ver: 1
                                },
                                value: {
                                    company: {
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
                                ns: 'catalog/ext/aaa-healthcare-consortium/event/actor_1000438',
                                values: [
                                    {
                                        _value: 124124,
                                        _ver: 1
                                    }
                                ]
                            }
                        ]
                    }
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：atttribute.objects[n].value.company._value、数値以外', async () => {
            // URLを生成
            const url: string = Url.baseURI + '/attribute';

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    code: 46,
                    attribute: {
                        objects: [
                            {
                                key: {
                                    _value: 30004,
                                    _ver: 1
                                },
                                value: {
                                    company: {
                                        _value: 'dummy',
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
                                ns: 'catalog/ext/aaa-healthcare-consortium/event/actor_1000438',
                                values: [
                                    {
                                        _value: 124124,
                                        _ver: 1
                                    }
                                ]
                            }
                        ]
                    }
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ不足：atttribute.objects[n].value.company._ver', async () => {
            // URLを生成
            const url: string = Url.baseURI + '/attribute';

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    code: 46,
                    attribute: {
                        objects: [
                            {
                                key: {
                                    _value: 30004,
                                    _ver: 1
                                },
                                value: {
                                    company: {
                                        _value: 1000055
                                    },
                                    'manufacturing-name': '鼓膜温センサー',
                                    'model-number': 'C-Temp'
                                },
                                description: 'センサー属性'
                            }
                        ],
                        tags: [
                            {
                                ns: 'catalog/ext/aaa-healthcare-consortium/event/actor_1000438',
                                values: [
                                    {
                                        _value: 124124,
                                        _ver: 1
                                    }
                                ]
                            }
                        ]
                    }
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：atttribute.objects[n].value.company._ver、数値以外', async () => {
            // URLを生成
            const url: string = Url.baseURI + '/attribute';

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    code: 46,
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
                                        _ver: 'dummy'
                                    },
                                    'manufacturing-name': '鼓膜温センサー',
                                    'model-number': 'C-Temp'
                                },
                                description: 'センサー属性'
                            }
                        ],
                        tags: [
                            {
                                ns: 'catalog/ext/aaa-healthcare-consortium/event/actor_1000438',
                                values: [
                                    {
                                        _value: 124124,
                                        _ver: 1
                                    }
                                ]
                            }
                        ]
                    }
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ異常：atttribute.objects[n].value.manufacturing-name、文字列以外', async () => {
            // URLを生成
            const url: string = Url.baseURI + '/attribute';

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    code: 46,
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
                                    'manufacturing-name': ['鼓膜温センサー'],
                                    'model-number': 'C-Temp'
                                },
                                description: 'センサー属性'
                            }
                        ],
                        tags: [
                            {
                                ns: 'catalog/ext/aaa-healthcare-consortium/event/actor_1000438',
                                values: [
                                    {
                                        _value: 124124,
                                        _ver: 1
                                    }
                                ]
                            }
                        ]
                    }
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isString);
        });
        test('パラメータ異常：atttribute.objects[n].value.model-number、文字列以外', async () => {
            // URLを生成
            const url: string = Url.baseURI + '/attribute';

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    code: 46,
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
                                    'model-number': ['C-Temp']
                                },
                                description: 'センサー属性'
                            }
                        ],
                        tags: [
                            {
                                ns: 'catalog/ext/aaa-healthcare-consortium/event/actor_1000438',
                                values: [
                                    {
                                        _value: 124124,
                                        _ver: 1
                                    }
                                ]
                            }
                        ]
                    }
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isString);
        });
        test('パラメータ異常：attribute.tags、配列以外', async () => {
            // URLを生成
            const url: string = Url.baseURI + '/attribute';

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    code: 46,
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
                        tags: {
                            ns: 'catalog/ext/aaa-healthcare-consortium/event/actor_1000438',
                            values: [
                                {
                                    _value: 124124,
                                    _ver: 1
                                }
                            ]
                        }
                    }
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isArray);
        });
        test('パラメータ異常：attribute.tags[n].ns、文字列以外', async () => {
            // URLを生成
            const url: string = Url.baseURI + '/attribute';

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    code: 46,
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
                                ns: ['catalog/ext/aaa-healthcare-consortium/event/actor_1000438'],
                                values: [
                                    {
                                        _value: 124124,
                                        _ver: 1
                                    }
                                ]
                            }
                        ]
                    }
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isString);
        });
        test('パラメータ異常：attribute.tags[n].values、配列以外', async () => {
            // URLを生成
            const url: string = Url.baseURI + '/attribute';

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    code: 46,
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
                                ns: 'catalog/ext/aaa-healthcare-consortium/event/actor_1000438',
                                values: {
                                    _value: 124124,
                                    _ver: 1
                                }
                            }
                        ]
                    }
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isArray);
        });
        test('パラメータ不足：atttribute.tags[n].values[n]._value', async () => {
            // URLを生成
            const url: string = Url.baseURI + '/attribute';

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    code: 46,
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
                                ns: 'catalog/ext/aaa-healthcare-consortium/event/actor_1000438',
                                values: [
                                    {
                                        _ver: 1
                                    }
                                ]
                            }
                        ]
                    }
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：atttribute.tags[n].values[n]._value、数値以外', async () => {
            // URLを生成
            const url: string = Url.baseURI + '/attribute';

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    code: 46,
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
                                ns: 'catalog/ext/aaa-healthcare-consortium/event/actor_1000438',
                                values: [
                                    {
                                        _value: 'dummy',
                                        _ver: 1
                                    }
                                ]
                            }
                        ]
                    }
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ不足：atttribute.tags[n].values[n]._ver', async () => {
            // URLを生成
            const url: string = Url.baseURI + '/attribute';

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    code: 46,
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
                                ns: 'catalog/ext/aaa-healthcare-consortium/event/actor_1000438',
                                values: [
                                    {
                                        _value: 124124
                                    }
                                ]
                            }
                        ]
                    }
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：atttribute.tags[n].values[n]._ver、数値以外', async () => {
            // URLを生成
            const url: string = Url.baseURI + '/attribute';

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    code: 46,
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
                                ns: 'catalog/ext/aaa-healthcare-consortium/event/actor_1000438',
                                values: [
                                    {
                                        _value: 124124,
                                        _ver: 'dummy'
                                    }
                                ]
                            }
                        ]
                    }
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('異常：Cookie使用, 個人', async () => {
            // スタブサーバー起動
            operatorServer = new StubOperatorServer(200, 0);

            // URLを生成
            const url: string = Url.baseURI + '/attribute';

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_PERSONAL_KEY + '=81654181b851542feec3ee0ba3be7695f1472af4702f3aa2a6aa1971c5e3d645'])
                .send({
                    code: 46,
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
                                ns: 'catalog/ext/aaa-healthcare-consortium/event/actor_1000438',
                                values: [
                                    {
                                        _value: 124124,
                                        _ver: 1
                                    }
                                ]
                            }
                        ]
                    }
                });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NO_OPERATION_AUTHORITY);
        });
        test('異常：Cookie使用, アプリケーション', async () => {
            // スタブサーバー起動
            operatorServer = new StubOperatorServer(200, 0);

            // URLを生成
            const url: string = Url.baseURI + '/attribute';

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_APPLICATION_KEY + '=879777267f854aa3fb49993ca2d1488a7ef2ca5c743297ad6f4b155c88c12c16'])
                .send({
                    code: 46,
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
                                ns: 'catalog/ext/aaa-healthcare-consortium/event/actor_1000438',
                                values: [
                                    {
                                        _value: 124124,
                                        _ver: 1
                                    }
                                ]
                            }
                        ]
                    }
                });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NO_OPERATION_AUTHORITY);
        });
        test('異常：Cookieが存在するが空', async () => {
            // スタブサーバー起動
            operatorServer = new StubOperatorServer(200, 3);

            // URLを生成
            const url: string = Url.baseURI + '/attribute';

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + ''])
                .send({
                    code: 46,
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
                                ns: 'catalog/ext/aaa-healthcare-consortium/event/actor_1000438',
                                values: [
                                    {
                                        _value: 124124,
                                        _ver: 1
                                    }
                                ]
                            }
                        ]
                    }
                });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常：Cookie使用、オペレータサービス応答204', async () => {
            // スタブサーバー起動
            operatorServer = new StubOperatorServer(204, 3);

            // URLを生成
            const url: string = Url.baseURI + '/attribute';

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send({
                    code: 30001,
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
                                ns: 'catalog/ext/aaa-healthcare-consortium/event/actor_1000438',
                                values: [
                                    {
                                        _value: 124124,
                                        _ver: 1
                                    }
                                ]
                            }
                        ]
                    }
                });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常：Cookie使用、オペレータサービス応答400系', async () => {
            // スタブサーバー起動
            operatorServer = new StubOperatorServer(400, 3);

            // URLを生成
            const url: string = Url.baseURI + '/attribute';

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send({
                    code: 30001,
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
                                ns: 'catalog/ext/aaa-healthcare-consortium/event/actor_1000438',
                                values: [
                                    {
                                        _value: 124124,
                                        _ver: 1
                                    }
                                ]
                            }
                        ]
                    }
                });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常：Cookie使用、オペレータサービス応答500系', async () => {
            // スタブサーバー起動
            operatorServer = new StubOperatorServer(503, 3);

            // URLを生成
            const url: string = Url.baseURI + '/attribute';

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send({
                    code: 30001,
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
                                ns: 'catalog/ext/aaa-healthcare-consortium/event/actor_1000438',
                                values: [
                                    {
                                        _value: 124124,
                                        _ver: 1
                                    }
                                ]
                            }
                        ]
                    }
                });

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_TAKE_SESSION);
        });
        test('異常：Cookie使用、オペレータサービス未起動', async () => {
            // スタブサーバー起動
            // URLを生成
            const url: string = Url.baseURI + '/attribute';

            // 対象APIに送信
            const response = await supertest(expressApp)
                .put(url)
                .set({ accept: 'application/json' })
                .set('Cookie', [OperatorDomain.TYPE_MANAGER_KEY + '=f4e8797a4f4ed4b0142f25057cfe6e755230a58cc1b1b48ab54da273ef3cd0c4'])
                .send({
                    code: 30001,
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
                                ns: 'catalog/ext/aaa-healthcare-consortium/event/actor_1000438',
                                values: [
                                    {
                                        _value: 124124,
                                        _ver: 1
                                    }
                                ]
                            }
                        ]
                    }
                });

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_OPERATOR);
        });
    });
});
