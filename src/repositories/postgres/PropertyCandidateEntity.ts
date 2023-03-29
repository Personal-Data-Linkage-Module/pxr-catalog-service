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
 * プロパティ候補テーブル エンティティクラス
 */
@Entity('property_candidate')
export default class PropertyCandidateEntity extends BaseEntity {
    /**
     * ID
     */
    @PrimaryGeneratedColumn({ type: 'bigint' })
    readonly id!: number;

    /**
     * プロパティ定義ID
     */
    @Column({ type: 'bigint', nullable: false, name: 'template_property_id' })
    templatePropertyId: number;

    /**
     * ネームスペースID
     */
    @Column({ type: 'bigint', nullable: true, name: 'ns_id' })
    nsId: number;

    /**
     * 子要素フラグ
     */
    @Column({ type: 'boolean', nullable: false, default: false, name: 'is_descendant' })
    isDescendant: boolean = false;

    /**
     * コード
     */
    @Column({ type: 'bigint', nullable: true, name: 'code' })
    code: number;

    /**
     * バージョン
     */
    @Column({ type: 'bigint', nullable: true, name: 'version' })
    version: number;

    /**
     * 基底コード
     */
    @Column({ type: 'bigint', nullable: true, name: 'base_code' })
    baseCode: number;

    /**
     * 基底バージョン
     */
    @Column({ type: 'bigint', nullable: true, name: 'base_version' })
    baseVersion: number;

    /**
     * 候補値
     */
    @Column({ type: 'text', nullable: true, name: 'value' })
    value: string;

    /**
     * 内部クラス
     */
    @Column({ type: 'text', nullable: true, name: 'inners' })
    inners: string;

    /**
     * 説明
     */
    @Column({ type: 'text', nullable: true, name: 'description' })
    description: string;

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
            this.templatePropertyId = Number(info['template_property_id']);
            this.nsId = Number(info['ns_id']);
            this.isDescendant = info['is_descendant'] ? Boolean(info['is_descendant']) : false;
            this.code = Number(info['code']);
            this.version = Number(info['version']);
            this.baseCode = Number(info['base_code']);
            this.baseVersion = Number(info['base_version']);
            this.value = info['value'];
            this.inners = info['inners'];
            this.description = info['description'];
            this.isDisabled = info['is_disabled'] ? Boolean(info['is_disabled']) : false;
            this.createdBy = info['created_by'];
            this.createdAt = info['created_at'] ? new Date(info['created_at']) : null;
            this.updatedBy = info['updated_by'];
            this.updatedAt = info['updated_at'] ? new Date(info['updated_at']) : null;
        }
    }
}
