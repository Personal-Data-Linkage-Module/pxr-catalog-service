/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/**
 * カタログリクエスト(モデル)
 */
export namespace CatalogModelErrorRequest {
    /**
     * null設定オブジェクト
     */
    const NULL: any = null;

    /**
    * 対象ネームスペースなし
    */
    export const notFoundNamespace = {
        "catalogItem": {
            "ns": "catalog/model/not-found/unit-test",
            "name": "ユニットテスト",
            "description": NULL,
            "_code": NULL,
            "inherit": NULL
        },
        "template": NULL,
        "inner": NULL,
        "attribute": NULL
    };
    /**
    * 存在しないカタログを継承
    */
    export const notFoundInheritCatalog = {
        "catalogItem": {
            "ns": "catalog/model/unit-test",
            "name": "ユニットテスト",
            "description": NULL,
            "_code": {
                "_value": 1001,
                "_ver": 1
            },
            "inherit": {
                "_value": 9999,
                "_ver": 1
            }
        },
        "template": NULL,
        "inner": NULL,
        "attribute": NULL
    };
    /**
    * プロパティのみ存在しない
    */
    export const templateNoProp = {
        "catalogItem": {
            "ns": "catalog/model/unit-test",
            "name": "ユニットテスト",
            "description": NULL,
            "_code": {
                "_value": 1002,
                "_ver": 1
            },
            "inherit": NULL
        },
        "template": {
            "prop": NULL,
            "value": NULL
        },
        "inner": NULL,
        "attribute": NULL
    };
    /**
    * 存在しないカタログコード(format, unit)
    */
    export const notFoundCatalogFormatUnit = {
        "catalogItem": {
            "ns": "catalog/model/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 1003,
                "_ver": 1
            },
            "inherit": NULL
        },
        "template": {
            "prop": [
                {
                    "key": "test_number",
                    "type": {
                        "of": "number",
                        "cmatrix": NULL,
                        "format": NULL,
                        "unit": NULL,
                        "candidate": NULL
                    },
                    "description": "サンプルnumber"
                },
                {
                    "key": "property_number",
                    "type": {
                        "of": "number",
                        "cmatrix": NULL,
                        "format": {
                            "_value": 5001,
                            "_ver": 1
                        },
                        "unit": {
                            "_value": 5002,
                            "_ver": 1
                        },
                        "candidate": NULL
                    },
                    "description": "サンプルnumber"
                }
            ],
            "value": [
                {
                    "key": "property_number",
                    "value": 100
                }
            ]
        },
        "inner": NULL,
        "attribute": NULL
    };
    /**
    * 存在しないカタログコード(_code)
    */
    export const notFoundCatalogCode = {
        "catalogItem": {
            "ns": "catalog/model/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 1004,
                "_ver": 1
            },
            "inherit": NULL
        },
        "template": {
            "prop": [
                {
                    "key": "property_item",
                    "type": {
                        "of": "item",
                        "_code": {
                            "_value": 5003,
                            "_ver": 1
                        },
                        "cmatrix": NULL,
                        "candidate": {
                            "ns": NULL,
                            "_code": [
                                {
                                    "_value": 5004,
                                    "_ver": 1
                                },
                                {
                                    "_value": 5005,
                                    "_ver": 1
                                },
                            ],
                            "base": {
                                "_value": 5006,
                                "_ver": 1
                            }
                        }
                    },
                    "description": "サンプルitem"
                }
            ],
            "value": NULL
        },
        "inner": NULL,
        "attribute": NULL
    };
    /**
    * 対象ネームスペースなし(candidate-ns)
    */
    export const candidateNotFoundNamespace = {
        "catalogItem": {
            "ns": "catalog/model/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 1005,
                "_ver": 1
            },
            "inherit": NULL
        },
        "template": {
            "prop": [
                {
                    "key": "property_item",
                    "type": {
                        "of": "item",
                        "_code": {
                            "_value": 5003,
                            "_ver": 1
                        },
                        "cmatrix": NULL,
                        "candidate": {
                            "ns": [
                                "catalog/ext/not-found/unit-test/*",
                                "catalog/built_in/unit-test/*",
                                "catalog/model/unit-test/*"
                            ],
                            "_code": [
                                {
                                    "_value": 5004,
                                    "_ver": 1
                                },
                                {
                                    "_value": 5005,
                                    "_ver": 1
                                },
                            ],
                            "base": {
                                "_value": 5006,
                                "_ver": 1
                            }
                        }
                    },
                    "description": "サンプルitem"
                }
            ],
            "value": NULL
        },
        "inner": NULL,
        "attribute": NULL
    };
    /**
    * プロパティのないカタログを継承
    */
    export const inheritNotTemplate = {
        "catalogItem": {
            "ns": "catalog/model/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 1006,
                "_ver": 1
            },
            "inherit": {
                "_value": 1002,
                "_ver": 1
            }
        },
        "template": {
            "prop": [
                {
                    "key": "property_item",
                    "type": {
                        "of": "item",
                        "_code": {
                            "_value": 5003,
                            "_ver": 1
                        },
                        "cmatrix": NULL,
                        "candidate": {
                            "ns": [
                                "catalog/ext/unit-test",
                                "catalog/built_in/unit-test",
                                "catalog/model/unit-test"
                            ],
                            "_code": NULL,
                            "base": NULL
                        }
                    },
                    "description": "サンプルitem"
                }
            ],
            "value": NULL
        },
        "inner": NULL,
        "attribute": NULL
    };
    /**
    * 内部クラスの参照先がコードオブジェクト
    */
    export const innerCode = {
        "catalogItem": {
            "ns": "catalog/model/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 1008,
                "_ver": 1
            },
            "inherit": NULL
        },
        "template": {
            "prop": [
                {
                    "key": "property_inner",
                    "type": {
                        "of": "inner",
                        "inner": "PropertyInner",
                        "cmatrix": NULL,
                        "candidate": NULL
                    },
                    "description": "サンプルinner"
                },
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
                    "key": "property_inner",
                    "value": [
                        {
                            "key": "inner_code",
                            "value": [
                                {
                                    "key": "_value",
                                    "value": 1003
                                },
                                {
                                    "key": "_ver",
                                    "value": 1
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        "inner": [
            {
                "name": "PropertyInner",
                "description": "サンプルinnerです。",
                "template": {
                    "inherit": NULL,
                    "prop": [
                        {
                            "key": "inner_code",
                            "type": {
                                "of": "code",
                                "cmatrix": NULL,
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
                "_value": 1009,
                "_ver": 1
            },
            "inherit": NULL
        },
        "template": {
            "prop": [
                {
                    "key": "property_XXXX",
                    "type": {
                        "of": "XXXX",
                        "cmatrix": NULL,
                        "format": NULL,
                        "unit": NULL,
                        "candidate": NULL
                    },
                    "description": "サンプルXXXX"
                }
            ],
            "value": NULL
        },
        "inner": NULL,
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
                "_value": 1010,
                "_ver": 1
            },
            "inherit": {
                "_value": 1003,
                "_ver": 1
            }
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
}
