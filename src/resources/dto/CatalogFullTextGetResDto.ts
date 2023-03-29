/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/**
 * GET: カタログ全文検索取得のレスポンスDTO
 */
export default class CatalogFullTextGetResDto {
    /**
     * 結果リスト
     */
    list: CodeObjectDto[] = [];

    /**
     * スコア
     */
    score: number[] = [];

    /**
     * データ構造取得(JSON用連想配列)
     */
    public getAsJson (): {}[] {
        const response: {}[] = [];
        for (let index = 0; index < this.list.length; index++) {
            response.push({
                _code: this.list[index].getAsJson(),
                _score: this.score[index] ? Number(this.score[index]) : null
            });
        }
        return response;
    }
}

export class CodeObjectDto {
    /**
     * ID
     */
    code: number = null;

    /**
     * タイプ
     */
    version: number = null;

    /**
     * データ構造取得(JSON用連想配列)
     */
    public getAsJson (): {} {
        return {
            _value: Number(this.code),
            _ver: this.version
        };
    }
}
