/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/**
 * GET: ネームスペース取得のレスポンスDTO
 */
export default class NameSpaceGetResDto {
    /**
     * 結果リスト
     */
    list: NameSpaceDto[] = [];

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

export class NameSpaceDto {
    /**
     * ID
     */
    id: number = null;

    /**
     * ネームスペース
     */
    ns: string = null;

    /**
     * 説明
     */
    description: string = null;

    /**
     * データ構造取得(JSON用連想配列)
     */
    public getAsJson (): {} {
        return {
            id: Number(this.id),
            ns: this.ns,
            description: this.description
        };
    }
}
