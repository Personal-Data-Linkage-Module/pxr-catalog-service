/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/**
 *
 *
 *
 * $Date$
 * $Revision$
 * $Author$
 *
 * TEMPLATE VERSION :  76463
 */

// SDE-IMPL-REQUIRED 本ファイルをコピーし適切なファイル名、クラス名に変更したうえで実際の業務処理を実装してください。

export default class CatalogItemDomain {
    /**
     * ID
     */
    id: number = null;

    /**
     * タイプ
     */
    type: string = null;

    /**
     * カタログコード
     */
    code: number = null;

    /**
     * カタログバージョン
     */
    version: number = null;

    /**
     * 複数カタログコード
     */
    codes: number[] = null;

    /**
     * コード・バージョンオブジェクト
     */
    codeVersions: any[] = null;

    /**
     * ネームスペースID
     */
    nsId: number = null;

    /**
     * ネームスペースIDs
     */
    nsIds: number[] = null;

    /**
     * ネームスペース
     */
    ns: string = null;

    /**
     * 名前空間
     */
    name: string = null;

    /**
     * 説明
     */
    description: string = null;

    /**
     * 継承カタログコード
     */
    inheritCode: number = null;

    /**
     * 継承カタログバージョン
     */
    inheritVersion: number = null;

    /**
     * 予約フラグ
     */
    isReserved: boolean = false;

    /**
     * 論理削除済データ取得フラグ
     */
    includeDeleted: boolean = false;

    /**
     * レスポンスJSON
     */
    response: string = null;

    /**
     * その他属性
     */
    attributes: string = null;

    /**
     * 検索用コード
     */
    codeBySearch: number[] = null;

    /**
     * 検索用ネームスペース
     */
    nsBySearch: string[] = null;

    /**
     * 検索用attribute
     */
    attributeBySearch: {} = null;

    /**
     * 更新者
     */
    updatedBy: string = null;
}
