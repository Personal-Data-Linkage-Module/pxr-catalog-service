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
 * カタログリレーションテーブル エンティティクラス
 */
@Entity('catalog_relationship')
export default class CatalogRelationshipEntity extends BaseEntity {
    /**
     * ID
     */
    @PrimaryGeneratedColumn({ type: 'bigint' })
    readonly id!: number;

    /**
     * 参照元カタログ項目ID
     */
    @Column({ type: 'bigint', nullable: false, name: 'catalog_item_id' })
    catalogItemId: number;

    /**
     * 参照先カタログ項目ID
     */
    @Column({ type: 'bigint', nullable: false, name: 'ref_catalog_item_id' })
    refCatalogItemId: number;

    /**
     * 参照タイプ
     */
    @Column({ type: 'varchar', length: 255, nullable: false, name: 'ref_type' })
    refType: string;

    /**
     * 最新取得フラグ
     */
    @Column({ type: 'boolean', nullable: false, default: false, name: 'is_get_latest' })
    isGetLatest: boolean = false;

    /**
     * 参照元項目テンプレートID
     */
    @Column({ type: 'bigint', nullable: true, name: 'item_template_id' })
    itemTemplateId: number;

    /**
     * 参照元項目テンプレートプロパティID
     */
    @Column({ type: 'bigint', nullable: true, name: 'template_property_id' })
    templatePropertyId: number;

    /**
     * 参照元プロパティ候補ID
     */
    @Column({ type: 'bigint', nullable: true, name: 'property_candidate_id' })
    propertyCandidateId: number;

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
            this.refCatalogItemId = Number(info['ref_catalog_item_id']);
            this.refType = info['ref_type'];
            this.isGetLatest = info['is_get_latest'] ? Boolean(info['is_get_latest']) : false;
            this.itemTemplateId = Number(info['item_template_id']);
            this.templatePropertyId = Number(info['template_property_id']);
            this.isDisabled = info['is_disabled'] ? Boolean(info['is_disabled']) : false;
            this.attributes = info['attributes'];
            this.createdBy = info['created_by'];
            this.createdAt = info['created_at'] ? new Date(info['created_at']) : null;
            this.updatedBy = info['updated_by'];
            this.updatedAt = info['updated_at'] ? new Date(info['updated_at']) : null;
        }
    }
}
