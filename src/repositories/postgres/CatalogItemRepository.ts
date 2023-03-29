/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Connection, EntityManager, InsertResult, UpdateResult } from 'typeorm';
import { Service } from 'typedi';
// import { applicationLogger } from '../../common/logging';
import CatalogItemDomain from '../../domains/CatalogItemDomain';
import CatalogItemEntity from './CatalogItemEntity';
/* eslint-enable */
import Log from '../../common/LogDecorator';
import NameSpaceEntity from './NameSpaceEntity';
import CatalogItemAttributeEntity from './CatalogItemAttributeEntity';

@Service()
export default class CatalogItemRepository {
    /**
     * DB接続オブジェクト
     */
    private connection: Connection;

    /**
     * コンストラクタ
     * @param connection
     */
    public constructor (connection: Connection) {
        this.connection = connection;
    }

    /**
     * カタログ取得
     * @param em
     * @param domain
     */
    @Log()
    public async getRecord (em: EntityManager, domain: CatalogItemDomain): Promise<CatalogItemEntity[]> {
        // SQLを生成
        const connection = em || this.connection;
        let sql = connection
            .createQueryBuilder()
            .select('catalog_item.*')
            .from(CatalogItemEntity, 'catalog_item')
            .leftJoin(NameSpaceEntity, 'ns', 'ns.id = catalog_item.ns_id AND ns.is_disabled = :is_disabled', { is_disabled: false });
        if (domain.includeDeleted === false) {
            sql = sql.where('catalog_item.is_disabled = :is_disabled', { is_disabled: false });
        }
        if (domain.id) {
            sql = sql.andWhere('catalog_item.id = :id', { id: domain.id });
        }
        if (domain.ns) {
            sql = sql.andWhere('ns.name = :name', { name: domain.ns });
            sql = sql.andWhere('catalog_item.version = ' +
                connection.createQueryBuilder()
                    .subQuery()
                    .select('MAX(temp_catalog_item.version)')
                    .from(CatalogItemEntity, 'temp_catalog_item')
                    .where('temp_catalog_item.is_disabled = :is_disabled', { is_disabled: false })
                    .andWhere('temp_catalog_item.code = catalog_item.code')
                    .getQuery()
            );
        }
        if (domain.code) {
            sql = sql.andWhere('catalog_item.code = :code', { code: domain.code });
        }
        if (domain.version) {
            sql = sql.andWhere('catalog_item.version = :version', { version: domain.version });
        }
        if (domain.codeVersions) {
            let conditionStr = '';
            let isNotFirst = false;
            const params = {};
            let index = 0;
            for (const code of domain.codeVersions) {
                if (isNotFirst) {
                    conditionStr += ',';
                }
                conditionStr += `(:code_${index}, :version_${index})`;
                params['code_' + index] = code._value;
                params['version_' + index] = code._ver;
                isNotFirst = true;
                index++;
            }
            if (conditionStr !== '') {
                sql = sql.andWhere(`(catalog_item.code, catalog_item.version) in (${conditionStr})`, params);
            }
        }
        sql = sql.orderBy('catalog_item.code', 'ASC')
            .addOrderBy('catalog_item.version', 'ASC');

        // SQLを実行
        const list: CatalogItemEntity[] = [];
        let slaveQueryRunner = null;
        if (!em) {
            slaveQueryRunner = this.connection.createQueryRunner('slave');
            sql.setQueryRunner(slaveQueryRunner);
        }
        try {
            const ret = await sql.getRawMany();
            for (const info of ret) {
                list.push(new CatalogItemEntity(info));
            }
            return list;
        } finally {
            if (slaveQueryRunner) {
                await slaveQueryRunner.release();
            }
        }
    }

    /**
     * カタログ件数取得
     * @param em
     * @param domain
     */
    @Log()
    public async getRecordCount (em: EntityManager, domain: CatalogItemDomain): Promise<number> {
        // SQLを生成
        const connection = em || this.connection;
        let sql = connection
            .createQueryBuilder()
            .from(CatalogItemEntity, 'catalog_item')
            .leftJoin(NameSpaceEntity, 'ns', 'ns.id = catalog_item.ns_id AND ns.is_disabled = :is_disabled', { is_disabled: false })
            .where('catalog_item.is_disabled = :is_disabled', { is_disabled: false });
        if (domain.id) {
            sql = sql.andWhere('catalog_item.id = :id', { id: domain.id });
        }
        if (domain.ns) {
            sql = sql.andWhere('ns.name = :name', { name: domain.ns });
            sql = sql.andWhere('catalog_item.version = ' +
                connection.createQueryBuilder()
                    .subQuery()
                    .select('MAX(temp_catalog_item.version)')
                    .from(CatalogItemEntity, 'temp_catalog_item')
                    .where('temp_catalog_item.is_disabled = :is_disabled', { is_disabled: false })
                    .andWhere('temp_catalog_item.code = catalog_item.code')
                    .getQuery()
            );
        }
        if (domain.code) {
            sql = sql.andWhere('catalog_item.code = :code', { code: domain.code });
        }
        if (domain.version) {
            sql = sql.andWhere('catalog_item.version = :version', { version: domain.version });
        }
        // SQLを実行
        let slaveQueryRunner = null;
        if (!em) {
            slaveQueryRunner = this.connection.createQueryRunner('slave');
            sql.setQueryRunner(slaveQueryRunner);
        }
        try {
            const ret = await sql.getCount();
            return ret;
        } finally {
            if (slaveQueryRunner) {
                await slaveQueryRunner.release();
            }
        }
    }

    /**
     * カタログ件数取得
     * @param em
     * @param domain
     */
    @Log()
    public async getRecordCountById (em: EntityManager, domain: CatalogItemDomain): Promise<number> {
        // SQLを生成
        const connection = em || this.connection;
        let sql = connection
            .createQueryBuilder()
            .from(CatalogItemEntity, 'catalog_item')
            .where('catalog_item.is_disabled = :is_disabled', { is_disabled: false });
        if (domain.id) {
            sql = sql.andWhere('catalog_item.id = :id', { id: domain.id });
        }
        // SQLを実行
        const ret = await sql.getCount();
        return ret;
    }

    /**
     * カタログ件数取得
     * @param em
     * @param domain
     */
    @Log()
    public async getRecordCountByNsId (em: EntityManager, domain: CatalogItemDomain): Promise<number> {
        // SQLを生成
        const connection = em || this.connection;
        let sql = connection
            .createQueryBuilder()
            .from(CatalogItemEntity, 'catalog_item')
            .where('catalog_item.is_disabled = :is_disabled', { is_disabled: false });
        if (domain.nsId) {
            sql = sql.andWhere('catalog_item.ns_id = :ns_id', { ns_id: domain.nsId });
        }
        // SQLを実行
        const ret = await sql.getCount();
        return ret;
    }

    /**
     * カタログ取得
     * @param em
     * @param domain
     */
    @Log()
    public async getRecordByNs (em: EntityManager, domain: CatalogItemDomain): Promise<CatalogItemEntity[]> {
        // SQLを生成
        const connection = em || this.connection;
        let sql = connection
            .createQueryBuilder()
            .select('catalog_item.*')
            .from(CatalogItemEntity, 'catalog_item')
            .leftJoin(NameSpaceEntity, 'ns', 'ns.id = catalog_item.ns_id AND ns.is_disabled = :is_disabled', { is_disabled: false })
            .where('catalog_item.is_disabled = :is_disabled', { is_disabled: false })
            .andWhere('catalog_item.version = ' +
                connection.createQueryBuilder()
                    .subQuery()
                    .select('MAX(temp_catalog_item.version)')
                    .from(CatalogItemEntity, 'temp_catalog_item')
                    .where('temp_catalog_item.is_disabled = :is_disabled', { is_disabled: false })
                    .andWhere('temp_catalog_item.code = catalog_item.code')
                    .getQuery()
            );
        if (domain.codeBySearch && domain.codeBySearch.length > 0) {
            sql = sql.andWhere('catalog_item.code IN (:...code)', { code: domain.codeBySearch });
        }
        if (domain.nsBySearch && domain.nsBySearch.length > 0) {
            sql = sql.andWhere('ns.name IN (:...name)', { name: domain.nsBySearch });
        }
        sql = sql.orderBy('catalog_item.code', 'ASC')
            .addOrderBy('catalog_item.version', 'ASC');

        // SQLを実行
        const list: CatalogItemEntity[] = [];
        let slaveQueryRunner = null;
        if (!em) {
            slaveQueryRunner = this.connection.createQueryRunner('slave');
            sql.setQueryRunner(slaveQueryRunner);
        }
        try {
            const ret = await sql.getRawMany();
            for (const info of ret) {
                list.push(new CatalogItemEntity(info));
            }
            return list;
        } finally {
            if (slaveQueryRunner) {
                await slaveQueryRunner.release();
            }
        }
    }

    /**
     * カタログコード取得
     * @param em
     * @param domain
     */
    @Log()
    public async getCodesByNsIds (em: EntityManager, domain: CatalogItemDomain): Promise<number[]> {
        // SQLを生成
        const connection = em || this.connection;
        const res: number[] = [];
        const ret = await connection
            .createQueryBuilder()
            .select('catalog_item.*')
            .from(CatalogItemEntity, 'catalog_item')
            .where('catalog_item.is_disabled = :is_disabled', { is_disabled: false })
            .andWhere('catalog_item.ns_id IN (:...ns_ids)', { ns_ids: domain.nsIds })
            .andWhere('catalog_item.version = ' +
                connection.createQueryBuilder()
                    .subQuery()
                    .select('MAX(temp_catalog_item.version)')
                    .from(CatalogItemEntity, 'temp_catalog_item')
                    .where('temp_catalog_item.is_disabled = :is_disabled', { is_disabled: false })
                    .andWhere('temp_catalog_item.code = catalog_item.code')
                    .getQuery()
            )
            .orderBy('catalog_item.code', 'ASC')
            .addOrderBy('catalog_item.version', 'ASC')
            .getRawMany();
        ret.forEach(catalogItem => res.push(Number(catalogItem['code'])));
        return res;
    }

    /**
     * レスポンスが空のカタログコード取得
     * @param em
     * @param domain
     */
    @Log()
    public async getResponseEmptyCodes (em: EntityManager, domain: CatalogItemDomain): Promise<number[]> {
        // SQLを生成
        const connection = em || this.connection;
        const res: number[] = [];
        const ret = await connection
            .createQueryBuilder()
            .select('catalog_item.*')
            .from(CatalogItemEntity, 'catalog_item')
            .where('catalog_item.is_disabled = :is_disabled', { is_disabled: false })
            .andWhere('catalog_item.code IN (:...codes)', { codes: domain.codes })
            .andWhere('catalog_item.version = ' +
                connection.createQueryBuilder()
                    .subQuery()
                    .select('MAX(temp_catalog_item.version)')
                    .from(CatalogItemEntity, 'temp_catalog_item')
                    .where('temp_catalog_item.is_disabled = :is_disabled', { is_disabled: false })
                    .andWhere('temp_catalog_item.code = catalog_item.code')
                    .getQuery()
            )
            .andWhere('catalog_item.response IS NULL')
            .orderBy('catalog_item.code', 'ASC')
            .addOrderBy('catalog_item.version', 'ASC')
            .getRawMany();
        ret.forEach(catalogItem => res.push(Number(catalogItem['code'])));
        return res;
    }

    /**
     * コードによるレスポンス取得
     * @param em
     * @param domain
     */
    @Log()
    public async getResponseByCodes (em: EntityManager, domain: CatalogItemDomain): Promise<any[]> {
        // SQLを生成
        const connection = em || this.connection;
        const res: any[] = [];
        const ret = await connection
            .createQueryBuilder()
            .select('catalog_item.*')
            .from(CatalogItemEntity, 'catalog_item')
            .where('catalog_item.is_disabled = :is_disabled', { is_disabled: false })
            .andWhere('catalog_item.code IN (:...codes)', { codes: domain.codes })
            .andWhere('catalog_item.version = ' +
                connection.createQueryBuilder()
                    .subQuery()
                    .select('MAX(temp_catalog_item.version)')
                    .from(CatalogItemEntity, 'temp_catalog_item')
                    .where('temp_catalog_item.is_disabled = :is_disabled', { is_disabled: false })
                    .andWhere('temp_catalog_item.code = catalog_item.code')
                    .getQuery()
            )
            .orderBy('catalog_item.code', 'ASC')
            .addOrderBy('catalog_item.version', 'ASC')
            .getRawMany();
        ret.forEach(catalogItem => res.push(JSON.parse(catalogItem['response'])));
        return res;
    }

    /**
     * カタログ取得
     * @param em
     * @param domain
     */
    @Log()
    public async getRecordByAttribute (em: EntityManager, domain: CatalogItemDomain): Promise<CatalogItemEntity[]> {
        // SQLを生成
        const connection = em || this.connection;
        let sql = connection
            .createQueryBuilder()
            .select('catalog_item.*')
            .from(CatalogItemEntity, 'catalog_item')
            // .leftJoin(CatalogItemAttributeEntity, 'catalog_item_attribute', 'catalog_item_attribute.catalog_code = catalog_code AND catalog_item_attribute.is_disabled = :is_disabled', { is_disabled: false })
            .where('catalog_item.is_disabled = :is_disabled', { is_disabled: false })
            .andWhere('catalog_item.version = ' +
                connection.createQueryBuilder()
                    .subQuery()
                    .select('MAX(temp_catalog_item.version)')
                    .from(CatalogItemEntity, 'temp_catalog_item')
                    .where('temp_catalog_item.is_disabled = :is_disabled', { is_disabled: false })
                    .andWhere('temp_catalog_item.code = catalog_item.code')
                    .getQuery()
            );
        if (domain.codeBySearch && domain.codeBySearch.length > 0) {
            sql = sql.andWhere('catalog_item.code IN (:...code)', { code: domain.codeBySearch });
        }
        if (domain.attributeBySearch) {
            let searchSql = '(';
            if (domain.attributeBySearch['objects'] && domain.attributeBySearch['objects'].length > 0) {
                for (let index = 0; index < domain.attributeBySearch['objects'].length; index++) {
                    if (index > 0) {
                        searchSql += ' OR ';
                    }
                    searchSql += '(';
                    searchSql += `
                            catalog_item_attribute.key_code = ${Number(domain.attributeBySearch['objects'][index]['key']['_value'])}
                    `;
                    searchSql += `
                            AND catalog_item_attribute.key_version = ${Number(domain.attributeBySearch['objects'][index]['key']['_ver'])}
                    `;
                    searchSql += ')';
                }
            } else if (domain.attributeBySearch['tags'] && domain.attributeBySearch['tags'].length > 0) {
                // catalogitemの検索に用いるので、objectsとtagsどちらかで取得できればよい
                for (let index = 0; index < domain.attributeBySearch['tags'].length; index++) {
                    if (index > 0) {
                        searchSql += ' OR ';
                    }
                    searchSql += '(';
                    searchSql += `
                            catalog_item_attribute.ns_id = ${Number(domain.attributeBySearch['tags'][index]['nsId'])}
                    `;
                    searchSql += ')';
                }
            } else if (domain.attributeBySearch['_value']) {
                searchSql += '(';
                searchSql += `
                    catalog_item_attribute.key_code = ${Number(domain.attributeBySearch['_value'])}
                `;
                searchSql += ')';
                searchSql += ' OR ';
                searchSql += '(';
                searchSql += `
                    catalog_item_attribute.type = 2
                `;
                searchSql += `
                    AND catalog_item_attribute.value like '%${Number(domain.attributeBySearch['_value'])}%'
                `;
                searchSql += ')';
            }
            searchSql += ')';
            // sql = sql.andWhere(searchSql);
            sql = sql.andWhere('EXISTS ' +
            connection.createQueryBuilder()
                .subQuery()
                .select('1')
                .from(CatalogItemAttributeEntity, 'catalog_item_attribute')
                .where('catalog_item_attribute.is_disabled = :is_disabled', { is_disabled: false })
                .andWhere('catalog_item_attribute.catalog_item_id = catalog_item.id')
                .andWhere(searchSql)
                .getQuery()
            );
        }
        sql = sql.orderBy('catalog_item.code', 'ASC')
            .addOrderBy('catalog_item.version', 'ASC');

        // SQLを実行
        const list: CatalogItemEntity[] = [];
        let slaveQueryRunner = null;
        if (!em) {
            slaveQueryRunner = this.connection.createQueryRunner('slave');
            sql.setQueryRunner(slaveQueryRunner);
        }
        try {
            const ret = await sql.getRawMany();
            for (const info of ret) {
                list.push(new CatalogItemEntity(info));
            }
            return list;
        } finally {
            if (slaveQueryRunner) {
                await slaveQueryRunner.release();
            }
        }
    }

    /**
     * カタログID取得
     * @param em
     * @param domain
     * @param isReservedCheck
     */
    @Log()
    public async getCatalogId (em: EntityManager, domain: CatalogItemDomain, isReservedCheck: boolean): Promise<number> {
        // SQLを生成
        const connection = em || this.connection;
        let sql = connection
            .createQueryBuilder()
            .from(CatalogItemEntity, 'catalog_item')
            .where('is_disabled = :is_disabled', { is_disabled: false });

        if (isReservedCheck) {
            sql = sql.andWhere('is_reserved = :is_reserved', { is_reserved: domain.isReserved });
        }
        if (domain.code) {
            sql = sql.andWhere('code = :code', { code: domain.code });
        }
        if (domain.version) {
            sql = sql.andWhere('version = :version', { version: domain.version });
        }
        sql = sql.orderBy('id', 'DESC');

        // SQLを実行
        const ret = await sql.getRawOne();
        return ret ? Number(ret['id']) : null;
    }

    /**
     * カタログID取得
     * @param em
     * @param domain
     * @param isReservedCheck
     */
    @Log()
    public async getCatalogIdIncludeDisable (em: EntityManager, domain: CatalogItemDomain, isReservedCheck: boolean): Promise<number> {
        // SQLを生成
        const connection = em || this.connection;
        let sql = connection
            .createQueryBuilder()
            .from(CatalogItemEntity, 'catalog_item');

        if (isReservedCheck) {
            sql = sql.andWhere('is_reserved = :is_reserved', { is_reserved: domain.isReserved });
        }
        if (domain.code) {
            sql = sql.andWhere('code = :code', { code: domain.code });
        }
        if (domain.version) {
            sql = sql.andWhere('version = :version', { version: domain.version });
        }
        sql = sql.orderBy('id', 'DESC');

        // SQLを実行
        const ret = await sql.getRawOne();
        return ret ? Number(ret['id']) : null;
    }

    /**
     * 最大コード取得
     * @param em
     * @param domain
     */
    @Log()
    public async getMaxCode (em: EntityManager, domain: CatalogItemDomain): Promise<number> {
        // SQLを生成
        const connection = em || this.connection;
        let sql = connection
            .createQueryBuilder()
            .select('MAX(catalog_item.code)', 'code')
            .from(CatalogItemEntity, 'catalog_item')
            .innerJoin(NameSpaceEntity, 'ns', 'ns.id = catalog_item.ns_id');
        if (domain.type) {
            sql = sql.andWhere('ns.type = :type', { type: domain.type });
        }
        // SQLを実行
        let slaveQueryRunner = null;
        if (!em) {
            slaveQueryRunner = this.connection.createQueryRunner('slave');
            sql.setQueryRunner(slaveQueryRunner);
        }
        try {
            const ret = await sql.getRawOne();
            return Number(ret['code']);
        } finally {
            if (slaveQueryRunner) {
                await slaveQueryRunner.release();
            }
        }
    }

    /**
     * 最大バージョン取得
     * @param em
     * @param domain
     */
    @Log()
    public async getMaxVersion (em: EntityManager, domain: CatalogItemDomain): Promise<number> {
        // SQLを生成
        const connection = em || this.connection;
        let sql = connection
            .createQueryBuilder()
            .select('MAX(version)', 'version')
            .from(CatalogItemEntity, 'catalog_item')
            .where('is_disabled = :is_disabled', { is_disabled: false })
            .andWhere('is_reserved = :is_reserved', { is_reserved: false });
        if (domain.code) {
            sql = sql.andWhere('code = :code', { code: domain.code });
        }
        // SQLを実行
        const ret = await sql.getRawOne();
        return Number(ret['version']);
    }

    /**
     * カタログ追加
     * @param em
     * @param domain
     */
    @Log()
    public async insertRecord (em: EntityManager, domain: CatalogItemDomain): Promise<InsertResult> {
        const ret = await em
            .createQueryBuilder()
            .insert()
            .into(CatalogItemEntity)
            .values({
                code: domain.code,
                version: domain.version,
                nsId: domain.nsId,
                name: domain.name,
                description: domain.description,
                inheritCode: domain.inheritCode,
                inheritVersion: domain.inheritVersion,
                isReserved: domain.isReserved,
                isDisabled: false,
                response: domain.response,
                attributes: null,
                createdBy: domain.updatedBy,
                updatedBy: domain.updatedBy
            })
            .execute();
        return ret;
    }

    /**
     * カタログ更新
     * @param em
     * @param domain
     */
    @Log()
    public async updateRecord (em: EntityManager, domain: CatalogItemDomain): Promise<UpdateResult> {
        const ret = await em
            .createQueryBuilder()
            .update(CatalogItemEntity)
            .set({
                nsId: domain.nsId,
                name: domain.name,
                description: domain.description,
                inheritCode: domain.inheritCode,
                inheritVersion: domain.inheritVersion,
                isReserved: domain.isReserved,
                response: domain.response,
                updatedBy: domain.updatedBy
            })
            .where('is_disabled = :is_disabled', { is_disabled: false })
            .andWhere('code = :code', { code: domain.code })
            .andWhere('version = :version', { version: domain.version })
            .execute();
        return ret;
    }

    /**
     * カタログ更新(レスポンスのみ)
     * @param em
     * @param domain
     */
    @Log()
    public async updateResponseRecord (em: EntityManager, domain: CatalogItemDomain): Promise<UpdateResult> {
        const ret = await em
            .createQueryBuilder()
            .update(CatalogItemEntity)
            .set({
                response: domain.response,
                updatedBy: domain.updatedBy
            })
            .where('is_disabled = :is_disabled', { is_disabled: false })
            .andWhere('code = :code', { code: domain.code })
            .andWhere('version = :version', { version: domain.version })
            .execute();
        return ret;
    }

    /**
     * カタログ削除
     * @param em
     * @param domain
     */
    @Log()
    public async deleteRecord (em: EntityManager, domain: CatalogItemDomain): Promise<UpdateResult> {
        const ret = await em
            .createQueryBuilder()
            .update(CatalogItemEntity)
            .set({
                isDisabled: true,
                updatedBy: domain.updatedBy
            })
            .where('code = :code', { code: domain.code })
            .execute();
        return ret;
    }

    /**
     * カタログ削除
     * @param em
     * @param domain
     */
    @Log()
    public async deleteRecordById (em: EntityManager, domain: CatalogItemDomain): Promise<UpdateResult> {
        const ret = await em
            .createQueryBuilder()
            .update(CatalogItemEntity)
            .set({
                isDisabled: true,
                updatedBy: domain.updatedBy
            })
            .where('id = :id', { id: domain.id })
            .execute();
        return ret;
    }
}
