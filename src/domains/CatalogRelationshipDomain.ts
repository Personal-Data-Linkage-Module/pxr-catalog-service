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

export default class CatalogRelationshipDomain {
    /**
     * ID
     */
    id: number = null;

    /**
     * 参照元カタログID
     */
    catalogItemId: number = null;

    /**
     * 参照先カタログID
     */
    refCatalogItemId: number = null;

    /**
     * 参照先タイプ
     */
    refType: string = null;

    /**
     * 最新取得フラグ
     */
    isGetLatest: boolean = false;

    /**
     * 参照元アイテムテンプレートID
     */
    itemTemplateId: number = null;

    /**
     * 参照元テンプレートプロパティID
     */
    templatePropertyId: number = null;

    /**
     * 参照元プロパティ候補ID
     */
    propertyCandidateId: number = null;

    /**
     * その他属性
     */
    attributes: string = null;

    /**
     * 更新者
     */
    updatedBy: string = null;
}
