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
 * 変更セット属性テーブル エンティティクラス
 */
@Entity('attribute_update_set')
export default class UpdateSetAttributeEntity extends BaseEntity {
    /**
     * ID
     */
    @PrimaryGeneratedColumn({ type: 'bigint' })
    readonly id!: number;

    /**
     * 変更セットID
     */
    @Column({ type: 'bigint', nullable: false, name: 'update_set_id' })
    updateSetId: number;

    /**
     * タイプ
     */
    @Column({ type: 'smallint', nullable: false, default: 0, name: 'type' })
    type: number;

    /**
     * 対象カタログコード
     */
    @Column({ type: 'bigint', nullable: true, name: 'catalog_code' })
    catalogCode: number;

    /**
     * コメント
     */
    @Column({ type: 'text', nullable: true, name: 'comment' })
    comment: string;

    /**
     * テンプレート
     */
    @Column({ type: 'text', nullable: false, name: 'attribute' })
    attribute: string;

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
            this.updateSetId = Number(info['update_set_id']);
            this.type = Number(info['type']);
            this.catalogCode = info['catalog_code'] ? Number(info['catalog_code']) : null;
            this.comment = info['comment'];
            this.attribute = info['attribute'];
            this.isDisabled = info['is_disabled'] ? Boolean(info['is_disabled']) : false;
            this.createdBy = info['created_by'];
            this.createdAt = info['created_at'] ? new Date(info['created_at']) : null;
            this.updatedBy = info['updated_by'];
            this.updatedAt = info['updated_at'] ? new Date(info['updated_at']) : null;
        }
    }
}
