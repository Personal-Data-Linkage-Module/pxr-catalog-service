/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { CatalogCodeScopeDto } from './CatalogCodeScopeGetResDto';
/* eslint-enable */

/**
 * GET: カタログコード範囲取得のレスポンスDTO
 */
export default class CatalogCodeScopeGetByTypeResDto {
    /**
     * 結果リスト
     */
    list: CatalogCodeScopeDto[] = [];

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
