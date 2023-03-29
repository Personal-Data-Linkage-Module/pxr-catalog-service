/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';

/**
 * 変更セットテーブル エンティティクラス
 */
@Entity('update_set')
export default class UpdateSetEntity extends BaseEntity {
    /**
     * ID
     */
    @PrimaryGeneratedColumn({ type: 'bigint' })
    readonly id!: number;

    /**
     * 名称
     */
    @Column({ type: 'varchar', length: 255, nullable: false, name: 'name' })
    name: string;

    /**
     * 説明
     */
    @Column({ type: 'text', nullable: true, name: 'description' })
    description: string;

    /**
     * タイプ
     */
     @Column({ type: 'smallint', nullable: false, default: 0, name: 'type' })
     type: number;

    /**
     * 申請元アクターコード
     */
    @Column({ type: 'bigint', nullable: true, name: 'caller_actor_code' })
    callerActorCode: number;

    /**
     * 申請元アクターバージョン
     */
    @Column({ type: 'bigint', nullable: true, name: 'caller_actor_version' })
    callerActorVersion: number;

    /**
     * 承認アクターコード
     */
    @Column({ type: 'bigint', nullable: true, name: 'approval_actor_code' })
    approvalActorCode: number;

    /**
     * 承認アクターバージョン
     */
    @Column({ type: 'bigint', nullable: true, name: 'approval_actor_version' })
    approvalActorVersion: number;

    /**
     * 承認者
     */
    @Column({ type: 'varchar', length: 255, nullable: true, name: 'approver' })
    approver: string;

    /**
     * 承認日時
     */
    @Column({ type: 'timestamp without time zone', nullable: true, name: 'approval_at' })
    approvalAt!: Date;

    /**
     * コメント
     */
    @Column({ type: 'text', nullable: true, name: 'comment' })
    comment: string;

    /**
     * ステータス
     */
    @Column({ type: 'smallint', nullable: false, default: 0, name: 'status' })
    status: number;

    /**
     * 登録アクターコード
     */
    @Column({ type: 'bigint', nullable: true, name: 'register_actor_code' })
    registerActorCode: number;

    /**
     * 登録アクターバージョン
     */
    @Column({ type: 'bigint', nullable: true, name: 'register_actor_version' })
    registerActorVersion: number;

    /**
     * 登録者
     */
    @Column({ type: 'varchar', length: 255, nullable: true, name: 'register' })
    register: string;

    /**
     * 登録日時
     */
    @Column({ type: 'timestamp without time zone', nullable: true, name: 'regist_at' })
    registAt!: Date;

    /**
     * その他
     */
    @Column({ type: 'text', nullable: true, name: 'appendix' })
    appendix: string;

    /**
     * 削除フラグ
     */
    @Column({ type: 'boolean', nullable: false, default: false, name: 'is_disabled' })
    isDisabled: boolean = false;

    /**
     * 登録者
     */
    @Column({ type: 'varchar', length: 255, nullable: false, name: 'created_by' })
    createdBy: string;

    /**
     * 登録日時
     */
    @CreateDateColumn({ type: 'timestamp without time zone', nullable: false, default: 'NOW()', name: 'created_at' })
    readonly createdAt!: Date;

    /**
     * 更新者
     */
    @Column({ type: 'varchar', length: 255, nullable: false, name: 'updated_by' })
    updatedBy: string;

    /**
     * 更新日時
     */
    @UpdateDateColumn({ type: 'timestamp without time zone', nullable: false, default: 'NOW()', name: 'updated_at', onUpdate: 'now()' })
    readonly updatedAt!: Date;

    /**
     * コンストラクタ
     * @param info
     */
    public constructor (info: {}) {
        super();
        if (info) {
            this.id = Number(info['id']);
            this.name = info['name'];
            this.description = info['description'];
            this.type = Number(info['type']);
            this.callerActorCode = info['caller_actor_code'] ? Number(info['caller_actor_code']) : null;
            this.callerActorVersion = info['caller_actor_version'] ? Number(info['caller_actor_version']) : null;
            this.approvalActorCode = info['approval_actor_code'] ? Number(info['approval_actor_code']) : null;
            this.approvalActorVersion = info['approval_actor_version'] ? Number(info['approval_actor_version']) : null;
            this.approver = info['approver'];
            this.approvalAt = info['approval_at'] ? new Date(info['approval_at']) : null;
            this.comment = info['comment'];
            this.status = Number(info['status']);
            this.registerActorCode = info['register_actor_code'] ? Number(info['register_actor_code']) : null;
            this.registerActorVersion = info['register_actor_version'] ? Number(info['register_actor_version']) : null;
            this.register = info['register'];
            this.registAt = info['regist_at'] ? new Date(info['regist_at']) : null;
            this.appendix = info['appendix'];
            this.isDisabled = info['is_disabled'] ? Boolean(info['is_disabled']) : false;
            this.createdBy = info['created_by'];
            this.createdAt = info['created_at'] ? new Date(info['created_at']) : null;
            this.updatedBy = info['updated_by'];
            this.updatedAt = info['updated_at'] ? new Date(info['updated_at']) : null;
        }
    }
}
