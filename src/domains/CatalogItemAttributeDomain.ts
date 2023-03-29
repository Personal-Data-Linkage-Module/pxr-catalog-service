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

export default class CatalogItemAttributeDomain {
    /**
     * ID
     */
    id: number = null;

    /**
     * カタログ項目ID
     */
    catalogItemId: number = null;

    /**
     * 対象カタログコード
     */
    catalogCode: number = null;

    /**
     * キーコード
     */
    keyCode: number = null;

    /**
     * キーバージョン
     */
    keyVersion: number = null;

    /**
     * 値
     */
    value: string = null;

    /**
     * 説明
     */
    description: string = null;

    /**
     * 更新者
     */
    updatedBy: string = null;

    /**
     * 値のタイプ(objects: 1, tags: 2)
     */
    type: number = null;

    /**
     * ネームスペースID
     */
    nsId: number = null;
}
