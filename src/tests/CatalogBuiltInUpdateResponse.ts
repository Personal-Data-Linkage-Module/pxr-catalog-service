/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/**
 * カタログレスポンス(ビルトイン)
 */
export namespace CatalogBuiltInUpdateResponse {
    /**
     * null設定オブジェクト
     */
    const NULL: any = null;

    /**
    * 最小限カタログ(コード指定)
    */
    export const minimum = {
        catalogItem: {
            ns: 'catalog/built_in/unit-test',
            name: 'ユニットテスト',
            _code: {
                _value: 10001,
                _ver: 2
            },
            inherit: NULL,
            description: NULL
        },
        template: {
            _code: {
                _value: 10001,
                _ver: 2
            }
        },
        prop: NULL,
        value: NULL,
        attribute: NULL
    };
    /**
    * 最小限カタログ(コード指定)
    */
    export const minimumCode = {
        catalogItem: {
            ns: 'catalog/built_in/unit-test',
            name: 'ユニットテスト',
            _code: {
                _value: 10002,
                _ver: 2
            },
            inherit: NULL,
            description: 'ユニットテスト用の説明です。'
        },
        template: {
            _code: {
                _value: 10002,
                _ver: 2
            }
        },
        prop: NULL,
        value: NULL,
        attribute: NULL
    };
    /**
    * 最小限カタログ(コード、バージョン指定)
    */
    export const minimumCodeVersion = {
        catalogItem: {
            ns: 'catalog/built_in/unit-test',
            name: 'ユニットテスト',
            _code: {
                _value: 10003,
                _ver: 2
            },
            inherit: NULL,
            description: 'ユニットテスト用の説明です。'
        },
        template: {
            _code: {
                _value: 10003,
                _ver: 2
            }
        },
        prop: NULL,
        value: NULL,
        attribute: NULL
    };
    /**
    * カタログ(テンプレートプロパティnumber指定)
    */
    export const templatePropertyNumber = {
        catalogItem: {
            ns: 'catalog/built_in/unit-test',
            name: 'ユニットテスト',
            _code: {
                _value: 10011,
                _ver: 2
            },
            inherit: NULL,
            description: 'ユニットテスト用の説明です。'
        },
        template: {
            _code: {
                _value: 10011,
                _ver: 2
            },
            property_number: NULL
        },
        prop: [
            {
                key: 'property_number',
                type: {
                    of: 'number',
                    cmatrix: NULL,
                    format: NULL,
                    unit: NULL,
                    candidate: NULL
                },
                description: 'サンプルnumber',
                isInherit: false
            }
        ],
        value: NULL,
        attribute: NULL
    };
    /**
    * カタログ(テンプレートプロパティstring指定)
    */
    export const templatePropertyString = {
        catalogItem: {
            ns: 'catalog/built_in/unit-test',
            name: 'ユニットテスト',
            _code: {
                _value: 10012,
                _ver: 2
            },
            inherit: NULL,
            description: 'ユニットテスト用の説明です。'
        },
        template: {
            _code: {
                _value: 10012,
                _ver: 2
            },
            property_string: NULL
        },
        prop: [
            {
                key: 'property_string',
                type: {
                    of: 'string',
                    cmatrix: NULL,
                    format: NULL,
                    unit: NULL,
                    candidate: NULL
                },
                description: 'サンプルstring',
                isInherit: false
            }
        ],
        value: NULL,
        attribute: NULL
    };
    /**
    * カタログ(テンプレートプロパティboolean指定)
    */
    export const templatePropertyBoolean = {
        catalogItem: {
            ns: 'catalog/built_in/unit-test',
            name: 'ユニットテスト',
            _code: {
                _value: 10013,
                _ver: 2
            },
            inherit: NULL,
            description: 'ユニットテスト用の説明です。'
        },
        template: {
            _code: {
                _value: 10013,
                _ver: 2
            },
            property_boolean: NULL
        },
        prop: [
            {
                key: 'property_boolean',
                type: {
                    of: 'boolean',
                    cmatrix: NULL
                },
                description: 'サンプルboolean',
                isInherit: false
            }
        ],
        value: NULL,
        attribute: NULL
    };
    /**
    * カタログ(テンプレートプロパティcode指定)
    */
    export const templatePropertyCode = {
        catalogItem: {
            ns: 'catalog/built_in/unit-test',
            name: 'ユニットテスト',
            _code: {
                _value: 10014,
                _ver: 2
            },
            inherit: NULL,
            description: 'ユニットテスト用の説明です。'
        },
        template: {
            _code: {
                _value: 10014,
                _ver: 2
            },
            property_code: NULL
        },
        prop: [
            {
                key: 'property_code',
                type: {
                    of: 'code',
                    cmatrix: NULL,
                    candidate: NULL
                },
                description: 'サンプルcode',
                isInherit: false
            }
        ],
        value: NULL,
        attribute: NULL
    };
    /**
    * カタログ(テンプレートプロパティitem指定)
    */
    export const templatePropertyItem = {
        catalogItem: {
            ns: 'catalog/built_in/unit-test',
            name: 'ユニットテスト',
            _code: {
                _value: 10015,
                _ver: 2
            },
            inherit: NULL,
            description: 'ユニットテスト用の説明です。'
        },
        template: {
            _code: {
                _value: 10015,
                _ver: 2
            },
            property_item: NULL
        },
        prop: [
            {
                key: 'property_item',
                type: {
                    of: 'item',
                    _code: NULL,
                    cmatrix: NULL,
                    candidate: NULL
                },
                description: 'サンプルitem',
                isInherit: false
            }
        ],
        value: NULL,
        attribute: NULL
    };
    /**
    * カタログ(テンプレートプロパティinner指定)
    */
    export const templatePropertyInner = {
        catalogItem: {
            ns: 'catalog/built_in/unit-test',
            name: 'ユニットテスト',
            _code: {
                _value: 10016,
                _ver: 2
            },
            inherit: NULL,
            description: 'ユニットテスト用の説明です。'
        },
        template: {
            _code: {
                _value: 10016,
                _ver: 2
            },
            property_inner: NULL
        },
        prop: [
            {
                key: 'property_inner',
                type: {
                    of: 'inner',
                    inner: NULL,
                    cmatrix: NULL,
                    candidate: NULL
                },
                description: 'サンプルinner',
                isInherit: false
            }
        ],
        value: NULL,
        attribute: NULL
    };
    /**
    * カタログ(テンプレートプロパティnumber[]指定)
    */
    export const templatePropertyNumberArray = {
        catalogItem: {
            ns: 'catalog/built_in/unit-test',
            name: 'ユニットテスト',
            _code: {
                _value: 10021,
                _ver: 2
            },
            inherit: NULL,
            description: 'ユニットテスト用の説明です。'
        },
        template: {
            _code: {
                _value: 10021,
                _ver: 2
            },
            property_number_array: NULL
        },
        prop: [
            {
                key: 'property_number_array',
                type: {
                    of: 'number[]',
                    cmatrix: NULL,
                    format: NULL,
                    unit: NULL,
                    candidate: NULL
                },
                description: 'サンプルnumber[]',
                isInherit: false
            }
        ],
        value: NULL,
        attribute: NULL
    };
    /**
    * カタログ(テンプレートプロパティstring[]指定)
    */
    export const templatePropertyStringArray = {
        catalogItem: {
            ns: 'catalog/built_in/unit-test',
            name: 'ユニットテスト',
            _code: {
                _value: 10022,
                _ver: 2
            },
            inherit: NULL,
            description: 'ユニットテスト用の説明です。'
        },
        template: {
            _code: {
                _value: 10022,
                _ver: 2
            },
            property_string_array: NULL
        },
        prop: [
            {
                key: 'property_string_array',
                type: {
                    of: 'string[]',
                    cmatrix: NULL,
                    format: NULL,
                    unit: NULL,
                    candidate: NULL
                },
                description: 'サンプルstring[]',
                isInherit: false
            }
        ],
        value: NULL,
        attribute: NULL
    };
    /**
    * カタログ(テンプレートプロパティboolean[]指定)
    */
    export const templatePropertyBooleanArray = {
        catalogItem: {
            ns: 'catalog/built_in/unit-test',
            name: 'ユニットテスト',
            _code: {
                _value: 10023,
                _ver: 2
            },
            inherit: NULL,
            description: 'ユニットテスト用の説明です。'
        },
        template: {
            _code: {
                _value: 10023,
                _ver: 2
            },
            property_boolean_array: NULL
        },
        prop: [
            {
                key: 'property_boolean_array',
                type: {
                    of: 'boolean[]',
                    cmatrix: NULL
                },
                description: 'サンプルboolean[]',
                isInherit: false
            }
        ],
        value: NULL,
        attribute: NULL
    };
    /**
    * カタログ(テンプレートプロパティcode[]指定)
    */
    export const templatePropertyCodeArray = {
        catalogItem: {
            ns: 'catalog/built_in/unit-test',
            name: 'ユニットテスト',
            _code: {
                _value: 10024,
                _ver: 2
            },
            inherit: NULL,
            description: 'ユニットテスト用の説明です。'
        },
        template: {
            _code: {
                _value: 10024,
                _ver: 2
            },
            property_code_array: NULL
        },
        prop: [
            {
                key: 'property_code_array',
                type: {
                    of: 'code[]',
                    cmatrix: NULL,
                    candidate: NULL
                },
                description: 'サンプルcode[]',
                isInherit: false
            }
        ],
        value: NULL,
        attribute: NULL
    };
    /**
    * カタログ(テンプレートプロパティitem[]指定)
    */
    export const templatePropertyItemArray = {
        catalogItem: {
            ns: 'catalog/built_in/unit-test',
            name: 'ユニットテスト',
            _code: {
                _value: 10025,
                _ver: 2
            },
            inherit: NULL,
            description: 'ユニットテスト用の説明です。'
        },
        template: {
            _code: {
                _value: 10025,
                _ver: 2
            },
            property_item_array: NULL
        },
        prop: [
            {
                key: 'property_item_array',
                type: {
                    of: 'item[]',
                    cmatrix: NULL,
                    candidate: NULL
                },
                description: 'サンプルitem[]',
                isInherit: false
            }
        ],
        value: NULL,
        attribute: NULL
    };
    /**
    * カタログ(テンプレートプロパティinner[]指定)
    */
    export const templatePropertyInnerArray = {
        catalogItem: {
            ns: 'catalog/built_in/unit-test',
            name: 'ユニットテスト',
            _code: {
                _value: 10026,
                _ver: 2
            },
            inherit: NULL,
            description: 'ユニットテスト用の説明です。'
        },
        template: {
            _code: {
                _value: 10026,
                _ver: 2
            },
            property_inner_array: NULL
        },
        prop: [
            {
                key: 'property_inner_array',
                type: {
                    of: 'inner[]',
                    inner: NULL,
                    cmatrix: NULL,
                    candidate: NULL
                },
                description: 'サンプルinner[]',
                isInherit: false
            }
        ],
        value: NULL,
        attribute: NULL
    };
    /**
    * カタログ(属性指定値なし)
    */
    export const attributeValueNone = {
        catalogItem: {
            ns: 'catalog/built_in/unit-test',
            name: 'ユニットテスト',
            _code: {
                _value: 10031,
                _ver: 2
            },
            inherit: NULL,
            description: 'ユニットテスト用の説明です。'
        },
        template: {
            _code: {
                _value: 10031,
                _ver: 2
            }
        },
        prop: NULL,
        value: NULL,
        attribute: {
            objects: [
                {
                    key: {
                        _value: 1111,
                        _ver: 1
                    },
                    value: NULL,
                    description: '属性指定値なし'
                }
            ],
            tags: [
                {
                    ns: 'catalog/model/unit-test',
                    values: NULL
                }
            ]
        }
    };
    /**
    * カタログ(属性指定値あり)
    */
    export const attributeValueAvail = {
        catalogItem: {
            ns: 'catalog/built_in/unit-test',
            name: 'ユニットテスト',
            _code: {
                _value: 10032,
                _ver: 2
            },
            inherit: NULL,
            description: 'ユニットテスト用の説明です。'
        },
        template: {
            _code: {
                _value: 10032,
                _ver: 2
            }
        },
        prop: NULL,
        value: NULL,
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
                    ns: 'catalog/model/unit-test',
                    values: [
                        {
                            _value: 124124,
                            _ver: 1
                        }
                    ]
                }
            ]
        }
    };
    /**
    * カタログ(値指定number)
    */
    export const valueNumber = {
        catalogItem: {
            ns: 'catalog/built_in/unit-test',
            name: 'ユニットテスト',
            _code: {
                _value: 10041,
                _ver: 2
            },
            inherit: NULL,
            description: 'ユニットテスト用の説明です。'
        },
        template: {
            _code: {
                _value: 10041,
                _ver: 2
            },
            value_number: 100
        },
        prop: [
            {
                key: 'value_number',
                type: {
                    of: 'number',
                    cmatrix: NULL,
                    format: NULL,
                    unit: NULL,
                    candidate: NULL
                },
                description: 'サンプルnumber',
                isInherit: false
            }
        ],
        value: [
            {
                key: 'value_number',
                value: 100
            }
        ],
        attribute: NULL
    };
    /**
    * カタログ(値指定string)
    */
    export const valueString = {
        catalogItem: {
            ns: 'catalog/built_in/unit-test',
            name: 'ユニットテスト',
            _code: {
                _value: 10042,
                _ver: 2
            },
            inherit: NULL,
            description: 'ユニットテスト用の説明です。'
        },
        template: {
            _code: {
                _value: 10042,
                _ver: 2
            },
            value_string: 'sample_string'
        },
        prop: [
            {
                key: 'value_string',
                type: {
                    of: 'string',
                    cmatrix: NULL,
                    format: NULL,
                    unit: NULL,
                    candidate: NULL
                },
                description: 'サンプルstring',
                isInherit: false
            }
        ],
        value: [
            {
                key: 'value_string',
                value: 'sample_string'
            }
        ],
        attribute: NULL
    };
    /**
    * カタログ(値指定boolean)
    */
    export const valueBoolean = {
        catalogItem: {
            ns: 'catalog/built_in/unit-test',
            name: 'ユニットテスト',
            _code: {
                _value: 10043,
                _ver: 2
            },
            inherit: NULL,
            description: 'ユニットテスト用の説明です。'
        },
        template: {
            _code: {
                _value: 10043,
                _ver: 2
            },
            value_boolean: true
        },
        prop: [
            {
                key: 'value_boolean',
                type: {
                    of: 'boolean',
                    cmatrix: NULL
                },
                description: 'サンプルboolean',
                isInherit: false
            }
        ],
        value: [
            {
                key: 'value_boolean',
                value: true
            }
        ],
        attribute: NULL
    };
    /**
    * カタログ(値指定code)
    */
    export const valueCode = {
        catalogItem: {
            ns: 'catalog/built_in/unit-test',
            name: 'ユニットテスト',
            _code: {
                _value: 10044,
                _ver: 2
            },
            inherit: NULL,
            description: 'ユニットテスト用の説明です。'
        },
        template: {
            _code: {
                _value: 10044,
                _ver: 2
            },
            value_code: {
                _value: 10011,
                _ver: 2
            }
        },
        prop: [
            {
                key: 'value_code',
                type: {
                    of: 'code',
                    cmatrix: NULL,
                    candidate: NULL
                },
                description: 'サンプルcode',
                isInherit: false
            }
        ],
        value: [
            {
                key: 'value_code',
                value: [
                    {
                        key: '_value',
                        value: 10011
                    },
                    {
                        key: '_ver',
                        value: 2
                    }
                ]
            }
        ],
        attribute: NULL
    };
    /**
    * カタログ(値指定item)
    */
    export const valueItem = {
        catalogItem: {
            ns: 'catalog/built_in/unit-test',
            name: 'ユニットテスト',
            _code: {
                _value: 10045,
                _ver: 2
            },
            inherit: NULL,
            description: 'ユニットテスト用の説明です。'
        },
        template: {
            _code: {
                _value: 10045,
                _ver: 2
            },
            value_item: {
                _value: 10011,
                _ver: 2
            }
        },
        prop: [
            {
                key: 'value_item',
                type: {
                    of: 'item',
                    _code: NULL,
                    cmatrix: NULL,
                    candidate: NULL
                },
                description: 'サンプルitem',
                isInherit: false
            }
        ],
        value: [
            {
                key: 'value_item',
                value: [
                    {
                        key: '_value',
                        value: 10011
                    },
                    {
                        key: '_ver',
                        value: 2
                    }
                ]
            }
        ],
        attribute: NULL
    };
    /**
    * カタログ(値指定inner)
    */
    export const valueInner = {
        catalogItem: {
            ns: 'catalog/built_in/unit-test',
            name: 'ユニットテスト',
            _code: {
                _value: 10046,
                _ver: 2
            },
            inherit: NULL,
            description: 'ユニットテスト用の説明です。'
        },
        template: {
            _code: {
                _value: 10046,
                _ver: 2
            },
            value_inner: {
                inner_number: 101
            }
        },
        prop: [
            {
                key: 'value_inner',
                type: {
                    of: 'inner',
                    inner: 'ValueInner',
                    cmatrix: NULL,
                    candidate: NULL
                },
                description: 'サンプルinner',
                isInherit: false
            }
        ],
        value: [
            {
                key: 'value_inner',
                value: [
                    {
                        key: 'inner_number',
                        value: 101
                    }
                ]
            }
        ],
        attribute: NULL
    };
    /**
    * カタログ(値指定number[])
    */
    export const valueNumberArray = {
        catalogItem: {
            ns: 'catalog/built_in/unit-test',
            name: 'ユニットテスト',
            _code: {
                _value: 10051,
                _ver: 2
            },
            inherit: NULL,
            description: 'ユニットテスト用の説明です。'
        },
        template: {
            _code: {
                _value: 10051,
                _ver: 2
            },
            value_number_array: [
                100,
                101,
                102
            ]
        },
        prop: [
            {
                key: 'value_number_array',
                type: {
                    of: 'number[]',
                    cmatrix: NULL,
                    format: NULL,
                    unit: NULL,
                    candidate: NULL
                },
                description: 'サンプルnumber[]',
                isInherit: false
            }
        ],
        value: [
            {
                key: 'value_number_array',
                value: 100
            },
            {
                key: 'value_number_array',
                value: 101
            },
            {
                key: 'value_number_array',
                value: 102
            }
        ],
        attribute: NULL
    };
    /**
    * カタログ(値指定string[])
    */
    export const valueStringArray = {
        catalogItem: {
            ns: 'catalog/built_in/unit-test',
            name: 'ユニットテスト',
            _code: {
                _value: 10052,
                _ver: 2
            },
            inherit: NULL,
            description: 'ユニットテスト用の説明です。'
        },
        template: {
            _code: {
                _value: 10052,
                _ver: 2
            },
            value_string_array: [
                'sample_string1',
                'sample_string2',
                'sample_string3'
            ]
        },
        prop: [
            {
                key: 'value_string_array',
                type: {
                    of: 'string[]',
                    cmatrix: NULL,
                    format: NULL,
                    unit: NULL,
                    candidate: NULL
                },
                description: 'サンプルstring[]',
                isInherit: false
            }
        ],
        value: [
            {
                key: 'value_string_array',
                value: 'sample_string1'
            },
            {
                key: 'value_string_array',
                value: 'sample_string2'
            },
            {
                key: 'value_string_array',
                value: 'sample_string3'
            }
        ],
        attribute: NULL
    };
    /**
    * カタログ(値指定boolean[])
    */
    export const valueBooleanArray = {
        catalogItem: {
            ns: 'catalog/built_in/unit-test',
            name: 'ユニットテスト',
            _code: {
                _value: 10053,
                _ver: 2
            },
            inherit: NULL,
            description: 'ユニットテスト用の説明です。'
        },
        template: {
            _code: {
                _value: 10053,
                _ver: 2
            },
            value_boolean_array: [
                true,
                true,
                false
            ]
        },
        prop: [
            {
                key: 'value_boolean_array',
                type: {
                    of: 'boolean[]',
                    cmatrix: NULL
                },
                description: 'サンプルboolean[]',
                isInherit: false
            }
        ],
        value: [
            {
                key: 'value_boolean_array',
                value: true
            },
            {
                key: 'value_boolean_array',
                value: true
            },
            {
                key: 'value_boolean_array',
                value: false
            }
        ],
        attribute: NULL
    };
    /**
    * カタログ(値指定code[])
    */
    export const valueCodeArray = {
        catalogItem: {
            ns: 'catalog/built_in/unit-test',
            name: 'ユニットテスト',
            _code: {
                _value: 10054,
                _ver: 2
            },
            inherit: NULL,
            description: 'ユニットテスト用の説明です。'
        },
        template: {
            _code: {
                _value: 10054,
                _ver: 2
            },
            value_code_array: [
                {
                    _value: 10011,
                    _ver: 2
                },
                {
                    _value: 10012,
                    _ver: 2
                }
            ]
        },
        prop: [
            {
                key: 'value_code_array',
                type: {
                    of: 'code[]',
                    cmatrix: NULL,
                    candidate: NULL
                },
                description: 'サンプルcode[]',
                isInherit: false
            }
        ],
        value: [
            {
                key: 'value_code_array',
                value: [
                    {
                        key: '_value',
                        value: 10011
                    },
                    {
                        key: '_ver',
                        value: 2
                    }
                ]
            },
            {
                key: 'value_code_array',
                value: [
                    {
                        key: '_value',
                        value: 10012
                    },
                    {
                        key: '_ver',
                        value: 2
                    }
                ]
            }
        ],
        attribute: NULL
    };
    /**
    * カタログ(値指定item[])
    */
    export const valueItemArray = {
        catalogItem: {
            ns: 'catalog/built_in/unit-test',
            name: 'ユニットテスト',
            _code: {
                _value: 10055,
                _ver: 2
            },
            inherit: NULL,
            description: 'ユニットテスト用の説明です。'
        },
        template: {
            _code: {
                _value: 10055,
                _ver: 2
            },
            value_item_array: [
                {
                    _value: 10011,
                    _ver: 2
                },
                {
                    _value: 10012,
                    _ver: 2
                }
            ]
        },
        prop: [
            {
                key: 'value_item_array',
                type: {
                    of: 'item[]',
                    cmatrix: NULL,
                    candidate: NULL
                },
                description: 'サンプルitem[]',
                isInherit: false
            }
        ],
        value: [
            {
                key: 'value_item_array',
                value: [
                    {
                        key: '_value',
                        value: 10011
                    },
                    {
                        key: '_ver',
                        value: 2
                    }
                ]
            },
            {
                key: 'value_item_array',
                value: [
                    {
                        key: '_value',
                        value: 10012
                    },
                    {
                        key: '_ver',
                        value: 2
                    }
                ]
            }
        ],
        attribute: NULL
    };
    /**
    * カタログ(値指定inner[])
    */
    export const valueInnerArray = {
        catalogItem: {
            ns: 'catalog/built_in/unit-test',
            name: 'ユニットテスト',
            _code: {
                _value: 10056,
                _ver: 2
            },
            inherit: NULL,
            description: 'ユニットテスト用の説明です。'
        },
        template: {
            _code: {
                _value: 10056,
                _ver: 2
            },
            value_inner_array: NULL
        },
        prop: [
            {
                key: 'value_inner_array',
                type: {
                    of: 'inner[]',
                    inner: 'ValueInnerArray',
                    cmatrix: NULL,
                    candidate: NULL
                },
                description: 'サンプルinner[]',
                isInherit: false
            }
        ],
        value: [
            {
                key: 'value_inner',
                value: [
                    {
                        key: 'inner_number',
                        value: 101
                    }
                ]
            },
            {
                key: 'value_inner',
                value: [
                    {
                        key: 'inner_number',
                        value: 102
                    }
                ]
            }
        ],
        attribute: NULL
    };
    /**
    * カタログ(継承、バージョン指定なし)
    */
    export const inheritVersionNone = {
        catalogItem: {
            ns: 'catalog/built_in/unit-test',
            name: 'ユニットテスト',
            _code: {
                _value: 10061,
                _ver: 2
            },
            inherit: {
                _value: 10011,
                _ver: 2
            },
            description: 'ユニットテスト用の説明です。'
        },
        template: {
            _code: {
                _value: 10061,
                _ver: 2
            },
            property_number: NULL
        },
        prop: [
            {
                key: 'property_number',
                type: {
                    of: 'number',
                    cmatrix: NULL,
                    format: NULL,
                    unit: NULL,
                    candidate: NULL
                },
                description: 'サンプルnumber',
                isInherit: true
            }
        ],
        value: NULL,
        attribute: NULL
    };
    /**
    * カタログ(継承、バージョン指定あり)
    */
    export const inheritVersionAvail = {
        catalogItem: {
            ns: 'catalog/built_in/unit-test',
            name: 'ユニットテスト',
            _code: {
                _value: 10062,
                _ver: 2
            },
            inherit: {
                _value: 10012,
                _ver: 2
            },
            description: 'ユニットテスト用の説明です。'
        },
        template: {
            _code: {
                _value: 10062,
                _ver: 2
            },
            property_string: NULL
        },
        prop: [
            {
                key: 'property_string',
                type: {
                    of: 'string',
                    cmatrix: NULL,
                    format: NULL,
                    unit: NULL,
                    candidate: NULL
                },
                description: 'サンプルstring',
                isInherit: true
            }
        ],
        value: NULL,
        attribute: NULL
    };
    /**
    * カタログ(継承、プロパティnumber)
    */
    export const inheritPropertyNumber = {
        catalogItem: {
            ns: 'catalog/built_in/unit-test',
            name: 'ユニットテスト',
            _code: {
                _value: 10063,
                _ver: 2
            },
            inherit: {
                _value: 10011,
                _ver: 2
            },
            description: 'ユニットテスト用の説明です。'
        },
        template: {
            _code: {
                _value: 10063,
                _ver: 2
            },
            inherit_number: NULL,
            property_number: NULL
        },
        prop: [
            {
                key: 'inherit_number',
                type: {
                    of: 'number',
                    cmatrix: NULL,
                    format: NULL,
                    unit: NULL,
                    candidate: NULL
                },
                description: '継承サンプルnumber',
                isInherit: false
            },
            {
                key: 'property_number',
                type: {
                    of: 'number',
                    cmatrix: NULL,
                    format: NULL,
                    unit: NULL,
                    candidate: NULL
                },
                description: 'サンプルnumber',
                isInherit: true
            }
        ],
        value: NULL,
        attribute: NULL
    };
    /**
    * カタログ(継承、プロパティstring)
    */
    export const inheritPropertyString = {
        catalogItem: {
            ns: 'catalog/built_in/unit-test',
            name: 'ユニットテスト',
            _code: {
                _value: 10064,
                _ver: 2
            },
            inherit: {
                _value: 10012,
                _ver: 2
            },
            description: 'ユニットテスト用の説明です。'
        },
        template: {
            _code: {
                _value: 10064,
                _ver: 2
            },
            inherit_string: NULL,
            property_string: NULL
        },
        prop: [
            {
                key: 'inherit_string',
                type: {
                    of: 'string',
                    cmatrix: NULL,
                    format: NULL,
                    unit: NULL,
                    candidate: NULL
                },
                description: '継承サンプルstring',
                isInherit: false
            },
            {
                key: 'property_string',
                type: {
                    of: 'string',
                    cmatrix: NULL,
                    format: NULL,
                    unit: NULL,
                    candidate: NULL
                },
                description: 'サンプルstring',
                isInherit: true
            }
        ],
        value: NULL,
        attribute: NULL
    };
    /**
    * カタログ(継承、プロパティboolean)
    */
    export const inheritPropertyBoolean = {
        catalogItem: {
            ns: 'catalog/built_in/unit-test',
            name: 'ユニットテスト',
            _code: {
                _value: 10065,
                _ver: 2
            },
            inherit: {
                _value: 10013,
                _ver: 2
            },
            description: 'ユニットテスト用の説明です。'
        },
        template: {
            _code: {
                _value: 10065,
                _ver: 2
            },
            inherit_boolean: NULL,
            property_boolean: NULL
        },
        prop: [
            {
                key: 'inherit_boolean',
                type: {
                    of: 'boolean',
                    cmatrix: NULL
                },
                description: '継承サンプルboolean',
                isInherit: false
            },
            {
                key: 'property_boolean',
                type: {
                    of: 'boolean',
                    cmatrix: NULL
                },
                description: 'サンプルboolean',
                isInherit: true
            }
        ],
        value: NULL,
        attribute: NULL
    };
    /**
    * カタログ(継承、プロパティcode)
    */
    export const inheritPropertyCode = {
        catalogItem: {
            ns: 'catalog/built_in/unit-test',
            name: 'ユニットテスト',
            _code: {
                _value: 10066,
                _ver: 2
            },
            inherit: {
                _value: 10014,
                _ver: 2
            },
            description: 'ユニットテスト用の説明です。'
        },
        template: {
            _code: {
                _value: 10066,
                _ver: 2
            },
            inherit_code: NULL,
            property_code: NULL
        },
        prop: [
            {
                key: 'inherit_code',
                type: {
                    of: 'code',
                    cmatrix: NULL,
                    candidate: NULL
                },
                description: '継承サンプルcode',
                isInherit: false
            },
            {
                key: 'property_code',
                type: {
                    of: 'code',
                    cmatrix: NULL,
                    candidate: NULL
                },
                description: 'サンプルcode',
                isInherit: true
            }
        ],
        value: NULL,
        attribute: NULL
    };
    /**
    * カタログ(継承、プロパティitem)
    */
    export const inheritPropertyItem = {
        catalogItem: {
            ns: 'catalog/built_in/unit-test',
            name: 'ユニットテスト',
            _code: {
                _value: 10067,
                _ver: 2
            },
            inherit: {
                _value: 10015,
                _ver: 2
            },
            description: 'ユニットテスト用の説明です。'
        },
        template: {
            _code: {
                _value: 10067,
                _ver: 2
            },
            inherit_item: NULL,
            property_item: NULL
        },
        prop: [
            {
                key: 'inherit_item',
                type: {
                    of: 'item',
                    _code: NULL,
                    cmatrix: NULL,
                    candidate: NULL
                },
                description: '継承サンプルitem',
                isInherit: false
            },
            {
                key: 'property_item',
                type: {
                    of: 'item',
                    _code: NULL,
                    cmatrix: NULL,
                    candidate: NULL
                },
                description: 'サンプルitem',
                isInherit: true
            }
        ],
        value: NULL,
        attribute: NULL
    };
    /**
    * カタログ(継承、プロパティinner)
    */
    export const inheritPropertyInner = {
        catalogItem: {
            ns: 'catalog/built_in/unit-test',
            name: 'ユニットテスト',
            _code: {
                _value: 10068,
                _ver: 2
            },
            inherit: {
                _value: 10016,
                _ver: 2
            },
            description: 'ユニットテスト用の説明です。'
        },
        template: {
            _code: {
                _value: 10068,
                _ver: 2
            },
            inherit_inner: NULL,
            property_inner: NULL
        },
        prop: [
            {
                key: 'inherit_inner',
                type: {
                    of: 'inner',
                    inner: 'InheritInner',
                    cmatrix: NULL,
                    candidate: NULL
                },
                description: '継承サンプルinner',
                isInherit: false
            },
            {
                key: 'property_inner',
                type: {
                    of: 'inner',
                    inner: NULL,
                    cmatrix: NULL,
                    candidate: NULL
                },
                description: 'サンプルinner',
                isInherit: true
            }
        ],
        value: NULL,
        attribute: NULL
    };
    /**
    * カタログ(継承、プロパティnumber[])
    */
    export const inheritPropertyNumberArray = {
        catalogItem: {
            ns: 'catalog/built_in/unit-test',
            name: 'ユニットテスト',
            _code: {
                _value: 10071,
                _ver: 2
            },
            inherit: {
                _value: 10021,
                _ver: 2
            },
            description: 'ユニットテスト用の説明です。'
        },
        template: {
            _code: {
                _value: 10071,
                _ver: 2
            },
            inherit_number_array: NULL,
            property_number_array: NULL
        },
        prop: [
            {
                key: 'inherit_number_array',
                type: {
                    of: 'number[]',
                    cmatrix: NULL,
                    format: NULL,
                    unit: NULL,
                    candidate: NULL
                },
                description: '継承サンプルnumber[]',
                isInherit: false
            },
            {
                key: 'property_number_array',
                type: {
                    of: 'number[]',
                    cmatrix: NULL,
                    format: NULL,
                    unit: NULL,
                    candidate: NULL
                },
                description: 'サンプルnumber[]',
                isInherit: true
            }
        ],
        value: NULL,
        attribute: NULL
    };
    /**
    * カタログ(継承、プロパティstring[])
    */
    export const inheritPropertyStringArray = {
        catalogItem: {
            ns: 'catalog/built_in/unit-test',
            name: 'ユニットテスト',
            _code: {
                _value: 10072,
                _ver: 2
            },
            inherit: {
                _value: 10022,
                _ver: 2
            },
            description: 'ユニットテスト用の説明です。'
        },
        template: {
            _code: {
                _value: 10072,
                _ver: 2
            },
            inherit_string_array: NULL,
            property_string_array: NULL
        },
        prop: [
            {
                key: 'inherit_string_array',
                type: {
                    of: 'string[]',
                    cmatrix: NULL,
                    format: NULL,
                    unit: NULL,
                    candidate: NULL
                },
                description: '継承サンプルstring[]',
                isInherit: false
            },
            {
                key: 'property_string_array',
                type: {
                    of: 'string[]',
                    cmatrix: NULL,
                    format: NULL,
                    unit: NULL,
                    candidate: NULL
                },
                description: 'サンプルstring[]',
                isInherit: true
            }
        ],
        value: NULL,
        attribute: NULL
    };
    /**
    * カタログ(継承、プロパティboolean[])
    */
    export const inheritPropertyBooleanArray = {
        catalogItem: {
            ns: 'catalog/built_in/unit-test',
            name: 'ユニットテスト',
            _code: {
                _value: 10073,
                _ver: 2
            },
            inherit: {
                _value: 10023,
                _ver: 2
            },
            description: 'ユニットテスト用の説明です。'
        },
        template: {
            _code: {
                _value: 10073,
                _ver: 2
            },
            inherit_boolean_array: NULL,
            property_boolean_array: NULL
        },
        prop: [
            {
                key: 'inherit_boolean_array',
                type: {
                    of: 'boolean[]',
                    cmatrix: NULL
                },
                description: '継承サンプルboolean[]',
                isInherit: false
            },
            {
                key: 'property_boolean_array',
                type: {
                    of: 'boolean[]',
                    cmatrix: NULL
                },
                description: 'サンプルboolean[]',
                isInherit: true
            }
        ],
        value: NULL,
        attribute: NULL
    };
    /**
    * カタログ(継承、プロパティcode[])
    */
    export const inheritPropertyCodeArray = {
        catalogItem: {
            ns: 'catalog/built_in/unit-test',
            name: 'ユニットテスト',
            _code: {
                _value: 10074,
                _ver: 2
            },
            inherit: {
                _value: 10024,
                _ver: 2
            },
            description: 'ユニットテスト用の説明です。'
        },
        template: {
            _code: {
                _value: 10074,
                _ver: 2
            },
            inherit_code_array: NULL,
            property_code_array: NULL
        },
        prop: [
            {
                key: 'inherit_code_array',
                type: {
                    of: 'code[]',
                    cmatrix: NULL,
                    candidate: NULL
                },
                description: '継承サンプルcode[]',
                isInherit: false
            },
            {
                key: 'property_code_array',
                type: {
                    of: 'code[]',
                    cmatrix: NULL,
                    candidate: NULL
                },
                description: 'サンプルcode[]',
                isInherit: true
            }
        ],
        value: NULL,
        attribute: NULL
    };
    /**
    * カタログ(継承、プロパティitem[])
    */
    export const inheritPropertyItemArray = {
        catalogItem: {
            ns: 'catalog/built_in/unit-test',
            name: 'ユニットテスト',
            _code: {
                _value: 10075,
                _ver: 2
            },
            inherit: {
                _value: 10025,
                _ver: 2
            },
            description: 'ユニットテスト用の説明です。'
        },
        template: {
            _code: {
                _value: 10075,
                _ver: 2
            },
            inherit_item_array: NULL,
            property_item_array: NULL
        },
        prop: [
            {
                key: 'inherit_item_array',
                type: {
                    of: 'item[]',
                    cmatrix: NULL,
                    candidate: NULL
                },
                description: '継承サンプルitem[]',
                isInherit: false
            },
            {
                key: 'property_item_array',
                type: {
                    of: 'item[]',
                    cmatrix: NULL,
                    candidate: NULL
                },
                description: 'サンプルitem[]',
                isInherit: true
            }
        ],
        value: NULL,
        attribute: NULL
    };
    /**
    * カタログ(継承、プロパティinner[])
    */
    export const inheritPropertyInnerArray = {
        catalogItem: {
            ns: 'catalog/built_in/unit-test',
            name: 'ユニットテスト',
            _code: {
                _value: 10076,
                _ver: 2
            },
            inherit: {
                _value: 10026,
                _ver: 2
            },
            description: 'ユニットテスト用の説明です。'
        },
        template: {
            _code: {
                _value: 10076,
                _ver: 2
            },
            inherit_inner_array: NULL,
            property_inner_array: NULL
        },
        prop: [
            {
                key: 'inherit_inner_array',
                type: {
                    of: 'inner[]',
                    inner: 'InheritInnerArray',
                    cmatrix: NULL,
                    candidate: NULL
                },
                description: '継承サンプルinner[]',
                isInherit: false
            },
            {
                key: 'property_inner_array',
                type: {
                    of: 'inner[]',
                    inner: NULL,
                    cmatrix: NULL,
                    candidate: NULL
                },
                description: 'サンプルinner[]',
                isInherit: true
            }
        ],
        value: NULL,
        attribute: NULL
    };
    /**
    * カタログ(テンプレートプロパティnumber各種設定)
    */
    export const templatePropertyFullNumber = {
        catalogItem: {
            ns: 'catalog/built_in/cmatrix/unit-test',
            name: 'ユニットテスト',
            _code: {
                _value: 10081,
                _ver: 2
            },
            inherit: NULL,
            description: 'ユニットテスト用の説明です。'
        },
        template: {
            _code: {
                _value: 10081,
                _ver: 2
            },
            index: '4_2_2_1',
            property_number: {
                index: '4_2_2_1',
                value: NULL
            },
            value: NULL
        },
        prop: [
            {
                key: 'property_number',
                type: {
                    of: 'number',
                    cmatrix: {
                        index: '4_2_2_1',
                        reserved: false
                    },
                    format: {
                        _value: 10011,
                        _ver: 2
                    },
                    unit: {
                        _value: 10012,
                        _ver: 2
                    },
                    candidate: {
                        ns: [
                            'catalog/ext/unit-test/*',
                            'catalog/built_in/unit-test/*',
                            'catalog/model/unit-test/*'
                        ],
                        _code: [
                            {
                                _value: 10013,
                                _ver: 2
                            },
                            {
                                _value: 10014,
                                _ver: 2
                            }
                        ],
                        base: {
                            _value: 10015,
                            _ver: 2
                        }
                    }
                },
                description: 'サンプルnumber',
                isInherit: false
            }
        ],
        value: NULL,
        attribute: NULL
    };
    /**
    * カタログ(テンプレートプロパティstring各種設定)
    */
    export const templatePropertyFullString = {
        catalogItem: {
            ns: 'catalog/built_in/cmatrix/unit-test',
            name: 'ユニットテスト',
            _code: {
                _value: 10082,
                _ver: 2
            },
            inherit: NULL,
            description: 'ユニットテスト用の説明です。'
        },
        template: {
            _code: {
                _value: 10082,
                _ver: 2
            },
            index: '4_2_2_2',
            property_string: {
                index: '4_2_2_2',
                value: NULL
            },
            value: NULL
        },
        prop: [
            {
                key: 'property_string',
                type: {
                    of: 'string',
                    cmatrix: {
                        index: '4_2_2_2',
                        reserved: false
                    },
                    format: {
                        _value: 10011,
                        _ver: 2
                    },
                    unit: {
                        _value: 10012,
                        _ver: 2
                    },
                    candidate: {
                        ns: [
                            'catalog/ext/unit-test/*',
                            'catalog/built_in/unit-test/*',
                            'catalog/model/unit-test/*'
                        ],
                        _code: [
                            {
                                _value: 10013,
                                _ver: 2
                            },
                            {
                                _value: 10014,
                                _ver: 2
                            }
                        ],
                        base: {
                            _value: 10015,
                            _ver: 2
                        }
                    }
                },
                description: 'サンプルstring',
                isInherit: false
            }
        ],
        value: NULL,
        attribute: NULL
    };
    /**
    * カタログ(テンプレートプロパティboolean各種設定)
    */
    export const templatePropertyFullBoolean = {
        catalogItem: {
            ns: 'catalog/built_in/cmatrix/unit-test',
            name: 'ユニットテスト',
            _code: {
                _value: 10083,
                _ver: 2
            },
            inherit: NULL,
            description: 'ユニットテスト用の説明です。'
        },
        template: {
            _code: {
                _value: 10083,
                _ver: 2
            },
            index: '4_2_2_3',
            property_boolean: {
                index: '4_2_2_3',
                value: NULL
            },
            value: NULL
        },
        prop: [
            {
                key: 'property_boolean',
                type: {
                    of: 'boolean',
                    cmatrix: {
                        index: '4_2_2_3',
                        reserved: false
                    }
                },
                description: 'サンプルboolean',
                isInherit: false
            }
        ],
        value: NULL,
        attribute: NULL
    };
    /**
    * カタログ(テンプレートプロパティcode各種設定)
    */
    export const templatePropertyFullCode = {
        catalogItem: {
            ns: 'catalog/built_in/cmatrix/unit-test',
            name: 'ユニットテスト',
            _code: {
                _value: 10084,
                _ver: 2
            },
            inherit: NULL,
            description: 'ユニットテスト用の説明です。'
        },
        template: {
            _code: {
                _value: 10084,
                _ver: 2
            },
            index: '4_2_2_4',
            property_code: {
                index: '4_2_2_4',
                value: NULL
            },
            value: NULL
        },
        prop: [
            {
                key: 'property_code',
                type: {
                    of: 'code',
                    cmatrix: {
                        index: '4_2_2_4',
                        reserved: false
                    },
                    candidate: {
                        ns: [
                            'catalog/ext/unit-test/*',
                            'catalog/built_in/unit-test/*',
                            'catalog/model/unit-test/*'
                        ],
                        _code: [
                            {
                                _value: 10013,
                                _ver: 2
                            },
                            {
                                _value: 10014,
                                _ver: 2
                            }
                        ],
                        base: {
                            _value: 10015,
                            _ver: 2
                        }
                    }
                },
                description: 'サンプルcode',
                isInherit: false
            }
        ],
        value: NULL,
        attribute: NULL
    };
    /**
    * カタログ(テンプレートプロパティitem各種設定)
    */
    export const templatePropertyFullItem = {
        catalogItem: {
            ns: 'catalog/built_in/cmatrix/unit-test',
            name: 'ユニットテスト',
            _code: {
                _value: 10085,
                _ver: 2
            },
            inherit: NULL,
            description: 'ユニットテスト用の説明です。'
        },
        template: {
            _code: {
                _value: 10085,
                _ver: 2
            },
            index: '4_2_2_5',
            property_item: {
                index: '4_2_2_5',
                value: NULL
            },
            value: NULL
        },
        prop: [
            {
                key: 'property_item',
                type: {
                    of: 'item',
                    _code: {
                        _value: 10016,
                        _ver: 2
                    },
                    cmatrix: {
                        index: '4_2_2_5',
                        reserved: false
                    },
                    candidate: {
                        ns: [
                            'catalog/ext/unit-test/*',
                            'catalog/built_in/unit-test/*',
                            'catalog/model/unit-test/*'
                        ],
                        _code: [
                            {
                                _value: 10013,
                                _ver: 2
                            },
                            {
                                _value: 10014,
                                _ver: 2
                            }
                        ],
                        base: {
                            _value: 10015,
                            _ver: 2
                        }
                    }
                },
                description: 'サンプルitem',
                isInherit: false
            }
        ],
        value: NULL,
        attribute: NULL
    };
    /**
    * カタログ(テンプレートプロパティinner各種設定)
    */
    export const templatePropertyFullInner = {
        catalogItem: {
            ns: 'catalog/built_in/cmatrix/unit-test',
            name: 'ユニットテスト',
            _code: {
                _value: 10086,
                _ver: 2
            },
            inherit: NULL,
            description: 'ユニットテスト用の説明です。'
        },
        template: {
            _code: {
                _value: 10086,
                _ver: 2
            },
            index: '4_2_2_1',
            property_inner: {
                index: '4_2_2_6',
                value: {
                    inner_number: 110
                }
            },
            value: NULL
        },
        prop: [
            {
                key: 'property_inner',
                type: {
                    of: 'inner',
                    inner: 'PropertyInner',
                    cmatrix: {
                        index: '4_2_2_6',
                        reserved: false
                    },
                    candidate: {
                        ns: [
                            'catalog/ext/unit-test/*',
                            'catalog/built_in/unit-test/*',
                            'catalog/model/unit-test/*'
                        ],
                        _code: [
                            {
                                _value: 10013,
                                _ver: 2
                            },
                            {
                                _value: 10014,
                                _ver: 2
                            }
                        ],
                        base: {
                            _value: 10015,
                            _ver: 2
                        }
                    }
                },
                description: 'サンプルinner',
                isInherit: false
            }
        ],
        value: [
            {
                key: 'property_inner',
                value: [
                    {
                        key: 'inner_number',
                        value: 110
                    }
                ]
            }
        ],
        attribute: NULL
    };

    /**
    * カタログ(テンプレートプロパティnumber[]各種設定)
    */
    export const templatePropertyFullNumberArray = {
        catalogItem: {
            ns: 'catalog/built_in/cmatrix/unit-test',
            name: 'ユニットテスト',
            _code: {
                _value: 10091,
                _ver: 2
            },
            inherit: NULL,
            description: 'ユニットテスト用の説明です。'
        },
        template: {
            _code: {
                _value: 10091,
                _ver: 2
            },
            index: '4_2_2_1',
            property_number_array: [
                {
                    index: '4_2_2_1',
                    value: NULL
                }
            ],
            value: NULL
        },
        prop: [
            {
                key: 'property_number_array',
                type: {
                    of: 'number[]',
                    cmatrix: {
                        index: '4_2_2_1',
                        reserved: false
                    },
                    format: {
                        _value: 10011,
                        _ver: 2
                    },
                    unit: {
                        _value: 10012,
                        _ver: 2
                    },
                    candidate: {
                        ns: [
                            'catalog/ext/unit-test/*',
                            'catalog/built_in/unit-test/*',
                            'catalog/model/unit-test/*'
                        ],
                        _code: [
                            {
                                _value: 10013,
                                _ver: 2
                            },
                            {
                                _value: 10014,
                                _ver: 2
                            }
                        ],
                        base: {
                            _value: 10015,
                            _ver: 2
                        }
                    }
                },
                description: 'サンプルnumber[]',
                isInherit: false
            }
        ],
        value: NULL,
        attribute: NULL
    };
    /**
    * カタログ(テンプレートプロパティstring[]各種設定)
    */
    export const templatePropertyFullStringArray = {
        catalogItem: {
            ns: 'catalog/built_in/cmatrix/unit-test',
            name: 'ユニットテスト',
            _code: {
                _value: 10092,
                _ver: 2
            },
            inherit: NULL,
            description: 'ユニットテスト用の説明です。'
        },
        template: {
            _code: {
                _value: 10092,
                _ver: 2
            },
            index: '4_2_2_2',
            property_string_array: [
                {
                    index: '4_2_2_2',
                    value: NULL
                }
            ],
            value: NULL
        },
        prop: [
            {
                key: 'property_string_array',
                type: {
                    of: 'string[]',
                    cmatrix: {
                        index: '4_2_2_2',
                        reserved: false
                    },
                    format: {
                        _value: 10011,
                        _ver: 2
                    },
                    unit: {
                        _value: 10012,
                        _ver: 2
                    },
                    candidate: {
                        ns: [
                            'catalog/ext/unit-test/*',
                            'catalog/built_in/unit-test/*',
                            'catalog/model/unit-test/*'
                        ],
                        _code: [
                            {
                                _value: 10013,
                                _ver: 2
                            },
                            {
                                _value: 10014,
                                _ver: 2
                            }
                        ],
                        base: {
                            _value: 10015,
                            _ver: 2
                        }
                    }
                },
                description: 'サンプルstring[]',
                isInherit: false
            }
        ],
        value: NULL,
        attribute: NULL
    };
    /**
    * カタログ(テンプレートプロパティboolean[]各種設定)
    */
    export const templatePropertyFullBooleanArray = {
        catalogItem: {
            ns: 'catalog/built_in/cmatrix/unit-test',
            name: 'ユニットテスト',
            _code: {
                _value: 10093,
                _ver: 2
            },
            inherit: NULL,
            description: 'ユニットテスト用の説明です。'
        },
        template: {
            _code: {
                _value: 10093,
                _ver: 2
            },
            index: '4_2_2_3',
            property_boolean_array: [
                {
                    index: '4_2_2_3',
                    value: NULL
                }
            ],
            value: NULL
        },
        prop: [
            {
                key: 'property_boolean_array',
                type: {
                    of: 'boolean[]',
                    cmatrix: {
                        index: '4_2_2_3',
                        reserved: false
                    }
                },
                description: 'サンプルboolean[]',
                isInherit: false
            }
        ],
        value: NULL,
        attribute: NULL
    };
    /**
    * カタログ(テンプレートプロパティcode[]各種設定)
    */
    export const templatePropertyFullCodeArray = {
        catalogItem: {
            ns: 'catalog/built_in/cmatrix/unit-test',
            name: 'ユニットテスト',
            _code: {
                _value: 10094,
                _ver: 2
            },
            inherit: NULL,
            description: 'ユニットテスト用の説明です。'
        },
        template: {
            _code: {
                _value: 10094,
                _ver: 2
            },
            index: '4_2_2_4',
            property_code_array: [
                {
                    index: '4_2_2_4',
                    value: NULL
                }
            ],
            value: NULL
        },
        prop: [
            {
                key: 'property_code_array',
                type: {
                    of: 'code[]',
                    cmatrix: {
                        index: '4_2_2_4',
                        reserved: false
                    },
                    candidate: {
                        ns: [
                            'catalog/ext/unit-test/*',
                            'catalog/built_in/unit-test/*',
                            'catalog/model/unit-test/*'
                        ],
                        _code: [
                            {
                                _value: 10013,
                                _ver: 2
                            },
                            {
                                _value: 10014,
                                _ver: 2
                            }
                        ],
                        base: {
                            _value: 10015,
                            _ver: 2
                        }
                    }
                },
                description: 'サンプルcode[]',
                isInherit: false
            }
        ],
        value: NULL,
        attribute: NULL
    };
    /**
    * カタログ(テンプレートプロパティitem[]各種設定)
    */
    export const templatePropertyFullItemArray = {
        catalogItem: {
            ns: 'catalog/built_in/cmatrix/unit-test',
            name: 'ユニットテスト',
            _code: {
                _value: 10095,
                _ver: 2
            },
            inherit: NULL,
            description: 'ユニットテスト用の説明です。'
        },
        template: {
            _code: {
                _value: 10095,
                _ver: 2
            },
            index: '4_2_2_5',
            property_item_array: [
                {
                    index: '4_2_2_5',
                    value: NULL
                }
            ],
            value: NULL
        },
        prop: [
            {
                key: 'property_item_array',
                type: {
                    of: 'item[]',
                    cmatrix: {
                        index: '4_2_2_5',
                        reserved: false
                    },
                    candidate: {
                        ns: [
                            'catalog/ext/unit-test/*',
                            'catalog/built_in/unit-test/*',
                            'catalog/model/unit-test/*'
                        ],
                        _code: [
                            {
                                _value: 10013,
                                _ver: 2
                            },
                            {
                                _value: 10014,
                                _ver: 2
                            }
                        ],
                        base: {
                            _value: 10015,
                            _ver: 2
                        }
                    }
                },
                description: 'サンプルitem[]',
                isInherit: false
            }
        ],
        value: NULL,
        attribute: NULL
    };
    /**
    * カタログ(テンプレートプロパティinner[]各種設定)
    */
    export const templatePropertyFullInnerArray = {
        catalogItem: {
            ns: 'catalog/built_in/cmatrix/unit-test',
            name: 'ユニットテスト',
            _code: {
                _value: 10096,
                _ver: 2
            },
            inherit: NULL,
            description: 'ユニットテスト用の説明です。'
        },
        template: {
            _code: {
                _value: 10096,
                _ver: 2
            },
            index: '4_2_2_1',
            property_inner_array: [
                {
                    index: '4_2_2_6',
                    value: {
                        inner_number: 110
                    }
                }
            ],
            value: NULL
        },
        prop: [
            {
                key: 'property_inner_array',
                type: {
                    of: 'inner[]',
                    inner: 'PropertyInnerArray',
                    cmatrix: {
                        index: '4_2_2_6',
                        reserved: false
                    },
                    candidate: {
                        ns: [
                            'catalog/ext/unit-test/*',
                            'catalog/built_in/unit-test/*',
                            'catalog/model/unit-test/*'
                        ],
                        _code: [
                            {
                                _value: 10013,
                                _ver: 2
                            },
                            {
                                _value: 10014,
                                _ver: 2
                            }
                        ],
                        base: {
                            _value: 10015,
                            _ver: 2
                        }
                    }
                },
                description: 'サンプルinner[]',
                isInherit: false
            }
        ],
        value: [
            {
                key: 'property_inner_array',
                value: [
                    {
                        key: 'inner_number',
                        value: 110
                    }
                ]
            }
        ],
        attribute: NULL
    };
}
