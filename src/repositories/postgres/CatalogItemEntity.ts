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
 * カタログ項目テーブル エンティティクラス
 */
@Entity('catalog_item')
export default class CatalogItemEntity extends BaseEntity {
    /**
     * ID
     */
    @PrimaryGeneratedColumn({ type: 'bigint' })
    readonly id!: number;

    /**
     * コード
     */
    @Column({ type: 'bigint', nullable: false, name: 'code' })
    code: number;

    /**
     * バージョン
     */
    @Column({ type: 'bigint', nullable: false, name: 'version' })
    version: number;

    /**
     * 名前空間ID
     */
    @Column({ type: 'bigint', nullable: true, name: 'ns_id' })
    nsId: number;

    /**
     * 名称
     */
    @Column({ type: 'varchar', length: 255, nullable: true, name: 'name' })
    name: string;

    /**
     * 説明
     */
    @Column({ type: 'text', nullable: true, name: 'description' })
    description: string;

    /**
     * 継承カタログ項目コード
     */
    @Column({ type: 'bigint', nullable: true, name: 'inherit_code' })
    inheritCode: number;

    /**
     * 継承カタログ項目バージョン
     */
    @Column({ type: 'bigint', nullable: true, name: 'inherit_version' })
    inheritVersion: number;

    /**
     * 予約フラグ
     */
    @Column({ type: 'boolean', nullable: false, default: false, name: 'is_reserved' })
    isReserved: boolean = false;

    /**
     * 削除フラグ
     */
    @Column({ type: 'boolean', nullable: false, default: false, name: 'is_disabled' })
    isDisabled: boolean = false;

    /**
     * レスポンスJSON
     */
    @Column({ type: 'text', nullable: true, name: 'response' })
    response: string;

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
            this.code = Number(info['code']);
            this.version = Number(info['version']);
            this.nsId = Number(info['ns_id']);
            this.name = info['name'];
            this.description = info['description'];
            this.inheritCode = Number(info['inherit_code']);
            this.inheritVersion = Number(info['inherit_version']);
            this.isReserved = info['is_reserved'] ? Boolean(info['is_reserved']) : false;
            this.isDisabled = info['is_disabled'] ? Boolean(info['is_disabled']) : false;
            this.response = info['response'];
            this.attributes = info['attributes'];
            this.createdBy = info['created_by'];
            this.createdAt = info['created_at'] ? new Date(info['created_at']) : null;
            this.updatedBy = info['updated_by'];
            this.updatedAt = info['updated_at'] ? new Date(info['updated_at']) : null;
        }
    }
}
