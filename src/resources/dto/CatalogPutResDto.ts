/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/**
 * PUT: カタログ更新のレスポンスDTO
 */
export default class CatalogPutResDto {
    /**
     * カタログ情報
     */
    catalog: {} = null;

    /**
     * データ構造取得(JSON用連想配列)
     */
    public getAsJson (): {} {
        return this.catalog;
    }
}
