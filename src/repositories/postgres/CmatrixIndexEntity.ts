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
 * CMatrixインデックステーブル エンティティクラス
 */
@Entity('cmatrix_index')
export default class CmatrixIndexEntity extends BaseEntity {
    /**
     * ID
     */
    @PrimaryGeneratedColumn({ type: 'bigint' })
    readonly id!: number;

    /**
     * カタログ項目ID
     */
    @Column({ type: 'bigint', nullable: false, name: 'catalog_item_id' })
    catalogItemId: number;

    /**
     * インデックス
     */
    @Column({ type: 'varchar', length: 255, nullable: false, name: 'index_key' })
    indexKey: string;

    /**
     * 値
     */
    @Column({ type: 'varchar', length: 255, nullable: true, name: 'value' })
    value: string;

    /**
     * 予約フラグ
     */
    @Column({ type: 'boolean', nullable: false, default: false, name: 'reserved' })
    reserved: boolean = false;

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
            this.catalogItemId = Number(info['catalog_item_id']);
            this.indexKey = info['index_key'];
            this.value = info['value'];
            this.reserved = info['reserved'] ? Boolean(info['reserved']) : false;
            this.isDisabled = info['is_disabled'] ? Boolean(info['is_disabled']) : false;
            this.attributes = info['attributes'];
            this.createdBy = info['created_by'];
            this.createdAt = info['created_at'] ? new Date(info['created_at']) : null;
            this.updatedBy = info['updated_by'];
            this.updatedAt = info['updated_at'] ? new Date(info['updated_at']) : null;
        }
    }
}
