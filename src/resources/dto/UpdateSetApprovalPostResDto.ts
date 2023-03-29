/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import Config from '../../common/Config';
import moment = require('moment-timezone');
const config = Config.ReadConfig('./config/config.json');

/**
 * POST: 変更セット承認レスポンスDTO
 */
export default class UpdateSetApprovalPostResDto {
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
     * 申請元アクターコード
     */
    callerActorCode: number = null;

    /**
     * 承認アクターコード
     */
    approvalActorCode: number = null;

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
     * 登録者
     */
    register: string = null;

    /**
     * 登録日時
     */
    registAt: Date = null;

    /**
     * ネームスペースリスト
     */
    ns: {}[] = null;

    /**
     * カタログリスト
     */
    catalog: {}[] = null;

    /**
     * 属性リスト
     */
    attribute: {}[] = null;

    /**
     * その他
     */
    appendix: {} = null;

    /**
     * データ構造取得(JSON用連想配列)
     */
    public getAsJson (): {} {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            callerActorCode: this.callerActorCode ? Number(this.callerActorCode) : null,
            approvalActorCode: this.approvalActorCode ? Number(this.approvalActorCode) : null,
            approver: this.approver,
            approvalAt: this.approvalAt ? moment(this.approvalAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ') : null,
            comment: this.comment,
            status: this.status,
            registerActorCode: this.registerActorCode ? Number(this.registerActorCode) : null,
            register: this.register,
            registAt: this.registAt ? moment(this.registAt).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ') : null,
            ns: this.ns,
            catalog: this.catalog,
            attribute: this.attribute,
            appendix: this.appendix
        };
    }
}
