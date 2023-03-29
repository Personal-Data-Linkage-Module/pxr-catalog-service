/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/**
 * DELETE: カタログコード範囲追加のレスポンスDTO
 */
export default class CatalogCodeScopeDeleteResDto {
    /**
     * 削除ID
     */
    id: number = null;

    /**
     * データ構造取得(JSON用連想配列)
     */
    public getAsJson (): {} {
        return {
            id: Number(this.id)
        };
    }
}
