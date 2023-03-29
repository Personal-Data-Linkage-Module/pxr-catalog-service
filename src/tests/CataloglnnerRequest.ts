/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/**
 * カタログリクエスト(モデル)
 */
export namespace CatalogInnerRequest {
    /**
     * null設定オブジェクト
     */
    const NULL: any = null;

    /**
    * カタログ(テンプレートプロパティinner指定)
    */
    export const valueInner = {
        "catalogItem": {
            "ns": "catalog/model/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 1,
                "_ver": 1
            },
            "inherit": NULL
        },
        "template": {
            "prop": [
                {
                    "key": "value_inner",
                    "type": {
                        "of": "inner",
                        "inner": "ValueInner",
                        "cmatrix": NULL,
                        "candidate": NULL
                    },
                    "description": "サンプルinner"
                }
            ],
            "value": [
                {
                    "key": "value_inner",
                    "value": [
                        {
                            "key": "inner_number",
                            "value": 101
                        }
                    ]
                }
            ]
        },
        "inner": [
            {
                "name": "ValueInner",
                "description": "サンプルinnerです。",
                "template": {
                    "inherit": NULL,
                    "prop": [
                        {
                            "key": "inner_number",
                            "type": {
                                "of": "number",
                                "cmatrix": NULL,
                                "format": NULL,
                                "unit": NULL,
                                "candidate": NULL
                            },
                            "description": "サンプルnumber"
                        }
                    ]
                },
                "inner": NULL
            }
        ],
        "attribute": NULL
    };
    /**
    * カタログ(値指定inner[]指定)
    */
    export const valueInnerArray = {
        "catalogItem": {
            "ns": "catalog/model/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 2,
                "_ver": 1
            },
            "inherit": NULL
        },
        "template": {
            "prop": [
                {
                    "key": "value_inner_array",
                    "type": {
                        "of": "inner[]",
                        "inner": "ValueInnerArray",
                        "cmatrix": NULL,
                        "candidate": NULL
                    },
                    "description": "サンプルinner[]"
                }
            ],
            "value": [
                {
                    "key": "value_inner",
                    "value": [
                        {
                            "key": "inner_number",
                            "value": 101
                        }
                    ]
                },
                {
                    "key": "value_inner",
                    "value": [
                        {
                            "key": "inner_number",
                            "value": 102
                        }
                    ]
                }
            ]
        },
        "inner": [
            {
                "name": "ValueInnerArray",
                "description": "サンプルinner[]です。",
                "template": {
                    "inherit": NULL,
                    "prop": [
                        {
                            "key": "inner_number",
                            "type": {
                                "of": "number",
                                "cmatrix": NULL,
                                "format": NULL,
                                "unit": NULL,
                                "candidate": NULL
                            },
                            "description": "サンプルnumber"
                        }
                    ]
                },
                "inner": NULL
            }
        ],
        "attribute": NULL
    };
    /**
    * カタログ(継承、プロパティinner)
    */
    export const inheritPropertyInner = {
        "catalogItem": {
            "ns": "catalog/model/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 3,
                "_ver": 1
            },
            "inherit": {
                "_value": 1,
                "_ver": 1
            }
        },
        "template": {
            "prop": [
                {
                    "key": "inherit_inner",
                    "type": {
                        "of": "inner",
                        "inner": "InheritInner",
                        "cmatrix": NULL,
                        "candidate": NULL
                    },
                    "description": "継承サンプルinner"
                }
            ],
            "value": NULL
        },
        "inner": [
            {
                "name": "InheritInner",
                "description": "サンプルinnerです。",
                "template": {
                    "inherit": NULL,
                    "prop": [
                        {
                            "key": "inner_number",
                            "type": {
                                "of": "number",
                                "cmatrix": NULL,
                                "format": NULL,
                                "unit": NULL,
                                "candidate": NULL
                            },
                            "description": "サンプルnumber"
                        }
                    ]
                },
                "inner": NULL
            }
        ],
        "attribute": NULL
    };
    /**
    * 最小限カタログ
    */
    export const minimum = {
        "catalogItem": {
            "ns": "catalog/model/unit-test",
            "name": "ユニットテスト",
            "description": NULL,
            "_code": {
                "_value": 4,
                "_ver": 1
            },
            "inherit": NULL
        },
        "template": NULL,
        "inner": NULL,
        "attribute": NULL
    };
    /**
    * カタログ(継承、プロパティnone)
    */
    export const inheritNonePropertyInner = {
        "catalogItem": {
            "ns": "catalog/model/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 5,
                "_ver": 1
            },
            "inherit": {
                "_value": 4,
                "_ver": 1
            }
        },
        "template": {
            "prop": [
                {
                    "key": "inherit_inner",
                    "type": {
                        "of": "inner",
                        "inner": "InheritInner",
                        "cmatrix": NULL,
                        "candidate": NULL
                    },
                    "description": "継承サンプルinner"
                }
            ],
            "value": NULL
        },
        "inner": [
            {
                "name": "InheritInner",
                "description": "サンプルinnerです。",
                "template": {
                    "inherit": NULL,
                    "prop": [
                        {
                            "key": "inner_number",
                            "type": {
                                "of": "number",
                                "cmatrix": NULL,
                                "format": NULL,
                                "unit": NULL,
                                "candidate": NULL
                            },
                            "description": "サンプルnumber"
                        }
                    ]
                },
                "inner": NULL
            }
        ],
        "attribute": NULL
    };
    /**
    * 対象のプロパティが存在しない
    */
    export const notFoundPropery = {
        "catalogItem": {
            "ns": "catalog/model/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 6,
                "_ver": 1
            },
            "inherit": NULL
        },
        "template": {
            "prop": NULL,
            "value": [
                {
                    "key": "test",
                    "value": 100
                }
            ]
        },
        "inner": NULL,
        "attribute": NULL
    };
    /**
    * カタログ(継承、プロパティnone)
    */
    export const inheritNonePropertyInner2 = {
        "catalogItem": {
            "ns": "catalog/model/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 7,
                "_ver": 1
            },
            "inherit": {
                "_value": 6,
                "_ver": 1
            }
        },
        "template": {
            "prop": [
                {
                    "key": "inherit_inner",
                    "type": {
                        "of": "inner",
                        "inner": "InheritInner",
                        "cmatrix": NULL,
                        "candidate": NULL
                    },
                    "description": "継承サンプルinner"
                }
            ],
            "value": NULL
        },
        "inner": [
            {
                "name": "InheritInner",
                "description": "サンプルinnerです。",
                "template": {
                    "inherit": NULL,
                    "prop": [
                        {
                            "key": "inner_number",
                            "type": {
                                "of": "number",
                                "cmatrix": NULL,
                                "format": NULL,
                                "unit": NULL,
                                "candidate": NULL
                            },
                            "description": "サンプルnumber"
                        }
                    ]
                },
                "inner": NULL
            }
        ],
        "attribute": NULL
    };
    /**
    * 存在しない型
    */
    export const notFoundType = {
        "catalogItem": {
            "ns": "catalog/model/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 8,
                "_ver": 1
            },
            "inherit": NULL
        },
        "template": {
            "prop": [
                {
                    "key": "property_number",
                    "type": {
                        "of": "number",
                        "cmatrix": NULL,
                        "format": NULL,
                        "unit": NULL,
                        "candidate": NULL
                    },
                    "description": "サンプルnumber"
                }
            ],
            "value": [
                {
                    "key": "test",
                    "value": 100
                }
            ]
        },
        "inner": NULL,
        "attribute": NULL
    };
    /**
    * カタログ(継承、存在しない型)
    */
    export const inheritNotFoundType = {
        "catalogItem": {
            "ns": "catalog/model/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 9,
                "_ver": 1
            },
            "inherit": {
                "_value": 8,
                "_ver": 1
            }
        },
        "template": {
            "prop": [
                {
                    "key": "inherit_inner",
                    "type": {
                        "of": "inner",
                        "inner": "InheritInner",
                        "cmatrix": NULL,
                        "candidate": NULL
                    },
                    "description": "継承サンプルinner"
                }
            ],
            "value": NULL
        },
        "inner": [
            {
                "name": "InheritInner",
                "description": "サンプルinnerです。",
                "template": {
                    "inherit": NULL,
                    "prop": [
                        {
                            "key": "inner_number",
                            "type": {
                                "of": "number",
                                "cmatrix": NULL,
                                "format": NULL,
                                "unit": NULL,
                                "candidate": NULL
                            },
                            "description": "サンプルnumber"
                        }
                    ]
                },
                "inner": NULL
            }
        ],
        "attribute": NULL
    };

    /**
    * カタログ(inherit用カタログ)
    */
    export const inheritCatalog11 = {
        catalogItem: {
            ns: 'catalog/model/cmatrix/unit-test',
            name: '個人識別子列',
            description: 'CMatrixの個人識別子列の定義です。',
            _code: {
                _value: 11,
                _ver: NULL
            },
            inherit: NULL
        },
        template: {
            prop: [
                {
                    key: 'inherit_inner',
                    type: {
                        of: 'inner',
                        inner: '@value',
                        cmatrix: {
                            index: '1_1',
                            reserved: true
                        },
                        candidate: NULL
                    },
                    description: '継承サンプルinner'
                }
            ],
            value: NULL
        },
        inner: [
            {
                name: '@value',
                description: 'サンプルinnerです。',
                template: {
                    inherit: NULL,
                    prop: [
                        {
                            key: '@value',
                            type: {
                                of: 'string',
                                cmatrix: {
                                    index: '1_1',
                                    reserved: true
                                },
                                unit: NULL,
                                candidate: NULL
                            },
                            description: 'サンプルnumber'
                        }
                    ]
                },
                inner: NULL
            }
        ],
        attribute: NULL
    };
    
    /**
    * カタログ(cmatrix、継承あり)
    */
    export const inheritCatalog12 = {
        catalogItem: {
            ns: 'catalog/model/cmatrix/unit-test',
            name: '生年月日列',
            description: 'CMatrixの生年月日列の定義です。',
            _code: {
                _value: 12,
                _ver: NULL
            },
            inherit: {
                _value: 11,
                _ver: 1
            }
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
                        unit: NULL,
                        candidate: NULL
                    }
                },
                {
                    key: 'inherit_inner',
                    type: {
                        of: 'inner',
                        inner: '@value',
                        cmatrix: {
                            index: '1_1',
                            reserved: true
                        },
                        candidate: NULL
                    },
                    description: '継承サンプルinner'
                },
                {
                    key: 'inherit_inner',
                    type: {
                        of: 'inner',
                        inner: '@value',
                        cmatrix: {
                            index: '1_2',
                            reserved: true
                        },
                        candidate: NULL
                    },
                    description: '継承サンプルinner'
                }
            ],
            value: NULL
        },
        inner: [
            {
                name: '@value',
                description: 'サンプルinnerです。',
                template: {
                    inherit: NULL,
                    prop: [
                        {
                            key: '@value',
                            type: {
                                of: 'string',
                                cmatrix: {
                                    index: '1_1',
                                    reserved: true
                                },
                                unit: NULL,
                                candidate: NULL
                            },
                            description: 'サンプルnumber'
                        }
                    ]
                },
                inner: NULL
            },
            {
                name: '@value',
                description: 'サンプルinnerです。',
                template: {
                    inherit: NULL,
                    prop: [
                        {
                            key: '@value',
                            type: {
                                of: 'string',
                                cmatrix: {
                                    index: '1_2',
                                    reserved: true
                                },
                                unit: NULL,
                                candidate: NULL
                            },
                            description: 'サンプルnumber'
                        }
                    ]
                },
                inner: NULL
            }
        ],
        attribute: NULL
    };

    /**
    * カタログ(cmatrix以外、継承あり、2重)
    */
     export const inheritNotCmatrix = {
        catalogItem: {
            ns: 'catalog/model/unit-test',
            name: 'ユニットテスト',
            description: 'ユニットテスト用説明',
            _code: {
                _value: 13,
                _ver: NULL
            },
            inherit: {
                _value: 12,
                _ver: 1
            }
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
                        unit: NULL,
                        candidate: NULL
                    }
                },
                {
                    key: 'inherit_inner',
                    type: {
                        of: 'inner',
                        inner: '@value',
                        cmatrix: {
                            index: '1_1',
                            reserved: true
                        },
                        candidate: NULL
                    },
                    description: '継承サンプルinner'
                }
            ],
            value: NULL
        },
        inner: [
            {
                name: '@value',
                description: 'サンプルinnerです。',
                template: {
                    inherit: NULL,
                    prop: [
                        {
                            key: '@value',
                            type: {
                                of: 'string',
                                cmatrix: {
                                    index: '1_1',
                                    reserved: true
                                },
                                unit: NULL,
                                candidate: NULL
                            },
                            description: 'サンプルnumber'
                        }
                    ]
                },
                inner: NULL
            }
        ],
        attribute: NULL
    };
    
}
