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

export default class CmatrixIndexDomain {
    /**
     * ID
     */
    id: number = null;

    /**
     * カタログD
     */
    catalogItemId: number = null;

    /**
     * インデックス
     */
    indexKey: string = null;

    /**
     * 値
     */
    value: string = null;

    /**
     * 予約フラグ
     */
    reserved: boolean = false;

    /**
     * その他属性
     */
    attributes: string = null;

    /**
     * 更新者
     */
    updatedBy: string = null;
}
