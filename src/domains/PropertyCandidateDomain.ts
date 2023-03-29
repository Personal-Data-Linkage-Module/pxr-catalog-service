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

export default class PropertyCandidateDomain {
    /**
     * ID
     */
    id: number = null;

    /**
     * テンプレートプロパティID
     */
    templatePropertyId: number = null;

    /**
     * ネームスペースID
     */
    nsId: number = null;

    /**
     * 子要素フラグ
     */
    isDescendant: boolean = null;

    /**
     * カタログコード
     */
    code: number = null;

    /**
     * カタログバージョン
     */
    version: number = null;

    /**
     * 基底カタログコード
     */
    baseCode: number = null;

    /**
     * 基底カタログバージョン
     */
    baseVersion: number = null;

    /**
     * 候補値
     */
    value: string = null;

    /**
     * 内部クラス
     */
    inners: string = null;

    /**
     * 説明
     */
    description: string = null;

    /**
     * 更新者
     */
    updatedBy: string = null;
}
