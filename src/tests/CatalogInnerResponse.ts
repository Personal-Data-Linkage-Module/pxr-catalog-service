/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/**
 * カタログレスポンス(モデル)
 */
export namespace CatalogInnerResponse {
    /**
     * null設定オブジェクト
     */
    const NULL: any = null;

    /**
    * カタログ(値指定inner)
    */
    export const valueInner = {
        catalogItem: {
            ns: 'catalog/model/unit-test',
            name: 'ユニットテスト',
            _code: {
                _value: 1,
                _ver: 1
            },
            inherit: NULL,
            description: 'ユニットテスト用の説明です。'
        },
        template: {
            inner_number: NULL
        },
        prop: [
            {
                key: 'inner_number',
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
        inner: {
            name: 'ValueInner'
        }
    };
    /**
    * カタログ(値指定inner[])
    */
    export const valueInnerArray = {
        catalogItem: {
            ns: 'catalog/model/unit-test',
            name: 'ユニットテスト',
            _code: {
                _value: 2,
                _ver: 1
            },
            inherit: NULL,
            description: 'ユニットテスト用の説明です。'
        },
        template: {
            inner_number: NULL
        },
        prop: [
            {
                key: 'inner_number',
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
        inner: {
            name: 'ValueInnerArray'
        }
    };
    /**
    * カタログ(継承、プロパティinner)
    */
    export const inheritPropertyInner = {
        catalogItem: {
            ns: 'catalog/model/unit-test',
            name: 'ユニットテスト',
            _code: {
                _value: 3,
                _ver: 1
            },
            inherit: {
                _value: 1,
                _ver: 1
            },
            description: 'ユニットテスト用の説明です。'
        },
        template: {
            inner_number: NULL
        },
        prop: [
            {
                key: 'inner_number',
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
        inner: {
            name: 'InheritInner'
        }
    };
    /**
    * カタログ(継承、プロパティnone)
    */
    export const inheritNonePropertyInner = {
        catalogItem: {
            ns: 'catalog/model/unit-test',
            name: 'ユニットテスト',
            _code: {
                _value: 5,
                _ver: 1
            },
            inherit: {
                _value: 4,
                _ver: 1
            },
            description: 'ユニットテスト用の説明です。'
        },
        template: {
            inner_number: NULL
        },
        prop: [
            {
                key: 'inner_number',
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
        inner: {
            name: 'InheritInner'
        }
    };
    /**
    * カタログ(継承、プロパティnone)
    */
    export const inheritNonePropertyInner2 = {
        catalogItem: {
            ns: 'catalog/model/unit-test',
            name: 'ユニットテスト',
            _code: {
                _value: 7,
                _ver: 1
            },
            inherit: {
                _value: 6,
                _ver: 1
            },
            description: 'ユニットテスト用の説明です。'
        },
        template: {
            inner_number: NULL
        },
        prop: [
            {
                key: 'inner_number',
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
        inner: {
            name: 'InheritInner'
        }
    };
    /**
    * カタログ(継承、存在しない型)
    */
    export const inheritNotFoundType = {
        catalogItem: {
            ns: 'catalog/model/unit-test',
            name: 'ユニットテスト',
            _code: {
                _value: 9,
                _ver: 1
            },
            inherit: {
                _value: 8,
                _ver: 1
            },
            description: 'ユニットテスト用の説明です。'
        },
        template: {
            inner_number: NULL
        },
        prop: [
            {
                key: 'inner_number',
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
        inner: {
            name: 'InheritInner'
        }
    };

    /**
    * カタログ(cmatrix、継承あり)
    */
    export const inheritCatalog12 = {
        catalogItem: {
            ns: 'catalog/model/cmatrix/unit-test',
            name: '生年月日列',
            _code: {
                _value: 12,
                _ver: 1
            },
            inherit: {
                _value: 11,
                _ver: 1
            },
            description: 'CMatrixの生年月日列の定義です。'
        },
        template: {
            '@value': {
                index: '1_1',
                value: NULL
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
                        index: '1_1',
                        reserved: true
                    },
                    format: NULL,
                    unit: NULL,
                    candidate: NULL
                },
                description: 'サンプルnumber',
                isInherit: false
            }
        ],
        inner: {
            name: '@value'
        }
    };

    /**
    * カタログ(cmatrix以外、継承あり)
    */
    export const inheritNotCmatrix = {
        catalogItem: {
            ns: 'catalog/model/unit-test',
            name: 'ユニットテスト',
            _code: {
                _value: 13,
                _ver: 1
            },
            inherit: {
                _value: 12,
                _ver: 1
            },
            description: 'ユニットテスト用説明'
        },
        template: {
            '@value': {
                index: '1_1',
                value: NULL
            }
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
                    format: NULL,
                    unit: NULL,
                    candidate: NULL
                },
                description: 'サンプルnumber',
                isInherit: false
            }
        ],
        inner: {
            name: '@value'
        }
    };
}
