/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import {
    Entity,
    BaseEntity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryColumn
} from 'typeorm';

/**
 * カタログテーブル エンティティクラス
 */
@Entity('catalog')
export default class CatalogEntity extends BaseEntity {
    /**
     * UUID
     */
    @PrimaryColumn({ type: 'varchar', length: 255, nullable: false })
    readonly id!: string;

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
     * 拡張ネームスペース
     */
    @Column({ type: 'text', nullable: false, name: 'ext_name' })
    extName: string;

    /**
     * 削除フラグ
     */
    @Column({ type: 'boolean', nullable: false, default: false, name: 'is_disabled' })
    isDisabled: boolean = false;

    /**
     * その他属性
     */
    @Column({ type: 'text', nullable: false, name: 'attributes' })
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
            this.id = info['id'];
            this.name = info['name'];
            this.description = info['description'];
            this.extName = info['ext_name'];
            this.isDisabled = info['is_disabled'] ? Boolean(info['is_disabled']) : false;
            this.attributes = info['attributes'];
            this.createdBy = info['created_by'];
            this.createdAt = info['created_at'] ? new Date(info['created_at']) : null;
            this.updatedBy = info['updated_by'];
            this.updatedAt = info['updated_at'] ? new Date(info['updated_at']) : null;
        }
    }
}
