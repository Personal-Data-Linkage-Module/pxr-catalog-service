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
 * テンプレートプロパティテーブル エンティティクラス
 */
@Entity('template_property')
export default class TemplatePropertyEntity extends BaseEntity {
    /**
     * ID
     */
    @PrimaryGeneratedColumn({ type: 'bigint' })
    readonly id!: number;

    /**
     * プロパティ定義ID
     */
    @Column({ type: 'bigint', nullable: false, name: 'item_template_id' })
    itemTemplateId: number;

    /**
     * キー
     */
    @Column({ type: 'varchar', length: 255, nullable: false, name: 'key_name' })
    keyName: string;

    /**
     * タイプ
     */
    @Column({ type: 'varchar', length: 255, nullable: false, name: 'type' })
    type: string;

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
     * フィルター
     */
    @Column({ type: 'varchar', length: 255, nullable: true, name: 'filter' })
    filter: string;

    /**
     * インデックス
     */
    @Column({ type: 'varchar', length: 255, nullable: true, name: 'index_key' })
    indexKey: string;

    /**
     * フォーマットコード
     */
    @Column({ type: 'bigint', nullable: true, name: 'format_code' })
    formatCode: number;

    /**
     * フォーマットバージョン
     */
    @Column({ type: 'bigint', nullable: true, name: 'format_version' })
    formatVersion: number;

    /**
     * 単位コード
     */
    @Column({ type: 'bigint', nullable: true, name: 'unit_code' })
    unitCode: number;

    /**
     * 単位バージョン
     */
    @Column({ type: 'bigint', nullable: true, name: 'unit_version' })
    unitVersion: number;

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
     * その他属性
     */
    @Column({ type: 'text', nullable: true, name: 'attributes' })
    attributes: string;

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
            this.itemTemplateId = Number(info['item_template_id']);
            this.keyName = info['key_name'];
            this.type = info['type'];
            this.code = Number(info['code']);
            this.version = Number(info['version']);
            this.filter = info['filter'];
            this.indexKey = info['index_key'];
            this.formatCode = Number(info['format_code']);
            this.formatVersion = Number(info['format_version']);
            this.unitCode = Number(info['unit_code']);
            this.unitVersion = Number(info['unit_version']);
            this.description = info['description'];
            this.isDisabled = info['is_disabled'] ? Boolean(info['is_disabled']) : false;
            this.attributes = info['attributes'];
            this.createdBy = info['created_by'];
            this.createdAt = info['created_at'] ? new Date(info['created_at']) : null;
            this.updatedBy = info['updated_by'];
            this.updatedAt = info['updated_at'] ? new Date(info['updated_at']) : null;
        }
    }
}
