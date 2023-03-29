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
 * カタログコード範囲テーブル エンティティクラス
 */
@Entity('catalog_code_scope')
export default class CatalogCodeScopeEntity extends BaseEntity {
    /**
     * ID
     */
    @PrimaryGeneratedColumn({ type: 'bigint' })
    readonly id!: number;

    /**
     * タイプ
     */
    @Column({ type: 'varchar', length: 255, nullable: false, name: 'type' })
    type: string;

    /**
     * コード開始
     */
    @Column({ type: 'bigint', nullable: false, name: 'start_code' })
    startCode: number;

    /**
     * コード終了
     */
    @Column({ type: 'bigint', nullable: false, name: 'end_code' })
    endCode: number;

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
            this.type = info['type'];
            this.startCode = Number(info['start_code']);
            this.endCode = Number(info['end_code']);
            this.isDisabled = info['is_disabled'] ? Boolean(info['is_disabled']) : false;
            this.createdBy = info['created_by'];
            this.createdAt = info['created_at'] ? new Date(info['created_at']) : null;
            this.updatedBy = info['updated_by'];
            this.updatedAt = info['updated_at'] ? new Date(info['updated_at']) : null;
        }
    }
}
