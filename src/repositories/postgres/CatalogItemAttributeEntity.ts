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
 * カタログ項目属性テーブル エンティティクラス
 */
@Entity('catalog_item_attribute')
export default class CatalogItemAttributeEntity extends BaseEntity {
    /**
     * ID
     */
    @PrimaryGeneratedColumn({ type: 'bigint' })
    readonly id!: number;

    /**
     * カタログ項目ID
     */
    @Column({ type: 'bigint', nullable: true, name: 'catalog_item_id' })
    catalogItemId: number;

    /**
     * カタログコード
     */
    @Column({ type: 'bigint', nullable: true, name: 'catalog_code' })
    catalogCode: number;

    /**
     * 値のタイプ(objects: 1, tags: 2)
     */
     @Column({ type: 'smallint', nullable: false, name: 'type' })
    type: number;

    /**
     * キー
     */
    @Column({ type: 'bigint', nullable: true, name: 'key_code' })
    keyCode: number;

    /**
     * キー
     */
    @Column({ type: 'bigint', nullable: true, name: 'key_version' })
    keyVersion: number;

    /**
     * ネームスペースID
     */
    @Column({ type: 'bigint', nullable: true, name: 'ns_id' })
    nsId: number;

    /**
     * 値
     */
    @Column({ type: 'varchar', length: 255, nullable: true, name: 'value' })
    value: string;

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
    @CreateDateColumn({ type: 'timestamp without time zone', nullable: false, name: 'created_at' })
    readonly createdAt!: Date;

    /**
     * 更新者
     */
    @Column({ type: 'varchar', length: 255, nullable: false, name: 'updated_by' })
    updatedBy: string;

    /**
     * 更新日時
     */
    @UpdateDateColumn({ type: 'timestamp without time zone', nullable: false, name: 'updated_at', onUpdate: 'now()' })
    readonly updatedAt!: Date;

    /**
     * コンストラクタ
     * @param info
     */
    public constructor (info: {}) {
        super();
        if (info) {
            this.id = Number(info['id']);
            this.catalogCode = Number(info['catalog_code']);
            this.type = Number(info['type']);
            this.keyCode = Number(info['key_code']);
            this.keyVersion = Number(info['key_version']);
            this.nsId = Number(info['ns_id']);
            this.value = info['value'];
            this.description = info['description'];
            this.isDisabled = info['is_disabled'] ? Boolean(info['is_disabled']) : false;
            this.createdBy = info['created_by'];
            this.createdAt = info['created_at'] ? new Date(info['created_at']) : null;
            this.updatedBy = info['updated_by'];
            this.updatedAt = info['updated_at'] ? new Date(info['updated_at']) : null;
        }
    }
}
