/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/**
 * カタログレスポンス
 */
export namespace CatalogBulkResponse {
    const NULL: any = null;

    export const list: {}[] =
        [
            {
                catalogItem: {
                    ns: 'catalog/model/format',
                    name: 'GPGGA形式',
                    _code: {
                        _value: 1,
                        _ver: 1
                    },
                    inherit: null,
                    description: '位置の値フォーマット（$GPGGA,m1,m2,c1,m3,c2,d1,d2,f1,f2,M,f3,M,f4,d3*cc形式）の定義です。'
                },
                template: {
                    _code: {
                        _value: 1,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/purpose',
                    name: '利用目的',
                    _code: {
                        _value: 3,
                        _ver: 1
                    },
                    inherit: null,
                    description: '提供先のアクターが提供されたデータを利用する目的のカテゴリの定義です。'
                },
                template: {
                    _code: {
                        _value: 3,
                        _ver: 1
                    },
                    statement: null
                },
                prop: [
                    {
                        key: 'statement',
                        type: {
                            of: 'item',
                            _code: null,
                            cmatrix: null,
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
                        description: '組織ステートメント',
                        isInherit: false
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/data-supply-contract/condition',
                    name: '対象者の選択条件',
                    _code: {
                        _value: 4,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'データ提供対象者の選択条件の定義です。値が一致した個人属性情報を持つ個人を対象者とします。'
                },
                template: {
                    _code: {
                        _value: 4,
                        _ver: 1
                    },
                    'item-type': null,
                    target: null
                },
                prop: [
                    {
                        key: 'item-type',
                        type: {
                            of: 'code',
                            cmatrix: null,
                            candidate: {
                                ns: [
                                    'catalog/model/person/item-type',
                                    'catalog/built_in/person/item-type',
                                    'catalog/ext/test-org/person/item-type'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: '条件となる個人属性情報カタログコード',
                        isInherit: false
                    },
                    {
                        key: 'target',
                        type: {
                            of: 'code',
                            cmatrix: null,
                            candidate: null
                        },
                        description: '対象条件',
                        isInherit: false
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/format',
                    name: 'yyyyMMdd形式',
                    _code: {
                        _value: 5,
                        _ver: 1
                    },
                    inherit: null,
                    description: '時刻の値フォーマット（yyyyMMdd形式）の定義です。'
                },
                template: {
                    _code: {
                        _value: 5,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/format',
                    name: 'yyyyMMddTHHmmss.SSSZ形式',
                    _code: {
                        _value: 6,
                        _ver: 1
                    },
                    inherit: null,
                    description: '時刻の値フォーマット（yyyyMMddTHHmmss.SSSZ形式）の定義です。'
                },
                template: {
                    _code: {
                        _value: 6,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/qualitative/gender',
                    name: '女',
                    _code: {
                        _value: 7,
                        _ver: 1
                    },
                    inherit: null,
                    description: '性別の候補値（女）の定義です。'
                },
                template: {
                    _code: {
                        _value: 7,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/qualitative/gender',
                    name: '男',
                    _code: {
                        _value: 8,
                        _ver: 1
                    },
                    inherit: null,
                    description: '性別の候補値（男）の定義です。'
                },
                template: {
                    _code: {
                        _value: 8,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/qualitative/relation/trust',
                    name: '信託元',
                    _code: {
                        _value: 9,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'My-Condition-Bookの管理に関する信託関係の候補値（信託元、受益人）の定義です。'
                },
                template: {
                    _code: {
                        _value: 9,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/qualitative/relation/trust',
                    name: '信託先',
                    _code: {
                        _value: 10,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'My-Condition-Bookの管理に関する信託関係の候補値（信託先、被信託人）の定義です。'
                },
                template: {
                    _code: {
                        _value: 10,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/cmatrix/1',
                    name: '個人識別子列',
                    _code: {
                        _value: 11,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'CMatrixの個人識別子列の定義です。'
                },
                template: {
                    '@value': {
                        index: '1_1',
                        value: NULL
                    },
                    _code: {
                        _value: 11,
                        _ver: 1
                    },
                    index: '1_1',
                    value: NULL
                },
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
                        },
                        description: null,
                        isInherit: false
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/cmatrix/2',
                    name: '生年月日列',
                    _code: {
                        _value: 12,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'CMatrixの生年月日列の定義です。'
                },
                template: {
                    '@value': {
                        index: '1_2',
                        value: NULL
                    },
                    _code: {
                        _value: 12,
                        _ver: 1
                    },
                    index: '1_2',
                    value: NULL
                },
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
                        },
                        description: null,
                        isInherit: false
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/cmatrix/1',
                    name: '性別列',
                    _code: {
                        _value: 13,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'CMatrixの性別列の定義です。'
                },
                template: {
                    '@value': {
                        index: '1_3',
                        value: NULL
                    },
                    _code: {
                        _value: 13,
                        _ver: 1
                    },
                    index: '1_3',
                    value: NULL
                },
                prop: [
                    {
                        key: '@value',
                        type: {
                            of: 'code',
                            cmatrix: {
                                index: '1_3',
                                reserved: true
                            },
                            candidate: {
                                ns: [
                                    'catalog/model/qualitative/gender'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: null,
                        isInherit: false
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/cmatrix/2/1',
                    name: 'ドキュメント識別子列',
                    _code: {
                        _value: 14,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'CMatrixのドキュメント識別子列の定義です。'
                },
                template: {
                    '@value': {
                        index: '2_1_1',
                        value: NULL
                    },
                    _code: {
                        _value: 14,
                        _ver: 1
                    },
                    index: '2_1_1',
                    value: NULL
                },
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
                        },
                        description: null,
                        isInherit: false
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/cmatrix/2/1',
                    name: 'ドキュメント種別コード列',
                    _code: {
                        _value: 15,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'CMatrixのドキュメント種別列の定義です。'
                },
                template: {
                    '@value': {
                        index: '2_1_2',
                        value: NULL
                    },
                    _code: {
                        _value: 15,
                        _ver: 1
                    },
                    index: '2_1_2',
                    value: NULL
                },
                prop: [
                    {
                        key: '@value',
                        type: {
                            of: 'code',
                            cmatrix: {
                                index: '2_1_2',
                                reserved: true
                            },
                            candidate: null
                        },
                        description: null,
                        isInherit: false
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/cmatrix/2/2',
                    name: 'ドキュメント作成時刻列',
                    _code: {
                        _value: 16,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'CMatrixのドキュメント作成時刻列の定義です。'
                },
                template: {
                    '@value': {
                        index: '2_2_1',
                        value: NULL
                    },
                    _code: {
                        _value: 16,
                        _ver: 1
                    },
                    index: '2_2_1',
                    value: NULL
                },
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
                        },
                        description: null,
                        isInherit: false
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/cmatrix/3/1',
                    name: 'イベント識別子列',
                    _code: {
                        _value: 17,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'CMatrixのイベント識別子列の定義です。'
                },
                template: {
                    '@value': {
                        index: '3_1_1',
                        value: NULL
                    },
                    _code: {
                        _value: 17,
                        _ver: 1
                    },
                    index: '3_1_1',
                    value: NULL
                },
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
                        },
                        description: null,
                        isInherit: false
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/cmatrix/3/1',
                    name: 'イベント種別コード列',
                    _code: {
                        _value: 18,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'CMatrixのイベント種別列の定義です。'
                },
                template: {
                    '@value': {
                        index: '3_1_2',
                        value: NULL
                    },
                    _code: {
                        _value: 18,
                        _ver: 1
                    },
                    index: '3_1_2',
                    value: NULL
                },
                prop: [
                    {
                        key: '@value',
                        type: {
                            of: 'code',
                            cmatrix: {
                                index: '3_1_2',
                                reserved: true
                            },
                            candidate: null
                        },
                        description: null,
                        isInherit: false
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/cmatrix/3/2',
                    name: 'イベントの開始時刻列',
                    _code: {
                        _value: 19,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'CMatrixのイベントの開始時刻列の定義です。'
                },
                template: {
                    '@value': {
                        index: '3_2_1',
                        value: NULL
                    },
                    _code: {
                        _value: 19,
                        _ver: 1
                    },
                    index: '3_2_1',
                    value: NULL
                },
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
                        },
                        description: null,
                        isInherit: false
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/cmatrix/3/2',
                    name: 'イベントの終了時刻列',
                    _code: {
                        _value: 20,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'CMatrixのイベントの終了時刻列の定義です。'
                },
                template: {
                    '@value': {
                        index: '3_2_2',
                        value: NULL
                    },
                    _code: {
                        _value: 20,
                        _ver: 1
                    },
                    index: '3_2_2',
                    value: NULL
                },
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
                        },
                        description: null,
                        isInherit: false
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/cmatrix/3/3',
                    name: 'イベント発生位置列',
                    _code: {
                        _value: 21,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'CMatrixのイベント発生位置列の定義です。'
                },
                template: {
                    '@value': {
                        index: '3_3_1',
                        value: NULL
                    },
                    _code: {
                        _value: 21,
                        _ver: 1
                    },
                    index: '3_3_1',
                    value: NULL
                },
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
                        },
                        description: null,
                        isInherit: false
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/cmatrix/3/5',
                    name: 'イベントを発生させたアクター識別子列',
                    _code: {
                        _value: 22,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'CMatrixのイベントを発生させたアクター識別子列の定義です。'
                },
                template: {
                    '@value': {
                        index: '3_5_1',
                        value: NULL
                    },
                    _code: {
                        _value: 22,
                        _ver: 1
                    },
                    index: '3_5_1',
                    value: NULL
                },
                prop: [
                    {
                        key: '@value',
                        type: {
                            of: 'code',
                            cmatrix: {
                                index: '3_5_1',
                                reserved: true
                            },
                            candidate: null
                        },
                        description: null,
                        isInherit: false
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/cmatrix/3/5',
                    name: 'ワークフロー識別子列',
                    _code: {
                        _value: 23,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'CMatrixのワークフロー識別子列の定義です。'
                },
                template: {
                    '@value': {
                        index: '3_5_2',
                        value: NULL
                    },
                    _code: {
                        _value: 23,
                        _ver: 1
                    },
                    index: '3_5_2',
                    value: NULL
                },
                prop: [
                    {
                        key: '@value',
                        type: {
                            of: 'code',
                            cmatrix: {
                                index: '3_5_2',
                                reserved: true
                            },
                            candidate: null
                        },
                        description: null,
                        isInherit: false
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/cmatrix/3/5',
                    name: 'ワークフローロール識別子列',
                    _code: {
                        _value: 24,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'CMatrixのワークフローロール識別子列の定義です。'
                },
                template: {
                    '@value': {
                        index: '3_5_3',
                        value: NULL
                    },
                    _code: {
                        _value: 24,
                        _ver: 1
                    },
                    index: '3_5_3',
                    value: NULL
                },
                prop: [
                    {
                        key: '@value',
                        type: {
                            of: 'code',
                            cmatrix: {
                                index: '3_5_3',
                                reserved: true
                            },
                            candidate: null
                        },
                        description: null,
                        isInherit: false
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/cmatrix/3/5',
                    name: 'ワークフロー職員識別子列',
                    _code: {
                        _value: 25,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'CMatrixのワークフロー職員識別子列の定義です。'
                },
                template: {
                    '@value': {
                        index: '3_5_4',
                        value: NULL
                    },
                    _code: {
                        _value: 25,
                        _ver: 1
                    },
                    index: '3_5_4',
                    value: NULL
                },
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
                        },
                        description: null,
                        isInherit: false
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/cmatrix/3/5',
                    name: 'アプリケーション識別子列',
                    _code: {
                        _value: 26,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'CMatrixのアプリケーション識別子列の定義です。'
                },
                template: {
                    '@value': {
                        index: '3_5_5',
                        value: NULL
                    },
                    _code: {
                        _value: 26,
                        _ver: 1
                    },
                    index: '3_5_5',
                    value: NULL
                },
                prop: [
                    {
                        key: '@value',
                        type: {
                            of: 'code',
                            cmatrix: {
                                index: '3_5_5',
                                reserved: true
                            },
                            candidate: null
                        },
                        description: null,
                        isInherit: false
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/cmatrix/4/1',
                    name: 'モノ識別子列',
                    _code: {
                        _value: 27,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'CMatrixのモノ識別子列の定義です。'
                },
                template: {
                    '@value': {
                        index: '4_1_1',
                        value: NULL
                    },
                    _code: {
                        _value: 27,
                        _ver: 1
                    },
                    index: '4_1_1',
                    value: NULL
                },
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
                        },
                        description: null,
                        isInherit: false
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/cmatrix/4/1',
                    name: 'モノ種別コード列',
                    _code: {
                        _value: 28,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'CMatrixのモノ種別列の定義です。'
                },
                template: {
                    '@value': {
                        index: '4_1_2',
                        value: NULL
                    },
                    _code: {
                        _value: 28,
                        _ver: 1
                    },
                    index: '4_1_2',
                    value: NULL
                },
                prop: [
                    {
                        key: '@value',
                        type: {
                            of: 'code',
                            cmatrix: {
                                index: '4_1_2',
                                reserved: true
                            },
                            candidate: null
                        },
                        description: null,
                        isInherit: false
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/block',
                    name: 'PXR-Block',
                    _code: {
                        _value: 29,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'PXR-Blockの定義です。'
                },
                template: {
                    _code: {
                        _value: 29,
                        _ver: 1
                    },
                    'actor-type': null,
                    'assigned-organization': null,
                    'assignment-status': null,
                    'base-url': null,
                    'first-login-url': null,
                    id: null,
                    'pxr-portal-first-login-url': null,
                    'service-name': null
                },
                prop: [
                    {
                        key: 'actor-type',
                        type: {
                            of: 'string',
                            cmatrix: null,
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
                        description: 'このPXR-Blockを保有する組織の種別',
                        isInherit: false
                    },
                    {
                        key: 'assigned-organization',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '割当アクター名',
                        isInherit: false
                    },
                    {
                        key: 'assignment-status',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: {
                                value: [
                                    'assigned',
                                    'unassigned'
                                ]
                            }
                        },
                        description: '割当状態',
                        isInherit: false
                    },
                    {
                        key: 'base-url',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'PXR-BlockのベースURL',
                        isInherit: false
                    },
                    {
                        key: 'first-login-url',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '初回ログインURL',
                        isInherit: false
                    },
                    {
                        key: 'id',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'PXR-Block識別子',
                        isInherit: false
                    },
                    {
                        key: 'pxr-portal-first-login-url',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '個人向けポータル初回ログインURL',
                        isInherit: false
                    },
                    {
                        key: 'service-name',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'PXR-Blockのサービス名',
                        isInherit: false
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/block/app',
                    name: 'APP-Block',
                    _code: {
                        _value: 30,
                        _ver: 1
                    },
                    inherit: {
                        _value: 29,
                        _ver: 1
                    },
                    description: 'アプリケーションプロバイダー用PXR-Blockの定義です。'
                },
                template: {
                    _code: {
                        _value: 30,
                        _ver: 1
                    },
                    'actor-type': 'app',
                    'assigned-organization': null,
                    'assignment-status': 'unassigned',
                    'base-url': null,
                    'first-login-url': null,
                    id: null,
                    'pxr-portal-first-login-url': null,
                    'service-name': null
                },
                prop: [
                    {
                        key: 'actor-type',
                        type: {
                            of: 'string',
                            cmatrix: null,
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
                        description: 'このPXR-Blockを保有する組織の種別',
                        isInherit: true
                    },
                    {
                        key: 'assigned-organization',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '割当アクター名',
                        isInherit: true
                    },
                    {
                        key: 'assignment-status',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: {
                                value: [
                                    'assigned',
                                    'unassigned'
                                ]
                            }
                        },
                        description: '割当状態',
                        isInherit: true
                    },
                    {
                        key: 'base-url',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'PXR-BlockのベースURL',
                        isInherit: true
                    },
                    {
                        key: 'first-login-url',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '初回ログインURL',
                        isInherit: true
                    },
                    {
                        key: 'id',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'PXR-Block識別子',
                        isInherit: true
                    },
                    {
                        key: 'pxr-portal-first-login-url',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '個人向けポータル初回ログインURL',
                        isInherit: true
                    },
                    {
                        key: 'service-name',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'PXR-Blockのサービス名',
                        isInherit: true
                    }
                ],
                value: [
                    {
                        key: 'actor-type',
                        value: 'app'
                    },
                    {
                        key: 'assignment-status',
                        value: 'unassigned'
                    }
                ],
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/block/consumer',
                    name: 'Consumer-Block',
                    _code: {
                        _value: 31,
                        _ver: 1
                    },
                    inherit: {
                        _value: 29,
                        _ver: 1
                    },
                    description: 'データコンシューマー用PXR-Blockの定義です。'
                },
                template: {
                    _code: {
                        _value: 31,
                        _ver: 1
                    },
                    'actor-type': 'consumer',
                    'assigned-organization': null,
                    'assignment-status': 'unassigned',
                    'base-url': null,
                    'first-login-url': null,
                    id: null,
                    'pxr-portal-first-login-url': null,
                    'service-name': null
                },
                prop: [
                    {
                        key: 'actor-type',
                        type: {
                            of: 'string',
                            cmatrix: null,
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
                        description: 'このPXR-Blockを保有する組織の種別',
                        isInherit: true
                    },
                    {
                        key: 'assigned-organization',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '割当アクター名',
                        isInherit: true
                    },
                    {
                        key: 'assignment-status',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: {
                                value: [
                                    'assigned',
                                    'unassigned'
                                ]
                            }
                        },
                        description: '割当状態',
                        isInherit: true
                    },
                    {
                        key: 'base-url',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'PXR-BlockのベースURL',
                        isInherit: true
                    },
                    {
                        key: 'first-login-url',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '初回ログインURL',
                        isInherit: true
                    },
                    {
                        key: 'id',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'PXR-Block識別子',
                        isInherit: true
                    },
                    {
                        key: 'pxr-portal-first-login-url',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '個人向けポータル初回ログインURL',
                        isInherit: true
                    },
                    {
                        key: 'service-name',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'PXR-Blockのサービス名',
                        isInherit: true
                    }
                ],
                value: [
                    {
                        key: 'actor-type',
                        value: 'consumer'
                    },
                    {
                        key: 'assignment-status',
                        value: 'unassigned'
                    }
                ],
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/block/data-trader',
                    name: 'Data-Trader-Block',
                    _code: {
                        _value: 32,
                        _ver: 1
                    },
                    inherit: {
                        _value: 29,
                        _ver: 1
                    },
                    description: 'データ取引サービスプロバイダー用PXR-Blockの定義です。'
                },
                template: {
                    _code: {
                        _value: 32,
                        _ver: 1
                    },
                    'actor-type': 'data-trader',
                    'assigned-organization': null,
                    'assignment-status': 'unassigned',
                    'base-url': null,
                    'first-login-url': null,
                    id: null,
                    'pxr-portal-first-login-url': null,
                    'service-name': null
                },
                prop: [
                    {
                        key: 'actor-type',
                        type: {
                            of: 'string',
                            cmatrix: null,
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
                        description: 'このPXR-Blockを保有する組織の種別',
                        isInherit: true
                    },
                    {
                        key: 'assigned-organization',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '割当アクター名',
                        isInherit: true
                    },
                    {
                        key: 'assignment-status',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: {
                                value: [
                                    'assigned',
                                    'unassigned'
                                ]
                            }
                        },
                        description: '割当状態',
                        isInherit: true
                    },
                    {
                        key: 'base-url',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'PXR-BlockのベースURL',
                        isInherit: true
                    },
                    {
                        key: 'first-login-url',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '初回ログインURL',
                        isInherit: true
                    },
                    {
                        key: 'id',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'PXR-Block識別子',
                        isInherit: true
                    },
                    {
                        key: 'pxr-portal-first-login-url',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '個人向けポータル初回ログインURL',
                        isInherit: true
                    },
                    {
                        key: 'service-name',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'PXR-Blockのサービス名',
                        isInherit: true
                    }
                ],
                value: [
                    {
                        key: 'actor-type',
                        value: 'data-trader'
                    },
                    {
                        key: 'assignment-status',
                        value: 'unassigned'
                    }
                ],
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/block/pxr-root',
                    name: 'PXR-Root-Block',
                    _code: {
                        _value: 33,
                        _ver: 1
                    },
                    inherit: {
                        _value: 29,
                        _ver: 1
                    },
                    description: '流通制御サービスプロバイダー用PXR-Blockの定義です。'
                },
                template: {
                    _code: {
                        _value: 33,
                        _ver: 1
                    },
                    'actor-type': 'pxr-root',
                    'assigned-organization': null,
                    'assignment-status': 'unassigned',
                    'base-url': null,
                    'first-login-url': null,
                    id: null,
                    'pxr-portal-first-login-url': null,
                    'service-name': null
                },
                prop: [
                    {
                        key: 'actor-type',
                        type: {
                            of: 'string',
                            cmatrix: null,
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
                        description: 'このPXR-Blockを保有する組織の種別',
                        isInherit: true
                    },
                    {
                        key: 'assigned-organization',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '割当アクター名',
                        isInherit: true
                    },
                    {
                        key: 'assignment-status',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: {
                                value: [
                                    'assigned',
                                    'unassigned'
                                ]
                            }
                        },
                        description: '割当状態',
                        isInherit: true
                    },
                    {
                        key: 'base-url',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'PXR-BlockのベースURL',
                        isInherit: true
                    },
                    {
                        key: 'first-login-url',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '初回ログインURL',
                        isInherit: true
                    },
                    {
                        key: 'id',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'PXR-Block識別子',
                        isInherit: true
                    },
                    {
                        key: 'pxr-portal-first-login-url',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '個人向けポータル初回ログインURL',
                        isInherit: true
                    },
                    {
                        key: 'service-name',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'PXR-Blockのサービス名',
                        isInherit: true
                    }
                ],
                value: [
                    {
                        key: 'actor-type',
                        value: 'pxr-root'
                    },
                    {
                        key: 'assignment-status',
                        value: 'unassigned'
                    }
                ],
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/block/region-root',
                    name: 'Region-Root-Block',
                    _code: {
                        _value: 34,
                        _ver: 1
                    },
                    inherit: {
                        _value: 29,
                        _ver: 1
                    },
                    description: '領域運営サービスプロバイダー用PXR-Blockの定義です。'
                },
                template: {
                    _code: {
                        _value: 34,
                        _ver: 1
                    },
                    'actor-type': 'region-root',
                    'assigned-organization': null,
                    'assignment-status': 'unassigned',
                    'base-url': null,
                    'first-login-url': null,
                    id: null,
                    'pxr-portal-first-login-url': null,
                    'service-name': null
                },
                prop: [
                    {
                        key: 'actor-type',
                        type: {
                            of: 'string',
                            cmatrix: null,
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
                        description: 'このPXR-Blockを保有する組織の種別',
                        isInherit: true
                    },
                    {
                        key: 'assigned-organization',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '割当アクター名',
                        isInherit: true
                    },
                    {
                        key: 'assignment-status',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: {
                                value: [
                                    'assigned',
                                    'unassigned'
                                ]
                            }
                        },
                        description: '割当状態',
                        isInherit: true
                    },
                    {
                        key: 'base-url',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'PXR-BlockのベースURL',
                        isInherit: true
                    },
                    {
                        key: 'first-login-url',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '初回ログインURL',
                        isInherit: true
                    },
                    {
                        key: 'id',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'PXR-Block識別子',
                        isInherit: true
                    },
                    {
                        key: 'pxr-portal-first-login-url',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '個人向けポータル初回ログインURL',
                        isInherit: true
                    },
                    {
                        key: 'service-name',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'PXR-Blockのサービス名',
                        isInherit: true
                    }
                ],
                value: [
                    {
                        key: 'actor-type',
                        value: 'region-root'
                    },
                    {
                        key: 'assignment-status',
                        value: 'unassigned'
                    }
                ],
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/block/wf',
                    name: 'WF-Block',
                    _code: {
                        _value: 35,
                        _ver: 1
                    },
                    inherit: {
                        _value: 29,
                        _ver: 1
                    },
                    description: 'ワークフロープロバイダー用PXR-Blockの定義です。'
                },
                template: {
                    _code: {
                        _value: 35,
                        _ver: 1
                    },
                    'actor-type': 'wf',
                    'assigned-organization': null,
                    'assignment-status': 'unassigned',
                    'base-url': null,
                    'first-login-url': null,
                    id: null,
                    'pxr-portal-first-login-url': null,
                    'service-name': null
                },
                prop: [
                    {
                        key: 'actor-type',
                        type: {
                            of: 'string',
                            cmatrix: null,
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
                        description: 'このPXR-Blockを保有する組織の種別',
                        isInherit: true
                    },
                    {
                        key: 'assigned-organization',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '割当アクター名',
                        isInherit: true
                    },
                    {
                        key: 'assignment-status',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: {
                                value: [
                                    'assigned',
                                    'unassigned'
                                ]
                            }
                        },
                        description: '割当状態',
                        isInherit: true
                    },
                    {
                        key: 'base-url',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'PXR-BlockのベースURL',
                        isInherit: true
                    },
                    {
                        key: 'first-login-url',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '初回ログインURL',
                        isInherit: true
                    },
                    {
                        key: 'id',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'PXR-Block識別子',
                        isInherit: true
                    },
                    {
                        key: 'pxr-portal-first-login-url',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '個人向けポータル初回ログインURL',
                        isInherit: true
                    },
                    {
                        key: 'service-name',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'PXR-Blockのサービス名',
                        isInherit: true
                    }
                ],
                value: [
                    {
                        key: 'actor-type',
                        value: 'wf'
                    },
                    {
                        key: 'assignment-status',
                        value: 'unassigned'
                    }
                ],
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/actor',
                    name: 'アクター',
                    _code: {
                        _value: 36,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'PXRエコシステム上で活動するアクターの定義です。（個人を除く）'
                },
                template: {
                    _code: {
                        _value: 36,
                        _ver: 1
                    },
                    'breakaway-flg': false,
                    category: null,
                    'information-site': null,
                    'main-block': null,
                    'other-block': null,
                    statement: null,
                    status: null
                },
                prop: [
                    {
                        key: 'breakaway-flg',
                        type: {
                            of: 'boolean',
                            cmatrix: null
                        },
                        description: '離脱フラグ',
                        isInherit: false
                    },
                    {
                        key: 'category',
                        type: {
                            of: 'code[]',
                            cmatrix: null,
                            candidate: {
                                ns: [
                                    'catalog/model/category/share/actor',
                                    'catalog/built_in/category/share/actor',
                                    'catalog/ext/test-org/category/share/actor',
                                    'catalog/model/category/supply/actor',
                                    'catalog/built_in/category/supply/actor',
                                    'catalog/ext/test-org/category/supply/actor'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: null,
                        isInherit: false
                    },
                    {
                        key: 'information-site',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '情報サイト',
                        isInherit: false
                    },
                    {
                        key: 'main-block',
                        type: {
                            of: 'code',
                            cmatrix: null,
                            candidate: {
                                ns: null,
                                _code: null,
                                base: {
                                    _value: 29,
                                    _ver: 1
                                }
                            }
                        },
                        description: 'アクター参加時に割り当てられたPXR-Block',
                        isInherit: false
                    },
                    {
                        key: 'other-block',
                        type: {
                            of: 'code[]',
                            cmatrix: null,
                            candidate: {
                                ns: null,
                                _code: null,
                                base: {
                                    _value: 29,
                                    _ver: 1
                                }
                            }
                        },
                        description: '他アクターから引き継いだPXR-Blockの配列',
                        isInherit: false
                    },
                    {
                        key: 'statement',
                        type: {
                            of: 'item[]',
                            cmatrix: null,
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
                        description: '組織ステートメント',
                        isInherit: false
                    },
                    {
                        key: 'status',
                        type: {
                            of: 'inner[]',
                            inner: 'CertStatus',
                            cmatrix: null,
                            candidate: null
                        },
                        description: '認定の履歴',
                        isInherit: false
                    }
                ],
                value: [
                    {
                        key: 'breakaway-flg',
                        value: false
                    }
                ],
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/actor/consumer',
                    name: 'データコンシューマー',
                    _code: {
                        _value: 37,
                        _ver: 1
                    },
                    inherit: {
                        _value: 36,
                        _ver: 1
                    },
                    description: 'データコンシューマーの定義です。'
                },
                template: {
                    _code: {
                        _value: 37,
                        _ver: 1
                    },
                    'breakaway-flg': false,
                    category: null,
                    'information-site': null,
                    'main-block': null,
                    'other-block': null,
                    statement: null,
                    status: null,
                    'trader-alliance': null
                },
                prop: [
                    {
                        key: 'breakaway-flg',
                        type: {
                            of: 'boolean',
                            cmatrix: null
                        },
                        description: '離脱フラグ',
                        isInherit: true
                    },
                    {
                        key: 'category',
                        type: {
                            of: 'code[]',
                            cmatrix: null,
                            candidate: {
                                ns: [
                                    'catalog/model/category/share/actor',
                                    'catalog/built_in/category/share/actor',
                                    'catalog/ext/test-org/category/share/actor',
                                    'catalog/model/category/supply/actor',
                                    'catalog/built_in/category/supply/actor',
                                    'catalog/ext/test-org/category/supply/actor'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: null,
                        isInherit: true
                    },
                    {
                        key: 'information-site',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '情報サイト',
                        isInherit: true
                    },
                    {
                        key: 'main-block',
                        type: {
                            of: 'code',
                            cmatrix: null,
                            candidate: {
                                ns: null,
                                _code: null,
                                base: {
                                    _value: 29,
                                    _ver: 1
                                }
                            }
                        },
                        description: 'アクター参加時に割り当てられたPXR-Block',
                        isInherit: true
                    },
                    {
                        key: 'other-block',
                        type: {
                            of: 'code[]',
                            cmatrix: null,
                            candidate: {
                                ns: null,
                                _code: null,
                                base: {
                                    _value: 29,
                                    _ver: 1
                                }
                            }
                        },
                        description: '他アクターから引き継いだPXR-Blockの配列',
                        isInherit: true
                    },
                    {
                        key: 'statement',
                        type: {
                            of: 'item[]',
                            cmatrix: null,
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
                        description: '組織ステートメント',
                        isInherit: true
                    },
                    {
                        key: 'status',
                        type: {
                            of: 'inner[]',
                            inner: 'CertStatus',
                            cmatrix: null,
                            candidate: null
                        },
                        description: '認定の履歴',
                        isInherit: true
                    },
                    {
                        key: 'trader-alliance',
                        type: {
                            of: 'code[]',
                            cmatrix: null,
                            candidate: {
                                ns: null,
                                _code: null,
                                base: {
                                    _value: 38,
                                    _ver: 1
                                }
                            }
                        },
                        description: '提携するデータ取引サービスプロバイダーのコード配列',
                        isInherit: false
                    }
                ],
                value: [
                    {
                        key: 'breakaway-flg',
                        value: false
                    }
                ],
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/actor/data-trader',
                    name: 'データ取引サービスプロバイダー',
                    _code: {
                        _value: 38,
                        _ver: 1
                    },
                    inherit: {
                        _value: 36,
                        _ver: 1
                    },
                    description: 'データ取引サービスプロバイダーの定義です。'
                },
                template: {
                    _code: {
                        _value: 38,
                        _ver: 1
                    },
                    'breakaway-flg': false,
                    category: null,
                    'consumer-alliance': null,
                    'information-site': null,
                    'main-block': null,
                    'other-block': null,
                    'region-root-alliance': null,
                    statement: null,
                    status: null
                },
                prop: [
                    {
                        key: 'breakaway-flg',
                        type: {
                            of: 'boolean',
                            cmatrix: null
                        },
                        description: '離脱フラグ',
                        isInherit: true
                    },
                    {
                        key: 'category',
                        type: {
                            of: 'code[]',
                            cmatrix: null,
                            candidate: {
                                ns: [
                                    'catalog/model/category/share/actor',
                                    'catalog/built_in/category/share/actor',
                                    'catalog/ext/test-org/category/share/actor',
                                    'catalog/model/category/supply/actor',
                                    'catalog/built_in/category/supply/actor',
                                    'catalog/ext/test-org/category/supply/actor'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: null,
                        isInherit: true
                    },
                    {
                        key: 'consumer-alliance',
                        type: {
                            of: 'code[]',
                            cmatrix: null,
                            candidate: {
                                ns: null,
                                _code: null,
                                base: {
                                    _value: 37,
                                    _ver: 1
                                }
                            }
                        },
                        description: '提携しているデータコンシューマーコード配列',
                        isInherit: false
                    },
                    {
                        key: 'information-site',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '情報サイト',
                        isInherit: true
                    },
                    {
                        key: 'main-block',
                        type: {
                            of: 'code',
                            cmatrix: null,
                            candidate: {
                                ns: null,
                                _code: null,
                                base: {
                                    _value: 29,
                                    _ver: 1
                                }
                            }
                        },
                        description: 'アクター参加時に割り当てられたPXR-Block',
                        isInherit: true
                    },
                    {
                        key: 'other-block',
                        type: {
                            of: 'code[]',
                            cmatrix: null,
                            candidate: {
                                ns: null,
                                _code: null,
                                base: {
                                    _value: 29,
                                    _ver: 1
                                }
                            }
                        },
                        description: '他アクターから引き継いだPXR-Blockの配列',
                        isInherit: true
                    },
                    {
                        key: 'region-root-alliance',
                        type: {
                            of: 'code[]',
                            cmatrix: null,
                            candidate: {
                                ns: null,
                                _code: null,
                                base: {
                                    _value: 49,
                                    _ver: 1
                                }
                            }
                        },
                        description: '提携している領域運営サービスプロバイダーコード配列',
                        isInherit: false
                    },
                    {
                        key: 'statement',
                        type: {
                            of: 'item[]',
                            cmatrix: null,
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
                        description: '組織ステートメント',
                        isInherit: true
                    },
                    {
                        key: 'status',
                        type: {
                            of: 'inner[]',
                            inner: 'CertStatus',
                            cmatrix: null,
                            candidate: null
                        },
                        description: '認定の履歴',
                        isInherit: true
                    }
                ],
                value: [
                    {
                        key: 'breakaway-flg',
                        value: false
                    }
                ],
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/actor/app/store',
                    name: 'アプリケーションが蓄積可能なデータ',
                    _code: {
                        _value: 39,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'アプリケーションが蓄積可能なデータ定義です。'
                },
                template: {
                    _code: {
                        _value: 39,
                        _ver: 1
                    },
                    store: null
                },
                prop: [
                    {
                        key: 'store',
                        type: {
                            of: 'inner[]',
                            inner: 'Store',
                            cmatrix: null,
                            candidate: null
                        },
                        description: '蓄積定義',
                        isInherit: false
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/actor/app/share',
                    name: 'アプリケーションが提供する状態共有機能',
                    _code: {
                        _value: 40,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'アプリケーションが提供する状態共有機能の定義です。'
                },
                template: {
                    _code: {
                        _value: 40,
                        _ver: 1
                    },
                    share: null
                },
                prop: [
                    {
                        key: 'share',
                        type: {
                            of: 'inner[]',
                            inner: 'Share',
                            cmatrix: null,
                            candidate: null
                        },
                        description: '共有定義',
                        isInherit: false
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/actor/app/application',
                    name: 'アプリケーション',
                    _code: {
                        _value: 41,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'アプリケーションの定義です。'
                },
                template: {
                    _code: {
                        _value: 41,
                        _ver: 1
                    },
                    'information-site': null,
                    share: null,
                    store: null
                },
                prop: [
                    {
                        key: 'information-site',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'アプリケーションの情報サイト',
                        isInherit: false
                    },
                    {
                        key: 'share',
                        type: {
                            of: 'code[]',
                            cmatrix: null,
                            candidate: {
                                ns: null,
                                _code: null,
                                base: {
                                    _value: 40,
                                    _ver: 1
                                }
                            }
                        },
                        description: 'アプリケーションが提供する状態共有機能の定義',
                        isInherit: false
                    },
                    {
                        key: 'store',
                        type: {
                            of: 'code[]',
                            cmatrix: null,
                            candidate: {
                                ns: null,
                                _code: null,
                                base: {
                                    _value: 39,
                                    _ver: 1
                                }
                            }
                        },
                        description: 'アプリケーションが蓄積可能なデータの定義',
                        isInherit: false
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/actor/app',
                    name: 'アプリケーションプロバイダー',
                    _code: {
                        _value: 42,
                        _ver: 1
                    },
                    inherit: {
                        _value: 36,
                        _ver: 1
                    },
                    description: 'アプリケーションプロバイダーの定義です。'
                },
                template: {
                    _code: {
                        _value: 42,
                        _ver: 1
                    },
                    application: null,
                    'breakaway-flg': false,
                    category: null,
                    'information-site': null,
                    'main-block': null,
                    'other-block': null,
                    'region-alliance': null,
                    statement: null,
                    status: null
                },
                prop: [
                    {
                        key: 'application',
                        type: {
                            of: 'code[]',
                            cmatrix: null,
                            candidate: {
                                ns: null,
                                _code: null,
                                base: {
                                    _value: 41,
                                    _ver: 1
                                }
                            }
                        },
                        description: 'アプリケーション定義の配列',
                        isInherit: false
                    },
                    {
                        key: 'breakaway-flg',
                        type: {
                            of: 'boolean',
                            cmatrix: null
                        },
                        description: '離脱フラグ',
                        isInherit: true
                    },
                    {
                        key: 'category',
                        type: {
                            of: 'code[]',
                            cmatrix: null,
                            candidate: {
                                ns: [
                                    'catalog/model/category/share/actor',
                                    'catalog/built_in/category/share/actor',
                                    'catalog/ext/test-org/category/share/actor',
                                    'catalog/model/category/supply/actor',
                                    'catalog/built_in/category/supply/actor',
                                    'catalog/ext/test-org/category/supply/actor'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: null,
                        isInherit: true
                    },
                    {
                        key: 'information-site',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '情報サイト',
                        isInherit: true
                    },
                    {
                        key: 'main-block',
                        type: {
                            of: 'code',
                            cmatrix: null,
                            candidate: {
                                ns: null,
                                _code: null,
                                base: {
                                    _value: 29,
                                    _ver: 1
                                }
                            }
                        },
                        description: 'アクター参加時に割り当てられたPXR-Block',
                        isInherit: true
                    },
                    {
                        key: 'other-block',
                        type: {
                            of: 'code[]',
                            cmatrix: null,
                            candidate: {
                                ns: null,
                                _code: null,
                                base: {
                                    _value: 29,
                                    _ver: 1
                                }
                            }
                        },
                        description: '他アクターから引き継いだPXR-Blockの配列',
                        isInherit: true
                    },
                    {
                        key: 'region-alliance',
                        type: {
                            of: 'code[]',
                            cmatrix: null,
                            candidate: {
                                ns: null,
                                _code: null,
                                base: {
                                    _value: 48,
                                    _ver: 1
                                }
                            }
                        },
                        description: '参加している領域運営サービスプロバイダーコード配列',
                        isInherit: false
                    },
                    {
                        key: 'statement',
                        type: {
                            of: 'item[]',
                            cmatrix: null,
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
                        description: '組織ステートメント',
                        isInherit: true
                    },
                    {
                        key: 'status',
                        type: {
                            of: 'inner[]',
                            inner: 'CertStatus',
                            cmatrix: null,
                            candidate: null
                        },
                        description: '認定の履歴',
                        isInherit: true
                    }
                ],
                value: [
                    {
                        key: 'breakaway-flg',
                        value: false
                    }
                ],
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/actor/wf/role',
                    name: 'ワークフロー職員ロール',
                    _code: {
                        _value: 43,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'ワークフロー職員が持つロールの定義です。'
                },
                template: {
                    _code: {
                        _value: 43,
                        _ver: 1
                    },
                    document: null,
                    event: null,
                    licence: null,
                    thing: null
                },
                prop: [
                    {
                        key: 'document',
                        type: {
                            of: 'code[]',
                            cmatrix: null,
                            candidate: {
                                ns: [
                                    'catalog/model/document/*',
                                    'catalog/built_in/document/*',
                                    'catalog/ext/test-org/document/*'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: '作成可能なドキュメント',
                        isInherit: false
                    },
                    {
                        key: 'event',
                        type: {
                            of: 'code[]',
                            cmatrix: null,
                            candidate: {
                                ns: [
                                    'catalog/model/event/*',
                                    'catalog/built_in/event/*',
                                    'catalog/ext/test-org/event/*'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: '作成可能なイベント',
                        isInherit: false
                    },
                    {
                        key: 'licence',
                        type: {
                            of: 'code[]',
                            cmatrix: null,
                            candidate: {
                                ns: [
                                    'catalog/model/licence',
                                    'catalog/built_in/licence',
                                    'catalog/ext/test-org/licence'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: '所持ライセンス',
                        isInherit: false
                    },
                    {
                        key: 'thing',
                        type: {
                            of: 'code[]',
                            cmatrix: null,
                            candidate: {
                                ns: [
                                    'catalog/model/thing/*',
                                    'catalog/built_in/thing/*',
                                    'catalog/ext/test-org/thing/*'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: '作成可能なモノ',
                        isInherit: false
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/actor/wf/store',
                    name: 'ワークフローが蓄積可能なデータ',
                    _code: {
                        _value: 44,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'ワークフローが蓄積可能なデータ定義です。'
                },
                template: {
                    _code: {
                        _value: 44,
                        _ver: 1
                    },
                    store: null
                },
                prop: [
                    {
                        key: 'store',
                        type: {
                            of: 'inner[]',
                            inner: 'Store',
                            cmatrix: null,
                            candidate: null
                        },
                        description: '蓄積定義',
                        isInherit: false
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/actor/wf/share',
                    name: '状態共有機能',
                    _code: {
                        _value: 45,
                        _ver: 1
                    },
                    inherit: null,
                    description: '状態共有機能の定義です。'
                },
                template: {
                    _code: {
                        _value: 45,
                        _ver: 1
                    },
                    share: null
                },
                prop: [
                    {
                        key: 'share',
                        type: {
                            of: 'inner[]',
                            inner: 'Share',
                            cmatrix: null,
                            candidate: null
                        },
                        description: '共有定義',
                        isInherit: false
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/actor/wf/workflow',
                    name: 'ワークフロー',
                    _code: {
                        _value: 46,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'ワークフローの定義です。'
                },
                template: {
                    _code: {
                        _value: 46,
                        _ver: 1
                    },
                    'information-site': null,
                    share: null,
                    store: null
                },
                prop: [
                    {
                        key: 'information-site',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'ワークフローの情報サイト',
                        isInherit: false
                    },
                    {
                        key: 'share',
                        type: {
                            of: 'code[]',
                            cmatrix: null,
                            candidate: {
                                ns: null,
                                _code: null,
                                base: {
                                    _value: 45,
                                    _ver: 1
                                }
                            }
                        },
                        description: 'ワークフローが提供する状態共有機能の定義',
                        isInherit: false
                    },
                    {
                        key: 'store',
                        type: {
                            of: 'code[]',
                            cmatrix: null,
                            candidate: {
                                ns: null,
                                _code: null,
                                base: {
                                    _value: 44,
                                    _ver: 1
                                }
                            }
                        },
                        description: 'ワークフローが蓄積可能なデータの定義',
                        isInherit: false
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/actor/wf',
                    name: 'ワークフロープロバイダー',
                    _code: {
                        _value: 47,
                        _ver: 1
                    },
                    inherit: {
                        _value: 36,
                        _ver: 1
                    },
                    description: 'ワークフロープロバイダーの定義です。'
                },
                template: {
                    _code: {
                        _value: 47,
                        _ver: 1
                    },
                    'breakaway-flg': false,
                    category: null,
                    'information-site': null,
                    'main-block': null,
                    'other-block': null,
                    'region-alliance': null,
                    statement: null,
                    status: null,
                    workflow: null
                },
                prop: [
                    {
                        key: 'breakaway-flg',
                        type: {
                            of: 'boolean',
                            cmatrix: null
                        },
                        description: '離脱フラグ',
                        isInherit: true
                    },
                    {
                        key: 'category',
                        type: {
                            of: 'code[]',
                            cmatrix: null,
                            candidate: {
                                ns: [
                                    'catalog/model/category/share/actor',
                                    'catalog/built_in/category/share/actor',
                                    'catalog/ext/test-org/category/share/actor',
                                    'catalog/model/category/supply/actor',
                                    'catalog/built_in/category/supply/actor',
                                    'catalog/ext/test-org/category/supply/actor'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: null,
                        isInherit: true
                    },
                    {
                        key: 'information-site',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '情報サイト',
                        isInherit: true
                    },
                    {
                        key: 'main-block',
                        type: {
                            of: 'code',
                            cmatrix: null,
                            candidate: {
                                ns: null,
                                _code: null,
                                base: {
                                    _value: 29,
                                    _ver: 1
                                }
                            }
                        },
                        description: 'アクター参加時に割り当てられたPXR-Block',
                        isInherit: true
                    },
                    {
                        key: 'other-block',
                        type: {
                            of: 'code[]',
                            cmatrix: null,
                            candidate: {
                                ns: null,
                                _code: null,
                                base: {
                                    _value: 29,
                                    _ver: 1
                                }
                            }
                        },
                        description: '他アクターから引き継いだPXR-Blockの配列',
                        isInherit: true
                    },
                    {
                        key: 'region-alliance',
                        type: {
                            of: 'code[]',
                            cmatrix: null,
                            candidate: {
                                ns: null,
                                _code: null,
                                base: {
                                    _value: 48,
                                    _ver: 1
                                }
                            }
                        },
                        description: '参加している領域運営サービスプロバイダーコード配列',
                        isInherit: false
                    },
                    {
                        key: 'statement',
                        type: {
                            of: 'item[]',
                            cmatrix: null,
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
                        description: '組織ステートメント',
                        isInherit: true
                    },
                    {
                        key: 'status',
                        type: {
                            of: 'inner[]',
                            inner: 'CertStatus',
                            cmatrix: null,
                            candidate: null
                        },
                        description: '認定の履歴',
                        isInherit: true
                    },
                    {
                        key: 'workflow',
                        type: {
                            of: 'code[]',
                            cmatrix: null,
                            candidate: {
                                ns: null,
                                _code: null,
                                base: {
                                    _value: 46,
                                    _ver: 1
                                }
                            }
                        },
                        description: 'ワークフロー定義の配列',
                        isInherit: false
                    }
                ],
                value: [
                    {
                        key: 'breakaway-flg',
                        value: false
                    }
                ],
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/actor/region-root/region',
                    name: 'Region',
                    _code: {
                        _value: 48,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'Regionの定義です。'
                },
                template: {
                    _code: {
                        _value: 48,
                        _ver: 1
                    },
                    'app-alliance': null,
                    'information-site': null,
                    statement: null,
                    'wf-alliance': null
                },
                prop: [
                    {
                        key: 'app-alliance',
                        type: {
                            of: 'code[]',
                            cmatrix: null,
                            candidate: {
                                ns: null,
                                _code: null,
                                base: {
                                    _value: 42,
                                    _ver: 1
                                }
                            }
                        },
                        description: 'Regionメンバー(アプリケーションプロバイダー)のコード配列',
                        isInherit: false
                    },
                    {
                        key: 'information-site',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'Regionの情報サイト',
                        isInherit: false
                    },
                    {
                        key: 'statement',
                        type: {
                            of: 'item[]',
                            cmatrix: null,
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
                        description: 'Regionステートメント',
                        isInherit: false
                    },
                    {
                        key: 'wf-alliance',
                        type: {
                            of: 'code[]',
                            cmatrix: null,
                            candidate: {
                                ns: null,
                                _code: null,
                                base: {
                                    _value: 47,
                                    _ver: 1
                                }
                            }
                        },
                        description: 'Regionメンバー(ワークフロープロバイダー)のコード配列',
                        isInherit: false
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/actor/region-root',
                    name: '領域運営サービスプロバイダー',
                    _code: {
                        _value: 49,
                        _ver: 1
                    },
                    inherit: {
                        _value: 36,
                        _ver: 1
                    },
                    description: '領域運営サービスプロバイダーの定義です。'
                },
                template: {
                    _code: {
                        _value: 49,
                        _ver: 1
                    },
                    'breakaway-flg': false,
                    category: null,
                    'information-site': null,
                    'main-block': null,
                    'other-block': null,
                    region: null,
                    statement: null,
                    status: null,
                    'trader-alliance': null
                },
                prop: [
                    {
                        key: 'breakaway-flg',
                        type: {
                            of: 'boolean',
                            cmatrix: null
                        },
                        description: '離脱フラグ',
                        isInherit: true
                    },
                    {
                        key: 'category',
                        type: {
                            of: 'code[]',
                            cmatrix: null,
                            candidate: {
                                ns: [
                                    'catalog/model/category/share/actor',
                                    'catalog/built_in/category/share/actor',
                                    'catalog/ext/test-org/category/share/actor',
                                    'catalog/model/category/supply/actor',
                                    'catalog/built_in/category/supply/actor',
                                    'catalog/ext/test-org/category/supply/actor'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: null,
                        isInherit: true
                    },
                    {
                        key: 'information-site',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '情報サイト',
                        isInherit: true
                    },
                    {
                        key: 'main-block',
                        type: {
                            of: 'code',
                            cmatrix: null,
                            candidate: {
                                ns: null,
                                _code: null,
                                base: {
                                    _value: 29,
                                    _ver: 1
                                }
                            }
                        },
                        description: 'アクター参加時に割り当てられたPXR-Block',
                        isInherit: true
                    },
                    {
                        key: 'other-block',
                        type: {
                            of: 'code[]',
                            cmatrix: null,
                            candidate: {
                                ns: null,
                                _code: null,
                                base: {
                                    _value: 29,
                                    _ver: 1
                                }
                            }
                        },
                        description: '他アクターから引き継いだPXR-Blockの配列',
                        isInherit: true
                    },
                    {
                        key: 'region',
                        type: {
                            of: 'code[]',
                            cmatrix: null,
                            candidate: {
                                ns: null,
                                _code: null,
                                base: {
                                    _value: 48,
                                    _ver: 1
                                }
                            }
                        },
                        description: 'Region定義',
                        isInherit: false
                    },
                    {
                        key: 'statement',
                        type: {
                            of: 'item[]',
                            cmatrix: null,
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
                        description: '組織ステートメント',
                        isInherit: true
                    },
                    {
                        key: 'status',
                        type: {
                            of: 'inner[]',
                            inner: 'CertStatus',
                            cmatrix: null,
                            candidate: null
                        },
                        description: '認定の履歴',
                        isInherit: true
                    },
                    {
                        key: 'trader-alliance',
                        type: {
                            of: 'code[]',
                            cmatrix: null,
                            candidate: {
                                ns: null,
                                _code: null,
                                base: {
                                    _value: 38,
                                    _ver: 1
                                }
                            }
                        },
                        description: '提携するデータ取引サービスプロバイダーのコード配列',
                        isInherit: false
                    }
                ],
                value: [
                    {
                        key: 'breakaway-flg',
                        value: false
                    }
                ],
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/actor/pxr-root',
                    name: '流通制御サービスプロバイダー',
                    _code: {
                        _value: 50,
                        _ver: 1
                    },
                    inherit: {
                        _value: 36,
                        _ver: 1
                    },
                    description: '流通制御サービスプロバイダーの定義です。'
                },
                template: {
                    _code: {
                        _value: 50,
                        _ver: 1
                    },
                    'app-cert': null,
                    'breakaway-flg': false,
                    category: null,
                    'consumer-cert': null,
                    'data-trader-cert': null,
                    'information-site': null,
                    'main-block': null,
                    'other-block': null,
                    'region-root-cert': null,
                    statement: null,
                    status: null,
                    'wf-cert': null
                },
                prop: [
                    {
                        key: 'app-cert',
                        type: {
                            of: 'inner',
                            inner: 'Certification',
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'アプリケーションプロバイダー認定',
                        isInherit: false
                    },
                    {
                        key: 'breakaway-flg',
                        type: {
                            of: 'boolean',
                            cmatrix: null
                        },
                        description: '離脱フラグ',
                        isInherit: true
                    },
                    {
                        key: 'category',
                        type: {
                            of: 'code[]',
                            cmatrix: null,
                            candidate: {
                                ns: [
                                    'catalog/model/category/share/actor',
                                    'catalog/built_in/category/share/actor',
                                    'catalog/ext/test-org/category/share/actor',
                                    'catalog/model/category/supply/actor',
                                    'catalog/built_in/category/supply/actor',
                                    'catalog/ext/test-org/category/supply/actor'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: null,
                        isInherit: true
                    },
                    {
                        key: 'consumer-cert',
                        type: {
                            of: 'inner',
                            inner: 'Certification',
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'データコンシューマー認定',
                        isInherit: false
                    },
                    {
                        key: 'data-trader-cert',
                        type: {
                            of: 'inner',
                            inner: 'Certification',
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'データ取引サービスプロバイダー認定',
                        isInherit: false
                    },
                    {
                        key: 'information-site',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '情報サイト',
                        isInherit: true
                    },
                    {
                        key: 'main-block',
                        type: {
                            of: 'code',
                            cmatrix: null,
                            candidate: {
                                ns: null,
                                _code: null,
                                base: {
                                    _value: 29,
                                    _ver: 1
                                }
                            }
                        },
                        description: 'アクター参加時に割り当てられたPXR-Block',
                        isInherit: true
                    },
                    {
                        key: 'other-block',
                        type: {
                            of: 'code[]',
                            cmatrix: null,
                            candidate: {
                                ns: null,
                                _code: null,
                                base: {
                                    _value: 29,
                                    _ver: 1
                                }
                            }
                        },
                        description: '他アクターから引き継いだPXR-Blockの配列',
                        isInherit: true
                    },
                    {
                        key: 'region-root-cert',
                        type: {
                            of: 'inner',
                            inner: 'Certification',
                            cmatrix: null,
                            candidate: null
                        },
                        description: '領域運営サービスプロバイダー認定',
                        isInherit: false
                    },
                    {
                        key: 'statement',
                        type: {
                            of: 'item[]',
                            cmatrix: null,
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
                        description: '組織ステートメント',
                        isInherit: true
                    },
                    {
                        key: 'status',
                        type: {
                            of: 'inner[]',
                            inner: 'CertStatus',
                            cmatrix: null,
                            candidate: null
                        },
                        description: '認定の履歴',
                        isInherit: true
                    },
                    {
                        key: 'wf-cert',
                        type: {
                            of: 'inner',
                            inner: 'Certification',
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'ワークフロープロバイダー認定',
                        isInherit: false
                    }
                ],
                value: [
                    {
                        key: 'breakaway-flg',
                        value: false
                    }
                ],
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/book',
                    name: 'My-Condition-Book',
                    _code: {
                        _value: 51,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'My-Condition-Bookの定義です。'
                },
                template: {
                    _code: {
                        _value: 51,
                        _ver: 1
                    },
                    birthday: {
                        index: '1_2',
                        value: NULL
                    },
                    'creation-log': null,
                    document: null,
                    event: null,
                    gender: {
                        index: '1_3',
                        value: NULL
                    },
                    id: {
                        index: '1_1',
                        value: NULL
                    },
                    identification: null,
                    'share-log': null,
                    'share-policy': null,
                    'supply-policy': null
                },
                prop: [
                    {
                        key: 'birthday',
                        type: {
                            of: 'item',
                            _code: {
                                _value: 12,
                                _ver: 1
                            },
                            cmatrix: null,
                            candidate: null
                        },
                        description: '生年月日',
                        isInherit: false
                    },
                    {
                        key: 'creation-log',
                        type: {
                            of: 'inner',
                            inner: 'CreationLog',
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'Book開設ログ',
                        isInherit: false
                    },
                    {
                        key: 'document',
                        type: {
                            of: 'item[]',
                            cmatrix: null,
                            candidate: {
                                ns: [
                                    'catalog/model/document/*',
                                    'catalog/built_in/document/*',
                                    'catalog/ext/test-org/document/*'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: 'ドキュメントの配列',
                        isInherit: false
                    },
                    {
                        key: 'event',
                        type: {
                            of: 'item[]',
                            cmatrix: null,
                            candidate: {
                                ns: [
                                    'catalog/model/event/*',
                                    'catalog/built_in/event/*',
                                    'catalog/ext/test-org/event/*'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: 'イベントの配列',
                        isInherit: false
                    },
                    {
                        key: 'gender',
                        type: {
                            of: 'item',
                            _code: {
                                _value: 13,
                                _ver: 1
                            },
                            cmatrix: null,
                            candidate: null
                        },
                        description: '性別',
                        isInherit: false
                    },
                    {
                        key: 'id',
                        type: {
                            of: 'item',
                            _code: {
                                _value: 11,
                                _ver: 1
                            },
                            cmatrix: null,
                            candidate: null
                        },
                        description: '個人識別子',
                        isInherit: false
                    },
                    {
                        key: 'identification',
                        type: {
                            of: 'item[]',
                            cmatrix: null,
                            candidate: {
                                ns: [
                                    'catalog/model/person/identification',
                                    'catalog/built_in/person/identification',
                                    'catalog/ext/test-org/person/identification'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: '本人性確認結果の配列',
                        isInherit: false
                    },
                    {
                        key: 'share-log',
                        type: {
                            of: 'item[]',
                            cmatrix: null,
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
                        description: '共有アクセスログ',
                        isInherit: false
                    },
                    {
                        key: 'share-policy',
                        type: {
                            of: 'item[]',
                            cmatrix: null,
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
                        description: '共有の基本方針',
                        isInherit: false
                    },
                    {
                        key: 'supply-policy',
                        type: {
                            of: 'item[]',
                            cmatrix: null,
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
                        description: '提供の基本方針',
                        isInherit: false
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/document',
                    name: 'ドキュメント',
                    _code: {
                        _value: 52,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'ドキュメントの定義です。'
                },
                template: {
                    _code: {
                        _value: 52,
                        _ver: 1
                    },
                    chapter: null,
                    code: {
                        index: '2_1_2',
                        value: {
                            _value: 52,
                            _ver: 1
                        }
                    },
                    createdAt: {
                        index: '2_2_1',
                        value: NULL
                    },
                    id: {
                        index: '2_1_1',
                        value: NULL
                    }
                },
                prop: [
                    {
                        key: 'chapter',
                        type: {
                            of: 'inner[]',
                            inner: 'Chapter',
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'チャプターの配列',
                        isInherit: false
                    },
                    {
                        key: 'code',
                        type: {
                            of: 'item',
                            _code: {
                                _value: 15,
                                _ver: 1
                            },
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'ドキュメント種別コード',
                        isInherit: false
                    },
                    {
                        key: 'createdAt',
                        type: {
                            of: 'item',
                            _code: {
                                _value: 16,
                                _ver: 1
                            },
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'ドキュメント作成時刻',
                        isInherit: false
                    },
                    {
                        key: 'id',
                        type: {
                            of: 'item',
                            _code: {
                                _value: 14,
                                _ver: 1
                            },
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'ドキュメント識別子',
                        isInherit: false
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/event',
                    name: 'イベント',
                    _code: {
                        _value: 53,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'イベントの定義です。'
                },
                template: {
                    _code: {
                        _value: 53,
                        _ver: 1
                    },
                    app: null,
                    code: {
                        index: '3_1_2',
                        value: {
                            _value: 53,
                            _ver: 1
                        }
                    },
                    end: {
                        index: '3_2_2',
                        value: NULL
                    },
                    env: null,
                    id: {
                        index: '3_1_1',
                        value: NULL
                    },
                    location: {
                        index: '3_3_1',
                        value: NULL
                    },
                    sourceId: null,
                    start: {
                        index: '3_2_1',
                        value: NULL
                    },
                    thing: null,
                    wf: null
                },
                prop: [
                    {
                        key: 'app',
                        type: {
                            of: 'inner',
                            inner: 'App',
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'イベントを発生させたアプリケーションプロバイダー',
                        isInherit: false
                    },
                    {
                        key: 'code',
                        type: {
                            of: 'item',
                            _code: {
                                _value: 18,
                                _ver: 1
                            },
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'イベント種別',
                        isInherit: false
                    },
                    {
                        key: 'end',
                        type: {
                            of: 'item',
                            _code: {
                                _value: 20,
                                _ver: 1
                            },
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'イベント終了時刻',
                        isInherit: false
                    },
                    {
                        key: 'env',
                        type: {
                            of: 'item[]',
                            cmatrix: null,
                            candidate: {
                                ns: [
                                    'catalog/model/env/event/*',
                                    'catalog/built_in/env/event/*',
                                    'catalog/ext/test-org/env/event/*'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: 'イベント環境の配列',
                        isInherit: false
                    },
                    {
                        key: 'id',
                        type: {
                            of: 'item',
                            _code: {
                                _value: 17,
                                _ver: 1
                            },
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'イベント識別子',
                        isInherit: false
                    },
                    {
                        key: 'location',
                        type: {
                            of: 'item',
                            _code: {
                                _value: 21,
                                _ver: 1
                            },
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'イベント発生位置',
                        isInherit: false
                    },
                    {
                        key: 'sourceId',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'イベントのソースID',
                        isInherit: false
                    },
                    {
                        key: 'start',
                        type: {
                            of: 'item',
                            _code: {
                                _value: 19,
                                _ver: 1
                            },
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'イベント開始時刻',
                        isInherit: false
                    },
                    {
                        key: 'thing',
                        type: {
                            of: 'item[]',
                            cmatrix: null,
                            candidate: {
                                ns: [
                                    'catalog/model/thing/*',
                                    'catalog/built_in/thing/*',
                                    'catalog/ext/test-org/thing/*'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: 'モノの配列',
                        isInherit: false
                    },
                    {
                        key: 'wf',
                        type: {
                            of: 'inner',
                            inner: 'Wf',
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'イベントを発生させたワークフロープロバイダー',
                        isInherit: false
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/event/relation',
                    name: '他人との関係性が変化する',
                    _code: {
                        _value: 54,
                        _ver: 1
                    },
                    inherit: {
                        _value: 53,
                        _ver: 1
                    },
                    description: '他人との関係性が変化すること'
                },
                template: {
                    _code: {
                        _value: 54,
                        _ver: 1
                    },
                    app: null,
                    code: {
                        index: '3_1_2',
                        value: {
                            _value: 54,
                            _ver: 1
                        }
                    },
                    end: {
                        index: '3_2_2',
                        value: NULL
                    },
                    env: null,
                    id: {
                        index: '3_1_1',
                        value: NULL
                    },
                    location: {
                        index: '3_3_1',
                        value: NULL
                    },
                    sourceId: null,
                    start: {
                        index: '3_2_1',
                        value: NULL
                    },
                    thing: null,
                    wf: null
                },
                prop: [
                    {
                        key: 'app',
                        type: {
                            of: 'inner',
                            inner: 'App',
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'イベントを発生させたアプリケーションプロバイダー',
                        isInherit: true
                    },
                    {
                        key: 'code',
                        type: {
                            of: 'item',
                            _code: {
                                _value: 18,
                                _ver: 1
                            },
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'イベント種別',
                        isInherit: true
                    },
                    {
                        key: 'end',
                        type: {
                            of: 'item',
                            _code: {
                                _value: 20,
                                _ver: 1
                            },
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'イベント終了時刻',
                        isInherit: true
                    },
                    {
                        key: 'env',
                        type: {
                            of: 'item[]',
                            cmatrix: null,
                            candidate: {
                                ns: [
                                    'catalog/model/env/event/*',
                                    'catalog/built_in/env/event/*',
                                    'catalog/ext/test-org/env/event/*'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: 'イベント環境の配列',
                        isInherit: true
                    },
                    {
                        key: 'id',
                        type: {
                            of: 'item',
                            _code: {
                                _value: 17,
                                _ver: 1
                            },
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'イベント識別子',
                        isInherit: true
                    },
                    {
                        key: 'location',
                        type: {
                            of: 'item',
                            _code: {
                                _value: 21,
                                _ver: 1
                            },
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'イベント発生位置',
                        isInherit: true
                    },
                    {
                        key: 'sourceId',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'イベントのソースID',
                        isInherit: true
                    },
                    {
                        key: 'start',
                        type: {
                            of: 'item',
                            _code: {
                                _value: 19,
                                _ver: 1
                            },
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'イベント開始時刻',
                        isInherit: true
                    },
                    {
                        key: 'thing',
                        type: {
                            of: 'item[]',
                            cmatrix: null,
                            candidate: {
                                ns: [
                                    'catalog/model/thing/*',
                                    'catalog/built_in/thing/*',
                                    'catalog/ext/test-org/thing/*'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: 'モノの配列',
                        isInherit: true
                    },
                    {
                        key: 'wf',
                        type: {
                            of: 'inner',
                            inner: 'Wf',
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'イベントを発生させたワークフロープロバイダー',
                        isInherit: true
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/thing',
                    name: 'モノ',
                    _code: {
                        _value: 55,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'モノの定義です。'
                },
                template: {
                    _code: {
                        _value: 55,
                        _ver: 1
                    },
                    app: null,
                    code: {
                        index: '4_1_2',
                        value: {
                            _value: 55,
                            _ver: 1
                        }
                    },
                    env: [
                        {
                            index: '4_3_(n)',
                            value: NULL
                        }
                    ],
                    id: {
                        index: '4_1_1',
                        value: NULL
                    },
                    sourceId: null,
                    wf: null
                },
                prop: [
                    {
                        key: 'app',
                        type: {
                            of: 'inner',
                            inner: 'App',
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'イベントを発生させたアプリケーションプロバイダー',
                        isInherit: false
                    },
                    {
                        key: 'code',
                        type: {
                            of: 'item',
                            _code: {
                                _value: 28,
                                _ver: 1
                            },
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'モノ種別',
                        isInherit: false
                    },
                    {
                        key: 'env',
                        type: {
                            of: 'item[]',
                            cmatrix: {
                                index: '4_3_(n)',
                                reserved: false
                            },
                            candidate: {
                                ns: [
                                    'catalog/model/env/thing/*',
                                    'catalog/built_in/env/thing/*',
                                    'catalog/ext/test-org/env/thing/*'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: 'モノ環境の配列',
                        isInherit: false
                    },
                    {
                        key: 'id',
                        type: {
                            of: 'item',
                            _code: {
                                _value: 27,
                                _ver: 1
                            },
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'モノ識別子',
                        isInherit: false
                    },
                    {
                        key: 'sourceId',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'モノのソースID',
                        isInherit: false
                    },
                    {
                        key: 'wf',
                        type: {
                            of: 'inner',
                            inner: 'Wf',
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'イベントを発生させたワークフロープロバイダー',
                        isInherit: false
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/thing/qa',
                    name: '単一回答選択式の質問',
                    _code: {
                        _value: 56,
                        _ver: 1
                    },
                    inherit: {
                        _value: 55,
                        _ver: 1
                    },
                    description: '単一回答選択式の質問の定義です。'
                },
                template: {
                    _code: {
                        _value: 56,
                        _ver: 1
                    },
                    answer: null,
                    app: null,
                    candidate: null,
                    code: {
                        index: '4_1_2',
                        value: {
                            _value: 56,
                            _ver: 1
                        }
                    },
                    env: [
                        {
                            index: '4_3_(n)',
                            value: NULL
                        }
                    ],
                    id: {
                        index: '4_1_1',
                        value: NULL
                    },
                    'qa-group': {
                        index: '4_2_1_2',
                        value: NULL
                    },
                    'qa-group-branch-number': {
                        index: '4_2_1_3',
                        value: NULL
                    },
                    sourceId: null,
                    wf: null
                },
                prop: [
                    {
                        key: 'answer',
                        type: {
                            of: 'inner',
                            inner: 'Answer',
                            cmatrix: null,
                            candidate: null
                        },
                        description: '回答',
                        isInherit: false
                    },
                    {
                        key: 'app',
                        type: {
                            of: 'inner',
                            inner: 'App',
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'イベントを発生させたアプリケーションプロバイダー',
                        isInherit: true
                    },
                    {
                        key: 'candidate',
                        type: {
                            of: 'code[]',
                            cmatrix: null,
                            candidate: {
                                ns: [
                                    'catalog/model/qualitative/*',
                                    'catalog/built_in/qualitative/*',
                                    'catalog/ext/test-org/qualitative/*'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: '回答候補',
                        isInherit: false
                    },
                    {
                        key: 'code',
                        type: {
                            of: 'item',
                            _code: {
                                _value: 28,
                                _ver: 1
                            },
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'モノ種別',
                        isInherit: true
                    },
                    {
                        key: 'env',
                        type: {
                            of: 'item[]',
                            cmatrix: {
                                index: '4_3_(n)',
                                reserved: false
                            },
                            candidate: {
                                ns: [
                                    'catalog/model/env/thing/*',
                                    'catalog/built_in/env/thing/*',
                                    'catalog/ext/test-org/env/thing/*'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: 'モノ環境の配列',
                        isInherit: true
                    },
                    {
                        key: 'id',
                        type: {
                            of: 'item',
                            _code: {
                                _value: 27,
                                _ver: 1
                            },
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'モノ識別子',
                        isInherit: true
                    },
                    {
                        key: 'qa-group',
                        type: {
                            of: 'code',
                            cmatrix: {
                                index: '4_2_1_2',
                                reserved: false
                            },
                            candidate: {
                                ns: null,
                                _code: null,
                                base: {
                                    _value: 112,
                                    _ver: 1
                                }
                            }
                        },
                        description: '質問グループ',
                        isInherit: false
                    },
                    {
                        key: 'qa-group-branch-number',
                        type: {
                            of: 'number',
                            cmatrix: {
                                index: '4_2_1_3',
                                reserved: false
                            },
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '質問グループ枝番',
                        isInherit: false
                    },
                    {
                        key: 'sourceId',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'モノのソースID',
                        isInherit: true
                    },
                    {
                        key: 'wf',
                        type: {
                            of: 'inner',
                            inner: 'Wf',
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'イベントを発生させたワークフロープロバイダー',
                        isInherit: true
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/thing/qa',
                    name: '複数回答選択式の質問',
                    _code: {
                        _value: 57,
                        _ver: 1
                    },
                    inherit: {
                        _value: 55,
                        _ver: 1
                    },
                    description: '複数回答選択式の質問の定義です。'
                },
                template: {
                    _code: {
                        _value: 57,
                        _ver: 1
                    },
                    answer: null,
                    app: null,
                    candidate: null,
                    code: {
                        index: '4_1_2',
                        value: {
                            _value: 57,
                            _ver: 1
                        }
                    },
                    env: [
                        {
                            index: '4_3_(n)',
                            value: NULL
                        }
                    ],
                    id: {
                        index: '4_1_1',
                        value: NULL
                    },
                    'qa-group': {
                        index: '4_2_1_2',
                        value: NULL
                    },
                    'qa-group-branch-number': {
                        index: '4_2_1_3',
                        value: NULL
                    },
                    sourceId: null,
                    wf: null
                },
                prop: [
                    {
                        key: 'answer',
                        type: {
                            of: 'inner',
                            inner: 'Answer',
                            cmatrix: null,
                            candidate: null
                        },
                        description: '回答',
                        isInherit: false
                    },
                    {
                        key: 'app',
                        type: {
                            of: 'inner',
                            inner: 'App',
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'イベントを発生させたアプリケーションプロバイダー',
                        isInherit: true
                    },
                    {
                        key: 'candidate',
                        type: {
                            of: 'code[]',
                            cmatrix: null,
                            candidate: {
                                ns: [
                                    'catalog/model/qualitative/*',
                                    'catalog/built_in/qualitative/*',
                                    'catalog/ext/test-org/qualitative/*'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: '回答候補',
                        isInherit: false
                    },
                    {
                        key: 'code',
                        type: {
                            of: 'item',
                            _code: {
                                _value: 28,
                                _ver: 1
                            },
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'モノ種別',
                        isInherit: true
                    },
                    {
                        key: 'env',
                        type: {
                            of: 'item[]',
                            cmatrix: {
                                index: '4_3_(n)',
                                reserved: false
                            },
                            candidate: {
                                ns: [
                                    'catalog/model/env/thing/*',
                                    'catalog/built_in/env/thing/*',
                                    'catalog/ext/test-org/env/thing/*'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: 'モノ環境の配列',
                        isInherit: true
                    },
                    {
                        key: 'id',
                        type: {
                            of: 'item',
                            _code: {
                                _value: 27,
                                _ver: 1
                            },
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'モノ識別子',
                        isInherit: true
                    },
                    {
                        key: 'qa-group',
                        type: {
                            of: 'code',
                            cmatrix: {
                                index: '4_2_1_2',
                                reserved: false
                            },
                            candidate: {
                                ns: null,
                                _code: null,
                                base: {
                                    _value: 112,
                                    _ver: 1
                                }
                            }
                        },
                        description: '質問グループ',
                        isInherit: false
                    },
                    {
                        key: 'qa-group-branch-number',
                        type: {
                            of: 'number',
                            cmatrix: {
                                index: '4_2_1_3',
                                reserved: false
                            },
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '質問グループ枝番',
                        isInherit: false
                    },
                    {
                        key: 'sourceId',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'モノのソースID',
                        isInherit: true
                    },
                    {
                        key: 'wf',
                        type: {
                            of: 'inner',
                            inner: 'Wf',
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'イベントを発生させたワークフロープロバイダー',
                        isInherit: true
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/thing/qa',
                    name: '自由記述回答式の質問',
                    _code: {
                        _value: 58,
                        _ver: 1
                    },
                    inherit: {
                        _value: 55,
                        _ver: 1
                    },
                    description: '自由記述回答式の質問の定義です。'
                },
                template: {
                    _code: {
                        _value: 58,
                        _ver: 1
                    },
                    answer: null,
                    app: null,
                    code: {
                        index: '4_1_2',
                        value: {
                            _value: 58,
                            _ver: 1
                        }
                    },
                    env: [
                        {
                            index: '4_3_(n)',
                            value: NULL
                        }
                    ],
                    id: {
                        index: '4_1_1',
                        value: NULL
                    },
                    'qa-group': {
                        index: '4_2_3_3_2',
                        value: NULL
                    },
                    'qa-group-branch-number': {
                        index: '4_2_3_3_3',
                        value: NULL
                    },
                    sourceId: null,
                    wf: null
                },
                prop: [
                    {
                        key: 'answer',
                        type: {
                            of: 'inner',
                            inner: 'Answer',
                            cmatrix: null,
                            candidate: null
                        },
                        description: '回答',
                        isInherit: false
                    },
                    {
                        key: 'app',
                        type: {
                            of: 'inner',
                            inner: 'App',
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'イベントを発生させたアプリケーションプロバイダー',
                        isInherit: true
                    },
                    {
                        key: 'code',
                        type: {
                            of: 'item',
                            _code: {
                                _value: 28,
                                _ver: 1
                            },
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'モノ種別',
                        isInherit: true
                    },
                    {
                        key: 'env',
                        type: {
                            of: 'item[]',
                            cmatrix: {
                                index: '4_3_(n)',
                                reserved: false
                            },
                            candidate: {
                                ns: [
                                    'catalog/model/env/thing/*',
                                    'catalog/built_in/env/thing/*',
                                    'catalog/ext/test-org/env/thing/*'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: 'モノ環境の配列',
                        isInherit: true
                    },
                    {
                        key: 'id',
                        type: {
                            of: 'item',
                            _code: {
                                _value: 27,
                                _ver: 1
                            },
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'モノ識別子',
                        isInherit: true
                    },
                    {
                        key: 'qa-group',
                        type: {
                            of: 'code',
                            cmatrix: {
                                index: '4_2_3_3_2',
                                reserved: false
                            },
                            candidate: {
                                ns: null,
                                _code: null,
                                base: {
                                    _value: 112,
                                    _ver: 1
                                }
                            }
                        },
                        description: '質問グループ',
                        isInherit: false
                    },
                    {
                        key: 'qa-group-branch-number',
                        type: {
                            of: 'number',
                            cmatrix: {
                                index: '4_2_3_3_3',
                                reserved: false
                            },
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '質問グループ枝番',
                        isInherit: false
                    },
                    {
                        key: 'sourceId',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'モノのソースID',
                        isInherit: true
                    },
                    {
                        key: 'wf',
                        type: {
                            of: 'inner',
                            inner: 'Wf',
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'イベントを発生させたワークフロープロバイダー',
                        isInherit: true
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/thing/relation',
                    name: '関係性',
                    _code: {
                        _value: 59,
                        _ver: 1
                    },
                    inherit: {
                        _value: 55,
                        _ver: 1
                    },
                    description: '個人間の関係性の定義です。'
                },
                template: {
                    _code: {
                        _value: 59,
                        _ver: 1
                    },
                    app: null,
                    code: {
                        index: '4_1_2',
                        value: {
                            _value: 59,
                            _ver: 1
                        }
                    },
                    env: [
                        {
                            index: '4_3_(n)',
                            value: NULL
                        }
                    ],
                    id: {
                        index: '4_1_1',
                        value: NULL
                    },
                    other: null,
                    self: {
                        index: '4_2_1_1',
                        value: NULL
                    },
                    sourceId: null,
                    'two-way': {
                        index: '4_2_1_3',
                        value: NULL
                    },
                    wf: null
                },
                prop: [
                    {
                        key: 'app',
                        type: {
                            of: 'inner',
                            inner: 'App',
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'イベントを発生させたアプリケーションプロバイダー',
                        isInherit: true
                    },
                    {
                        key: 'code',
                        type: {
                            of: 'item',
                            _code: {
                                _value: 28,
                                _ver: 1
                            },
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'モノ種別',
                        isInherit: true
                    },
                    {
                        key: 'env',
                        type: {
                            of: 'item[]',
                            cmatrix: {
                                index: '4_3_(n)',
                                reserved: false
                            },
                            candidate: {
                                ns: [
                                    'catalog/model/env/thing/*',
                                    'catalog/built_in/env/thing/*',
                                    'catalog/ext/test-org/env/thing/*'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: 'モノ環境の配列',
                        isInherit: true
                    },
                    {
                        key: 'id',
                        type: {
                            of: 'item',
                            _code: {
                                _value: 27,
                                _ver: 1
                            },
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'モノ識別子',
                        isInherit: true
                    },
                    {
                        key: 'other',
                        type: {
                            of: 'inner',
                            inner: 'Other',
                            cmatrix: null,
                            candidate: null
                        },
                        description: '相手',
                        isInherit: false
                    },
                    {
                        key: 'self',
                        type: {
                            of: 'item',
                            _code: null,
                            cmatrix: {
                                index: '4_2_1_1',
                                reserved: false
                            },
                            candidate: {
                                ns: [
                                    'catalog/model/qualitative/relation'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: '自分の役割',
                        isInherit: false
                    },
                    {
                        key: 'sourceId',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'モノのソースID',
                        isInherit: true
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
                        description: '双方向の関係性がどうか',
                        isInherit: false
                    },
                    {
                        key: 'wf',
                        type: {
                            of: 'inner',
                            inner: 'Wf',
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'イベントを発生させたワークフロープロバイダー',
                        isInherit: true
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/thing/relation',
                    name: 'My-Condition-Bookの管理に関する信託関係',
                    _code: {
                        _value: 60,
                        _ver: 1
                    },
                    inherit: {
                        _value: 59,
                        _ver: 1
                    },
                    description: 'My-Condition-Bookの管理（蓄積、共有、提供）を他人に信託するための関係性です。'
                },
                template: {
                    _code: {
                        _value: 60,
                        _ver: 1
                    },
                    app: null,
                    code: {
                        index: '4_1_2',
                        value: {
                            _value: 60,
                            _ver: 1
                        }
                    },
                    env: [
                        {
                            index: '4_3_(n)',
                            value: NULL
                        }
                    ],
                    id: {
                        index: '4_1_1',
                        value: NULL
                    },
                    other: null,
                    self: {
                        index: '4_2_1_1',
                        value: NULL
                    },
                    sourceId: null,
                    'two-way': {
                        index: '4_2_1_3',
                        value: NULL
                    },
                    wf: null
                },
                prop: [
                    {
                        key: 'app',
                        type: {
                            of: 'inner',
                            inner: 'App',
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'イベントを発生させたアプリケーションプロバイダー',
                        isInherit: true
                    },
                    {
                        key: 'code',
                        type: {
                            of: 'item',
                            _code: {
                                _value: 28,
                                _ver: 1
                            },
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'モノ種別',
                        isInherit: true
                    },
                    {
                        key: 'env',
                        type: {
                            of: 'item[]',
                            cmatrix: {
                                index: '4_3_(n)',
                                reserved: false
                            },
                            candidate: {
                                ns: [
                                    'catalog/model/env/thing/*',
                                    'catalog/built_in/env/thing/*',
                                    'catalog/ext/test-org/env/thing/*'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: 'モノ環境の配列',
                        isInherit: true
                    },
                    {
                        key: 'id',
                        type: {
                            of: 'item',
                            _code: {
                                _value: 27,
                                _ver: 1
                            },
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'モノ識別子',
                        isInherit: true
                    },
                    {
                        key: 'other',
                        type: {
                            of: 'inner',
                            inner: 'Other',
                            cmatrix: null,
                            candidate: null
                        },
                        description: '相手',
                        isInherit: true
                    },
                    {
                        key: 'self',
                        type: {
                            of: 'item',
                            _code: null,
                            cmatrix: {
                                index: '4_2_1_1',
                                reserved: false
                            },
                            candidate: {
                                ns: [
                                    'catalog/model/qualitative/relation'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: '自分の役割',
                        isInherit: true
                    },
                    {
                        key: 'sourceId',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'モノのソースID',
                        isInherit: true
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
                        description: '双方向の関係性がどうか',
                        isInherit: true
                    },
                    {
                        key: 'wf',
                        type: {
                            of: 'inner',
                            inner: 'Wf',
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'イベントを発生させたワークフロープロバイダー',
                        isInherit: true
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/page',
                    name: '文章構造',
                    _code: {
                        _value: 61,
                        _ver: 1
                    },
                    inherit: null,
                    description: '文章構造の定義です。'
                },
                template: {
                    _code: {
                        _value: 61,
                        _ver: 1
                    },
                    section: null,
                    title: null
                },
                prop: [
                    {
                        key: 'section',
                        type: {
                            of: 'inner[]',
                            inner: 'Section',
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'セクション',
                        isInherit: false
                    },
                    {
                        key: 'title',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'タイトル',
                        isInherit: false
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/attribute/constraint/refer',
                    name: 'constraint-refer',
                    _code: {
                        _value: 62,
                        _ver: 1
                    },
                    inherit: null,
                    description: '個人による参照に対する制約の定義です。attributeに設定されます。key名は[constraint-refer]です。'
                },
                template: {
                    _code: {
                        _value: 62,
                        _ver: 1
                    },
                    permit: null,
                    'required-pincode': null
                },
                prop: [
                    {
                        key: 'permit',
                        type: {
                            of: 'boolean',
                            cmatrix: null
                        },
                        description: '個人による参照の可否（設定がない場合は、true）',
                        isInherit: false
                    },
                    {
                        key: 'required-pincode',
                        type: {
                            of: 'boolean',
                            cmatrix: null
                        },
                        description: '参照時にPINコードでの認証必要有無（設定がない場合は、false）',
                        isInherit: false
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/attribute/constraint/share',
                    name: 'constraint-share',
                    _code: {
                        _value: 63,
                        _ver: 1
                    },
                    inherit: null,
                    description: '共有制約（共有するか/しないか）の定義です。attributeに設定されます。key名は[constraint-share]です。'
                },
                template: {
                    _code: {
                        _value: 63,
                        _ver: 1
                    },
                    permit: null,
                    'required-licence': null,
                    'target-actor': null
                },
                prop: [
                    {
                        key: 'permit',
                        type: {
                            of: 'boolean',
                            cmatrix: null
                        },
                        description: '共有の可否（設定がない場合は、true）',
                        isInherit: false
                    },
                    {
                        key: 'required-licence',
                        type: {
                            of: 'code[]',
                            cmatrix: null,
                            candidate: {
                                ns: [
                                    'catalog/model/licence',
                                    'catalog/built_in/licence',
                                    'catalog/ext/test-org/licence'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: '共有先のWF職員が保持しておかなければならないライセンス',
                        isInherit: false
                    },
                    {
                        key: 'target-actor',
                        type: {
                            of: 'code[]',
                            cmatrix: null,
                            candidate: {
                                ns: [
                                    'catalog/model/actor/app',
                                    'catalog/ext/test-org/actor/app',
                                    'catalog/model/actor/wf',
                                    'catalog/ext/test-org/actor/wf'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: '許可する共有先の設定（共有先を限定したい場合に設定する）',
                        isInherit: false
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/attribute/constraint/supply',
                    name: 'constraint-supply',
                    _code: {
                        _value: 64,
                        _ver: 1
                    },
                    inherit: null,
                    description: '提供制約（提供するか/しないか）の定義です。attributeに設定されます。key名は[constraint-supply]です。'
                },
                template: {
                    _code: {
                        _value: 64,
                        _ver: 1
                    },
                    permit: null,
                    'target-actor': null
                },
                prop: [
                    {
                        key: 'permit',
                        type: {
                            of: 'boolean',
                            cmatrix: null
                        },
                        description: '提供の可否（設定がない場合は、true）',
                        isInherit: false
                    },
                    {
                        key: 'target-actor',
                        type: {
                            of: 'code[]',
                            cmatrix: null,
                            candidate: {
                                ns: [
                                    'catalog/model/actor/consumer',
                                    'catalog/ext/test-org/actor/consumer'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: '許可する提供先の設定（提供先を限定したい場合に設定する）',
                        isInherit: false
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/attribute/consideration/store',
                    name: 'consideration-distributionratio-store',
                    _code: {
                        _value: 65,
                        _ver: 1
                    },
                    inherit: null,
                    description: '蓄積の対価と分配比率の定義です。attributeに設定されます。'
                },
                template: {
                    _code: {
                        _value: 65,
                        _ver: 1
                    },
                    'store-consideration': null,
                    'store-distribution-ratio': null
                },
                prop: [
                    {
                        key: 'store-consideration',
                        type: {
                            of: 'number',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '蓄積の対価額',
                        isInherit: false
                    },
                    {
                        key: 'store-distribution-ratio',
                        type: {
                            of: 'inner[]',
                            inner: 'DistributionRatio',
                            cmatrix: null,
                            candidate: null
                        },
                        description: '蓄積の分配比率',
                        isInherit: false
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/attribute/consideration/supply',
                    name: 'consideration-distributionratio-supply',
                    _code: {
                        _value: 66,
                        _ver: 1
                    },
                    inherit: null,
                    description: '提供の対価と分配比率の定義です。attributeに設定されます。'
                },
                template: {
                    _code: {
                        _value: 66,
                        _ver: 1
                    },
                    'supply-consideration': null,
                    'supply-distribution-ratio': null
                },
                prop: [
                    {
                        key: 'supply-consideration',
                        type: {
                            of: 'number',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '提供の対価額',
                        isInherit: false
                    },
                    {
                        key: 'supply-distribution-ratio',
                        type: {
                            of: 'inner[]',
                            inner: 'DistributionRatio',
                            cmatrix: null,
                            candidate: null
                        },
                        description: '提供の分配比率',
                        isInherit: false
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/category/data',
                    name: 'データカテゴリ',
                    _code: {
                        _value: 67,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'データカテゴリの定義です。'
                },
                template: {
                    _code: {
                        _value: 67,
                        _ver: 1
                    },
                    document: null,
                    event: null,
                    thing: null
                },
                prop: [
                    {
                        key: 'document',
                        type: {
                            of: 'code[]',
                            cmatrix: null,
                            candidate: {
                                ns: [
                                    'catalog/model/document/*',
                                    'catalog/built_in/document/*',
                                    'catalog/ext/test-org/document/*'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: 'データカテゴリに含まれるドキュメント',
                        isInherit: false
                    },
                    {
                        key: 'event',
                        type: {
                            of: 'code[]',
                            cmatrix: null,
                            candidate: {
                                ns: [
                                    'catalog/model/event/*',
                                    'catalog/built_in/event/*',
                                    'catalog/ext/test-org/event/*'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: 'データカテゴリに含まれるイベント',
                        isInherit: false
                    },
                    {
                        key: 'thing',
                        type: {
                            of: 'code[]',
                            cmatrix: null,
                            candidate: {
                                ns: [
                                    'catalog/model/thing/*',
                                    'catalog/built_in/thing/*',
                                    'catalog/ext/test-org/thing/*'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: 'データカテゴリに含まれるモノ',
                        isInherit: false
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/data-supply-contract/target-condition',
                    name: '対象者条件',
                    _code: {
                        _value: 68,
                        _ver: 1
                    },
                    inherit: null,
                    description: '対象者条件の定義です。'
                },
                template: {
                    _code: {
                        _value: 68,
                        _ver: 1
                    },
                    ownedData: null,
                    targetGroup: null
                },
                prop: [
                    {
                        key: 'ownedData',
                        type: {
                            of: 'inner[]',
                            inner: 'OwnedData',
                            cmatrix: null,
                            candidate: null
                        },
                        description: '保有データ',
                        isInherit: false
                    },
                    {
                        key: 'targetGroup',
                        type: {
                            of: 'inner[]',
                            inner: 'TargetGroup',
                            cmatrix: null,
                            candidate: null
                        },
                        description: '対象者グループ',
                        isInherit: false
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/format',
                    name: 'yyyyMMddTHHZ形式',
                    _code: {
                        _value: 69,
                        _ver: 1
                    },
                    inherit: null,
                    description: '時刻の値フォーマット（yyyyMMddTHHZ形式）の定義です。'
                },
                template: {
                    _code: {
                        _value: 69,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/book/policy',
                    name: '共有の基本方針',
                    _code: {
                        _value: 71,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'My-Condition-Bookの共有の基本方針の定義です。'
                },
                template: {
                    _code: {
                        _value: 71,
                        _ver: 1
                    },
                    'actor-category': null,
                    'data-category': null,
                    'data-type': null,
                    'required-licence': null,
                    'workflow-category': null
                },
                prop: [
                    {
                        key: 'actor-category',
                        type: {
                            of: 'code',
                            cmatrix: null,
                            candidate: {
                                ns: [
                                    'catalog/model/category/share/actor',
                                    'catalog/built_in/category/share/actor',
                                    'catalog/ext/test-org/category/share/actor'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: '共有先のワークフロープロバイダーのカテゴリ',
                        isInherit: false
                    },
                    {
                        key: 'data-category',
                        type: {
                            of: 'code[]',
                            cmatrix: null,
                            candidate: {
                                ns: [
                                    'catalog/model/category/data',
                                    'catalog/built_in/category/data',
                                    'catalog/ext/test-org/category/data'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: '選択した共有するデータカテゴリ',
                        isInherit: false
                    },
                    {
                        key: 'data-type',
                        type: {
                            of: 'code[]',
                            cmatrix: null,
                            candidate: {
                                ns: [
                                    'catalog/model/thing',
                                    'catalog/built_in/thing',
                                    'catalog/ext/test-org/thing',
                                    'catalog/model/event',
                                    'catalog/built_in/event',
                                    'catalog/ext/test-org/event',
                                    'catalog/model/document',
                                    'catalog/built_in/document',
                                    'catalog/ext/test-org/document',
                                    'catalog/model/ctoken',
                                    'catalog/built_in/ctoken',
                                    'catalog/ext/test-org/ctoken'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: '共有するデータ種',
                        isInherit: false
                    },
                    {
                        key: 'required-licence',
                        type: {
                            of: 'code[]',
                            cmatrix: null,
                            candidate: {
                                ns: [
                                    'catalog/model/licence',
                                    'catalog/built_in/licence',
                                    'catalog/ext/test-org/licence'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: '共有先のWF職員が保有している必要のあるライセンス',
                        isInherit: false
                    },
                    {
                        key: 'workflow-category',
                        type: {
                            of: 'code',
                            cmatrix: null,
                            candidate: {
                                ns: [
                                    'catalog/model/category/share/service',
                                    'catalog/built_in/category/share/service',
                                    'catalog/ext/test-org/category/share/service'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: '共有先のワークフローのカテゴリ',
                        isInherit: false
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/book/access-log',
                    name: 'アクセスログ',
                    _code: {
                        _value: 72,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'My-Condition-Bookのアクセスログの定義です。'
                },
                template: {
                    _code: {
                        _value: 72,
                        _ver: 1
                    },
                    actor: null,
                    at: null,
                    'data-type': null,
                    other_no: null
                },
                prop: [
                    {
                        key: 'actor',
                        type: {
                            of: 'code',
                            cmatrix: null,
                            candidate: {
                                ns: null,
                                _code: null,
                                base: {
                                    _value: 36,
                                    _ver: 1
                                }
                            }
                        },
                        description: 'データにアクセスした組織',
                        isInherit: false
                    },
                    {
                        key: 'at',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: {
                                _value: 6,
                                _ver: 1
                            },
                            unit: null,
                            candidate: null
                        },
                        description: 'データにアクセスした時刻',
                        isInherit: false
                    },
                    {
                        key: 'data-type',
                        type: {
                            of: 'code[]',
                            cmatrix: null,
                            candidate: {
                                ns: [
                                    'catalog/model/thing',
                                    'catalog/built_in/thing',
                                    'catalog/ext/test-org/thing',
                                    'catalog/model/event',
                                    'catalog/built_in/event',
                                    'catalog/ext/test-org/event',
                                    'catalog/model/document',
                                    'catalog/built_in/document',
                                    'catalog/ext/test-org/document',
                                    'catalog/model/ctoken',
                                    'catalog/built_in/ctoken',
                                    'catalog/ext/test-org/ctoken'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: 'データ種',
                        isInherit: false
                    },
                    {
                        key: 'other_no',
                        type: {
                            of: 'number',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '他人No',
                        isInherit: false
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/processing',
                    name: '加工処理',
                    _code: {
                        _value: 73,
                        _ver: 1
                    },
                    inherit: null,
                    description: '加工処理の定義です。'
                },
                template: {
                    _code: {
                        _value: 73,
                        _ver: 1
                    },
                    column: null,
                    document_type: null,
                    event_type: null,
                    thing_type: null
                },
                prop: [
                    {
                        key: 'column',
                        type: {
                            of: 'inner[]',
                            inner: 'Column',
                            cmatrix: null,
                            candidate: null
                        },
                        description: '加工処理対象のデータ列指定配列',
                        isInherit: false
                    },
                    {
                        key: 'document_type',
                        type: {
                            of: 'code',
                            cmatrix: null,
                            candidate: {
                                ns: [
                                    'catalog/model/document/*',
                                    'catalog/built_in/document/*',
                                    'catalog/ext/test-org/document/*'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: '加工処理対象のドキュメントの種類',
                        isInherit: false
                    },
                    {
                        key: 'event_type',
                        type: {
                            of: 'code',
                            cmatrix: null,
                            candidate: {
                                ns: [
                                    'catalog/model/event/*',
                                    'catalog/built_in/event/*',
                                    'catalog/ext/test-org/event/*'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: '加工処理対象のイベントの種類',
                        isInherit: false
                    },
                    {
                        key: 'thing_type',
                        type: {
                            of: 'code',
                            cmatrix: null,
                            candidate: {
                                ns: [
                                    'catalog/model/thing/*',
                                    'catalog/built_in/thing/*',
                                    'catalog/ext/test-org/thing/*'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: '加工処理対象のモノの種類',
                        isInherit: false
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/unit/ratio',
                    name: '%',
                    _code: {
                        _value: 74,
                        _ver: 1
                    },
                    inherit: null,
                    description: '割合の単位（パーセント）の定義です。'
                },
                template: {
                    _code: {
                        _value: 74,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/processing/method',
                    name: 'masking',
                    _code: {
                        _value: 75,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'データ加工処理（マスキング）の定義です。第一引数はマスク桁数指定で、第二引数はマスク文字指定です。'
                },
                template: {
                    _code: {
                        _value: 75,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/auth',
                    name: '操作権',
                    _code: {
                        _value: 76,
                        _ver: 1
                    },
                    inherit: null,
                    description: '操作権のテンプレートの定義です。'
                },
                template: {
                    _code: {
                        _value: 76,
                        _ver: 1
                    },
                    'auth-name': null
                },
                prop: [
                    {
                        key: 'auth-name',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '操作権定義名（各ネームスペース毎にユニークであること）',
                        isInherit: false
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/processing/method',
                    name: 'replace',
                    _code: {
                        _value: 77,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'データ加工処理（置換）の定義です。第一引数は置換後データです。'
                },
                template: {
                    _code: {
                        _value: 77,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/processing',
                    name: 'PXR-ID_Pseudonymisation',
                    _code: {
                        _value: 78,
                        _ver: 1
                    },
                    inherit: {
                        _value: 73,
                        _ver: 1
                    },
                    description: 'PXR-IDの仮名化処理の定義です。'
                },
                template: {
                    _code: {
                        _value: 78,
                        _ver: 1
                    },
                    column: [
                        {
                            index: '1_1',
                            processing: [
                                {
                                    method: {
                                        _value: 77,
                                        _ver: 1
                                    }
                                }
                            ]
                        }
                    ],
                    document_type: null,
                    event_type: null,
                    thing_type: null
                },
                prop: [
                    {
                        key: 'column',
                        type: {
                            of: 'inner[]',
                            inner: 'Column',
                            cmatrix: null,
                            candidate: null
                        },
                        description: '加工処理対象のデータ列指定配列',
                        isInherit: true
                    },
                    {
                        key: 'document_type',
                        type: {
                            of: 'code',
                            cmatrix: null,
                            candidate: {
                                ns: [
                                    'catalog/model/document/*',
                                    'catalog/built_in/document/*',
                                    'catalog/ext/test-org/document/*'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: '加工処理対象のドキュメントの種類',
                        isInherit: true
                    },
                    {
                        key: 'event_type',
                        type: {
                            of: 'code',
                            cmatrix: null,
                            candidate: {
                                ns: [
                                    'catalog/model/event/*',
                                    'catalog/built_in/event/*',
                                    'catalog/ext/test-org/event/*'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: '加工処理対象のイベントの種類',
                        isInherit: true
                    },
                    {
                        key: 'thing_type',
                        type: {
                            of: 'code',
                            cmatrix: null,
                            candidate: {
                                ns: [
                                    'catalog/model/thing/*',
                                    'catalog/built_in/thing/*',
                                    'catalog/ext/test-org/thing/*'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: '加工処理対象のモノの種類',
                        isInherit: true
                    }
                ],
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
                ],
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/data-supply-contract/condition',
                    name: '対象者の範囲条件',
                    _code: {
                        _value: 79,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'データ提供対象者の範囲条件の定義です。値が範囲内に含まれる個人属性情報を持つ個人を対象者とします。'
                },
                template: {
                    _code: {
                        _value: 79,
                        _ver: 1
                    },
                    'item-type': null,
                    max: null,
                    min: null
                },
                prop: [
                    {
                        key: 'item-type',
                        type: {
                            of: 'code',
                            cmatrix: null,
                            candidate: {
                                ns: [
                                    'catalog/model/person/item-type',
                                    'catalog/built_in/person/item-type',
                                    'catalog/ext/test-org/person/item-type'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: '条件となる個人属性情報カタログコード',
                        isInherit: false
                    },
                    {
                        key: 'max',
                        type: {
                            of: 'number',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '最大値',
                        isInherit: false
                    },
                    {
                        key: 'min',
                        type: {
                            of: 'number',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '最小値',
                        isInherit: false
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/format',
                    name: 'HH形式',
                    _code: {
                        _value: 80,
                        _ver: 1
                    },
                    inherit: null,
                    description: '時刻の値フォーマット（HH形式）の定義です。'
                },
                template: {
                    _code: {
                        _value: 80,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/format',
                    name: 'HHmm形式',
                    _code: {
                        _value: 81,
                        _ver: 1
                    },
                    inherit: null,
                    description: '時刻の値フォーマット（HHmm形式）の定義です。'
                },
                template: {
                    _code: {
                        _value: 81,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/format',
                    name: 'HHmmss形式',
                    _code: {
                        _value: 82,
                        _ver: 1
                    },
                    inherit: null,
                    description: '時刻の値フォーマット（HHmmss形式）の定義です。'
                },
                template: {
                    _code: {
                        _value: 82,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/format',
                    name: 'HHmmss.S形式',
                    _code: {
                        _value: 83,
                        _ver: 1
                    },
                    inherit: null,
                    description: '時刻の値フォーマット（HHmmss.S形式）の定義です。'
                },
                template: {
                    _code: {
                        _value: 83,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/format',
                    name: 'HHmmss.SS形式',
                    _code: {
                        _value: 84,
                        _ver: 1
                    },
                    inherit: null,
                    description: '時刻の値フォーマット（HHmmss.SS形式）の定義です。'
                },
                template: {
                    _code: {
                        _value: 84,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/format',
                    name: 'HHmmss.SSS形式',
                    _code: {
                        _value: 85,
                        _ver: 1
                    },
                    inherit: null,
                    description: '時刻の値フォーマット（HHmmss.SSS形式）の定義です。'
                },
                template: {
                    _code: {
                        _value: 85,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/attribute/constraint/store',
                    name: 'constraint-store',
                    _code: {
                        _value: 86,
                        _ver: 1
                    },
                    inherit: null,
                    description: '蓄積制約（必要ライセンス）の定義です。attributeに設定されます。key名は[constraint-store]です。'
                },
                template: {
                    _code: {
                        _value: 86,
                        _ver: 1
                    },
                    'required-licence': null
                },
                prop: [
                    {
                        key: 'required-licence',
                        type: {
                            of: 'code[]',
                            cmatrix: null,
                            candidate: {
                                ns: [
                                    'catalog/model/licence',
                                    'catalog/built_in/licence',
                                    'catalog/ext/test-org/licence'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: '蓄積必要ライセンス（蓄積するオペレーターのライセンスを限定したい場合に設定する）',
                        isInherit: false
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/format',
                    name: 'yyyyMM形式',
                    _code: {
                        _value: 87,
                        _ver: 1
                    },
                    inherit: null,
                    description: '時刻の値フォーマット（yyyyMM形式）の定義です。'
                },
                template: {
                    _code: {
                        _value: 87,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/format',
                    name: 'yyyy形式',
                    _code: {
                        _value: 88,
                        _ver: 1
                    },
                    inherit: null,
                    description: '時刻の値フォーマット（yyyy形式）の定義です。'
                },
                template: {
                    _code: {
                        _value: 88,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/format',
                    name: 'yyyyMMddTHHmmssZ形式',
                    _code: {
                        _value: 89,
                        _ver: 1
                    },
                    inherit: null,
                    description: '時刻の値フォーマット（yyyyMMddTHHmmssZ形式）の定義です。'
                },
                template: {
                    _code: {
                        _value: 89,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/format',
                    name: 'yyyyMMddTHHmmZ形式',
                    _code: {
                        _value: 90,
                        _ver: 1
                    },
                    inherit: null,
                    description: '時刻の値フォーマット（yyyyMMddTHHmmZ形式）の定義です。'
                },
                template: {
                    _code: {
                        _value: 90,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/format',
                    name: 'yyyyMMddTHHmmss.SSZ形式',
                    _code: {
                        _value: 92,
                        _ver: 1
                    },
                    inherit: null,
                    description: '時刻の値フォーマット（yyyyMMddTHHmmss.SSZ形式）の定義です。'
                },
                template: {
                    _code: {
                        _value: 92,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/format',
                    name: 'yyyyMMddTHHmmss.SZ形式',
                    _code: {
                        _value: 93,
                        _ver: 1
                    },
                    inherit: null,
                    description: '時刻の値フォーマット（yyyyMMddTHHmmss.SZ形式）の定義です。'
                },
                template: {
                    _code: {
                        _value: 93,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/book/policy',
                    name: '提供の基本方針',
                    _code: {
                        _value: 94,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'My-Condition-Bookの提供の基本方針の定義です。'
                },
                template: {
                    _code: {
                        _value: 94,
                        _ver: 1
                    },
                    'actor-category': null,
                    'data-category': null,
                    'data-type': null,
                    'purpose-category': null,
                    'required-processing': null
                },
                prop: [
                    {
                        key: 'actor-category',
                        type: {
                            of: 'code',
                            cmatrix: null,
                            candidate: {
                                ns: [
                                    'catalog/model/category/supply/actor',
                                    'catalog/built_in/category/supply/actor',
                                    'catalog/ext/test-org/category/supply/actor'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: '提供先のアクターカテゴリ',
                        isInherit: false
                    },
                    {
                        key: 'data-category',
                        type: {
                            of: 'code[]',
                            cmatrix: null,
                            candidate: {
                                ns: [
                                    'catalog/model/category/data',
                                    'catalog/built_in/category/data',
                                    'catalog/ext/test-org/category/data'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: '選択した提供するデータカテゴリ',
                        isInherit: false
                    },
                    {
                        key: 'data-type',
                        type: {
                            of: 'code[]',
                            cmatrix: null,
                            candidate: {
                                ns: [
                                    'catalog/model/thing',
                                    'catalog/built_in/thing',
                                    'catalog/ext/test-org/thing',
                                    'catalog/model/event',
                                    'catalog/built_in/event',
                                    'catalog/ext/test-org/event',
                                    'catalog/model/document',
                                    'catalog/built_in/document',
                                    'catalog/ext/test-org/document'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: '提供するデータ種',
                        isInherit: false
                    },
                    {
                        key: 'purpose-category',
                        type: {
                            of: 'code',
                            cmatrix: null,
                            candidate: {
                                ns: [
                                    'catalog/model/category/supply/purpose',
                                    'catalog/built_in/category/supply/purpose',
                                    'catalog/ext/test-org/category/supply/purpose'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: '提供先の利用目的カテゴリ',
                        isInherit: false
                    },
                    {
                        key: 'required-processing',
                        type: {
                            of: 'code[]',
                            cmatrix: null,
                            candidate: {
                                ns: [
                                    'catalog/model/processing',
                                    'catalog/built_in/processing',
                                    'catalog/ext/test-org/processing'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: '必須加工処理',
                        isInherit: false
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/data-supply-contract',
                    name: 'データ提供契約申込書',
                    _code: {
                        _value: 95,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'データ提供契約申込書の定義です。'
                },
                template: {
                    _code: {
                        _value: 95,
                        _ver: 1
                    },
                    dataTrader: null,
                    dataType: null,
                    isDraft: null,
                    purpose: null,
                    targetCondition: null,
                    title: null
                },
                prop: [
                    {
                        key: 'dataTrader',
                        type: {
                            of: 'code',
                            cmatrix: null,
                            candidate: {
                                ns: null,
                                _code: null,
                                base: {
                                    _value: 38,
                                    _ver: 1
                                }
                            }
                        },
                        description: '対象のデータ取引SP',
                        isInherit: false
                    },
                    {
                        key: 'dataType',
                        type: {
                            of: 'inner[]',
                            inner: 'DataType',
                            cmatrix: null,
                            candidate: null
                        },
                        description: '契約で取得するデータ種/量',
                        isInherit: false
                    },
                    {
                        key: 'isDraft',
                        type: {
                            of: 'boolean',
                            cmatrix: null
                        },
                        description: '下書きフラグ',
                        isInherit: false
                    },
                    {
                        key: 'purpose',
                        type: {
                            of: 'item[]',
                            cmatrix: null,
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
                        description: '利用目的',
                        isInherit: false
                    },
                    {
                        key: 'targetCondition',
                        type: {
                            of: 'item',
                            _code: null,
                            cmatrix: null,
                            candidate: {
                                ns: null,
                                _code: null,
                                base: {
                                    _value: 68,
                                    _ver: 1
                                }
                            }
                        },
                        description: '対象者条件',
                        isInherit: false
                    },
                    {
                        key: 'title',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'データ提供契約申込のタイトル',
                        isInherit: false
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/cmatrix/4/4',
                    name: 'モノを発生させたアクター識別子列',
                    _code: {
                        _value: 96,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'CMatrixのモノを発生させたアクター識別子列の定義です。'
                },
                template: {
                    '@value': {
                        index: '4_4_1',
                        value: NULL
                    },
                    _code: {
                        _value: 96,
                        _ver: 1
                    },
                    index: '4_4_1',
                    value: NULL
                },
                prop: [
                    {
                        key: '@value',
                        type: {
                            of: 'code',
                            cmatrix: {
                                index: '4_4_1',
                                reserved: true
                            },
                            candidate: null
                        },
                        description: null,
                        isInherit: false
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/cmatrix/4/4',
                    name: 'ワークフロー識別子列',
                    _code: {
                        _value: 97,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'CMatrixのワークフロー識別子列の定義です。'
                },
                template: {
                    '@value': {
                        index: '4_4_2',
                        value: NULL
                    },
                    _code: {
                        _value: 97,
                        _ver: 1
                    },
                    index: '4_4_2',
                    value: NULL
                },
                prop: [
                    {
                        key: '@value',
                        type: {
                            of: 'code',
                            cmatrix: {
                                index: '4_4_2',
                                reserved: true
                            },
                            candidate: null
                        },
                        description: null,
                        isInherit: false
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/cmatrix/4/4',
                    name: 'ワークフローロール識別子列',
                    _code: {
                        _value: 98,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'CMatrixのワークフローロール識別子列の定義です。'
                },
                template: {
                    '@value': {
                        index: '4_4_3',
                        value: NULL
                    },
                    _code: {
                        _value: 98,
                        _ver: 1
                    },
                    index: '4_4_3',
                    value: NULL
                },
                prop: [
                    {
                        key: '@value',
                        type: {
                            of: 'code',
                            cmatrix: {
                                index: '4_4_3',
                                reserved: true
                            },
                            candidate: null
                        },
                        description: null,
                        isInherit: false
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/cmatrix/4/4',
                    name: 'ワークフロー職員識別子列',
                    _code: {
                        _value: 99,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'CMatrixのワークフロー職員識別子列の定義です。'
                },
                template: {
                    '@value': {
                        index: '4_4_4',
                        value: NULL
                    },
                    _code: {
                        _value: 99,
                        _ver: 1
                    },
                    index: '4_4_4',
                    value: NULL
                },
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
                        },
                        description: null,
                        isInherit: false
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/cmatrix/4/4',
                    name: 'アプリケーション識別子列',
                    _code: {
                        _value: 100,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'CMatrixのアプリケーション識別子列の定義です。'
                },
                template: {
                    '@value': {
                        index: '4_4_5',
                        value: NULL
                    },
                    _code: {
                        _value: 100,
                        _ver: 1
                    },
                    index: '4_4_5',
                    value: NULL
                },
                prop: [
                    {
                        key: '@value',
                        type: {
                            of: 'code',
                            cmatrix: {
                                index: '4_4_5',
                                reserved: true
                            },
                            candidate: null
                        },
                        description: null,
                        isInherit: false
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/cmatrix/2/3',
                    name: 'ドキュメントを発生させたアクター識別子列',
                    _code: {
                        _value: 101,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'CMatrixのドキュメントを発生させたアクター識別子列の定義です。'
                },
                template: {
                    '@value': {
                        index: '2_3_1',
                        value: NULL
                    },
                    _code: {
                        _value: 101,
                        _ver: 1
                    },
                    index: '2_3_1',
                    value: NULL
                },
                prop: [
                    {
                        key: '@value',
                        type: {
                            of: 'code',
                            cmatrix: {
                                index: '2_3_1',
                                reserved: true
                            },
                            candidate: null
                        },
                        description: null,
                        isInherit: false
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/cmatrix/2/3',
                    name: 'ワークフロー識別子列',
                    _code: {
                        _value: 102,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'CMatrixのワークフロー識別子列の定義です。'
                },
                template: {
                    '@value': {
                        index: '2_3_2',
                        value: NULL
                    },
                    _code: {
                        _value: 102,
                        _ver: 1
                    },
                    index: '2_3_2',
                    value: NULL
                },
                prop: [
                    {
                        key: '@value',
                        type: {
                            of: 'code',
                            cmatrix: {
                                index: '2_3_2',
                                reserved: true
                            },
                            candidate: null
                        },
                        description: null,
                        isInherit: false
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/cmatrix/2/3',
                    name: 'ワークフローロール識別子列',
                    _code: {
                        _value: 103,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'CMatrixのワークフローロール識別子列の定義です。'
                },
                template: {
                    '@value': {
                        index: '2_3_3',
                        value: NULL
                    },
                    _code: {
                        _value: 103,
                        _ver: 1
                    },
                    index: '2_3_3',
                    value: NULL
                },
                prop: [
                    {
                        key: '@value',
                        type: {
                            of: 'code',
                            cmatrix: {
                                index: '2_3_3',
                                reserved: true
                            },
                            candidate: null
                        },
                        description: null,
                        isInherit: false
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/cmatrix/2/3',
                    name: 'ワークフロー職員識別子列',
                    _code: {
                        _value: 104,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'CMatrixのワークフロー職員識別子列の定義です。'
                },
                template: {
                    '@value': {
                        index: '2_3_4',
                        value: NULL
                    },
                    _code: {
                        _value: 104,
                        _ver: 1
                    },
                    index: '2_3_4',
                    value: NULL
                },
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
                        },
                        description: null,
                        isInherit: false
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/cmatrix/2/3',
                    name: 'アプリケーション識別子列',
                    _code: {
                        _value: 105,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'CMatrixのアプリケーション識別子列の定義です。'
                },
                template: {
                    '@value': {
                        index: '2_3_5',
                        value: NULL
                    },
                    _code: {
                        _value: 105,
                        _ver: 1
                    },
                    index: '2_3_5',
                    value: NULL
                },
                prop: [
                    {
                        key: '@value',
                        type: {
                            of: 'code',
                            cmatrix: {
                                index: '2_3_5',
                                reserved: true
                            },
                            candidate: null
                        },
                        description: null,
                        isInherit: false
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/person',
                    name: '個人属性',
                    _code: {
                        _value: 106,
                        _ver: 1
                    },
                    inherit: null,
                    description: '個人属性の定義です。'
                },
                template: {
                    _code: {
                        _value: 106,
                        _ver: 1
                    },
                    'item-group': null
                },
                prop: [
                    {
                        key: 'item-group',
                        type: {
                            of: 'inner[]',
                            inner: 'ItemGroup',
                            cmatrix: null,
                            candidate: null
                        },
                        description: '個人属性グループの配列',
                        isInherit: false
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/person/identification',
                    name: '本人性確認事項',
                    _code: {
                        _value: 107,
                        _ver: 1
                    },
                    inherit: {
                        _value: 106,
                        _ver: 1
                    },
                    description: '本人性確認事項の定義です。'
                },
                template: {
                    _code: {
                        _value: 107,
                        _ver: 1
                    },
                    'item-group': null,
                    'verification-ratio': null
                },
                prop: [
                    {
                        key: 'item-group',
                        type: {
                            of: 'inner[]',
                            inner: 'ItemGroup',
                            cmatrix: null,
                            candidate: null
                        },
                        description: '個人属性グループの配列',
                        isInherit: true
                    },
                    {
                        key: 'verification-ratio',
                        type: {
                            of: 'number',
                            cmatrix: null,
                            format: null,
                            unit: {
                                _value: 20009,
                                _ver: 1
                            },
                            candidate: null
                        },
                        description: '本人性の検証率',
                        isInherit: false
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/qualitative/experience',
                    name: 'あり',
                    _code: {
                        _value: 108,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'あり・なし（有無）の候補値（あり）の定義です。'
                },
                template: {
                    _code: {
                        _value: 108,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/qualitative/experience',
                    name: 'なし',
                    _code: {
                        _value: 109,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'あり・なし（有無）の候補値（なし）の定義です。'
                },
                template: {
                    _code: {
                        _value: 109,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/qualitative/Yes_or_No',
                    name: 'はい',
                    _code: {
                        _value: 110,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'はい・いいえの候補値（はい）の定義です。'
                },
                template: {
                    _code: {
                        _value: 110,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/qualitative/Yes_or_No',
                    name: 'いいえ',
                    _code: {
                        _value: 111,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'はい・いいえの候補値（いいえ）の定義です。'
                },
                template: {
                    _code: {
                        _value: 111,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/thing/qa/group',
                    name: '質問グループ',
                    _code: {
                        _value: 112,
                        _ver: 1
                    },
                    inherit: null,
                    description: '質問グループの定義です。質問グループ名をname, その説明をdescriptionに記載して、カタログを作成しグループとなる質問のqa-groupにcodeを付与してください。'
                },
                template: {
                    _code: {
                        _value: 112,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/thing/qa',
                    name: '定量値回答式の質問',
                    _code: {
                        _value: 114,
                        _ver: 1
                    },
                    inherit: {
                        _value: 55,
                        _ver: 1
                    },
                    description: '定量値回答式の質問の定義です。'
                },
                template: {
                    _code: {
                        _value: 114,
                        _ver: 1
                    },
                    answer: null,
                    app: null,
                    code: {
                        index: '4_1_2',
                        value: {
                            _value: 114,
                            _ver: 1
                        }
                    },
                    env: [
                        {
                            index: '4_3_(n)',
                            value: NULL
                        }
                    ],
                    id: {
                        index: '4_1_1',
                        value: NULL
                    },
                    'qa-group': {
                        index: '4_2_2_2',
                        value: NULL
                    },
                    'qa-group-branch-number': {
                        index: '4_2_2_3',
                        value: NULL
                    },
                    sourceId: null,
                    wf: null
                },
                prop: [
                    {
                        key: 'answer',
                        type: {
                            of: 'inner',
                            inner: 'Answer',
                            cmatrix: null,
                            candidate: null
                        },
                        description: '回答',
                        isInherit: false
                    },
                    {
                        key: 'app',
                        type: {
                            of: 'inner',
                            inner: 'App',
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'イベントを発生させたアプリケーションプロバイダー',
                        isInherit: true
                    },
                    {
                        key: 'code',
                        type: {
                            of: 'item',
                            _code: {
                                _value: 28,
                                _ver: 1
                            },
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'モノ種別',
                        isInherit: true
                    },
                    {
                        key: 'env',
                        type: {
                            of: 'item[]',
                            cmatrix: {
                                index: '4_3_(n)',
                                reserved: false
                            },
                            candidate: {
                                ns: [
                                    'catalog/model/env/thing/*',
                                    'catalog/built_in/env/thing/*',
                                    'catalog/ext/test-org/env/thing/*'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: 'モノ環境の配列',
                        isInherit: true
                    },
                    {
                        key: 'id',
                        type: {
                            of: 'item',
                            _code: {
                                _value: 27,
                                _ver: 1
                            },
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'モノ識別子',
                        isInherit: true
                    },
                    {
                        key: 'qa-group',
                        type: {
                            of: 'code',
                            cmatrix: {
                                index: '4_2_2_2',
                                reserved: false
                            },
                            candidate: {
                                ns: null,
                                _code: null,
                                base: {
                                    _value: 112,
                                    _ver: 1
                                }
                            }
                        },
                        description: '質問グループ',
                        isInherit: false
                    },
                    {
                        key: 'qa-group-branch-number',
                        type: {
                            of: 'number',
                            cmatrix: {
                                index: '4_2_2_3',
                                reserved: false
                            },
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '質問グループ枝番',
                        isInherit: false
                    },
                    {
                        key: 'sourceId',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'モノのソースID',
                        isInherit: true
                    },
                    {
                        key: 'wf',
                        type: {
                            of: 'inner',
                            inner: 'Wf',
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'イベントを発生させたワークフロープロバイダー',
                        isInherit: true
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/thing/autocode',
                    name: 'codeの_valueのみ',
                    _code: {
                        _value: 201,
                        _ver: 1
                    },
                    inherit: {
                        _value: 55,
                        _ver: 1
                    },
                    description: 'codeの_valueのみの定義です。'
                },
                template: {
                    _code: {
                        _value: 201,
                        _ver: 1
                    },
                    app: null,
                    code: {
                        index: '4_1_2',
                        value: {
                            _value: 2010,
                            _ver: 0
                        }
                    },
                    env: [
                        {
                            index: '4_3_(n)',
                            value: NULL
                        }
                    ],
                    id: {
                        index: '4_1_1',
                        value: NULL
                    },
                    sourceId: null,
                    wf: null
                },
                prop: [
                    {
                        key: 'app',
                        type: {
                            of: 'inner',
                            inner: 'App',
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'イベントを発生させたアプリケーションプロバイダー',
                        isInherit: true
                    },
                    {
                        key: 'code',
                        type: {
                            of: 'item',
                            _code: {
                                _value: 28,
                                _ver: 1
                            },
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'モノ種別',
                        isInherit: true
                    },
                    {
                        key: 'env',
                        type: {
                            of: 'item[]',
                            cmatrix: {
                                index: '4_3_(n)',
                                reserved: false
                            },
                            candidate: {
                                ns: [
                                    'catalog/model/env/thing/*',
                                    'catalog/built_in/env/thing/*',
                                    'catalog/ext/test-org/env/thing/*'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: 'モノ環境の配列',
                        isInherit: true
                    },
                    {
                        key: 'id',
                        type: {
                            of: 'item',
                            _code: {
                                _value: 27,
                                _ver: 1
                            },
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'モノ識別子',
                        isInherit: true
                    },
                    {
                        key: 'sourceId',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'モノのソースID',
                        isInherit: true
                    },
                    {
                        key: 'wf',
                        type: {
                            of: 'inner',
                            inner: 'Wf',
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'イベントを発生させたワークフロープロバイダー',
                        isInherit: true
                    }
                ],
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
                ],
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/thing/autocode',
                    name: 'codeの_verのみ',
                    _code: {
                        _value: 202,
                        _ver: 1
                    },
                    inherit: {
                        _value: 55,
                        _ver: 1
                    },
                    description: 'codeの_verのみの定義です。'
                },
                template: {
                    _code: {
                        _value: 202,
                        _ver: 1
                    },
                    app: null,
                    code: {
                        index: '4_1_2',
                        value: {
                            _value: 0,
                            _ver: 2020
                        }
                    },
                    env: [
                        {
                            index: '4_3_(n)',
                            value: NULL
                        }
                    ],
                    id: {
                        index: '4_1_1',
                        value: NULL
                    },
                    sourceId: null,
                    wf: null
                },
                prop: [
                    {
                        key: 'app',
                        type: {
                            of: 'inner',
                            inner: 'App',
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'イベントを発生させたアプリケーションプロバイダー',
                        isInherit: true
                    },
                    {
                        key: 'code',
                        type: {
                            of: 'item',
                            _code: {
                                _value: 28,
                                _ver: 1
                            },
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'モノ種別',
                        isInherit: true
                    },
                    {
                        key: 'env',
                        type: {
                            of: 'item[]',
                            cmatrix: {
                                index: '4_3_(n)',
                                reserved: false
                            },
                            candidate: {
                                ns: [
                                    'catalog/model/env/thing/*',
                                    'catalog/built_in/env/thing/*',
                                    'catalog/ext/test-org/env/thing/*'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: 'モノ環境の配列',
                        isInherit: true
                    },
                    {
                        key: 'id',
                        type: {
                            of: 'item',
                            _code: {
                                _value: 27,
                                _ver: 1
                            },
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'モノ識別子',
                        isInherit: true
                    },
                    {
                        key: 'sourceId',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'モノのソースID',
                        isInherit: true
                    },
                    {
                        key: 'wf',
                        type: {
                            of: 'inner',
                            inner: 'Wf',
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'イベントを発生させたワークフロープロバイダー',
                        isInherit: true
                    }
                ],
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
                ],
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/thing/autocode',
                    name: 'codeの_value、_verがnull',
                    _code: {
                        _value: 203,
                        _ver: 1
                    },
                    inherit: {
                        _value: 55,
                        _ver: 1
                    },
                    description: 'codeの_value、_verがnullの定義です。'
                },
                template: {
                    _code: {
                        _value: 203,
                        _ver: 1
                    },
                    app: null,
                    code: {
                        index: '4_1_2',
                        value: {
                            _value: 203,
                            _ver: 1
                        }
                    },
                    env: [
                        {
                            index: '4_3_(n)',
                            value: NULL
                        }
                    ],
                    id: {
                        index: '4_1_1',
                        value: NULL
                    },
                    sourceId: null,
                    wf: null
                },
                prop: [
                    {
                        key: 'app',
                        type: {
                            of: 'inner',
                            inner: 'App',
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'イベントを発生させたアプリケーションプロバイダー',
                        isInherit: true
                    },
                    {
                        key: 'code',
                        type: {
                            of: 'item',
                            _code: {
                                _value: 28,
                                _ver: 1
                            },
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'モノ種別',
                        isInherit: true
                    },
                    {
                        key: 'env',
                        type: {
                            of: 'item[]',
                            cmatrix: {
                                index: '4_3_(n)',
                                reserved: false
                            },
                            candidate: {
                                ns: [
                                    'catalog/model/env/thing/*',
                                    'catalog/built_in/env/thing/*',
                                    'catalog/ext/test-org/env/thing/*'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: 'モノ環境の配列',
                        isInherit: true
                    },
                    {
                        key: 'id',
                        type: {
                            of: 'item',
                            _code: {
                                _value: 27,
                                _ver: 1
                            },
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'モノ識別子',
                        isInherit: true
                    },
                    {
                        key: 'sourceId',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'モノのソースID',
                        isInherit: true
                    },
                    {
                        key: 'wf',
                        type: {
                            of: 'inner',
                            inner: 'Wf',
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'イベントを発生させたワークフロープロバイダー',
                        isInherit: true
                    }
                ],
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
                ],
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/thing/autocode',
                    name: 'codeの_value、_ver以外',
                    _code: {
                        _value: 204,
                        _ver: 1
                    },
                    inherit: {
                        _value: 55,
                        _ver: 1
                    },
                    description: 'codeの_value、_ver以外の定義です。'
                },
                template: {
                    _code: {
                        _value: 204,
                        _ver: 1
                    },
                    app: null,
                    code: 'テストコード',
                    env: [
                        {
                            index: '4_3_(n)',
                            value: NULL
                        }
                    ],
                    id: {
                        index: '4_1_1',
                        value: NULL
                    },
                    sourceId: null,
                    wf: null
                },
                prop: [
                    {
                        key: 'app',
                        type: {
                            of: 'inner',
                            inner: 'App',
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'イベントを発生させたアプリケーションプロバイダー',
                        isInherit: true
                    },
                    {
                        key: 'code',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'コード',
                        isInherit: false
                    },
                    {
                        key: 'env',
                        type: {
                            of: 'item[]',
                            cmatrix: {
                                index: '4_3_(n)',
                                reserved: false
                            },
                            candidate: {
                                ns: [
                                    'catalog/model/env/thing/*',
                                    'catalog/built_in/env/thing/*',
                                    'catalog/ext/test-org/env/thing/*'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: 'モノ環境の配列',
                        isInherit: true
                    },
                    {
                        key: 'id',
                        type: {
                            of: 'item',
                            _code: {
                                _value: 27,
                                _ver: 1
                            },
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'モノ識別子',
                        isInherit: true
                    },
                    {
                        key: 'sourceId',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'モノのソースID',
                        isInherit: true
                    },
                    {
                        key: 'wf',
                        type: {
                            of: 'inner',
                            inner: 'Wf',
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'イベントを発生させたワークフロープロバイダー',
                        isInherit: true
                    }
                ],
                value: [
                    {
                        key: 'code',
                        value: 'テストコード'
                    }
                ],
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/thing/autocode',
                    name: 'codeの_ver違い',
                    _code: {
                        _value: 205,
                        _ver: 3
                    },
                    inherit: {
                        _value: 55,
                        _ver: 1
                    },
                    description: 'codeの_ver違いの定義です。'
                },
                template: {
                    _code: {
                        _value: 205,
                        _ver: 3
                    },
                    app: null,
                    code: {
                        index: '4_1_2',
                        value: {
                            _value: 205,
                            _ver: 3
                        }
                    },
                    env: [
                        {
                            index: '4_3_(n)',
                            value: NULL
                        }
                    ],
                    id: {
                        index: '4_1_1',
                        value: NULL
                    },
                    sourceId: null,
                    wf: null
                },
                prop: [
                    {
                        key: 'app',
                        type: {
                            of: 'inner',
                            inner: 'App',
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'イベントを発生させたアプリケーションプロバイダー',
                        isInherit: true
                    },
                    {
                        key: 'code',
                        type: {
                            of: 'item',
                            _code: {
                                _value: 28,
                                _ver: 1
                            },
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'モノ種別',
                        isInherit: true
                    },
                    {
                        key: 'env',
                        type: {
                            of: 'item[]',
                            cmatrix: {
                                index: '4_3_(n)',
                                reserved: false
                            },
                            candidate: {
                                ns: [
                                    'catalog/model/env/thing/*',
                                    'catalog/built_in/env/thing/*',
                                    'catalog/ext/test-org/env/thing/*'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: 'モノ環境の配列',
                        isInherit: true
                    },
                    {
                        key: 'id',
                        type: {
                            of: 'item',
                            _code: {
                                _value: 27,
                                _ver: 1
                            },
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'モノ識別子',
                        isInherit: true
                    },
                    {
                        key: 'sourceId',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'モノのソースID',
                        isInherit: true
                    },
                    {
                        key: 'wf',
                        type: {
                            of: 'inner',
                            inner: 'Wf',
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'イベントを発生させたワークフロープロバイダー',
                        isInherit: true
                    }
                ],
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
                ],
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/setting/actor/data-trader',
                    name: 'setting',
                    _code: {
                        _value: 115,
                        _ver: 1
                    },
                    inherit: null,
                    description: '流通制御によるデータ取引サービスプロバイダーのアクター個別設定の定義です。'
                },
                template: {
                    _code: {
                        _value: 115,
                        _ver: 1
                    },
                    auth: [
                        {
                            _value: 139,
                            _ver: 1
                        },
                        {
                            _value: 140,
                            _ver: 1
                        },
                        {
                            _value: 141,
                            _ver: 1
                        },
                        {
                            _value: 142,
                            _ver: 1
                        },
                        {
                            _value: 143,
                            _ver: 1
                        },
                        {
                            _value: 144,
                            _ver: 1
                        },
                        {
                            _value: 147,
                            _ver: 1
                        },
                        {
                            _value: 149,
                            _ver: 1
                        },
                        {
                            _value: 152,
                            _ver: 1
                        },
                        {
                            _value: 153,
                            _ver: 1
                        }
                    ],
                    'certify-consumer': null,
                    'create-book': null
                },
                prop: [
                    {
                        key: 'auth',
                        type: {
                            of: 'code[]',
                            cmatrix: null,
                            candidate: {
                                ns: [
                                    'catalog/model/auth/*'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: '操作権の配列',
                        isInherit: false
                    },
                    {
                        key: 'certify-consumer',
                        type: {
                            of: 'boolean',
                            cmatrix: null
                        },
                        description: 'Consumer認定権限有無',
                        isInherit: false
                    },
                    {
                        key: 'create-book',
                        type: {
                            of: 'boolean',
                            cmatrix: null
                        },
                        description: 'Book開設権限有無',
                        isInherit: false
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
                ],
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/notification/アクター認定申請',
                    name: '承認要求',
                    _code: {
                        _value: 117,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'アクターン認定申請の承認要求の通知カテゴリの定義です。'
                },
                template: {
                    _code: {
                        _value: 117,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/notification/アクター認定申請',
                    name: '承認',
                    _code: {
                        _value: 118,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'アクター認定申請の承認の通知カテゴリの定義です。'
                },
                template: {
                    _code: {
                        _value: 118,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/notification/アクター認定申請',
                    name: '否認',
                    _code: {
                        _value: 119,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'アクター認定申請の否認の通知カテゴリの定義です。'
                },
                template: {
                    _code: {
                        _value: 119,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/notification/Region参加申請',
                    name: '承認要求',
                    _code: {
                        _value: 120,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'Region参加申請の承認要求の通知カテゴリの定義です。'
                },
                template: {
                    _code: {
                        _value: 120,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/notification/Region参加申請',
                    name: '承認',
                    _code: {
                        _value: 121,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'Region参加申請の承認の通知カテゴリの定義です。'
                },
                template: {
                    _code: {
                        _value: 121,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/notification/Region参加申請',
                    name: '否認',
                    _code: {
                        _value: 122,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'Region参加申請の否認の通知カテゴリの定義です。'
                },
                template: {
                    _code: {
                        _value: 122,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/notification/提携申請',
                    name: '承認要求',
                    _code: {
                        _value: 123,
                        _ver: 1
                    },
                    inherit: null,
                    description: '提携申請の承認要求の通知カテゴリの定義です。'
                },
                template: {
                    _code: {
                        _value: 123,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/notification/提携申請',
                    name: '承認',
                    _code: {
                        _value: 124,
                        _ver: 1
                    },
                    inherit: null,
                    description: '提携申請の承認の通知カテゴリの定義です。'
                },
                template: {
                    _code: {
                        _value: 124,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/notification/提携申請',
                    name: '否認',
                    _code: {
                        _value: 125,
                        _ver: 1
                    },
                    inherit: null,
                    description: '提携申請の否認の通知カテゴリの定義です。'
                },
                template: {
                    _code: {
                        _value: 125,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/notification',
                    name: '通知',
                    _code: {
                        _value: 126,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'メッセージ送付で使用する通知カテゴリの定義です。'
                },
                template: {
                    _code: {
                        _value: 126,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/setting/actor/app',
                    name: 'setting',
                    _code: {
                        _value: 127,
                        _ver: 1
                    },
                    inherit: null,
                    description: '流通制御によるアプリケーションプロバイダーのアクター個別設定の定義です。'
                },
                template: {
                    _code: {
                        _value: 127,
                        _ver: 1
                    },
                    auth: [
                        {
                            _value: 139,
                            _ver: 1
                        },
                        {
                            _value: 140,
                            _ver: 1
                        },
                        {
                            _value: 141,
                            _ver: 1
                        },
                        {
                            _value: 144,
                            _ver: 1
                        },
                        {
                            _value: 147,
                            _ver: 1
                        },
                        {
                            _value: 148,
                            _ver: 1
                        },
                        {
                            _value: 149,
                            _ver: 1
                        },
                        {
                            _value: 150,
                            _ver: 1
                        },
                        {
                            _value: 151,
                            _ver: 1
                        }
                    ]
                },
                prop: [
                    {
                        key: 'auth',
                        type: {
                            of: 'code[]',
                            cmatrix: null,
                            candidate: {
                                ns: [
                                    'catalog/model/auth/*'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: '操作権の配列',
                        isInherit: false
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
                ],
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/setting/actor/consumer',
                    name: 'setting',
                    _code: {
                        _value: 128,
                        _ver: 1
                    },
                    inherit: null,
                    description: '流通制御によるデータコンシューマーのアクター個別設定の定義です。'
                },
                template: {
                    _code: {
                        _value: 128,
                        _ver: 1
                    },
                    auth: [
                        {
                            _value: 139,
                            _ver: 1
                        },
                        {
                            _value: 140,
                            _ver: 1
                        },
                        {
                            _value: 141,
                            _ver: 1
                        },
                        {
                            _value: 144,
                            _ver: 1
                        },
                        {
                            _value: 147,
                            _ver: 1
                        },
                        {
                            _value: 149,
                            _ver: 1
                        },
                        {
                            _value: 152,
                            _ver: 1
                        },
                        {
                            _value: 153,
                            _ver: 1
                        }
                    ]
                },
                prop: [
                    {
                        key: 'auth',
                        type: {
                            of: 'code[]',
                            cmatrix: null,
                            candidate: {
                                ns: [
                                    'catalog/model/auth/*'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: '操作権の配列',
                        isInherit: false
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
                ],
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/setting/actor/pxr',
                    name: 'setting',
                    _code: {
                        _value: 129,
                        _ver: 1
                    },
                    inherit: null,
                    description: '流通制御によるPXRポータルの個別設定の定義です。'
                },
                template: {
                    _code: {
                        _value: 129,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/setting/actor/pxr-root',
                    name: 'setting',
                    _code: {
                        _value: 130,
                        _ver: 1
                    },
                    inherit: null,
                    description: '流通制御による流通制御サービスプロバイダーのアクター個別設定の定義です。'
                },
                template: {
                    _code: {
                        _value: 130,
                        _ver: 1
                    },
                    auth: [
                        {
                            _value: 139,
                            _ver: 1
                        },
                        {
                            _value: 140,
                            _ver: 1
                        },
                        {
                            _value: 141,
                            _ver: 1
                        },
                        {
                            _value: 142,
                            _ver: 1
                        },
                        {
                            _value: 144,
                            _ver: 1
                        },
                        {
                            _value: 147,
                            _ver: 1
                        },
                        {
                            _value: 149,
                            _ver: 1
                        },
                        {
                            _value: 155,
                            _ver: 1
                        }
                    ],
                    'identification-checklist': null,
                    'identification-document': null,
                    'pxr-root-name': null,
                    'store-distribution-ratio': null,
                    'supply-distribution-ratio': null
                },
                prop: [
                    {
                        key: 'auth',
                        type: {
                            of: 'code[]',
                            cmatrix: null,
                            candidate: {
                                ns: [
                                    'catalog/model/auth/*'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: '操作権の配列',
                        isInherit: false
                    },
                    {
                        key: 'identification-checklist',
                        type: {
                            of: 'code[]',
                            cmatrix: null,
                            candidate: {
                                ns: [
                                    'catalog/model/person/item-type',
                                    'catalog/built_in/person/item-type',
                                    'catalog/ext/test-org/person/item-type'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: '採用した本人性確認事項',
                        isInherit: false
                    },
                    {
                        key: 'identification-document',
                        type: {
                            of: 'inner[]',
                            inner: 'Identification-document',
                            cmatrix: null,
                            candidate: null
                        },
                        description: '採用した本人性確認書類',
                        isInherit: false
                    },
                    {
                        key: 'pxr-root-name',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '流通制御サービスプロバイダーの呼称',
                        isInherit: false
                    },
                    {
                        key: 'store-distribution-ratio',
                        type: {
                            of: 'inner[]',
                            inner: 'DistributionRatio',
                            cmatrix: null,
                            candidate: null
                        },
                        description: '蓄積分配比率',
                        isInherit: false
                    },
                    {
                        key: 'supply-distribution-ratio',
                        type: {
                            of: 'inner[]',
                            inner: 'DistributionRatio',
                            cmatrix: null,
                            candidate: null
                        },
                        description: '提供分配比率',
                        isInherit: false
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
                ],
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/setting/actor/wf',
                    name: 'setting',
                    _code: {
                        _value: 131,
                        _ver: 1
                    },
                    inherit: null,
                    description: '流通制御によるワークフロープロバイダーのアクター個別設定の定義です。'
                },
                template: {
                    _code: {
                        _value: 131,
                        _ver: 1
                    },
                    auth: [
                        {
                            _value: 139,
                            _ver: 1
                        },
                        {
                            _value: 140,
                            _ver: 1
                        },
                        {
                            _value: 141,
                            _ver: 1
                        },
                        {
                            _value: 144,
                            _ver: 1
                        },
                        {
                            _value: 147,
                            _ver: 1
                        },
                        {
                            _value: 148,
                            _ver: 1
                        },
                        {
                            _value: 149,
                            _ver: 1
                        },
                        {
                            _value: 150,
                            _ver: 1
                        },
                        {
                            _value: 151,
                            _ver: 1
                        },
                        {
                            _value: 154,
                            _ver: 1
                        }
                    ]
                },
                prop: [
                    {
                        key: 'auth',
                        type: {
                            of: 'code[]',
                            cmatrix: null,
                            candidate: {
                                ns: [
                                    'catalog/model/auth/*'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: '操作権の配列',
                        isInherit: false
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
                ],
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/setting/actor/region-root',
                    name: 'setting',
                    _code: {
                        _value: 132,
                        _ver: 1
                    },
                    inherit: null,
                    description: '流通制御による領域運営サービスプロバイダーのアクター個別設定の定義です。'
                },
                template: {
                    _code: {
                        _value: 132,
                        _ver: 1
                    },
                    auth: [
                        {
                            _value: 139,
                            _ver: 1
                        },
                        {
                            _value: 140,
                            _ver: 1
                        },
                        {
                            _value: 141,
                            _ver: 1
                        },
                        {
                            _value: 144,
                            _ver: 1
                        },
                        {
                            _value: 147,
                            _ver: 1
                        },
                        {
                            _value: 149,
                            _ver: 1
                        },
                        {
                            _value: 150,
                            _ver: 1
                        },
                        {
                            _value: 151,
                            _ver: 1
                        },
                        {
                            _value: 152,
                            _ver: 1
                        },
                        {
                            _value: 153,
                            _ver: 1
                        }
                    ],
                    'certify-app': null,
                    'certify-wf': null
                },
                prop: [
                    {
                        key: 'auth',
                        type: {
                            of: 'code[]',
                            cmatrix: null,
                            candidate: {
                                ns: [
                                    'catalog/model/auth/*'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: '操作権の配列',
                        isInherit: false
                    },
                    {
                        key: 'certify-app',
                        type: {
                            of: 'boolean',
                            cmatrix: null
                        },
                        description: 'APP認定権限有無',
                        isInherit: false
                    },
                    {
                        key: 'certify-wf',
                        type: {
                            of: 'boolean',
                            cmatrix: null
                        },
                        description: 'WF認定権限有無',
                        isInherit: false
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
                ],
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/notification/アクター認定申請',
                    name: 'クライアント証明書取得',
                    _code: {
                        _value: 138,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'アクター認定申請のクライアント証明書取得の通知カテゴリの定義です。'
                },
                template: {
                    _code: {
                        _value: 138,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/auth/member',
                    name: 'オペレーター追加',
                    _code: {
                        _value: 139,
                        _ver: 1
                    },
                    inherit: {
                        _value: 76,
                        _ver: 1
                    },
                    description: '運営メンバーの追加操作が可能。'
                },
                template: {
                    _code: {
                        _value: 139,
                        _ver: 1
                    },
                    'auth-name': 'add'
                },
                prop: [
                    {
                        key: 'auth-name',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '操作権定義名（各ネームスペース毎にユニークであること）',
                        isInherit: true
                    }
                ],
                value: [
                    {
                        key: 'auth-name',
                        value: 'add'
                    }
                ],
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/auth/member',
                    name: 'オペレーター更新',
                    _code: {
                        _value: 140,
                        _ver: 1
                    },
                    inherit: {
                        _value: 76,
                        _ver: 1
                    },
                    description: '運営メンバーの更新操作が可能。'
                },
                template: {
                    _code: {
                        _value: 140,
                        _ver: 1
                    },
                    'auth-name': 'update'
                },
                prop: [
                    {
                        key: 'auth-name',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '操作権定義名（各ネームスペース毎にユニークであること）',
                        isInherit: true
                    }
                ],
                value: [
                    {
                        key: 'auth-name',
                        value: 'update'
                    }
                ],
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/auth/member',
                    name: 'オペレーター削除',
                    _code: {
                        _value: 141,
                        _ver: 1
                    },
                    inherit: {
                        _value: 76,
                        _ver: 1
                    },
                    description: '運営メンバーの削除操作が可能。'
                },
                template: {
                    _code: {
                        _value: 141,
                        _ver: 1
                    },
                    'auth-name': 'delete'
                },
                prop: [
                    {
                        key: 'auth-name',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '操作権定義名（各ネームスペース毎にユニークであること）',
                        isInherit: true
                    }
                ],
                value: [
                    {
                        key: 'auth-name',
                        value: 'delete'
                    }
                ],
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/auth/book',
                    name: 'Book開設',
                    _code: {
                        _value: 142,
                        _ver: 1
                    },
                    inherit: {
                        _value: 76,
                        _ver: 1
                    },
                    description: 'My-Condition-Bookの開設操作が可能。'
                },
                template: {
                    _code: {
                        _value: 142,
                        _ver: 1
                    },
                    'auth-name': 'create'
                },
                prop: [
                    {
                        key: 'auth-name',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '操作権定義名（各ネームスペース毎にユニークであること）',
                        isInherit: true
                    }
                ],
                value: [
                    {
                        key: 'auth-name',
                        value: 'create'
                    }
                ],
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/auth/info-account',
                    name: '情報口座開設',
                    _code: {
                        _value: 143,
                        _ver: 1
                    },
                    inherit: {
                        _value: 76,
                        _ver: 1
                    },
                    description: '情報口座の開設操作が可能。'
                },
                template: {
                    _code: {
                        _value: 143,
                        _ver: 1
                    },
                    'auth-name': 'create'
                },
                prop: [
                    {
                        key: 'auth-name',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '操作権定義名（各ネームスペース毎にユニークであること）',
                        isInherit: true
                    }
                ],
                value: [
                    {
                        key: 'auth-name',
                        value: 'create'
                    }
                ],
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/auth/actor',
                    name: 'アクター認定申請',
                    _code: {
                        _value: 144,
                        _ver: 1
                    },
                    inherit: {
                        _value: 76,
                        _ver: 1
                    },
                    description: 'アクター認定の申請操作が可能。'
                },
                template: {
                    _code: {
                        _value: 144,
                        _ver: 1
                    },
                    'auth-name': 'application'
                },
                prop: [
                    {
                        key: 'auth-name',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '操作権定義名（各ネームスペース毎にユニークであること）',
                        isInherit: true
                    }
                ],
                value: [
                    {
                        key: 'auth-name',
                        value: 'application'
                    }
                ],
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/notification/本人性確認コード',
                    name: '利用者ID連携用コード発行',
                    _code: {
                        _value: 145,
                        _ver: 1
                    },
                    inherit: null,
                    description: '本人性確認コード発行の通知カテゴリの定義です。'
                },
                template: {
                    _code: {
                        _value: 145,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/notification/情報口座',
                    name: '開設完了',
                    _code: {
                        _value: 146,
                        _ver: 1
                    },
                    inherit: null,
                    description: '情報口座の開設完了の通知カテゴリの定義です。'
                },
                template: {
                    _code: {
                        _value: 146,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/auth/actor',
                    name: 'アクター認定承認',
                    _code: {
                        _value: 147,
                        _ver: 1
                    },
                    inherit: {
                        _value: 76,
                        _ver: 1
                    },
                    description: 'アクター認定の承認操作が可能。'
                },
                template: {
                    _code: {
                        _value: 147,
                        _ver: 1
                    },
                    'auth-name': 'approval'
                },
                prop: [
                    {
                        key: 'auth-name',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '操作権定義名（各ネームスペース毎にユニークであること）',
                        isInherit: true
                    }
                ],
                value: [
                    {
                        key: 'auth-name',
                        value: 'approval'
                    }
                ],
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/auth/app-wf-user',
                    name: '利用者作成',
                    _code: {
                        _value: 148,
                        _ver: 1
                    },
                    inherit: {
                        _value: 76,
                        _ver: 1
                    },
                    description: '利用者ID連携操作が可能。'
                },
                template: {
                    _code: {
                        _value: 148,
                        _ver: 1
                    },
                    'auth-name': 'create'
                },
                prop: [
                    {
                        key: 'auth-name',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '操作権定義名（各ネームスペース毎にユニークであること）',
                        isInherit: true
                    }
                ],
                value: [
                    {
                        key: 'auth-name',
                        value: 'create'
                    }
                ],
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/auth/catalog',
                    name: '作成更新',
                    _code: {
                        _value: 149,
                        _ver: 1
                    },
                    inherit: {
                        _value: 76,
                        _ver: 1
                    },
                    description: 'カタログの更新（新規作成・編集・削除）操作が可能。'
                },
                template: {
                    _code: {
                        _value: 149,
                        _ver: 1
                    },
                    'auth-name': 'create'
                },
                prop: [
                    {
                        key: 'auth-name',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '操作権定義名（各ネームスペース毎にユニークであること）',
                        isInherit: true
                    }
                ],
                value: [
                    {
                        key: 'auth-name',
                        value: 'create'
                    }
                ],
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/auth/join',
                    name: 'Region参加申請',
                    _code: {
                        _value: 150,
                        _ver: 1
                    },
                    inherit: {
                        _value: 76,
                        _ver: 1
                    },
                    description: 'Region参加・離脱の申請操作が可能。'
                },
                template: {
                    _code: {
                        _value: 150,
                        _ver: 1
                    },
                    'auth-name': 'application'
                },
                prop: [
                    {
                        key: 'auth-name',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '操作権定義名（各ネームスペース毎にユニークであること）',
                        isInherit: true
                    }
                ],
                value: [
                    {
                        key: 'auth-name',
                        value: 'application'
                    }
                ],
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/auth/join',
                    name: 'Region参加承認',
                    _code: {
                        _value: 151,
                        _ver: 1
                    },
                    inherit: {
                        _value: 76,
                        _ver: 1
                    },
                    description: 'Region参加・離脱の承認操作が可能。'
                },
                template: {
                    _code: {
                        _value: 151,
                        _ver: 1
                    },
                    'auth-name': 'approval'
                },
                prop: [
                    {
                        key: 'auth-name',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '操作権定義名（各ネームスペース毎にユニークであること）',
                        isInherit: true
                    }
                ],
                value: [
                    {
                        key: 'auth-name',
                        value: 'approval'
                    }
                ],
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/auth/alliance',
                    name: '提携申請',
                    _code: {
                        _value: 152,
                        _ver: 1
                    },
                    inherit: {
                        _value: 76,
                        _ver: 1
                    },
                    description: '提携の申請操作が可能。'
                },
                template: {
                    _code: {
                        _value: 152,
                        _ver: 1
                    },
                    'auth-name': 'application'
                },
                prop: [
                    {
                        key: 'auth-name',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '操作権定義名（各ネームスペース毎にユニークであること）',
                        isInherit: true
                    }
                ],
                value: [
                    {
                        key: 'auth-name',
                        value: 'application'
                    }
                ],
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/auth/alliance',
                    name: '提携承認',
                    _code: {
                        _value: 153,
                        _ver: 1
                    },
                    inherit: {
                        _value: 76,
                        _ver: 1
                    },
                    description: '提携の承認操作が可能。'
                },
                template: {
                    _code: {
                        _value: 153,
                        _ver: 1
                    },
                    'auth-name': 'approval'
                },
                prop: [
                    {
                        key: 'auth-name',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '操作権定義名（各ネームスペース毎にユニークであること）',
                        isInherit: true
                    }
                ],
                value: [
                    {
                        key: 'auth-name',
                        value: 'approval'
                    }
                ],
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/auth/workflow',
                    name: 'ワークフロー作成/更新',
                    _code: {
                        _value: 154,
                        _ver: 1
                    },
                    inherit: {
                        _value: 76,
                        _ver: 1
                    },
                    description: 'ワークフローの更新（新規作成・編集・削除）操作が可能。'
                },
                template: {
                    _code: {
                        _value: 154,
                        _ver: 1
                    },
                    'auth-name': 'create'
                },
                prop: [
                    {
                        key: 'auth-name',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '操作権定義名（各ネームスペース毎にユニークであること）',
                        isInherit: true
                    }
                ],
                value: [
                    {
                        key: 'auth-name',
                        value: 'create'
                    }
                ],
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/auth/setting',
                    name: '編集',
                    _code: {
                        _value: 155,
                        _ver: 1
                    },
                    inherit: {
                        _value: 76,
                        _ver: 1
                    },
                    description: '設定の編集操作が可能。'
                },
                template: {
                    _code: {
                        _value: 155,
                        _ver: 1
                    },
                    'auth-name': 'update'
                },
                prop: [
                    {
                        key: 'auth-name',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '操作権定義名（各ネームスペース毎にユニークであること）',
                        isInherit: true
                    }
                ],
                value: [
                    {
                        key: 'auth-name',
                        value: 'update'
                    }
                ],
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/notification/利用者',
                    name: '作成完了',
                    _code: {
                        _value: 156,
                        _ver: 1
                    },
                    inherit: null,
                    description: '利用者の作成完了の通知カテゴリの定義です。'
                },
                template: {
                    _code: {
                        _value: 156,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/notification/アクター認定申請',
                    name: '管理移行承認要求',
                    _code: {
                        _value: 157,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'アクター認定申請の管理移行承認要求の通知カテゴリの定義です。'
                },
                template: {
                    _code: {
                        _value: 157,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/notification/利用者',
                    name: '削除完了',
                    _code: {
                        _value: 158,
                        _ver: 1
                    },
                    inherit: null,
                    description: '利用者の削除完了の通知カテゴリの定義です。'
                },
                template: {
                    _code: {
                        _value: 158,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/attribute/category/data',
                    name: 'データカテゴリ',
                    _code: {
                        _value: 159,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'データカテゴリの定義です。'
                },
                template: {
                    _code: {
                        _value: 159,
                        _ver: 1
                    },
                    line_color: null,
                    paint_color: null
                },
                prop: [
                    {
                        key: 'line_color',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'データカテゴリの線の色（カラーコード指定）',
                        isInherit: false
                    },
                    {
                        key: 'paint_color',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'データカテゴリの表示色（カラーコード指定）',
                        isInherit: false
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/setting/global',
                    name: 'setting',
                    _code: {
                        _value: 160,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'システム全体のグローバル設定の定義です。'
                },
                template: {
                    _code: {
                        _value: 160,
                        _ver: 1
                    },
                    'account-lock-count': null,
                    'account-lock-release-time': null,
                    'app-p-name': null,
                    'book-name': null,
                    book_create_sms_message: null,
                    'catalog-name': null,
                    'coin-name': null,
                    'data-consumer-name': null,
                    'data-trader-name': null,
                    help_contact: null,
                    'identity-verification-expiration': null,
                    login_sms_message: null,
                    management_format_errormessage: null,
                    management_initial_login_description: null,
                    management_password_format: null,
                    onboarding_start: null,
                    onboarding_store: null,
                    'one-time-login-code-expiration': null,
                    'password-expiration': null,
                    'password-generations-number': null,
                    personal_account_delete: null,
                    personal_account_delete_ng_message: null,
                    personal_disassociation: null,
                    personal_initial_login_description: null,
                    personal_share_basic_policy: null,
                    personal_temporary_share: null,
                    'personal_two-step_verification': null,
                    'portal-name': null,
                    pxr_id_format_errormessage: null,
                    pxr_id_password_format: null,
                    pxr_id_prefix: null,
                    pxr_id_suffix: null,
                    'region-root-name': null,
                    search_target_ns: null,
                    'session-expiration': null,
                    'system-name': null,
                    terms_of_service: null,
                    'wf-p-name': null,
                    'workflow-name': null
                },
                prop: [
                    {
                        key: 'account-lock-count',
                        type: {
                            of: 'number',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'アカウントロックまでの試行上限回数',
                        isInherit: false
                    },
                    {
                        key: 'account-lock-release-time',
                        type: {
                            of: 'inner',
                            inner: 'Expiration',
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'アカウントロック解除までの時間',
                        isInherit: false
                    },
                    {
                        key: 'app-p-name',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'アプリケーションプロバイダーの呼称',
                        isInherit: false
                    },
                    {
                        key: 'book-name',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'My-Condition-Book呼称',
                        isInherit: false
                    },
                    {
                        key: 'book_create_sms_message',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'Book作成時SMSメッセージ内容',
                        isInherit: false
                    },
                    {
                        key: 'catalog-name',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'My-Condition-Dataカタログ呼称',
                        isInherit: false
                    },
                    {
                        key: 'coin-name',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'PXRコイン呼称',
                        isInherit: false
                    },
                    {
                        key: 'data-consumer-name',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'データコンシューマーの呼称',
                        isInherit: false
                    },
                    {
                        key: 'data-trader-name',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'データ取引サービスプロバイダーの呼称',
                        isInherit: false
                    },
                    {
                        key: 'help_contact',
                        type: {
                            of: 'item',
                            _code: null,
                            cmatrix: null,
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
                        description: 'ヘルプ・問い合わせ',
                        isInherit: false
                    },
                    {
                        key: 'identity-verification-expiration',
                        type: {
                            of: 'inner',
                            inner: 'Expiration',
                            cmatrix: null,
                            candidate: null
                        },
                        description: '本人性確認コード有効期限',
                        isInherit: false
                    },
                    {
                        key: 'login_sms_message',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '個人ポータルログイン時SMSメッセージ内容',
                        isInherit: false
                    },
                    {
                        key: 'management_format_errormessage',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '運営ポータル群のパスワードエラーメッセージ',
                        isInherit: false
                    },
                    {
                        key: 'management_initial_login_description',
                        type: {
                            of: 'item',
                            _code: null,
                            cmatrix: null,
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
                        description: '運営ポータル：初回ログインURL通知文書説明文',
                        isInherit: false
                    },
                    {
                        key: 'management_password_format',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '運営ポータル群のパスワードフォーマット',
                        isInherit: false
                    },
                    {
                        key: 'onboarding_start',
                        type: {
                            of: 'item',
                            _code: null,
                            cmatrix: null,
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
                        description: '個人ポータル開始時のオンボーディング記載内容',
                        isInherit: false
                    },
                    {
                        key: 'onboarding_store',
                        type: {
                            of: 'item',
                            _code: null,
                            cmatrix: null,
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
                        description: '個人ポータル蓄積設定時のオンボーディング記載内容',
                        isInherit: false
                    },
                    {
                        key: 'one-time-login-code-expiration',
                        type: {
                            of: 'inner',
                            inner: 'Expiration',
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'ワンタイムログインコード有効期限',
                        isInherit: false
                    },
                    {
                        key: 'password-expiration',
                        type: {
                            of: 'inner',
                            inner: 'Expiration',
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'パスワード有効期限',
                        isInherit: false
                    },
                    {
                        key: 'password-generations-number',
                        type: {
                            of: 'number',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'パスワード世代管理数',
                        isInherit: false
                    },
                    {
                        key: 'personal_account_delete',
                        type: {
                            of: 'boolean',
                            cmatrix: null
                        },
                        description: '個人ポータル：アカウント削除の可否設定',
                        isInherit: false
                    },
                    {
                        key: 'personal_account_delete_ng_message',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '個人ポータル：アカウント削除できない設定時の表示メッセージ内容',
                        isInherit: false
                    },
                    {
                        key: 'personal_disassociation',
                        type: {
                            of: 'boolean',
                            cmatrix: null
                        },
                        description: '個人ポータル：連携解除可否設定',
                        isInherit: false
                    },
                    {
                        key: 'personal_initial_login_description',
                        type: {
                            of: 'item',
                            _code: null,
                            cmatrix: null,
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
                        description: 'Book開設時のQRコード通知文書説明文',
                        isInherit: false
                    },
                    {
                        key: 'personal_share_basic_policy',
                        type: {
                            of: 'boolean',
                            cmatrix: null
                        },
                        description: '個人ポータル：共有の基本方針可否設定',
                        isInherit: false
                    },
                    {
                        key: 'personal_temporary_share',
                        type: {
                            of: 'boolean',
                            cmatrix: null
                        },
                        description: '個人ポータル：一時的共有の可否設定',
                        isInherit: false
                    },
                    {
                        key: 'personal_two-step_verification',
                        type: {
                            of: 'boolean',
                            cmatrix: null
                        },
                        description: '個人ポータル：2段階認証解除可否設定',
                        isInherit: false
                    },
                    {
                        key: 'portal-name',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '個人ポータル呼称',
                        isInherit: false
                    },
                    {
                        key: 'pxr_id_format_errormessage',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'PXR-IDのパスワードエラーメッセージ',
                        isInherit: false
                    },
                    {
                        key: 'pxr_id_password_format',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'PXR-IDのパスワードフォーマット',
                        isInherit: false
                    },
                    {
                        key: 'pxr_id_prefix',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'PXR-IDのprefix',
                        isInherit: false
                    },
                    {
                        key: 'pxr_id_suffix',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'PXR-IDのsuffix',
                        isInherit: false
                    },
                    {
                        key: 'region-root-name',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '領域運営サービスプロバイダーの名称',
                        isInherit: false
                    },
                    {
                        key: 'search_target_ns',
                        type: {
                            of: 'inner[]',
                            inner: 'SearchTargetNs',
                            cmatrix: null,
                            candidate: null
                        },
                        description: '検索対象ネームスペース',
                        isInherit: false
                    },
                    {
                        key: 'session-expiration',
                        type: {
                            of: 'inner',
                            inner: 'Expiration',
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'セッション有効期限',
                        isInherit: false
                    },
                    {
                        key: 'system-name',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'PXRエコシステム基盤呼称',
                        isInherit: false
                    },
                    {
                        key: 'terms_of_service',
                        type: {
                            of: 'item',
                            _code: null,
                            cmatrix: null,
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
                        description: '利用規約',
                        isInherit: false
                    },
                    {
                        key: 'wf-p-name',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'ワークフロープロバイダーの呼称',
                        isInherit: false
                    },
                    {
                        key: 'workflow-name',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'ワークフローの呼称',
                        isInherit: false
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/setting/actor-own/pxr-root',
                    name: 'setting',
                    _code: {
                        _value: 161,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'アクターによる流通制御サービスプロバイダーのアクター個別設定の定義です。'
                },
                template: {
                    _code: {
                        _value: 161,
                        _ver: 1
                    },
                    address: null,
                    'email-address': null,
                    'information-site': null,
                    'pxr-root-deployment-name': null,
                    'tel-number': null,
                    use_user_information: null
                },
                prop: [
                    {
                        key: 'address',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '流通制御サービスプロバイダーの住所',
                        isInherit: false
                    },
                    {
                        key: 'email-address',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '流通制御サービスプロバイダーの連絡先Eメールアドレス',
                        isInherit: false
                    },
                    {
                        key: 'information-site',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '流通制御サービスプロバイダーの情報サイト',
                        isInherit: false
                    },
                    {
                        key: 'pxr-root-deployment-name',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '流通制御サービスプロバイダーの連絡先部署の呼称',
                        isInherit: false
                    },
                    {
                        key: 'tel-number',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '流通制御サービスプロバイダーの連絡先電話番号',
                        isInherit: false
                    },
                    {
                        key: 'use_user_information',
                        type: {
                            of: 'boolean',
                            cmatrix: null
                        },
                        description: '利用者管理情報使用設定',
                        isInherit: false
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/setting/actor-own/app',
                    name: 'setting',
                    _code: {
                        _value: 162,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'アプリケーションプロバイダーによるアクター個別設定の定義です。'
                },
                template: {
                    _code: {
                        _value: 162,
                        _ver: 1
                    },
                    use_user_information: null
                },
                prop: [
                    {
                        key: 'use_user_information',
                        type: {
                            of: 'boolean',
                            cmatrix: null
                        },
                        description: '利用者管理情報使用設定',
                        isInherit: false
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/setting/actor-own/consumer',
                    name: 'setting',
                    _code: {
                        _value: 163,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'データコンシューマーによるアクター個別設定の定義です。'
                },
                template: {
                    _code: {
                        _value: 163,
                        _ver: 1
                    },
                    use_user_information: null
                },
                prop: [
                    {
                        key: 'use_user_information',
                        type: {
                            of: 'boolean',
                            cmatrix: null
                        },
                        description: '利用者管理情報使用設定',
                        isInherit: false
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/setting/actor-own/data-trader',
                    name: 'setting',
                    _code: {
                        _value: 164,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'データ取引サービスプロバイダーによるアクター個別設定の定義です。'
                },
                template: {
                    _code: {
                        _value: 164,
                        _ver: 1
                    },
                    use_user_information: null
                },
                prop: [
                    {
                        key: 'use_user_information',
                        type: {
                            of: 'boolean',
                            cmatrix: null
                        },
                        description: '利用者管理情報使用設定',
                        isInherit: false
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/setting/actor-own/pxr',
                    name: 'setting',
                    _code: {
                        _value: 165,
                        _ver: 1
                    },
                    inherit: null,
                    description: '流通制御によるPXRポータルの個別設定の定義です。'
                },
                template: {
                    _code: {
                        _value: 165,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/setting/actor-own/region-root',
                    name: 'setting',
                    _code: {
                        _value: 167,
                        _ver: 1
                    },
                    inherit: null,
                    description: '領域運営サービスプロバイダーによるアクター個別設定の定義です。'
                },
                template: {
                    _code: {
                        _value: 167,
                        _ver: 1
                    },
                    use_user_information: null
                },
                prop: [
                    {
                        key: 'use_user_information',
                        type: {
                            of: 'boolean',
                            cmatrix: null
                        },
                        description: '利用者管理情報使用設定',
                        isInherit: false
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/setting/actor-own/wf',
                    name: 'setting',
                    _code: {
                        _value: 168,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'ワークフロープロバイダーによるアクター個別設定の定義です。'
                },
                template: {
                    _code: {
                        _value: 168,
                        _ver: 1
                    },
                    use_user_information: null
                },
                prop: [
                    {
                        key: 'use_user_information',
                        type: {
                            of: 'boolean',
                            cmatrix: null
                        },
                        description: '利用者管理情報使用設定',
                        isInherit: false
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/notification/データ提供',
                    name: '契約申込承認要求',
                    _code: {
                        _value: 169,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'データ提供の契約申込承認要求の通知カテゴリの定義です。'
                },
                template: {
                    _code: {
                        _value: 169,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/notification/データ提供',
                    name: '契約申込キャンセル',
                    _code: {
                        _value: 170,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'データ提供の契約申込キャンセルの通知カテゴリの定義です。'
                },
                template: {
                    _code: {
                        _value: 170,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/notification/データ提供',
                    name: '契約申込承認',
                    _code: {
                        _value: 171,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'データ提供の契約申込承認の通知カテゴリの定義です。'
                },
                template: {
                    _code: {
                        _value: 171,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/notification/データ提供',
                    name: '契約申込否認',
                    _code: {
                        _value: 172,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'データ提供の契約申込否認の通知カテゴリの定義です。'
                },
                template: {
                    _code: {
                        _value: 172,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/notification/データ提供',
                    name: '契約合意依頼',
                    _code: {
                        _value: 173,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'データ提供の契約合意依頼の通知カテゴリの定義です。'
                },
                template: {
                    _code: {
                        _value: 173,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/notification/データ提供',
                    name: '対価更新完了',
                    _code: {
                        _value: 174,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'データ提供の対価更新完了の通知カテゴリの定義です。'
                },
                template: {
                    _code: {
                        _value: 174,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/notification/データ提供',
                    name: '契約合意',
                    _code: {
                        _value: 175,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'データ提供の契約合意の通知カテゴリの定義です。'
                },
                template: {
                    _code: {
                        _value: 175,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/notification/データ提供',
                    name: '契約破棄',
                    _code: {
                        _value: 176,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'データ提供の契約破棄の通知カテゴリの定義です。'
                },
                template: {
                    _code: {
                        _value: 176,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/notification/データ提供',
                    name: '契約締結',
                    _code: {
                        _value: 177,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'データ提供の契約締結の通知カテゴリの定義です。'
                },
                template: {
                    _code: {
                        _value: 177,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/notification/データ提供',
                    name: '同意公開',
                    _code: {
                        _value: 178,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'データ提供の同意公開の通知カテゴリの定義です。'
                },
                template: {
                    _code: {
                        _value: 178,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/notification/データ提供',
                    name: '履行準備要求',
                    _code: {
                        _value: 179,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'データ提供の履行準備要求の通知カテゴリの定義です。'
                },
                template: {
                    _code: {
                        _value: 179,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/notification/データ提供',
                    name: '収集完了',
                    _code: {
                        _value: 180,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'データ提供の収集完了の通知カテゴリの定義です。'
                },
                template: {
                    _code: {
                        _value: 180,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/model/notification/本人性確認コード',
                    name: '利用者ID連携解除用コード発行',
                    _code: {
                        _value: 181,
                        _ver: 1
                    },
                    inherit: null,
                    description: '本人性確認コード発行の通知カテゴリの定義です。'
                },
                template: {
                    _code: {
                        _value: 181,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/format',
                    name: '.nnne2',
                    _code: {
                        _value: 10001,
                        _ver: 1
                    },
                    inherit: null,
                    description: '有効数字の値フォーマット（整数部2桁、小数部1桁）の定義です。'
                },
                template: {
                    _code: {
                        _value: 10001,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/format',
                    name: '.nnne3',
                    _code: {
                        _value: 10002,
                        _ver: 1
                    },
                    inherit: null,
                    description: '有効数字の値フォーマット（整数部3桁）の定義です。'
                },
                template: {
                    _code: {
                        _value: 10002,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/format',
                    name: 'nnnne3',
                    _code: {
                        _value: 10003,
                        _ver: 1
                    },
                    inherit: null,
                    description: '有効数字の値フォーマット（整数部3桁、小数部1桁）の定義です。'
                },
                template: {
                    _code: {
                        _value: 10003,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/format',
                    name: '.ne0',
                    _code: {
                        _value: 10004,
                        _ver: 1
                    },
                    inherit: null,
                    description: '有効数字の値フォーマット（小数部1桁）の定義です。'
                },
                template: {
                    _code: {
                        _value: 10004,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/format',
                    name: '.ne1',
                    _code: {
                        _value: 10005,
                        _ver: 1
                    },
                    inherit: null,
                    description: '有効数字の値フォーマット（整数部1桁）の定義です。'
                },
                template: {
                    _code: {
                        _value: 10005,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/format',
                    name: '.nne0',
                    _code: {
                        _value: 10006,
                        _ver: 1
                    },
                    inherit: null,
                    description: '有効数字の値フォーマット（小数部2桁）の定義です。'
                },
                template: {
                    _code: {
                        _value: 10006,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/format',
                    name: '.nne1',
                    _code: {
                        _value: 10007,
                        _ver: 1
                    },
                    inherit: null,
                    description: '有効数字の値フォーマット（整数部1桁、小数部1桁）の定義です。'
                },
                template: {
                    _code: {
                        _value: 10007,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/format',
                    name: '.nne2',
                    _code: {
                        _value: 10008,
                        _ver: 1
                    },
                    inherit: null,
                    description: '有効数字の値フォーマット（整数部2桁）の定義です。'
                },
                template: {
                    _code: {
                        _value: 10008,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/format',
                    name: '.nnne0',
                    _code: {
                        _value: 10009,
                        _ver: 1
                    },
                    inherit: null,
                    description: '有効数字の値フォーマット（小数部3桁）の定義です。'
                },
                template: {
                    _code: {
                        _value: 10009,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/format',
                    name: '.nnne1',
                    _code: {
                        _value: 10010,
                        _ver: 1
                    },
                    inherit: null,
                    description: '有効数字の値フォーマット（整数部1桁、小数部2桁）の定義です。'
                },
                template: {
                    _code: {
                        _value: 10010,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/format',
                    name: '.nnnne0',
                    _code: {
                        _value: 10011,
                        _ver: 1
                    },
                    inherit: null,
                    description: '有効数字の値フォーマット（小数部4桁）の定義です。'
                },
                template: {
                    _code: {
                        _value: 10011,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/format',
                    name: '.nnnne1',
                    _code: {
                        _value: 10012,
                        _ver: 1
                    },
                    inherit: null,
                    description: '有効数字の値フォーマット（整数部1桁、小数部3桁）の定義です。'
                },
                template: {
                    _code: {
                        _value: 10012,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/format',
                    name: '.nnnne2',
                    _code: {
                        _value: 10013,
                        _ver: 1
                    },
                    inherit: null,
                    description: '有効数字の値フォーマット（整数部2桁、小数部2桁）の定義です。'
                },
                template: {
                    _code: {
                        _value: 10013,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/format',
                    name: '.nnnne4',
                    _code: {
                        _value: 10014,
                        _ver: 1
                    },
                    inherit: null,
                    description: '有効数字の値フォーマット（整数部4桁）の定義です。'
                },
                template: {
                    _code: {
                        _value: 10014,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/format',
                    name: '.nnnnne0',
                    _code: {
                        _value: 10015,
                        _ver: 1
                    },
                    inherit: null,
                    description: '有効数字の値フォーマット（小数部5桁）の定義です。'
                },
                template: {
                    _code: {
                        _value: 10015,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/format',
                    name: '.nnnnne1',
                    _code: {
                        _value: 10016,
                        _ver: 1
                    },
                    inherit: null,
                    description: '有効数字の値フォーマット（整数部1桁、小数部4桁）の定義です。'
                },
                template: {
                    _code: {
                        _value: 10016,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/format',
                    name: '.nnnnne2',
                    _code: {
                        _value: 10017,
                        _ver: 1
                    },
                    inherit: null,
                    description: '有効数字の値フォーマット（整数部2桁、小数部3桁）の定義です。'
                },
                template: {
                    _code: {
                        _value: 10017,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/format',
                    name: '.nnnnne3',
                    _code: {
                        _value: 10018,
                        _ver: 1
                    },
                    inherit: null,
                    description: '有効数字の値フォーマット（整数部3桁、小数部2桁）の定義です。'
                },
                template: {
                    _code: {
                        _value: 10018,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/format',
                    name: '.nnnnne4',
                    _code: {
                        _value: 10019,
                        _ver: 1
                    },
                    inherit: null,
                    description: '有効数字の値フォーマット（整数部4桁、小数部1桁）の定義です。'
                },
                template: {
                    _code: {
                        _value: 10019,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/format',
                    name: '.nnnnne5',
                    _code: {
                        _value: 10020,
                        _ver: 1
                    },
                    inherit: null,
                    description: '有効数字の値フォーマット（整数部5桁）の定義です。'
                },
                template: {
                    _code: {
                        _value: 10020,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/format',
                    name: '.nnnnnne0',
                    _code: {
                        _value: 10021,
                        _ver: 1
                    },
                    inherit: null,
                    description: '有効数字の値フォーマット（小数部6桁）の定義です。'
                },
                template: {
                    _code: {
                        _value: 10021,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/format',
                    name: '.nnnnnne1',
                    _code: {
                        _value: 10022,
                        _ver: 1
                    },
                    inherit: null,
                    description: '有効数字の値フォーマット（整数部1桁、小数部5桁）の定義です。'
                },
                template: {
                    _code: {
                        _value: 10022,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/format',
                    name: '.nnnnnne2',
                    _code: {
                        _value: 10023,
                        _ver: 1
                    },
                    inherit: null,
                    description: '有効数字の値フォーマット（整数部2桁、小数部4桁）の定義です。'
                },
                template: {
                    _code: {
                        _value: 10023,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/format',
                    name: '.nnnnnne3',
                    _code: {
                        _value: 10024,
                        _ver: 1
                    },
                    inherit: null,
                    description: '有効数字の値フォーマット（整数部3桁、小数部3桁）の定義です。'
                },
                template: {
                    _code: {
                        _value: 10024,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/format',
                    name: '.nnnnnne4',
                    _code: {
                        _value: 10025,
                        _ver: 1
                    },
                    inherit: null,
                    description: '有効数字の値フォーマット（整数部4桁、小数部2桁）の定義です。'
                },
                template: {
                    _code: {
                        _value: 10025,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/format',
                    name: '.nnnnnne5',
                    _code: {
                        _value: 10026,
                        _ver: 1
                    },
                    inherit: null,
                    description: '有効数字の値フォーマット（整数部5桁、小数部1桁）の定義です。'
                },
                template: {
                    _code: {
                        _value: 10026,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/format',
                    name: '.nnnnnne6',
                    _code: {
                        _value: 10027,
                        _ver: 1
                    },
                    inherit: null,
                    description: '有効数字の値フォーマット（整数部6桁）の定義です。'
                },
                template: {
                    _code: {
                        _value: 10027,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/format',
                    name: '.nnnnnnne0',
                    _code: {
                        _value: 10028,
                        _ver: 1
                    },
                    inherit: null,
                    description: '有効数字の値フォーマット（小数部7桁）の定義です。'
                },
                template: {
                    _code: {
                        _value: 10028,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/format',
                    name: '.nnnnnnne1',
                    _code: {
                        _value: 10029,
                        _ver: 1
                    },
                    inherit: null,
                    description: '有効数字の値フォーマット（整数部1桁、小数部6桁）の定義です。'
                },
                template: {
                    _code: {
                        _value: 10029,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/format',
                    name: '.nnnnnnne2',
                    _code: {
                        _value: 10030,
                        _ver: 1
                    },
                    inherit: null,
                    description: '有効数字の値フォーマット（整数部2桁、小数部5桁）の定義です。'
                },
                template: {
                    _code: {
                        _value: 10030,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/format',
                    name: '.nnnnnnne3',
                    _code: {
                        _value: 10031,
                        _ver: 1
                    },
                    inherit: null,
                    description: '有効数字の値フォーマット（整数部3桁、小数部4桁）の定義です。'
                },
                template: {
                    _code: {
                        _value: 10031,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/format',
                    name: '.nnnnnnne4',
                    _code: {
                        _value: 10032,
                        _ver: 1
                    },
                    inherit: null,
                    description: '有効数字の値フォーマット（整数部4桁、小数部3桁）の定義です。'
                },
                template: {
                    _code: {
                        _value: 10032,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/format',
                    name: '.nnnnnnne5',
                    _code: {
                        _value: 10033,
                        _ver: 1
                    },
                    inherit: null,
                    description: '有効数字の値フォーマット（整数部5桁、小数部2桁）の定義です。'
                },
                template: {
                    _code: {
                        _value: 10033,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/format',
                    name: '.nnnnnnne6',
                    _code: {
                        _value: 10034,
                        _ver: 1
                    },
                    inherit: null,
                    description: '有効数字の値フォーマット（整数部6桁、小数部1桁）の定義です。'
                },
                template: {
                    _code: {
                        _value: 10034,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/format',
                    name: '.nnnnnnne7',
                    _code: {
                        _value: 10035,
                        _ver: 1
                    },
                    inherit: null,
                    description: '有効数字の値フォーマット（整数部7桁）の定義です。'
                },
                template: {
                    _code: {
                        _value: 10035,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/format',
                    name: '.nnnnnnnne0',
                    _code: {
                        _value: 10036,
                        _ver: 1
                    },
                    inherit: null,
                    description: '有効数字の値フォーマット（小数部8桁）の定義です。'
                },
                template: {
                    _code: {
                        _value: 10036,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/format',
                    name: '.nnnnnnnne1',
                    _code: {
                        _value: 10037,
                        _ver: 1
                    },
                    inherit: null,
                    description: '有効数字の値フォーマット（整数部1桁、小数部7桁）の定義です。'
                },
                template: {
                    _code: {
                        _value: 10037,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/format',
                    name: '.nnnnnnnne2',
                    _code: {
                        _value: 10038,
                        _ver: 1
                    },
                    inherit: null,
                    description: '有効数字の値フォーマット（整数部2桁、小数部6桁）の定義です。'
                },
                template: {
                    _code: {
                        _value: 10038,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/format',
                    name: '.nnnnnnnne3',
                    _code: {
                        _value: 10039,
                        _ver: 1
                    },
                    inherit: null,
                    description: '有効数字の値フォーマット（整数部3桁、小数部5桁）の定義です。'
                },
                template: {
                    _code: {
                        _value: 10039,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/format',
                    name: '.nnnnnnnne4',
                    _code: {
                        _value: 10040,
                        _ver: 1
                    },
                    inherit: null,
                    description: '有効数字の値フォーマット（整数部4桁、小数部4桁）の定義です。'
                },
                template: {
                    _code: {
                        _value: 10040,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/format',
                    name: '.nnnnnnnne5',
                    _code: {
                        _value: 10041,
                        _ver: 1
                    },
                    inherit: null,
                    description: '有効数字の値フォーマット（整数部5桁、小数部3桁）の定義です。'
                },
                template: {
                    _code: {
                        _value: 10041,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/format',
                    name: '.nnnnnnnne6',
                    _code: {
                        _value: 10042,
                        _ver: 1
                    },
                    inherit: null,
                    description: '有効数字の値フォーマット（整数部6桁、小数部2桁）の定義です。'
                },
                template: {
                    _code: {
                        _value: 10042,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/format',
                    name: '.nnnnnnnne7',
                    _code: {
                        _value: 10043,
                        _ver: 1
                    },
                    inherit: null,
                    description: '有効数字の値フォーマット（整数部7桁、小数部1桁）の定義です。'
                },
                template: {
                    _code: {
                        _value: 10043,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/format',
                    name: '.nnnnnnnne8',
                    _code: {
                        _value: 10044,
                        _ver: 1
                    },
                    inherit: null,
                    description: '有効数字の値フォーマット（整数部8桁）の定義です。'
                },
                template: {
                    _code: {
                        _value: 10044,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/format',
                    name: '.nnnnnnnnne0',
                    _code: {
                        _value: 10045,
                        _ver: 1
                    },
                    inherit: null,
                    description: '有効数字の値フォーマット（小数部9桁）の定義です。'
                },
                template: {
                    _code: {
                        _value: 10045,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/format',
                    name: '.nnnnnnnnne1',
                    _code: {
                        _value: 10046,
                        _ver: 1
                    },
                    inherit: null,
                    description: '有効数字の値フォーマット（整数部1桁、小数部8桁）の定義です。'
                },
                template: {
                    _code: {
                        _value: 10046,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/format',
                    name: '.nnnnnnnnne2',
                    _code: {
                        _value: 10047,
                        _ver: 1
                    },
                    inherit: null,
                    description: '有効数字の値フォーマット（整数部2桁、小数部7桁）の定義です。'
                },
                template: {
                    _code: {
                        _value: 10047,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/format',
                    name: '.nnnnnnnnne3',
                    _code: {
                        _value: 10048,
                        _ver: 1
                    },
                    inherit: null,
                    description: '有効数字の値フォーマット（整数部3桁、小数部6桁）の定義です。'
                },
                template: {
                    _code: {
                        _value: 10048,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/format',
                    name: '.nnnnnnnnne4',
                    _code: {
                        _value: 10049,
                        _ver: 1
                    },
                    inherit: null,
                    description: '有効数字の値フォーマット（整数部4桁、小数部5桁）の定義です。'
                },
                template: {
                    _code: {
                        _value: 10049,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/format',
                    name: '.nnnnnnnnne5',
                    _code: {
                        _value: 10050,
                        _ver: 1
                    },
                    inherit: null,
                    description: '有効数字の値フォーマット（整数部5桁、小数部4桁）の定義です。'
                },
                template: {
                    _code: {
                        _value: 10050,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/format',
                    name: '.nnnnnnnnne6',
                    _code: {
                        _value: 10051,
                        _ver: 1
                    },
                    inherit: null,
                    description: '有効数字の値フォーマット（整数部6桁、小数部3桁）の定義です。'
                },
                template: {
                    _code: {
                        _value: 10051,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/format',
                    name: '.nnnnnnnnne7',
                    _code: {
                        _value: 10052,
                        _ver: 1
                    },
                    inherit: null,
                    description: '有効数字の値フォーマット（整数部7桁、小数部2桁）の定義です。'
                },
                template: {
                    _code: {
                        _value: 10052,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/format',
                    name: '.nnnnnnnnne8',
                    _code: {
                        _value: 10053,
                        _ver: 1
                    },
                    inherit: null,
                    description: '有効数字の値フォーマット（整数部8桁、小数部1桁）の定義です。'
                },
                template: {
                    _code: {
                        _value: 10053,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/format',
                    name: '.nnnnnnnnne9',
                    _code: {
                        _value: 10054,
                        _ver: 1
                    },
                    inherit: null,
                    description: '有効数字の値フォーマット（整数部9桁）の定義です。'
                },
                template: {
                    _code: {
                        _value: 10054,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/format',
                    name: '.nnnnnnnnnnnne1',
                    _code: {
                        _value: 10055,
                        _ver: 1
                    },
                    inherit: null,
                    description: '有効数字の値フォーマット（整数部1桁）の定義です。'
                },
                template: {
                    _code: {
                        _value: 10055,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/format',
                    name: '.nnnnnnnnnnnnnnne1',
                    _code: {
                        _value: 10056,
                        _ver: 1
                    },
                    inherit: null,
                    description: '有効数字の値フォーマット（整数部1桁）の定義です。'
                },
                template: {
                    _code: {
                        _value: 10056,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/format',
                    name: '.nnnnnnnnnnnnnnne2',
                    _code: {
                        _value: 10057,
                        _ver: 1
                    },
                    inherit: null,
                    description: '有効数字の値フォーマット（整数部2桁）の定義です。'
                },
                template: {
                    _code: {
                        _value: 10057,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/format',
                    name: '.nnnnnnnnnnnnnnnne1',
                    _code: {
                        _value: 10058,
                        _ver: 1
                    },
                    inherit: null,
                    description: '有効数字の値フォーマット（整数部1桁）の定義です。'
                },
                template: {
                    _code: {
                        _value: 10058,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/format',
                    name: '.nnnnnnnnnnnne3',
                    _code: {
                        _value: 10059,
                        _ver: 1
                    },
                    inherit: null,
                    description: '有効数字の値フォーマット（整数部3桁）の定義です。'
                },
                template: {
                    _code: {
                        _value: 10059,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/format',
                    name: '.nnnnnnnnnnnnnnnnnne1',
                    _code: {
                        _value: 10060,
                        _ver: 1
                    },
                    inherit: null,
                    description: '有効数字の値フォーマット（整数部1桁）の定義です。'
                },
                template: {
                    _code: {
                        _value: 10060,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/unit/temperature',
                    name: '℃',
                    _code: {
                        _value: 20001,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'セルシウス度の単位の定義です。'
                },
                template: {
                    _code: {
                        _value: 20001,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/unit/number_per_unit',
                    name: '回/分',
                    _code: {
                        _value: 20002,
                        _ver: 1
                    },
                    inherit: null,
                    description: '1分あたりの回数の単位の定義です。'
                },
                template: {
                    _code: {
                        _value: 20002,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/unit/counters',
                    name: '歳',
                    _code: {
                        _value: 20003,
                        _ver: 1
                    },
                    inherit: null,
                    description: '年齢の単位の定義です。'
                },
                template: {
                    _code: {
                        _value: 20003,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/unit/length',
                    name: 'cm',
                    _code: {
                        _value: 20004,
                        _ver: 1
                    },
                    inherit: null,
                    description: '長さcmの定義です。'
                },
                template: {
                    _code: {
                        _value: 20004,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/unit/mass',
                    name: 'kg',
                    _code: {
                        _value: 20005,
                        _ver: 1
                    },
                    inherit: null,
                    description: '重さkgの定義です。'
                },
                template: {
                    _code: {
                        _value: 20005,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/unit/power',
                    name: 'W',
                    _code: {
                        _value: 20006,
                        _ver: 1
                    },
                    inherit: null,
                    description: '仕事率・工率・電力・放射束Wの定義です。'
                },
                template: {
                    _code: {
                        _value: 20006,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/unit/mass',
                    name: 'g',
                    _code: {
                        _value: 20007,
                        _ver: 1
                    },
                    inherit: null,
                    description: '重さgの定義です。'
                },
                template: {
                    _code: {
                        _value: 20007,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/unit/length',
                    name: 'mm',
                    _code: {
                        _value: 20008,
                        _ver: 1
                    },
                    inherit: null,
                    description: '長さcmの定義です。'
                },
                template: {
                    _code: {
                        _value: 20008,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/unit/parts_per_notation',
                    name: '%',
                    _code: {
                        _value: 20009,
                        _ver: 1
                    },
                    inherit: null,
                    description: '百分率%の定義です。'
                },
                template: {
                    _code: {
                        _value: 20009,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/unit/pressure',
                    name: 'mmHg',
                    _code: {
                        _value: 20010,
                        _ver: 1
                    },
                    inherit: null,
                    description: '水銀柱ミリメートルmmHgの定義です。'
                },
                template: {
                    _code: {
                        _value: 20010,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/unit/counters',
                    name: '回',
                    _code: {
                        _value: 20011,
                        _ver: 1
                    },
                    inherit: null,
                    description: '回数の単位の定義です。'
                },
                template: {
                    _code: {
                        _value: 20011,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/unit/number_per_unit',
                    name: 'g/dl',
                    _code: {
                        _value: 20012,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'g/dLの単位の定義です。'
                },
                template: {
                    _code: {
                        _value: 20012,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/unit/number_per_unit',
                    name: 'mg/dl',
                    _code: {
                        _value: 20013,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'mg/dLの単位の定義です。'
                },
                template: {
                    _code: {
                        _value: 20013,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/unit/number_per_unit',
                    name: 'U/L',
                    _code: {
                        _value: 20014,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'U/Lの単位の定義です。'
                },
                template: {
                    _code: {
                        _value: 20014,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/unit/number_per_unit',
                    name: 'mEq/L',
                    _code: {
                        _value: 20015,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'mEq/Lの単位の定義です。'
                },
                template: {
                    _code: {
                        _value: 20015,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/unit/number_per_unit',
                    name: 'pg/mL',
                    _code: {
                        _value: 20016,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'pg/mLの単位の定義です。'
                },
                template: {
                    _code: {
                        _value: 20016,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/unit/time',
                    name: '年',
                    _code: {
                        _value: 20017,
                        _ver: 1
                    },
                    inherit: null,
                    description: '年数の単位の定義です。'
                },
                template: {
                    _code: {
                        _value: 20017,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/unit/counters',
                    name: '人',
                    _code: {
                        _value: 20018,
                        _ver: 1
                    },
                    inherit: null,
                    description: '人数の単位の定義です。'
                },
                template: {
                    _code: {
                        _value: 20018,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/unit/illuminance',
                    name: 'lx',
                    _code: {
                        _value: 20019,
                        _ver: 1
                    },
                    inherit: null,
                    description: '照度lxの定義です。'
                },
                template: {
                    _code: {
                        _value: 20019,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/unit/pressure',
                    name: 'hPa',
                    _code: {
                        _value: 20020,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'ヘクトパスカルhPaの定義です。'
                },
                template: {
                    _code: {
                        _value: 20020,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/unit/pressure',
                    name: 'dB(SPL)',
                    _code: {
                        _value: 20021,
                        _ver: 1
                    },
                    inherit: null,
                    description: '音圧dB(SPL)の定義です。'
                },
                template: {
                    _code: {
                        _value: 20021,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/unit/number_per_unit',
                    name: '回転/分',
                    _code: {
                        _value: 20022,
                        _ver: 1
                    },
                    inherit: null,
                    description: '1分あたりの回転数(rpm)の単位の定義です。'
                },
                template: {
                    _code: {
                        _value: 20022,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/unit/parts_per_notation',
                    name: 'ppb',
                    _code: {
                        _value: 20023,
                        _ver: 1
                    },
                    inherit: null,
                    description: '十億分率ppbの定義です。'
                },
                template: {
                    _code: {
                        _value: 20023,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/unit/parts_per_notation',
                    name: 'ppm',
                    _code: {
                        _value: 20024,
                        _ver: 1
                    },
                    inherit: null,
                    description: '百万分率ppmの定義です。'
                },
                template: {
                    _code: {
                        _value: 20024,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/unit/velocity',
                    name: 'kine',
                    _code: {
                        _value: 20025,
                        _ver: 1
                    },
                    inherit: null,
                    description: '地震の速度の単位kineの定義です。(cm/s)'
                },
                template: {
                    _code: {
                        _value: 20025,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/unit/acceleration',
                    name: 'gal',
                    _code: {
                        _value: 20026,
                        _ver: 1
                    },
                    inherit: null,
                    description: '地震の加速度galの定義です。(cm/s2)'
                },
                template: {
                    _code: {
                        _value: 20026,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/unit/acceleration',
                    name: 'm/s2',
                    _code: {
                        _value: 20027,
                        _ver: 1
                    },
                    inherit: null,
                    description: '加速度m/s2の定義です。'
                },
                template: {
                    _code: {
                        _value: 20027,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/unit/velocity',
                    name: 'deg/s',
                    _code: {
                        _value: 20028,
                        _ver: 1
                    },
                    inherit: null,
                    description: '角速度の単位deg/sの定義です。'
                },
                template: {
                    _code: {
                        _value: 20028,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/unit/acceleration',
                    name: 'G',
                    _code: {
                        _value: 20029,
                        _ver: 1
                    },
                    inherit: null,
                    description: '重力加速度Gの定義です。(1G≒9.8m/s2)'
                },
                template: {
                    _code: {
                        _value: 20029,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/unit/other',
                    name: 'BMI',
                    _code: {
                        _value: 20030,
                        _ver: 1
                    },
                    inherit: null,
                    description: '肥満指数BMIの単位の定義です。(kg/m2)'
                },
                template: {
                    _code: {
                        _value: 20030,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/unit/area',
                    name: 'm2',
                    _code: {
                        _value: 20031,
                        _ver: 1
                    },
                    inherit: null,
                    description: '面積の単位m2の定義です。'
                },
                template: {
                    _code: {
                        _value: 20031,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/unit/velocity',
                    name: 'm/s',
                    _code: {
                        _value: 20032,
                        _ver: 1
                    },
                    inherit: null,
                    description: '速度の単位m/sの定義です。'
                },
                template: {
                    _code: {
                        _value: 20032,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/unit/time',
                    name: '秒',
                    _code: {
                        _value: 20033,
                        _ver: 1
                    },
                    inherit: null,
                    description: '秒の時刻の単位sの定義です。'
                },
                template: {
                    _code: {
                        _value: 20033,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/unit/force',
                    name: 'N',
                    _code: {
                        _value: 20034,
                        _ver: 1
                    },
                    inherit: null,
                    description: '力の単位Nの定義です。(kg*m/s2)'
                },
                template: {
                    _code: {
                        _value: 20034,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/unit/length',
                    name: 'm',
                    _code: {
                        _value: 20035,
                        _ver: 1
                    },
                    inherit: null,
                    description: '長さmの定義です。'
                },
                template: {
                    _code: {
                        _value: 20035,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/unit/other',
                    name: 'N*s',
                    _code: {
                        _value: 20036,
                        _ver: 1
                    },
                    inherit: null,
                    description: '力積の単位の定義です。(N*s)'
                },
                template: {
                    _code: {
                        _value: 20036,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/unit/time',
                    name: '分',
                    _code: {
                        _value: 20037,
                        _ver: 1
                    },
                    inherit: null,
                    description: '分の時刻の単位sの定義です。'
                },
                template: {
                    _code: {
                        _value: 20037,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/unit/magnetic_flux_density',
                    name: 'uT',
                    _code: {
                        _value: 20038,
                        _ver: 1
                    },
                    inherit: null,
                    description: '磁束密度uTの定義です。'
                },
                template: {
                    _code: {
                        _value: 20038,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/unit/time',
                    name: 'ミリ秒',
                    _code: {
                        _value: 20040,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'ミリ秒の時刻の単位msの定義です。'
                },
                template: {
                    _code: {
                        _value: 20040,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/unit/counters',
                    name: 'ピクセル',
                    _code: {
                        _value: 20041,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'ピクセルの単位の定義です。'
                },
                template: {
                    _code: {
                        _value: 20041,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/unit/area',
                    name: 'mm2',
                    _code: {
                        _value: 20043,
                        _ver: 1
                    },
                    inherit: null,
                    description: '面積の単位mm2の定義です。'
                },
                template: {
                    _code: {
                        _value: 20043,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/unit/mass',
                    name: 'mg',
                    _code: {
                        _value: 20044,
                        _ver: 1
                    },
                    inherit: null,
                    description: '重さmgの定義です。'
                },
                template: {
                    _code: {
                        _value: 20044,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/unit/other',
                    name: 'μS',
                    _code: {
                        _value: 20045,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'コンダクタンスの単位の定義です。(μS)'
                },
                template: {
                    _code: {
                        _value: 20045,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/unit/counters',
                    name: '地点',
                    _code: {
                        _value: 20046,
                        _ver: 1
                    },
                    inherit: null,
                    description: '地点の単位の定義です。'
                },
                template: {
                    _code: {
                        _value: 20046,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/unit/power',
                    name: 'nW',
                    _code: {
                        _value: 20047,
                        _ver: 1
                    },
                    inherit: null,
                    description: '仕事率・工率・電力・放射束nWの定義です。'
                },
                template: {
                    _code: {
                        _value: 20047,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/unit/angle',
                    name: '°',
                    _code: {
                        _value: 20048,
                        _ver: 1
                    },
                    inherit: null,
                    description: '平面角°（度）の定義です。(1°=(π/180)rad)'
                },
                template: {
                    _code: {
                        _value: 20048,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/unit/number_per_unit',
                    name: 'fps',
                    _code: {
                        _value: 20049,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'fps（フレーム毎秒 = frames per second）の単位の定義です。'
                },
                template: {
                    _code: {
                        _value: 20049,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/unit/number_per_unit',
                    name: 'Hz',
                    _code: {
                        _value: 20050,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'Hz（ヘルツ）の単位の定義です。'
                },
                template: {
                    _code: {
                        _value: 20050,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/unit/other',
                    name: 'bit',
                    _code: {
                        _value: 20051,
                        _ver: 1
                    },
                    inherit: null,
                    description: '情報量の単位（ビット）の定義です。(bit)'
                },
                template: {
                    _code: {
                        _value: 20051,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/unit/other',
                    name: 'RH',
                    _code: {
                        _value: 20052,
                        _ver: 1
                    },
                    inherit: null,
                    description: '相対湿度の単位（RH）の定義です。'
                },
                template: {
                    _code: {
                        _value: 20052,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/person/identification',
                    name: '運転免許証',
                    _code: {
                        _value: 30001,
                        _ver: 1
                    },
                    inherit: {
                        _value: 107,
                        _ver: 1
                    },
                    description: '本人性確認で利用する運転免許証の定義です。'
                },
                template: {
                    _code: {
                        _value: 30001,
                        _ver: 1
                    },
                    'item-group': [
                        {
                            title: '氏名',
                            item: [
                                {
                                    title: '姓名',
                                    type: {
                                        _value: 30037,
                                        _ver: 1
                                    },
                                    content: null
                                }
                            ]
                        },
                        {
                            title: '生年月日（和暦）',
                            item: [
                                {
                                    title: '生年月日（和暦）',
                                    type: {
                                        _value: 30038,
                                        _ver: 1
                                    },
                                    content: null
                                }
                            ]
                        },
                        {
                            title: '住所',
                            item: [
                                {
                                    title: '住所',
                                    type: {
                                        _value: 30035,
                                        _ver: 1
                                    },
                                    content: null
                                }
                            ]
                        }
                    ],
                    'verification-ratio': null
                },
                prop: [
                    {
                        key: 'item-group',
                        type: {
                            of: 'inner[]',
                            inner: 'ItemGroup',
                            cmatrix: null,
                            candidate: null
                        },
                        description: '個人属性グループの配列',
                        isInherit: true
                    },
                    {
                        key: 'verification-ratio',
                        type: {
                            of: 'number',
                            cmatrix: null,
                            format: null,
                            unit: {
                                _value: 20009,
                                _ver: 1
                            },
                            candidate: null
                        },
                        description: '本人性の検証率',
                        isInherit: true
                    }
                ],
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
                                        value: NULL
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
                                        value: NULL
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
                                        value: NULL
                                    }
                                ]
                            }
                        ]
                    }
                ],
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/licence',
                    name: '医師免許',
                    _code: {
                        _value: 30002,
                        _ver: 1
                    },
                    inherit: null,
                    description: '医師免許の定義です。'
                },
                template: {
                    _code: {
                        _value: 30002,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/env/thing/sensor',
                    name: 'モノに関する環境情報（センサー）',
                    _code: {
                        _value: 30003,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'モノに関する環境情報（センサー）の定義です。'
                },
                template: {
                    _code: {
                        _value: 30003,
                        _ver: 1
                    },
                    code: {
                        index: '_2',
                        value: NULL
                    },
                    id: {
                        index: '_1',
                        value: NULL
                    }
                },
                prop: [
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
                        description: 'センサー種別',
                        isInherit: false
                    },
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
                        description: 'センサー識別子',
                        isInherit: false
                    }
                ],
                value: NULL,
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
                    ],
                    tags: []
                }
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/attribute/sensor',
                    name: 'sensor',
                    _code: {
                        _value: 30004,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'センサー製品情報の定義です。attributeに設定されます。key名は[sensor]です。'
                },
                template: {
                    _code: {
                        _value: 30004,
                        _ver: 1
                    },
                    company: null,
                    'manufacturing-name': null,
                    'model-number': null
                },
                prop: [
                    {
                        key: 'company',
                        type: {
                            of: 'code',
                            cmatrix: null,
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
                        description: '製造メーカー',
                        isInherit: false
                    },
                    {
                        key: 'manufacturing-name',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '製品名',
                        isInherit: false
                    },
                    {
                        key: 'model-number',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'センサー型番',
                        isInherit: false
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/person/identification',
                    name: 'パスポート（旅券）',
                    _code: {
                        _value: 30005,
                        _ver: 1
                    },
                    inherit: {
                        _value: 107,
                        _ver: 1
                    },
                    description: '本人性確認で利用するパスポート（旅券）の定義です。'
                },
                template: {
                    _code: {
                        _value: 30005,
                        _ver: 1
                    },
                    'item-group': [
                        {
                            title: '氏名',
                            item: [
                                {
                                    title: '姓',
                                    type: {
                                        _value: 30019,
                                        _ver: 1
                                    },
                                    content: null
                                },
                                {
                                    title: '名',
                                    type: {
                                        _value: 30020,
                                        _ver: 1
                                    },
                                    content: null
                                }
                            ]
                        },
                        {
                            title: '性別',
                            item: [
                                {
                                    title: '性別',
                                    type: {
                                        _value: 30021,
                                        _ver: 1
                                    },
                                    content: null
                                }
                            ]
                        },
                        {
                            title: '生年月日（西暦）',
                            item: [
                                {
                                    title: '生年月日（西暦）',
                                    type: {
                                        _value: 30022,
                                        _ver: 1
                                    },
                                    content: null
                                }
                            ]
                        }
                    ],
                    'verification-ratio': null
                },
                prop: [
                    {
                        key: 'item-group',
                        type: {
                            of: 'inner[]',
                            inner: 'ItemGroup',
                            cmatrix: null,
                            candidate: null
                        },
                        description: '個人属性グループの配列',
                        isInherit: true
                    },
                    {
                        key: 'verification-ratio',
                        type: {
                            of: 'number',
                            cmatrix: null,
                            format: null,
                            unit: {
                                _value: 20009,
                                _ver: 1
                            },
                            candidate: null
                        },
                        description: '本人性の検証率',
                        isInherit: true
                    }
                ],
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
                                        value: NULL
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
                                        value: NULL
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
                                        value: NULL
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
                                        value: NULL
                                    }
                                ]
                            }
                        ]
                    }
                ],
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/person/identification',
                    name: '運転経歴証（写真付きのもの）',
                    _code: {
                        _value: 30006,
                        _ver: 1
                    },
                    inherit: {
                        _value: 107,
                        _ver: 1
                    },
                    description: '本人性確認で利用する運転経歴証（写真付きのもの）の定義です。'
                },
                template: {
                    _code: {
                        _value: 30006,
                        _ver: 1
                    },
                    'item-group': [
                        {
                            title: '氏名',
                            item: [
                                {
                                    title: '姓名',
                                    type: {
                                        _value: 30037,
                                        _ver: 1
                                    },
                                    content: null
                                }
                            ]
                        },
                        {
                            title: '生年月日（和暦）',
                            item: [
                                {
                                    title: '生年月日（和暦）',
                                    type: {
                                        _value: 30038,
                                        _ver: 1
                                    },
                                    content: null
                                }
                            ]
                        },
                        {
                            title: '住所',
                            item: [
                                {
                                    title: '住所',
                                    type: {
                                        _value: 30035,
                                        _ver: 1
                                    },
                                    content: null
                                }
                            ]
                        }
                    ],
                    'verification-ratio': null
                },
                prop: [
                    {
                        key: 'item-group',
                        type: {
                            of: 'inner[]',
                            inner: 'ItemGroup',
                            cmatrix: null,
                            candidate: null
                        },
                        description: '個人属性グループの配列',
                        isInherit: true
                    },
                    {
                        key: 'verification-ratio',
                        type: {
                            of: 'number',
                            cmatrix: null,
                            format: null,
                            unit: {
                                _value: 20009,
                                _ver: 1
                            },
                            candidate: null
                        },
                        description: '本人性の検証率',
                        isInherit: true
                    }
                ],
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
                                        value: NULL
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
                                        value: NULL
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
                                        value: NULL
                                    }
                                ]
                            }
                        ]
                    }
                ],
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/person/identification',
                    name: '個人番号カード（マイナンバーカード）',
                    _code: {
                        _value: 30007,
                        _ver: 1
                    },
                    inherit: {
                        _value: 107,
                        _ver: 1
                    },
                    description: '本人性確認で利用する個人番号カード（マイナンバーカード）の定義です。'
                },
                template: {
                    _code: {
                        _value: 30007,
                        _ver: 1
                    },
                    'item-group': [
                        {
                            title: '氏名',
                            item: [
                                {
                                    title: '姓名',
                                    type: {
                                        _value: 30037,
                                        _ver: 1
                                    },
                                    content: null
                                }
                            ]
                        },
                        {
                            title: '性別',
                            item: [
                                {
                                    title: '性別',
                                    type: {
                                        _value: 30021,
                                        _ver: 1
                                    },
                                    content: null
                                }
                            ]
                        },
                        {
                            title: '生年月日（和暦）',
                            item: [
                                {
                                    title: '生年月日（和暦）',
                                    type: {
                                        _value: 30038,
                                        _ver: 1
                                    },
                                    content: null
                                }
                            ]
                        },
                        {
                            title: '住所',
                            item: [
                                {
                                    title: '住所',
                                    type: {
                                        _value: 30035,
                                        _ver: 1
                                    },
                                    content: null
                                }
                            ]
                        }
                    ],
                    'verification-ratio': null
                },
                prop: [
                    {
                        key: 'item-group',
                        type: {
                            of: 'inner[]',
                            inner: 'ItemGroup',
                            cmatrix: null,
                            candidate: null
                        },
                        description: '個人属性グループの配列',
                        isInherit: true
                    },
                    {
                        key: 'verification-ratio',
                        type: {
                            of: 'number',
                            cmatrix: null,
                            format: null,
                            unit: {
                                _value: 20009,
                                _ver: 1
                            },
                            candidate: null
                        },
                        description: '本人性の検証率',
                        isInherit: true
                    }
                ],
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
                                        value: NULL
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
                                        value: NULL
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
                                        value: NULL
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
                                        value: NULL
                                    }
                                ]
                            }
                        ]
                    }
                ],
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/person/identification',
                    name: '顔写真ありの障害者手帳（身体障害者手帳、療育手帳、精神障害者保健福祉手帳）',
                    _code: {
                        _value: 30008,
                        _ver: 1
                    },
                    inherit: {
                        _value: 107,
                        _ver: 1
                    },
                    description: '本人性確認で利用する顔写真ありの障害者手帳（身体障害者手帳、療育手帳、精神障害者保健福祉手帳）の定義です。'
                },
                template: {
                    _code: {
                        _value: 30008,
                        _ver: 1
                    },
                    'item-group': [
                        {
                            title: '氏名',
                            item: [
                                {
                                    title: '姓名',
                                    type: {
                                        _value: 30037,
                                        _ver: 1
                                    },
                                    content: null
                                }
                            ]
                        },
                        {
                            title: '生年月日（和暦）',
                            item: [
                                {
                                    title: '生年月日（和暦）',
                                    type: {
                                        _value: 30038,
                                        _ver: 1
                                    },
                                    content: null
                                }
                            ]
                        },
                        {
                            title: '住所',
                            item: [
                                {
                                    title: '住所',
                                    type: {
                                        _value: 30035,
                                        _ver: 1
                                    },
                                    content: null
                                }
                            ]
                        }
                    ],
                    'verification-ratio': null
                },
                prop: [
                    {
                        key: 'item-group',
                        type: {
                            of: 'inner[]',
                            inner: 'ItemGroup',
                            cmatrix: null,
                            candidate: null
                        },
                        description: '個人属性グループの配列',
                        isInherit: true
                    },
                    {
                        key: 'verification-ratio',
                        type: {
                            of: 'number',
                            cmatrix: null,
                            format: null,
                            unit: {
                                _value: 20009,
                                _ver: 1
                            },
                            candidate: null
                        },
                        description: '本人性の検証率',
                        isInherit: true
                    }
                ],
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
                                        value: NULL
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
                                        value: NULL
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
                                        value: NULL
                                    }
                                ]
                            }
                        ]
                    }
                ],
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/person/identification',
                    name: '在留カード',
                    _code: {
                        _value: 30009,
                        _ver: 1
                    },
                    inherit: {
                        _value: 107,
                        _ver: 1
                    },
                    description: '本人性確認で利用する在留カードの定義です。'
                },
                template: {
                    _code: {
                        _value: 30009,
                        _ver: 1
                    },
                    'item-group': [
                        {
                            title: '氏名',
                            item: [
                                {
                                    title: '姓名',
                                    type: {
                                        _value: 30037,
                                        _ver: 1
                                    },
                                    content: null
                                }
                            ]
                        },
                        {
                            title: '性別',
                            item: [
                                {
                                    title: '性別',
                                    type: {
                                        _value: 30021,
                                        _ver: 1
                                    },
                                    content: null
                                }
                            ]
                        },
                        {
                            title: '生年月日（西暦）',
                            item: [
                                {
                                    title: '生年月日（西暦）',
                                    type: {
                                        _value: 30022,
                                        _ver: 1
                                    },
                                    content: null
                                }
                            ]
                        },
                        {
                            title: '住所',
                            item: [
                                {
                                    title: '住所',
                                    type: {
                                        _value: 30035,
                                        _ver: 1
                                    },
                                    content: null
                                }
                            ]
                        }
                    ],
                    'verification-ratio': null
                },
                prop: [
                    {
                        key: 'item-group',
                        type: {
                            of: 'inner[]',
                            inner: 'ItemGroup',
                            cmatrix: null,
                            candidate: null
                        },
                        description: '個人属性グループの配列',
                        isInherit: true
                    },
                    {
                        key: 'verification-ratio',
                        type: {
                            of: 'number',
                            cmatrix: null,
                            format: null,
                            unit: {
                                _value: 20009,
                                _ver: 1
                            },
                            candidate: null
                        },
                        description: '本人性の検証率',
                        isInherit: true
                    }
                ],
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
                                        value: NULL
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
                                        value: NULL
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
                                        value: NULL
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
                                        value: NULL
                                    }
                                ]
                            }
                        ]
                    }
                ],
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/person/identification',
                    name: '特別永住者証明書',
                    _code: {
                        _value: 30010,
                        _ver: 1
                    },
                    inherit: {
                        _value: 107,
                        _ver: 1
                    },
                    description: '本人性確認で利用する特別永住者証明書の定義です。'
                },
                template: {
                    _code: {
                        _value: 30010,
                        _ver: 1
                    },
                    'item-group': [
                        {
                            title: '氏名',
                            item: [
                                {
                                    title: '姓名',
                                    type: {
                                        _value: 30037,
                                        _ver: 1
                                    },
                                    content: null
                                }
                            ]
                        },
                        {
                            title: '性別',
                            item: [
                                {
                                    title: '性別',
                                    type: {
                                        _value: 30021,
                                        _ver: 1
                                    },
                                    content: null
                                }
                            ]
                        },
                        {
                            title: '生年月日（西暦）',
                            item: [
                                {
                                    title: '生年月日（西暦）',
                                    type: {
                                        _value: 30022,
                                        _ver: 1
                                    },
                                    content: null
                                }
                            ]
                        },
                        {
                            title: '住所',
                            item: [
                                {
                                    title: '住所',
                                    type: {
                                        _value: 30035,
                                        _ver: 1
                                    },
                                    content: null
                                }
                            ]
                        }
                    ],
                    'verification-ratio': null
                },
                prop: [
                    {
                        key: 'item-group',
                        type: {
                            of: 'inner[]',
                            inner: 'ItemGroup',
                            cmatrix: null,
                            candidate: null
                        },
                        description: '個人属性グループの配列',
                        isInherit: true
                    },
                    {
                        key: 'verification-ratio',
                        type: {
                            of: 'number',
                            cmatrix: null,
                            format: null,
                            unit: {
                                _value: 20009,
                                _ver: 1
                            },
                            candidate: null
                        },
                        description: '本人性の検証率',
                        isInherit: true
                    }
                ],
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
                                        value: NULL
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
                                        value: NULL
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
                                        value: NULL
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
                                        value: NULL
                                    }
                                ]
                            }
                        ]
                    }
                ],
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/licence',
                    name: '歯科医師免許',
                    _code: {
                        _value: 30011,
                        _ver: 1
                    },
                    inherit: null,
                    description: '歯科医師免許の定義です。'
                },
                template: {
                    _code: {
                        _value: 30011,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/licence',
                    name: '看護師免許',
                    _code: {
                        _value: 30012,
                        _ver: 1
                    },
                    inherit: null,
                    description: '看護師免許の定義です。'
                },
                template: {
                    _code: {
                        _value: 30012,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/licence',
                    name: '薬剤師免許',
                    _code: {
                        _value: 30013,
                        _ver: 1
                    },
                    inherit: null,
                    description: '薬剤師免許の定義です。'
                },
                template: {
                    _code: {
                        _value: 30013,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/licence',
                    name: '救急救命士免許',
                    _code: {
                        _value: 30014,
                        _ver: 1
                    },
                    inherit: null,
                    description: '救急救命士免許の定義です。'
                },
                template: {
                    _code: {
                        _value: 30014,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/licence',
                    name: '公認心理士資格',
                    _code: {
                        _value: 30015,
                        _ver: 1
                    },
                    inherit: null,
                    description: '公認心理士資格の定義です。'
                },
                template: {
                    _code: {
                        _value: 30015,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/licence',
                    name: '臨床心理士資格',
                    _code: {
                        _value: 30016,
                        _ver: 1
                    },
                    inherit: null,
                    description: '臨床心理士資格の定義です。'
                },
                template: {
                    _code: {
                        _value: 30016,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/env/thing/recorder',
                    name: 'モノに関する環境情報（レコーダー）',
                    _code: {
                        _value: 30017,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'モノに関する環境情報（レコーダー）の定義です。'
                },
                template: {
                    _code: {
                        _value: 30017,
                        _ver: 1
                    },
                    code: {
                        index: '_2',
                        value: NULL
                    },
                    id: {
                        index: '_1',
                        value: NULL
                    }
                },
                prop: [
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
                        description: 'レコーダー種別',
                        isInherit: false
                    },
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
                        description: 'レコーダー識別子',
                        isInherit: false
                    }
                ],
                value: NULL,
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
                    ],
                    tags: []
                }
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/attribute/recorder',
                    name: 'recorder',
                    _code: {
                        _value: 30018,
                        _ver: 1
                    },
                    inherit: null,
                    description: 'レコーダー製品情報の定義です。attributeに設定されます。key名は[recorder]です。'
                },
                template: {
                    _code: {
                        _value: 30018,
                        _ver: 1
                    },
                    company: null,
                    'manufacturing-name': null,
                    'model-number': null
                },
                prop: [
                    {
                        key: 'company',
                        type: {
                            of: 'code',
                            cmatrix: null,
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
                        description: '製造メーカー',
                        isInherit: false
                    },
                    {
                        key: 'manufacturing-name',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '製品名',
                        isInherit: false
                    },
                    {
                        key: 'model-number',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'レコーダー型番',
                        isInherit: false
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/person/item-type',
                    name: '姓',
                    _code: {
                        _value: 30019,
                        _ver: 1
                    },
                    inherit: null,
                    description: '個人属性の項目種別（姓）の定義です。'
                },
                template: {
                    _code: {
                        _value: 30019,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/person/item-type',
                    name: '名',
                    _code: {
                        _value: 30020,
                        _ver: 1
                    },
                    inherit: null,
                    description: '個人属性の項目種別（名）の定義です。'
                },
                template: {
                    _code: {
                        _value: 30020,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/person/item-type',
                    name: '性別',
                    _code: {
                        _value: 30021,
                        _ver: 1
                    },
                    inherit: null,
                    description: '個人属性の項目種別（性別）の定義です。'
                },
                template: {
                    _code: {
                        _value: 30021,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/person/item-type',
                    name: '生年月日（西暦）',
                    _code: {
                        _value: 30022,
                        _ver: 1
                    },
                    inherit: null,
                    description: '個人属性の項目種別（生年月日（西暦））の定義です。'
                },
                template: {
                    _code: {
                        _value: 30022,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/person/identification',
                    name: '官公庁、独立行政法人、特殊法人又は地方独立行政法人がその職員に対して発行した身分証明書で写真付きのもの',
                    _code: {
                        _value: 30023,
                        _ver: 1
                    },
                    inherit: {
                        _value: 107,
                        _ver: 1
                    },
                    description: '本人性確認で利用する官公庁、独立行政法人、特殊法人又は地方独立行政法人がその職員に対して発行した身分証明書で写真付きのものの定義です。'
                },
                template: {
                    _code: {
                        _value: 30023,
                        _ver: 1
                    },
                    'item-group': [
                        {
                            title: '氏名',
                            item: [
                                {
                                    title: '姓名',
                                    type: {
                                        _value: 30037,
                                        _ver: 1
                                    },
                                    content: null
                                }
                            ]
                        },
                        {
                            title: '生年月日（和暦）',
                            item: [
                                {
                                    title: '生年月日（和暦）',
                                    type: {
                                        _value: 30038,
                                        _ver: 1
                                    },
                                    content: null
                                }
                            ]
                        }
                    ],
                    'verification-ratio': null
                },
                prop: [
                    {
                        key: 'item-group',
                        type: {
                            of: 'inner[]',
                            inner: 'ItemGroup',
                            cmatrix: null,
                            candidate: null
                        },
                        description: '個人属性グループの配列',
                        isInherit: true
                    },
                    {
                        key: 'verification-ratio',
                        type: {
                            of: 'number',
                            cmatrix: null,
                            format: null,
                            unit: {
                                _value: 20009,
                                _ver: 1
                            },
                            candidate: null
                        },
                        description: '本人性の検証率',
                        isInherit: true
                    }
                ],
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
                                        value: NULL
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
                                        value: NULL
                                    }
                                ]
                            }
                        ]
                    }
                ],
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/person/identification',
                    name: '健康保険、国民健康保険又は船員保険等の被保険者証',
                    _code: {
                        _value: 30024,
                        _ver: 1
                    },
                    inherit: {
                        _value: 107,
                        _ver: 1
                    },
                    description: '本人性確認で利用する健康保険、国民健康保険又は船員保険等の被保険者証の定義です。'
                },
                template: {
                    _code: {
                        _value: 30024,
                        _ver: 1
                    },
                    'item-group': [
                        {
                            title: '氏名',
                            item: [
                                {
                                    title: '姓名',
                                    type: {
                                        _value: 30037,
                                        _ver: 1
                                    },
                                    content: null
                                }
                            ]
                        },
                        {
                            title: '性別',
                            item: [
                                {
                                    title: '性別',
                                    type: {
                                        _value: 30021,
                                        _ver: 1
                                    },
                                    content: null
                                }
                            ]
                        },
                        {
                            title: '生年月日（和暦）',
                            item: [
                                {
                                    title: '生年月日（和暦）',
                                    type: {
                                        _value: 30038,
                                        _ver: 1
                                    },
                                    content: null
                                }
                            ]
                        },
                        {
                            title: '住所',
                            item: [
                                {
                                    title: '住所',
                                    type: {
                                        _value: 30035,
                                        _ver: 1
                                    },
                                    content: null
                                }
                            ]
                        }
                    ],
                    'verification-ratio': null
                },
                prop: [
                    {
                        key: 'item-group',
                        type: {
                            of: 'inner[]',
                            inner: 'ItemGroup',
                            cmatrix: null,
                            candidate: null
                        },
                        description: '個人属性グループの配列',
                        isInherit: true
                    },
                    {
                        key: 'verification-ratio',
                        type: {
                            of: 'number',
                            cmatrix: null,
                            format: null,
                            unit: {
                                _value: 20009,
                                _ver: 1
                            },
                            candidate: null
                        },
                        description: '本人性の検証率',
                        isInherit: true
                    }
                ],
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
                                        value: NULL
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
                                        value: NULL
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
                                        value: NULL
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
                                        value: NULL
                                    }
                                ]
                            }
                        ]
                    }
                ],
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/person/identification',
                    name: '年金手帳',
                    _code: {
                        _value: 30025,
                        _ver: 1
                    },
                    inherit: {
                        _value: 107,
                        _ver: 1
                    },
                    description: '本人性確認で利用する年金手帳の定義です。'
                },
                template: {
                    _code: {
                        _value: 30025,
                        _ver: 1
                    },
                    'item-group': [
                        {
                            title: '氏名',
                            item: [
                                {
                                    title: '姓名',
                                    type: {
                                        _value: 30037,
                                        _ver: 1
                                    },
                                    content: null
                                }
                            ]
                        },
                        {
                            title: '性別',
                            item: [
                                {
                                    title: '性別',
                                    type: {
                                        _value: 30021,
                                        _ver: 1
                                    },
                                    content: null
                                }
                            ]
                        },
                        {
                            title: '生年月日（和暦）',
                            item: [
                                {
                                    title: '生年月日（和暦）',
                                    type: {
                                        _value: 30038,
                                        _ver: 1
                                    },
                                    content: null
                                }
                            ]
                        }
                    ],
                    'verification-ratio': null
                },
                prop: [
                    {
                        key: 'item-group',
                        type: {
                            of: 'inner[]',
                            inner: 'ItemGroup',
                            cmatrix: null,
                            candidate: null
                        },
                        description: '個人属性グループの配列',
                        isInherit: true
                    },
                    {
                        key: 'verification-ratio',
                        type: {
                            of: 'number',
                            cmatrix: null,
                            format: null,
                            unit: {
                                _value: 20009,
                                _ver: 1
                            },
                            candidate: null
                        },
                        description: '本人性の検証率',
                        isInherit: true
                    }
                ],
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
                                        value: NULL
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
                                        value: NULL
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
                                        value: NULL
                                    }
                                ]
                            }
                        ]
                    }
                ],
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/person/identification',
                    name: '介護保険証',
                    _code: {
                        _value: 30026,
                        _ver: 1
                    },
                    inherit: {
                        _value: 107,
                        _ver: 1
                    },
                    description: '本人性確認で利用する介護保険証の定義です。'
                },
                template: {
                    _code: {
                        _value: 30026,
                        _ver: 1
                    },
                    'item-group': [
                        {
                            title: '氏名',
                            item: [
                                {
                                    title: '姓名',
                                    type: {
                                        _value: 30037,
                                        _ver: 1
                                    },
                                    content: null
                                }
                            ]
                        },
                        {
                            title: '生年月日（和暦）',
                            item: [
                                {
                                    title: '生年月日（和暦）',
                                    type: {
                                        _value: 30038,
                                        _ver: 1
                                    },
                                    content: null
                                }
                            ]
                        },
                        {
                            title: '住所',
                            item: [
                                {
                                    title: '住所',
                                    type: {
                                        _value: 30035,
                                        _ver: 1
                                    },
                                    content: null
                                }
                            ]
                        },
                        {
                            title: '性別',
                            item: [
                                {
                                    title: '性別',
                                    type: {
                                        _value: 30021,
                                        _ver: 1
                                    },
                                    content: null
                                }
                            ]
                        }
                    ],
                    'verification-ratio': null
                },
                prop: [
                    {
                        key: 'item-group',
                        type: {
                            of: 'inner[]',
                            inner: 'ItemGroup',
                            cmatrix: null,
                            candidate: null
                        },
                        description: '個人属性グループの配列',
                        isInherit: true
                    },
                    {
                        key: 'verification-ratio',
                        type: {
                            of: 'number',
                            cmatrix: null,
                            format: null,
                            unit: {
                                _value: 20009,
                                _ver: 1
                            },
                            candidate: null
                        },
                        description: '本人性の検証率',
                        isInherit: true
                    }
                ],
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
                                        value: NULL
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
                                        value: NULL
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
                                        value: NULL
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
                                        value: NULL
                                    }
                                ]
                            }
                        ]
                    }
                ],
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/person/identification',
                    name: '各種福祉手帳（顔写真なし）',
                    _code: {
                        _value: 30027,
                        _ver: 1
                    },
                    inherit: {
                        _value: 107,
                        _ver: 1
                    },
                    description: '本人性確認で利用する各種福祉手帳（顔写真なし）の定義です。'
                },
                template: {
                    _code: {
                        _value: 30027,
                        _ver: 1
                    },
                    'item-group': [
                        {
                            title: '氏名',
                            item: [
                                {
                                    title: '姓名',
                                    type: {
                                        _value: 30037,
                                        _ver: 1
                                    },
                                    content: null
                                }
                            ]
                        },
                        {
                            title: '性別',
                            item: [
                                {
                                    title: '性別',
                                    type: {
                                        _value: 30021,
                                        _ver: 1
                                    },
                                    content: null
                                }
                            ]
                        },
                        {
                            title: '生年月日（和暦）',
                            item: [
                                {
                                    title: '生年月日（和暦）',
                                    type: {
                                        _value: 30038,
                                        _ver: 1
                                    },
                                    content: null
                                }
                            ]
                        },
                        {
                            title: '住所',
                            item: [
                                {
                                    title: '住所',
                                    type: {
                                        _value: 30035,
                                        _ver: 1
                                    },
                                    content: null
                                }
                            ]
                        }
                    ],
                    'verification-ratio': null
                },
                prop: [
                    {
                        key: 'item-group',
                        type: {
                            of: 'inner[]',
                            inner: 'ItemGroup',
                            cmatrix: null,
                            candidate: null
                        },
                        description: '個人属性グループの配列',
                        isInherit: true
                    },
                    {
                        key: 'verification-ratio',
                        type: {
                            of: 'number',
                            cmatrix: null,
                            format: null,
                            unit: {
                                _value: 20009,
                                _ver: 1
                            },
                            candidate: null
                        },
                        description: '本人性の検証率',
                        isInherit: true
                    }
                ],
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
                                        value: NULL
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
                                        value: NULL
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
                                        value: NULL
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
                                        value: NULL
                                    }
                                ]
                            }
                        ]
                    }
                ],
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/person/identification',
                    name: '母子健康手帳',
                    _code: {
                        _value: 30028,
                        _ver: 1
                    },
                    inherit: {
                        _value: 107,
                        _ver: 1
                    },
                    description: '本人性確認で利用する母子健康手帳の定義です。'
                },
                template: {
                    _code: {
                        _value: 30028,
                        _ver: 1
                    },
                    'item-group': [
                        {
                            title: '氏名',
                            item: [
                                {
                                    title: '姓名',
                                    type: {
                                        _value: 30037,
                                        _ver: 1
                                    },
                                    content: null
                                }
                            ]
                        },
                        {
                            title: '性別',
                            item: [
                                {
                                    title: '性別',
                                    type: {
                                        _value: 30021,
                                        _ver: 1
                                    },
                                    content: null
                                }
                            ]
                        },
                        {
                            title: '生年月日（西暦）',
                            item: [
                                {
                                    title: '生年月日（西暦）',
                                    type: {
                                        _value: 30022,
                                        _ver: 1
                                    },
                                    content: null
                                }
                            ]
                        }
                    ],
                    'verification-ratio': null
                },
                prop: [
                    {
                        key: 'item-group',
                        type: {
                            of: 'inner[]',
                            inner: 'ItemGroup',
                            cmatrix: null,
                            candidate: null
                        },
                        description: '個人属性グループの配列',
                        isInherit: true
                    },
                    {
                        key: 'verification-ratio',
                        type: {
                            of: 'number',
                            cmatrix: null,
                            format: null,
                            unit: {
                                _value: 20009,
                                _ver: 1
                            },
                            candidate: null
                        },
                        description: '本人性の検証率',
                        isInherit: true
                    }
                ],
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
                                        value: NULL
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
                                        value: NULL
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
                                        value: NULL
                                    }
                                ]
                            }
                        ]
                    }
                ],
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/person/identification',
                    name: '住民票の写し',
                    _code: {
                        _value: 30029,
                        _ver: 1
                    },
                    inherit: {
                        _value: 107,
                        _ver: 1
                    },
                    description: '本人性確認で利用する住民票の写しの定義です。'
                },
                template: {
                    _code: {
                        _value: 30029,
                        _ver: 1
                    },
                    'item-group': [
                        {
                            title: '氏名',
                            item: [
                                {
                                    title: '姓名',
                                    type: {
                                        _value: 30037,
                                        _ver: 1
                                    },
                                    content: null
                                }
                            ]
                        },
                        {
                            title: '生年月日（和暦）',
                            item: [
                                {
                                    title: '生年月日（和暦）',
                                    type: {
                                        _value: 30038,
                                        _ver: 1
                                    },
                                    content: null
                                }
                            ]
                        },
                        {
                            title: '住所',
                            item: [
                                {
                                    title: '住所',
                                    type: {
                                        _value: 30035,
                                        _ver: 1
                                    },
                                    content: null
                                }
                            ]
                        }
                    ],
                    'verification-ratio': null
                },
                prop: [
                    {
                        key: 'item-group',
                        type: {
                            of: 'inner[]',
                            inner: 'ItemGroup',
                            cmatrix: null,
                            candidate: null
                        },
                        description: '個人属性グループの配列',
                        isInherit: true
                    },
                    {
                        key: 'verification-ratio',
                        type: {
                            of: 'number',
                            cmatrix: null,
                            format: null,
                            unit: {
                                _value: 20009,
                                _ver: 1
                            },
                            candidate: null
                        },
                        description: '本人性の検証率',
                        isInherit: true
                    }
                ],
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
                                        value: NULL
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
                                        value: NULL
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
                                        value: NULL
                                    }
                                ]
                            }
                        ]
                    }
                ],
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/person/identification',
                    name: '公共料金の領収書（住所の記載あり）',
                    _code: {
                        _value: 30031,
                        _ver: 1
                    },
                    inherit: {
                        _value: 107,
                        _ver: 1
                    },
                    description: '本人性確認で利用する公共料金の領収書（住所の記載あり）の定義です。'
                },
                template: {
                    _code: {
                        _value: 30031,
                        _ver: 1
                    },
                    'item-group': [
                        {
                            title: '氏名',
                            item: [
                                {
                                    title: '姓名',
                                    type: {
                                        _value: 30037,
                                        _ver: 1
                                    },
                                    content: null
                                }
                            ]
                        },
                        {
                            title: '住所',
                            item: [
                                {
                                    title: '住所',
                                    type: {
                                        _value: 30035,
                                        _ver: 1
                                    },
                                    content: null
                                }
                            ]
                        }
                    ],
                    'verification-ratio': null
                },
                prop: [
                    {
                        key: 'item-group',
                        type: {
                            of: 'inner[]',
                            inner: 'ItemGroup',
                            cmatrix: null,
                            candidate: null
                        },
                        description: '個人属性グループの配列',
                        isInherit: true
                    },
                    {
                        key: 'verification-ratio',
                        type: {
                            of: 'number',
                            cmatrix: null,
                            format: null,
                            unit: {
                                _value: 20009,
                                _ver: 1
                            },
                            candidate: null
                        },
                        description: '本人性の検証率',
                        isInherit: true
                    }
                ],
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
                                        value: NULL
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
                                        value: NULL
                                    }
                                ]
                            }
                        ]
                    }
                ],
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/person/identification',
                    name: '外国人登録証明書',
                    _code: {
                        _value: 30032,
                        _ver: 1
                    },
                    inherit: {
                        _value: 107,
                        _ver: 1
                    },
                    description: '本人性確認で利用する外国人登録証明書の定義です。'
                },
                template: {
                    _code: {
                        _value: 30032,
                        _ver: 1
                    },
                    'item-group': [
                        {
                            title: '氏名',
                            item: [
                                {
                                    title: '姓名',
                                    type: {
                                        _value: 30037,
                                        _ver: 1
                                    },
                                    content: null
                                }
                            ]
                        },
                        {
                            title: '性別',
                            item: [
                                {
                                    title: '性別',
                                    type: {
                                        _value: 30021,
                                        _ver: 1
                                    },
                                    content: null
                                }
                            ]
                        },
                        {
                            title: '生年月日（西暦）',
                            item: [
                                {
                                    title: '生年月日（西暦）',
                                    type: {
                                        _value: 30022,
                                        _ver: 1
                                    },
                                    content: null
                                }
                            ]
                        },
                        {
                            title: '住所',
                            item: [
                                {
                                    title: '住所',
                                    type: {
                                        _value: 30035,
                                        _ver: 1
                                    },
                                    content: null
                                }
                            ]
                        }
                    ],
                    'verification-ratio': null
                },
                prop: [
                    {
                        key: 'item-group',
                        type: {
                            of: 'inner[]',
                            inner: 'ItemGroup',
                            cmatrix: null,
                            candidate: null
                        },
                        description: '個人属性グループの配列',
                        isInherit: true
                    },
                    {
                        key: 'verification-ratio',
                        type: {
                            of: 'number',
                            cmatrix: null,
                            format: null,
                            unit: {
                                _value: 20009,
                                _ver: 1
                            },
                            candidate: null
                        },
                        description: '本人性の検証率',
                        isInherit: true
                    }
                ],
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
                                        value: NULL
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
                                        value: NULL
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
                                        value: NULL
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
                                        value: NULL
                                    }
                                ]
                            }
                        ]
                    }
                ],
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/person/identification',
                    name: '戸籍の附票',
                    _code: {
                        _value: 30033,
                        _ver: 1
                    },
                    inherit: {
                        _value: 107,
                        _ver: 1
                    },
                    description: '本人性確認で利用する戸籍の附票の定義です。'
                },
                template: {
                    _code: {
                        _value: 30033,
                        _ver: 1
                    },
                    'item-group': [
                        {
                            title: '氏名',
                            item: [
                                {
                                    title: '姓名',
                                    type: {
                                        _value: 30037,
                                        _ver: 1
                                    },
                                    content: null
                                }
                            ]
                        },
                        {
                            title: '住所',
                            item: [
                                {
                                    title: '住所',
                                    type: {
                                        _value: 30035,
                                        _ver: 1
                                    },
                                    content: null
                                }
                            ]
                        }
                    ],
                    'verification-ratio': null
                },
                prop: [
                    {
                        key: 'item-group',
                        type: {
                            of: 'inner[]',
                            inner: 'ItemGroup',
                            cmatrix: null,
                            candidate: null
                        },
                        description: '個人属性グループの配列',
                        isInherit: true
                    },
                    {
                        key: 'verification-ratio',
                        type: {
                            of: 'number',
                            cmatrix: null,
                            format: null,
                            unit: {
                                _value: 20009,
                                _ver: 1
                            },
                            candidate: null
                        },
                        description: '本人性の検証率',
                        isInherit: true
                    }
                ],
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
                                        value: NULL
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
                                        value: NULL
                                    }
                                ]
                            }
                        ]
                    }
                ],
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/person/identification',
                    name: '個人番号通知カード（マイナンバー通知カード）',
                    _code: {
                        _value: 30034,
                        _ver: 1
                    },
                    inherit: {
                        _value: 107,
                        _ver: 1
                    },
                    description: '本人性確認で利用する個人番号通知カード（マイナンバー通知カード）の定義です。'
                },
                template: {
                    _code: {
                        _value: 30034,
                        _ver: 1
                    },
                    'item-group': [
                        {
                            title: '氏名',
                            item: [
                                {
                                    title: '姓名',
                                    type: {
                                        _value: 30037,
                                        _ver: 1
                                    },
                                    content: null
                                }
                            ]
                        },
                        {
                            title: '性別',
                            item: [
                                {
                                    title: '性別',
                                    type: {
                                        _value: 30021,
                                        _ver: 1
                                    },
                                    content: null
                                }
                            ]
                        },
                        {
                            title: '生年月日（和暦）',
                            item: [
                                {
                                    title: '生年月日（和暦）',
                                    type: {
                                        _value: 30038,
                                        _ver: 1
                                    },
                                    content: null
                                }
                            ]
                        },
                        {
                            title: '住所',
                            item: [
                                {
                                    title: '住所',
                                    type: {
                                        _value: 30035,
                                        _ver: 1
                                    },
                                    content: null
                                }
                            ]
                        }
                    ],
                    'verification-ratio': null
                },
                prop: [
                    {
                        key: 'item-group',
                        type: {
                            of: 'inner[]',
                            inner: 'ItemGroup',
                            cmatrix: null,
                            candidate: null
                        },
                        description: '個人属性グループの配列',
                        isInherit: true
                    },
                    {
                        key: 'verification-ratio',
                        type: {
                            of: 'number',
                            cmatrix: null,
                            format: null,
                            unit: {
                                _value: 20009,
                                _ver: 1
                            },
                            candidate: null
                        },
                        description: '本人性の検証率',
                        isInherit: true
                    }
                ],
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
                                        value: NULL
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
                                        value: NULL
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
                                        value: NULL
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
                                        value: NULL
                                    }
                                ]
                            }
                        ]
                    }
                ],
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/person/item-type',
                    name: '住所',
                    _code: {
                        _value: 30035,
                        _ver: 1
                    },
                    inherit: null,
                    description: '個人属性の項目種別（住所）の定義です。'
                },
                template: {
                    _code: {
                        _value: 30035,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/person/item-type',
                    name: '連絡先電話番号',
                    _code: {
                        _value: 30036,
                        _ver: 1
                    },
                    inherit: null,
                    description: '個人属性の項目種別（連絡先電話番号）の定義です。'
                },
                template: {
                    _code: {
                        _value: 30036,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/person/item-type',
                    name: '姓名',
                    _code: {
                        _value: 30037,
                        _ver: 1
                    },
                    inherit: null,
                    description: '個人属性の項目種別（姓名）の定義です。'
                },
                template: {
                    _code: {
                        _value: 30037,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/person/item-type',
                    name: '生年月日（和暦）',
                    _code: {
                        _value: 30038,
                        _ver: 1
                    },
                    inherit: null,
                    description: '個人属性の項目種別（生年月日（和暦））の定義です。'
                },
                template: {
                    _code: {
                        _value: 30038,
                        _ver: 1
                    }
                },
                prop: null,
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/person/identification',
                    name: '運転経歴証（写真なしのもの）',
                    _code: {
                        _value: 30039,
                        _ver: 1
                    },
                    inherit: {
                        _value: 107,
                        _ver: 1
                    },
                    description: '本人性確認で利用する運転経歴証（写真なしのもの）の定義です。'
                },
                template: {
                    _code: {
                        _value: 30039,
                        _ver: 1
                    },
                    'item-group': [
                        {
                            title: '氏名',
                            item: [
                                {
                                    title: '姓名',
                                    type: {
                                        _value: 30037,
                                        _ver: 1
                                    },
                                    content: null
                                }
                            ]
                        },
                        {
                            title: '生年月日（和暦）',
                            item: [
                                {
                                    title: '生年月日（和暦）',
                                    type: {
                                        _value: 30038,
                                        _ver: 1
                                    },
                                    content: null
                                }
                            ]
                        },
                        {
                            title: '住所',
                            item: [
                                {
                                    title: '住所',
                                    type: {
                                        _value: 30035,
                                        _ver: 1
                                    },
                                    content: null
                                }
                            ]
                        }
                    ],
                    'verification-ratio': null
                },
                prop: [
                    {
                        key: 'item-group',
                        type: {
                            of: 'inner[]',
                            inner: 'ItemGroup',
                            cmatrix: null,
                            candidate: null
                        },
                        description: '個人属性グループの配列',
                        isInherit: true
                    },
                    {
                        key: 'verification-ratio',
                        type: {
                            of: 'number',
                            cmatrix: null,
                            format: null,
                            unit: {
                                _value: 20009,
                                _ver: 1
                            },
                            candidate: null
                        },
                        description: '本人性の検証率',
                        isInherit: true
                    }
                ],
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
                                        value: NULL
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
                                        value: NULL
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
                                        value: NULL
                                    }
                                ]
                            }
                        ]
                    }
                ],
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/person/identification',
                    name: 'その他免許証等で写真付きのもの',
                    _code: {
                        _value: 30040,
                        _ver: 1
                    },
                    inherit: {
                        _value: 107,
                        _ver: 1
                    },
                    description: '本人性確認で利用するその他免許証等で写真付きのものの定義です。'
                },
                template: {
                    _code: {
                        _value: 30040,
                        _ver: 1
                    },
                    'item-group': [
                        {
                            title: '氏名',
                            item: [
                                {
                                    title: '姓名',
                                    type: {
                                        _value: 30037,
                                        _ver: 1
                                    },
                                    content: null
                                }
                            ]
                        },
                        {
                            title: '生年月日（和暦）',
                            item: [
                                {
                                    title: '生年月日（和暦）',
                                    type: {
                                        _value: 30038,
                                        _ver: 1
                                    },
                                    content: null
                                }
                            ]
                        }
                    ],
                    'verification-ratio': null
                },
                prop: [
                    {
                        key: 'item-group',
                        type: {
                            of: 'inner[]',
                            inner: 'ItemGroup',
                            cmatrix: null,
                            candidate: null
                        },
                        description: '個人属性グループの配列',
                        isInherit: true
                    },
                    {
                        key: 'verification-ratio',
                        type: {
                            of: 'number',
                            cmatrix: null,
                            format: null,
                            unit: {
                                _value: 20009,
                                _ver: 1
                            },
                            candidate: null
                        },
                        description: '本人性の検証率',
                        isInherit: true
                    }
                ],
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
                                        value: NULL
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
                                        value: NULL
                                    }
                                ]
                            }
                        ]
                    }
                ],
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/person/identification',
                    name: '顔写真付き学生証',
                    _code: {
                        _value: 30041,
                        _ver: 1
                    },
                    inherit: {
                        _value: 107,
                        _ver: 1
                    },
                    description: '本人性確認で利用する顔写真付き学生証の定義です。'
                },
                template: {
                    _code: {
                        _value: 30041,
                        _ver: 1
                    },
                    'item-group': [
                        {
                            title: '氏名',
                            item: [
                                {
                                    title: '姓名',
                                    type: {
                                        _value: 30037,
                                        _ver: 1
                                    },
                                    content: null
                                }
                            ]
                        }
                    ],
                    'verification-ratio': null
                },
                prop: [
                    {
                        key: 'item-group',
                        type: {
                            of: 'inner[]',
                            inner: 'ItemGroup',
                            cmatrix: null,
                            candidate: null
                        },
                        description: '個人属性グループの配列',
                        isInherit: true
                    },
                    {
                        key: 'verification-ratio',
                        type: {
                            of: 'number',
                            cmatrix: null,
                            format: null,
                            unit: {
                                _value: 20009,
                                _ver: 1
                            },
                            candidate: null
                        },
                        description: '本人性の検証率',
                        isInherit: true
                    }
                ],
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
                                        value: NULL
                                    }
                                ]
                            }
                        ]
                    }
                ],
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/person/identification',
                    name: '共済組合員証',
                    _code: {
                        _value: 30042,
                        _ver: 1
                    },
                    inherit: {
                        _value: 107,
                        _ver: 1
                    },
                    description: '本人性確認で利用する共済組合員証の定義です。'
                },
                template: {
                    _code: {
                        _value: 30042,
                        _ver: 1
                    },
                    'item-group': [
                        {
                            title: '氏名',
                            item: [
                                {
                                    title: '姓名',
                                    type: {
                                        _value: 30037,
                                        _ver: 1
                                    },
                                    content: null
                                }
                            ]
                        },
                        {
                            title: '性別',
                            item: [
                                {
                                    title: '性別',
                                    type: {
                                        _value: 30021,
                                        _ver: 1
                                    },
                                    content: null
                                }
                            ]
                        },
                        {
                            title: '生年月日（和暦）',
                            item: [
                                {
                                    title: '生年月日（和暦）',
                                    type: {
                                        _value: 30038,
                                        _ver: 1
                                    },
                                    content: null
                                }
                            ]
                        }
                    ],
                    'verification-ratio': null
                },
                prop: [
                    {
                        key: 'item-group',
                        type: {
                            of: 'inner[]',
                            inner: 'ItemGroup',
                            cmatrix: null,
                            candidate: null
                        },
                        description: '個人属性グループの配列',
                        isInherit: true
                    },
                    {
                        key: 'verification-ratio',
                        type: {
                            of: 'number',
                            cmatrix: null,
                            format: null,
                            unit: {
                                _value: 20009,
                                _ver: 1
                            },
                            candidate: null
                        },
                        description: '本人性の検証率',
                        isInherit: true
                    }
                ],
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
                                        value: NULL
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
                                        value: NULL
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
                                        value: NULL
                                    }
                                ]
                            }
                        ]
                    }
                ],
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/person/identification',
                    name: '国民年金手帳',
                    _code: {
                        _value: 30043,
                        _ver: 1
                    },
                    inherit: {
                        _value: 107,
                        _ver: 1
                    },
                    description: '本人性確認で利用する国民年金手帳の定義です。'
                },
                template: {
                    _code: {
                        _value: 30043,
                        _ver: 1
                    },
                    'item-group': [
                        {
                            title: '氏名',
                            item: [
                                {
                                    title: '姓名',
                                    type: {
                                        _value: 30037,
                                        _ver: 1
                                    },
                                    content: null
                                }
                            ]
                        },
                        {
                            title: '性別',
                            item: [
                                {
                                    title: '性別',
                                    type: {
                                        _value: 30021,
                                        _ver: 1
                                    },
                                    content: null
                                }
                            ]
                        },
                        {
                            title: '生年月日（和暦）',
                            item: [
                                {
                                    title: '生年月日（和暦）',
                                    type: {
                                        _value: 30038,
                                        _ver: 1
                                    },
                                    content: null
                                }
                            ]
                        }
                    ],
                    'verification-ratio': null
                },
                prop: [
                    {
                        key: 'item-group',
                        type: {
                            of: 'inner[]',
                            inner: 'ItemGroup',
                            cmatrix: null,
                            candidate: null
                        },
                        description: '個人属性グループの配列',
                        isInherit: true
                    },
                    {
                        key: 'verification-ratio',
                        type: {
                            of: 'number',
                            cmatrix: null,
                            format: null,
                            unit: {
                                _value: 20009,
                                _ver: 1
                            },
                            candidate: null
                        },
                        description: '本人性の検証率',
                        isInherit: true
                    }
                ],
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
                                        value: NULL
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
                                        value: NULL
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
                                        value: NULL
                                    }
                                ]
                            }
                        ]
                    }
                ],
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/person/identification',
                    name: '国民年金、厚生年金保険又は船員保険にかかる年金証書',
                    _code: {
                        _value: 30044,
                        _ver: 1
                    },
                    inherit: {
                        _value: 107,
                        _ver: 1
                    },
                    description: '本人性確認で利用する国民年金、厚生年金保険又は船員保険にかかる年金証書の定義です。'
                },
                template: {
                    _code: {
                        _value: 30044,
                        _ver: 1
                    },
                    'item-group': [
                        {
                            title: '氏名',
                            item: [
                                {
                                    title: '姓名',
                                    type: {
                                        _value: 30037,
                                        _ver: 1
                                    },
                                    content: null
                                }
                            ]
                        },
                        {
                            title: '生年月日（和暦）',
                            item: [
                                {
                                    title: '生年月日（和暦）',
                                    type: {
                                        _value: 30038,
                                        _ver: 1
                                    },
                                    content: null
                                }
                            ]
                        }
                    ],
                    'verification-ratio': null
                },
                prop: [
                    {
                        key: 'item-group',
                        type: {
                            of: 'inner[]',
                            inner: 'ItemGroup',
                            cmatrix: null,
                            candidate: null
                        },
                        description: '個人属性グループの配列',
                        isInherit: true
                    },
                    {
                        key: 'verification-ratio',
                        type: {
                            of: 'number',
                            cmatrix: null,
                            format: null,
                            unit: {
                                _value: 20009,
                                _ver: 1
                            },
                            candidate: null
                        },
                        description: '本人性の検証率',
                        isInherit: true
                    }
                ],
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
                                        value: NULL
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
                                        value: NULL
                                    }
                                ]
                            }
                        ]
                    }
                ],
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/built_in/person/identification',
                    name: '共済年金又は恩給等の証書',
                    _code: {
                        _value: 30045,
                        _ver: 1
                    },
                    inherit: {
                        _value: 107,
                        _ver: 1
                    },
                    description: '本人性確認で利用する共済年金又は恩給等の証書の定義です。'
                },
                template: {
                    _code: {
                        _value: 30045,
                        _ver: 1
                    },
                    'item-group': [
                        {
                            title: '氏名',
                            item: [
                                {
                                    title: '姓名',
                                    type: {
                                        _value: 30037,
                                        _ver: 1
                                    },
                                    content: null
                                }
                            ]
                        },
                        {
                            title: '生年月日（和暦）',
                            item: [
                                {
                                    title: '生年月日（和暦）',
                                    type: {
                                        _value: 30038,
                                        _ver: 1
                                    },
                                    content: null
                                }
                            ]
                        }
                    ],
                    'verification-ratio': null
                },
                prop: [
                    {
                        key: 'item-group',
                        type: {
                            of: 'inner[]',
                            inner: 'ItemGroup',
                            cmatrix: null,
                            candidate: null
                        },
                        description: '個人属性グループの配列',
                        isInherit: true
                    },
                    {
                        key: 'verification-ratio',
                        type: {
                            of: 'number',
                            cmatrix: null,
                            format: null,
                            unit: {
                                _value: 20009,
                                _ver: 1
                            },
                            candidate: null
                        },
                        description: '本人性の検証率',
                        isInherit: true
                    }
                ],
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
                                        value: NULL
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
                                        value: NULL
                                    }
                                ]
                            }
                        ]
                    }
                ],
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/ext/test-org/actor/pxr-root',
                    name: '流通制御組織',
                    _code: {
                        _value: 1000001,
                        _ver: 1
                    },
                    inherit: {
                        _value: 50,
                        _ver: 1
                    },
                    description: '流通制御組織の定義です。'
                },
                template: {
                    _code: {
                        _value: 1000001,
                        _ver: 1
                    },
                    'app-cert': {
                        cert: [
                            {
                                title: '',
                                section: [
                                    {
                                        title: 'アプリケーションプロバイダーの認定基準',
                                        content: [
                                            {
                                                sentence: 'アプリケーションプロバイダーの認定基準です。'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                        audit: [
                            {
                                title: '',
                                section: [
                                    {
                                        title: 'アプリケーションプロバイダーの監査手順',
                                        content: [
                                            {
                                                sentence: 'アプリケーションプロバイダーの監査手順です。'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    'breakaway-flg': false,
                    category: null,
                    'consumer-cert': {
                        cert: [
                            {
                                title: '',
                                section: [
                                    {
                                        title: 'データコンシューマーの認定基準',
                                        content: [
                                            {
                                                sentence: 'データコンシューマーの認定基準です。'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                        audit: [
                            {
                                title: '',
                                section: [
                                    {
                                        title: 'データコンシューマーの監査手順',
                                        content: [
                                            {
                                                sentence: 'データコンシューマーの監査手順です。'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    'data-trader-cert': {
                        cert: [
                            {
                                title: '',
                                section: [
                                    {
                                        title: 'データ取引サービスプロバイダーの認定基準',
                                        content: [
                                            {
                                                sentence: 'データ取引サービスプロバイダーの認定基準です。'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                        audit: [
                            {
                                title: '',
                                section: [
                                    {
                                        title: 'データ取引サービスプロバイダーの監査手順',
                                        content: [
                                            {
                                                sentence: 'データ取引サービスプロバイダーの監査手順です。'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    'information-site': '',
                    'main-block': {
                        _value: 1000110,
                        _ver: 1
                    },
                    'other-block': null,
                    'region-root-cert': {
                        cert: [
                            {
                                title: '',
                                section: [
                                    {
                                        title: '領域運営サービスプロバイダーの認定基準',
                                        content: [
                                            {
                                                sentence: '領域運営サービスプロバイダーの認定基準です。'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                        audit: [
                            {
                                title: '',
                                section: [
                                    {
                                        title: '領域運営サービスプロバイダーの監査手順',
                                        content: [
                                            {
                                                sentence: '領域運営サービスプロバイダーの監査手順です。'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    statement: [
                        {
                            title: '組織ステートメント',
                            section: [
                                {
                                    title: 'ご挨拶',
                                    content: [
                                        {
                                            sentence: 'データ取引組織のステートメントです。'
                                        }
                                    ]
                                },
                                {
                                    title: '事業概要',
                                    content: [
                                        {
                                            sentence: 'データ取引組織の事業概要です。'
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    status: [
                        {
                            status: 'certified',
                            by: null,
                            at: '2020-01-01T00:00:00.000+0900'
                        }
                    ],
                    'wf-cert': {
                        cert: [
                            {
                                title: '',
                                section: [
                                    {
                                        title: 'ワークフロープロバイダーの認定基準',
                                        content: [
                                            {
                                                sentence: 'ワークフロープロバイダーの認定基準です。'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                        audit: [
                            {
                                title: '',
                                section: [
                                    {
                                        title: 'ワークフロープロバイダーの監査手順',
                                        content: [
                                            {
                                                sentence: 'ワークフロープロバイダーの監査手順です。'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                },
                prop: [
                    {
                        key: 'app-cert',
                        type: {
                            of: 'inner',
                            inner: 'Certification',
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'アプリケーションプロバイダー認定',
                        isInherit: true
                    },
                    {
                        key: 'breakaway-flg',
                        type: {
                            of: 'boolean',
                            cmatrix: null
                        },
                        description: '離脱フラグ',
                        isInherit: true
                    },
                    {
                        key: 'category',
                        type: {
                            of: 'code[]',
                            cmatrix: null,
                            candidate: {
                                ns: [
                                    'catalog/model/category/share/actor',
                                    'catalog/built_in/category/share/actor',
                                    'catalog/ext/test-org/category/share/actor',
                                    'catalog/model/category/supply/actor',
                                    'catalog/built_in/category/supply/actor',
                                    'catalog/ext/test-org/category/supply/actor'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: null,
                        isInherit: true
                    },
                    {
                        key: 'consumer-cert',
                        type: {
                            of: 'inner',
                            inner: 'Certification',
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'データコンシューマー認定',
                        isInherit: true
                    },
                    {
                        key: 'data-trader-cert',
                        type: {
                            of: 'inner',
                            inner: 'Certification',
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'データ取引サービスプロバイダー認定',
                        isInherit: true
                    },
                    {
                        key: 'information-site',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '情報サイト',
                        isInherit: true
                    },
                    {
                        key: 'main-block',
                        type: {
                            of: 'code',
                            cmatrix: null,
                            candidate: {
                                ns: null,
                                _code: null,
                                base: {
                                    _value: 29,
                                    _ver: 1
                                }
                            }
                        },
                        description: 'アクター参加時に割り当てられたPXR-Block',
                        isInherit: true
                    },
                    {
                        key: 'other-block',
                        type: {
                            of: 'code[]',
                            cmatrix: null,
                            candidate: {
                                ns: null,
                                _code: null,
                                base: {
                                    _value: 29,
                                    _ver: 1
                                }
                            }
                        },
                        description: '他アクターから引き継いだPXR-Blockの配列',
                        isInherit: true
                    },
                    {
                        key: 'region-root-cert',
                        type: {
                            of: 'inner',
                            inner: 'Certification',
                            cmatrix: null,
                            candidate: null
                        },
                        description: '領域運営サービスプロバイダー認定',
                        isInherit: true
                    },
                    {
                        key: 'statement',
                        type: {
                            of: 'item[]',
                            cmatrix: null,
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
                        description: '組織ステートメント',
                        isInherit: true
                    },
                    {
                        key: 'status',
                        type: {
                            of: 'inner[]',
                            inner: 'CertStatus',
                            cmatrix: null,
                            candidate: null
                        },
                        description: '認定の履歴',
                        isInherit: true
                    },
                    {
                        key: 'wf-cert',
                        type: {
                            of: 'inner',
                            inner: 'Certification',
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'ワークフロープロバイダー認定',
                        isInherit: true
                    }
                ],
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
                                value: NULL
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
                    },
                    {
                        key: 'breakaway-flg',
                        value: false
                    }
                ],
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/ext/test-org/actor/region-root',
                    name: 'organization',
                    _code: {
                        _value: 1000002,
                        _ver: 1
                    },
                    inherit: {
                        _value: 49,
                        _ver: 1
                    },
                    description: 'organizationの定義です。'
                },
                template: {
                    _code: {
                        _value: 1000002,
                        _ver: 1
                    },
                    'breakaway-flg': false,
                    category: null,
                    'information-site': 'http://www.test-org.jp/organization/index.html',
                    'main-block': {
                        _value: 1000111,
                        _ver: 1
                    },
                    'other-block': null,
                    region: [
                        {
                            _value: 1000003,
                            _ver: 1
                        },
                        {
                            _value: 1000069,
                            _ver: 1
                        },
                        {
                            _value: 1000116,
                            _ver: 1
                        }
                    ],
                    statement: [
                        {
                            title: '組織ステートメント',
                            section: [
                                {
                                    title: 'ご挨拶',
                                    content: [
                                        {
                                            sentence: 'organizationの組織ステートメントです。'
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    status: [
                        {
                            status: 'certified',
                            by: {
                                _value: 1000001,
                                _ver: 1
                            },
                            at: '2020-01-01T00:00:00.000+0900'
                        }
                    ],
                    'trader-alliance': [
                        {
                            _value: 1000020,
                            _ver: 1
                        }
                    ]
                },
                prop: [
                    {
                        key: 'breakaway-flg',
                        type: {
                            of: 'boolean',
                            cmatrix: null
                        },
                        description: '離脱フラグ',
                        isInherit: true
                    },
                    {
                        key: 'category',
                        type: {
                            of: 'code[]',
                            cmatrix: null,
                            candidate: {
                                ns: [
                                    'catalog/model/category/share/actor',
                                    'catalog/built_in/category/share/actor',
                                    'catalog/ext/test-org/category/share/actor',
                                    'catalog/model/category/supply/actor',
                                    'catalog/built_in/category/supply/actor',
                                    'catalog/ext/test-org/category/supply/actor'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: null,
                        isInherit: true
                    },
                    {
                        key: 'information-site',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '情報サイト',
                        isInherit: true
                    },
                    {
                        key: 'main-block',
                        type: {
                            of: 'code',
                            cmatrix: null,
                            candidate: {
                                ns: null,
                                _code: null,
                                base: {
                                    _value: 29,
                                    _ver: 1
                                }
                            }
                        },
                        description: 'アクター参加時に割り当てられたPXR-Block',
                        isInherit: true
                    },
                    {
                        key: 'other-block',
                        type: {
                            of: 'code[]',
                            cmatrix: null,
                            candidate: {
                                ns: null,
                                _code: null,
                                base: {
                                    _value: 29,
                                    _ver: 1
                                }
                            }
                        },
                        description: '他アクターから引き継いだPXR-Blockの配列',
                        isInherit: true
                    },
                    {
                        key: 'region',
                        type: {
                            of: 'code[]',
                            cmatrix: null,
                            candidate: {
                                ns: null,
                                _code: null,
                                base: {
                                    _value: 48,
                                    _ver: 1
                                }
                            }
                        },
                        description: 'Region定義',
                        isInherit: true
                    },
                    {
                        key: 'statement',
                        type: {
                            of: 'item[]',
                            cmatrix: null,
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
                        description: '組織ステートメント',
                        isInherit: true
                    },
                    {
                        key: 'status',
                        type: {
                            of: 'inner[]',
                            inner: 'CertStatus',
                            cmatrix: null,
                            candidate: null
                        },
                        description: '認定の履歴',
                        isInherit: true
                    },
                    {
                        key: 'trader-alliance',
                        type: {
                            of: 'code[]',
                            cmatrix: null,
                            candidate: {
                                ns: null,
                                _code: null,
                                base: {
                                    _value: 38,
                                    _ver: 1
                                }
                            }
                        },
                        description: '提携するデータ取引サービスプロバイダーのコード配列',
                        isInherit: true
                    }
                ],
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
                    },
                    {
                        key: 'breakaway-flg',
                        value: false
                    }
                ],
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/ext/test-org/actor/region-root/actor_1000002/region',
                    name: 'テスト用リージョン',
                    _code: {
                        _value: 1000003,
                        _ver: 1
                    },
                    inherit: {
                        _value: 48,
                        _ver: 1
                    },
                    description: 'テスト用リージョンの定義です'
                },
                template: {
                    _code: {
                        _value: 1000003,
                        _ver: 1
                    },
                    'app-alliance': null,
                    'information-site': 'http://www.test-org.jp/organization/overview/research-projects/p02/index.html',
                    statement: [
                        {
                            title: 'リージョンステートメント',
                            section: [
                                {
                                    title: 'テスト用プロジェクト概要',
                                    content: [
                                        {
                                            sentence: 'リージョンステートメントです'
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    'wf-alliance': [
                        {
                            _value: 1000004,
                            _ver: 1
                        }
                    ]
                },
                prop: [
                    {
                        key: 'app-alliance',
                        type: {
                            of: 'code[]',
                            cmatrix: null,
                            candidate: {
                                ns: null,
                                _code: null,
                                base: {
                                    _value: 42,
                                    _ver: 1
                                }
                            }
                        },
                        description: 'Regionメンバー(アプリケーションプロバイダー)のコード配列',
                        isInherit: true
                    },
                    {
                        key: 'information-site',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'Regionの情報サイト',
                        isInherit: true
                    },
                    {
                        key: 'statement',
                        type: {
                            of: 'item[]',
                            cmatrix: null,
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
                        description: 'Regionステートメント',
                        isInherit: true
                    },
                    {
                        key: 'wf-alliance',
                        type: {
                            of: 'code[]',
                            cmatrix: null,
                            candidate: {
                                ns: null,
                                _code: null,
                                base: {
                                    _value: 47,
                                    _ver: 1
                                }
                            }
                        },
                        description: 'Regionメンバー(ワークフロープロバイダー)のコード配列',
                        isInherit: true
                    }
                ],
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
                ],
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/ext/test-org/actor/wf',
                    name: 'テスト用研究プロジェクト',
                    _code: {
                        _value: 1000004,
                        _ver: 1
                    },
                    inherit: {
                        _value: 47,
                        _ver: 1
                    },
                    description: 'テスト用研究プロジェクトです'
                },
                template: {
                    _code: {
                        _value: 1000004,
                        _ver: 1
                    },
                    'breakaway-flg': false,
                    category: null,
                    'information-site': '',
                    'main-block': {
                        _value: 1000112,
                        _ver: 1
                    },
                    'other-block': null,
                    'region-alliance': [
                        {
                            _value: 1000003,
                            _ver: 1
                        }
                    ],
                    statement: [
                        {
                            title: '組織ステートメント',
                            section: [
                                {
                                    title: 'ご挨拶',
                                    content: [
                                        {
                                            sentence: 'テスト用研究プロジェクトの組織ステートメントです。'
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    status: [
                        {
                            status: 'certified',
                            by: {
                                _value: 1000001,
                                _ver: 1
                            },
                            at: '2020-01-01T00:00:00.000+0900'
                        }
                    ],
                    workflow: [
                        {
                            _value: 1000007,
                            _ver: 1
                        }
                    ]
                },
                prop: [
                    {
                        key: 'breakaway-flg',
                        type: {
                            of: 'boolean',
                            cmatrix: null
                        },
                        description: '離脱フラグ',
                        isInherit: true
                    },
                    {
                        key: 'category',
                        type: {
                            of: 'code[]',
                            cmatrix: null,
                            candidate: {
                                ns: [
                                    'catalog/model/category/share/actor',
                                    'catalog/built_in/category/share/actor',
                                    'catalog/ext/test-org/category/share/actor',
                                    'catalog/model/category/supply/actor',
                                    'catalog/built_in/category/supply/actor',
                                    'catalog/ext/test-org/category/supply/actor'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: null,
                        isInherit: true
                    },
                    {
                        key: 'information-site',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: '情報サイト',
                        isInherit: true
                    },
                    {
                        key: 'main-block',
                        type: {
                            of: 'code',
                            cmatrix: null,
                            candidate: {
                                ns: null,
                                _code: null,
                                base: {
                                    _value: 29,
                                    _ver: 1
                                }
                            }
                        },
                        description: 'アクター参加時に割り当てられたPXR-Block',
                        isInherit: true
                    },
                    {
                        key: 'other-block',
                        type: {
                            of: 'code[]',
                            cmatrix: null,
                            candidate: {
                                ns: null,
                                _code: null,
                                base: {
                                    _value: 29,
                                    _ver: 1
                                }
                            }
                        },
                        description: '他アクターから引き継いだPXR-Blockの配列',
                        isInherit: true
                    },
                    {
                        key: 'region-alliance',
                        type: {
                            of: 'code[]',
                            cmatrix: null,
                            candidate: {
                                ns: null,
                                _code: null,
                                base: {
                                    _value: 48,
                                    _ver: 1
                                }
                            }
                        },
                        description: '参加している領域運営サービスプロバイダーコード配列',
                        isInherit: true
                    },
                    {
                        key: 'statement',
                        type: {
                            of: 'item[]',
                            cmatrix: null,
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
                        description: '組織ステートメント',
                        isInherit: true
                    },
                    {
                        key: 'status',
                        type: {
                            of: 'inner[]',
                            inner: 'CertStatus',
                            cmatrix: null,
                            candidate: null
                        },
                        description: '認定の履歴',
                        isInherit: true
                    },
                    {
                        key: 'workflow',
                        type: {
                            of: 'code[]',
                            cmatrix: null,
                            candidate: {
                                ns: null,
                                _code: null,
                                base: {
                                    _value: 46,
                                    _ver: 1
                                }
                            }
                        },
                        description: 'ワークフロー定義の配列',
                        isInherit: true
                    }
                ],
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
                    },
                    {
                        key: 'breakaway-flg',
                        value: false
                    }
                ],
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/ext/test-org/actor/wf/actor_1000004/role',
                    name: '研究員',
                    _code: {
                        _value: 1000005,
                        _ver: 1
                    },
                    inherit: {
                        _value: 43,
                        _ver: 1
                    },
                    description: 'テスト用研究プロジェクトの研究員です。'
                },
                template: {
                    _code: {
                        _value: 1000005,
                        _ver: 1
                    },
                    document: null,
                    event: null,
                    licence: null,
                    thing: null
                },
                prop: [
                    {
                        key: 'document',
                        type: {
                            of: 'code[]',
                            cmatrix: null,
                            candidate: {
                                ns: [
                                    'catalog/model/document/*',
                                    'catalog/built_in/document/*',
                                    'catalog/ext/test-org/document/*'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: '作成可能なドキュメント',
                        isInherit: true
                    },
                    {
                        key: 'event',
                        type: {
                            of: 'code[]',
                            cmatrix: null,
                            candidate: {
                                ns: [
                                    'catalog/model/event/*',
                                    'catalog/built_in/event/*',
                                    'catalog/ext/test-org/event/*'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: '作成可能なイベント',
                        isInherit: true
                    },
                    {
                        key: 'licence',
                        type: {
                            of: 'code[]',
                            cmatrix: null,
                            candidate: {
                                ns: [
                                    'catalog/model/licence',
                                    'catalog/built_in/licence',
                                    'catalog/ext/test-org/licence'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: '所持ライセンス',
                        isInherit: true
                    },
                    {
                        key: 'thing',
                        type: {
                            of: 'code[]',
                            cmatrix: null,
                            candidate: {
                                ns: [
                                    'catalog/model/thing/*',
                                    'catalog/built_in/thing/*',
                                    'catalog/ext/test-org/thing/*'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: '作成可能なモノ',
                        isInherit: true
                    }
                ],
                value: NULL,
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/ext/test-org/actor/wf/actor_1000004/store',
                    name: 'テスト用研究プロジェクトが蓄積可能なデータ',
                    _code: {
                        _value: 1000006,
                        _ver: 1
                    },
                    inherit: {
                        _value: 44,
                        _ver: 1
                    },
                    description: 'テスト用研究プロジェクトが蓄積可能なデータ定義です。'
                },
                template: {
                    _code: {
                        _value: 1000006,
                        _ver: 1
                    },
                    store: [
                        {
                            role: [
                                {
                                    _value: 1000005,
                                    _ver: 1
                                }
                            ],
                            event: [
                                {
                                    _value: 1000009,
                                    _ver: 1
                                },
                                {
                                    _value: 1000008,
                                    _ver: 1
                                }
                            ],
                            thing: [
                                {
                                    _value: 1000010,
                                    _ver: 1
                                },
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
                                    _value: 1000014,
                                    _ver: 1
                                },
                                {
                                    _value: 1000015,
                                    _ver: 1
                                },
                                {
                                    _value: 1000016,
                                    _ver: 1
                                },
                                {
                                    _value: 1000017,
                                    _ver: 1
                                },
                                {
                                    _value: 1000018,
                                    _ver: 1
                                },
                                {
                                    _value: 1000019,
                                    _ver: 1
                                },
                                {
                                    _value: 1000037,
                                    _ver: 1
                                },
                                {
                                    _value: 1000038,
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
                            ]
                        }
                    ]
                },
                prop: [
                    {
                        key: 'store',
                        type: {
                            of: 'inner[]',
                            inner: 'Store',
                            cmatrix: null,
                            candidate: null
                        },
                        description: '蓄積定義',
                        isInherit: true
                    }
                ],
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
                ],
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/ext/test-org/actor/wf/actor_1000004/workflow',
                    name: 'テスト用研究プロジェクト',
                    _code: {
                        _value: 1000007,
                        _ver: 1
                    },
                    inherit: {
                        _value: 46,
                        _ver: 1
                    },
                    description: 'テスト用研究プロジェクトの定義です。'
                },
                template: {
                    _code: {
                        _value: 1000007,
                        _ver: 1
                    },
                    'information-site': '',
                    share: [
                        {
                            _value: 1000384,
                            _ver: 1
                        }
                    ],
                    store: [
                        {
                            _value: 1000006,
                            _ver: 1
                        }
                    ]
                },
                prop: [
                    {
                        key: 'information-site',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'ワークフローの情報サイト',
                        isInherit: true
                    },
                    {
                        key: 'share',
                        type: {
                            of: 'code[]',
                            cmatrix: null,
                            candidate: {
                                ns: null,
                                _code: null,
                                base: {
                                    _value: 45,
                                    _ver: 1
                                }
                            }
                        },
                        description: 'ワークフローが提供する状態共有機能の定義',
                        isInherit: true
                    },
                    {
                        key: 'store',
                        type: {
                            of: 'code[]',
                            cmatrix: null,
                            candidate: {
                                ns: null,
                                _code: null,
                                base: {
                                    _value: 44,
                                    _ver: 1
                                }
                            }
                        },
                        description: 'ワークフローが蓄積可能なデータの定義',
                        isInherit: true
                    }
                ],
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
                ],
                attribute: null
            },
            {
                catalogItem: {
                    ns: 'catalog/ext/test-org/event/actor_1000004',
                    name: '個人が日常生活を送る',
                    _code: {
                        _value: 1000008,
                        _ver: 1
                    },
                    inherit: {
                        _value: 53,
                        _ver: 1
                    },
                    description: {
                        title: 'テスト用研究プロジェクトのイベント（個人が日常生活を送る）の定義です。',
                        section: [
                            {
                                title: '収集時期・期間',
                                content: {
                                    sentence: '収集時期・期間を記載します。'
                                }
                            },
                            {
                                title: '収集場所',
                                content: {
                                    sentence: '収集場所を記載します。'
                                }
                            },
                            {
                                title: '収集対象者',
                                content: {
                                    sentence: '収集対象者を記載します。'
                                }
                            },
                            {
                                title: '収集単位',
                                content: {
                                    sentence: '収集単位を記載します。'
                                }
                            },
                            {
                                title: '研究目的',
                                content: {
                                    sentence: '研究目的を記載します。'
                                }
                            },
                            {
                                title: '収集データ種類・センサ仕様',
                                content: {
                                    sentence: '収集データ種類・センサ仕様を記載します。'
                                }
                            },
                            {
                                title: '収集データ数',
                                content: {
                                    sentence: '収集データ数を記載します。'
                                }
                            },
                            {
                                title: '１イベントの開始～終了時刻',
                                content: {
                                    sentence: '１イベントの開始～終了時刻を記載します。'
                                }
                            }
                        ]
                    }
                },
                template: {
                    _code: {
                        _value: 1000008,
                        _ver: 1
                    },
                    app: null,
                    code: {
                        index: '3_1_2',
                        value: {
                            _value: 1000008,
                            _ver: 1
                        }
                    },
                    end: {
                        index: '3_2_2',
                        value: NULL
                    },
                    env: null,
                    id: {
                        index: '3_1_1',
                        value: NULL
                    },
                    location: {
                        index: '3_3_1',
                        value: NULL
                    },
                    sourceId: null,
                    start: {
                        index: '3_2_1',
                        value: NULL
                    },
                    thing: null,
                    wf: {
                        code: {
                            index: '3_5_1',
                            value: {
                                _value: 1000004,
                                _ver: 1
                            }
                        },
                        wf: {
                            index: '3_5_2',
                            value: {
                                _value: 1000007,
                                _ver: 1
                            }
                        }
                    }
                },
                prop: [
                    {
                        key: 'app',
                        type: {
                            of: 'inner',
                            inner: 'App',
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'イベントを発生させたアプリケーションプロバイダー',
                        isInherit: true
                    },
                    {
                        key: 'code',
                        type: {
                            of: 'item',
                            _code: {
                                _value: 18,
                                _ver: 1
                            },
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'イベント種別',
                        isInherit: true
                    },
                    {
                        key: 'end',
                        type: {
                            of: 'item',
                            _code: {
                                _value: 20,
                                _ver: 1
                            },
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'イベント終了時刻',
                        isInherit: true
                    },
                    {
                        key: 'env',
                        type: {
                            of: 'item[]',
                            cmatrix: null,
                            candidate: {
                                ns: [
                                    'catalog/model/env/event/*',
                                    'catalog/built_in/env/event/*',
                                    'catalog/ext/test-org/env/event/*'
                                ],
                                _code: null,
                                base: null
                            }
                        },
                        description: 'イベント環境の配列',
                        isInherit: true
                    },
                    {
                        key: 'id',
                        type: {
                            of: 'item',
                            _code: {
                                _value: 17,
                                _ver: 1
                            },
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'イベント識別子',
                        isInherit: true
                    },
                    {
                        key: 'location',
                        type: {
                            of: 'item',
                            _code: {
                                _value: 21,
                                _ver: 1
                            },
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'イベント発生位置',
                        isInherit: true
                    },
                    {
                        key: 'sourceId',
                        type: {
                            of: 'string',
                            cmatrix: null,
                            format: null,
                            unit: null,
                            candidate: null
                        },
                        description: 'イベントのソースID',
                        isInherit: true
                    },
                    {
                        key: 'start',
                        type: {
                            of: 'item',
                            _code: {
                                _value: 19,
                                _ver: 1
                            },
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'イベント開始時刻',
                        isInherit: true
                    },
                    {
                        key: 'thing',
                        type: {
                            of: 'item[]',
                            cmatrix: null,
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
                        description: 'モノの配列',
                        isInherit: false
                    },
                    {
                        key: 'wf',
                        type: {
                            of: 'inner',
                            inner: 'Wf',
                            cmatrix: null,
                            candidate: null
                        },
                        description: 'イベントを発生させたワークフロープロバイダー',
                        isInherit: true
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
                ],
                attribute: null
            }
        ];
}
