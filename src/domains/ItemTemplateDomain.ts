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

export default class ItemTemplateDomain {
    /**
     * ID
     */
    id: number = null;

    /**
     * カタログID
     */
    catalogItemId: number = null;

    /**
     * テンプレートプロパティID
     */
    templatePropertyId: number = null;

    /**
     * テンプレート
     */
    template: string = null;

    /**
     * 内部クラス名
     */
    innerName: string = null;

    /**
     * 内部クラス継承カタログコード
     */
    innerInheritCode: number = null;

    /**
     * 内部クラス継承カタログバージョン
     */
    innerInheritVersion: number = null;

    /**
     * レスポンスJSON
     */
    response: string = null;

    /**
     * その他属性
     */
    attributes: string = null;

    /**
     * 更新者
     */
    updatedBy: string = null;
}
