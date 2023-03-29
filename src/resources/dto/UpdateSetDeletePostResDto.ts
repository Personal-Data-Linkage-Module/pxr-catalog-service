/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/**
 * POST: 変更セット登録削除レスポンスDTO
 */
export default class UpdateSetDeletePostResDto {
    /**
     * ID
     */
    id: number = null;

    /**
     * データ構造取得(JSON用連想配列)
     */
    public getAsJson (): {} {
        return {
            id: this.id
        };
    }
}
