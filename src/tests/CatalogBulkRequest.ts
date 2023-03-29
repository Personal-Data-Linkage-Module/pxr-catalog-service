/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/**
 * カタログリクエスト
 */
export namespace CatalogBulkRequest {
    export const list: {}[] =
    [
        {
            catalogItem: {
                ns: 'catalog/model/format',
                name: 'GPGGA形式',
                description: '位置の値フォーマット（$GPGGA,m1,m2,c1,m3,c2,d1,d2,f1,f2,M,f3,M,f4,d3*cc形式）の定義です。',
                _code: {
                    _value: 1,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/purpose',
                name: '利用目的',
                description: '提供先のアクターが提供されたデータを利用する目的のカテゴリの定義です。',
                _code: {
                    _value: 3,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: 'statement',
                        type: {
                            of: 'item',
                            _code: null,
                            candidate: {
                                ns: null,
                                _code: [
                                    {
                                        _value: 61,
                                        _ver: 1
                                    }
                                ],
                                base: null
                            }
                        },
                        description: '組織ステートメント'
                    }
                ],
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/data-supply-contract/condition',
                name: '対象者の選択条件',
                description: 'データ提供対象者の選択条件の定義です。値が一致した個人属性情報を持つ個人を対象者とします。',
                _code: {
                    _value: 4,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: 'item-type',
                        type: {
                            of: 'code',
                            candidate: {
                                ns: [
                                    'catalog/model/person/item-type',
                                    'catalog/built_in/person/item-type',
                                    'catalog/ext/{ext_name}/person/item-type'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: '条件となる個人属性情報カタログコード'
                    },
                    {
                        key: 'target',
                        type: {
                            of: 'code',
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '対象条件'
                    }
                ],
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/format',
                name: 'yyyyMMdd形式',
                description: '時刻の値フォーマット（yyyyMMdd形式）の定義です。',
                _code: {
                    _value: 5,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/format',
                name: 'yyyyMMddTHHmmss.SSSZ形式',
                description: '時刻の値フォーマット（yyyyMMddTHHmmss.SSSZ形式）の定義です。',
                _code: {
                    _value: 6,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/qualitative/gender',
                name: '女',
                description: '性別の候補値（女）の定義です。',
                _code: {
                    _value: 7,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/qualitative/gender',
                name: '男',
                description: '性別の候補値（男）の定義です。',
                _code: {
                    _value: 8,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/qualitative/relation/trust',
                name: '信託元',
                description: 'My-Condition-Bookの管理に関する信託関係の候補値（信託元、受益人）の定義です。',
                _code: {
                    _value: 9,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/qualitative/relation/trust',
                name: '信託先',
                description: 'My-Condition-Bookの管理に関する信託関係の候補値（信託先、被信託人）の定義です。',
                _code: {
                    _value: 10,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/cmatrix/1',
                name: '個人識別子列',
                description: 'CMatrixの個人識別子列の定義です。',
                _code: {
                    _value: 11,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: '@value',
                        type: {
                            of: 'string',
                            cmatrix: {
                                index: '1_1',
                                reserved: true
                            },
                            format: null,
                            unit: null,
                            candidate: null
                        }
                    }
                ],
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/cmatrix/2',
                name: '生年月日列',
                description: 'CMatrixの生年月日列の定義です。',
                _code: {
                    _value: 12,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: '@value',
                        type: {
                            of: 'string',
                            cmatrix: {
                                index: '1_2',
                                reserved: true
                            },
                            format: {
                                _value: 5,
                                _ver: 1
                            },
                            unit: null,
                            candidate: null
                        }
                    }
                ],
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/cmatrix/1',
                name: '性別列',
                description: 'CMatrixの性別列の定義です。',
                _code: {
                    _value: 13,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: '@value',
                        type: {
                            of: 'code',
                            cmatrix: {
                                index: '1_3',
                                reserved: true
                            },
                            _code: null,
                            candidate: {
                                ns: [
                                    'catalog/model/qualitative/gender'
                                ],
                                _code: null
                            }
                        }
                    }
                ],
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/cmatrix/2/1',
                name: 'ドキュメント識別子列',
                description: 'CMatrixのドキュメント識別子列の定義です。',
                _code: {
                    _value: 14,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: '@value',
                        type: {
                            of: 'string',
                            cmatrix: {
                                index: '2_1_1',
                                reserved: true
                            },
                            format: null,
                            unit: null,
                            candidate: null
                        }
                    }
                ],
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/cmatrix/2/1',
                name: 'ドキュメント種別コード列',
                description: 'CMatrixのドキュメント種別列の定義です。',
                _code: {
                    _value: 15,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: '@value',
                        type: {
                            of: 'code',
                            cmatrix: {
                                index: '2_1_2',
                                reserved: true
                            },
                            _code: null,
                            candidate: null
                        }
                    }
                ],
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/cmatrix/2/2',
                name: 'ドキュメント作成時刻列',
                description: 'CMatrixのドキュメント作成時刻列の定義です。',
                _code: {
                    _value: 16,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: '@value',
                        type: {
                            of: 'string',
                            cmatrix: {
                                index: '2_2_1',
                                reserved: true
                            },
                            format: {
                                _value: 6,
                                _ver: 1
                            },
                            unit: null,
                            candidate: null
                        }
                    }
                ],
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/cmatrix/3/1',
                name: 'イベント識別子列',
                description: 'CMatrixのイベント識別子列の定義です。',
                _code: {
                    _value: 17,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: '@value',
                        type: {
                            of: 'string',
                            cmatrix: {
                                index: '3_1_1',
                                reserved: true
                            },
                            format: null,
                            unit: null,
                            candidate: null
                        }
                    }
                ],
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/cmatrix/3/1',
                name: 'イベント種別コード列',
                description: 'CMatrixのイベント種別列の定義です。',
                _code: {
                    _value: 18,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: '@value',
                        type: {
                            of: 'code',
                            cmatrix: {
                                index: '3_1_2',
                                reserved: true
                            },
                            _code: null,
                            candidate: null
                        }
                    }
                ],
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/cmatrix/3/2',
                name: 'イベントの開始時刻列',
                description: 'CMatrixのイベントの開始時刻列の定義です。',
                _code: {
                    _value: 19,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: '@value',
                        type: {
                            of: 'string',
                            cmatrix: {
                                index: '3_2_1',
                                reserved: true
                            },
                            format: {
                                _value: 6,
                                _ver: 1
                            },
                            unit: null,
                            candidate: null
                        }
                    }
                ],
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/cmatrix/3/2',
                name: 'イベントの終了時刻列',
                description: 'CMatrixのイベントの終了時刻列の定義です。',
                _code: {
                    _value: 20,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: '@value',
                        type: {
                            of: 'string',
                            cmatrix: {
                                index: '3_2_2',
                                reserved: true
                            },
                            format: {
                                _value: 6,
                                _ver: 1
                            },
                            unit: null,
                            candidate: null
                        }
                    }
                ],
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/cmatrix/3/3',
                name: 'イベント発生位置列',
                description: 'CMatrixのイベント発生位置列の定義です。',
                _code: {
                    _value: 21,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: '@value',
                        type: {
                            of: 'string',
                            cmatrix: {
                                index: '3_3_1',
                                reserved: true
                            },
                            format: {
                                _value: 1,
                                _ver: 1
                            },
                            unit: null,
                            candidate: null
                        }
                    }
                ],
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/cmatrix/3/5',
                name: 'イベントを発生させたアクター識別子列',
                description: 'CMatrixのイベントを発生させたアクター識別子列の定義です。',
                _code: {
                    _value: 22,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: '@value',
                        type: {
                            of: 'code',
                            cmatrix: {
                                index: '3_5_1',
                                reserved: true
                            },
                            _code: null,
                            candidate: null
                        }
                    }
                ],
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/cmatrix/3/5',
                name: 'ワークフロー識別子列',
                description: 'CMatrixのワークフロー識別子列の定義です。',
                _code: {
                    _value: 23,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: '@value',
                        type: {
                            of: 'code',
                            cmatrix: {
                                index: '3_5_2',
                                reserved: true
                            },
                            _code: null,
                            candidate: null
                        }
                    }
                ],
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/cmatrix/3/5',
                name: 'ワークフローロール識別子列',
                description: 'CMatrixのワークフローロール識別子列の定義です。',
                _code: {
                    _value: 24,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: '@value',
                        type: {
                            of: 'code',
                            cmatrix: {
                                index: '3_5_3',
                                reserved: true
                            },
                            _code: null,
                            candidate: null
                        }
                    }
                ],
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/cmatrix/3/5',
                name: 'ワークフロー職員識別子列',
                description: 'CMatrixのワークフロー職員識別子列の定義です。',
                _code: {
                    _value: 25,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: '@value',
                        type: {
                            of: 'string',
                            cmatrix: {
                                index: '3_5_4',
                                reserved: true
                            },
                            format: null,
                            unit: null,
                            candidate: null
                        }
                    }
                ],
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/cmatrix/3/5',
                name: 'アプリケーション識別子列',
                description: 'CMatrixのアプリケーション識別子列の定義です。',
                _code: {
                    _value: 26,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: '@value',
                        type: {
                            of: 'code',
                            cmatrix: {
                                index: '3_5_5',
                                reserved: true
                            },
                            _code: null,
                            candidate: null
                        }
                    }
                ],
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/cmatrix/4/1',
                name: 'モノ識別子列',
                description: 'CMatrixのモノ識別子列の定義です。',
                _code: {
                    _value: 27,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: '@value',
                        type: {
                            of: 'string',
                            cmatrix: {
                                index: '4_1_1',
                                reserved: true
                            },
                            format: null,
                            unit: null,
                            candidate: null
                        }
                    }
                ],
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/cmatrix/4/1',
                name: 'モノ種別コード列',
                description: 'CMatrixのモノ種別列の定義です。',
                _code: {
                    _value: 28,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: '@value',
                        type: {
                            of: 'code',
                            cmatrix: {
                                index: '4_1_2',
                                reserved: true
                            },
                            _code: null,
                            candidate: null
                        }
                    }
                ],
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/block',
                name: 'PXR-Block',
                description: 'PXR-Blockの定義です。',
                _code: {
                    _value: 29,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: 'id',
                        type: {
                            of: 'string',
                            format: null,
                            unit: null
                        },
                        description: 'PXR-Block識別子'
                    },
                    {
                        key: 'assigned-organization',
                        type: {
                            of: 'string',
                            format: null,
                            unit: null
                        },
                        description: '割当アクター名'
                    },
                    {
                        key: 'base-url',
                        type: {
                            of: 'string',
                            format: null,
                            unit: null
                        },
                        description: 'PXR-BlockのベースURL'
                    },
                    {
                        key: 'service-name',
                        type: {
                            of: 'string',
                            format: null,
                            unit: null
                        },
                        description: 'PXR-Blockのサービス名'
                    },
                    {
                        key: 'actor-type',
                        type: {
                            of: 'string',
                            format: null,
                            unit: null,
                            candidate: {
                                value: [
                                    'pxr-root',
                                    'region-root',
                                    'app',
                                    'wf',
                                    'data-trader',
                                    'consumer'
                                ]
                            }
                        },
                        description: 'このPXR-Blockを保有する組織の種別'
                    },
                    {
                        key: 'assignment-status',
                        type: {
                            of: 'string',
                            format: null,
                            unit: null,
                            candidate: {
                                value: [
                                    'assigned',
                                    'unassigned'
                                ]
                            }
                        },
                        description: '割当状態'
                    },
                    {
                        key: 'first-login-url',
                        type: {
                            of: 'string',
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '初回ログインURL'
                    },
                    {
                        key: 'pxr-portal-first-login-url',
                        type: {
                            of: 'string',
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '個人向けポータル初回ログインURL'
                    }
                ],
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/block/app',
                name: 'APP-Block',
                description: 'アプリケーションプロバイダー用PXR-Blockの定義です。',
                _code: {
                    _value: 30,
                    _ver: null
                },
                inherit: {
                    _value: 29,
                    _ver: null
                }
            },
            template: {
                prop: null,
                value: [
                    {
                        key: 'actor-type',
                        value: 'app'
                    },
                    {
                        key: 'assignment-status',
                        value: 'unassigned'
                    }
                ]
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/block/consumer',
                name: 'Consumer-Block',
                description: 'データコンシューマー用PXR-Blockの定義です。',
                _code: {
                    _value: 31,
                    _ver: null
                },
                inherit: {
                    _value: 29,
                    _ver: null
                }
            },
            template: {
                prop: null,
                value: [
                    {
                        key: 'actor-type',
                        value: 'consumer'
                    },
                    {
                        key: 'assignment-status',
                        value: 'unassigned'
                    }
                ]
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/block/data-trader',
                name: 'Data-Trader-Block',
                description: 'データ取引サービスプロバイダー用PXR-Blockの定義です。',
                _code: {
                    _value: 32,
                    _ver: null
                },
                inherit: {
                    _value: 29,
                    _ver: null
                }
            },
            template: {
                prop: null,
                value: [
                    {
                        key: 'actor-type',
                        value: 'data-trader'
                    },
                    {
                        key: 'assignment-status',
                        value: 'unassigned'
                    }
                ]
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/block/pxr-root',
                name: 'PXR-Root-Block',
                description: '流通制御サービスプロバイダー用PXR-Blockの定義です。',
                _code: {
                    _value: 33,
                    _ver: null
                },
                inherit: {
                    _value: 29,
                    _ver: null
                }
            },
            template: {
                prop: null,
                value: [
                    {
                        key: 'actor-type',
                        value: 'pxr-root'
                    },
                    {
                        key: 'assignment-status',
                        value: 'unassigned'
                    }
                ]
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/block/region-root',
                name: 'Region-Root-Block',
                description: '領域運営サービスプロバイダー用PXR-Blockの定義です。',
                _code: {
                    _value: 34,
                    _ver: null
                },
                inherit: {
                    _value: 29,
                    _ver: null
                }
            },
            template: {
                prop: null,
                value: [
                    {
                        key: 'actor-type',
                        value: 'region-root'
                    },
                    {
                        key: 'assignment-status',
                        value: 'unassigned'
                    }
                ]
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/block/wf',
                name: 'WF-Block',
                description: 'ワークフロープロバイダー用PXR-Blockの定義です。',
                _code: {
                    _value: 35,
                    _ver: null
                },
                inherit: {
                    _value: 29,
                    _ver: null
                }
            },
            template: {
                prop: null,
                value: [
                    {
                        key: 'actor-type',
                        value: 'wf'
                    },
                    {
                        key: 'assignment-status',
                        value: 'unassigned'
                    }
                ]
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/actor',
                name: 'アクター',
                description: 'PXRエコシステム上で活動するアクターの定義です。（個人を除く）',
                _code: {
                    _value: 36,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: 'main-block',
                        type: {
                            of: 'code',
                            _code: null,
                            candidate: {
                                ns: null,
                                _code: null,
                                base: {
                                    _value: 29,
                                    _ver: null
                                }
                            }
                        },
                        description: 'アクター参加時に割り当てられたPXR-Block'
                    },
                    {
                        key: 'other-block',
                        type: {
                            of: 'code[]',
                            _code: null,
                            candidate: {
                                ns: null,
                                _code: null,
                                base: {
                                    _value: 29,
                                    _ver: null
                                }
                            }
                        },
                        description: '他アクターから引き継いだPXR-Blockの配列'
                    },
                    {
                        key: 'statement',
                        type: {
                            of: 'item[]',
                            _code: null,
                            candidate: {
                                ns: null,
                                _code: [
                                    {
                                        _value: 61,
                                        _ver: 1
                                    }
                                ],
                                base: null
                            }
                        },
                        description: '組織ステートメント'
                    },
                    {
                        key: 'status',
                        type: {
                            of: 'inner[]',
                            inner: 'CertStatus'
                        },
                        description: '認定の履歴'
                    },
                    {
                        key: 'category',
                        type: {
                            of: 'code[]',
                            _code: null,
                            candidate: {
                                ns: [
                                    'catalog/model/category/share/actor',
                                    'catalog/built_in/category/share/actor',
                                    'catalog/ext/{ext_name}/category/share/actor',
                                    'catalog/model/category/supply/actor',
                                    'catalog/built_in/category/supply/actor',
                                    'catalog/ext/{ext_name}/category/supply/actor'
                                ],
                                _code: null,
                                base: null
                            },
                            description: 'アクターカテゴリー'
                        }
                    },
                    {
                        key: 'breakaway-flg',
                        type: {
                            of: 'boolean'
                        },
                        description: '離脱フラグ'
                    },
                    {
                        key: 'information-site',
                        type: {
                            of: 'string',
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '情報サイト'
                    }
                ],
                value: [
                    {
                        key: 'breakaway-flg',
                        value: false
                    }
                ]
            },
            inner: [
                {
                    name: 'CertStatus',
                    description: '認定状態',
                    template: {
                        inherit: null,
                        prop: [
                            {
                                key: 'status',
                                type: {
                                    of: 'string',
                                    format: null,
                                    unit: null,
                                    candidate: {
                                        value: [
                                            'certified',
                                            'rejected',
                                            'recalled'
                                        ]
                                    }
                                },
                                description: '認定状態'
                            },
                            {
                                key: 'by',
                                type: {
                                    of: 'code',
                                    _code: null,
                                    candidate: {
                                        ns: null,
                                        _code: null,
                                        base: {
                                            _value: 36,
                                            _ver: 1
                                        }
                                    }
                                },
                                description: '認定した組織'
                            },
                            {
                                key: 'at',
                                type: {
                                    of: 'string',
                                    format: {
                                        _value: 6,
                                        _ver: 1
                                    },
                                    unit: null
                                },
                                description: '認定した時刻'
                            }
                        ]
                    },
                    inner: null
                }
            ],
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/actor/consumer',
                name: 'データコンシューマー',
                description: 'データコンシューマーの定義です。',
                _code: {
                    _value: 37,
                    _ver: null
                },
                inherit: {
                    _value: 36,
                    _ver: 1
                }
            },
            template: {
                prop: [
                    {
                        key: 'trader-alliance',
                        type: {
                            of: 'code[]',
                            _code: null,
                            candidate: {
                                ns: null,
                                _code: null,
                                base: {
                                    _value: 38,
                                    _ver: 1
                                }
                            }
                        },
                        description: '提携するデータ取引サービスプロバイダーのコード配列'
                    }
                ],
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/actor/data-trader',
                name: 'データ取引サービスプロバイダー',
                description: 'データ取引サービスプロバイダーの定義です。',
                _code: {
                    _value: 38,
                    _ver: null
                },
                inherit: {
                    _value: 36,
                    _ver: 1
                }
            },
            template: {
                prop: [
                    {
                        key: 'region-root-alliance',
                        type: {
                            of: 'code[]',
                            _code: null,
                            candidate: {
                                ns: null,
                                _code: null,
                                base: {
                                    _value: 49,
                                    _ver: 1
                                }
                            }
                        },
                        description: '提携している領域運営サービスプロバイダーコード配列'
                    },
                    {
                        key: 'consumer-alliance',
                        type: {
                            of: 'code[]',
                            _code: null,
                            candidate: {
                                ns: null,
                                _code: null,
                                base: {
                                    _value: 37,
                                    _ver: 1
                                }
                            }
                        },
                        description: '提携しているデータコンシューマーコード配列'
                    }
                ],
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/actor/app/store',
                name: 'アプリケーションが蓄積可能なデータ',
                description: 'アプリケーションが蓄積可能なデータ定義です。',
                _code: {
                    _value: 39,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: 'store',
                        type: {
                            of: 'inner[]',
                            inner: 'Store'
                        },
                        description: '蓄積定義'
                    }
                ],
                value: null
            },
            inner: [
                {
                    name: 'Store',
                    description: '蓄積可能なデータの設定',
                    template: {
                        inherit: null,
                        prop: [
                            {
                                key: 'event',
                                type: {
                                    of: 'code[]',
                                    _code: null,
                                    candidate: {
                                        ns: [
                                            'catalog/model/event/*',
                                            'catalog/built_in/event/*',
                                            'catalog/ext/{ext_name}/event/*'
                                        ],
                                        _code: null,
                                        base: null
                                    }
                                },
                                description: '蓄積可能なイベント'
                            },
                            {
                                key: 'document',
                                type: {
                                    of: 'code[]',
                                    _code: null,
                                    candidate: {
                                        ns: [
                                            'catalog/model/document/*',
                                            'catalog/built_in/document/*',
                                            'catalog/ext/{ext_name}/document/*'
                                        ],
                                        _code: null,
                                        base: null
                                    }
                                },
                                description: '蓄積可能なドキュメント'
                            },
                            {
                                key: 'thing',
                                type: {
                                    of: 'code[]',
                                    _code: null,
                                    candidate: {
                                        ns: [
                                            'catalog/model/thing/*',
                                            'catalog/built_in/thing/*',
                                            'catalog/ext/{ext_name}/thing/*'
                                        ],
                                        _code: null,
                                        base: null
                                    }
                                },
                                description: '蓄積可能なモノ'
                            }
                        ]
                    },
                    inner: null
                }
            ],
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/actor/app/share',
                name: 'アプリケーションが提供する状態共有機能',
                description: 'アプリケーションが提供する状態共有機能の定義です。',
                _code: {
                    _value: 40,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: 'share',
                        type: {
                            of: 'inner[]',
                            inner: 'Share'
                        },
                        description: '共有定義'
                    }
                ],
                value: null
            },
            inner: [
                {
                    name: 'Share',
                    description: '状態共有機能の設定',
                    template: {
                        inherit: null,
                        prop: [
                            {
                                key: 'event',
                                type: {
                                    of: 'code[]',
                                    _code: null,
                                    candidate: {
                                        ns: [
                                            'catalog/model/event/*',
                                            'catalog/built_in/event/*',
                                            'catalog/ext/{ext_name}/event/*'
                                        ],
                                        _code: null,
                                        base: null
                                    }
                                },
                                description: '共有可能なイベント'
                            },
                            {
                                key: 'document',
                                type: {
                                    of: 'code[]',
                                    _code: null,
                                    candidate: {
                                        ns: [
                                            'catalog/model/document/*',
                                            'catalog/built_in/document/*',
                                            'catalog/ext/{ext_name}/document/*'
                                        ],
                                        _code: null,
                                        base: null
                                    }
                                },
                                description: '共有可能なドキュメント'
                            }
                        ]
                    },
                    inner: null
                }
            ],
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/actor/app/application',
                name: 'アプリケーション',
                description: 'アプリケーションの定義です。',
                _code: {
                    _value: 41,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: 'store',
                        type: {
                            of: 'code[]',
                            _code: null,
                            candidate: {
                                ns: null,
                                _code: null,
                                base: {
                                    _value: 39,
                                    _ver: 1
                                }
                            }
                        },
                        description: 'アプリケーションが蓄積可能なデータの定義'
                    },
                    {
                        key: 'share',
                        type: {
                            of: 'code[]',
                            _code: null,
                            candidate: {
                                ns: null,
                                _code: null,
                                base: {
                                    _value: 40,
                                    _ver: 1
                                }
                            }
                        },
                        description: 'アプリケーションが提供する状態共有機能の定義'
                    },
                    {
                        key: 'information-site',
                        type: {
                            of: 'string',
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'アプリケーションの情報サイト'
                    }
                ],
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/actor/app',
                name: 'アプリケーションプロバイダー',
                description: 'アプリケーションプロバイダーの定義です。',
                _code: {
                    _value: 42,
                    _ver: null
                },
                inherit: {
                    _value: 36,
                    _ver: 1
                }
            },
            template: {
                prop: [
                    {
                        key: 'application',
                        type: {
                            of: 'code[]',
                            _code: null,
                            candidate: {
                                ns: null,
                                _code: null,
                                base: {
                                    _value: 41,
                                    _ver: 1
                                }
                            }
                        },
                        description: 'アプリケーション定義の配列'
                    },
                    {
                        key: 'region-alliance',
                        type: {
                            of: 'code[]',
                            _code: null,
                            candidate: {
                                ns: null,
                                _code: null,
                                base: {
                                    _value: 48,
                                    _ver: 1
                                }
                            }
                        },
                        description: '参加している領域運営サービスプロバイダーコード配列'
                    }
                ],
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/actor/wf/role',
                name: 'ワークフロー職員ロール',
                description: 'ワークフロー職員が持つロールの定義です。',
                _code: {
                    _value: 43,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: 'licence',
                        type: {
                            of: 'code[]',
                            _code: null,
                            candidate: {
                                ns: [
                                    'catalog/model/licence',
                                    'catalog/built_in/licence',
                                    'catalog/ext/{ext_name}/licence'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: '所持ライセンス'
                    },
                    {
                        key: 'event',
                        type: {
                            of: 'code[]',
                            _code: null,
                            candidate: {
                                ns: [
                                    'catalog/model/event/*',
                                    'catalog/built_in/event/*',
                                    'catalog/ext/{ext_name}/event/*'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: '作成可能なイベント'
                    },
                    {
                        key: 'document',
                        type: {
                            of: 'code[]',
                            _code: null,
                            candidate: {
                                ns: [
                                    'catalog/model/document/*',
                                    'catalog/built_in/document/*',
                                    'catalog/ext/{ext_name}/document/*'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: '作成可能なドキュメント'
                    },
                    {
                        key: 'thing',
                        type: {
                            of: 'code[]',
                            _code: null,
                            candidate: {
                                ns: [
                                    'catalog/model/thing/*',
                                    'catalog/built_in/thing/*',
                                    'catalog/ext/{ext_name}/thing/*'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: '作成可能なモノ'
                    }
                ],
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/actor/wf/store',
                name: 'ワークフローが蓄積可能なデータ',
                description: 'ワークフローが蓄積可能なデータ定義です。',
                _code: {
                    _value: 44,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: 'store',
                        type: {
                            of: 'inner[]',
                            inner: 'Store'
                        },
                        description: '蓄積定義'
                    }
                ],
                value: null
            },
            inner: [
                {
                    name: 'Store',
                    description: '蓄積可能なデータの設定',
                    template: {
                        inherit: null,
                        prop: [
                            {
                                key: 'role',
                                type: {
                                    of: 'code[]',
                                    _code: null,
                                    candidate: {
                                        ns: null,
                                        _code: null,
                                        base: {
                                            _value: 43,
                                            _ver: 1
                                        }
                                    }
                                },
                                description: '対象のロール'
                            },
                            {
                                key: 'event',
                                type: {
                                    of: 'code[]',
                                    _code: null,
                                    candidate: {
                                        ns: [
                                            'catalog/model/event/*',
                                            'catalog/built_in/event/*',
                                            'catalog/ext/{ext_name}/event/*'
                                        ],
                                        _code: null,
                                        base: null
                                    }
                                },
                                description: '蓄積可能なイベント'
                            },
                            {
                                key: 'document',
                                type: {
                                    of: 'code[]',
                                    _code: null,
                                    candidate: {
                                        ns: [
                                            'catalog/model/document/*',
                                            'catalog/built_in/document/*',
                                            'catalog/ext/{ext_name}/document/*'
                                        ],
                                        _code: null,
                                        base: null
                                    }
                                },
                                description: '蓄積可能なドキュメント'
                            },
                            {
                                key: 'thing',
                                type: {
                                    of: 'code[]',
                                    _code: null,
                                    candidate: {
                                        ns: [
                                            'catalog/model/thing/*',
                                            'catalog/built_in/thing/*',
                                            'catalog/ext/{ext_name}/thing/*'
                                        ],
                                        _code: null,
                                        base: null
                                    }
                                },
                                description: '蓄積可能なモノ'
                            }
                        ]
                    },
                    inner: null
                }
            ],
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/actor/wf/share',
                name: '状態共有機能',
                description: '状態共有機能の定義です。',
                _code: {
                    _value: 45,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: 'share',
                        type: {
                            of: 'inner[]',
                            inner: 'Share'
                        },
                        description: '共有定義'
                    }
                ],
                value: null
            },
            inner: [
                {
                    name: 'Share',
                    description: '状態共有機能の設定',
                    template: {
                        inherit: null,
                        prop: [
                            {
                                key: 'role',
                                type: {
                                    of: 'code[]',
                                    _code: null,
                                    candidate: {
                                        ns: null,
                                        _code: null,
                                        base: {
                                            _value: 43,
                                            _ver: 1
                                        }
                                    }
                                },
                                description: '対象のロール'
                            },
                            {
                                key: 'event',
                                type: {
                                    of: 'code[]',
                                    _code: null,
                                    candidate: {
                                        ns: [
                                            'catalog/model/event/*',
                                            'catalog/built_in/event/*',
                                            'catalog/ext/{ext_name}/event/*'
                                        ],
                                        _code: null,
                                        base: null
                                    }
                                },
                                description: '共有可能なイベント'
                            },
                            {
                                key: 'document',
                                type: {
                                    of: 'code[]',
                                    _code: null,
                                    candidate: {
                                        ns: [
                                            'catalog/model/document/*',
                                            'catalog/built_in/document/*',
                                            'catalog/ext/{ext_name}/document/*'
                                        ],
                                        _code: null,
                                        base: null
                                    }
                                },
                                description: '共有可能なドキュメント'
                            },
                            {
                                key: 'thing',
                                type: {
                                    of: 'code[]',
                                    _code: null,
                                    candidate: {
                                        ns: [
                                            'catalog/model/thing/*',
                                            'catalog/built_in/thing/*',
                                            'catalog/ext/{ext_name}/thing/*'
                                        ],
                                        _code: null,
                                        base: null
                                    }
                                },
                                description: '蓄積可能なモノ'
                            }
                        ]
                    },
                    inner: null
                }
            ],
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/actor/wf/workflow',
                name: 'ワークフロー',
                description: 'ワークフローの定義です。',
                _code: {
                    _value: 46,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: 'store',
                        type: {
                            of: 'code[]',
                            _code: null,
                            candidate: {
                                ns: null,
                                _code: null,
                                base: {
                                    _value: 44,
                                    _ver: 1
                                }
                            }
                        },
                        description: 'ワークフローが蓄積可能なデータの定義'
                    },
                    {
                        key: 'share',
                        type: {
                            of: 'code[]',
                            _code: null,
                            candidate: {
                                ns: null,
                                _code: null,
                                base: {
                                    _value: 45,
                                    _ver: 1
                                }
                            }
                        },
                        description: 'ワークフローが提供する状態共有機能の定義'
                    },
                    {
                        key: 'information-site',
                        type: {
                            of: 'string',
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'ワークフローの情報サイト'
                    }
                ],
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/actor/wf',
                name: 'ワークフロープロバイダー',
                description: 'ワークフロープロバイダーの定義です。',
                _code: {
                    _value: 47,
                    _ver: null
                },
                inherit: {
                    _value: 36,
                    _ver: 1
                }
            },
            template: {
                prop: [
                    {
                        key: 'workflow',
                        type: {
                            of: 'code[]',
                            _code: null,
                            candidate: {
                                ns: null,
                                _code: null,
                                base: {
                                    _value: 46,
                                    _ver: 1
                                }
                            }
                        },
                        description: 'ワークフロー定義の配列'
                    },
                    {
                        key: 'region-alliance',
                        type: {
                            of: 'code[]',
                            _code: null,
                            candidate: {
                                ns: null,
                                _code: null,
                                base: {
                                    _value: 48,
                                    _ver: 1
                                }
                            }
                        },
                        description: '参加している領域運営サービスプロバイダーコード配列'
                    }
                ],
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/actor/region-root/region',
                name: 'Region',
                description: 'Regionの定義です。',
                _code: {
                    _value: 48,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: 'statement',
                        type: {
                            of: 'item[]',
                            _code: null,
                            candidate: {
                                ns: null,
                                _code: [
                                    {
                                        _value: 61,
                                        _ver: 1
                                    }
                                ],
                                base: null
                            }
                        },
                        description: 'Regionステートメント'
                    },
                    {
                        key: 'app-alliance',
                        type: {
                            of: 'code[]',
                            _code: null,
                            candidate: {
                                ns: null,
                                _code: null,
                                base: {
                                    _value: 42,
                                    _ver: 1
                                }
                            }
                        },
                        description: 'Regionメンバー(アプリケーションプロバイダー)のコード配列'
                    },
                    {
                        key: 'wf-alliance',
                        type: {
                            of: 'code[]',
                            _code: null,
                            candidate: {
                                ns: null,
                                _code: null,
                                base: {
                                    _value: 47,
                                    _ver: 1
                                }
                            }
                        },
                        description: 'Regionメンバー(ワークフロープロバイダー)のコード配列'
                    },
                    {
                        key: 'information-site',
                        type: {
                            of: 'string',
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'Regionの情報サイト'
                    }
                ],
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/actor/region-root',
                name: '領域運営サービスプロバイダー',
                description: '領域運営サービスプロバイダーの定義です。',
                _code: {
                    _value: 49,
                    _ver: null
                },
                inherit: {
                    _value: 36,
                    _ver: 1
                }
            },
            template: {
                prop: [
                    {
                        key: 'region',
                        type: {
                            of: 'code[]',
                            candidate: {
                                ns: null,
                                _code: null,
                                base: {
                                    _value: 48,
                                    _ver: 1
                                }
                            }
                        },
                        description: 'Region定義'
                    },
                    {
                        key: 'trader-alliance',
                        type: {
                            of: 'code[]',
                            _code: null,
                            candidate: {
                                ns: null,
                                _code: null,
                                base: {
                                    _value: 38,
                                    _ver: 1
                                }
                            }
                        },
                        description: '提携するデータ取引サービスプロバイダーのコード配列'
                    }
                ],
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/actor/pxr-root',
                name: '流通制御サービスプロバイダー',
                description: '流通制御サービスプロバイダーの定義です。',
                _code: {
                    _value: 50,
                    _ver: 1
                },
                inherit: {
                    _value: 36,
                    _ver: 1
                }
            },
            template: {
                prop: [
                    {
                        key: 'region-root-cert',
                        type: {
                            of: 'inner',
                            inner: 'Certification'
                        },
                        description: '領域運営サービスプロバイダー認定'
                    },
                    {
                        key: 'app-cert',
                        type: {
                            of: 'inner',
                            inner: 'Certification'
                        },
                        description: 'アプリケーションプロバイダー認定'
                    },
                    {
                        key: 'wf-cert',
                        type: {
                            of: 'inner',
                            inner: 'Certification'
                        },
                        description: 'ワークフロープロバイダー認定'
                    },
                    {
                        key: 'data-trader-cert',
                        type: {
                            of: 'inner',
                            inner: 'Certification'
                        },
                        description: 'データ取引サービスプロバイダー認定'
                    },
                    {
                        key: 'consumer-cert',
                        type: {
                            of: 'inner',
                            inner: 'Certification'
                        },
                        description: 'データコンシューマー認定'
                    }
                ],
                value: null
            },
            inner: [
                {
                    name: 'Certification',
                    description: 'アクター認定',
                    template: {
                        inherit: null,
                        prop: [
                            {
                                key: 'cert',
                                type: {
                                    of: 'item[]',
                                    _code: null,
                                    candidate: {
                                        ns: null,
                                        _code: [
                                            {
                                                _value: 61,
                                                _ver: 1
                                            }
                                        ],
                                        base: null
                                    }
                                },
                                description: '認定基準'
                            },
                            {
                                key: 'audit',
                                type: {
                                    of: 'item[]',
                                    _code: null,
                                    candidate: {
                                        ns: null,
                                        _code: [
                                            {
                                                _value: 61,
                                                _ver: 1
                                            }
                                        ],
                                        base: null
                                    }
                                },
                                description: '監査手順'
                            }
                        ]
                    },
                    inner: null
                }
            ],
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/book',
                name: 'My-Condition-Book',
                description: 'My-Condition-Bookの定義です。',
                _code: {
                    _value: 51,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: 'id',
                        type: {
                            of: 'item',
                            _code: {
                                _value: 11,
                                _ver: 1
                            },
                            candidate: null
                        },
                        description: '個人識別子'
                    },
                    {
                        key: 'birthday',
                        type: {
                            of: 'item',
                            _code: {
                                _value: 12,
                                _ver: 1
                            },
                            candidate: null
                        },
                        description: '生年月日'
                    },
                    {
                        key: 'gender',
                        type: {
                            of: 'item',
                            _code: {
                                _value: 13,
                                _ver: 1
                            },
                            candidate: null
                        },
                        description: '性別'
                    },
                    {
                        key: 'identification',
                        type: {
                            of: 'item[]',
                            _code: null,
                            candidate: {
                                ns: [
                                    'catalog/model/person/identification',
                                    'catalog/built_in/person/identification',
                                    'catalog/ext/{ext_name}/person/identification'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: '本人性確認結果の配列'
                    },
                    {
                        key: 'share-policy',
                        type: {
                            of: 'item[]',
                            _code: null,
                            candidate: {
                                ns: null,
                                _code: [
                                    {
                                        _value: 65,
                                        _ver: 1
                                    }
                                ],
                                base: null
                            }
                        },
                        description: '共有の基本方針'
                    },
                    {
                        key: 'supply-policy',
                        type: {
                            of: 'item[]',
                            _code: null,
                            candidate: {
                                ns: null,
                                _code: [
                                    {
                                        _value: 66,
                                        _ver: 1
                                    }
                                ],
                                base: null
                            }
                        },
                        description: '提供の基本方針'
                    },
                    {
                        key: 'share-log',
                        type: {
                            of: 'item[]',
                            _code: null,
                            candidate: {
                                ns: null,
                                _code: [
                                    {
                                        _value: 72,
                                        _ver: 1
                                    }
                                ],
                                base: null
                            }
                        },
                        description: '共有アクセスログ'
                    },
                    {
                        key: 'document',
                        type: {
                            of: 'item[]',
                            _code: null,
                            candidate: {
                                ns: [
                                    'catalog/model/document/*',
                                    'catalog/built_in/document/*',
                                    'catalog/ext/{ext_name}/document/*'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: 'ドキュメントの配列'
                    },
                    {
                        key: 'event',
                        type: {
                            of: 'item[]',
                            _code: null,
                            candidate: {
                                ns: [
                                    'catalog/model/event/*',
                                    'catalog/built_in/event/*',
                                    'catalog/ext/{ext_name}/event/*'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: 'イベントの配列'
                    },
                    {
                        key: 'creation-log',
                        type: {
                            of: 'inner',
                            inner: 'CreationLog'
                        },
                        description: 'Book開設ログ'
                    }
                ],
                value: null
            },
            inner: [
                {
                    name: 'CreationLog',
                    description: 'Book開設ログ',
                    template: {
                        inherit: null,
                        prop: [
                            {
                                key: 'by',
                                type: {
                                    of: 'code',
                                    _code: null,
                                    candidate: {
                                        ns: null,
                                        _code: null,
                                        base: {
                                            _value: 36,
                                            _ver: 1
                                        }
                                    }
                                },
                                description: '作成した組織'
                            },
                            {
                                key: 'at',
                                type: {
                                    of: 'string',
                                    format: {
                                        _value: 6,
                                        _ver: 1
                                    },
                                    unit: null
                                },
                                description: '作成した時刻'
                            }
                        ]
                    },
                    inner: null
                }
            ],
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/document',
                name: 'ドキュメント',
                description: 'ドキュメントの定義です。',
                _code: {
                    _value: 52,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: 'id',
                        type: {
                            of: 'item',
                            _code: {
                                _value: 14,
                                _ver: 1
                            },
                            candidate: null
                        },
                        description: 'ドキュメント識別子'
                    },
                    {
                        key: 'code',
                        type: {
                            of: 'item',
                            _code: {
                                _value: 15,
                                _ver: 1
                            },
                            candidate: null
                        },
                        description: 'ドキュメント種別コード'
                    },
                    {
                        key: 'createdAt',
                        type: {
                            of: 'item',
                            _code: {
                                _value: 16,
                                _ver: 1
                            },
                            candidate: null
                        },
                        description: 'ドキュメント作成時刻'
                    },
                    {
                        key: 'chapter',
                        type: {
                            of: 'inner[]',
                            inner: 'Chapter'
                        },
                        description: 'チャプターの配列'
                    }
                ],
                value: null
            },
            inner: [
                {
                    name: 'Chapter',
                    description: 'チャプター',
                    template: {
                        inherit: null,
                        prop: [
                            {
                                key: 'title',
                                type: {
                                    of: 'string',
                                    format: null,
                                    unit: null
                                },
                                description: 'チャプタータイトル'
                            },
                            {
                                key: 'event',
                                type: {
                                    of: 'string[]',
                                    format: null,
                                    unit: null
                                },
                                description: 'イベント識別子の配列'
                            }
                        ]
                    },
                    inner: null
                }
            ],
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/event',
                name: 'イベント',
                description: 'イベントの定義です。',
                _code: {
                    _value: 53,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: 'sourceId',
                        type: {
                            of: 'string',
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'イベントのソースID'
                    },
                    {
                        key: 'id',
                        type: {
                            of: 'item',
                            _code: {
                                _value: 17,
                                _ver: 1
                            },
                            candidate: null
                        },
                        description: 'イベント識別子'
                    },
                    {
                        key: 'code',
                        type: {
                            of: 'item',
                            _code: {
                                _value: 18,
                                _ver: 1
                            },
                            candidate: null
                        },
                        description: 'イベント種別'
                    },
                    {
                        key: 'start',
                        type: {
                            of: 'item',
                            _code: {
                                _value: 19,
                                _ver: 1
                            },
                            candidate: null
                        },
                        description: 'イベント開始時刻'
                    },
                    {
                        key: 'end',
                        type: {
                            of: 'item',
                            _code: {
                                _value: 20,
                                _ver: 1
                            },
                            candidate: null
                        },
                        description: 'イベント終了時刻'
                    },
                    {
                        key: 'location',
                        type: {
                            of: 'item',
                            _code: {
                                _value: 21,
                                _ver: 1
                            },
                            candidate: null
                        },
                        description: 'イベント発生位置'
                    },
                    {
                        key: 'env',
                        type: {
                            of: 'item[]',
                            _code: null,
                            candidate: {
                                ns: [
                                    'catalog/model/env/event/*',
                                    'catalog/built_in/env/event/*',
                                    'catalog/ext/{ext_name}/env/event/*'
                                ],
                                _code: null
                            }
                        },
                        description: 'イベント環境の配列'
                    },
                    {
                        key: 'app',
                        type: {
                            of: 'inner',
                            inner: 'App'
                        },
                        description: 'イベントを発生させたアプリケーションプロバイダー'
                    },
                    {
                        key: 'wf',
                        type: {
                            of: 'inner',
                            inner: 'Wf'
                        },
                        description: 'イベントを発生させたワークフロープロバイダー'
                    },
                    {
                        key: 'thing',
                        type: {
                            of: 'item[]',
                            _code: null,
                            candidate: {
                                ns: [
                                    'catalog/model/thing/*',
                                    'catalog/built_in/thing/*',
                                    'catalog/ext/{ext_name}/thing/*'
                                ],
                                _code: null
                            }
                        },
                        description: 'モノの配列'
                    }
                ],
                value: null
            },
            inner: [
                {
                    name: 'App',
                    template: {
                        inherit: null,
                        prop: [
                            {
                                key: 'code',
                                type: {
                                    of: 'item',
                                    _code: {
                                        _value: 22,
                                        _ver: 1
                                    },
                                    candidate: null
                                },
                                description: 'アプリケーションプロバイダーの識別子'
                            },
                            {
                                key: 'app',
                                type: {
                                    of: 'item',
                                    _code: {
                                        _value: 26,
                                        _ver: 1
                                    },
                                    candidate: null
                                },
                                description: 'アプリケーション識別子'
                            }
                        ]
                    },
                    inner: null
                },
                {
                    name: 'Wf',
                    template: {
                        inherit: null,
                        prop: [
                            {
                                key: 'code',
                                type: {
                                    of: 'item',
                                    _code: {
                                        _value: 22,
                                        _ver: 1
                                    },
                                    candidate: null
                                },
                                description: 'ワークフロープロバイダーの識別子'
                            },
                            {
                                key: 'wf',
                                type: {
                                    of: 'item',
                                    _code: {
                                        _value: 23,
                                        _ver: 1
                                    },
                                    candidate: null
                                },
                                description: 'ワークフロー識別子'
                            },
                            {
                                key: 'role',
                                type: {
                                    of: 'item',
                                    _code: {
                                        _value: 24,
                                        _ver: 1
                                    },
                                    candidate: null
                                },
                                description: 'ワークフロー職員のロール'
                            },
                            {
                                key: 'staffId',
                                type: {
                                    of: 'item',
                                    _code: {
                                        _value: 25,
                                        _ver: 1
                                    },
                                    candidate: null
                                },
                                description: 'ワークフロー職員の識別子'
                            }
                        ]
                    },
                    inner: null
                }
            ],
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/event/relation',
                name: '他人との関係性が変化する',
                description: '他人との関係性が変化すること',
                _code: {
                    _value: 54,
                    _ver: null
                },
                inherit: {
                    _value: 53,
                    _ver: 1
                }
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/thing',
                name: 'モノ',
                description: 'モノの定義です。',
                _code: {
                    _value: 55,
                    _ver: 1
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: 'sourceId',
                        type: {
                            of: 'string',
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'モノのソースID'
                    },
                    {
                        key: 'id',
                        type: {
                            of: 'item',
                            _code: {
                                _value: 27,
                                _ver: 1
                            },
                            candidate: null
                        },
                        description: 'モノ識別子'
                    },
                    {
                        key: 'code',
                        type: {
                            of: 'item',
                            _code: {
                                _value: 28,
                                _ver: 1
                            },
                            candidate: null
                        },
                        description: 'モノ種別'
                    },
                    {
                        key: 'env',
                        type: {
                            of: 'item[]',
                            cmatrix: {
                                index: '4_3_(n)',
                                reserved: false
                            },
                            _code: null,
                            candidate: {
                                ns: [
                                    'catalog/model/env/thing/*',
                                    'catalog/built_in/env/thing/*',
                                    'catalog/ext/{ext_name}/env/thing/*'
                                ],
                                _code: null
                            }
                        },
                        description: 'モノ環境の配列'
                    },
                    {
                        key: 'app',
                        type: {
                            of: 'inner',
                            inner: 'App'
                        },
                        description: 'イベントを発生させたアプリケーションプロバイダー'
                    },
                    {
                        key: 'wf',
                        type: {
                            of: 'inner',
                            inner: 'Wf'
                        },
                        description: 'イベントを発生させたワークフロープロバイダー'
                    }
                ],
                value: null
            },
            inner: [
                {
                    name: 'App',
                    template: {
                        inherit: null,
                        prop: [
                            {
                                key: 'code',
                                type: {
                                    of: 'item',
                                    _code: {
                                        _value: 96,
                                        _ver: 1
                                    },
                                    candidate: null
                                },
                                description: 'アプリケーションプロバイダーの識別子'
                            },
                            {
                                key: 'app',
                                type: {
                                    of: 'item',
                                    _code: {
                                        _value: 100,
                                        _ver: 1
                                    },
                                    candidate: null
                                },
                                description: 'アプリケーション識別子'
                            }
                        ]
                    },
                    inner: null
                },
                {
                    name: 'Wf',
                    template: {
                        inherit: null,
                        prop: [
                            {
                                key: 'code',
                                type: {
                                    of: 'item',
                                    _code: {
                                        _value: 96,
                                        _ver: 1
                                    },
                                    candidate: null
                                },
                                description: 'ワークフロープロバイダーの識別子'
                            },
                            {
                                key: 'wf',
                                type: {
                                    of: 'item',
                                    _code: {
                                        _value: 97,
                                        _ver: 1
                                    },
                                    candidate: null
                                },
                                description: 'ワークフロー識別子'
                            },
                            {
                                key: 'role',
                                type: {
                                    of: 'item',
                                    _code: {
                                        _value: 98,
                                        _ver: 1
                                    },
                                    candidate: null
                                },
                                description: 'ワークフロー職員のロール'
                            },
                            {
                                key: 'staffId',
                                type: {
                                    of: 'item',
                                    _code: {
                                        _value: 99,
                                        _ver: 1
                                    },
                                    candidate: null
                                },
                                description: 'ワークフロー職員の識別子'
                            }
                        ]
                    },
                    inner: null
                }
            ],
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/thing/qa',
                name: '単一回答選択式の質問',
                description: '単一回答選択式の質問の定義です。',
                _code: {
                    _value: 56,
                    _ver: null
                },
                inherit: {
                    _value: 55,
                    _ver: 1
                }
            },
            template: {
                prop: [
                    {
                        key: 'candidate',
                        type: {
                            of: 'code[]',
                            _code: null,
                            candidate: {
                                ns: [
                                    'catalog/model/qualitative/*',
                                    'catalog/built_in/qualitative/*',
                                    'catalog/ext/{ext_name}/qualitative/*'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: '回答候補'
                    },
                    {
                        key: 'answer',
                        type: {
                            of: 'inner',
                            inner: 'Answer'
                        },
                        description: '回答'
                    },
                    {
                        key: 'qa-group',
                        type: {
                            of: 'code',
                            candidate: {
                                ns: null,
                                _code: null,
                                base: {
                                    _value: 112,
                                    _ver: 1
                                }
                            },
                            cmatrix: {
                                index: '4_2_1_2',
                                reserved: false
                            }
                        },
                        description: '質問グループ'
                    },
                    {
                        key: 'qa-group-branch-number',
                        type: {
                            of: 'number',
                            format: null,
                            unit: null,
                            candidate: null,
                            cmatrix: {
                                index: '4_2_1_3',
                                reserved: false
                            }
                        },
                        description: '質問グループ枝番'
                    }
                ],
                value: null
            },
            inner: [
                {
                    name: 'Answer',
                    template: {
                        inherit: null,
                        prop: [
                            {
                                key: 'qualitative',
                                type: {
                                    of: 'code',
                                    _code: null,
                                    candidate: {
                                        ns: [
                                            'catalog/model/qualitative/qa',
                                            'catalog/built_in/qualitative/qa',
                                            'catalog/ext/{ext_name}/qualitative/qa'
                                        ],
                                        _code: null
                                    },
                                    cmatrix: {
                                        index: '4_2_1_1',
                                        reserved: false
                                    }
                                },
                                description: '定性値'
                            }
                        ]
                    },
                    inner: null
                }
            ],
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/thing/qa',
                name: '複数回答選択式の質問',
                description: '複数回答選択式の質問の定義です。',
                _code: {
                    _value: 57,
                    _ver: null
                },
                inherit: {
                    _value: 55,
                    _ver: 1
                }
            },
            template: {
                prop: [
                    {
                        key: 'candidate',
                        type: {
                            of: 'code[]',
                            _code: null,
                            candidate: {
                                ns: [
                                    'catalog/model/qualitative/*',
                                    'catalog/built_in/qualitative/*',
                                    'catalog/ext/{ext_name}/qualitative/*'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: '回答候補'
                    },
                    {
                        key: 'answer',
                        type: {
                            of: 'inner',
                            inner: 'Answer'
                        },
                        description: '回答'
                    },
                    {
                        key: 'qa-group',
                        type: {
                            of: 'code',
                            candidate: {
                                ns: null,
                                _code: null,
                                base: {
                                    _value: 112,
                                    _ver: 1
                                }
                            },
                            cmatrix: {
                                index: '4_2_1_2',
                                reserved: false
                            }
                        },
                        description: '質問グループ'
                    },
                    {
                        key: 'qa-group-branch-number',
                        type: {
                            of: 'number',
                            format: null,
                            unit: null,
                            candidate: null,
                            cmatrix: {
                                index: '4_2_1_3',
                                reserved: false
                            }
                        },
                        description: '質問グループ枝番'
                    }
                ],
                value: null
            },
            inner: [
                {
                    name: 'Answer',
                    template: {
                        inherit: null,
                        prop: [
                            {
                                key: 'qualitative',
                                type: {
                                    of: 'code[]',
                                    _code: null,
                                    candidate: {
                                        ns: [
                                            'catalog/model/qualitative/qa',
                                            'catalog/built_in/qualitative/qa',
                                            'catalog/ext/{ext_name}/qualitative/qa'
                                        ],
                                        _code: null
                                    },
                                    cmatrix: {
                                        index: '4_2_1_1_(n)',
                                        reserved: false
                                    }
                                },
                                description: '定性値'
                            }
                        ]
                    },
                    inner: null
                }
            ],
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/thing/qa',
                name: '自由記述回答式の質問',
                description: '自由記述回答式の質問の定義です。',
                _code: {
                    _value: 58,
                    _ver: null
                },
                inherit: {
                    _value: 55,
                    _ver: 1
                }
            },
            template: {
                prop: [
                    {
                        key: 'answer',
                        type: {
                            of: 'inner',
                            inner: 'Answer'
                        },
                        description: '回答'
                    },
                    {
                        key: 'qa-group',
                        type: {
                            of: 'code',
                            candidate: {
                                ns: null,
                                _code: null,
                                base: {
                                    _value: 112,
                                    _ver: 1
                                }
                            },
                            cmatrix: {
                                index: '4_2_3_3_2',
                                reserved: false
                            }
                        },
                        description: '質問グループ'
                    },
                    {
                        key: 'qa-group-branch-number',
                        type: {
                            of: 'number',
                            format: null,
                            unit: null,
                            candidate: null,
                            cmatrix: {
                                index: '4_2_3_3_3',
                                reserved: false
                            }
                        },
                        description: '質問グループ枝番'
                    }
                ],
                value: null
            },
            inner: [
                {
                    name: 'Answer',
                    template: {
                        inherit: null,
                        prop: [
                            {
                                key: 'free',
                                type: {
                                    of: 'string',
                                    format: null,
                                    unit: null,
                                    cmatrix: {
                                        index: '4_2_3_3_1',
                                        reserved: false
                                    }
                                },
                                description: '自由記述'
                            }
                        ]
                    },
                    inner: null
                }
            ],
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/thing/relation',
                name: '関係性',
                description: '個人間の関係性の定義です。',
                _code: {
                    _value: 59,
                    _ver: 1
                },
                inherit: {
                    _value: 55,
                    _ver: 1
                }
            },
            template: {
                prop: [
                    {
                        key: 'self',
                        type: {
                            of: 'item',
                            _code: null,
                            candidate: {
                                ns: [
                                    'catalog/model/qualitative/relation'
                                ],
                                _code: null
                            },
                            cmatrix: {
                                index: '4_2_1_1',
                                reserved: false
                            }
                        },
                        description: '自分の役割'
                    },
                    {
                        key: 'other',
                        type: {
                            of: 'inner',
                            inner: 'Other'
                        },
                        description: '相手'
                    },
                    {
                        key: 'two-way',
                        type: {
                            of: 'boolean',
                            cmatrix: {
                                index: '4_2_1_3',
                                reserved: false
                            }
                        },
                        description: '双方向の関係性がどうか'
                    }
                ],
                value: null
            },
            inner: [
                {
                    name: 'Other',
                    description: '他人',
                    template: {
                        inherit: null,
                        prop: [
                            {
                                key: 'other_no',
                                type: {
                                    of: 'number',
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: '他人No'
                            },
                            {
                                key: 'role',
                                type: {
                                    of: 'item',
                                    _code: null,
                                    candidate: {
                                        ns: [
                                            'catalog/model/qualitative/relation'
                                        ],
                                        _code: null
                                    },
                                    cmatrix: {
                                        index: '4_2_1_2',
                                        reserved: false
                                    }
                                },
                                description: '相手の役割'
                            },
                            {
                                key: 'id',
                                type: {
                                    of: 'string',
                                    format: null,
                                    unit: null
                                },
                                description: '相手のPXR-ID'
                            }
                        ]
                    },
                    inner: null
                }
            ],
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/thing/relation',
                name: 'My-Condition-Bookの管理に関する信託関係',
                description: 'My-Condition-Bookの管理（蓄積、共有、提供）を他人に信託するための関係性です。',
                _code: {
                    _value: 60,
                    _ver: 1
                },
                inherit: {
                    _value: 59,
                    _ver: 1
                }
            },
            template: {
                prop: null,
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/page',
                name: '文章構造',
                description: '文章構造の定義です。',
                _code: {
                    _value: 61,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: 'title',
                        type: {
                            of: 'string',
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'タイトル'
                    },
                    {
                        key: 'section',
                        type: {
                            of: 'inner[]',
                            inner: 'Section'
                        },
                        description: 'セクション'
                    }
                ],
                value: null
            },
            inner: [
                {
                    name: 'Section',
                    description: 'セクションの定義です。',
                    template: {
                        inherit: null,
                        prop: [
                            {
                                key: 'title',
                                type: {
                                    of: 'string',
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: 'セクションタイトル'
                            },
                            {
                                key: 'content',
                                type: {
                                    of: 'inner[]',
                                    candidate: {
                                        inner: [
                                            'Sentence',
                                            'List'
                                        ]
                                    }
                                },
                                description: 'コンテンツ'
                            }
                        ]
                    },
                    inner: [
                        {
                            name: 'Sentence',
                            description: '文の定義です。',
                            template: {
                                inherit: null,
                                prop: [
                                    {
                                        key: 'sentence',
                                        type: {
                                            of: 'string',
                                            format: null,
                                            unit: null,
                                            candidate: null
                                        },
                                        description: '文（改行を含む際は、\\r\\n等改行コードで指定すること）'
                                    }
                                ]
                            },
                            inner: null
                        },
                        {
                            name: 'List',
                            description: 'リストの定義です。',
                            template: {
                                inherit: null,
                                prop: [
                                    {
                                        key: 'list',
                                        type: {
                                            of: 'string[]',
                                            format: null,
                                            unit: null,
                                            candidate: null
                                        },
                                        description: 'リストアイテム'
                                    }
                                ]
                            },
                            inner: null
                        }
                    ]
                }
            ],
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/attribute/constraint/refer',
                name: 'constraint-refer',
                description: '個人による参照に対する制約の定義です。attributeに設定されます。key名は[constraint-refer]です。',
                _code: {
                    _value: 62,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: 'permit',
                        type: {
                            of: 'boolean'
                        },
                        description: '個人による参照の可否（設定がない場合は、true）'
                    },
                    {
                        key: 'required-pincode',
                        type: {
                            of: 'boolean'
                        },
                        description: '参照時にPINコードでの認証必要有無（設定がない場合は、false）'
                    }
                ],
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/attribute/constraint/share',
                name: 'constraint-share',
                description: '共有制約（共有するか/しないか）の定義です。attributeに設定されます。key名は[constraint-share]です。',
                _code: {
                    _value: 63,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: 'permit',
                        type: {
                            of: 'boolean'
                        },
                        description: '共有の可否（設定がない場合は、true）'
                    },
                    {
                        key: 'target-actor',
                        type: {
                            of: 'code[]',
                            _code: null,
                            candidate: {
                                ns: [
                                    'catalog/model/actor/app',
                                    'catalog/ext/{ext_name}/actor/app',
                                    'catalog/model/actor/wf',
                                    'catalog/ext/{ext_name}/actor/wf'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: '許可する共有先の設定（共有先を限定したい場合に設定する）'
                    },
                    {
                        key: 'required-licence',
                        type: {
                            of: 'code[]',
                            _code: null,
                            candidate: {
                                ns: [
                                    'catalog/model/licence',
                                    'catalog/built_in/licence',
                                    'catalog/ext/{ext_name}/licence'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: '共有先のWF職員が保持しておかなければならないライセンス'
                    }
                ],
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/attribute/constraint/supply',
                name: 'constraint-supply',
                description: '提供制約（提供するか/しないか）の定義です。attributeに設定されます。key名は[constraint-supply]です。',
                _code: {
                    _value: 64,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: 'permit',
                        type: {
                            of: 'boolean'
                        },
                        description: '提供の可否（設定がない場合は、true）'
                    },
                    {
                        key: 'target-actor',
                        type: {
                            of: 'code[]',
                            _code: null,
                            candidate: {
                                ns: [
                                    'catalog/model/actor/consumer',
                                    'catalog/ext/{ext_name}/actor/consumer'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: '許可する提供先の設定（提供先を限定したい場合に設定する）'
                    }
                ],
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/attribute/consideration/store',
                name: 'consideration-distributionratio-store',
                description: '蓄積の対価と分配比率の定義です。attributeに設定されます。',
                _code: {
                    _value: 65,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: 'store-consideration',
                        type: {
                            of: 'number',
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '蓄積の対価額'
                    },
                    {
                        key: 'store-distribution-ratio',
                        type: {
                            of: 'inner[]',
                            inner: 'DistributionRatio'
                        },
                        description: '蓄積の分配比率'
                    }
                ],
                value: null
            },
            inner: [
                {
                    name: 'DistributionRatio',
                    description: '分配比率',
                    template: {
                        inherit: null,
                        prop: [
                            {
                                key: 'actor-type',
                                type: {
                                    of: 'string',
                                    format: null,
                                    unit: null,
                                    candidate: {
                                        value: [
                                            'pxr-root',
                                            'region-root',
                                            'app',
                                            'wf',
                                            'data-trader',
                                            'consumer'
                                        ]
                                    }
                                },
                                description: '対象のアクター種別'
                            },
                            {
                                key: 'ratio',
                                type: {
                                    of: 'number',
                                    format: {
                                        _value: 74,
                                        _ver: 1
                                    },
                                    unit: null,
                                    candidate: null
                                },
                                description: '対象のアクター種別への分配比率'
                            }
                        ]
                    },
                    inner: null
                }
            ],
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/attribute/consideration/supply',
                name: 'consideration-distributionratio-supply',
                description: '提供の対価と分配比率の定義です。attributeに設定されます。',
                _code: {
                    _value: 66,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: 'supply-consideration',
                        type: {
                            of: 'number',
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '提供の対価額'
                    },
                    {
                        key: 'supply-distribution-ratio',
                        type: {
                            of: 'inner[]',
                            inner: 'DistributionRatio'
                        },
                        description: '提供の分配比率'
                    }
                ],
                value: null
            },
            inner: [
                {
                    name: 'DistributionRatio',
                    description: '分配比率',
                    template: {
                        inherit: null,
                        prop: [
                            {
                                key: 'actor-type',
                                type: {
                                    of: 'string',
                                    format: null,
                                    unit: null,
                                    candidate: {
                                        value: [
                                            'pxr-root',
                                            'region-root',
                                            'app',
                                            'wf',
                                            'data-trader',
                                            'consumer'
                                        ]
                                    }
                                },
                                description: '対象のアクター種別'
                            },
                            {
                                key: 'ratio',
                                type: {
                                    of: 'number',
                                    format: {
                                        _value: 74,
                                        _ver: 1
                                    },
                                    unit: null,
                                    candidate: null
                                },
                                description: '対象のアクター種別への分配比率'
                            }
                        ]
                    },
                    inner: null
                }
            ],
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/category/data',
                name: 'データカテゴリ',
                description: 'データカテゴリの定義です。',
                _code: {
                    _value: 67,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: 'thing',
                        type: {
                            of: 'code[]',
                            _code: null,
                            candidate: {
                                ns: [
                                    'catalog/model/thing/*',
                                    'catalog/built_in/thing/*',
                                    'catalog/ext/{ext_name}/thing/*'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: 'データカテゴリに含まれるモノ'
                    },
                    {
                        key: 'event',
                        type: {
                            of: 'code[]',
                            _code: null,
                            candidate: {
                                ns: [
                                    'catalog/model/event/*',
                                    'catalog/built_in/event/*',
                                    'catalog/ext/{ext_name}/event/*'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: 'データカテゴリに含まれるイベント'
                    },
                    {
                        key: 'document',
                        type: {
                            of: 'code[]',
                            _code: null,
                            candidate: {
                                ns: [
                                    'catalog/model/document/*',
                                    'catalog/built_in/document/*',
                                    'catalog/ext/{ext_name}/document/*'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: 'データカテゴリに含まれるドキュメント'
                    }
                ],
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/data-supply-contract/target-condition',
                name: '対象者条件',
                description: '対象者条件の定義です。',
                _code: {
                    _value: 68,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: 'targetGroup',
                        type: {
                            of: 'inner[]',
                            inner: 'TargetGroup',
                            candidate: null
                        },
                        description: '対象者グループ'
                    },
                    {
                        key: 'ownedData',
                        type: {
                            of: 'inner[]',
                            inner: 'OwnedData',
                            candidate: null
                        },
                        description: '保有データ'
                    }
                ],
                value: null
            },
            inner: [
                {
                    name: 'TargetGroup',
                    description: 'Book利用者管理情報で条件を指定する',
                    template: {
                        inherit: null,
                        prop: [
                            {
                                key: 'condition',
                                type: {
                                    of: 'item[]',
                                    candidate: {
                                        ns: [
                                            'catalog/model/data-supply-contract/condition',
                                            'catalog/built_in/data-supply-contract/condition',
                                            'catalog/ext/{ext_name}/data-supply-contract/condition'
                                        ],
                                        _code: null,
                                        base: null
                                    }
                                },
                                description: '対象者条件'
                            },
                            {
                                key: 'min',
                                type: {
                                    of: 'nubmer',
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: '最小募集人数'
                            },
                            {
                                key: 'max',
                                type: {
                                    of: 'nubmer',
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: '最大募集人数'
                            }
                        ]
                    },
                    inner: null
                },
                {
                    name: 'OwnedData',
                    description: '保有データ',
                    template: {
                        inherit: null,
                        prop: [
                            {
                                key: 'type',
                                type: {
                                    of: 'string',
                                    format: null,
                                    unit: null,
                                    candidate: {
                                        value: [
                                            'and',
                                            'or'
                                        ]
                                    }
                                },
                                description: '検索条件'
                            },
                            {
                                key: 'code',
                                type: {
                                    of: 'code',
                                    candidate: {
                                        ns: [
                                            'catalog/model/thing',
                                            'catalog/built_in/thing',
                                            'catalog/ext/{ext_name}/thing',
                                            'catalog/model/event',
                                            'catalog/built_in/event',
                                            'catalog/ext/{ext_name}/event',
                                            'catalog/model/document',
                                            'catalog/built_in/document',
                                            'catalog/ext/{ext_name}/document'
                                        ],
                                        _code: null,
                                        base: null
                                    }
                                },
                                description: '対象データ種別'
                            },
                            {
                                key: 'min',
                                type: {
                                    of: 'number',
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: '最小保有データ量'
                            },
                            {
                                key: 'max',
                                type: {
                                    of: 'number',
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: '最大保有データ量'
                            }
                        ]
                    },
                    inner: null
                }
            ],
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/format',
                name: 'yyyyMMddTHHZ形式',
                description: '時刻の値フォーマット（yyyyMMddTHHZ形式）の定義です。',
                _code: {
                    _value: 69,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/book/policy',
                name: '共有の基本方針',
                description: 'My-Condition-Bookの共有の基本方針の定義です。',
                _code: {
                    _value: 71,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: 'actor-category',
                        type: {
                            of: 'code',
                            _code: null,
                            candidate: {
                                ns: [
                                    'catalog/model/category/share/actor',
                                    'catalog/built_in/category/share/actor',
                                    'catalog/ext/{ext_name}/category/share/actor'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: '共有先のワークフロープロバイダーのカテゴリ'
                    },
                    {
                        key: 'workflow-category',
                        type: {
                            of: 'code',
                            _code: null,
                            candidate: {
                                ns: [
                                    'catalog/model/category/share/service',
                                    'catalog/built_in/category/share/service',
                                    'catalog/ext/{ext_name}/category/share/service'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: '共有先のワークフローのカテゴリ'
                    },
                    {
                        key: 'required-licence',
                        type: {
                            of: 'code[]',
                            _code: null,
                            candidate: {
                                ns: [
                                    'catalog/model/licence',
                                    'catalog/built_in/licence',
                                    'catalog/ext/{ext_name}/licence'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: '共有先のWF職員が保有している必要のあるライセンス'
                    },
                    {
                        key: 'data-category',
                        type: {
                            of: 'code[]',
                            _code: null,
                            candidate: {
                                ns: [
                                    'catalog/model/category/data',
                                    'catalog/built_in/category/data',
                                    'catalog/ext/{ext_name}/category/data'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: '選択した共有するデータカテゴリ'
                    },
                    {
                        key: 'data-type',
                        type: {
                            of: 'code[]',
                            _code: null,
                            candidate: {
                                ns: [
                                    'catalog/model/thing',
                                    'catalog/built_in/thing',
                                    'catalog/ext/{ext_name}/thing',
                                    'catalog/model/event',
                                    'catalog/built_in/event',
                                    'catalog/ext/{ext_name}/event',
                                    'catalog/model/document',
                                    'catalog/built_in/document',
                                    'catalog/ext/{ext_name}/document',
                                    'catalog/model/ctoken',
                                    'catalog/built_in/ctoken',
                                    'catalog/ext/{ext_name}/ctoken'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: '共有するデータ種'
                    }
                ],
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/book/access-log',
                name: 'アクセスログ',
                description: 'My-Condition-Bookのアクセスログの定義です。',
                _code: {
                    _value: 72,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: 'actor',
                        type: {
                            of: 'code',
                            _code: null,
                            candidate: {
                                ns: null,
                                _code: null,
                                base: {
                                    _value: 36,
                                    _ver: 1
                                }
                            }
                        },
                        description: 'データにアクセスした組織'
                    },
                    {
                        key: 'other_no',
                        type: {
                            of: 'number',
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '他人No'
                    },
                    {
                        key: 'at',
                        type: {
                            of: 'string',
                            format: {
                                _value: 6,
                                _ver: 1
                            },
                            unit: null
                        },
                        description: 'データにアクセスした時刻'
                    },
                    {
                        key: 'data-type',
                        type: {
                            of: 'code[]',
                            _code: null,
                            candidate: {
                                ns: [
                                    'catalog/model/thing',
                                    'catalog/built_in/thing',
                                    'catalog/ext/{ext_name}/thing',
                                    'catalog/model/event',
                                    'catalog/built_in/event',
                                    'catalog/ext/{ext_name}/event',
                                    'catalog/model/document',
                                    'catalog/built_in/document',
                                    'catalog/ext/{ext_name}/document',
                                    'catalog/model/ctoken',
                                    'catalog/built_in/ctoken',
                                    'catalog/ext/{ext_name}/ctoken'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: 'データ種'
                    }
                ],
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/processing',
                name: '加工処理',
                description: '加工処理の定義です。',
                _code: {
                    _value: 73,
                    _ver: 1
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: 'thing_type',
                        type: {
                            of: 'code',
                            _code: null,
                            candidate: {
                                ns: [
                                    'catalog/model/thing/*',
                                    'catalog/built_in/thing/*',
                                    'catalog/ext/{ext_name}/thing/*'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: '加工処理対象のモノの種類'
                    },
                    {
                        key: 'event_type',
                        type: {
                            of: 'code',
                            _code: null,
                            candidate: {
                                ns: [
                                    'catalog/model/event/*',
                                    'catalog/built_in/event/*',
                                    'catalog/ext/{ext_name}/event/*'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: '加工処理対象のイベントの種類'
                    },
                    {
                        key: 'document_type',
                        type: {
                            of: 'code',
                            _code: null,
                            candidate: {
                                ns: [
                                    'catalog/model/document/*',
                                    'catalog/built_in/document/*',
                                    'catalog/ext/{ext_name}/document/*'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: '加工処理対象のドキュメントの種類'
                    },
                    {
                        key: 'column',
                        type: {
                            of: 'inner[]',
                            inner: 'Column',
                            candidate: null
                        },
                        description: '加工処理対象のデータ列指定配列'
                    }
                ],
                value: null
            },
            inner: [
                {
                    name: 'Column',
                    description: '加工処理対象のデータ列',
                    template: {
                        inherit: null,
                        prop: [
                            {
                                key: 'index',
                                type: {
                                    of: 'string',
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: '加工処理対象のデータ列index'
                            },
                            {
                                key: 'processing',
                                type: {
                                    of: 'inner[]',
                                    inner: 'Processing',
                                    candidate: null
                                },
                                description: '加工処理方法配列'
                            }
                        ]
                    },
                    inner: [
                        {
                            name: 'Processing',
                            description: '加工処理方法',
                            template: {
                                inherit: null,
                                prop: [
                                    {
                                        key: 'method',
                                        type: {
                                            of: 'code',
                                            _code: null,
                                            candidate: {
                                                ns: [
                                                    'catalog/model/processing/method',
                                                    'catalog/built_in/processing/method',
                                                    'catalog/ext/{ext_name}/processing/method'
                                                ],
                                                _code: null,
                                                base: null
                                            }
                                        },
                                        description: '加工処理方法'
                                    },
                                    {
                                        key: 'parameter',
                                        type: {
                                            of: 'string[]',
                                            format: null,
                                            unit: null,
                                            candidate: null
                                        },
                                        description: '加工処理時に必要なパラメータ配列'
                                    }
                                ]
                            },
                            inner: null
                        }
                    ]
                }
            ],
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/unit/ratio',
                name: '%',
                description: '割合の単位（パーセント）の定義です。',
                _code: {
                    _value: 74,
                    _ver: 1
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/processing/method',
                name: 'masking',
                description: 'データ加工処理（マスキング）の定義です。第一引数はマスク桁数指定で、第二引数はマスク文字指定です。',
                _code: {
                    _value: 75,
                    _ver: 1
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/auth',
                name: '操作権',
                description: '操作権のテンプレートの定義です。',
                _code: {
                    _value: 76,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: 'auth-name',
                        type: {
                            of: 'string',
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '操作権定義名（各ネームスペース毎にユニークであること）'
                    }
                ],
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/processing/method',
                name: 'replace',
                description: 'データ加工処理（置換）の定義です。第一引数は置換後データです。',
                _code: {
                    _value: 77,
                    _ver: 1
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/processing',
                name: 'PXR-ID_Pseudonymisation',
                description: 'PXR-IDの仮名化処理の定義です。',
                _code: {
                    _value: 78,
                    _ver: 1
                },
                inherit: {
                    _value: 73,
                    _ver: 1
                }
            },
            template: {
                prop: null,
                value: [
                    {
                        key: 'column',
                        value: [
                            {
                                key: 'index',
                                value: '1_1'
                            },
                            {
                                key: 'processing',
                                value: [
                                    {
                                        key: 'method',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 77
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
                    }
                ]
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/data-supply-contract/condition',
                name: '対象者の範囲条件',
                description: 'データ提供対象者の範囲条件の定義です。値が範囲内に含まれる個人属性情報を持つ個人を対象者とします。',
                _code: {
                    _value: 79,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: 'item-type',
                        type: {
                            of: 'code',
                            candidate: {
                                ns: [
                                    'catalog/model/person/item-type',
                                    'catalog/built_in/person/item-type',
                                    'catalog/ext/{ext_name}/person/item-type'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: '条件となる個人属性情報カタログコード'
                    },
                    {
                        key: 'min',
                        type: {
                            of: 'number',
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '最小値'
                    },
                    {
                        key: 'max',
                        type: {
                            of: 'number',
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '最大値'
                    }
                ],
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/format',
                name: 'HH形式',
                description: '時刻の値フォーマット（HH形式）の定義です。',
                _code: {
                    _value: 80,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/format',
                name: 'HHmm形式',
                description: '時刻の値フォーマット（HHmm形式）の定義です。',
                _code: {
                    _value: 81,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/format',
                name: 'HHmmss形式',
                description: '時刻の値フォーマット（HHmmss形式）の定義です。',
                _code: {
                    _value: 82,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/format',
                name: 'HHmmss.S形式',
                description: '時刻の値フォーマット（HHmmss.S形式）の定義です。',
                _code: {
                    _value: 83,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/format',
                name: 'HHmmss.SS形式',
                description: '時刻の値フォーマット（HHmmss.SS形式）の定義です。',
                _code: {
                    _value: 84,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/format',
                name: 'HHmmss.SSS形式',
                description: '時刻の値フォーマット（HHmmss.SSS形式）の定義です。',
                _code: {
                    _value: 85,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/attribute/constraint/store',
                name: 'constraint-store',
                description: '蓄積制約（必要ライセンス）の定義です。attributeに設定されます。key名は[constraint-store]です。',
                _code: {
                    _value: 86,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: 'required-licence',
                        type: {
                            of: 'code[]',
                            candidate: {
                                ns: [
                                    'catalog/model/licence',
                                    'catalog/built_in/licence',
                                    'catalog/ext/{ext_name}/licence'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: '蓄積必要ライセンス（蓄積するオペレーターのライセンスを限定したい場合に設定する）'
                    }
                ],
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/format',
                name: 'yyyyMM形式',
                description: '時刻の値フォーマット（yyyyMM形式）の定義です。',
                _code: {
                    _value: 87,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/format',
                name: 'yyyy形式',
                description: '時刻の値フォーマット（yyyy形式）の定義です。',
                _code: {
                    _value: 88,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/format',
                name: 'yyyyMMddTHHmmssZ形式',
                description: '時刻の値フォーマット（yyyyMMddTHHmmssZ形式）の定義です。',
                _code: {
                    _value: 89,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/format',
                name: 'yyyyMMddTHHmmZ形式',
                description: '時刻の値フォーマット（yyyyMMddTHHmmZ形式）の定義です。',
                _code: {
                    _value: 90,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/format',
                name: 'yyyyMMddTHHmmss.SSZ形式',
                description: '時刻の値フォーマット（yyyyMMddTHHmmss.SSZ形式）の定義です。',
                _code: {
                    _value: 92,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/format',
                name: 'yyyyMMddTHHmmss.SZ形式',
                description: '時刻の値フォーマット（yyyyMMddTHHmmss.SZ形式）の定義です。',
                _code: {
                    _value: 93,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/book/policy',
                name: '提供の基本方針',
                description: 'My-Condition-Bookの提供の基本方針の定義です。',
                _code: {
                    _value: 94,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: 'actor-category',
                        type: {
                            of: 'code',
                            _code: null,
                            candidate: {
                                ns: [
                                    'catalog/model/category/supply/actor',
                                    'catalog/built_in/category/supply/actor',
                                    'catalog/ext/{ext_name}/category/supply/actor'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: '提供先のアクターカテゴリ'
                    },
                    {
                        key: 'purpose-category',
                        type: {
                            of: 'code',
                            _code: null,
                            candidate: {
                                ns: [
                                    'catalog/model/category/supply/purpose',
                                    'catalog/built_in/category/supply/purpose',
                                    'catalog/ext/{ext_name}/category/supply/purpose'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: '提供先の利用目的カテゴリ'
                    },
                    {
                        key: 'data-category',
                        type: {
                            of: 'code[]',
                            _code: null,
                            candidate: {
                                ns: [
                                    'catalog/model/category/data',
                                    'catalog/built_in/category/data',
                                    'catalog/ext/{ext_name}/category/data'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: '選択した提供するデータカテゴリ'
                    },
                    {
                        key: 'data-type',
                        type: {
                            of: 'code[]',
                            _code: null,
                            candidate: {
                                ns: [
                                    'catalog/model/thing',
                                    'catalog/built_in/thing',
                                    'catalog/ext/{ext_name}/thing',
                                    'catalog/model/event',
                                    'catalog/built_in/event',
                                    'catalog/ext/{ext_name}/event',
                                    'catalog/model/document',
                                    'catalog/built_in/document',
                                    'catalog/ext/{ext_name}/document'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: '提供するデータ種'
                    },
                    {
                        key: 'required-processing',
                        type: {
                            of: 'code[]',
                            _code: null,
                            candidate: {
                                ns: [
                                    'catalog/model/processing',
                                    'catalog/built_in/processing',
                                    'catalog/ext/{ext_name}/processing'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: '必須加工処理'
                    }
                ],
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/data-supply-contract',
                name: 'データ提供契約申込書',
                description: 'データ提供契約申込書の定義です。',
                _code: {
                    _value: 95,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: 'dataTrader',
                        type: {
                            of: 'code',
                            candidate: {
                                ns: null,
                                _code: null,
                                base: {
                                    _value: 38,
                                    _ver: 1
                                }
                            }
                        },
                        description: '対象のデータ取引SP'
                    },
                    {
                        key: 'title',
                        type: {
                            of: 'string',
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'データ提供契約申込のタイトル'
                    },
                    {
                        key: 'purpose',
                        type: {
                            of: 'item[]',
                            _code: null,
                            candidate: {
                                ns: null,
                                _code: [
                                    {
                                        _value: 61,
                                        _ver: 1
                                    }
                                ],
                                base: null
                            }
                        },
                        description: '利用目的'
                    },
                    {
                        key: 'targetCondition',
                        type: {
                            of: 'item',
                            candidate: {
                                ns: null,
                                _code: null,
                                base: {
                                    _value: 68,
                                    _ver: null
                                }
                            }
                        },
                        description: '対象者条件'
                    },
                    {
                        key: 'dataType',
                        type: {
                            of: 'inner[]',
                            inner: 'DataType',
                            candidate: null
                        },
                        description: '契約で取得するデータ種/量'
                    },
                    {
                        key: 'isDraft',
                        type: {
                            of: 'boolean'
                        },
                        description: '下書きフラグ'
                    }
                ],
                value: null
            },
            inner: [
                {
                    name: 'DataType',
                    description: '契約で取得するデータ種/量',
                    template: {
                        inherit: null,
                        prop: [
                            {
                                key: 'code',
                                type: {
                                    of: 'code',
                                    candidate: {
                                        ns: [
                                            'catalog/model/thing',
                                            'catalog/built_in/thing',
                                            'catalog/ext/{ext_name}/thing',
                                            'catalog/model/event',
                                            'catalog/built_in/event',
                                            'catalog/ext/{ext_name}/event',
                                            'catalog/model/document',
                                            'catalog/built_in/document',
                                            'catalog/ext/{ext_name}/document'
                                        ],
                                        _code: null,
                                        base: null
                                    }
                                },
                                description: '対象データ種別'
                            },
                            {
                                key: 'rate',
                                type: {
                                    of: 'number',
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: 'レート'
                            },
                            {
                                key: 'min',
                                type: {
                                    of: 'number',
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: '契約履行に必要な最小データ量'
                            },
                            {
                                key: 'max',
                                type: {
                                    of: 'number',
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: '契約履行が可能な最大データ量'
                            }
                        ]
                    },
                    inner: null
                }
            ],
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/cmatrix/4/4',
                name: 'モノを発生させたアクター識別子列',
                description: 'CMatrixのモノを発生させたアクター識別子列の定義です。',
                _code: {
                    _value: 96,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: '@value',
                        type: {
                            of: 'code',
                            cmatrix: {
                                index: '4_4_1',
                                reserved: true
                            },
                            _code: null,
                            candidate: null
                        }
                    }
                ],
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/cmatrix/4/4',
                name: 'ワークフロー識別子列',
                description: 'CMatrixのワークフロー識別子列の定義です。',
                _code: {
                    _value: 97,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: '@value',
                        type: {
                            of: 'code',
                            cmatrix: {
                                index: '4_4_2',
                                reserved: true
                            },
                            _code: null,
                            candidate: null
                        }
                    }
                ],
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/cmatrix/4/4',
                name: 'ワークフローロール識別子列',
                description: 'CMatrixのワークフローロール識別子列の定義です。',
                _code: {
                    _value: 98,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: '@value',
                        type: {
                            of: 'code',
                            cmatrix: {
                                index: '4_4_3',
                                reserved: true
                            },
                            _code: null,
                            candidate: null
                        }
                    }
                ],
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/cmatrix/4/4',
                name: 'ワークフロー職員識別子列',
                description: 'CMatrixのワークフロー職員識別子列の定義です。',
                _code: {
                    _value: 99,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: '@value',
                        type: {
                            of: 'string',
                            cmatrix: {
                                index: '4_4_4',
                                reserved: true
                            },
                            format: null,
                            unit: null,
                            candidate: null
                        }
                    }
                ],
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/cmatrix/4/4',
                name: 'アプリケーション識別子列',
                description: 'CMatrixのアプリケーション識別子列の定義です。',
                _code: {
                    _value: 100,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: '@value',
                        type: {
                            of: 'code',
                            cmatrix: {
                                index: '4_4_5',
                                reserved: true
                            },
                            _code: null,
                            candidate: null
                        }
                    }
                ],
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/cmatrix/2/3',
                name: 'ドキュメントを発生させたアクター識別子列',
                description: 'CMatrixのドキュメントを発生させたアクター識別子列の定義です。',
                _code: {
                    _value: 101,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: '@value',
                        type: {
                            of: 'code',
                            cmatrix: {
                                index: '2_3_1',
                                reserved: true
                            },
                            _code: null,
                            candidate: null
                        }
                    }
                ],
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/cmatrix/2/3',
                name: 'ワークフロー識別子列',
                description: 'CMatrixのワークフロー識別子列の定義です。',
                _code: {
                    _value: 102,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: '@value',
                        type: {
                            of: 'code',
                            cmatrix: {
                                index: '2_3_2',
                                reserved: true
                            },
                            _code: null,
                            candidate: null
                        }
                    }
                ],
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/cmatrix/2/3',
                name: 'ワークフローロール識別子列',
                description: 'CMatrixのワークフローロール識別子列の定義です。',
                _code: {
                    _value: 103,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: '@value',
                        type: {
                            of: 'code',
                            cmatrix: {
                                index: '2_3_3',
                                reserved: true
                            },
                            _code: null,
                            candidate: null
                        }
                    }
                ],
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/cmatrix/2/3',
                name: 'ワークフロー職員識別子列',
                description: 'CMatrixのワークフロー職員識別子列の定義です。',
                _code: {
                    _value: 104,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: '@value',
                        type: {
                            of: 'string',
                            cmatrix: {
                                index: '2_3_4',
                                reserved: true
                            },
                            format: null,
                            unit: null,
                            candidate: null
                        }
                    }
                ],
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/cmatrix/2/3',
                name: 'アプリケーション識別子列',
                description: 'CMatrixのアプリケーション識別子列の定義です。',
                _code: {
                    _value: 105,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: '@value',
                        type: {
                            of: 'code',
                            cmatrix: {
                                index: '2_3_5',
                                reserved: true
                            },
                            _code: null,
                            candidate: null
                        }
                    }
                ],
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/person',
                name: '個人属性',
                description: '個人属性の定義です。',
                _code: {
                    _value: 106,
                    _ver: 1
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: 'item-group',
                        type: {
                            of: 'inner[]',
                            inner: 'ItemGroup',
                            candidate: null
                        },
                        description: '個人属性グループの配列'
                    }
                ],
                value: null
            },
            inner: [
                {
                    name: 'ItemGroup',
                    description: '個人属性グループ',
                    template: {
                        inherit: null,
                        prop: [
                            {
                                key: 'title',
                                type: {
                                    of: 'string',
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: 'タイトル'
                            },
                            {
                                key: 'item',
                                type: {
                                    of: 'inner[]',
                                    inner: 'Item',
                                    candidate: null
                                },
                                description: '個人属性項目の配列'
                            }
                        ]
                    },
                    inner: [
                        {
                            name: 'Item',
                            description: '個人属性項目',
                            template: {
                                inherit: null,
                                prop: [
                                    {
                                        key: 'title',
                                        type: {
                                            of: 'string',
                                            format: null,
                                            unit: null,
                                            candidate: null
                                        },
                                        description: 'タイトル'
                                    },
                                    {
                                        key: 'type',
                                        type: {
                                            of: 'code',
                                            candidate: {
                                                ns: [
                                                    'catalog/model/person/item-type',
                                                    'catalog/built_in/person/item-type',
                                                    'catalog/ext/{ext_name}/person/item-type'
                                                ],
                                                _code: null,
                                                base: null
                                            }
                                        },
                                        description: '種別'
                                    },
                                    {
                                        key: 'content',
                                        type: {
                                            of: 'string[]',
                                            format: null,
                                            unit: null,
                                            candidate: null
                                        },
                                        description: '設定値'
                                    },
                                    {
                                        key: 'changable-flag',
                                        type: {
                                            of: 'boolean'
                                        },
                                        description: '個人による変更可能フラグ'
                                    }
                                ]
                            },
                            inner: null
                        }
                    ]
                }
            ],
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/person/identification',
                name: '本人性確認事項',
                description: '本人性確認事項の定義です。',
                _code: {
                    _value: 107,
                    _ver: 1
                },
                inherit: {
                    _value: 106,
                    _ver: 1
                }
            },
            template: {
                prop: [
                    {
                        key: 'verification-ratio',
                        type: {
                            of: 'number',
                            format: null,
                            unit: {
                                _value: 20009,
                                _ver: 1
                            },
                            candidate: null
                        },
                        description: '本人性の検証率'
                    }
                ],
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/qualitative/experience',
                name: 'あり',
                description: 'あり・なし（有無）の候補値（あり）の定義です。',
                _code: {
                    _value: 108,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/qualitative/experience',
                name: 'なし',
                description: 'あり・なし（有無）の候補値（なし）の定義です。',
                _code: {
                    _value: 109,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/qualitative/Yes_or_No',
                name: 'はい',
                description: 'はい・いいえの候補値（はい）の定義です。',
                _code: {
                    _value: 110,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/qualitative/Yes_or_No',
                name: 'いいえ',
                description: 'はい・いいえの候補値（いいえ）の定義です。',
                _code: {
                    _value: 111,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/thing/qa/group',
                name: '質問グループ',
                description: '質問グループの定義です。質問グループ名をname, その説明をdescriptionに記載して、カタログを作成しグループとなる質問のqa-groupにcodeを付与してください。',
                _code: {
                    _value: 112,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/thing/qa',
                name: '定量値回答式の質問',
                description: '定量値回答式の質問の定義です。',
                _code: {
                    _value: 114,
                    _ver: null
                },
                inherit: {
                    _value: 55,
                    _ver: 1
                }
            },
            template: {
                prop: [
                    {
                        key: 'answer',
                        type: {
                            of: 'inner',
                            inner: 'Answer'
                        },
                        description: '回答'
                    },
                    {
                        key: 'qa-group',
                        type: {
                            of: 'code',
                            candidate: {
                                ns: null,
                                _code: null,
                                base: {
                                    _value: 112,
                                    _ver: 1
                                }
                            },
                            cmatrix: {
                                index: '4_2_2_2',
                                reserved: false
                            }
                        },
                        description: '質問グループ'
                    },
                    {
                        key: 'qa-group-branch-number',
                        type: {
                            of: 'number',
                            format: null,
                            unit: null,
                            candidate: null,
                            cmatrix: {
                                index: '4_2_2_3',
                                reserved: false
                            }
                        },
                        description: '質問グループ枝番'
                    }
                ],
                value: null
            },
            inner: [
                {
                    name: 'Answer',
                    template: {
                        inherit: null,
                        prop: [
                            {
                                key: 'quantitative',
                                type: {
                                    of: 'string',
                                    format: null,
                                    unit: null,
                                    cmatrix: {
                                        index: '4_2_2_1',
                                        reserved: false
                                    }
                                },
                                description: '定量値'
                            }
                        ]
                    },
                    inner: null
                }
            ],
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/thing/autocode',
                name: 'codeの_valueのみ',
                description: 'codeの_valueのみの定義です。',
                _code: {
                    _value: 201,
                    _ver: 1
                },
                inherit: {
                    _value: 55,
                    _ver: 1
                }
            },
            template: {
                prop: null,
                value: [
                    {
                        key: 'code',
                        value: [
                            {
                                key: '_value',
                                value: 2010
                            },
                            {
                                key: '_ver',
                                value: null
                            }
                        ]
                    }
                ]
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/thing/autocode',
                name: 'codeの_verのみ',
                description: 'codeの_verのみの定義です。',
                _code: {
                    _value: 202,
                    _ver: 1
                },
                inherit: {
                    _value: 55,
                    _ver: 1
                }
            },
            template: {
                prop: null,
                value: [
                    {
                        key: 'code',
                        value: [
                            {
                                key: '_value',
                                value: null
                            },
                            {
                                key: '_ver',
                                value: 2020
                            }
                        ]
                    }
                ]
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/thing/autocode',
                name: 'codeの_value、_verがnull',
                description: 'codeの_value、_verがnullの定義です。',
                _code: {
                    _value: 203,
                    _ver: 1
                },
                inherit: {
                    _value: 55,
                    _ver: 1
                }
            },
            template: {
                prop: null,
                value: [
                    {
                        key: 'code',
                        value: [
                            {
                                key: '_value',
                                value: null
                            },
                            {
                                key: '_ver',
                                value: null
                            }
                        ]
                    }
                ]
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/thing/autocode',
                name: 'codeの_value、_ver以外',
                description: 'codeの_value、_ver以外の定義です。',
                _code: {
                    _value: 204,
                    _ver: 1
                },
                inherit: {
                    _value: 55,
                    _ver: 1
                }
            },
            template: {
                prop: [
                    {
                        key: 'code',
                        type: {
                            of: 'string',
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'コード'
                    }
                ],
                value: [
                    {
                        key: 'code',
                        value: 'テストコード'
                    }
                ]
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/thing/autocode',
                name: 'codeの_ver違い',
                description: 'codeの_ver違いの定義です。',
                _code: {
                    _value: 205,
                    _ver: 3
                },
                inherit: {
                    _value: 55,
                    _ver: 1
                }
            },
            template: {
                prop: null,
                value: [
                    {
                        key: 'code',
                        value: [
                            {
                                key: '_value',
                                value: 205
                            },
                            {
                                key: '_ver',
                                value: 1
                            }
                        ]
                    }
                ]
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/setting/actor/data-trader',
                name: 'setting',
                description: '流通制御によるデータ取引サービスプロバイダーのアクター個別設定の定義です。',
                _code: {
                    _value: 115,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: 'certify-consumer',
                        type: {
                            of: 'boolean'
                        },
                        description: 'Consumer認定権限有無'
                    },
                    {
                        key: 'create-book',
                        type: {
                            of: 'boolean'
                        },
                        description: 'Book開設権限有無'
                    },
                    {
                        key: 'auth',
                        type: {
                            of: 'code[]',
                            _code: null,
                            candidate: {
                                ns: [
                                    'catalog/model/auth/*'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: '操作権の配列'
                    }
                ],
                value: [
                    {
                        key: 'auth',
                        value: [
                            {
                                key: '_value',
                                value: 139
                            },
                            {
                                key: '_ver',
                                value: 1
                            }
                        ]
                    },
                    {
                        key: 'auth',
                        value: [
                            {
                                key: '_value',
                                value: 140
                            },
                            {
                                key: '_ver',
                                value: 1
                            }
                        ]
                    },
                    {
                        key: 'auth',
                        value: [
                            {
                                key: '_value',
                                value: 141
                            },
                            {
                                key: '_ver',
                                value: 1
                            }
                        ]
                    },
                    {
                        key: 'auth',
                        value: [
                            {
                                key: '_value',
                                value: 142
                            },
                            {
                                key: '_ver',
                                value: 1
                            }
                        ]
                    },
                    {
                        key: 'auth',
                        value: [
                            {
                                key: '_value',
                                value: 143
                            },
                            {
                                key: '_ver',
                                value: 1
                            }
                        ]
                    },
                    {
                        key: 'auth',
                        value: [
                            {
                                key: '_value',
                                value: 144
                            },
                            {
                                key: '_ver',
                                value: 1
                            }
                        ]
                    },
                    {
                        key: 'auth',
                        value: [
                            {
                                key: '_value',
                                value: 147
                            },
                            {
                                key: '_ver',
                                value: 1
                            }
                        ]
                    },
                    {
                        key: 'auth',
                        value: [
                            {
                                key: '_value',
                                value: 149
                            },
                            {
                                key: '_ver',
                                value: 1
                            }
                        ]
                    },
                    {
                        key: 'auth',
                        value: [
                            {
                                key: '_value',
                                value: 152
                            },
                            {
                                key: '_ver',
                                value: 1
                            }
                        ]
                    },
                    {
                        key: 'auth',
                        value: [
                            {
                                key: '_value',
                                value: 153
                            },
                            {
                                key: '_ver',
                                value: 1
                            }
                        ]
                    }
                ]
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/notification/アクター認定申請',
                name: '承認要求',
                description: 'アクターン認定申請の承認要求の通知カテゴリの定義です。',
                _code: {
                    _value: 117,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: null,
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/notification/アクター認定申請',
                name: '承認',
                description: 'アクター認定申請の承認の通知カテゴリの定義です。',
                _code: {
                    _value: 118,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: null,
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/notification/アクター認定申請',
                name: '否認',
                description: 'アクター認定申請の否認の通知カテゴリの定義です。',
                _code: {
                    _value: 119,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: null,
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/notification/Region参加申請',
                name: '承認要求',
                description: 'Region参加申請の承認要求の通知カテゴリの定義です。',
                _code: {
                    _value: 120,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: null,
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/notification/Region参加申請',
                name: '承認',
                description: 'Region参加申請の承認の通知カテゴリの定義です。',
                _code: {
                    _value: 121,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: null,
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/notification/Region参加申請',
                name: '否認',
                description: 'Region参加申請の否認の通知カテゴリの定義です。',
                _code: {
                    _value: 122,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: null,
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/notification/提携申請',
                name: '承認要求',
                description: '提携申請の承認要求の通知カテゴリの定義です。',
                _code: {
                    _value: 123,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: null,
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/notification/提携申請',
                name: '承認',
                description: '提携申請の承認の通知カテゴリの定義です。',
                _code: {
                    _value: 124,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: null,
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/notification/提携申請',
                name: '否認',
                description: '提携申請の否認の通知カテゴリの定義です。',
                _code: {
                    _value: 125,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: null,
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/notification',
                name: '通知',
                description: 'メッセージ送付で使用する通知カテゴリの定義です。',
                _code: {
                    _value: 126,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: null,
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/setting/actor/app',
                name: 'setting',
                description: '流通制御によるアプリケーションプロバイダーのアクター個別設定の定義です。',
                _code: {
                    _value: 127,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: 'auth',
                        type: {
                            of: 'code[]',
                            _code: null,
                            candidate: {
                                ns: [
                                    'catalog/model/auth/*'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: '操作権の配列'
                    }
                ],
                value: [
                    {
                        key: 'auth',
                        value: [
                            {
                                key: '_value',
                                value: 139
                            },
                            {
                                key: '_ver',
                                value: 1
                            }
                        ]
                    },
                    {
                        key: 'auth',
                        value: [
                            {
                                key: '_value',
                                value: 140
                            },
                            {
                                key: '_ver',
                                value: 1
                            }
                        ]
                    },
                    {
                        key: 'auth',
                        value: [
                            {
                                key: '_value',
                                value: 141
                            },
                            {
                                key: '_ver',
                                value: 1
                            }
                        ]
                    },
                    {
                        key: 'auth',
                        value: [
                            {
                                key: '_value',
                                value: 144
                            },
                            {
                                key: '_ver',
                                value: 1
                            }
                        ]
                    },
                    {
                        key: 'auth',
                        value: [
                            {
                                key: '_value',
                                value: 147
                            },
                            {
                                key: '_ver',
                                value: 1
                            }
                        ]
                    },
                    {
                        key: 'auth',
                        value: [
                            {
                                key: '_value',
                                value: 148
                            },
                            {
                                key: '_ver',
                                value: 1
                            }
                        ]
                    },
                    {
                        key: 'auth',
                        value: [
                            {
                                key: '_value',
                                value: 149
                            },
                            {
                                key: '_ver',
                                value: 1
                            }
                        ]
                    },
                    {
                        key: 'auth',
                        value: [
                            {
                                key: '_value',
                                value: 150
                            },
                            {
                                key: '_ver',
                                value: 1
                            }
                        ]
                    },
                    {
                        key: 'auth',
                        value: [
                            {
                                key: '_value',
                                value: 151
                            },
                            {
                                key: '_ver',
                                value: 1
                            }
                        ]
                    }
                ]
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/setting/actor/consumer',
                name: 'setting',
                description: '流通制御によるデータコンシューマーのアクター個別設定の定義です。',
                _code: {
                    _value: 128,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: 'auth',
                        type: {
                            of: 'code[]',
                            _code: null,
                            candidate: {
                                ns: [
                                    'catalog/model/auth/*'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: '操作権の配列'
                    }
                ],
                value: [
                    {
                        key: 'auth',
                        value: [
                            {
                                key: '_value',
                                value: 139
                            },
                            {
                                key: '_ver',
                                value: 1
                            }
                        ]
                    },
                    {
                        key: 'auth',
                        value: [
                            {
                                key: '_value',
                                value: 140
                            },
                            {
                                key: '_ver',
                                value: 1
                            }
                        ]
                    },
                    {
                        key: 'auth',
                        value: [
                            {
                                key: '_value',
                                value: 141
                            },
                            {
                                key: '_ver',
                                value: 1
                            }
                        ]
                    },
                    {
                        key: 'auth',
                        value: [
                            {
                                key: '_value',
                                value: 144
                            },
                            {
                                key: '_ver',
                                value: 1
                            }
                        ]
                    },
                    {
                        key: 'auth',
                        value: [
                            {
                                key: '_value',
                                value: 147
                            },
                            {
                                key: '_ver',
                                value: 1
                            }
                        ]
                    },
                    {
                        key: 'auth',
                        value: [
                            {
                                key: '_value',
                                value: 149
                            },
                            {
                                key: '_ver',
                                value: 1
                            }
                        ]
                    },
                    {
                        key: 'auth',
                        value: [
                            {
                                key: '_value',
                                value: 152
                            },
                            {
                                key: '_ver',
                                value: 1
                            }
                        ]
                    },
                    {
                        key: 'auth',
                        value: [
                            {
                                key: '_value',
                                value: 153
                            },
                            {
                                key: '_ver',
                                value: 1
                            }
                        ]
                    }
                ]
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/setting/actor/pxr',
                name: 'setting',
                description: '流通制御によるPXRポータルの個別設定の定義です。',
                _code: {
                    _value: 129,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: null,
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/setting/actor/pxr-root',
                name: 'setting',
                description: '流通制御による流通制御サービスプロバイダーのアクター個別設定の定義です。',
                _code: {
                    _value: 130,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: 'auth',
                        type: {
                            of: 'code[]',
                            _code: null,
                            candidate: {
                                ns: [
                                    'catalog/model/auth/*'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: '操作権の配列'
                    },
                    {
                        key: 'pxr-root-name',
                        type: {
                            of: 'string',
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '流通制御サービスプロバイダーの呼称'
                    },
                    {
                        key: 'identification-checklist',
                        type: {
                            of: 'code[]',
                            candidate: {
                                ns: [
                                    'catalog/model/person/item-type',
                                    'catalog/built_in/person/item-type',
                                    'catalog/ext/{ext_name}/person/item-type'
                                ],
                                _code: null,
                                base: null
                            },
                            cmatrix: null
                        },
                        description: '採用した本人性確認事項'
                    },
                    {
                        key: 'identification-document',
                        type: {
                            of: 'inner[]',
                            inner: 'Identification-document'
                        },
                        description: '採用した本人性確認書類'
                    },
                    {
                        key: 'store-distribution-ratio',
                        type: {
                            of: 'inner[]',
                            inner: 'DistributionRatio'
                        },
                        description: '蓄積分配比率'
                    },
                    {
                        key: 'supply-distribution-ratio',
                        type: {
                            of: 'inner[]',
                            inner: 'DistributionRatio'
                        },
                        description: '提供分配比率'
                    }
                ],
                value: [
                    {
                        key: 'auth',
                        value: [
                            {
                                key: '_value',
                                value: 139
                            },
                            {
                                key: '_ver',
                                value: 1
                            }
                        ]
                    },
                    {
                        key: 'auth',
                        value: [
                            {
                                key: '_value',
                                value: 140
                            },
                            {
                                key: '_ver',
                                value: 1
                            }
                        ]
                    },
                    {
                        key: 'auth',
                        value: [
                            {
                                key: '_value',
                                value: 141
                            },
                            {
                                key: '_ver',
                                value: 1
                            }
                        ]
                    },
                    {
                        key: 'auth',
                        value: [
                            {
                                key: '_value',
                                value: 142
                            },
                            {
                                key: '_ver',
                                value: 1
                            }
                        ]
                    },
                    {
                        key: 'auth',
                        value: [
                            {
                                key: '_value',
                                value: 144
                            },
                            {
                                key: '_ver',
                                value: 1
                            }
                        ]
                    },
                    {
                        key: 'auth',
                        value: [
                            {
                                key: '_value',
                                value: 147
                            },
                            {
                                key: '_ver',
                                value: 1
                            }
                        ]
                    },
                    {
                        key: 'auth',
                        value: [
                            {
                                key: '_value',
                                value: 149
                            },
                            {
                                key: '_ver',
                                value: 1
                            }
                        ]
                    },
                    {
                        key: 'auth',
                        value: [
                            {
                                key: '_value',
                                value: 155
                            },
                            {
                                key: '_ver',
                                value: 1
                            }
                        ]
                    }
                ]
            },
            inner: [
                {
                    name: 'Identification-document',
                    description: '採用した本人性確認書類',
                    template: {
                        inherit: null,
                        prop: [
                            {
                                key: 'document',
                                type: {
                                    of: 'code',
                                    candidate: {
                                        ns: [
                                            'catalog/model/person/identification',
                                            'catalog/built_in/person/identification',
                                            'catalog/ext/{ext_name}/person/identification'
                                        ],
                                        _code: null,
                                        base: null
                                    },
                                    cmatrix: null
                                },
                                description: '採用した本人性確認書類'
                            },
                            {
                                key: 'satisfaction-rate',
                                type: {
                                    of: 'number',
                                    format: {
                                        _value: 10002,
                                        _ver: 1
                                    },
                                    unit: null,
                                    cmatrix: null
                                },
                                description: '採用した本人性確認書類の充足度'
                            }
                        ]
                    },
                    inner: null
                },
                {
                    name: 'DistributionRatio',
                    description: '分配比率',
                    template: {
                        inherit: null,
                        prop: [
                            {
                                key: 'actor-type',
                                type: {
                                    of: 'string',
                                    format: null,
                                    unit: null,
                                    candidate: {
                                        value: [
                                            'pxr-root',
                                            'region-root',
                                            'app',
                                            'wf',
                                            'data-trader',
                                            'consumer'
                                        ]
                                    }
                                },
                                description: '対象のアクター種別'
                            },
                            {
                                key: 'ratio',
                                type: {
                                    of: 'number',
                                    format: {
                                        _value: 74,
                                        _ver: 1
                                    },
                                    unit: null,
                                    candidate: null
                                },
                                description: '対象のアクター種別への分配比率'
                            }
                        ]
                    },
                    inner: null
                }
            ],
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/setting/actor/wf',
                name: 'setting',
                description: '流通制御によるワークフロープロバイダーのアクター個別設定の定義です。',
                _code: {
                    _value: 131,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: 'auth',
                        type: {
                            of: 'code[]',
                            _code: null,
                            candidate: {
                                ns: [
                                    'catalog/model/auth/*'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: '操作権の配列'
                    }
                ],
                value: [
                    {
                        key: 'auth',
                        value: [
                            {
                                key: '_value',
                                value: 139
                            },
                            {
                                key: '_ver',
                                value: 1
                            }
                        ]
                    },
                    {
                        key: 'auth',
                        value: [
                            {
                                key: '_value',
                                value: 140
                            },
                            {
                                key: '_ver',
                                value: 1
                            }
                        ]
                    },
                    {
                        key: 'auth',
                        value: [
                            {
                                key: '_value',
                                value: 141
                            },
                            {
                                key: '_ver',
                                value: 1
                            }
                        ]
                    },
                    {
                        key: 'auth',
                        value: [
                            {
                                key: '_value',
                                value: 144
                            },
                            {
                                key: '_ver',
                                value: 1
                            }
                        ]
                    },
                    {
                        key: 'auth',
                        value: [
                            {
                                key: '_value',
                                value: 147
                            },
                            {
                                key: '_ver',
                                value: 1
                            }
                        ]
                    },
                    {
                        key: 'auth',
                        value: [
                            {
                                key: '_value',
                                value: 148
                            },
                            {
                                key: '_ver',
                                value: 1
                            }
                        ]
                    },
                    {
                        key: 'auth',
                        value: [
                            {
                                key: '_value',
                                value: 149
                            },
                            {
                                key: '_ver',
                                value: 1
                            }
                        ]
                    },
                    {
                        key: 'auth',
                        value: [
                            {
                                key: '_value',
                                value: 150
                            },
                            {
                                key: '_ver',
                                value: 1
                            }
                        ]
                    },
                    {
                        key: 'auth',
                        value: [
                            {
                                key: '_value',
                                value: 151
                            },
                            {
                                key: '_ver',
                                value: 1
                            }
                        ]
                    },
                    {
                        key: 'auth',
                        value: [
                            {
                                key: '_value',
                                value: 154
                            },
                            {
                                key: '_ver',
                                value: 1
                            }
                        ]
                    }
                ]
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/setting/actor/region-root',
                name: 'setting',
                description: '流通制御による領域運営サービスプロバイダーのアクター個別設定の定義です。',
                _code: {
                    _value: 132,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: 'certify-app',
                        type: {
                            of: 'boolean'
                        },
                        description: 'APP認定権限有無'
                    },
                    {
                        key: 'certify-wf',
                        type: {
                            of: 'boolean'
                        },
                        description: 'WF認定権限有無'
                    },
                    {
                        key: 'auth',
                        type: {
                            of: 'code[]',
                            _code: null,
                            candidate: {
                                ns: [
                                    'catalog/model/auth/*'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: '操作権の配列'
                    }
                ],
                value: [
                    {
                        key: 'auth',
                        value: [
                            {
                                key: '_value',
                                value: 139
                            },
                            {
                                key: '_ver',
                                value: 1
                            }
                        ]
                    },
                    {
                        key: 'auth',
                        value: [
                            {
                                key: '_value',
                                value: 140
                            },
                            {
                                key: '_ver',
                                value: 1
                            }
                        ]
                    },
                    {
                        key: 'auth',
                        value: [
                            {
                                key: '_value',
                                value: 141
                            },
                            {
                                key: '_ver',
                                value: 1
                            }
                        ]
                    },
                    {
                        key: 'auth',
                        value: [
                            {
                                key: '_value',
                                value: 144
                            },
                            {
                                key: '_ver',
                                value: 1
                            }
                        ]
                    },
                    {
                        key: 'auth',
                        value: [
                            {
                                key: '_value',
                                value: 147
                            },
                            {
                                key: '_ver',
                                value: 1
                            }
                        ]
                    },
                    {
                        key: 'auth',
                        value: [
                            {
                                key: '_value',
                                value: 149
                            },
                            {
                                key: '_ver',
                                value: 1
                            }
                        ]
                    },
                    {
                        key: 'auth',
                        value: [
                            {
                                key: '_value',
                                value: 150
                            },
                            {
                                key: '_ver',
                                value: 1
                            }
                        ]
                    },
                    {
                        key: 'auth',
                        value: [
                            {
                                key: '_value',
                                value: 151
                            },
                            {
                                key: '_ver',
                                value: 1
                            }
                        ]
                    },
                    {
                        key: 'auth',
                        value: [
                            {
                                key: '_value',
                                value: 152
                            },
                            {
                                key: '_ver',
                                value: 1
                            }
                        ]
                    },
                    {
                        key: 'auth',
                        value: [
                            {
                                key: '_value',
                                value: 153
                            },
                            {
                                key: '_ver',
                                value: 1
                            }
                        ]
                    }
                ]
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/notification/アクター認定申請',
                name: 'クライアント証明書取得',
                description: 'アクター認定申請のクライアント証明書取得の通知カテゴリの定義です。',
                _code: {
                    _value: 138,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: null,
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/auth/member',
                name: 'オペレーター追加',
                description: '運営メンバーの追加操作が可能。',
                _code: {
                    _value: 139,
                    _ver: null
                },
                inherit: {
                    _value: 76,
                    _ver: null
                }
            },
            template: {
                prop: null,
                value: [
                    {
                        key: 'auth-name',
                        value: 'add'
                    }
                ]
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/auth/member',
                name: 'オペレーター更新',
                description: '運営メンバーの更新操作が可能。',
                _code: {
                    _value: 140,
                    _ver: null
                },
                inherit: {
                    _value: 76,
                    _ver: null
                }
            },
            template: {
                prop: null,
                value: [
                    {
                        key: 'auth-name',
                        value: 'update'
                    }
                ]
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/auth/member',
                name: 'オペレーター削除',
                description: '運営メンバーの削除操作が可能。',
                _code: {
                    _value: 141,
                    _ver: null
                },
                inherit: {
                    _value: 76,
                    _ver: null
                }
            },
            template: {
                prop: null,
                value: [
                    {
                        key: 'auth-name',
                        value: 'delete'
                    }
                ]
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/auth/book',
                name: 'Book開設',
                description: 'My-Condition-Bookの開設操作が可能。',
                _code: {
                    _value: 142,
                    _ver: null
                },
                inherit: {
                    _value: 76,
                    _ver: null
                }
            },
            template: {
                prop: null,
                value: [
                    {
                        key: 'auth-name',
                        value: 'create'
                    }
                ]
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/auth/info-account',
                name: '情報口座開設',
                description: '情報口座の開設操作が可能。',
                _code: {
                    _value: 143,
                    _ver: null
                },
                inherit: {
                    _value: 76,
                    _ver: null
                }
            },
            template: {
                prop: null,
                value: [
                    {
                        key: 'auth-name',
                        value: 'create'
                    }
                ]
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/auth/actor',
                name: 'アクター認定申請',
                description: 'アクター認定の申請操作が可能。',
                _code: {
                    _value: 144,
                    _ver: null
                },
                inherit: {
                    _value: 76,
                    _ver: null
                }
            },
            template: {
                prop: null,
                value: [
                    {
                        key: 'auth-name',
                        value: 'application'
                    }
                ]
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/notification/本人性確認コード',
                name: '利用者ID連携用コード発行',
                description: '本人性確認コード発行の通知カテゴリの定義です。',
                _code: {
                    _value: 145,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: null,
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/notification/情報口座',
                name: '開設完了',
                description: '情報口座の開設完了の通知カテゴリの定義です。',
                _code: {
                    _value: 146,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: null,
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/auth/actor',
                name: 'アクター認定承認',
                description: 'アクター認定の承認操作が可能。',
                _code: {
                    _value: 147,
                    _ver: null
                },
                inherit: {
                    _value: 76,
                    _ver: null
                }
            },
            template: {
                prop: null,
                value: [
                    {
                        key: 'auth-name',
                        value: 'approval'
                    }
                ]
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/auth/app-wf-user',
                name: '利用者作成',
                description: '利用者ID連携操作が可能。',
                _code: {
                    _value: 148,
                    _ver: null
                },
                inherit: {
                    _value: 76,
                    _ver: null
                }
            },
            template: {
                prop: null,
                value: [
                    {
                        key: 'auth-name',
                        value: 'create'
                    }
                ]
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/auth/catalog',
                name: '作成更新',
                description: 'カタログの更新（新規作成・編集・削除）操作が可能。',
                _code: {
                    _value: 149,
                    _ver: null
                },
                inherit: {
                    _value: 76,
                    _ver: null
                }
            },
            template: {
                prop: null,
                value: [
                    {
                        key: 'auth-name',
                        value: 'create'
                    }
                ]
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/auth/join',
                name: 'Region参加申請',
                description: 'Region参加・離脱の申請操作が可能。',
                _code: {
                    _value: 150,
                    _ver: null
                },
                inherit: {
                    _value: 76,
                    _ver: null
                }
            },
            template: {
                prop: null,
                value: [
                    {
                        key: 'auth-name',
                        value: 'application'
                    }
                ]
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/auth/join',
                name: 'Region参加承認',
                description: 'Region参加・離脱の承認操作が可能。',
                _code: {
                    _value: 151,
                    _ver: null
                },
                inherit: {
                    _value: 76,
                    _ver: null
                }
            },
            template: {
                prop: null,
                value: [
                    {
                        key: 'auth-name',
                        value: 'approval'
                    }
                ]
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/auth/alliance',
                name: '提携申請',
                description: '提携の申請操作が可能。',
                _code: {
                    _value: 152,
                    _ver: null
                },
                inherit: {
                    _value: 76,
                    _ver: null
                }
            },
            template: {
                prop: null,
                value: [
                    {
                        key: 'auth-name',
                        value: 'application'
                    }
                ]
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/auth/alliance',
                name: '提携承認',
                description: '提携の承認操作が可能。',
                _code: {
                    _value: 153,
                    _ver: null
                },
                inherit: {
                    _value: 76,
                    _ver: null
                }
            },
            template: {
                prop: null,
                value: [
                    {
                        key: 'auth-name',
                        value: 'approval'
                    }
                ]
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/auth/workflow',
                name: 'ワークフロー作成/更新',
                description: 'ワークフローの更新（新規作成・編集・削除）操作が可能。',
                _code: {
                    _value: 154,
                    _ver: null
                },
                inherit: {
                    _value: 76,
                    _ver: null
                }
            },
            template: {
                prop: null,
                value: [
                    {
                        key: 'auth-name',
                        value: 'create'
                    }
                ]
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/auth/setting',
                name: '編集',
                description: '設定の編集操作が可能。',
                _code: {
                    _value: 155,
                    _ver: null
                },
                inherit: {
                    _value: 76,
                    _ver: null
                }
            },
            template: {
                prop: null,
                value: [
                    {
                        key: 'auth-name',
                        value: 'update'
                    }
                ]
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/notification/利用者',
                name: '作成完了',
                description: '利用者の作成完了の通知カテゴリの定義です。',
                _code: {
                    _value: 156,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: null,
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/notification/アクター認定申請',
                name: '管理移行承認要求',
                description: 'アクター認定申請の管理移行承認要求の通知カテゴリの定義です。',
                _code: {
                    _value: 157,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: null,
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/notification/利用者',
                name: '削除完了',
                description: '利用者の削除完了の通知カテゴリの定義です。',
                _code: {
                    _value: 158,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: null,
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/attribute/category/data',
                name: 'データカテゴリ',
                description: 'データカテゴリの定義です。',
                _code: {
                    _value: 159,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: 'paint_color',
                        type: {
                            of: 'string',
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'データカテゴリの表示色（カラーコード指定）'
                    },
                    {
                        key: 'line_color',
                        type: {
                            of: 'string',
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'データカテゴリの線の色（カラーコード指定）'
                    }
                ],
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/setting/global',
                name: 'setting',
                description: 'システム全体のグローバル設定の定義です。',
                _code: {
                    _value: 160,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: 'system-name',
                        type: {
                            of: 'string',
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'PXRエコシステム基盤呼称'
                    },
                    {
                        key: 'portal-name',
                        type: {
                            of: 'string',
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '個人ポータル呼称'
                    },
                    {
                        key: 'coin-name',
                        type: {
                            of: 'string',
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'PXRコイン呼称'
                    },
                    {
                        key: 'book-name',
                        type: {
                            of: 'string',
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'My-Condition-Book呼称'
                    },
                    {
                        key: 'catalog-name',
                        type: {
                            of: 'string',
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'My-Condition-Dataカタログ呼称'
                    },
                    {
                        key: 'region-root-name',
                        type: {
                            of: 'string',
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '領域運営サービスプロバイダーの名称'
                    },
                    {
                        key: 'data-trader-name',
                        type: {
                            of: 'string',
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'データ取引サービスプロバイダーの呼称'
                    },
                    {
                        key: 'data-consumer-name',
                        type: {
                            of: 'string',
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'データコンシューマーの呼称'
                    },
                    {
                        key: 'app-p-name',
                        type: {
                            of: 'string',
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'アプリケーションプロバイダーの呼称'
                    },
                    {
                        key: 'wf-p-name',
                        type: {
                            of: 'string',
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'ワークフロープロバイダーの呼称'
                    },
                    {
                        key: 'workflow-name',
                        type: {
                            of: 'string',
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'ワークフローの呼称'
                    },
                    {
                        key: 'terms_of_service',
                        type: {
                            of: 'item',
                            _code: null,
                            candidate: {
                                ns: null,
                                _code: [
                                    {
                                        _value: 61,
                                        _ver: 1
                                    }
                                ],
                                base: null
                            }
                        },
                        description: '利用規約'
                    },
                    {
                        key: 'help_contact',
                        type: {
                            of: 'item',
                            _code: null,
                            candidate: {
                                ns: null,
                                _code: [
                                    {
                                        _value: 61,
                                        _ver: 1
                                    }
                                ],
                                base: null
                            }
                        },
                        description: 'ヘルプ・問い合わせ'
                    },
                    {
                        key: 'management_password_format',
                        type: {
                            of: 'string',
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '運営ポータル群のパスワードフォーマット'
                    },
                    {
                        key: 'management_format_errormessage',
                        type: {
                            of: 'string',
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '運営ポータル群のパスワードエラーメッセージ'
                    },
                    {
                        key: 'pxr_id_prefix',
                        type: {
                            of: 'string',
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'PXR-IDのprefix'
                    },
                    {
                        key: 'pxr_id_suffix',
                        type: {
                            of: 'string',
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'PXR-IDのsuffix'
                    },
                    {
                        key: 'pxr_id_password_format',
                        type: {
                            of: 'string',
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'PXR-IDのパスワードフォーマット'
                    },
                    {
                        key: 'pxr_id_format_errormessage',
                        type: {
                            of: 'string',
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'PXR-IDのパスワードエラーメッセージ'
                    },
                    {
                        key: 'identity-verification-expiration',
                        type: {
                            of: 'inner',
                            inner: 'Expiration'
                        },
                        description: '本人性確認コード有効期限'
                    },
                    {
                        key: 'password-expiration',
                        type: {
                            of: 'inner',
                            inner: 'Expiration'
                        },
                        description: 'パスワード有効期限'
                    },
                    {
                        key: 'password-generations-number',
                        type: {
                            of: 'number',
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'パスワード世代管理数'
                    },
                    {
                        key: 'session-expiration',
                        type: {
                            of: 'inner',
                            inner: 'Expiration'
                        },
                        description: 'セッション有効期限'
                    },
                    {
                        key: 'account-lock-count',
                        type: {
                            of: 'number',
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'アカウントロックまでの試行上限回数'
                    },
                    {
                        key: 'account-lock-release-time',
                        type: {
                            of: 'inner',
                            inner: 'Expiration'
                        },
                        description: 'アカウントロック解除までの時間'
                    },
                    {
                        key: 'one-time-login-code-expiration',
                        type: {
                            of: 'inner',
                            inner: 'Expiration'
                        },
                        description: 'ワンタイムログインコード有効期限'
                    },
                    {
                        key: 'onboarding_start',
                        type: {
                            of: 'item',
                            _code: null,
                            candidate: {
                                ns: null,
                                _code: [
                                    {
                                        _value: 61,
                                        _ver: 1
                                    }
                                ],
                                base: null
                            }
                        },
                        description: '個人ポータル開始時のオンボーディング記載内容'
                    },
                    {
                        key: 'onboarding_store',
                        type: {
                            of: 'item',
                            _code: null,
                            candidate: {
                                ns: null,
                                _code: [
                                    {
                                        _value: 61,
                                        _ver: 1
                                    }
                                ],
                                base: null
                            }
                        },
                        description: '個人ポータル蓄積設定時のオンボーディング記載内容'
                    },
                    {
                        key: 'login_sms_message',
                        type: {
                            of: 'string',
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '個人ポータルログイン時SMSメッセージ内容'
                    },
                    {
                        key: 'book_create_sms_message',
                        type: {
                            of: 'string',
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'Book作成時SMSメッセージ内容'
                    },
                    {
                        key: 'management_initial_login_description',
                        type: {
                            of: 'item',
                            _code: null,
                            candidate: {
                                ns: null,
                                _code: [
                                    {
                                        _value: 61,
                                        _ver: 1
                                    }
                                ],
                                base: null
                            }
                        },
                        description: '運営ポータル：初回ログインURL通知文書説明文'
                    },
                    {
                        key: 'personal_initial_login_description',
                        type: {
                            of: 'item',
                            _code: null,
                            candidate: {
                                ns: null,
                                _code: [
                                    {
                                        _value: 61,
                                        _ver: 1
                                    }
                                ],
                                base: null
                            }
                        },
                        description: 'Book開設時のQRコード通知文書説明文'
                    },
                    {
                        key: 'personal_disassociation',
                        type: {
                            of: 'boolean'
                        },
                        description: '個人ポータル：連携解除可否設定'
                    },
                    {
                        key: 'personal_two-step_verification',
                        type: {
                            of: 'boolean'
                        },
                        description: '個人ポータル：2段階認証解除可否設定'
                    },
                    {
                        key: 'personal_share_basic_policy',
                        type: {
                            of: 'boolean'
                        },
                        description: '個人ポータル：共有の基本方針可否設定'
                    },
                    {
                        key: 'personal_temporary_share',
                        type: {
                            of: 'boolean'
                        },
                        description: '個人ポータル：一時的共有の可否設定'
                    },
                    {
                        key: 'personal_account_delete',
                        type: {
                            of: 'boolean'
                        },
                        description: '個人ポータル：アカウント削除の可否設定'
                    },
                    {
                        key: 'personal_account_delete_ng_message',
                        type: {
                            of: 'string',
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '個人ポータル：アカウント削除できない設定時の表示メッセージ内容'
                    },
                    {
                        key: 'search_target_ns',
                        type: {
                            of: 'inner[]',
                            inner: 'SearchTargetNs',
                            candidate: null
                        },
                        description: '検索対象ネームスペース'
                    }
                ],
                value: null
            },
            inner: [
                {
                    name: 'Expiration',
                    description: '有効期限設定',
                    template: {
                        inherit: null,
                        prop: [
                            {
                                key: 'type',
                                type: {
                                    of: 'string',
                                    format: null,
                                    unit: null,
                                    candidate: {
                                        value: [
                                            'month',
                                            'day',
                                            'hour',
                                            'minute',
                                            'second'
                                        ]
                                    }
                                },
                                description: '設定種別'
                            },
                            {
                                key: 'value',
                                type: {
                                    of: 'number',
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: '設定値'
                            }
                        ]
                    },
                    inner: null
                },
                {
                    name: 'SearchTargetNs',
                    description: '検索対象ネームスペース',
                    template: {
                        inherit: null,
                        prop: [
                            {
                                key: 'name',
                                type: {
                                    of: 'string',
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: '名称'
                            },
                            {
                                key: 'ns',
                                type: {
                                    of: 'string',
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: 'ネームスペース'
                            }
                        ]
                    },
                    inner: null
                }
            ],
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/setting/actor-own/pxr-root',
                name: 'setting',
                description: 'アクターによる流通制御サービスプロバイダーのアクター個別設定の定義です。',
                _code: {
                    _value: 161,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: 'use_user_information',
                        type: {
                            of: 'boolean'
                        },
                        description: '利用者管理情報使用設定'
                    },
                    {
                        key: 'pxr-root-deployment-name',
                        type: {
                            of: 'string',
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '流通制御サービスプロバイダーの連絡先部署の呼称'
                    },
                    {
                        key: 'email-address',
                        type: {
                            of: 'string',
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '流通制御サービスプロバイダーの連絡先Eメールアドレス'
                    },
                    {
                        key: 'tel-number',
                        type: {
                            of: 'string',
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '流通制御サービスプロバイダーの連絡先電話番号'
                    },
                    {
                        key: 'address',
                        type: {
                            of: 'string',
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '流通制御サービスプロバイダーの住所'
                    },
                    {
                        key: 'information-site',
                        type: {
                            of: 'string',
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '流通制御サービスプロバイダーの情報サイト'
                    }
                ],
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/setting/actor-own/app',
                name: 'setting',
                description: 'アプリケーションプロバイダーによるアクター個別設定の定義です。',
                _code: {
                    _value: 162,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: 'use_user_information',
                        type: {
                            of: 'boolean'
                        },
                        description: '利用者管理情報使用設定'
                    }
                ],
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/setting/actor-own/consumer',
                name: 'setting',
                description: 'データコンシューマーによるアクター個別設定の定義です。',
                _code: {
                    _value: 163,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: 'use_user_information',
                        type: {
                            of: 'boolean'
                        },
                        description: '利用者管理情報使用設定'
                    }
                ],
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/setting/actor-own/data-trader',
                name: 'setting',
                description: 'データ取引サービスプロバイダーによるアクター個別設定の定義です。',
                _code: {
                    _value: 164,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: 'use_user_information',
                        type: {
                            of: 'boolean'
                        },
                        description: '利用者管理情報使用設定'
                    }
                ],
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/setting/actor-own/pxr',
                name: 'setting',
                description: '流通制御によるPXRポータルの個別設定の定義です。',
                _code: {
                    _value: 165,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: null,
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/setting/actor-own/region-root',
                name: 'setting',
                description: '領域運営サービスプロバイダーによるアクター個別設定の定義です。',
                _code: {
                    _value: 167,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: 'use_user_information',
                        type: {
                            of: 'boolean'
                        },
                        description: '利用者管理情報使用設定'
                    }
                ],
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/setting/actor-own/wf',
                name: 'setting',
                description: 'ワークフロープロバイダーによるアクター個別設定の定義です。',
                _code: {
                    _value: 168,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: 'use_user_information',
                        type: {
                            of: 'boolean'
                        },
                        description: '利用者管理情報使用設定'
                    }
                ],
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/notification/データ提供',
                name: '契約申込承認要求',
                description: 'データ提供の契約申込承認要求の通知カテゴリの定義です。',
                _code: {
                    _value: 169,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: null,
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/notification/データ提供',
                name: '契約申込キャンセル',
                description: 'データ提供の契約申込キャンセルの通知カテゴリの定義です。',
                _code: {
                    _value: 170,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: null,
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/notification/データ提供',
                name: '契約申込承認',
                description: 'データ提供の契約申込承認の通知カテゴリの定義です。',
                _code: {
                    _value: 171,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: null,
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/notification/データ提供',
                name: '契約申込否認',
                description: 'データ提供の契約申込否認の通知カテゴリの定義です。',
                _code: {
                    _value: 172,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: null,
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/notification/データ提供',
                name: '契約合意依頼',
                description: 'データ提供の契約合意依頼の通知カテゴリの定義です。',
                _code: {
                    _value: 173,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: null,
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/notification/データ提供',
                name: '対価更新完了',
                description: 'データ提供の対価更新完了の通知カテゴリの定義です。',
                _code: {
                    _value: 174,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: null,
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/notification/データ提供',
                name: '契約合意',
                description: 'データ提供の契約合意の通知カテゴリの定義です。',
                _code: {
                    _value: 175,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: null,
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/notification/データ提供',
                name: '契約破棄',
                description: 'データ提供の契約破棄の通知カテゴリの定義です。',
                _code: {
                    _value: 176,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: null,
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/notification/データ提供',
                name: '契約締結',
                description: 'データ提供の契約締結の通知カテゴリの定義です。',
                _code: {
                    _value: 177,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: null,
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/notification/データ提供',
                name: '同意公開',
                description: 'データ提供の同意公開の通知カテゴリの定義です。',
                _code: {
                    _value: 178,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: null,
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/notification/データ提供',
                name: '履行準備要求',
                description: 'データ提供の履行準備要求の通知カテゴリの定義です。',
                _code: {
                    _value: 179,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: null,
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/notification/データ提供',
                name: '収集完了',
                description: 'データ提供の収集完了の通知カテゴリの定義です。',
                _code: {
                    _value: 180,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: null,
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/model/notification/本人性確認コード',
                name: '利用者ID連携解除用コード発行',
                description: '本人性確認コード発行の通知カテゴリの定義です。',
                _code: {
                    _value: 181,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: null,
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/format',
                name: '.nnne2',
                description: '有効数字の値フォーマット（整数部2桁、小数部1桁）の定義です。',
                _code: {
                    _value: 10001,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/format',
                name: '.nnne3',
                description: '有効数字の値フォーマット（整数部3桁）の定義です。',
                _code: {
                    _value: 10002,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/format',
                name: 'nnnne3',
                description: '有効数字の値フォーマット（整数部3桁、小数部1桁）の定義です。',
                _code: {
                    _value: 10003,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/format',
                name: '.ne0',
                description: '有効数字の値フォーマット（小数部1桁）の定義です。',
                _code: {
                    _value: 10004,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/format',
                name: '.ne1',
                description: '有効数字の値フォーマット（整数部1桁）の定義です。',
                _code: {
                    _value: 10005,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/format',
                name: '.nne0',
                description: '有効数字の値フォーマット（小数部2桁）の定義です。',
                _code: {
                    _value: 10006,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/format',
                name: '.nne1',
                description: '有効数字の値フォーマット（整数部1桁、小数部1桁）の定義です。',
                _code: {
                    _value: 10007,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/format',
                name: '.nne2',
                description: '有効数字の値フォーマット（整数部2桁）の定義です。',
                _code: {
                    _value: 10008,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/format',
                name: '.nnne0',
                description: '有効数字の値フォーマット（小数部3桁）の定義です。',
                _code: {
                    _value: 10009,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/format',
                name: '.nnne1',
                description: '有効数字の値フォーマット（整数部1桁、小数部2桁）の定義です。',
                _code: {
                    _value: 10010,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/format',
                name: '.nnnne0',
                description: '有効数字の値フォーマット（小数部4桁）の定義です。',
                _code: {
                    _value: 10011,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/format',
                name: '.nnnne1',
                description: '有効数字の値フォーマット（整数部1桁、小数部3桁）の定義です。',
                _code: {
                    _value: 10012,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/format',
                name: '.nnnne2',
                description: '有効数字の値フォーマット（整数部2桁、小数部2桁）の定義です。',
                _code: {
                    _value: 10013,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/format',
                name: '.nnnne4',
                description: '有効数字の値フォーマット（整数部4桁）の定義です。',
                _code: {
                    _value: 10014,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/format',
                name: '.nnnnne0',
                description: '有効数字の値フォーマット（小数部5桁）の定義です。',
                _code: {
                    _value: 10015,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/format',
                name: '.nnnnne1',
                description: '有効数字の値フォーマット（整数部1桁、小数部4桁）の定義です。',
                _code: {
                    _value: 10016,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/format',
                name: '.nnnnne2',
                description: '有効数字の値フォーマット（整数部2桁、小数部3桁）の定義です。',
                _code: {
                    _value: 10017,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/format',
                name: '.nnnnne3',
                description: '有効数字の値フォーマット（整数部3桁、小数部2桁）の定義です。',
                _code: {
                    _value: 10018,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/format',
                name: '.nnnnne4',
                description: '有効数字の値フォーマット（整数部4桁、小数部1桁）の定義です。',
                _code: {
                    _value: 10019,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/format',
                name: '.nnnnne5',
                description: '有効数字の値フォーマット（整数部5桁）の定義です。',
                _code: {
                    _value: 10020,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/format',
                name: '.nnnnnne0',
                description: '有効数字の値フォーマット（小数部6桁）の定義です。',
                _code: {
                    _value: 10021,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/format',
                name: '.nnnnnne1',
                description: '有効数字の値フォーマット（整数部1桁、小数部5桁）の定義です。',
                _code: {
                    _value: 10022,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/format',
                name: '.nnnnnne2',
                description: '有効数字の値フォーマット（整数部2桁、小数部4桁）の定義です。',
                _code: {
                    _value: 10023,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/format',
                name: '.nnnnnne3',
                description: '有効数字の値フォーマット（整数部3桁、小数部3桁）の定義です。',
                _code: {
                    _value: 10024,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/format',
                name: '.nnnnnne4',
                description: '有効数字の値フォーマット（整数部4桁、小数部2桁）の定義です。',
                _code: {
                    _value: 10025,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/format',
                name: '.nnnnnne5',
                description: '有効数字の値フォーマット（整数部5桁、小数部1桁）の定義です。',
                _code: {
                    _value: 10026,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/format',
                name: '.nnnnnne6',
                description: '有効数字の値フォーマット（整数部6桁）の定義です。',
                _code: {
                    _value: 10027,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/format',
                name: '.nnnnnnne0',
                description: '有効数字の値フォーマット（小数部7桁）の定義です。',
                _code: {
                    _value: 10028,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/format',
                name: '.nnnnnnne1',
                description: '有効数字の値フォーマット（整数部1桁、小数部6桁）の定義です。',
                _code: {
                    _value: 10029,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/format',
                name: '.nnnnnnne2',
                description: '有効数字の値フォーマット（整数部2桁、小数部5桁）の定義です。',
                _code: {
                    _value: 10030,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/format',
                name: '.nnnnnnne3',
                description: '有効数字の値フォーマット（整数部3桁、小数部4桁）の定義です。',
                _code: {
                    _value: 10031,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/format',
                name: '.nnnnnnne4',
                description: '有効数字の値フォーマット（整数部4桁、小数部3桁）の定義です。',
                _code: {
                    _value: 10032,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/format',
                name: '.nnnnnnne5',
                description: '有効数字の値フォーマット（整数部5桁、小数部2桁）の定義です。',
                _code: {
                    _value: 10033,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/format',
                name: '.nnnnnnne6',
                description: '有効数字の値フォーマット（整数部6桁、小数部1桁）の定義です。',
                _code: {
                    _value: 10034,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/format',
                name: '.nnnnnnne7',
                description: '有効数字の値フォーマット（整数部7桁）の定義です。',
                _code: {
                    _value: 10035,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/format',
                name: '.nnnnnnnne0',
                description: '有効数字の値フォーマット（小数部8桁）の定義です。',
                _code: {
                    _value: 10036,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/format',
                name: '.nnnnnnnne1',
                description: '有効数字の値フォーマット（整数部1桁、小数部7桁）の定義です。',
                _code: {
                    _value: 10037,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/format',
                name: '.nnnnnnnne2',
                description: '有効数字の値フォーマット（整数部2桁、小数部6桁）の定義です。',
                _code: {
                    _value: 10038,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/format',
                name: '.nnnnnnnne3',
                description: '有効数字の値フォーマット（整数部3桁、小数部5桁）の定義です。',
                _code: {
                    _value: 10039,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/format',
                name: '.nnnnnnnne4',
                description: '有効数字の値フォーマット（整数部4桁、小数部4桁）の定義です。',
                _code: {
                    _value: 10040,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/format',
                name: '.nnnnnnnne5',
                description: '有効数字の値フォーマット（整数部5桁、小数部3桁）の定義です。',
                _code: {
                    _value: 10041,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/format',
                name: '.nnnnnnnne6',
                description: '有効数字の値フォーマット（整数部6桁、小数部2桁）の定義です。',
                _code: {
                    _value: 10042,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/format',
                name: '.nnnnnnnne7',
                description: '有効数字の値フォーマット（整数部7桁、小数部1桁）の定義です。',
                _code: {
                    _value: 10043,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/format',
                name: '.nnnnnnnne8',
                description: '有効数字の値フォーマット（整数部8桁）の定義です。',
                _code: {
                    _value: 10044,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/format',
                name: '.nnnnnnnnne0',
                description: '有効数字の値フォーマット（小数部9桁）の定義です。',
                _code: {
                    _value: 10045,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/format',
                name: '.nnnnnnnnne1',
                description: '有効数字の値フォーマット（整数部1桁、小数部8桁）の定義です。',
                _code: {
                    _value: 10046,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/format',
                name: '.nnnnnnnnne2',
                description: '有効数字の値フォーマット（整数部2桁、小数部7桁）の定義です。',
                _code: {
                    _value: 10047,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/format',
                name: '.nnnnnnnnne3',
                description: '有効数字の値フォーマット（整数部3桁、小数部6桁）の定義です。',
                _code: {
                    _value: 10048,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/format',
                name: '.nnnnnnnnne4',
                description: '有効数字の値フォーマット（整数部4桁、小数部5桁）の定義です。',
                _code: {
                    _value: 10049,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/format',
                name: '.nnnnnnnnne5',
                description: '有効数字の値フォーマット（整数部5桁、小数部4桁）の定義です。',
                _code: {
                    _value: 10050,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/format',
                name: '.nnnnnnnnne6',
                description: '有効数字の値フォーマット（整数部6桁、小数部3桁）の定義です。',
                _code: {
                    _value: 10051,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/format',
                name: '.nnnnnnnnne7',
                description: '有効数字の値フォーマット（整数部7桁、小数部2桁）の定義です。',
                _code: {
                    _value: 10052,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/format',
                name: '.nnnnnnnnne8',
                description: '有効数字の値フォーマット（整数部8桁、小数部1桁）の定義です。',
                _code: {
                    _value: 10053,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/format',
                name: '.nnnnnnnnne9',
                description: '有効数字の値フォーマット（整数部9桁）の定義です。',
                _code: {
                    _value: 10054,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/format',
                name: '.nnnnnnnnnnnne1',
                description: '有効数字の値フォーマット（整数部1桁）の定義です。',
                _code: {
                    _value: 10055,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/format',
                name: '.nnnnnnnnnnnnnnne1',
                description: '有効数字の値フォーマット（整数部1桁）の定義です。',
                _code: {
                    _value: 10056,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/format',
                name: '.nnnnnnnnnnnnnnne2',
                description: '有効数字の値フォーマット（整数部2桁）の定義です。',
                _code: {
                    _value: 10057,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/format',
                name: '.nnnnnnnnnnnnnnnne1',
                description: '有効数字の値フォーマット（整数部1桁）の定義です。',
                _code: {
                    _value: 10058,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/format',
                name: '.nnnnnnnnnnnne3',
                description: '有効数字の値フォーマット（整数部3桁）の定義です。',
                _code: {
                    _value: 10059,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/format',
                name: '.nnnnnnnnnnnnnnnnnne1',
                description: '有効数字の値フォーマット（整数部1桁）の定義です。',
                _code: {
                    _value: 10060,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/unit/temperature',
                name: '℃',
                description: 'セルシウス度の単位の定義です。',
                _code: {
                    _value: 20001,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/unit/number_per_unit',
                name: '回/分',
                description: '1分あたりの回数の単位の定義です。',
                _code: {
                    _value: 20002,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/unit/counters',
                name: '歳',
                description: '年齢の単位の定義です。',
                _code: {
                    _value: 20003,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/unit/length',
                name: 'cm',
                description: '長さcmの定義です。',
                _code: {
                    _value: 20004,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/unit/mass',
                name: 'kg',
                description: '重さkgの定義です。',
                _code: {
                    _value: 20005,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/unit/power',
                name: 'W',
                description: '仕事率・工率・電力・放射束Wの定義です。',
                _code: {
                    _value: 20006,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/unit/mass',
                name: 'g',
                description: '重さgの定義です。',
                _code: {
                    _value: 20007,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/unit/length',
                name: 'mm',
                description: '長さcmの定義です。',
                _code: {
                    _value: 20008,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/unit/parts_per_notation',
                name: '%',
                description: '百分率%の定義です。',
                _code: {
                    _value: 20009,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/unit/pressure',
                name: 'mmHg',
                description: '水銀柱ミリメートルmmHgの定義です。',
                _code: {
                    _value: 20010,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/unit/counters',
                name: '回',
                description: '回数の単位の定義です。',
                _code: {
                    _value: 20011,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/unit/number_per_unit',
                name: 'g/dl',
                description: 'g/dLの単位の定義です。',
                _code: {
                    _value: 20012,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/unit/number_per_unit',
                name: 'mg/dl',
                description: 'mg/dLの単位の定義です。',
                _code: {
                    _value: 20013,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/unit/number_per_unit',
                name: 'U/L',
                description: 'U/Lの単位の定義です。',
                _code: {
                    _value: 20014,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/unit/number_per_unit',
                name: 'mEq/L',
                description: 'mEq/Lの単位の定義です。',
                _code: {
                    _value: 20015,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/unit/number_per_unit',
                name: 'pg/mL',
                description: 'pg/mLの単位の定義です。',
                _code: {
                    _value: 20016,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/unit/time',
                name: '年',
                description: '年数の単位の定義です。',
                _code: {
                    _value: 20017,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/unit/counters',
                name: '人',
                description: '人数の単位の定義です。',
                _code: {
                    _value: 20018,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/unit/illuminance',
                name: 'lx',
                description: '照度lxの定義です。',
                _code: {
                    _value: 20019,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/unit/pressure',
                name: 'hPa',
                description: 'ヘクトパスカルhPaの定義です。',
                _code: {
                    _value: 20020,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/unit/pressure',
                name: 'dB(SPL)',
                description: '音圧dB(SPL)の定義です。',
                _code: {
                    _value: 20021,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/unit/number_per_unit',
                name: '回転/分',
                description: '1分あたりの回転数(rpm)の単位の定義です。',
                _code: {
                    _value: 20022,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/unit/parts_per_notation',
                name: 'ppb',
                description: '十億分率ppbの定義です。',
                _code: {
                    _value: 20023,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/unit/parts_per_notation',
                name: 'ppm',
                description: '百万分率ppmの定義です。',
                _code: {
                    _value: 20024,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/unit/velocity',
                name: 'kine',
                description: '地震の速度の単位kineの定義です。(cm/s)',
                _code: {
                    _value: 20025,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/unit/acceleration',
                name: 'gal',
                description: '地震の加速度galの定義です。(cm/s2)',
                _code: {
                    _value: 20026,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/unit/acceleration',
                name: 'm/s2',
                description: '加速度m/s2の定義です。',
                _code: {
                    _value: 20027,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/unit/velocity',
                name: 'deg/s',
                description: '角速度の単位deg/sの定義です。',
                _code: {
                    _value: 20028,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/unit/acceleration',
                name: 'G',
                description: '重力加速度Gの定義です。(1G≒9.8m/s2)',
                _code: {
                    _value: 20029,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/unit/other',
                name: 'BMI',
                description: '肥満指数BMIの単位の定義です。(kg/m2)',
                _code: {
                    _value: 20030,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/unit/area',
                name: 'm2',
                description: '面積の単位m2の定義です。',
                _code: {
                    _value: 20031,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/unit/velocity',
                name: 'm/s',
                description: '速度の単位m/sの定義です。',
                _code: {
                    _value: 20032,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/unit/time',
                name: '秒',
                description: '秒の時刻の単位sの定義です。',
                _code: {
                    _value: 20033,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/unit/force',
                name: 'N',
                description: '力の単位Nの定義です。(kg*m/s2)',
                _code: {
                    _value: 20034,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/unit/length',
                name: 'm',
                description: '長さmの定義です。',
                _code: {
                    _value: 20035,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/unit/other',
                name: 'N*s',
                description: '力積の単位の定義です。(N*s)',
                _code: {
                    _value: 20036,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/unit/time',
                name: '分',
                description: '分の時刻の単位sの定義です。',
                _code: {
                    _value: 20037,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/unit/magnetic_flux_density',
                name: 'uT',
                description: '磁束密度uTの定義です。',
                _code: {
                    _value: 20038,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/unit/time',
                name: 'ミリ秒',
                description: 'ミリ秒の時刻の単位msの定義です。',
                _code: {
                    _value: 20040,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/unit/counters',
                name: 'ピクセル',
                description: 'ピクセルの単位の定義です。',
                _code: {
                    _value: 20041,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/unit/area',
                name: 'mm2',
                description: '面積の単位mm2の定義です。',
                _code: {
                    _value: 20043,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/unit/mass',
                name: 'mg',
                description: '重さmgの定義です。',
                _code: {
                    _value: 20044,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/unit/other',
                name: 'μS',
                description: 'コンダクタンスの単位の定義です。(μS)',
                _code: {
                    _value: 20045,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/unit/counters',
                name: '地点',
                description: '地点の単位の定義です。',
                _code: {
                    _value: 20046,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/unit/power',
                name: 'nW',
                description: '仕事率・工率・電力・放射束nWの定義です。',
                _code: {
                    _value: 20047,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/unit/angle',
                name: '°',
                description: '平面角°（度）の定義です。(1°=(π/180)rad)',
                _code: {
                    _value: 20048,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/unit/number_per_unit',
                name: 'fps',
                description: 'fps（フレーム毎秒 = frames per second）の単位の定義です。',
                _code: {
                    _value: 20049,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/unit/number_per_unit',
                name: 'Hz',
                description: 'Hz（ヘルツ）の単位の定義です。',
                _code: {
                    _value: 20050,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/unit/other',
                name: 'bit',
                description: '情報量の単位（ビット）の定義です。(bit)',
                _code: {
                    _value: 20051,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/unit/other',
                name: 'RH',
                description: '相対湿度の単位（RH）の定義です。',
                _code: {
                    _value: 20052,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/person/identification',
                name: '運転免許証',
                description: '本人性確認で利用する運転免許証の定義です。',
                _code: {
                    _value: 30001,
                    _ver: null
                },
                inherit: {
                    _value: 107,
                    _ver: 1
                }
            },
            template: {
                prop: null,
                value: [
                    {
                        key: 'item-group',
                        value: [
                            {
                                key: 'title',
                                value: '氏名'
                            },
                            {
                                key: 'item',
                                value: [
                                    {
                                        key: 'title',
                                        value: '姓名'
                                    },
                                    {
                                        key: 'type',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 30037
                                            },
                                            {
                                                key: '_ver',
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: 'content',
                                        value: null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        key: 'item-group',
                        value: [
                            {
                                key: 'title',
                                value: '生年月日（和暦）'
                            },
                            {
                                key: 'item',
                                value: [
                                    {
                                        key: 'title',
                                        value: '生年月日（和暦）'
                                    },
                                    {
                                        key: 'type',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 30038
                                            },
                                            {
                                                key: '_ver',
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: 'content',
                                        value: null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        key: 'item-group',
                        value: [
                            {
                                key: 'title',
                                value: '住所'
                            },
                            {
                                key: 'item',
                                value: [
                                    {
                                        key: 'title',
                                        value: '住所'
                                    },
                                    {
                                        key: 'type',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 30035
                                            },
                                            {
                                                key: '_ver',
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: 'content',
                                        value: null
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/licence',
                name: '医師免許',
                description: '医師免許の定義です。',
                _code: {
                    _value: 30002,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: null,
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/env/thing/sensor',
                name: 'モノに関する環境情報（センサー）',
                description: 'モノに関する環境情報（センサー）の定義です。',
                _code: {
                    _value: 30003,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: 'id',
                        type: {
                            of: 'string',
                            cmatrix: {
                                index: '_1',
                                reserved: false
                            },
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'センサー識別子'
                    },
                    {
                        key: 'code',
                        type: {
                            of: 'code',
                            cmatrix: {
                                index: '_2',
                                reserved: false
                            },
                            candidate: null
                        },
                        description: 'センサー種別'
                    }
                ],
                value: null
            },
            inner: null,
            attribute: {
                objects: [
                    {
                        key: {
                            _value: 30004,
                            _ver: 1
                        },
                        value: {},
                        description: 'センサー属性'
                    }
                ]
            }
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/attribute/sensor',
                name: 'sensor',
                description: 'センサー製品情報の定義です。attributeに設定されます。key名は[sensor]です。',
                _code: {
                    _value: 30004,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: 'company',
                        type: {
                            of: 'code',
                            candidate: {
                                ns: [
                                    'catalog/model/attribute/env/thing/sensor/company/*',
                                    'catalog/built_in/attribute/env/thing/sensor/company/*',
                                    'catalog/ext/test-org/attribute/env/thing/sensor/company/*'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: '製造メーカー'
                    },
                    {
                        key: 'manufacturing-name',
                        type: {
                            of: 'string',
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '製品名'
                    },
                    {
                        key: 'model-number',
                        type: {
                            of: 'string',
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'センサー型番'
                    }
                ],
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/person/identification',
                name: 'パスポート（旅券）',
                description: '本人性確認で利用するパスポート（旅券）の定義です。',
                _code: {
                    _value: 30005,
                    _ver: null
                },
                inherit: {
                    _value: 107,
                    _ver: 1
                }
            },
            template: {
                prop: null,
                value: [
                    {
                        key: 'item-group',
                        value: [
                            {
                                key: 'title',
                                value: '氏名'
                            },
                            {
                                key: 'item',
                                value: [
                                    {
                                        key: 'title',
                                        value: '姓'
                                    },
                                    {
                                        key: 'type',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 30019
                                            },
                                            {
                                                key: '_ver',
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: 'content',
                                        value: null
                                    }
                                ]
                            },
                            {
                                key: 'item',
                                value: [
                                    {
                                        key: 'title',
                                        value: '名'
                                    },
                                    {
                                        key: 'type',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 30020
                                            },
                                            {
                                                key: '_ver',
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: 'content',
                                        value: null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        key: 'item-group',
                        value: [
                            {
                                key: 'title',
                                value: '性別'
                            },
                            {
                                key: 'item',
                                value: [
                                    {
                                        key: 'title',
                                        value: '性別'
                                    },
                                    {
                                        key: 'type',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 30021
                                            },
                                            {
                                                key: '_ver',
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: 'content',
                                        value: null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        key: 'item-group',
                        value: [
                            {
                                key: 'title',
                                value: '生年月日（西暦）'
                            },
                            {
                                key: 'item',
                                value: [
                                    {
                                        key: 'title',
                                        value: '生年月日（西暦）'
                                    },
                                    {
                                        key: 'type',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 30022
                                            },
                                            {
                                                key: '_ver',
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: 'content',
                                        value: null
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/person/identification',
                name: '運転経歴証（写真付きのもの）',
                description: '本人性確認で利用する運転経歴証（写真付きのもの）の定義です。',
                _code: {
                    _value: 30006,
                    _ver: null
                },
                inherit: {
                    _value: 107,
                    _ver: 1
                }
            },
            template: {
                prop: null,
                value: [
                    {
                        key: 'item-group',
                        value: [
                            {
                                key: 'title',
                                value: '氏名'
                            },
                            {
                                key: 'item',
                                value: [
                                    {
                                        key: 'title',
                                        value: '姓名'
                                    },
                                    {
                                        key: 'type',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 30037
                                            },
                                            {
                                                key: '_ver',
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: 'content',
                                        value: null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        key: 'item-group',
                        value: [
                            {
                                key: 'title',
                                value: '生年月日（和暦）'
                            },
                            {
                                key: 'item',
                                value: [
                                    {
                                        key: 'title',
                                        value: '生年月日（和暦）'
                                    },
                                    {
                                        key: 'type',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 30038
                                            },
                                            {
                                                key: '_ver',
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: 'content',
                                        value: null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        key: 'item-group',
                        value: [
                            {
                                key: 'title',
                                value: '住所'
                            },
                            {
                                key: 'item',
                                value: [
                                    {
                                        key: 'title',
                                        value: '住所'
                                    },
                                    {
                                        key: 'type',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 30035
                                            },
                                            {
                                                key: '_ver',
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: 'content',
                                        value: null
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/person/identification',
                name: '個人番号カード（マイナンバーカード）',
                description: '本人性確認で利用する個人番号カード（マイナンバーカード）の定義です。',
                _code: {
                    _value: 30007,
                    _ver: null
                },
                inherit: {
                    _value: 107,
                    _ver: 1
                }
            },
            template: {
                prop: null,
                value: [
                    {
                        key: 'item-group',
                        value: [
                            {
                                key: 'title',
                                value: '氏名'
                            },
                            {
                                key: 'item',
                                value: [
                                    {
                                        key: 'title',
                                        value: '姓名'
                                    },
                                    {
                                        key: 'type',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 30037
                                            },
                                            {
                                                key: '_ver',
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: 'content',
                                        value: null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        key: 'item-group',
                        value: [
                            {
                                key: 'title',
                                value: '性別'
                            },
                            {
                                key: 'item',
                                value: [
                                    {
                                        key: 'title',
                                        value: '性別'
                                    },
                                    {
                                        key: 'type',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 30021
                                            },
                                            {
                                                key: '_ver',
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: 'content',
                                        value: null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        key: 'item-group',
                        value: [
                            {
                                key: 'title',
                                value: '生年月日（和暦）'
                            },
                            {
                                key: 'item',
                                value: [
                                    {
                                        key: 'title',
                                        value: '生年月日（和暦）'
                                    },
                                    {
                                        key: 'type',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 30038
                                            },
                                            {
                                                key: '_ver',
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: 'content',
                                        value: null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        key: 'item-group',
                        value: [
                            {
                                key: 'title',
                                value: '住所'
                            },
                            {
                                key: 'item',
                                value: [
                                    {
                                        key: 'title',
                                        value: '住所'
                                    },
                                    {
                                        key: 'type',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 30035
                                            },
                                            {
                                                key: '_ver',
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: 'content',
                                        value: null
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/person/identification',
                name: '顔写真ありの障害者手帳（身体障害者手帳、療育手帳、精神障害者保健福祉手帳）',
                description: '本人性確認で利用する顔写真ありの障害者手帳（身体障害者手帳、療育手帳、精神障害者保健福祉手帳）の定義です。',
                _code: {
                    _value: 30008,
                    _ver: null
                },
                inherit: {
                    _value: 107,
                    _ver: 1
                }
            },
            template: {
                prop: null,
                value: [
                    {
                        key: 'item-group',
                        value: [
                            {
                                key: 'title',
                                value: '氏名'
                            },
                            {
                                key: 'item',
                                value: [
                                    {
                                        key: 'title',
                                        value: '姓名'
                                    },
                                    {
                                        key: 'type',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 30037
                                            },
                                            {
                                                key: '_ver',
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: 'content',
                                        value: null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        key: 'item-group',
                        value: [
                            {
                                key: 'title',
                                value: '生年月日（和暦）'
                            },
                            {
                                key: 'item',
                                value: [
                                    {
                                        key: 'title',
                                        value: '生年月日（和暦）'
                                    },
                                    {
                                        key: 'type',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 30038
                                            },
                                            {
                                                key: '_ver',
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: 'content',
                                        value: null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        key: 'item-group',
                        value: [
                            {
                                key: 'title',
                                value: '住所'
                            },
                            {
                                key: 'item',
                                value: [
                                    {
                                        key: 'title',
                                        value: '住所'
                                    },
                                    {
                                        key: 'type',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 30035
                                            },
                                            {
                                                key: '_ver',
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: 'content',
                                        value: null
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/person/identification',
                name: '在留カード',
                description: '本人性確認で利用する在留カードの定義です。',
                _code: {
                    _value: 30009,
                    _ver: null
                },
                inherit: {
                    _value: 107,
                    _ver: 1
                }
            },
            template: {
                prop: null,
                value: [
                    {
                        key: 'item-group',
                        value: [
                            {
                                key: 'title',
                                value: '氏名'
                            },
                            {
                                key: 'item',
                                value: [
                                    {
                                        key: 'title',
                                        value: '姓名'
                                    },
                                    {
                                        key: 'type',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 30037
                                            },
                                            {
                                                key: '_ver',
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: 'content',
                                        value: null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        key: 'item-group',
                        value: [
                            {
                                key: 'title',
                                value: '性別'
                            },
                            {
                                key: 'item',
                                value: [
                                    {
                                        key: 'title',
                                        value: '性別'
                                    },
                                    {
                                        key: 'type',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 30021
                                            },
                                            {
                                                key: '_ver',
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: 'content',
                                        value: null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        key: 'item-group',
                        value: [
                            {
                                key: 'title',
                                value: '生年月日（西暦）'
                            },
                            {
                                key: 'item',
                                value: [
                                    {
                                        key: 'title',
                                        value: '生年月日（西暦）'
                                    },
                                    {
                                        key: 'type',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 30022
                                            },
                                            {
                                                key: '_ver',
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: 'content',
                                        value: null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        key: 'item-group',
                        value: [
                            {
                                key: 'title',
                                value: '住所'
                            },
                            {
                                key: 'item',
                                value: [
                                    {
                                        key: 'title',
                                        value: '住所'
                                    },
                                    {
                                        key: 'type',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 30035
                                            },
                                            {
                                                key: '_ver',
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: 'content',
                                        value: null
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/person/identification',
                name: '特別永住者証明書',
                description: '本人性確認で利用する特別永住者証明書の定義です。',
                _code: {
                    _value: 30010,
                    _ver: null
                },
                inherit: {
                    _value: 107,
                    _ver: 1
                }
            },
            template: {
                prop: null,
                value: [
                    {
                        key: 'item-group',
                        value: [
                            {
                                key: 'title',
                                value: '氏名'
                            },
                            {
                                key: 'item',
                                value: [
                                    {
                                        key: 'title',
                                        value: '姓名'
                                    },
                                    {
                                        key: 'type',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 30037
                                            },
                                            {
                                                key: '_ver',
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: 'content',
                                        value: null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        key: 'item-group',
                        value: [
                            {
                                key: 'title',
                                value: '性別'
                            },
                            {
                                key: 'item',
                                value: [
                                    {
                                        key: 'title',
                                        value: '性別'
                                    },
                                    {
                                        key: 'type',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 30021
                                            },
                                            {
                                                key: '_ver',
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: 'content',
                                        value: null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        key: 'item-group',
                        value: [
                            {
                                key: 'title',
                                value: '生年月日（西暦）'
                            },
                            {
                                key: 'item',
                                value: [
                                    {
                                        key: 'title',
                                        value: '生年月日（西暦）'
                                    },
                                    {
                                        key: 'type',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 30022
                                            },
                                            {
                                                key: '_ver',
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: 'content',
                                        value: null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        key: 'item-group',
                        value: [
                            {
                                key: 'title',
                                value: '住所'
                            },
                            {
                                key: 'item',
                                value: [
                                    {
                                        key: 'title',
                                        value: '住所'
                                    },
                                    {
                                        key: 'type',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 30035
                                            },
                                            {
                                                key: '_ver',
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: 'content',
                                        value: null
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/licence',
                name: '歯科医師免許',
                description: '歯科医師免許の定義です。',
                _code: {
                    _value: 30011,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: null,
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/licence',
                name: '看護師免許',
                description: '看護師免許の定義です。',
                _code: {
                    _value: 30012,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: null,
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/licence',
                name: '薬剤師免許',
                description: '薬剤師免許の定義です。',
                _code: {
                    _value: 30013,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: null,
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/licence',
                name: '救急救命士免許',
                description: '救急救命士免許の定義です。',
                _code: {
                    _value: 30014,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: null,
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/licence',
                name: '公認心理士資格',
                description: '公認心理士資格の定義です。',
                _code: {
                    _value: 30015,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: null,
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/licence',
                name: '臨床心理士資格',
                description: '臨床心理士資格の定義です。',
                _code: {
                    _value: 30016,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: null,
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/env/thing/recorder',
                name: 'モノに関する環境情報（レコーダー）',
                description: 'モノに関する環境情報（レコーダー）の定義です。',
                _code: {
                    _value: 30017,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: 'id',
                        type: {
                            of: 'string',
                            cmatrix: {
                                index: '_1',
                                reserved: false
                            },
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'レコーダー識別子'
                    },
                    {
                        key: 'code',
                        type: {
                            of: 'code',
                            cmatrix: {
                                index: '_2',
                                reserved: false
                            },
                            candidate: null
                        },
                        description: 'レコーダー種別'
                    }
                ],
                value: null
            },
            inner: null,
            attribute: {
                objects: [
                    {
                        key: {
                            _value: 30018,
                            _ver: 1
                        },
                        value: {},
                        description: 'レコーダー属性'
                    }
                ]
            }
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/attribute/recorder',
                name: 'recorder',
                description: 'レコーダー製品情報の定義です。attributeに設定されます。key名は[recorder]です。',
                _code: {
                    _value: 30018,
                    _ver: null
                },
                inherit: null
            },
            template: {
                prop: [
                    {
                        key: 'company',
                        type: {
                            of: 'code',
                            candidate: {
                                ns: [
                                    'catalog/model/attribute/env/thing/recorder/company/*',
                                    'catalog/built_in/attribute/env/thing/recorder/company/*',
                                    'catalog/ext/test-org/attribute/env/thing/recorder/company/*'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: '製造メーカー'
                    },
                    {
                        key: 'manufacturing-name',
                        type: {
                            of: 'string',
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '製品名'
                    },
                    {
                        key: 'model-number',
                        type: {
                            of: 'string',
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'レコーダー型番'
                    }
                ],
                value: null
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/person/item-type',
                name: '姓',
                description: '個人属性の項目種別（姓）の定義です。',
                _code: {
                    _value: 30019,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/person/item-type',
                name: '名',
                description: '個人属性の項目種別（名）の定義です。',
                _code: {
                    _value: 30020,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/person/item-type',
                name: '性別',
                description: '個人属性の項目種別（性別）の定義です。',
                _code: {
                    _value: 30021,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/person/item-type',
                name: '生年月日（西暦）',
                description: '個人属性の項目種別（生年月日（西暦））の定義です。',
                _code: {
                    _value: 30022,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/person/identification',
                name: '官公庁、独立行政法人、特殊法人又は地方独立行政法人がその職員に対して発行した身分証明書で写真付きのもの',
                description: '本人性確認で利用する官公庁、独立行政法人、特殊法人又は地方独立行政法人がその職員に対して発行した身分証明書で写真付きのものの定義です。',
                _code: {
                    _value: 30023,
                    _ver: null
                },
                inherit: {
                    _value: 107,
                    _ver: 1
                }
            },
            template: {
                prop: null,
                value: [
                    {
                        key: 'item-group',
                        value: [
                            {
                                key: 'title',
                                value: '氏名'
                            },
                            {
                                key: 'item',
                                value: [
                                    {
                                        key: 'title',
                                        value: '姓名'
                                    },
                                    {
                                        key: 'type',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 30037
                                            },
                                            {
                                                key: '_ver',
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: 'content',
                                        value: null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        key: 'item-group',
                        value: [
                            {
                                key: 'title',
                                value: '生年月日（和暦）'
                            },
                            {
                                key: 'item',
                                value: [
                                    {
                                        key: 'title',
                                        value: '生年月日（和暦）'
                                    },
                                    {
                                        key: 'type',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 30038
                                            },
                                            {
                                                key: '_ver',
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: 'content',
                                        value: null
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/person/identification',
                name: '健康保険、国民健康保険又は船員保険等の被保険者証',
                description: '本人性確認で利用する健康保険、国民健康保険又は船員保険等の被保険者証の定義です。',
                _code: {
                    _value: 30024,
                    _ver: null
                },
                inherit: {
                    _value: 107,
                    _ver: 1
                }
            },
            template: {
                prop: null,
                value: [
                    {
                        key: 'item-group',
                        value: [
                            {
                                key: 'title',
                                value: '氏名'
                            },
                            {
                                key: 'item',
                                value: [
                                    {
                                        key: 'title',
                                        value: '姓名'
                                    },
                                    {
                                        key: 'type',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 30037
                                            },
                                            {
                                                key: '_ver',
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: 'content',
                                        value: null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        key: 'item-group',
                        value: [
                            {
                                key: 'title',
                                value: '性別'
                            },
                            {
                                key: 'item',
                                value: [
                                    {
                                        key: 'title',
                                        value: '性別'
                                    },
                                    {
                                        key: 'type',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 30021
                                            },
                                            {
                                                key: '_ver',
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: 'content',
                                        value: null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        key: 'item-group',
                        value: [
                            {
                                key: 'title',
                                value: '生年月日（和暦）'
                            },
                            {
                                key: 'item',
                                value: [
                                    {
                                        key: 'title',
                                        value: '生年月日（和暦）'
                                    },
                                    {
                                        key: 'type',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 30038
                                            },
                                            {
                                                key: '_ver',
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: 'content',
                                        value: null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        key: 'item-group',
                        value: [
                            {
                                key: 'title',
                                value: '住所'
                            },
                            {
                                key: 'item',
                                value: [
                                    {
                                        key: 'title',
                                        value: '住所'
                                    },
                                    {
                                        key: 'type',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 30035
                                            },
                                            {
                                                key: '_ver',
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: 'content',
                                        value: null
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/person/identification',
                name: '年金手帳',
                description: '本人性確認で利用する年金手帳の定義です。',
                _code: {
                    _value: 30025,
                    _ver: null
                },
                inherit: {
                    _value: 107,
                    _ver: 1
                }
            },
            template: {
                prop: null,
                value: [
                    {
                        key: 'item-group',
                        value: [
                            {
                                key: 'title',
                                value: '氏名'
                            },
                            {
                                key: 'item',
                                value: [
                                    {
                                        key: 'title',
                                        value: '姓名'
                                    },
                                    {
                                        key: 'type',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 30037
                                            },
                                            {
                                                key: '_ver',
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: 'content',
                                        value: null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        key: 'item-group',
                        value: [
                            {
                                key: 'title',
                                value: '性別'
                            },
                            {
                                key: 'item',
                                value: [
                                    {
                                        key: 'title',
                                        value: '性別'
                                    },
                                    {
                                        key: 'type',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 30021
                                            },
                                            {
                                                key: '_ver',
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: 'content',
                                        value: null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        key: 'item-group',
                        value: [
                            {
                                key: 'title',
                                value: '生年月日（和暦）'
                            },
                            {
                                key: 'item',
                                value: [
                                    {
                                        key: 'title',
                                        value: '生年月日（和暦）'
                                    },
                                    {
                                        key: 'type',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 30038
                                            },
                                            {
                                                key: '_ver',
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: 'content',
                                        value: null
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/person/identification',
                name: '介護保険証',
                description: '本人性確認で利用する介護保険証の定義です。',
                _code: {
                    _value: 30026,
                    _ver: null
                },
                inherit: {
                    _value: 107,
                    _ver: 1
                }
            },
            template: {
                prop: null,
                value: [
                    {
                        key: 'item-group',
                        value: [
                            {
                                key: 'title',
                                value: '氏名'
                            },
                            {
                                key: 'item',
                                value: [
                                    {
                                        key: 'title',
                                        value: '姓名'
                                    },
                                    {
                                        key: 'type',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 30037
                                            },
                                            {
                                                key: '_ver',
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: 'content',
                                        value: null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        key: 'item-group',
                        value: [
                            {
                                key: 'title',
                                value: '生年月日（和暦）'
                            },
                            {
                                key: 'item',
                                value: [
                                    {
                                        key: 'title',
                                        value: '生年月日（和暦）'
                                    },
                                    {
                                        key: 'type',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 30038
                                            },
                                            {
                                                key: '_ver',
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: 'content',
                                        value: null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        key: 'item-group',
                        value: [
                            {
                                key: 'title',
                                value: '住所'
                            },
                            {
                                key: 'item',
                                value: [
                                    {
                                        key: 'title',
                                        value: '住所'
                                    },
                                    {
                                        key: 'type',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 30035
                                            },
                                            {
                                                key: '_ver',
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: 'content',
                                        value: null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        key: 'item-group',
                        value: [
                            {
                                key: 'title',
                                value: '性別'
                            },
                            {
                                key: 'item',
                                value: [
                                    {
                                        key: 'title',
                                        value: '性別'
                                    },
                                    {
                                        key: 'type',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 30021
                                            },
                                            {
                                                key: '_ver',
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: 'content',
                                        value: null
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/person/identification',
                name: '各種福祉手帳（顔写真なし）',
                description: '本人性確認で利用する各種福祉手帳（顔写真なし）の定義です。',
                _code: {
                    _value: 30027,
                    _ver: null
                },
                inherit: {
                    _value: 107,
                    _ver: 1
                }
            },
            template: {
                prop: null,
                value: [
                    {
                        key: 'item-group',
                        value: [
                            {
                                key: 'title',
                                value: '氏名'
                            },
                            {
                                key: 'item',
                                value: [
                                    {
                                        key: 'title',
                                        value: '姓名'
                                    },
                                    {
                                        key: 'type',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 30037
                                            },
                                            {
                                                key: '_ver',
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: 'content',
                                        value: null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        key: 'item-group',
                        value: [
                            {
                                key: 'title',
                                value: '性別'
                            },
                            {
                                key: 'item',
                                value: [
                                    {
                                        key: 'title',
                                        value: '性別'
                                    },
                                    {
                                        key: 'type',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 30021
                                            },
                                            {
                                                key: '_ver',
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: 'content',
                                        value: null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        key: 'item-group',
                        value: [
                            {
                                key: 'title',
                                value: '生年月日（和暦）'
                            },
                            {
                                key: 'item',
                                value: [
                                    {
                                        key: 'title',
                                        value: '生年月日（和暦）'
                                    },
                                    {
                                        key: 'type',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 30038
                                            },
                                            {
                                                key: '_ver',
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: 'content',
                                        value: null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        key: 'item-group',
                        value: [
                            {
                                key: 'title',
                                value: '住所'
                            },
                            {
                                key: 'item',
                                value: [
                                    {
                                        key: 'title',
                                        value: '住所'
                                    },
                                    {
                                        key: 'type',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 30035
                                            },
                                            {
                                                key: '_ver',
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: 'content',
                                        value: null
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/person/identification',
                name: '母子健康手帳',
                description: '本人性確認で利用する母子健康手帳の定義です。',
                _code: {
                    _value: 30028,
                    _ver: null
                },
                inherit: {
                    _value: 107,
                    _ver: 1
                }
            },
            template: {
                prop: null,
                value: [
                    {
                        key: 'item-group',
                        value: [
                            {
                                key: 'title',
                                value: '氏名'
                            },
                            {
                                key: 'item',
                                value: [
                                    {
                                        key: 'title',
                                        value: '姓名'
                                    },
                                    {
                                        key: 'type',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 30037
                                            },
                                            {
                                                key: '_ver',
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: 'content',
                                        value: null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        key: 'item-group',
                        value: [
                            {
                                key: 'title',
                                value: '性別'
                            },
                            {
                                key: 'item',
                                value: [
                                    {
                                        key: 'title',
                                        value: '性別'
                                    },
                                    {
                                        key: 'type',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 30021
                                            },
                                            {
                                                key: '_ver',
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: 'content',
                                        value: null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        key: 'item-group',
                        value: [
                            {
                                key: 'title',
                                value: '生年月日（西暦）'
                            },
                            {
                                key: 'item',
                                value: [
                                    {
                                        key: 'title',
                                        value: '生年月日（西暦）'
                                    },
                                    {
                                        key: 'type',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 30022
                                            },
                                            {
                                                key: '_ver',
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: 'content',
                                        value: null
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/person/identification',
                name: '住民票の写し',
                description: '本人性確認で利用する住民票の写しの定義です。',
                _code: {
                    _value: 30029,
                    _ver: null
                },
                inherit: {
                    _value: 107,
                    _ver: 1
                }
            },
            template: {
                prop: null,
                value: [
                    {
                        key: 'item-group',
                        value: [
                            {
                                key: 'title',
                                value: '氏名'
                            },
                            {
                                key: 'item',
                                value: [
                                    {
                                        key: 'title',
                                        value: '姓名'
                                    },
                                    {
                                        key: 'type',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 30037
                                            },
                                            {
                                                key: '_ver',
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: 'content',
                                        value: null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        key: 'item-group',
                        value: [
                            {
                                key: 'title',
                                value: '生年月日（和暦）'
                            },
                            {
                                key: 'item',
                                value: [
                                    {
                                        key: 'title',
                                        value: '生年月日（和暦）'
                                    },
                                    {
                                        key: 'type',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 30038
                                            },
                                            {
                                                key: '_ver',
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: 'content',
                                        value: null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        key: 'item-group',
                        value: [
                            {
                                key: 'title',
                                value: '住所'
                            },
                            {
                                key: 'item',
                                value: [
                                    {
                                        key: 'title',
                                        value: '住所'
                                    },
                                    {
                                        key: 'type',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 30035
                                            },
                                            {
                                                key: '_ver',
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: 'content',
                                        value: null
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/person/identification',
                name: '公共料金の領収書（住所の記載あり）',
                description: '本人性確認で利用する公共料金の領収書（住所の記載あり）の定義です。',
                _code: {
                    _value: 30031,
                    _ver: null
                },
                inherit: {
                    _value: 107,
                    _ver: 1
                }
            },
            template: {
                prop: null,
                value: [
                    {
                        key: 'item-group',
                        value: [
                            {
                                key: 'title',
                                value: '氏名'
                            },
                            {
                                key: 'item',
                                value: [
                                    {
                                        key: 'title',
                                        value: '姓名'
                                    },
                                    {
                                        key: 'type',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 30037
                                            },
                                            {
                                                key: '_ver',
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: 'content',
                                        value: null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        key: 'item-group',
                        value: [
                            {
                                key: 'title',
                                value: '住所'
                            },
                            {
                                key: 'item',
                                value: [
                                    {
                                        key: 'title',
                                        value: '住所'
                                    },
                                    {
                                        key: 'type',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 30035
                                            },
                                            {
                                                key: '_ver',
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: 'content',
                                        value: null
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/person/identification',
                name: '外国人登録証明書',
                description: '本人性確認で利用する外国人登録証明書の定義です。',
                _code: {
                    _value: 30032,
                    _ver: null
                },
                inherit: {
                    _value: 107,
                    _ver: 1
                }
            },
            template: {
                prop: null,
                value: [
                    {
                        key: 'item-group',
                        value: [
                            {
                                key: 'title',
                                value: '氏名'
                            },
                            {
                                key: 'item',
                                value: [
                                    {
                                        key: 'title',
                                        value: '姓名'
                                    },
                                    {
                                        key: 'type',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 30037
                                            },
                                            {
                                                key: '_ver',
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: 'content',
                                        value: null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        key: 'item-group',
                        value: [
                            {
                                key: 'title',
                                value: '性別'
                            },
                            {
                                key: 'item',
                                value: [
                                    {
                                        key: 'title',
                                        value: '性別'
                                    },
                                    {
                                        key: 'type',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 30021
                                            },
                                            {
                                                key: '_ver',
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: 'content',
                                        value: null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        key: 'item-group',
                        value: [
                            {
                                key: 'title',
                                value: '生年月日（西暦）'
                            },
                            {
                                key: 'item',
                                value: [
                                    {
                                        key: 'title',
                                        value: '生年月日（西暦）'
                                    },
                                    {
                                        key: 'type',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 30022
                                            },
                                            {
                                                key: '_ver',
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: 'content',
                                        value: null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        key: 'item-group',
                        value: [
                            {
                                key: 'title',
                                value: '住所'
                            },
                            {
                                key: 'item',
                                value: [
                                    {
                                        key: 'title',
                                        value: '住所'
                                    },
                                    {
                                        key: 'type',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 30035
                                            },
                                            {
                                                key: '_ver',
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: 'content',
                                        value: null
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/person/identification',
                name: '戸籍の附票',
                description: '本人性確認で利用する戸籍の附票の定義です。',
                _code: {
                    _value: 30033,
                    _ver: null
                },
                inherit: {
                    _value: 107,
                    _ver: 1
                }
            },
            template: {
                prop: null,
                value: [
                    {
                        key: 'item-group',
                        value: [
                            {
                                key: 'title',
                                value: '氏名'
                            },
                            {
                                key: 'item',
                                value: [
                                    {
                                        key: 'title',
                                        value: '姓名'
                                    },
                                    {
                                        key: 'type',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 30037
                                            },
                                            {
                                                key: '_ver',
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: 'content',
                                        value: null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        key: 'item-group',
                        value: [
                            {
                                key: 'title',
                                value: '住所'
                            },
                            {
                                key: 'item',
                                value: [
                                    {
                                        key: 'title',
                                        value: '住所'
                                    },
                                    {
                                        key: 'type',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 30035
                                            },
                                            {
                                                key: '_ver',
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: 'content',
                                        value: null
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/person/identification',
                name: '個人番号通知カード（マイナンバー通知カード）',
                description: '本人性確認で利用する個人番号通知カード（マイナンバー通知カード）の定義です。',
                _code: {
                    _value: 30034,
                    _ver: null
                },
                inherit: {
                    _value: 107,
                    _ver: 1
                }
            },
            template: {
                prop: null,
                value: [
                    {
                        key: 'item-group',
                        value: [
                            {
                                key: 'title',
                                value: '氏名'
                            },
                            {
                                key: 'item',
                                value: [
                                    {
                                        key: 'title',
                                        value: '姓名'
                                    },
                                    {
                                        key: 'type',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 30037
                                            },
                                            {
                                                key: '_ver',
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: 'content',
                                        value: null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        key: 'item-group',
                        value: [
                            {
                                key: 'title',
                                value: '性別'
                            },
                            {
                                key: 'item',
                                value: [
                                    {
                                        key: 'title',
                                        value: '性別'
                                    },
                                    {
                                        key: 'type',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 30021
                                            },
                                            {
                                                key: '_ver',
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: 'content',
                                        value: null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        key: 'item-group',
                        value: [
                            {
                                key: 'title',
                                value: '生年月日（和暦）'
                            },
                            {
                                key: 'item',
                                value: [
                                    {
                                        key: 'title',
                                        value: '生年月日（和暦）'
                                    },
                                    {
                                        key: 'type',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 30038
                                            },
                                            {
                                                key: '_ver',
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: 'content',
                                        value: null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        key: 'item-group',
                        value: [
                            {
                                key: 'title',
                                value: '住所'
                            },
                            {
                                key: 'item',
                                value: [
                                    {
                                        key: 'title',
                                        value: '住所'
                                    },
                                    {
                                        key: 'type',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 30035
                                            },
                                            {
                                                key: '_ver',
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: 'content',
                                        value: null
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/person/item-type',
                name: '住所',
                description: '個人属性の項目種別（住所）の定義です。',
                _code: {
                    _value: 30035,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/person/item-type',
                name: '連絡先電話番号',
                description: '個人属性の項目種別（連絡先電話番号）の定義です。',
                _code: {
                    _value: 30036,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/person/item-type',
                name: '姓名',
                description: '個人属性の項目種別（姓名）の定義です。',
                _code: {
                    _value: 30037,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/person/item-type',
                name: '生年月日（和暦）',
                description: '個人属性の項目種別（生年月日（和暦））の定義です。',
                _code: {
                    _value: 30038,
                    _ver: null
                },
                inherit: null
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/person/identification',
                name: '運転経歴証（写真なしのもの）',
                description: '本人性確認で利用する運転経歴証（写真なしのもの）の定義です。',
                _code: {
                    _value: 30039,
                    _ver: null
                },
                inherit: {
                    _value: 107,
                    _ver: 1
                }
            },
            template: {
                prop: null,
                value: [
                    {
                        key: 'item-group',
                        value: [
                            {
                                key: 'title',
                                value: '氏名'
                            },
                            {
                                key: 'item',
                                value: [
                                    {
                                        key: 'title',
                                        value: '姓名'
                                    },
                                    {
                                        key: 'type',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 30037
                                            },
                                            {
                                                key: '_ver',
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: 'content',
                                        value: null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        key: 'item-group',
                        value: [
                            {
                                key: 'title',
                                value: '生年月日（和暦）'
                            },
                            {
                                key: 'item',
                                value: [
                                    {
                                        key: 'title',
                                        value: '生年月日（和暦）'
                                    },
                                    {
                                        key: 'type',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 30038
                                            },
                                            {
                                                key: '_ver',
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: 'content',
                                        value: null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        key: 'item-group',
                        value: [
                            {
                                key: 'title',
                                value: '住所'
                            },
                            {
                                key: 'item',
                                value: [
                                    {
                                        key: 'title',
                                        value: '住所'
                                    },
                                    {
                                        key: 'type',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 30035
                                            },
                                            {
                                                key: '_ver',
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: 'content',
                                        value: null
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/person/identification',
                name: 'その他免許証等で写真付きのもの',
                description: '本人性確認で利用するその他免許証等で写真付きのものの定義です。',
                _code: {
                    _value: 30040,
                    _ver: null
                },
                inherit: {
                    _value: 107,
                    _ver: 1
                }
            },
            template: {
                prop: null,
                value: [
                    {
                        key: 'item-group',
                        value: [
                            {
                                key: 'title',
                                value: '氏名'
                            },
                            {
                                key: 'item',
                                value: [
                                    {
                                        key: 'title',
                                        value: '姓名'
                                    },
                                    {
                                        key: 'type',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 30037
                                            },
                                            {
                                                key: '_ver',
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: 'content',
                                        value: null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        key: 'item-group',
                        value: [
                            {
                                key: 'title',
                                value: '生年月日（和暦）'
                            },
                            {
                                key: 'item',
                                value: [
                                    {
                                        key: 'title',
                                        value: '生年月日（和暦）'
                                    },
                                    {
                                        key: 'type',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 30038
                                            },
                                            {
                                                key: '_ver',
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: 'content',
                                        value: null
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/person/identification',
                name: '顔写真付き学生証',
                description: '本人性確認で利用する顔写真付き学生証の定義です。',
                _code: {
                    _value: 30041,
                    _ver: null
                },
                inherit: {
                    _value: 107,
                    _ver: 1
                }
            },
            template: {
                prop: null,
                value: [
                    {
                        key: 'item-group',
                        value: [
                            {
                                key: 'title',
                                value: '氏名'
                            },
                            {
                                key: 'item',
                                value: [
                                    {
                                        key: 'title',
                                        value: '姓名'
                                    },
                                    {
                                        key: 'type',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 30037
                                            },
                                            {
                                                key: '_ver',
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: 'content',
                                        value: null
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/person/identification',
                name: '共済組合員証',
                description: '本人性確認で利用する共済組合員証の定義です。',
                _code: {
                    _value: 30042,
                    _ver: null
                },
                inherit: {
                    _value: 107,
                    _ver: 1
                }
            },
            template: {
                prop: null,
                value: [
                    {
                        key: 'item-group',
                        value: [
                            {
                                key: 'title',
                                value: '氏名'
                            },
                            {
                                key: 'item',
                                value: [
                                    {
                                        key: 'title',
                                        value: '姓名'
                                    },
                                    {
                                        key: 'type',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 30037
                                            },
                                            {
                                                key: '_ver',
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: 'content',
                                        value: null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        key: 'item-group',
                        value: [
                            {
                                key: 'title',
                                value: '性別'
                            },
                            {
                                key: 'item',
                                value: [
                                    {
                                        key: 'title',
                                        value: '性別'
                                    },
                                    {
                                        key: 'type',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 30021
                                            },
                                            {
                                                key: '_ver',
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: 'content',
                                        value: null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        key: 'item-group',
                        value: [
                            {
                                key: 'title',
                                value: '生年月日（和暦）'
                            },
                            {
                                key: 'item',
                                value: [
                                    {
                                        key: 'title',
                                        value: '生年月日（和暦）'
                                    },
                                    {
                                        key: 'type',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 30038
                                            },
                                            {
                                                key: '_ver',
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: 'content',
                                        value: null
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/person/identification',
                name: '国民年金手帳',
                description: '本人性確認で利用する国民年金手帳の定義です。',
                _code: {
                    _value: 30043,
                    _ver: null
                },
                inherit: {
                    _value: 107,
                    _ver: 1
                }
            },
            template: {
                prop: null,
                value: [
                    {
                        key: 'item-group',
                        value: [
                            {
                                key: 'title',
                                value: '氏名'
                            },
                            {
                                key: 'item',
                                value: [
                                    {
                                        key: 'title',
                                        value: '姓名'
                                    },
                                    {
                                        key: 'type',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 30037
                                            },
                                            {
                                                key: '_ver',
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: 'content',
                                        value: null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        key: 'item-group',
                        value: [
                            {
                                key: 'title',
                                value: '性別'
                            },
                            {
                                key: 'item',
                                value: [
                                    {
                                        key: 'title',
                                        value: '性別'
                                    },
                                    {
                                        key: 'type',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 30021
                                            },
                                            {
                                                key: '_ver',
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: 'content',
                                        value: null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        key: 'item-group',
                        value: [
                            {
                                key: 'title',
                                value: '生年月日（和暦）'
                            },
                            {
                                key: 'item',
                                value: [
                                    {
                                        key: 'title',
                                        value: '生年月日（和暦）'
                                    },
                                    {
                                        key: 'type',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 30038
                                            },
                                            {
                                                key: '_ver',
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: 'content',
                                        value: null
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/person/identification',
                name: '国民年金、厚生年金保険又は船員保険にかかる年金証書',
                description: '本人性確認で利用する国民年金、厚生年金保険又は船員保険にかかる年金証書の定義です。',
                _code: {
                    _value: 30044,
                    _ver: null
                },
                inherit: {
                    _value: 107,
                    _ver: 1
                }
            },
            template: {
                prop: null,
                value: [
                    {
                        key: 'item-group',
                        value: [
                            {
                                key: 'title',
                                value: '氏名'
                            },
                            {
                                key: 'item',
                                value: [
                                    {
                                        key: 'title',
                                        value: '姓名'
                                    },
                                    {
                                        key: 'type',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 30037
                                            },
                                            {
                                                key: '_ver',
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: 'content',
                                        value: null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        key: 'item-group',
                        value: [
                            {
                                key: 'title',
                                value: '生年月日（和暦）'
                            },
                            {
                                key: 'item',
                                value: [
                                    {
                                        key: 'title',
                                        value: '生年月日（和暦）'
                                    },
                                    {
                                        key: 'type',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 30038
                                            },
                                            {
                                                key: '_ver',
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: 'content',
                                        value: null
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/built_in/person/identification',
                name: '共済年金又は恩給等の証書',
                description: '本人性確認で利用する共済年金又は恩給等の証書の定義です。',
                _code: {
                    _value: 30045,
                    _ver: null
                },
                inherit: {
                    _value: 107,
                    _ver: 1
                }
            },
            template: {
                prop: null,
                value: [
                    {
                        key: 'item-group',
                        value: [
                            {
                                key: 'title',
                                value: '氏名'
                            },
                            {
                                key: 'item',
                                value: [
                                    {
                                        key: 'title',
                                        value: '姓名'
                                    },
                                    {
                                        key: 'type',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 30037
                                            },
                                            {
                                                key: '_ver',
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: 'content',
                                        value: null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        key: 'item-group',
                        value: [
                            {
                                key: 'title',
                                value: '生年月日（和暦）'
                            },
                            {
                                key: 'item',
                                value: [
                                    {
                                        key: 'title',
                                        value: '生年月日（和暦）'
                                    },
                                    {
                                        key: 'type',
                                        value: [
                                            {
                                                key: '_value',
                                                value: 30038
                                            },
                                            {
                                                key: '_ver',
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: 'content',
                                        value: null
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/ext/test-org/actor/pxr-root',
                name: '流通制御組織',
                description: '流通制御組織の定義です。',
                _code: {
                    _value: 1000001,
                    _ver: null
                },
                inherit: {
                    _value: 50,
                    _ver: 1
                }
            },
            template: {
                prop: null,
                value: [
                    {
                        key: 'main-block',
                        value: [
                            {
                                key: '_value',
                                value: 1000110
                            },
                            {
                                key: '_ver',
                                value: 1
                            }
                        ]
                    },
                    {
                        key: 'status',
                        value: [
                            {
                                key: 'status',
                                value: 'certified'
                            },
                            {
                                key: 'by',
                                value: null
                            },
                            {
                                key: 'at',
                                value: '2020-01-01T00:00:00.000+0900'
                            }
                        ]
                    },
                    {
                        key: 'region-root-cert',
                        value: [
                            {
                                key: 'cert',
                                value: [
                                    {
                                        key: 'title',
                                        value: ''
                                    },
                                    {
                                        key: 'section',
                                        value: [
                                            {
                                                key: 'title',
                                                value: '領域運営サービスプロバイダーの認定基準'
                                            },
                                            {
                                                key: 'content',
                                                value: [
                                                    {
                                                        key: 'sentence',
                                                        value: '領域運営サービスプロバイダーの認定基準です。'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                key: 'audit',
                                value: [
                                    {
                                        key: 'title',
                                        value: ''
                                    },
                                    {
                                        key: 'section',
                                        value: [
                                            {
                                                key: 'title',
                                                value: '領域運営サービスプロバイダーの監査手順'
                                            },
                                            {
                                                key: 'content',
                                                value: [
                                                    {
                                                        key: 'sentence',
                                                        value: '領域運営サービスプロバイダーの監査手順です。'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        key: 'app-cert',
                        value: [
                            {
                                key: 'cert',
                                value: [
                                    {
                                        key: 'title',
                                        value: ''
                                    },
                                    {
                                        key: 'section',
                                        value: [
                                            {
                                                key: 'title',
                                                value: 'アプリケーションプロバイダーの認定基準'
                                            },
                                            {
                                                key: 'content',
                                                value: [
                                                    {
                                                        key: 'sentence',
                                                        value: 'アプリケーションプロバイダーの認定基準です。'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                key: 'audit',
                                value: [
                                    {
                                        key: 'title',
                                        value: ''
                                    },
                                    {
                                        key: 'section',
                                        value: [
                                            {
                                                key: 'title',
                                                value: 'アプリケーションプロバイダーの監査手順'
                                            },
                                            {
                                                key: 'content',
                                                value: [
                                                    {
                                                        key: 'sentence',
                                                        value: 'アプリケーションプロバイダーの監査手順です。'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        key: 'wf-cert',
                        value: [
                            {
                                key: 'cert',
                                value: [
                                    {
                                        key: 'title',
                                        value: ''
                                    },
                                    {
                                        key: 'section',
                                        value: [
                                            {
                                                key: 'title',
                                                value: 'ワークフロープロバイダーの認定基準'
                                            },
                                            {
                                                key: 'content',
                                                value: [
                                                    {
                                                        key: 'sentence',
                                                        value: 'ワークフロープロバイダーの認定基準です。'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                key: 'audit',
                                value: [
                                    {
                                        key: 'title',
                                        value: ''
                                    },
                                    {
                                        key: 'section',
                                        value: [
                                            {
                                                key: 'title',
                                                value: 'ワークフロープロバイダーの監査手順'
                                            },
                                            {
                                                key: 'content',
                                                value: [
                                                    {
                                                        key: 'sentence',
                                                        value: 'ワークフロープロバイダーの監査手順です。'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        key: 'data-trader-cert',
                        value: [
                            {
                                key: 'cert',
                                value: [
                                    {
                                        key: 'title',
                                        value: ''
                                    },
                                    {
                                        key: 'section',
                                        value: [
                                            {
                                                key: 'title',
                                                value: 'データ取引サービスプロバイダーの認定基準'
                                            },
                                            {
                                                key: 'content',
                                                value: [
                                                    {
                                                        key: 'sentence',
                                                        value: 'データ取引サービスプロバイダーの認定基準です。'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                key: 'audit',
                                value: [
                                    {
                                        key: 'title',
                                        value: ''
                                    },
                                    {
                                        key: 'section',
                                        value: [
                                            {
                                                key: 'title',
                                                value: 'データ取引サービスプロバイダーの監査手順'
                                            },
                                            {
                                                key: 'content',
                                                value: [
                                                    {
                                                        key: 'sentence',
                                                        value: 'データ取引サービスプロバイダーの監査手順です。'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        key: 'consumer-cert',
                        value: [
                            {
                                key: 'cert',
                                value: [
                                    {
                                        key: 'title',
                                        value: ''
                                    },
                                    {
                                        key: 'section',
                                        value: [
                                            {
                                                key: 'title',
                                                value: 'データコンシューマーの認定基準'
                                            },
                                            {
                                                key: 'content',
                                                value: [
                                                    {
                                                        key: 'sentence',
                                                        value: 'データコンシューマーの認定基準です。'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                key: 'audit',
                                value: [
                                    {
                                        key: 'title',
                                        value: ''
                                    },
                                    {
                                        key: 'section',
                                        value: [
                                            {
                                                key: 'title',
                                                value: 'データコンシューマーの監査手順'
                                            },
                                            {
                                                key: 'content',
                                                value: [
                                                    {
                                                        key: 'sentence',
                                                        value: 'データコンシューマーの監査手順です。'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        key: 'statement',
                        value: [
                            {
                                key: 'title',
                                value: '組織ステートメント'
                            },
                            {
                                key: 'section',
                                value: [
                                    {
                                        key: 'title',
                                        value: 'ご挨拶'
                                    },
                                    {
                                        key: 'content',
                                        value: [
                                            {
                                                key: 'sentence',
                                                value: 'データ取引組織のステートメントです。'
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                key: 'section',
                                value: [
                                    {
                                        key: 'title',
                                        value: '事業概要'
                                    },
                                    {
                                        key: 'content',
                                        value: [
                                            {
                                                key: 'sentence',
                                                value: 'データ取引組織の事業概要です。'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        key: 'information-site',
                        value: ''
                    }
                ]
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/ext/test-org/actor/region-root',
                name: 'organization',
                description: 'organizationの定義です。',
                _code: {
                    _value: 1000002,
                    _ver: null
                },
                inherit: {
                    _value: 49,
                    _ver: 1
                }
            },
            template: {
                prop: null,
                value: [
                    {
                        key: 'main-block',
                        value: [
                            {
                                key: '_value',
                                value: 1000111
                            },
                            {
                                key: '_ver',
                                value: 1
                            }
                        ]
                    },
                    {
                        key: 'region',
                        value: [
                            {
                                key: '_value',
                                value: 1000003
                            },
                            {
                                key: '_ver',
                                value: 1
                            }
                        ]
                    },
                    {
                        key: 'region',
                        value: [
                            {
                                key: '_value',
                                value: 1000069
                            },
                            {
                                key: '_ver',
                                value: 1
                            }
                        ]
                    },
                    {
                        key: 'region',
                        value: [
                            {
                                key: '_value',
                                value: 1000116
                            },
                            {
                                key: '_ver',
                                value: 1
                            }
                        ]
                    },
                    {
                        key: 'trader-alliance',
                        value: [
                            {
                                key: '_value',
                                value: 1000020
                            },
                            {
                                key: '_ver',
                                value: 1
                            }
                        ]
                    },
                    {
                        key: 'statement',
                        value: [
                            {
                                key: 'title',
                                value: '組織ステートメント'
                            },
                            {
                                key: 'section',
                                value: [
                                    {
                                        key: 'title',
                                        value: 'ご挨拶'
                                    },
                                    {
                                        key: 'content',
                                        value: [
                                            {
                                                key: 'sentence',
                                                value: 'organizationの組織ステートメントです。'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        key: 'status',
                        value: [
                            {
                                key: 'status',
                                value: 'certified'
                            },
                            {
                                key: 'by',
                                value: [
                                    {
                                        key: '_value',
                                        value: 1000001
                                    },
                                    {
                                        key: '_ver',
                                        value: 1
                                    }
                                ]
                            },
                            {
                                key: 'at',
                                value: '2020-01-01T00:00:00.000+0900'
                            }
                        ]
                    },
                    {
                        key: 'information-site',
                        value: 'http://www.test-org.jp/organization/index.html'
                    }
                ]
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/ext/test-org/actor/region-root/actor_1000002/region',
                name: 'テスト用リージョン',
                description: 'テスト用リージョンの定義です',
                _code: {
                    _value: 1000003,
                    _ver: null
                },
                inherit: {
                    _value: 48,
                    _ver: null
                }
            },
            template: {
                prop: null,
                value: [
                    {
                        key: 'statement',
                        value: [
                            {
                                key: 'title',
                                value: 'リージョンステートメント'
                            },
                            {
                                key: 'section',
                                value: [
                                    {
                                        key: 'title',
                                        value: 'テスト用プロジェクト概要'
                                    },
                                    {
                                        key: 'content',
                                        value: [
                                            {
                                                key: 'sentence',
                                                value: 'リージョンステートメントです'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        key: 'wf-alliance',
                        value: [
                            {
                                key: '_value',
                                value: 1000004
                            },
                            {
                                key: '_ver',
                                value: 1
                            }
                        ]
                    },
                    {
                        key: 'information-site',
                        value: 'http://www.test-org.jp/organization/overview/research-projects/p02/index.html'
                    }
                ]
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/ext/test-org/actor/wf',
                name: 'テスト用研究プロジェクト',
                description: 'テスト用研究プロジェクトです',
                _code: {
                    _value: 1000004,
                    _ver: null
                },
                inherit: {
                    _value: 47,
                    _ver: 1
                }
            },
            template: {
                prop: null,
                value: [
                    {
                        key: 'main-block',
                        value: [
                            {
                                key: '_value',
                                value: 1000112
                            },
                            {
                                key: '_ver',
                                value: 1
                            }
                        ]
                    },
                    {
                        key: 'statement',
                        value: [
                            {
                                key: 'title',
                                value: '組織ステートメント'
                            },
                            {
                                key: 'section',
                                value: [
                                    {
                                        key: 'title',
                                        value: 'ご挨拶'
                                    },
                                    {
                                        key: 'content',
                                        value: [
                                            {
                                                key: 'sentence',
                                                value: 'テスト用研究プロジェクトの組織ステートメントです。'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        key: 'status',
                        value: [
                            {
                                key: 'status',
                                value: 'certified'
                            },
                            {
                                key: 'by',
                                value: [
                                    {
                                        key: '_value',
                                        value: 1000001
                                    },
                                    {
                                        key: '_ver',
                                        value: 1
                                    }
                                ]
                            },
                            {
                                key: 'at',
                                value: '2020-01-01T00:00:00.000+0900'
                            }
                        ]
                    },
                    {
                        key: 'workflow',
                        value: [
                            {
                                key: '_value',
                                value: 1000007
                            },
                            {
                                key: '_ver',
                                value: 1
                            }
                        ]
                    },
                    {
                        key: 'region-alliance',
                        value: [
                            {
                                key: '_value',
                                value: 1000003
                            },
                            {
                                key: '_ver',
                                value: 1
                            }
                        ]
                    },
                    {
                        key: 'information-site',
                        value: ''
                    }
                ]
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/ext/test-org/actor/wf/actor_1000004/role',
                name: '研究員',
                description: 'テスト用研究プロジェクトの研究員です。',
                _code: {
                    _value: 1000005,
                    _ver: null
                },
                inherit: {
                    _value: 43,
                    _ver: null
                }
            },
            template: null,
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/ext/test-org/actor/wf/actor_1000004/store',
                name: 'テスト用研究プロジェクトが蓄積可能なデータ',
                description: 'テスト用研究プロジェクトが蓄積可能なデータ定義です。',
                _code: {
                    _value: 1000006,
                    _ver: null
                },
                inherit: {
                    _value: 44,
                    _ver: null
                }
            },
            template: {
                prop: null,
                value: [
                    {
                        key: 'store',
                        value: [
                            {
                                key: 'role',
                                value: [
                                    {
                                        key: '_value',
                                        value: 1000005
                                    },
                                    {
                                        key: '_ver',
                                        value: 1
                                    }
                                ]
                            },
                            {
                                key: 'event',
                                value: [
                                    {
                                        key: '_value',
                                        value: 1000009
                                    },
                                    {
                                        key: '_ver',
                                        value: 1
                                    }
                                ]
                            },
                            {
                                key: 'event',
                                value: [
                                    {
                                        key: '_value',
                                        value: 1000008
                                    },
                                    {
                                        key: '_ver',
                                        value: 1
                                    }
                                ]
                            },
                            {
                                key: 'thing',
                                value: [
                                    {
                                        key: '_value',
                                        value: 1000010
                                    },
                                    {
                                        key: '_ver',
                                        value: 1
                                    }
                                ]
                            },
                            {
                                key: 'thing',
                                value: [
                                    {
                                        key: '_value',
                                        value: 1000011
                                    },
                                    {
                                        key: '_ver',
                                        value: 1
                                    }
                                ]
                            },
                            {
                                key: 'thing',
                                value: [
                                    {
                                        key: '_value',
                                        value: 1000012
                                    },
                                    {
                                        key: '_ver',
                                        value: 1
                                    }
                                ]
                            },
                            {
                                key: 'thing',
                                value: [
                                    {
                                        key: '_value',
                                        value: 1000013
                                    },
                                    {
                                        key: '_ver',
                                        value: 1
                                    }
                                ]
                            },
                            {
                                key: 'thing',
                                value: [
                                    {
                                        key: '_value',
                                        value: 1000014
                                    },
                                    {
                                        key: '_ver',
                                        value: 1
                                    }
                                ]
                            },
                            {
                                key: 'thing',
                                value: [
                                    {
                                        key: '_value',
                                        value: 1000015
                                    },
                                    {
                                        key: '_ver',
                                        value: 1
                                    }
                                ]
                            },
                            {
                                key: 'thing',
                                value: [
                                    {
                                        key: '_value',
                                        value: 1000016
                                    },
                                    {
                                        key: '_ver',
                                        value: 1
                                    }
                                ]
                            },
                            {
                                key: 'thing',
                                value: [
                                    {
                                        key: '_value',
                                        value: 1000017
                                    },
                                    {
                                        key: '_ver',
                                        value: 1
                                    }
                                ]
                            },
                            {
                                key: 'thing',
                                value: [
                                    {
                                        key: '_value',
                                        value: 1000018
                                    },
                                    {
                                        key: '_ver',
                                        value: 1
                                    }
                                ]
                            },
                            {
                                key: 'thing',
                                value: [
                                    {
                                        key: '_value',
                                        value: 1000019
                                    },
                                    {
                                        key: '_ver',
                                        value: 1
                                    }
                                ]
                            },
                            {
                                key: 'thing',
                                value: [
                                    {
                                        key: '_value',
                                        value: 1000037
                                    },
                                    {
                                        key: '_ver',
                                        value: 1
                                    }
                                ]
                            },
                            {
                                key: 'thing',
                                value: [
                                    {
                                        key: '_value',
                                        value: 1000038
                                    },
                                    {
                                        key: '_ver',
                                        value: 1
                                    }
                                ]
                            },
                            {
                                key: 'thing',
                                value: [
                                    {
                                        key: '_value',
                                        value: 1000039
                                    },
                                    {
                                        key: '_ver',
                                        value: 1
                                    }
                                ]
                            },
                            {
                                key: 'thing',
                                value: [
                                    {
                                        key: '_value',
                                        value: 1000040
                                    },
                                    {
                                        key: '_ver',
                                        value: 1
                                    }
                                ]
                            },
                            {
                                key: 'thing',
                                value: [
                                    {
                                        key: '_value',
                                        value: 1000041
                                    },
                                    {
                                        key: '_ver',
                                        value: 1
                                    }
                                ]
                            },
                            {
                                key: 'thing',
                                value: [
                                    {
                                        key: '_value',
                                        value: 1000042
                                    },
                                    {
                                        key: '_ver',
                                        value: 1
                                    }
                                ]
                            },
                            {
                                key: 'thing',
                                value: [
                                    {
                                        key: '_value',
                                        value: 1000043
                                    },
                                    {
                                        key: '_ver',
                                        value: 1
                                    }
                                ]
                            },
                            {
                                key: 'thing',
                                value: [
                                    {
                                        key: '_value',
                                        value: 1000044
                                    },
                                    {
                                        key: '_ver',
                                        value: 1
                                    }
                                ]
                            },
                            {
                                key: 'thing',
                                value: [
                                    {
                                        key: '_value',
                                        value: 1000045
                                    },
                                    {
                                        key: '_ver',
                                        value: 1
                                    }
                                ]
                            },
                            {
                                key: 'thing',
                                value: [
                                    {
                                        key: '_value',
                                        value: 1000046
                                    },
                                    {
                                        key: '_ver',
                                        value: 1
                                    }
                                ]
                            },
                            {
                                key: 'thing',
                                value: [
                                    {
                                        key: '_value',
                                        value: 1000047
                                    },
                                    {
                                        key: '_ver',
                                        value: 1
                                    }
                                ]
                            },
                            {
                                key: 'thing',
                                value: [
                                    {
                                        key: '_value',
                                        value: 1000048
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
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/ext/test-org/actor/wf/actor_1000004/workflow',
                name: 'テスト用研究プロジェクト',
                description: 'テスト用研究プロジェクトの定義です。',
                _code: {
                    _value: 1000007,
                    _ver: null
                },
                inherit: {
                    _value: 46,
                    _ver: null
                }
            },
            template: {
                prop: null,
                value: [
                    {
                        key: 'store',
                        value: [
                            {
                                key: '_value',
                                value: 1000006
                            },
                            {
                                key: '_ver',
                                value: 1
                            }
                        ]
                    },
                    {
                        key: 'share',
                        value: [
                            {
                                key: '_value',
                                value: 1000384
                            },
                            {
                                key: '_ver',
                                value: 1
                            }
                        ]
                    },
                    {
                        key: 'information-site',
                        value: ''
                    }
                ]
            },
            inner: null,
            attribute: null
        },
        {
            catalogItem: {
                ns: 'catalog/ext/test-org/event/actor_1000004',
                name: '個人が日常生活を送る',
                description: [
                    {
                        // 空オブジェクトおよびnull要素についてテストを追加
                    },
                    null,
                    {
                        key: 'title',
                        value: 'テスト用研究プロジェクトのイベント（個人が日常生活を送る）の定義です。'
                    },
                    {
                        key: 'section',
                        value: [
                            {
                                key: 'title',
                                value: '収集時期・期間'
                            },
                            {
                                key: 'content',
                                value: [
                                    {
                                        key: 'sentence',
                                        value: '収集時期・期間を記載します。'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        key: 'section',
                        value: [
                            {
                                key: 'title',
                                value: '収集場所'
                            },
                            {
                                key: 'content',
                                value: [
                                    {
                                        key: 'sentence',
                                        value: '収集場所を記載します。'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        key: 'section',
                        value: [
                            {
                                key: 'title',
                                value: '収集対象者'
                            },
                            {
                                key: 'content',
                                value: [
                                    {
                                        key: 'sentence',
                                        value: '収集対象者を記載します。'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        key: 'section',
                        value: [
                            {
                                key: 'title',
                                value: '収集単位'
                            },
                            {
                                key: 'content',
                                value: [
                                    {
                                        key: 'sentence',
                                        value: '収集単位を記載します。'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        key: 'section',
                        value: [
                            {
                                key: 'title',
                                value: '研究目的'
                            },
                            {
                                key: 'content',
                                value: [
                                    {
                                        key: 'sentence',
                                        value: '研究目的を記載します。'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        key: 'section',
                        value: [
                            {
                                key: 'title',
                                value: '収集データ種類・センサ仕様'
                            },
                            {
                                key: 'content',
                                value: [
                                    {
                                        key: 'sentence',
                                        value: '収集データ種類・センサ仕様を記載します。'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        key: 'section',
                        value: [
                            {
                                key: 'title',
                                value: '収集データ数'
                            },
                            {
                                key: 'content',
                                value: [
                                    {
                                        key: 'sentence',
                                        value: '収集データ数を記載します。'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        key: 'section',
                        value: [
                            {
                                key: 'title',
                                value: '１イベントの開始～終了時刻'
                            },
                            {
                                key: 'content',
                                value: [
                                    {
                                        key: 'sentence',
                                        value: '１イベントの開始～終了時刻を記載します。'
                                    }
                                ]
                            }
                        ]
                    }
                ],
                _code: {
                    _value: 1000008,
                    _ver: null
                },
                inherit: {
                    _value: 53,
                    _ver: 1
                }
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
                                        _value: 1000011,
                                        _ver: 1
                                    },
                                    {
                                        _value: 1000012,
                                        _ver: 1
                                    },
                                    {
                                        _value: 1000013,
                                        _ver: 1
                                    },
                                    {
                                        _value: 1000039,
                                        _ver: 1
                                    },
                                    {
                                        _value: 1000040,
                                        _ver: 1
                                    },
                                    {
                                        _value: 1000041,
                                        _ver: 1
                                    },
                                    {
                                        _value: 1000042,
                                        _ver: 1
                                    },
                                    {
                                        _value: 1000043,
                                        _ver: 1
                                    },
                                    {
                                        _value: 1000044,
                                        _ver: 1
                                    },
                                    {
                                        _value: 1000045,
                                        _ver: 1
                                    },
                                    {
                                        _value: 1000046,
                                        _ver: 1
                                    },
                                    {
                                        _value: 1000047,
                                        _ver: 1
                                    },
                                    {
                                        _value: 1000048,
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
                                value: 1000008
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
                                        value: 1000004
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
                                        key: '_value',
                                        value: 1000007
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
            inner: null,
            attribute: null
        }
    ];
}
