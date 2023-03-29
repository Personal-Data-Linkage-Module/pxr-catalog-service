/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/**
 * GET: カタログ取得のレスポンスDTO
 */
export default class CatalogGetResDto {
    /**
     * 結果リスト
     */
    list: CatalogDto[] = [];

    /**
     * データ構造取得(JSON用連想配列)
     */
    public getAsJson (): {}[] {
        const response: {}[] = [];
        for (const info of this.list) {
            response.push(info.getAsJson());
        }
        return response;
    }
}

export class CatalogDto {
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
