/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/**
 * POST: アクティベートのレスポンスDTO
 */
export default class CatalogNamePostResDto {
    /**
     * ID
     */
    id: string = null;

    /**
     * カタログ名称
     */
    name: string = null;

    /**
     * 説明
     */
    description: string = null;

    /**
     * 拡張ネームスペース
     */
    extName: string = null;

    /**
     * データ構造取得(JSON用連想配列)
     */
    public getAsJson (): {} {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            ext_name: this.extName
        };
    }
}
