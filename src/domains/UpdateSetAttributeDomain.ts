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

export default class UpdateSetAttributeDomain {
    /**
     * ID
     */
    id: number = null;

    /**
     * 変更セットID
     */
    updateSetId: number = null;

    /**
     * タイプ
     */
    type: number = null;

    /**
     * 対象カタログコード
     */
    catalogCode: number = null;

    /**
     * コメント
     */
    comment: string = null;

    /**
     * 属性
     */
    attribute: string = null;

    /**
     * 削除フラグ
     */
    isDisabled: boolean = false;

    /**
     * 更新者
     */
    updatedBy: string = null;
}
