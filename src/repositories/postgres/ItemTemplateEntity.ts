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
 * アイテムテンプレートテーブル エンティティクラス
 */
@Entity('item_template')
export default class ItemTemplateEntity extends BaseEntity {
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
     * プロパティ定義ID
     */
    @Column({ type: 'bigint', nullable: true, name: 'template_property_id' })
    templatePropertyId: number;

    /**
     * テンプレート
     */
    @Column({ type: 'text', nullable: true, name: 'template' })
    template: string;

    /**
     * 内部クラス名称
     */
    @Column({ type: 'varchar', length: 255, nullable: false, name: 'inner_name' })
    innerName: string;

    /**
     * 内部クラス継承カタログ項目コード
     */
    @Column({ type: 'bigint', nullable: true, name: 'inner_inherit_code' })
    innerInheritCode: number;

    /**
     * 内部クラス継承カタログ項目バージョン
     */
    @Column({ type: 'bigint', nullable: true, name: 'inner_inherit_version' })
    innerInheritVersion: number;

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
            this.catalogItemId = Number(info['catalog_item_id']);
            this.templatePropertyId = Number(info['template_property_id']);
            this.template = info['template'];
            this.innerName = info['inner_name'];
            this.innerInheritCode = Number(info['inner_inherit_code']);
            this.innerInheritVersion = Number(info['inner_inherit_version']);
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
