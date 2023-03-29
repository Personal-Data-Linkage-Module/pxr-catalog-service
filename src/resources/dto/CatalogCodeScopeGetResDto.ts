/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/**
 * GET: カタログコード範囲取得のレスポンスDTO
 */
export default class CatalogCodeScopeGetResDto {
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

export class CatalogCodeScopeDto {
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
