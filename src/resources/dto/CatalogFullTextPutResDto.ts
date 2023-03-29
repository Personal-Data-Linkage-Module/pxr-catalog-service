/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/**
 * PUT: カタログ全文検索追加のレスポンスDTO
 */
export default class CatalogFullTextPutResDto {
    /**
     * カタログコード
     */
    code: number = null;

    /**
     * データ構造取得(JSON用連想配列)
     */
    public getAsJson (): {} {
        return {
            _code: {
                _value: this.code,
                _ver: null
            }
        };
    }
}
