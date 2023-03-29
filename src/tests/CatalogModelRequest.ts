/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import { Any } from "typeorm";

/**
 * カタログリクエスト(モデル)
 */
export namespace CatalogModelRequest {
    /**
     * null設定オブジェクト
     */
    const NULL: any = null;

    /**
    * 最小限カタログ
    */
    export const minimum = {
        "catalogItem": {
            "ns": "catalog/model/unit-test",
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
    * 最小限カタログ(コード指定)
    * # ERROR
    */
    export const minimumCode = {
        "catalogItem": {
            "ns": "catalog/model/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 2,
                "_ver": NULL
            },
            "inherit": NULL
        },
        "template": NULL,
        "inner": NULL,
        "attribute": NULL
    };
    /**
    * 最小限カタログ(コード、バージョン指定)
    */
    export const minimumCodeVersion = {
        "catalogItem": {
            "ns": "catalog/model/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 3,
                "_ver": 1
            },
            "inherit": NULL
        },
        "template": NULL,
        "inner": NULL,
        "attribute": NULL
    };
    /**
    * 最小限カタログ(コード、バージョン指定、削除済み)
    */
     export const minimumCodeVersionDeleted = {
        "catalogItem": {
            "ns": "catalog/model/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 4,
                "_ver": 2
            },
            "inherit": NULL
        },
        "template": NULL,
        "inner": NULL,
        "attribute": NULL
    };

    /**
    * カタログ(テンプレートプロパティnumber指定)
    */
    export const templatePropertyNumber = {
        "catalogItem": {
            "ns": "catalog/model/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 11,
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
            "value": NULL
        },
        "inner": NULL,
        "attribute": NULL
    };
    /**
    * カタログ(テンプレートプロパティstring指定)
    */
    export const templatePropertyString = {
        "catalogItem": {
            "ns": "catalog/model/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 12,
                "_ver": 1
            },
            "inherit": NULL
        },
        "template": {
            "prop": [
                {
                    "key": "property_string",
                    "type": {
                        "of": "string",
                        "cmatrix": NULL,
                        "format": NULL,
                        "unit": NULL,
                        "candidate": NULL
                    },
                    "description": "サンプルstring"
                }
            ],
            "value": NULL
        },
        "inner": NULL,
        "attribute": NULL
    };
    /**
    * カタログ(テンプレートプロパティboolean指定)
    */
    export const templatePropertyBoolean = {
        "catalogItem": {
            "ns": "catalog/model/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 13,
                "_ver": 1
            },
            "inherit": NULL
        },
        "template": {
            "prop": [
                {
                    "key": "property_boolean",
                    "type": {
                        "of": "boolean",
                        "cmatrix": NULL
                    },
                    "description": "サンプルboolean"
                }
            ],
            "value": NULL
        },
        "inner": NULL,
        "attribute": NULL
    };
    /**
    * カタログ(テンプレートプロパティcode指定)
    */
    export const templatePropertyCode = {
        "catalogItem": {
            "ns": "catalog/model/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 14,
                "_ver": 1
            },
            "inherit": NULL
        },
        "template": {
            "prop": [
                {
                    "key": "property_code",
                    "type": {
                        "of": "code",
                        "cmatrix": NULL,
                        "candidate": NULL
                    },
                    "description": "サンプルcode"
                }
            ],
            "value": NULL
        },
        "inner": NULL,
        "attribute": NULL
    };
    /**
    * カタログ(テンプレートプロパティitem指定)
    */
    export const templatePropertyItem = {
        "catalogItem": {
            "ns": "catalog/model/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 15,
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
                        "_code": NULL,
                        "cmatrix": NULL,
                        "candidate": NULL
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
    * カタログ(テンプレートプロパティinner指定)
    * #ERROR
    */
    export const templatePropertyInner = {
        "catalogItem": {
            "ns": "catalog/model/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 16,
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
                }
            ],
            "value": NULL
        },
        "inner": NULL,
        "attribute": NULL
    };
    /**
    * カタログ(テンプレートプロパティnumber[]指定)
    */
    export const templatePropertyNumberArray = {
        "catalogItem": {
            "ns": "catalog/model/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 21,
                "_ver": 1
            },
            "inherit": NULL
        },
        "template": {
            "prop": [
                {
                    "key": "property_number_array",
                    "type": {
                        "of": "number[]",
                        "cmatrix": NULL,
                        "format": NULL,
                        "unit": NULL,
                        "candidate": {
                            "ns": NULL,
                            "_code": NULL,
                            "base": NULL
                        }
                    },
                    "description": "サンプルnumber[]"
                }
            ],
            "value": NULL
        },
        "inner": NULL,
        "attribute": NULL
    };
    /**
    * カタログ(テンプレートプロパティstring[]指定)
    */
    export const templatePropertyStringArray = {
        "catalogItem": {
            "ns": "catalog/model/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 22,
                "_ver": 1
            },
            "inherit": NULL
        },
        "template": {
            "prop": [
                {
                    "key": "property_string_array",
                    "type": {
                        "of": "string[]",
                        "cmatrix": NULL,
                        "format": NULL,
                        "unit": NULL,
                        "candidate": {
                            "ns": NULL,
                            "_code": NULL,
                            "base": NULL
                        }
                    },
                    "description": "サンプルstring[]"
                }
            ],
            "value": NULL
        },
        "inner": NULL,
        "attribute": NULL
    };
    /**
    * カタログ(テンプレートプロパティboolean[]指定)
    */
    export const templatePropertyBooleanArray = {
        "catalogItem": {
            "ns": "catalog/model/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 23,
                "_ver": 1
            },
            "inherit": NULL
        },
        "template": {
            "prop": [
                {
                    "key": "property_boolean_array",
                    "type": {
                        "of": "boolean[]",
                        "cmatrix": NULL
                    },
                    "description": "サンプルboolean[]"
                }
            ],
            "value": NULL
        },
        "inner": NULL,
        "attribute": NULL
    };
    /**
    * カタログ(テンプレートプロパティcode[]指定)
    */
    export const templatePropertyCodeArray = {
        "catalogItem": {
            "ns": "catalog/model/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 24,
                "_ver": 1
            },
            "inherit": NULL
        },
        "template": {
            "prop": [
                {
                    "key": "property_code_array",
                    "type": {
                        "of": "code[]",
                        "cmatrix": NULL,
                        "candidate": {
                            "ns": NULL,
                            "_code": NULL,
                            "base": NULL
                        }
                    },
                    "description": "サンプルcode[]"
                }
            ],
            "value": NULL
        },
        "inner": NULL,
        "attribute": NULL
    };
    /**
    * カタログ(テンプレートプロパティitem[]指定)
    */
    export const templatePropertyItemArray = {
        "catalogItem": {
            "ns": "catalog/model/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 25,
                "_ver": 1
            },
            "inherit": NULL
        },
        "template": {
            "prop": [
                {
                    "key": "property_item_array",
                    "type": {
                        "of": "item[]",
                        "cmatrix": NULL,
                        "candidate": {
                            "ns": NULL,
                            "_code": NULL,
                            "base": NULL
                        }
                    },
                    "description": "サンプルitem[]"
                }
            ],
            "value": NULL
        },
        "inner": NULL,
        "attribute": NULL
    };
    /**
    * カタログ(テンプレートプロパティinner[]指定)
    * #ERROR
    */
    export const templatePropertyInnerArray = {
        "catalogItem": {
            "ns": "catalog/model/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 26,
                "_ver": 1
            },
            "inherit": NULL
        },
        "template": {
            "prop": [
                {
                    "key": "property_inner_array",
                    "type": {
                        "of": "inner[]",
                        "inner": "PropertyInnerArray",
                        "cmatrix": NULL,
                        "candidate": {
                            "ns": NULL,
                            "_code": NULL,
                            "base": NULL
                        }
                    },
                    "description": "サンプルinner[]"
                }
            ],
            "value": NULL
        },
        "inner": NULL,
        "attribute": NULL
    };
    /**
    * カタログ(属性指定値なし)
    */
    export const attributeValueNone = {
        "catalogItem": {
            "ns": "catalog/model/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 31,
                "_ver": 1
            },
            "inherit": NULL
        },
        "template": NULL,
        "inner": NULL,
        "attribute": {
            "objects": [
                {
                    "key": {
                        "_value": 1111,
                        "_ver": 1
                    },
                    "value": NULL,
                    "description": "属性指定値なし"
                }
            ],
            "tags": [
                {
                    "ns": "catalog/model/unit-test",
                    "values": NULL
                }
            ]
        }
    };
    /**
    * カタログ(属性指定値あり)
    */
    export const attributeValueAvail = {
        "catalogItem": {
            "ns": "catalog/model/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 32,
                "_ver": 1
            },
            "inherit": NULL
        },
        "template": NULL,
        "inner": NULL,
        "attribute": {
            "objects": [
                {
                    "key": {
                        "_value": 30004,
                        "_ver": 1
                    },
                    "value": {
                        "company": {
                            "_value": 1000055,
                            "_ver": 1
                        },
                        "manufacturing-name": "鼓膜温センサー",
                        "model-number": "C-Temp"
                    },
                    "description": "センサー属性"
                }
            ],
            "tags": [
                {
                    "ns": "catalog/model/unit-test",
                    "values": [
                        {
                            "_value": 124124,
                            "_ver": 1
                        }
                    ]
                }
            ]
        }
    };
    /**
    * カタログ(属性指定値あり、Objectなし)
    */
     export const attributeValueAvailNoObject = {
        "catalogItem": {
            "ns": "catalog/model/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 33,
                "_ver": 1
            },
            "inherit": NULL
        },
        "template": NULL,
        "inner": NULL,
        "attribute": {
            "objects": NULL,
            "tags": [
                {
                    "ns": "catalog/model/unit-test",
                    "values": [
                        {
                            "_value": 124124,
                            "_ver": 1
                        }
                    ]
                }
            ]
        }
    };
    /**
    * カタログ(属性指定値あり、keyなし)
    */
     export const attributeValueAvailNokey = {
        "catalogItem": {
            "ns": "catalog/model/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 34,
                "_ver": 1
            },
            "inherit": NULL
        },
        "template": NULL,
        "inner": NULL,
        "attribute": {
            "objects": [
                {
                    "key": NULL,
                    "value": {
                        "company": {
                            "_value": 1000055,
                            "_ver": 1
                        },
                        "manufacturing-name": "鼓膜温センサー",
                        "model-number": "C-Temp"
                    },
                    "description": "センサー属性"
                }
            ],
            "tags": [
                {
                    "ns": "catalog/model/unit-test",
                    "values": [
                        {
                            "_value": 124124,
                            "_ver": 1
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
        "catalogItem": {
            "ns": "catalog/model/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 41,
                "_ver": 1
            },
            "inherit": NULL
        },
        "template": {
            "prop": [
                {
                    "key": "value_number",
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
                    "key": "value_number",
                    "value": 100
                }
            ]
        },
        "inner": NULL,
        "attribute": NULL
    };
    /**
    * カタログ(値指定string)
    */
    export const valueString = {
        "catalogItem": {
            "ns": "catalog/model/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 42,
                "_ver": 1
            },
            "inherit": NULL
        },
        "template": {
            "prop": [
                {
                    "key": "value_string",
                    "type": {
                        "of": "string",
                        "cmatrix": NULL,
                        "format": NULL,
                        "unit": NULL,
                        "candidate": NULL
                    },
                    "description": "サンプルstring"
                }
            ],
            "value": [
                {
                    "key": "value_string",
                    "value": "sample_string"
                }
            ]
        },
        "inner": NULL,
        "attribute": NULL
    };
    /**
    * カタログ(値指定boolean)
    */
    export const valueBoolean = {
        "catalogItem": {
            "ns": "catalog/model/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 43,
                "_ver": 1
            },
            "inherit": NULL
        },
        "template": {
            "prop": [
                {
                    "key": "value_boolean",
                    "type": {
                        "of": "boolean"
                    },
                    "description": "サンプルboolean"
                }
            ],
            "value": [
                {
                    "key": "value_boolean",
                    "value": true
                }
            ]
        },
        "inner": NULL,
        "attribute": NULL
    };
    /**
    * カタログ(値指定code)
    */
    export const valueCode = {
        "catalogItem": {
            "ns": "catalog/model/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 44,
                "_ver": 1
            },
            "inherit": NULL
        },
        "template": {
            "prop": [
                {
                    "key": "value_code",
                    "type": {
                        "of": "code",
                        "cmatrix": NULL,
                        "candidate": NULL
                    },
                    "description": "サンプルcode"
                }
            ],
            "value": [
                {
                    "key": "value_code",
                    "value": [
                        {
                            "key": "_value",
                            "value": 11
                        },
                        {
                            "key": "_ver",
                            "value": 1
                        }
                    ]
                }
            ]
        },
        "inner": NULL,
        "attribute": NULL
    };
    /**
    * カタログ(値指定item)
    */
    export const valueItem = {
        "catalogItem": {
            "ns": "catalog/model/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 45,
                "_ver": 1
            },
            "inherit": NULL
        },
        "template": {
            "prop": [
                {
                    "key": "value_item",
                    "type": {
                        "of": "item",
                        "_code": NULL,
                        "cmatrix": NULL,
                        "candidate": NULL
                    },
                    "description": "サンプルitem"
                }
            ],
            "value": [
                {
                    "key": "value_item",
                    "value": [
                        {
                            "key": "_value",
                            "value": 11
                        },
                        {
                            "key": "_ver",
                            "value": 1
                        }
                    ]
                }
            ]
        },
        "inner": NULL,
        "attribute": NULL
    };
    /**
    * カタログ(テンプレートプロパティinner指定)
    */
    export const valueInner = {
        "catalogItem": {
            "ns": "catalog/model/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 46,
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
    * カタログ(値指定number[])
    */
    export const valueNumberArray = {
        "catalogItem": {
            "ns": "catalog/model/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 51,
                "_ver": 1
            },
            "inherit": NULL
        },
        "template": {
            "prop": [
                {
                    "key": "value_number_array",
                    "type": {
                        "of": "number[]",
                        "cmatrix": NULL,
                        "format": NULL,
                        "unit": NULL,
                        "candidate": NULL
                    },
                    "description": "サンプルnumber[]"
                }
            ],
            "value": [
                {
                    "key": "value_number_array",
                    "value": 100
                },
                {
                    "key": "value_number_array",
                    "value": 101
                },
                {
                    "key": "value_number_array",
                    "value": 102
                }
            ]
        },
        "inner": NULL,
        "attribute": NULL
    };
    /**
    * カタログ(値指定string[])
    */
    export const valueStringArray = {
        "catalogItem": {
            "ns": "catalog/model/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 52,
                "_ver": 1
            },
            "inherit": NULL
        },
        "template": {
            "prop": [
                {
                    "key": "value_string_array",
                    "type": {
                        "of": "string[]",
                        "cmatrix": NULL,
                        "format": NULL,
                        "unit": NULL,
                        "candidate": NULL
                    },
                    "description": "サンプルstring[]"
                }
            ],
            "value": [
                {
                    "key": "value_string_array",
                    "value": "sample_string1"
                },
                {
                    "key": "value_string_array",
                    "value": "sample_string2"
                },
                {
                    "key": "value_string_array",
                    "value": "sample_string3"
                }
            ]
        },
        "inner": NULL,
        "attribute": NULL
    };
    /**
    * カタログ(値指定boolean[])
    */
    export const valueBooleanArray = {
        "catalogItem": {
            "ns": "catalog/model/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 53,
                "_ver": 1
            },
            "inherit": NULL
        },
        "template": {
            "prop": [
                {
                    "key": "value_boolean_array",
                    "type": {
                        "of": "boolean[]"
                    },
                    "description": "サンプルboolean[]"
                }
            ],
            "value": [
                {
                    "key": "value_boolean_array",
                    "value": true
                },
                {
                    "key": "value_boolean_array",
                    "value": true
                },
                {
                    "key": "value_boolean_array",
                    "value": false
                }
            ]
        },
        "inner": NULL,
        "attribute": NULL
    };
    /**
    * カタログ(値指定code[])
    */
    export const valueCodeArray = {
        "catalogItem": {
            "ns": "catalog/model/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 54,
                "_ver": 1
            },
            "inherit": NULL
        },
        "template": {
            "prop": [
                {
                    "key": "value_code_array",
                    "type": {
                        "of": "code[]",
                        "cmatrix": NULL,
                        "candidate": NULL
                    },
                    "description": "サンプルcode[]"
                }
            ],
            "value": [
                {
                    "key": "value_code_array",
                    "value": [
                        {
                            "key": "_value",
                            "value": 11
                        },
                        {
                            "key": "_ver",
                            "value": 1
                        }
                    ]
                },
                {
                    "key": "value_code_array",
                    "value": [
                        {
                            "key": "_value",
                            "value": 12
                        },
                        {
                            "key": "_ver",
                            "value": 1
                        }
                    ]
                }
            ]
        },
        "inner": NULL,
        "attribute": NULL
    };
    /**
    * カタログ(値指定item[])
    */
    export const valueItemArray = {
        "catalogItem": {
            "ns": "catalog/model/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 55,
                "_ver": 1
            },
            "inherit": NULL
        },
        "template": {
            "prop": [
                {
                    "key": "value_item_array",
                    "type": {
                        "of": "item[]",
                        "cmatrix": NULL,
                        "candidate": NULL
                    },
                    "description": "サンプルitem[]"
                }
            ],
            "value": [
                {
                    "key": "value_item_array",
                    "value": [
                        {
                            "key": "_value",
                            "value": 11
                        },
                        {
                            "key": "_ver",
                            "value": 1
                        }
                    ]
                },
                {
                    "key": "value_item_array",
                    "value": [
                        {
                            "key": "_value",
                            "value": 12
                        },
                        {
                            "key": "_ver",
                            "value": 1
                        }
                    ]
                }
            ]
        },
        "inner": NULL,
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
                "_value": 56,
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
    * カタログ(継承、バージョン指定なし)
    * # ERROR
    */
    export const inheritVersionNone = {
        "catalogItem": {
            "ns": "catalog/model/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 61,
                "_ver": 1
            },
            "inherit": {
                "_value": 11,
                "_ver": NULL
            }
        },
        "template": NULL,
        "inner": NULL,
        "attribute": NULL
    };
    /**
    * カタログ(継承、バージョン指定あり)
    */
    export const inheritVersionAvail = {
        "catalogItem": {
            "ns": "catalog/model/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 62,
                "_ver": 1
            },
            "inherit": {
                "_value": 12,
                "_ver": 1
            }
        },
        "template": NULL,
        "inner": NULL,
        "attribute": NULL
    };
    /**
    * カタログ(継承、プロパティnumber)
    */
    export const inheritPropertyNumber = {
        "catalogItem": {
            "ns": "catalog/model/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 63,
                "_ver": 1
            },
            "inherit": {
                "_value": 11,
                "_ver": 1
            }
        },
        "template": {
            "prop": [
                {
                    "key": "inherit_number",
                    "type": {
                        "of": "number",
                        "cmatrix": NULL,
                        "format": NULL,
                        "unit": NULL,
                        "candidate": NULL
                    },
                    "description": "継承サンプルnumber"
                }
            ],
            "value": NULL
        },
        "inner": NULL,
        "attribute": NULL
    };
    /**
    * カタログ(継承、プロパティstring)
    */
    export const inheritPropertyString = {
        "catalogItem": {
            "ns": "catalog/model/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 64,
                "_ver": 1
            },
            "inherit": {
                "_value": 12,
                "_ver": 1
            }
        },
        "template": {
            "prop": [
                {
                    "key": "inherit_string",
                    "type": {
                        "of": "string",
                        "cmatrix": NULL,
                        "format": NULL,
                        "unit": NULL,
                        "candidate": NULL
                    },
                    "description": "継承サンプルstring"
                }
            ],
            "value": NULL
        },
        "inner": NULL,
        "attribute": NULL
    };
    /**
    * カタログ(継承、プロパティboolean)
    */
    export const inheritPropertyBoolean = {
        "catalogItem": {
            "ns": "catalog/model/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 65,
                "_ver": 1
            },
            "inherit": {
                "_value": 13,
                "_ver": 1
            }
        },
        "template": {
            "prop": [
                {
                    "key": "inherit_boolean",
                    "type": {
                        "of": "boolean",
                        "cmatrix": NULL
                    },
                    "description": "継承サンプルboolean"
                }
            ],
            "value": NULL
        },
        "inner": NULL,
        "attribute": NULL
    };
    /**
    * カタログ(継承、プロパティcode)
    */
    export const inheritPropertyCode = {
        "catalogItem": {
            "ns": "catalog/model/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 66,
                "_ver": 1
            },
            "inherit": {
                "_value": 14,
                "_ver": 1
            }
        },
        "template": {
            "prop": [
                {
                    "key": "inherit_code",
                    "type": {
                        "of": "code",
                        "cmatrix": NULL,
                        "candidate": NULL
                    },
                    "description": "継承サンプルcode"
                }
            ],
            "value": NULL
        },
        "inner": NULL,
        "attribute": NULL
    };
    /**
    * カタログ(継承、プロパティitem)
    */
    export const inheritPropertyItem = {
        "catalogItem": {
            "ns": "catalog/model/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 67,
                "_ver": 1
            },
            "inherit": {
                "_value": 15,
                "_ver": 1
            }
        },
        "template": {
            "prop": [
                {
                    "key": "inherit_item",
                    "type": {
                        "of": "item",
                        "_code": NULL,
                        "cmatrix": NULL,
                        "candidate": NULL
                    },
                    "description": "継承サンプルitem"
                }
            ],
            "value": NULL
        },
        "inner": NULL,
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
                "_value": 68,
                "_ver": 1
            },
            "inherit": {
                "_value": 16,
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
    * カタログ(継承、プロパティnumber[])
    */
    export const inheritPropertyNumberArray = {
        "catalogItem": {
            "ns": "catalog/model/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 71,
                "_ver": 1
            },
            "inherit": {
                "_value": 21,
                "_ver": 1
            }
        },
        "template": {
            "prop": [
                {
                    "key": "inherit_number_array",
                    "type": {
                        "of": "number[]",
                        "cmatrix": NULL,
                        "format": NULL,
                        "unit": NULL,
                        "candidate": NULL
                    },
                    "description": "継承サンプルnumber[]"
                }
            ],
            "value": NULL
        },
        "inner": NULL,
        "attribute": NULL
    };
    /**
    * カタログ(継承、プロパティstring[])
    */
    export const inheritPropertyStringArray = {
        "catalogItem": {
            "ns": "catalog/model/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 72,
                "_ver": 1
            },
            "inherit": {
                "_value": 22,
                "_ver": 1
            }
        },
        "template": {
            "prop": [
                {
                    "key": "inherit_string_array",
                    "type": {
                        "of": "string[]",
                        "cmatrix": NULL,
                        "format": NULL,
                        "unit": NULL,
                        "candidate": NULL
                    },
                    "description": "継承サンプルstring[]"
                }
            ],
            "value": NULL
        },
        "inner": NULL,
        "attribute": NULL
    };
    /**
    * カタログ(継承、プロパティboolean[])
    */
    export const inheritPropertyBooleanArray = {
        "catalogItem": {
            "ns": "catalog/model/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 73,
                "_ver": 1
            },
            "inherit": {
                "_value": 23,
                "_ver": 1
            }
        },
        "template": {
            "prop": [
                {
                    "key": "inherit_boolean_array",
                    "type": {
                        "of": "boolean[]",
                        "cmatrix": NULL
                    },
                    "description": "継承サンプルboolean[]"
                }
            ],
            "value": NULL
        },
        "inner": NULL,
        "attribute": NULL
    };
    /**
    * カタログ(継承、プロパティcode[])
    */
    export const inheritPropertyCodeArray = {
        "catalogItem": {
            "ns": "catalog/model/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 74,
                "_ver": 1
            },
            "inherit": {
                "_value": 24,
                "_ver": 1
            }
        },
        "template": {
            "prop": [
                {
                    "key": "inherit_code_array",
                    "type": {
                        "of": "code[]",
                        "cmatrix": NULL,
                        "candidate": NULL
                    },
                    "description": "継承サンプルcode[]"
                }
            ],
            "value": NULL
        },
        "inner": NULL,
        "attribute": NULL
    };
    /**
    * カタログ(継承、プロパティitem[])
    */
    export const inheritPropertyItemArray = {
        "catalogItem": {
            "ns": "catalog/model/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 75,
                "_ver": 1
            },
            "inherit": {
                "_value": 25,
                "_ver": 1
            }
        },
        "template": {
            "prop": [
                {
                    "key": "inherit_item_array",
                    "type": {
                        "of": "item[]",
                        "cmatrix": NULL,
                        "candidate": NULL
                    },
                    "description": "継承サンプルitem[]"
                }
            ],
            "value": NULL
        },
        "inner": NULL,
        "attribute": NULL
    };
    /**
    * カタログ(継承、プロパティinner[])
    */
    export const inheritPropertyInnerArray = {
        "catalogItem": {
            "ns": "catalog/model/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 76,
                "_ver": 1
            },
            "inherit": {
                "_value": 26,
                "_ver": 1
            }
        },
        "template": {
            "prop": [
                {
                    "key": "inherit_inner_array",
                    "type": {
                        "of": "inner[]",
                        "inner": "InheritInnerArray",
                        "cmatrix": NULL,
                        "candidate": NULL
                    },
                    "description": "継承サンプルinner[]"
                }
            ],
            "value": NULL
        },
        "inner": [
            {
                "name": "InheritInnerArray",
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
    * カタログ(テンプレートプロパティnumber各種設定)
    */
    export const templatePropertyFullNumber = {
        "catalogItem": {
            "ns": "catalog/model/cmatrix/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 81,
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
                        "cmatrix": {
                            "index": "4_2_2_1",
                            "reserved": false
                        },
                        "format": {
                            "_value": 11,
                            "_ver": 1
                        },
                        "unit": {
                            "_value": 12,
                            "_ver": 1
                        },
                        "candidate": {
                            "ns": [
                                "catalog/ext/unit-test/*",
                                "catalog/built_in/unit-test/*",
                                "catalog/model/unit-test/*"
                            ],
                            "_code": [
                                {
                                    "_value": 13,
                                    "_ver": 1
                                },
                                {
                                    "_value": 14,
                                    "_ver": 1
                                },
                            ],
                            "base": {
                                "_value": 15,
                                "_ver": 1
                            }
                        }
                    },
                    "description": "サンプルnumber"
                }
            ],
            "value": NULL
        },
        "inner": NULL,
        "attribute": NULL
    };
    /**
    * カタログ(テンプレートプロパティstring各種設定)
    */
    export const templatePropertyFullString = {
        "catalogItem": {
            "ns": "catalog/model/cmatrix/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 82,
                "_ver": 1
            },
            "inherit": {
                "_value": 81,
                "_ver": 1
            }
        },
        "template": {
            "prop": [
                {
                    "key": "property_string",
                    "type": {
                        "of": "string",
                        "cmatrix": {
                            "index": "4_2_2_2",
                            "reserved": true
                        },
                        "format": {
                            "_value": 11,
                            "_ver": 1
                        },
                        "unit": {
                            "_value": 12,
                            "_ver": 1
                        },
                        "candidate": {
                            "ns": [
                                "catalog/ext/unit-test/*",
                                "catalog/built_in/unit-test/*",
                                "catalog/model/unit-test/*"
                            ],
                            "_code": [
                                {
                                    "_value": 13,
                                    "_ver": 1
                                },
                                {
                                    "_value": 14,
                                    "_ver": 1
                                },
                            ],
                            "base": {
                                "_value": 15,
                                "_ver": 1
                            }
                        }
                    },
                    "description": "サンプルstring"
                }
            ],
            "value": NULL
        },
        "inner": NULL,
        "attribute": NULL
    };
    /**
    * カタログ(テンプレートプロパティboolean各種設定)
    */
    export const templatePropertyFullBoolean = {
        "catalogItem": {
            "ns": "catalog/model/cmatrix/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 83,
                "_ver": 1
            },
            "inherit": NULL
        },
        "template": {
            "prop": [
                {
                    "key": "property_boolean",
                    "type": {
                        "of": "boolean",
                        "cmatrix": {
                            "index": "4_2_2_3",
                            "reserved": false
                        }
                    },
                    "description": "サンプルboolean"
                }
            ],
            "value": NULL
        },
        "inner": NULL,
        "attribute": NULL
    };
    /**
    * カタログ(テンプレートプロパティcode各種設定)
    */
    export const templatePropertyFullCode = {
        "catalogItem": {
            "ns": "catalog/model/cmatrix/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 84,
                "_ver": 1
            },
            "inherit": NULL
        },
        "template": {
            "prop": [
                {
                    "key": "property_code",
                    "type": {
                        "of": "code",
                        "cmatrix": {
                            "index": "4_2_2_4",
                            "reserved": false
                        },
                        "candidate": {
                            "ns": [
                                "catalog/ext/unit-test/*",
                                "catalog/built_in/unit-test/*",
                                "catalog/model/unit-test/*"
                            ],
                            "_code": [
                                {
                                    "_value": 13,
                                    "_ver": 1
                                },
                                {
                                    "_value": 14,
                                    "_ver": 1
                                },
                            ],
                            "base": {
                                "_value": 15,
                                "_ver": 1
                            }
                        }
                    },
                    "description": "サンプルcode"
                }
            ],
            "value": NULL
        },
        "inner": NULL,
        "attribute": NULL
    };
    /**
    * カタログ(テンプレートプロパティitem各種設定)
    */
    export const templatePropertyFullItem = {
        "catalogItem": {
            "ns": "catalog/model/cmatrix/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 85,
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
                            "_value": 16,
                            "_ver": 1
                        },
                        "cmatrix": {
                            "index": "4_2_2_5",
                            "reserved": false
                        },
                        "candidate": {
                            "ns": [
                                "catalog/ext/unit-test/*",
                                "catalog/built_in/unit-test/*",
                                "catalog/model/unit-test/*"
                            ],
                            "_code": [
                                {
                                    "_value": 13,
                                    "_ver": 1
                                },
                                {
                                    "_value": 14,
                                    "_ver": 1
                                },
                            ],
                            "base": {
                                "_value": 15,
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
    * カタログ(テンプレートプロパティinner各種設定)
    */
    export const templatePropertyFullInner = {
        "catalogItem": {
            "ns": "catalog/model/cmatrix/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 86,
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
                        "cmatrix": {
                            "index": "4_2_2_6",
                            "reserved": false
                        },
                        "candidate": {
                            "ns": [
                                "catalog/ext/unit-test/*",
                                "catalog/built_in/unit-test/*",
                                "catalog/model/unit-test/*"
                            ],
                            "_code": [
                                {
                                    "_value": 13,
                                    "_ver": 1
                                },
                                {
                                    "_value": 14,
                                    "_ver": 1
                                },
                            ],
                            "base": {
                                "_value": 15,
                                "_ver": 1
                            }
                        }
                    },
                    "description": "サンプルinner"
                }
            ],
            "value": [
                {
                    "key": "property_inner",
                    "value": [
                        {
                            "key": "inner_number",
                            "value": 110
                        }
                    ]
                },
                {
                    "key": "property_inner",
                    "value": [
                        {
                            "key": "inner_number",
                            "value": 111
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
                            "key": "inner_number",
                            "type": {
                                "of": "number",
                                "cmatrix": {
                                    "index": "4_2_2_1",
                                    "reserved": false
                                },
                                "format": {
                                    "_value": 11,
                                    "_ver": 1
                                },
                                "unit": {
                                    "_value": 12,
                                    "_ver": 1
                                },
                                "candidate": {
                                    "ns": [
                                        "catalog/ext/unit-test/*",
                                        "catalog/built_in/unit-test/*",
                                        "catalog/model/unit-test/*"
                                    ],
                                    "_code": [
                                        {
                                            "_value": 13,
                                            "_ver": 1
                                        },
                                        {
                                            "_value": 14,
                                            "_ver": 1
                                        },
                                    ],
                                    "base": {
                                        "_value": 15,
                                        "_ver": 1
                                    }
                                }
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
    * カタログ(テンプレートプロパティinner各種設定(code: 86)を継承)
    */
    export const templatePropertyFullInnerInherit = {
        "catalogItem": {
            "ns": "catalog/model/cmatrix/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 186,
                "_ver": 1
            },
            "inherit": {
                "_value": 86,
                "_ver": 1
            },
        },
        "template": NULL,
        "inner": NULL,
        "attribute": NULL
    };
    
    /**
    * カタログ(テンプレートプロパティnumber[]各種設定)
    */
    export const templatePropertyFullNumberArray = {
        "catalogItem": {
            "ns": "catalog/model/cmatrix/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 91,
                "_ver": 1
            },
            "inherit": NULL
        },
        "template": {
            "prop": [
                {
                    "key": "property_number_array",
                    "type": {
                        "of": "number[]",
                        "cmatrix": {
                            "index": "4_2_2_1",
                            "reserved": false
                        },
                        "format": {
                            "_value": 11,
                            "_ver": 1
                        },
                        "unit": {
                            "_value": 12,
                            "_ver": 1
                        },
                        "candidate": {
                            "ns": [
                                "catalog/ext/{ext_name}/unit-test/*",
                                "catalog/built_in/unit-test/*",
                                "catalog/model/unit-test/*"
                            ],
                            "_code": [
                                {
                                    "_value": 13,
                                    "_ver": 1
                                },
                                {
                                    "_value": 14,
                                    "_ver": 1
                                },
                            ],
                            "base": {
                                "_value": 15,
                                "_ver": 1
                            }
                        }
                    },
                    "description": "サンプルnumber[]"
                }
            ],
            "value": NULL
        },
        "inner": NULL,
        "attribute": NULL
    };
    /**
    * カタログ(テンプレートプロパティstring[]各種設定)
    */
    export const templatePropertyFullStringArray = {
        "catalogItem": {
            "ns": "catalog/model/cmatrix/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 92,
                "_ver": 1
            },
            "inherit": NULL
        },
        "template": {
            "prop": [
                {
                    "key": "property_string_array",
                    "type": {
                        "of": "string[]",
                        "cmatrix": {
                            "index": "4_2_2_2",
                            "reserved": false
                        },
                        "format": {
                            "_value": 11,
                            "_ver": 1
                        },
                        "unit": {
                            "_value": 12,
                            "_ver": 1
                        },
                        "candidate": {
                            "ns": [
                                "catalog/ext/{ext_name}/unit-test/*",
                                "catalog/built_in/unit-test/*",
                                "catalog/model/unit-test/*"
                            ],
                            "_code": [
                                {
                                    "_value": 13,
                                    "_ver": 1
                                },
                                {
                                    "_value": 14,
                                    "_ver": 1
                                },
                            ],
                            "base": {
                                "_value": 15,
                                "_ver": 1
                            }
                        }
                    },
                    "description": "サンプルstring[]"
                }
            ],
            "value": NULL
        },
        "inner": NULL,
        "attribute": NULL
    };
    /**
    * カタログ(テンプレートプロパティboolean[]各種設定)
    */
    export const templatePropertyFullBooleanArray = {
        "catalogItem": {
            "ns": "catalog/model/cmatrix/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 93,
                "_ver": 1
            },
            "inherit": NULL
        },
        "template": {
            "prop": [
                {
                    "key": "property_boolean_array",
                    "type": {
                        "of": "boolean[]",
                        "cmatrix": {
                            "index": "4_2_2_3",
                            "reserved": false
                        }
                    },
                    "description": "サンプルboolean[]"
                }
            ],
            "value": NULL
        },
        "inner": NULL,
        "attribute": NULL
    };
    /**
    * カタログ(テンプレートプロパティcode[]各種設定)
    */
    export const templatePropertyFullCodeArray = {
        "catalogItem": {
            "ns": "catalog/model/cmatrix/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 94,
                "_ver": 1
            },
            "inherit": NULL
        },
        "template": {
            "prop": [
                {
                    "key": "property_code_array",
                    "type": {
                        "of": "code[]",
                        "cmatrix": {
                            "index": "4_2_2_4",
                            "reserved": false
                        },
                        "candidate": {
                            "ns": [
                                "catalog/ext/{ext_name}/unit-test/*",
                                "catalog/built_in/unit-test/*",
                                "catalog/model/unit-test/*"
                            ],
                            "_code": [
                                {
                                    "_value": 13,
                                    "_ver": 1
                                },
                                {
                                    "_value": 14,
                                    "_ver": 1
                                },
                            ],
                            "base": {
                                "_value": 15,
                                "_ver": 1
                            }
                        }
                    },
                    "description": "サンプルcode[]"
                }
            ],
            "value": NULL
        },
        "inner": NULL,
        "attribute": NULL
    };
    /**
    * カタログ(テンプレートプロパティitem[]各種設定)
    */
    export const templatePropertyFullItemArray = {
        "catalogItem": {
            "ns": "catalog/model/cmatrix/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 95,
                "_ver": 1
            },
            "inherit": NULL
        },
        "template": {
            "prop": [
                {
                    "key": "property_item_array",
                    "type": {
                        "of": "item[]",
                        "cmatrix": {
                            "index": "4_2_2_5",
                            "reserved": false
                        },
                        "candidate": {
                            "ns": [
                                "catalog/ext/{ext_name}/unit-test/*",
                                "catalog/built_in/unit-test/*",
                                "catalog/model/unit-test/*"
                            ],
                            "_code": [
                                {
                                    "_value": 13,
                                    "_ver": 1
                                },
                                {
                                    "_value": 14,
                                    "_ver": 1
                                },
                            ],
                            "base": {
                                "_value": 15,
                                "_ver": 1
                            }
                        }
                    },
                    "description": "サンプルitem[]"
                }
            ],
            "value": NULL
        },
        "inner": NULL,
        "attribute": NULL
    };
    /**
    * カタログ(テンプレートプロパティinner[]各種設定)
    */
    export const templatePropertyFullInnerArray = {
        "catalogItem": {
            "ns": "catalog/model/cmatrix/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 96,
                "_ver": 1
            },
            "inherit": NULL
        },
        "template": {
            "prop": [
                {
                    "key": "property_inner_array",
                    "type": {
                        "of": "inner[]",
                        "inner": "PropertyInnerArray",
                        "cmatrix": {
                            "index": "4_2_2_6",
                            "reserved": false
                        },
                        "candidate": {
                            "ns": [
                                "catalog/ext/{ext_name}/unit-test/*",
                                "catalog/built_in/unit-test/*",
                                "catalog/model/unit-test/*"
                            ],
                            "_code": [
                                {
                                    "_value": 13,
                                    "_ver": 1
                                },
                                {
                                    "_value": 14,
                                    "_ver": 1
                                }
                            ],
                            "base": {
                                "_value": 15,
                                "_ver": 1
                            }
                        }
                    },
                    "description": "サンプルinner[]"
                }
            ],
            "value": [
                {
                    "key": "property_inner_array",
                    "value": [
                        {
                            "key": "inner_number",
                            "value": 110
                        }
                    ]
                },
                {
                    "key": "property_inner_array",
                    "value": [
                        {
                            "key": "inner_number",
                            "value": 111
                        }
                    ]
                }
            ]
        },
        "inner": [
            {
                "name": "PropertyInnerArray",
                "description": "サンプルinnerです。",
                "template": {
                    "inherit": NULL,
                    "prop": [
                        {
                            "key": "inner_number",
                            "type": {
                                "of": "number",
                                "cmatrix": {
                                    "index": "4_2_2_1",
                                    "reserved": false
                                },
                                "format": {
                                    "_value": 11,
                                    "_ver": 1
                                },
                                "unit": {
                                    "_value": 12,
                                    "_ver": 1
                                },
                                "candidate": {
                                    "ns": [
                                        "catalog/ext/unit-test/*",
                                        "catalog/built_in/unit-test/*",
                                        "catalog/model/unit-test/*"
                                    ],
                                    "_code": [
                                        {
                                            "_value": 13,
                                            "_ver": 1
                                        },
                                        {
                                            "_value": 14,
                                            "_ver": 1
                                        }
                                    ],
                                    "base": {
                                        "_value": 15,
                                        "_ver": 1
                                    }
                                }
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
    * カタログ(テンプレートプロパティinner[]各種設定)
    */
    export const templatePropertyFullInnerArray2 = {
        "catalogItem": {
            "ns": "catalog/model/cmatrix/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 196,
                "_ver": 1
            },
            "inherit": NULL
        },
        "template": {
            "prop": [
                {
                    "key": "property_inner_array",
                    "type": {
                        "of": "inner[]",
                        "inner": "PropertyInnerArray",
                        "cmatrix": {
                            "index": "4_2_2_6",
                            "reserved": false
                        },
                        "candidate": {
                            "ns": [
                                "catalog/ext/{ext_name}/unit-test/*",
                                "catalog/built_in/unit-test/*",
                                "catalog/model/unit-test/*"
                            ],
                            "_code": [
                                {
                                    "_value": 13,
                                    "_ver": 1
                                },
                                {
                                    "_value": 14,
                                    "_ver": 1
                                }
                            ],
                            "base": {
                                "_value": 15,
                                "_ver": 1
                            }
                        }
                    },
                    "description": "サンプルinner[]"
                }
            ],
            "value": [
                {
                    "key": "property_inner_array",
                    "value": 111
                }
            ]
        },
        "inner": [
            {
                "name": "PropertyInnerArray",
                "description": "サンプルinnerです。",
                "template": {
                    "inherit": NULL,
                    "prop": [
                        {
                            "key": "inner_number",
                            "type": {
                                "of": "number",
                                "cmatrix": {
                                    "index": "4_2_2_1",
                                    "reserved": false
                                },
                                "format": {
                                    "_value": 11,
                                    "_ver": 1
                                },
                                "unit": {
                                    "_value": 12,
                                    "_ver": 1
                                },
                                "candidate": {
                                    "ns": [
                                        "catalog/ext/unit-test/*",
                                        "catalog/built_in/unit-test/*",
                                        "catalog/model/unit-test/*"
                                    ],
                                    "_code": [
                                        {
                                            "_value": 13,
                                            "_ver": 1
                                        },
                                        {
                                            "_value": 14,
                                            "_ver": 1
                                        }
                                    ],
                                    "base": {
                                        "_value": 15,
                                        "_ver": 1
                                    }
                                }
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
    * カタログ(テンプレートプロパティinner[]各種設定)
    */
    export const templatePropertyFullInnerArray3 = {
        "catalogItem": {
            "ns": "catalog/model/cmatrix/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 296,
                "_ver": 1
            },
            "inherit": NULL
        },
        "template": {
            "prop": [
                {
                    "key": "property_inner_array",
                    "type": {
                        "of": "inner[]",
                        "inner": "PropertyInnerArray",
                        "cmatrix": {
                            "index": "4_2_2_6",
                            "reserved": false
                        },
                        "candidate": {
                            "ns": [
                                "catalog/ext/{ext_name}/unit-test/*",
                                "catalog/built_in/unit-test/*",
                                "catalog/model/unit-test/*"
                            ],
                            "_code": [
                                {
                                    "_value": 13,
                                    "_ver": 1
                                },
                                {
                                    "_value": 14,
                                    "_ver": 1
                                }
                            ],
                            "base": {
                                "_value": 15,
                                "_ver": 1
                            }
                        }
                    },
                    "description": "サンプルinner[]"
                }
            ],
            "value": [
                {
                    "key": "property_inner_array",
                    "value": [
                        {
                            "key": "inner_number",
                            "value": 112
                        }
                    ]
                }
            ],
            "other": [
                NULL
            ]
        },
        "inner": [
            {
                "name": "PropertyInnerArray",
                "description": "サンプルinnerです。",
                "template": {
                    "inherit": NULL,
                    "prop": [
                        {
                            "key": "inner_number",
                            "type": {
                                "of": "number[]",
                                "cmatrix": {
                                    "index": "4_2_2_1",
                                    "reserved": false
                                },
                                "format": {
                                    "_value": 11,
                                    "_ver": 1
                                },
                                "unit": {
                                    "_value": 12,
                                    "_ver": 1
                                },
                                "candidate": {
                                    "ns": [
                                        "catalog/ext/unit-test/*",
                                        "catalog/built_in/unit-test/*",
                                        "catalog/model/unit-test/*"
                                    ],
                                    "_code": [
                                        {
                                            "_value": 13,
                                            "_ver": 1
                                        },
                                        {
                                            "_value": 14,
                                            "_ver": 1
                                        }
                                    ],
                                    "base": {
                                        "_value": 15,
                                        "_ver": 1
                                    }
                                }
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
    * カタログ(テンプレートプロパティinner[]各種設定(code: 96)を継承)
    */
    export const fullInnerArrayInherit96 = {
        "catalogItem": {
            "ns": "catalog/model/cmatrix/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 195,
                "_ver": 1
            },
            "inherit": {
                "_value": 96,
                "_ver": 1
            },
        },
        "template": NULL,
        "inner": NULL,
        "attribute": NULL
    };
    /**
    * カタログ(テンプレートプロパティinner[]各種設定2(code: 196)を継承)
    */
    export const fullInnerArrayInherit196 = {
        "catalogItem": {
            "ns": "catalog/model/cmatrix/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 197,
                "_ver": 1
            },
            "inherit": {
                "_value": 196,
                "_ver": 1
            },
        },
        "template": {
            "prop": [
                {
                    "key": "property_inner_array",
                    "type": {
                        "of": "inner[]",
                        "inner": "PropertyInnerArray",
                        "cmatrix": {
                            "index": "4_2_2_6",
                            "reserved": false
                        },
                        "candidate": {
                            "ns": [
                                "catalog/ext/{ext_name}/unit-test/*",
                                "catalog/built_in/unit-test/*",
                                "catalog/model/unit-test/*"
                            ],
                            "_code": [
                                {
                                    "_value": 13,
                                    "_ver": 1
                                },
                                {
                                    "_value": 14,
                                    "_ver": 1
                                }
                            ],
                            "base": {
                                "_value": 15,
                                "_ver": 1
                            }
                        }
                    },
                    "description": "サンプルinner[]"
                }
            ],
            "value": [
                {
                    "key": "property_inner_array",
                    "value": 111
                }
            ]
        },
        "inner": [
            {
                "name": "PropertyInnerArray",
                "description": "サンプルinnerです。",
                "template": {
                    "inherit": NULL,
                    "prop": [
                        {
                            "key": "inner_number",
                            "type": {
                                "of": "number",
                                "cmatrix": {
                                    "index": "4_2_2_1",
                                    "reserved": false
                                },
                                "format": {
                                    "_value": 11,
                                    "_ver": 1
                                },
                                "unit": {
                                    "_value": 12,
                                    "_ver": 1
                                },
                                "candidate": {
                                    "ns": [
                                        "catalog/ext/unit-test/*",
                                        "catalog/built_in/unit-test/*",
                                        "catalog/model/unit-test/*"
                                    ],
                                    "_code": [
                                        {
                                            "_value": 13,
                                            "_ver": 1
                                        },
                                        {
                                            "_value": 14,
                                            "_ver": 1
                                        }
                                    ],
                                    "base": {
                                        "_value": 15,
                                        "_ver": 1
                                    }
                                }
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
    * カタログ(テンプレートプロパティinner[]各種設定3(code: 296)を継承)
    */
    export const fullInnerArrayInherit296 = {
        "catalogItem": {
            "ns": "catalog/model/cmatrix/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 297,
                "_ver": 1
            },
            "inherit": {
                "_value": 296,
                "_ver": 1
            },
        },
        "template": {
            "prop": [
                {
                    "key": "property_inner_array",
                    "type": {
                        "of": "inner[]",
                        "inner": "PropertyInnerArray",
                        "cmatrix": {
                            "index": "4_2_2_6",
                            "reserved": false
                        },
                        "candidate": {
                            "ns": [
                                "catalog/ext/{ext_name}/unit-test/*",
                                "catalog/built_in/unit-test/*",
                                "catalog/model/unit-test/*"
                            ],
                            "_code": [
                                {
                                    "_value": 13,
                                    "_ver": 1
                                },
                                {
                                    "_value": 14,
                                    "_ver": 1
                                }
                            ],
                            "base": {
                                "_value": 15,
                                "_ver": 1
                            }
                        }
                    },
                    "description": "サンプルinner[]"
                }
            ],
            "value": [
                {
                    "key": "property_inner_array",
                    "value": [
                        {
                            "key": "inner_number",
                            "value": 112
                        }
                    ]
                }
            ],
            "other": [
                NULL
            ]
        },
        "inner": [
            {
                "name": "PropertyInnerArray",
                "description": "サンプルinnerです。",
                "template": {
                    "inherit": NULL,
                    "prop": [
                        {
                            "key": "inner_number",
                            "type": {
                                "of": "number[]",
                                "cmatrix": {
                                    "index": "4_2_2_1",
                                    "reserved": false
                                },
                                "format": {
                                    "_value": 11,
                                    "_ver": 1
                                },
                                "unit": {
                                    "_value": 12,
                                    "_ver": 1
                                },
                                "candidate": {
                                    "ns": [
                                        "catalog/ext/unit-test/*",
                                        "catalog/built_in/unit-test/*",
                                        "catalog/model/unit-test/*"
                                    ],
                                    "_code": [
                                        {
                                            "_value": 13,
                                            "_ver": 1
                                        },
                                        {
                                            "_value": 14,
                                            "_ver": 1
                                        }
                                    ],
                                    "base": {
                                        "_value": 15,
                                        "_ver": 1
                                    }
                                }
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
    * カタログ(テンプレートプロパティinner[]各種設定(code: 196)を継承、templateがnull)
    */
    export const fullInnerArrayInherit196NullTemp = {
        "catalogItem": {
            "ns": "catalog/model/cmatrix/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 198,
                "_ver": 1
            },
            "inherit": {
                "_value": 196,
                "_ver": 1
            },
        },
        "template": NULL,
        "attribute": NULL
    };
    /**
    * カタログ(候補値value設定)
    */
    export const candidateValue = {
        "catalogItem": {
            "ns": "catalog/model/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 101,
                "_ver": 1
            },
            "inherit": NULL
        },
        "template": {
            "prop": [
                {
                    "key": "property_inner_array",
                    "type": {
                        "of": "inner[]",
                        "inner": "PropertyInnerArray",
                        "cmatrix": NULL,
                        "candidate": {
                            "value": [
                                "test-string1",
                                "test-string2",
                                "test-string3"
                            ]
                        }
                    },
                    "description": "サンプルinner[]"
                }
            ],
            "value": [
                {
                    "key": "property_inner_array",
                    "value": [
                        {
                            "key": "inner_number",
                            "value": 110
                        }
                    ]
                }
            ]
        },
        "inner": [
            {
                "name": "PropertyInnerArray",
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
                                "candidate": {
                                    "value": [
                                        "inner-string1",
                                        "inner-string2",
                                        "inner-string3"
                                    ]
                                }
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
    * カタログ(候補値inner設定)
    */
    export const candidateInner = {
        "catalogItem": {
            "ns": "catalog/model/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 102,
                "_ver": 1
            },
            "inherit": NULL
        },
        "template": {
            "prop": [
                {
                    "key": "property_inner_array",
                    "type": {
                        "of": "inner[]",
                        "inner": "PropertyInnerArray",
                        "cmatrix": NULL,
                        "candidate": {
                            "inner": [
                                "test-string1",
                                "test-string2",
                                "test-string3"
                            ]
                        }
                    },
                    "description": "サンプルinner[]"
                }
            ],
            "value": [
                {
                    "key": "property_inner_array",
                    "value": [
                        {
                            "key": "inner_number",
                            "value": 110
                        }
                    ]
                }
            ]
        },
        "inner": [
            {
                "name": "PropertyInnerArray",
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
                                "candidate": {
                                    "inner": [
                                        "inner-string1",
                                        "inner-string2",
                                        "inner-string3"
                                    ]
                                }
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
     export const inheritCatalog106 = {
        catalogItem: {
            ns: 'catalog/model/unit-test',
            name: '個人属性',
            description: '個人属性の定義です。',
            _code: {
                _value: 106,
                _ver: 1
            },
            inherit: NULL
        },
        template: {
            prop: [
                {
                    key: 'item-group',
                    type: {
                        of: 'item[]',
                        inner: 'ItemGroup',
                        candidate: NULL
                    },
                    description: '個人属性グループの配列'
                }
            ],
            value: NULL,
        },
        inner: [
            {
                name: 'ItemGroup',
                description: '個人属性グループ',
                template: {
                    inherit: NULL,
                    prop: [
                        {
                            key: 'title',
                            type: {
                                of: 'string',
                                format: NULL,
                                unit: NULL,
                                candidate: NULL
                            },
                            description: 'タイトル'
                        },
                        {
                            key: 'item',
                            type: {
                                of: 'inner[]',
                                inner: 'Item',
                                candidate: NULL
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
                            inherit: NULL,
                            prop: [
                                {
                                    key: 'title',
                                    type: {
                                        of: 'string',
                                        format: NULL,
                                        unit: NULL,
                                        candidate: NULL
                                    },
                                    description: 'タイトル'
                                },
                                {
                                    key: 'type',
                                    type: {
                                        of: 'item[]',
                                        candidate: {
                                            ns: [
                                                'catalog/model/unit-test'
                                            ],
                                            _code: NULL,
                                            base: NULL
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
                        inner: NULL
                    }
                ]
            }
        ],
        attribute: NULL
    }
    /**
    * カタログ(inherit用catalog2)
    */
     export const inheritCatalog107 = {
        catalogItem: {
            ns: 'catalog/model/unit-test',
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
                        format: NULL,
                        unit: {
                            _value: 3,
                            _ver: 1
                        },
                        candidate: NULL
                    },
                    description: '本人性の検証率'
                }
            ],
            value: NULL
        },
        inner: NULL,
        attribute: NULL
    }
    /**
    * カタログ(候補値inner設定)
    */
    export const cataloginner = {
        catalogItem: {
            ns: 'catalog/model/unit-test',
            name: 'パスポート（旅券）',
            description: '本人性確認で利用するパスポート（旅券）の定義です。',
            _code: {
                _value: 305,
                _ver: NULL
            },
            inherit: {
                _value: 107,
                _ver: 1
            }
        },
        template: {
            prop: NULL,
            value: [
                {
                    key: 'item-group',
                    value: [
                        {
                            key: 'title',
                            value: '氏名'
                        },
                        {
                            key: 'item-group',
                            value: [
                                {
                                    key: 'title',
                                    value: '姓'
                                },
                                {
                                    key: 'item-group',
                                    value: [
                                        {
                                            key: '_value',
                                            value: 3
                                        },
                                        {
                                            key: '_ver',
                                            value: 1
                                        }
                                    ]
                                },
                                {
                                    key: 'item-group',
                                    value: null
                                }
                            ]
                        },
                        {
                            key: 'item-group',
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
                                            value: 3
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
                                            value: 3
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
                                            value: 3
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
        inner: NULL,
        attribute: NULL
    }

    /**
    * カタログ(対象テンプレートプロパティ取得 値指定item[]、Cmatrixあり)
    */
    export const valueItemArray2 = {
        catalogItem: {
            ns: 'catalog/model/unit-test',
            name: 'ユニットテスト',
            description: 'ユニットテスト用の説明です。',
            _code: {
                _value: 155,
                _ver: 1
            },
            inherit: NULL
        },
        template: {
            prop: [
                {
                    key: 'sourceId',
                    type: {
                        of: 'string',
                        format: NULL,
                        unit: NULL,
                        candidate: NULL
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
                        candidate: NULL
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
                        _code: NULL,
                        candidate: {
                            ns: [
                                'catalog/model/unit-test'
                            ],
                            _code: NULL
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
            value: NULL
        },
        inner: [
            {
                name: 'App',
                template: {
                    inherit: NULL,
                    prop: [
                        {
                            key: 'code',
                            type: {
                                of: 'item',
                                _code: {
                                    _value: 96,
                                    _ver: 1
                                },
                                candidate: NULL
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
                                candidate: NULL
                            },
                            description: 'アプリケーション識別子'
                        }
                    ]
                },
                inner: NULL
            },
            {
                name: 'Wf',
                template: {
                    inherit: NULL,
                    prop: [
                        {
                            key: 'code',
                            type: {
                                of: 'item',
                                _code: {
                                    _value: 96,
                                    _ver: 1
                                },
                                candidate: NULL
                            },
                            description: 'ワークフロープロバイダーの識別子'
                        },
                        {
                            key: 'wf',
                            type: {
                                of: 'item',
                                _code: {
                                    _value: 15,
                                    _ver: 1
                                },
                                candidate: NULL
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
                                candidate: NULL
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
                                candidate: NULL
                            },
                            description: 'ワークフロー職員の識別子'
                        }
                    ]
                },
                inner: NULL
            }
        ],
        attribute: NULL
    }

    /**
    * カタログ(正常：対象テンプレートプロパティ取得で対象カタログが存在しない)
    */
     export const valueItemArray3 = {
        catalogItem: {
            ns: 'catalog/model/unit-test',
            name: 'ユニットテスト',
            description: 'ユニットテスト用の説明です。',
            _code: {
                _value: 156,
                _ver: 1
            },
            inherit: NULL
        },
        template: {
            prop: [
                {
                    key: 'sourceId',
                    type: {
                        of: 'string',
                        format: NULL,
                        unit: NULL,
                        candidate: NULL
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
                        candidate: NULL
                    },
                    description: 'モノ識別子'
                },
                {
                    key: 'code',
                    type: {
                        of: 'item[]',
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
                        _code: NULL,
                        candidate: {
                            ns: [
                                'catalog/model/unit-test'
                            ],
                            _code: NULL
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
            value: NULL
        },
        inner: [
            {
                name: 'App',
                template: {
                    inherit: NULL,
                    prop: [
                        {
                            key: 'code',
                            type: {
                                of: 'inner[]',
                                _code: {
                                    _value: 404,
                                    _ver: 1
                                },
                                candidate: NULL
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
                                candidate: NULL
                            },
                            description: 'アプリケーション識別子'
                        }
                    ]
                },
                inner: NULL
            },
            {
                name: 'Wf',
                template: {
                    inherit: NULL,
                    prop: [
                        {
                            key: 'code',
                            type: {
                                of: 'item',
                                _code: {
                                    _value: 96,
                                    _ver: 1
                                },
                                candidate: NULL
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
                                candidate: NULL
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
                                candidate: NULL
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
                                candidate: NULL
                            },
                            description: 'ワークフロー職員の識別子'
                        }
                    ]
                },
                inner: NULL
            }
        ],
        attribute: NULL
    }

    /**
    * 最小限カタログ(コード、バージョン指定、コードがスコープ範囲外)
    */
     export const minimumCodeVersionOutOfScope = {
        "catalogItem": {
            "ns": "catalog/model/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 1000003,
                "_ver": 1
            },
            "inherit": NULL
        },
        "template": NULL,
        "inner": NULL,
        "attribute": NULL
    };
    /**
    * カタログ(テンプレートプロパティ空配列)
    */
    const emptyArray: {}[] = [];
    export const templatePropertyEmpty = {
        "catalogItem": {
            "ns": "catalog/model/unit-test",
            "name": "ユニットテスト",
            "description": "ユニットテスト用の説明です。",
            "_code": {
                "_value": 811,
                "_ver": 1
            },
            "inherit": NULL
        },
        "template": {
            "prop": [
                {
                    "key": "empty_string_array",
                    "type": {
                        "of": "string",
                        "cmatrix": NULL,
                        "format": NULL,
                        "unit": NULL,
                        "candidate": NULL
                    },
                    "description": "空配列"
                }
            ],
            "value": [
                {
                    "key": "empty_string_array",
                    "value": emptyArray
                }
            ]
        },
        "inner": NULL,
        "attribute": NULL
    };
}
