/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/**
 * 変更セットリクエスト
 */
export namespace UpdateSetRequest {
    export const addlist: {}[] =
    [
        {
            name: '新規変更セット名',
            description: '新規変更セット(説明)',
            type: 0,
            ns: [
                {
                    type: 1,
                    nsId: null,
                    comment: null,
                    template: {
                        ns: 'catalog/model/unit',
                        description: 'ユニットテストネームスペース'
                    }
                }
            ],
            catalog: null,
            appendix: 'unittest'
        },
        {
            name: '新規変更セット名',
            description: '新規変更セット(説明)',
            type: 0,
            ns: [
                {
                    type: 1,
                    nsId: null,
                    comment: null,
                    template: {
                        ns: 'catalog/model/document',
                        description: 'ユニットテストネームスペース'
                    }
                }
            ],
            catalog: [
                {
                    type: 1,
                    catalogCode: null,
                    comment: null,
                    template: {
                        catalogItem: {
                            ns: 'catalog/model/document',
                            name: 'document',
                            description: 'ドキュメント',
                            _code: {
                                _value: 9665,
                                _ver: 1
                            },
                            inherit: null
                        },
                        template: {
                            prop: null,
                            value: null
                        },
                        inner: null
                    }
                }
            ],
            appendix: null
        },
        {
            name: '新規変更セット名',
            description: '新規変更セット(説明)',
            type: 0,
            ns: [
                {
                    type: 1,
                    nsId: null,
                    comment: null,
                    template: {
                        ns: 'catalog/model/thing',
                        description: 'ユニットテストネームスペース'
                    }
                }
            ],
            catalog: null,
            appendix: null
        },
        {
            name: '新規変更セット名',
            description: '新規変更セット(説明)',
            type: 0,
            ns: [
                {
                    type: 1,
                    nsId: null,
                    comment: null,
                    template: {
                        ns: 'catalog/model/unit',
                        description: 'ユニットテストネームスペース'
                    }
                }
            ],
            catalog: null,
            appendix: null
        },
        {
            name: '新規変更セット名',
            description: '新規変更セット(説明)',
            type: 0,
            ns: [
                {
                    type: 1,
                    nsId: null,
                    comment: null,
                    template: {
                        ns: 'catalog/model/unit',
                        description: 'ユニットテストネームスペース'
                    }
                }
            ],
            catalog: null,
            appendix: null
        },
        {
            name: '新規変更セット名',
            description: '新規変更セット(説明)',
            type: 0,
            ns: [
                {
                    type: 1,
                    nsId: null,
                    comment: null,
                    template: {
                        ns: 'catalog/model/unit',
                        description: 'ユニットテストネームスペース'
                    }
                }
            ],
            catalog: null,
            appendix: null
        },
        {
            name: '新規変更セット名',
            description: '新規変更セット(説明)',
            type: 0,
            ns: [
                {
                    type: 2,
                    nsId: 1,
                    comment: null,
                    template: {
                        ns: 'catalog/built_in/unit/update',
                        description: 'ユニットテストネームスペース'
                    }
                }
            ],
            catalog: null,
            appendix: null
        },
        {
            name: '新規変更セット名',
            description: '新規変更セット(説明)',
            type: 0,
            ns: [
                {
                    type: 3,
                    nsId: 1,
                    comment: null,
                    template: null
                }
            ],
            catalog: null,
            appendix: null
        },
        {
            name: '新規変更セット名',
            description: '新規変更セット(説明)',
            type: 0,
            ns: [
                {
                    type: 1,
                    nsId: null,
                    comment: null,
                    template: {
                        ns: 'catalog/ext/unit/catalog',
                        description: 'ユニットテストネームスペース'
                    }
                }
            ],
            catalog: [
                {
                    type: 1,
                    catalogCode: null,
                    comment: null,
                    template: {
                        catalogItem: {
                            ns: 'catalog/ext/unit/catalog',
                            name: 'cm',
                            description: 'センチメートル',
                            _code: {
                                _value: 1000012,
                                _ver: 1
                            },
                            inherit: null
                        },
                        template: {
                            prop: null,
                            value: null
                        },
                        inner: null
                    }
                }
            ],
            appendix: null
        },
        {
            name: '新規変更セット名',
            description: '新規変更セット(説明)',
            type: 0,
            ns: [
                {
                    type: 1,
                    nsId: null,
                    comment: null,
                    template: {
                        ns: 'catalog/model/unit/catalog/update',
                        description: 'ユニットテストネームスペース'
                    }
                }
            ],
            catalog: [
                {
                    type: 2,
                    catalogCode: 11,
                    comment: null,
                    template: {
                        catalogItem: {
                            ns: 'catalog/model/unit/catalog/update',
                            name: 'cm',
                            description: 'センチメートル',
                            _code: {
                                _value: 11,
                                _ver: 2
                            },
                            inherit: null
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
                                                    _value: 46,
                                                    _ver: 1
                                                }
                                            ],
                                            base: null
                                        }
                                    },
                                    description: 'モノの配列'
                                }
                            ],
                            value: []
                        },
                        inner: null
                    }
                }
            ],
            appendix: null
        },
        {
            name: '新規変更セット名',
            description: '新規変更セット(説明)',
            type: 0,
            ns: [
                {
                    type: 1,
                    nsId: null,
                    comment: null,
                    template: {
                        ns: 'catalog/model/unit/multi/1',
                        description: 'ユニットテストネームスペース1'
                    }
                },
                {
                    type: 1,
                    nsId: null,
                    comment: null,
                    template: {
                        ns: 'catalog/model/unit/multi/2',
                        description: 'ユニットテストネームスペース2'
                    }
                }
            ],
            catalog: null,
            appendix: null
        },
        {
            name: '新規変更セット名',
            description: '新規変更セット(説明)',
            type: 0,
            ns: [
                {
                    type: 1,
                    nsId: null,
                    comment: null,
                    template: {
                        ns: 'catalog/model/unit/multi/3',
                        description: 'ユニットテストネームスペース3'
                    }
                },
                {
                    type: 1,
                    nsId: null,
                    comment: null,
                    template: {
                        ns: 'catalog/model/unit/multi/4',
                        description: 'ユニットテストネームスペース4'
                    }
                }
            ],
            catalog: [
                {
                    type: 1,
                    catalogCode: 21,
                    comment: null,
                    template: {
                        catalogItem: {
                            ns: 'catalog/model/unit/multi/3',
                            name: 'cm',
                            description: 'センチメートル',
                            _code: {
                                _value: 21,
                                _ver: 1
                            },
                            inherit: null
                        },
                        template: {
                            prop: null,
                            value: null
                        },
                        inner: null
                    }
                },
                {
                    type: 1,
                    catalogCode: 22,
                    comment: null,
                    template: {
                        catalogItem: {
                            ns: 'catalog/model/unit/multi/4',
                            name: 'cm',
                            description: 'センチメートル',
                            _code: {
                                _value: 22,
                                _ver: 1
                            },
                            inherit: null
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
                                                    _value: 11,
                                                    _ver: 1
                                                },
                                                {
                                                    _value: 21,
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
                                            value: 11
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
                                                    value: 21
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
                        inner: null
                    }
                }
            ],
            appendix: null
        },
        {
            name: '新規変更セット名',
            description: '新規変更セット(説明)',
            type: 0,
            ns: [
                {
                    type: 1,
                    nsId: null,
                    comment: null,
                    template: {
                        ns: 'catalog/model/unit/auto',
                        description: 'ユニットテストネームスペース'
                    }
                }
            ],
            catalog: [
                {
                    type: 1,
                    catalogCode: null,
                    comment: null,
                    template: {
                        catalogItem: {
                            ns: 'catalog/model/unit/auto',
                            name: 'cm',
                            description: 'センチメートル',
                            _code: {
                                _value: -1,
                                _ver: 1
                            },
                            inherit: null
                        },
                        template: {
                            prop: null,
                            value: null
                        },
                        inner: null
                    }
                },
                {
                    type: 1,
                    catalogCode: null,
                    comment: null,
                    template: {
                        catalogItem: {
                            ns: 'catalog/model/unit/auto',
                            name: 'cm',
                            description: 'センチメートル',
                            _code: {
                                _value: -2,
                                _ver: 1
                            },
                            inherit: {
                                _value: -1,
                                _ver: 1
                            }
                        },
                        template: {
                            prop: null,
                            value: null
                        },
                        inner: null
                    }
                }
            ],
            appendix: null
        },
        {
            name: '新規変更セット名',
            description: '新規変更セット(説明)',
            type: 0,
            ns: [
                {
                    type: 1,
                    nsId: null,
                    comment: null,
                    template: {
                        ns: 'catalog/model/unit/auto2',
                        description: 'ユニットテストネームスペース'
                    }
                }
            ],
            catalog: [
                {
                    type: 1,
                    catalogCode: null,
                    comment: null,
                    template: {
                        catalogItem: {
                            ns: 'catalog/model/unit/auto2',
                            name: 'cm',
                            description: 'センチメートル',
                            _code: {
                                _value: -1,
                                _ver: 1
                            },
                            inherit: null
                        },
                        template: {
                            prop: null,
                            value: null
                        },
                        inner: null
                    }
                },
                {
                    type: 2,
                    catalogCode: 11,
                    comment: null,
                    template: {
                        catalogItem: {
                            ns: 'catalog/model/unit/auto2',
                            name: 'cm',
                            description: 'センチメートル',
                            _code: {
                                _value: 11,
                                _ver: null
                            },
                            inherit: {
                                _value: -1,
                                _ver: 1
                            }
                        },
                        template: {
                            prop: null,
                            value: null
                        },
                        inner: null
                    }
                }
            ],
            appendix: null
        },
        {
            name: '新規変更セット名',
            description: '新規変更セット(説明)',
            type: 0,
            ns: [
                {
                    type: 1,
                    nsId: null,
                    comment: null,
                    template: {
                        ns: 'catalog/model/unit/null',
                        description: 'ユニットテストネームスペース'
                    }
                }
            ],
            catalog: [
                {
                    type: 1,
                    catalogCode: null,
                    comment: null,
                    template: {
                        catalogItem: {
                            ns: 'catalog/model/unit/null',
                            name: 'cm',
                            description: 'センチメートル',
                            _code: {
                                _value: null,
                                _ver: null
                            },
                            inherit: null
                        },
                        template: {
                            prop: null,
                            value: null
                        },
                        inner: null
                    }
                }
            ],
            appendix: null
        },
        {
            name: '新規変更セット名',
            description: '新規変更セット(説明)',
            type: 0,
            ns: [
                {
                    type: 1,
                    nsId: null,
                    comment: null,
                    template: {
                        ns: 'catalog/model/unit/base/null',
                        description: 'ユニットテストネームスペース'
                    }
                }
            ],
            catalog: [
                {
                    type: 1,
                    catalogCode: null,
                    comment: null,
                    template: {
                        catalogItem: {
                            ns: 'catalog/model/unit/base/null',
                            name: 'cm',
                            description: 'センチメートル',
                            _code: null,
                            inherit: null
                        },
                        template: {
                            prop: null,
                            value: null
                        },
                        inner: null
                    }
                }
            ],
            appendix: null
        },
        {
            name: '新規変更セット名',
            description: '新規変更セット(説明)',
            type: 0,
            ns: null,
            catalog: [
                {
                    type: 3,
                    catalogCode: 11,
                    comment: null,
                    template: null
                }
            ],
            appendix: null
        },
        {
            name: '新規変更セット',
            description: '新規属性変更セット(追加)',
            type: 0,
            ns: null,
            catalog: null,
            attribute: [
                {
                    type: 1,
                    catalogCode: 46,
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
                                ns: 'catalog/ext/aaa-healthcare-consortium/setting/global',
                                values: [
                                    {
                                        _value: 124124,
                                        _ver: 1
                                    }
                                ]
                            }
                        ]
                    }
                }
            ],
            appendix: null
        },
        {
            name: '新規変更セット',
            description: '新規属性変更セット(複数追加)',
            type: 0,
            ns: null,
            catalog: null,
            attribute: [
                {
                    type: 1,
                    catalogCode: 30001,
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
                                ns: 'catalog/ext/aaa-healthcare-consortium/setting/global',
                                values: [
                                    {
                                        _value: 124124,
                                        _ver: 1
                                    }
                                ]
                            }
                        ]
                    }
                },
                {
                    type: 1,
                    catalogCode: 11,
                    attribute: {
                        objects: [
                            {
                                key: {
                                    _value: 1111,
                                    _ver: 1
                                },
                                value: {
                                    company: {
                                        _value: 133332,
                                        _ver: 1
                                    },
                                    'manufacturing-name': 'テスト用製品',
                                    'model-number': 'Test'
                                },
                                description: 'テスト用'
                            }
                        ]
                    }
                }
            ],
            appendix: null
        },
        {
            name: '新規変更セット',
            description: '新規属性変更セット(更新)',
            type: 0,
            ns: null,
            catalog: null,
            attribute: [
                {
                    type: 2,
                    catalogCode: 46,
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
                                ns: 'catalog/ext/aaa-healthcare-consortium/setting/global',
                                values: [
                                    {
                                        _value: 124124,
                                        _ver: 1
                                    }
                                ]
                            }
                        ]
                    }
                }
            ],
            appendix: null
        },
        {
            name: '新規変更セット',
            description: '新規属性変更セット(削除)',
            type: 0,
            ns: null,
            catalog: null,
            attribute: [
                {
                    type: 3,
                    catalogCode: 46,
                    attribute: {}
                }
            ],
            appendix: null
        },
        {
            name: '新規変更セット名',
            description: '新規変更セット(説明)',
            type: 0,
            ns: [
                {
                    type: 1,
                    nsId: null,
                    comment: null,
                    template: {
                        ns: 'catalog/built_in/unit/test',
                        description: 'ユニットテストネームスペース'
                    }
                }
            ],
            catalog: [
                {
                    type: 1,
                    catalogCode: null,
                    comment: null,
                    template: {
                        catalogItem: {
                            ns: 'catalog/built_in/unit/test',
                            name: 'initial',
                            description: 'スコープ内で1番目のカタログ',
                            _code: {
                                _value: null,
                                _ver: null
                            },
                            inherit: null
                        },
                        template: {
                            prop: null,
                            value: null
                        },
                        inner: null
                    }
                }
            ],
            appendix: 'unittest'
        }
    ];
    export const addErrorlist: {}[] =
    [
        {
            name: '新規変更セット名',
            description: '新規変更セット(説明)',
            type: 0,
            ns: [
                {
                    type: 1,
                    nsId: null,
                    comment: null,
                    template: {
                        ns: 'catalog/model/unit',
                        description: 'ユニットテストネームスペース'
                    }
                }
            ],
            catalog: null,
            appendix: null
        },
        {
            name: '新規変更セット名',
            description: '新規変更セット(説明)',
            type: 0,
            ns: [
                {
                    type: 1,
                    nsId: null,
                    comment: null,
                    template: {
                        ns: 'catalog/model/unit',
                        description: 'ユニットテストネームスペース'
                    }
                }
            ],
            catalog: null,
            appendix: null
        },
        {
            name: '新規変更セット名',
            description: '新規変更セット(説明)',
            type: 0,
            ns: [
                {
                    type: 1,
                    nsId: null,
                    comment: null,
                    template: {
                        ns: 'catalog/model/unit',
                        description: 'ユニットテストネームスペース'
                    }
                }
            ],
            catalog: null,
            appendix: null
        },
        {
            name: '新規変更セット名',
            description: '新規変更セット(説明)',
            type: 0,
            ns: [
                {
                    type: 1,
                    nsId: null,
                    comment: null,
                    template: {
                        ns: 'catalog/model/unit',
                        description: 'ユニットテストネームスペース'
                    }
                }
            ],
            catalog: null,
            appendix: null
        },
        {
            name: '新規変更セット名',
            description: '新規変更セット(説明)',
            type: 0,
            ns: [
                {
                    type: 1,
                    nsId: null,
                    comment: null,
                    template: {
                        ns: 'catalog/model/unit',
                        description: 'ユニットテストネームスペース'
                    }
                }
            ],
            catalog: null,
            appendix: null
        },
        {
            name: '新規変更セット名',
            description: '新規変更セット(説明)',
            type: 0,
            ns: [
                {
                    type: 1,
                    nsId: null,
                    comment: null,
                    template: {
                        ns: 'catalog/model/unit',
                        description: 'ユニットテストネームスペース'
                    }
                }
            ],
            catalog: null,
            appendix: null
        },
        {
            name: '新規変更セット名',
            description: '新規変更セット(説明)',
            type: 0,
            ns: [
                {
                    type: 1,
                    nsId: null,
                    comment: null,
                    template: {
                        ns: 'catalog/model/unit',
                        description: 'ユニットテストネームスペース'
                    }
                }
            ],
            catalog: null,
            appendix: null
        },
        {
            description: '新規変更セット(説明)',
            type: 0,
            ns: [
                {
                    type: 1,
                    nsId: null,
                    comment: null,
                    template: {
                        ns: 'catalog/model/unit',
                        description: 'ユニットテストネームスペース'
                    }
                }
            ],
            catalog: [
                {
                    type: 1,
                    catalogCode: null,
                    comment: null,
                    template: {
                        catalogItem: {
                            ns: 'catalog/model/unit',
                            name: 'cm',
                            description: 'センチメートル',
                            _code: {
                                _value: 1,
                                _ver: 1
                            },
                            inherit: null
                        },
                        template: {
                            prop: null,
                            value: null
                        },
                        inner: null
                    }
                }
            ],
            appendix: null
        },
        {
            name: '新規変更セット名',
            type: 0,
            ns: [
                {
                    type: 1,
                    nsId: null,
                    comment: null,
                    template: {
                        ns: 'catalog/model/unit',
                        description: 'ユニットテストネームスペース'
                    }
                }
            ],
            catalog: [
                {
                    type: 1,
                    catalogCode: null,
                    comment: null,
                    template: {
                        catalogItem: {
                            ns: 'catalog/model/unit',
                            name: 'cm',
                            description: 'センチメートル',
                            _code: {
                                _value: 1,
                                _ver: 1
                            },
                            inherit: null
                        },
                        template: {
                            prop: null,
                            value: null
                        },
                        inner: null
                    }
                }
            ],
            appendix: null
        },
        {
            name: '新規変更セット名',
            description: '新規変更セット(説明)',
            type: 0,
            catalog: [
                {
                    type: 1,
                    catalogCode: null,
                    comment: null,
                    template: {
                        catalogItem: {
                            ns: 'catalog/model/unit',
                            name: 'cm',
                            description: 'センチメートル',
                            _code: {
                                _value: 1,
                                _ver: 1
                            },
                            inherit: null
                        },
                        template: {
                            prop: null,
                            value: null
                        },
                        inner: null
                    }
                }
            ],
            appendix: null
        },
        {
            name: '新規変更セット名',
            description: '新規変更セット(説明)',
            type: 0,
            ns: [
                {
                    type: 1,
                    nsId: null,
                    comment: null,
                    template: {
                        ns: 'catalog/model/unit',
                        description: 'ユニットテストネームスペース'
                    }
                }
            ],
            catalog: null,
            appendix: null
        },
        {
            name: null,
            description: '新規変更セット(説明)',
            type: 0,
            ns: [
                {
                    type: 1,
                    nsId: null,
                    comment: null,
                    template: {
                        ns: 'catalog/model/unit',
                        description: 'ユニットテストネームスペース'
                    }
                }
            ],
            catalog: [
                {
                    type: 1,
                    catalogCode: null,
                    comment: null,
                    template: {
                        catalogItem: {
                            ns: 'catalog/model/unit',
                            name: 'cm',
                            description: 'センチメートル',
                            _code: {
                                _value: 1,
                                _ver: 1
                            },
                            inherit: null
                        },
                        template: {
                            prop: null,
                            value: null
                        },
                        inner: null
                    }
                }
            ],
            appendix: null
        },
        {
            name: '新規変更セット名',
            description: null,
            type: 0,
            ns: [
                {
                    type: 1,
                    nsId: null,
                    comment: null,
                    template: {
                        ns: 'catalog/model/unit',
                        description: 'ユニットテストネームスペース'
                    }
                }
            ],
            catalog: [
                {
                    type: 1,
                    catalogCode: null,
                    comment: null,
                    template: {
                        catalogItem: {
                            ns: 'catalog/model/unit',
                            name: 'cm',
                            description: 'センチメートル',
                            _code: {
                                _value: 1,
                                _ver: 1
                            },
                            inherit: null
                        },
                        template: {
                            prop: null,
                            value: null
                        },
                        inner: null
                    }
                }
            ],
            appendix: null
        },
        {
            name: '新規変更セット名',
            description: '新規変更セット(説明)',
            type: 0,
            ns: null,
            catalog: [
                {
                    type: 1,
                    catalogCode: null,
                    comment: null,
                    template: {
                        catalogItem: {
                            ns: 'catalog/model/unit',
                            name: 'cm',
                            description: 'センチメートル',
                            _code: {
                                _value: 1,
                                _ver: 1
                            },
                            inherit: null
                        },
                        template: {
                            prop: null,
                            value: null
                        },
                        inner: null
                    }
                }
            ],
            appendix: null
        },
        {
            name: '新規変更セット名',
            description: '新規変更セット(説明)',
            type: 0,
            ns: [
                {
                    type: 1,
                    nsId: null,
                    comment: null,
                    template: {
                        ns: 'catalog/model/unit',
                        description: 'ユニットテストネームスペース'
                    }
                }
            ],
            catalog: null,
            appendix: null
        },
        {
            name: 1,
            description: '新規変更セット(説明)',
            type: 0,
            ns: [
                {
                    type: 1,
                    nsId: null,
                    comment: null,
                    template: {
                        ns: 'catalog/model/unit',
                        description: 'ユニットテストネームスペース'
                    }
                }
            ],
            catalog: [
                {
                    type: 1,
                    catalogCode: null,
                    comment: null,
                    template: {
                        catalogItem: {
                            ns: 'catalog/model/unit',
                            name: 'cm',
                            description: 'センチメートル',
                            _code: {
                                _value: 1,
                                _ver: 1
                            },
                            inherit: null
                        },
                        template: {
                            prop: null,
                            value: null
                        },
                        inner: null
                    }
                }
            ],
            appendix: null
        },
        {
            name: '新規変更セット',
            description: 1,
            type: 0,
            ns: [
                {
                    type: 1,
                    nsId: null,
                    comment: null,
                    template: {
                        ns: 'catalog/model/unit',
                        description: 'ユニットテストネームスペース'
                    }
                }
            ],
            catalog: [
                {
                    type: 1,
                    catalogCode: null,
                    comment: null,
                    template: {
                        catalogItem: {
                            ns: 'catalog/model/unit',
                            name: 'cm',
                            description: 'センチメートル',
                            _code: {
                                _value: 1,
                                _ver: 1
                            },
                            inherit: null
                        },
                        template: {
                            prop: null,
                            value: null
                        },
                        inner: null
                    }
                }
            ],
            appendix: null
        },
        {
            name: '新規変更セット',
            description: '新規変更セット(説明)',
            type: 0,
            ns: {
                type: 1,
                nsId: null,
                comment: null,
                template: {
                    ns: 'catalog/model/unit',
                    description: 'ユニットテストネームスペース'
                }
            },
            catalog: [
                {
                    type: 1,
                    catalogCode: null,
                    comment: null,
                    template: {
                        catalogItem: {
                            ns: 'catalog/model/unit',
                            name: 'cm',
                            description: 'センチメートル',
                            _code: {
                                _value: 1,
                                _ver: 1
                            },
                            inherit: null
                        },
                        template: {
                            prop: null,
                            value: null
                        },
                        inner: null
                    }
                }
            ],
            appendix: null
        },
        {
            name: '新規変更セット',
            description: '新規変更セット(説明)',
            type: 0,
            ns: [
                {
                    type: 1,
                    nsId: null,
                    comment: null,
                    template: {
                        ns: 'catalog/model/unit',
                        description: 'ユニットテストネームスペース'
                    }
                }
            ],
            catalog: {
                type: 1,
                catalogCode: null,
                comment: null,
                template: {
                    catalogItem: {
                        ns: 'catalog/model/unit',
                        name: 'cm',
                        description: 'センチメートル',
                        _code: {
                            _value: 1,
                            _ver: 1
                        },
                        inherit: null
                    },
                    template: {
                        prop: null,
                        value: null
                    },
                    inner: null
                }
            },
            appendix: null
        },
        {
            name: '新規変更セット',
            description: '新規変更セット(説明)',
            type: 0,
            ns: [
                {
                    type: 2,
                    nsId: null,
                    comment: null,
                    template: {
                        ns: 'catalog/model/unit',
                        description: 'ユニットテストネームスペース'
                    }
                }
            ],
            catalog: [
                {
                    type: 1,
                    catalogCode: null,
                    comment: null,
                    template: {
                        catalogItem: {
                            ns: 'catalog/model/unit',
                            name: 'cm',
                            description: 'センチメートル',
                            _code: {
                                _value: 1,
                                _ver: 1
                            },
                            inherit: null
                        },
                        template: {
                            prop: null,
                            value: null
                        },
                        inner: null
                    }
                }
            ],
            appendix: null
        },
        {
            name: '新規変更セット',
            description: '新規変更セット(説明)',
            type: 0,
            ns: [
                {
                    type: 1,
                    nsId: null,
                    comment: null,
                    template: {
                        ns: 'catalog/model/unit',
                        description: 'ユニットテストネームスペース'
                    }
                }
            ],
            catalog: [
                {
                    type: 2,
                    catalogCode: null,
                    comment: null,
                    template: {
                        catalogItem: {
                            ns: 'catalog/model/unit',
                            name: 'cm',
                            description: 'センチメートル',
                            _code: {
                                _value: 1,
                                _ver: 1
                            },
                            inherit: null
                        },
                        template: {
                            prop: null,
                            value: null
                        },
                        inner: null
                    }
                }
            ],
            appendix: null
        },
        {
            name: '新規変更セット',
            description: '新規変更セット(説明)',
            type: 0,
            ns: [
                {
                    type: 3,
                    nsId: null,
                    comment: null,
                    template: {
                        ns: 'catalog/model/unit',
                        description: 'ユニットテストネームスペース'
                    }
                }
            ],
            catalog: [
                {
                    type: 1,
                    catalogCode: null,
                    comment: null,
                    template: {
                        catalogItem: {
                            ns: 'catalog/model/unit',
                            name: 'cm',
                            description: 'センチメートル',
                            _code: {
                                _value: 1,
                                _ver: 1
                            },
                            inherit: null
                        },
                        template: {
                            prop: null,
                            value: null
                        },
                        inner: null
                    }
                }
            ],
            appendix: null
        },
        {
            name: '新規変更セット',
            description: '新規変更セット(説明)',
            type: 0,
            ns: [
                {
                    type: 1,
                    nsId: null,
                    comment: null,
                    template: {
                        ns: 'catalog/model/unit',
                        description: 'ユニットテストネームスペース'
                    }
                }
            ],
            catalog: [
                {
                    type: 3,
                    catalogCode: null,
                    comment: null,
                    template: {
                        catalogItem: {
                            ns: 'catalog/model/unit',
                            name: 'cm',
                            description: 'センチメートル',
                            _code: {
                                _value: 1,
                                _ver: 1
                            },
                            inherit: null
                        },
                        template: {
                            prop: null,
                            value: null
                        },
                        inner: null
                    }
                }
            ],
            appendix: null
        },
        {
            name: '新規変更セット',
            description: '新規変更セット(説明)',
            type: 0,
            ns: [
                {
                    type: 1,
                    nsId: null,
                    comment: null,
                    template: null
                }
            ],
            catalog: [
                {
                    type: 1,
                    catalogCode: null,
                    comment: null,
                    template: {
                        catalogItem: {
                            ns: 'catalog/model/unit',
                            name: 'cm',
                            description: 'センチメートル',
                            _code: {
                                _value: 1,
                                _ver: 1
                            },
                            inherit: null
                        },
                        template: {
                            prop: null,
                            value: null
                        },
                        inner: null
                    }
                }
            ],
            appendix: null
        },
        {
            name: '新規変更セット',
            description: '新規変更セット(説明)',
            type: 0,
            ns: [
                {
                    type: 1,
                    nsId: null,
                    comment: null,
                    template: {
                        ns: 'catalog/model/unit',
                        description: 'ユニットテストネームスペース'
                    }
                }
            ],
            catalog: [
                {
                    type: 1,
                    catalogCode: null,
                    comment: null,
                    template: null
                }
            ],
            appendix: null
        },
        {
            name: '新規変更セット',
            description: '新規変更セット(説明)',
            type: 0,
            ns: [
                {
                    type: 2,
                    nsId: null,
                    comment: null,
                    template: null
                }
            ],
            catalog: [
                {
                    type: 1,
                    catalogCode: null,
                    comment: null,
                    template: {
                        catalogItem: {
                            ns: 'catalog/model/unit',
                            name: 'cm',
                            description: 'センチメートル',
                            _code: {
                                _value: 1,
                                _ver: 1
                            },
                            inherit: null
                        },
                        template: {
                            prop: null,
                            value: null
                        },
                        inner: null
                    }
                }
            ],
            appendix: null
        },
        {
            name: '新規変更セット',
            description: '新規変更セット(説明)',
            type: 0,
            ns: [
                {
                    type: 1,
                    nsId: null,
                    comment: null,
                    template: {
                        ns: 'catalog/model/unit',
                        description: 'ユニットテストネームスペース'
                    }
                }
            ],
            catalog: [
                {
                    type: 2,
                    catalogCode: null,
                    comment: null,
                    template: null
                }
            ],
            appendix: null
        },
        {
            name: '新規変更セット',
            description: '新規変更セット(attribute 配列以外)',
            type: 0,
            ns: null,
            catalog: null,
            attribute: {
                type: 1,
                catalogCode: 46,
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
                            ns: 'catalog/ext/aaa-healthcare-consortium/setting/global',
                            values: [
                                {
                                    _value: 124124,
                                    _ver: 1
                                }
                            ]
                        }
                    ]
                }
            },
            appendix: null
        },
        {
            name: '新規変更セット',
            description: '新規属性変更セット(追加時にattribute指定なし)',
            type: 0,
            ns: null,
            catalog: null,
            attribute: [
                {
                    type: 1,
                    catalogCode: 46,
                    attribute: null
                }
            ],
            appendix: null
        },
        {
            name: '新規変更セット',
            description: '新規属性変更セット(更新時にattribute指定なし)',
            type: 0,
            ns: null,
            catalog: null,
            attribute: [
                {
                    type: 1,
                    catalogCode: 46,
                    attribute: null
                }
            ],
            appendix: null
        }
    ];
}
