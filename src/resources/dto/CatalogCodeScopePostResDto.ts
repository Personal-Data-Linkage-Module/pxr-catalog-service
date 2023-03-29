/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/**
 * POST: カタログコード範囲追加のレスポンスDTO
 */
export default class CatalogCodeScopePostResDto {
    /**
     * ID
     */
    id: number = null;

    /**
     * タイプ
     */
    type: string = null;

    /**
     * コード開始
     */
    startCode: number = null;

    /**
     * コード終了
     */
    endCode: number = null;

    /**
     * データ構造取得(JSON用連想配列)
     */
    public getAsJson (): {} {
        return {
            id: Number(this.id),
            type: this.type,
            start_code: Number(this.startCode),
            end_code: Number(this.endCode)
        };
    }
}
