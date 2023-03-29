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

export default class UpdateSetDomain {
    /**
     * ID
     */
    id: number = null;

    /**
     * 名称
     */
    name: string = null;

    /**
     * 説明
     */
    description: string = null;

    /**
     * タイプ
     */
    type: number = null;

    /**
     * 申請元アクターコード
     */
    callerActorCode: number = null;

    /**
     * 申請元アクターバージョン
     */
    callerActorVersion: number = null;

    /**
     * 承認アクターコード
     */
    approvalActorCode: number = null;

    /**
     * 承認アクターバージョン
     */
    approvalActorVersion: number = null;

    /**
     * 承認者
     */
    approver: string = null;

    /**
     * 承認日時
     */
    approvalAt: Date = null;

    /**
     * コメント
     */
    comment: string = null;

    /**
     * ステータス
     */
    status: number = null;

    /**
     * 登録アクターコード
     */
    registerActorCode: number = null;

    /**
     * 登録アクターバージョン
     */
    registerActorVersion: number = null;

    /**
     * 登録者
     */
    register: string = null;

    /**
     * 登録日時
     */
    registAt: Date = null;

    /**
     * ステータス反転
     */
    isIgnore: boolean = false;

    /**
     * その他
     */
    appendix: string = null;

    /**
     * 削除フラグ
     */
    isDisabled: boolean = false;

    /**
     * 更新者
     */
    updatedBy: string = null;
}
