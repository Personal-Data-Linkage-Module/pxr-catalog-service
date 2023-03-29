/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/**
 * DELETE: ネームスペース削除のレスポンスDTO
 */
export default class NameSpaceDeleteResDto {
    /**
     * 削除ネームスペースID
     */
    nsId: number = null;

    /**
     * データ構造取得(JSON用連想配列)
     */
    public getAsJson (): {} {
        return {
            nsId: Number(this.nsId)
        };
    }
}
