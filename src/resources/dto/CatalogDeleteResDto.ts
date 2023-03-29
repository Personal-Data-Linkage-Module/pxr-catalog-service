/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/**
 * DELETE: カタログ削除のレスポンスDTO
 */
export default class CatalogDeleteResDto {
    /**
     * 削除コード
     */
    code: number = null;

    /**
     * データ構造取得(JSON用連想配列)
     */
    public getAsJson (): {} {
        return {
            code: Number(this.code)
        };
    }
}
