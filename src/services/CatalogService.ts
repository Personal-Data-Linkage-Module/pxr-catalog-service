/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/**
 *
 *
 *
 * $Date$
 * $Revision$
 * $Author$
 *
 * TEMPLATE VERSION :  76463
 */

/* eslint-disable */
import { Connection, InsertResult, UpdateResult, EntityManager, getConnection } from 'typeorm';
import AppError from '../common/AppError';
import { ResponseCode } from '../common/ResponseCode';
import OperatorDomain from '../domains/OperatorDomain';
import CatalogServiceDto from './dto/CatalogServiceDto';
import CatalogItemEntity from '../repositories/postgres/CatalogItemEntity';
import ItemTemplateEntity from '../repositories/postgres/ItemTemplateEntity';
import TemplatePropertyEntity from '../repositories/postgres/TemplatePropertyEntity';
import PropertyCandidateEntity from '../repositories/postgres/PropertyCandidateEntity';
import TemplateCodeEntity from '../repositories/postgres/TemplateCodeEntity';
import CmatrixIndexEntity from '../repositories/postgres/CmatrixIndexEntity';
import CatalogRepository from '../repositories/postgres/CatalogRepository';
import CatalogDomain from '../domains/CatalogDomain';
import CatalogCodeScopeRepository from '../repositories/postgres/CatalogCodeScopeRepository';
import CatalogGetResDto, { CatalogDto } from '../resources/dto/CatalogGetResDto';
import CatalogPostResDto from '../resources/dto/CatalogPostResDto';
import CatalogPutResDto from '../resources/dto/CatalogPutResDto';
import CatalogDeleteResDto from '../resources/dto/CatalogDeleteResDto';
import CatalogItemDomain from '../domains/CatalogItemDomain';
import CatalogItemRepository from '../repositories/postgres/CatalogItemRepository';
import NameSpaceDomain from '../domains/NameSpaceDomain';
import NameSpaceRepository from '../repositories/postgres/NameSpaceRepository';
import ItemTemplateDomain from '../domains/ItemTemplateDomain';
import ItemTemplateRepository from '../repositories/postgres/ItemTemplateRepository';
import TemplatePropertyDomain from '../domains/TemplatePropertyDomain';
import TemplatePropertyRepository from '../repositories/postgres/TemplatePropertyRepository';
import TemplateCodeDomain from '../domains/TemplateCodeDomain';
import TemplateCodeRepository from '../repositories/postgres/TemplateCodeRepository';
import CatalogRelationshipDomain from '../domains/CatalogRelationshipDomain';
import CatalogRelationshipRepository from '../repositories/postgres/CatalogRelationshipRepository';
import CmatrixIndexDomain from '../domains/CmatrixIndexDomain';
import CmatrixIndexRepository from '../repositories/postgres/CmatrixIndexRepository';
import PropertyCandidateDomain from '../domains/PropertyCandidateDomain';
import PropertyCandidateRepository from '../repositories/postgres/PropertyCandidateRepository';
import CatalogItemAttributeDomain from '../domains/CatalogItemAttributeDomain';
import CatalogItemAttributeRepository from '../repositories/postgres/CatalogItemAttributeRepository';
import CatalogGetInnerResDto from '../resources/dto/CatalogGetInnerResDto';
import Config from '../common/Config';
import SearchService from '../common/SearchService_Stub';
import CatalogPostByCodesReqDto, { CodeObject } from '../resources/dto/CatalogPostByCodesReqDto';
import NameSpaceEntity from 'repositories/postgres/NameSpaceEntity';
import { applicationLogger } from '../common/logging';
/* eslint-enable */
const message = Config.ReadConfig('./config/message.json');
const config = Config.ReadConfig('./config/config.json');

/**
 * カタログ操作サービス
 */
export default class CatalogService {
    /**
     * 対象タイプ
     */
    private readonly targetType = [
        'number', 'number[]',
        'string', 'string[]',
        'boolean', 'boolean[]',
        'code', 'code[]',
        'item', 'item[]',
        'inner', 'inner[]'
    ];

    /**
     * カタログ取得
     * @param connection
     * @param dto
     */
    public async getCatalog (connection: Connection, dto: CatalogServiceDto): Promise<{}> {
        // カタログ名の存在確認
        const catalogDomain = new CatalogDomain();
        const catalogRepository = new CatalogRepository(connection);
        const catalogInfoCount = await catalogRepository.getRecordCount(null, catalogDomain);
        if (catalogInfoCount <= 0) {
            // カタログ名が存在しない場合、エラーをthrow
            throw new AppError(message.NOT_ACTIVATE, ResponseCode.UNAUTHORIZED);
        }

        // オペレータ情報を取得
        const operator: OperatorDomain = dto.getOperator();

        const res: CatalogGetResDto = new CatalogGetResDto();
        await connection.transaction(async em => {
            // 各種カタログ情報から応答JSONを生成
            const catalogList: {}[] = await this.getCatalogInfo(connection, em, dto.getNs(), null, null, null, operator);
            for (const info of catalogList) {
                const catalog: CatalogDto = new CatalogDto();
                catalog.catalog = info;
                res.list.push(catalog);
            }
        });
        // カタログ情報をキー名でソートして返す
        const ret = this.responseListSort(res.getAsJson());
        return ret;
    }

    /**
     * カタログ取得
     * @param connection
     * @param dto
     */
    public async getCatalogByCodeVersion (connection: Connection, entityManager: EntityManager, dto: CatalogServiceDto): Promise<{}> {
        // カタログ名の存在確認
        const catalogDomain = new CatalogDomain();
        const catalogRepository = new CatalogRepository(connection);
        const catalogInfoCount = await catalogRepository.getRecordCount(entityManager, catalogDomain);
        if (catalogInfoCount <= 0) {
            // カタログ名が存在しない場合、エラーをthrow
            throw new AppError(message.NOT_ACTIVATE, ResponseCode.UNAUTHORIZED);
        }

        // バージョン指定がない場合
        const code = dto.getCode();
        let version = dto.getVersion();
        if (!version) {
            // 最大バージョンを取得
            const catalogItemDomain = new CatalogItemDomain();
            catalogItemDomain.code = code;
            const catalogItemRepository = new CatalogItemRepository(connection);
            version = await catalogItemRepository.getMaxVersion(entityManager, catalogItemDomain);
        }

        // オペレータ情報を取得
        const operator: OperatorDomain = dto.getOperator();

        // 論理削除済データ取得フラグを設定
        const includeDeleted = dto.getIncludeDeleted();

        const res: CatalogGetResDto = new CatalogGetResDto();
        const setCatalogList = async (em: EntityManager) => {
            // 各種カタログ情報から応答JSONを生成
            const catalogList: {}[] = await this.getCatalogInfo(connection, em, null, code, version, null, operator, includeDeleted);
            for (const info of catalogList) {
                const catalog: CatalogDto = new CatalogDto();
                catalog.catalog = info;
                res.list.push(catalog);
            }
        };
        if (entityManager) {
            // トランザクションが開始されている場合
            await setCatalogList(entityManager);
        } else {
            await connection.transaction(setCatalogList);
        }
        // カタログ情報をキー名でソートして返す
        const ret = this.responseSort(res.getAsJson()[0]);
        return ret;
    }

    /**
     * カタログ取得
     * @param connection
     * @param dto
     */
    public async getCatalogByCodes (connection: Connection, dto: CatalogServiceDto): Promise<{}> {
        // カタログ名の存在確認
        const catalogDomain = new CatalogDomain();
        const catalogRepository = new CatalogRepository(connection);
        const catalogInfoCount = await catalogRepository.getRecordCount(null, catalogDomain);
        if (catalogInfoCount <= 0) {
            // カタログ名が存在しない場合、エラーをthrow
            throw new AppError(message.NOT_ACTIVATE, ResponseCode.UNAUTHORIZED);
        }

        // オペレータ情報を取得
        const operator: OperatorDomain = dto.getOperator();

        const codes = dto.getCodes();
        const _codes: CodeObject[] = [];
        const res: CatalogGetResDto = new CatalogGetResDto();
        for (const code of codes) {
            // バージョン指定がない場合
            const codeValue = code._code._value;
            let version = code._code._ver;
            if (!version) {
                // 最大バージョンを取得
                const catalogItemDomain = new CatalogItemDomain();
                catalogItemDomain.code = codeValue;
                const catalogItemRepository = new CatalogItemRepository(connection);
                version = await catalogItemRepository.getMaxVersion(null, catalogItemDomain);
            }
            _codes.push({
                _value: codeValue,
                _ver: version
            });
        }

        // カタログ情報を取得
        await connection.transaction(async em => {
            try {
                // 各種カタログ情報から応答JSONを生成
                const catalogList: {}[] = await this.getCatalogInfo(connection, em, null, null, null, _codes, operator);
                for (const info of catalogList) {
                    const catalog: CatalogDto = new CatalogDto();
                    catalog.catalog = info;
                    res.list.push(catalog);
                }
            } catch {
                // 対象データがない場合は処理なし
            }
        });

        // 対象データが1件も存在しない場合
        if (!res.list || res.list.length <= 0) {
            // 対象カタログが存在しない場合、エラーをthrow
            throw new AppError(message.CATALOG_NOT_FOUND, ResponseCode.NOT_FOUND);
        }

        // カタログ情報をキー名でソートして返す
        const ret = this.responseListSort(res.getAsJson());
        return ret;
    }

    /**
     * 内部クラス取得
     * @param connection
     * @param dto
     */
    public async getInnerCatalog (connection: Connection, dto: CatalogServiceDto): Promise<{}> {
        // カタログ名の存在確認
        const catalogDomain = new CatalogDomain();
        const catalogRepository = new CatalogRepository(connection);
        const catalogInfoCount = await catalogRepository.getRecordCount(null, catalogDomain);
        if (catalogInfoCount <= 0) {
            // カタログ名が存在しない場合、エラーをthrow
            throw new AppError(message.NOT_ACTIVATE, ResponseCode.UNAUTHORIZED);
        }

        // バージョン指定がない場合
        const name = dto.getName();
        const code = dto.getCode();
        let version = dto.getVersion();
        if (!version) {
            // 最大バージョンを取得
            const catalogItemDomain = new CatalogItemDomain();
            catalogItemDomain.code = code;
            const catalogItemRepository = new CatalogItemRepository(connection);
            version = await catalogItemRepository.getMaxVersion(null, catalogItemDomain);
        }

        // オペレータ情報を取得
        const operator: OperatorDomain = dto.getOperator();

        const res: CatalogGetInnerResDto = new CatalogGetInnerResDto();
        await connection.transaction(async em => {
            // 各種カタログ情報から応答JSONを生成
            const innerInfo: {} = await this.getInnerCatalogInfo(connection, em, code, version, name, operator);
            res.catalog = innerInfo;
        });
        // カタログ情報をキー名でソートして返す
        return this.responseSort(res.getAsJson());
    }

    /**
     * カタログ追加
     * @param connection
     * @param dto
     */
    public async insertCatalog (connection: Connection, dto: CatalogServiceDto): Promise<{}> {
        // カタログ名の存在確認
        const catalogDomain = new CatalogDomain();
        const catalogRepository = new CatalogRepository(connection);
        const catalogInfoCount = await catalogRepository.getRecordCount(null, catalogDomain);
        if (catalogInfoCount <= 0) {
            // カタログ名が存在しない場合、エラーをthrow
            throw new AppError(message.NOT_ACTIVATE, ResponseCode.UNAUTHORIZED);
        }

        // 対象ネームスペースの存在確認
        const nsDomain = new NameSpaceDomain();
        nsDomain.name = dto.getCatalog()['catalogItem']['ns'];
        nsDomain.type = dto.getType();
        const nsRepository = new NameSpaceRepository(connection);
        const nsId: number = await nsRepository.getNamespaceId(null, nsDomain);
        if (!nsId) {
            // 対象ネームスペースが存在しない場合
            throw new AppError(message.NAMESPACE_NOT_FOUND, ResponseCode.BAD_REQUEST);
        }

        let code = dto.getCode();
        const scopeRepository = new CatalogCodeScopeRepository(connection);
        let catalogItemDomain;
        const catalogItemRepository = new CatalogItemRepository(connection);
        if (!code) {
            // コード指定がない場合、有効なコードを取得する
            await getAvailableCode();
        } else {
            // 指定されたコードが有効でない場合
            if (!await scopeRepository.isCatalogCodeValid(null, dto.getType(), code)) {
                throw new AppError(message.CODE_SCOPE_OUT_CODE, ResponseCode.BAD_REQUEST);
            }
        }

        let version = dto.getVersion();
        if (!version) {
            // バージョン指定がない場合、バージョンに1を設定
            version = 1;
        }

        // 対象codeの存在確認
        catalogItemDomain = new CatalogItemDomain();
        catalogItemDomain.code = code;
        catalogItemDomain.version = version;
        catalogItemDomain.isReserved = false;
        const catalogId = await catalogItemRepository.getCatalogId(null, catalogItemDomain, true);
        if (catalogId) {
            // 対象カタログが存在する場合
            throw new AppError(message.CODE_ALREADY, ResponseCode.BAD_REQUEST);
        }

        // オペレータ情報を取得
        const operator: OperatorDomain = dto.getOperator();

        const res: CatalogPostResDto = new CatalogPostResDto();
        await connection.transaction(async em => {
            // カタログを追加
            await this.insertCatalogInfo(connection, em, nsId, code, version, dto.getType(), dto.getCatalog(), operator);

            // 各種カタログ情報から応答JSONを生成
            const catalogList: {}[] = await this.getCatalogInfo(connection, em, null, code, version, null, operator);
            res.catalog = catalogList[0];
        });
        // カタログ情報をキー名でソートして、レスポンスを返す
        return this.responseSort(res.getAsJson());

        /**
         * 有効なカタログコードを取得する
         */
        async function getAvailableCode () {
            // 最大コードを取得
            catalogItemDomain = new CatalogItemDomain();
            catalogItemDomain.type = dto.getType();
            code = await catalogItemRepository.getMaxCode(null, catalogItemDomain);
            // コードを1つアップ
            code++;

            while (true) {
                // コードが有効でない場合
                if (!await scopeRepository.isCatalogCodeValid(null, dto.getType(), code)) {
                    // 次の有効なコードを取得
                    code = await scopeRepository.getNextCatalogCode(null, dto.getType(), code);
                } else {
                    // コードが有効な場合、処理を抜ける
                    break;
                }
            }
        }
    }

    /**
     * カタログ更新
     * @param connection
     * @param dto
     */
    public async updateCatalog (connection: Connection, entityManager: EntityManager, dto: CatalogServiceDto): Promise<{}> {
        // カタログ名の存在確認
        const catalogDomain = new CatalogDomain();
        const catalogRepository = new CatalogRepository(connection);
        const catalogInfoCount = await catalogRepository.getRecordCount(entityManager, catalogDomain);
        if (catalogInfoCount <= 0) {
            // カタログ名が存在しない場合、エラーをthrow
            throw new AppError(message.NOT_ACTIVATE, ResponseCode.UNAUTHORIZED);
        }

        // 対象ネームスペースの存在確認
        const nsDomain = new NameSpaceDomain();
        nsDomain.name = dto.getCatalog()['catalogItem']['ns'];
        nsDomain.type = dto.getType();
        const nsRepository = new NameSpaceRepository(connection);
        const nsId: number = await nsRepository.getNamespaceId(entityManager, nsDomain);
        // 対象ネームスペースが存在しない場合
        if (!nsId) {
            throw new AppError(message.NAMESPACE_NOT_FOUND, ResponseCode.BAD_REQUEST);
        }

        // 対象codeの存在確認
        const catalogItemDomain = new CatalogItemDomain();
        catalogItemDomain.code = dto.getCode();
        const catalogItemRepository = new CatalogItemRepository(connection);
        const catalogId = await catalogItemRepository.getCatalogId(entityManager, catalogItemDomain, false);
        if (!catalogId) {
            // 対象カタログが存在しない場合
            throw new AppError(message.CATALOG_NOT_FOUND, ResponseCode.BAD_REQUEST);
        }

        // 最大バージョンを取得
        let version: number = await catalogItemRepository.getMaxVersion(entityManager, catalogItemDomain);

        // バージョンアップフラグが有効の場合
        const versionUpFlag = dto.getVersionUpFlag();
        if (versionUpFlag) {
            // バージョンを1つアップ
            version++;
        }

        // オペレータ情報を取得
        const operator: OperatorDomain = dto.getOperator();

        const res: CatalogPutResDto = new CatalogPutResDto();
        const updateCatalogInfo = async (em: EntityManager) => {
            // カタログ情報を追加
            await this.insertCatalogInfo(connection, em, nsId, dto.getCode(), version, dto.getType(), dto.getCatalog(), operator, versionUpFlag);

            // 各種カタログ情報から応答JSONを生成
            const catalogList: {}[] = await this.getCatalogInfo(connection, em, null, dto.getCode(), version, null, operator);
            res.catalog = catalogList[0];
        };
        if (entityManager) {
            // トランザクションが開始されている場合
            await updateCatalogInfo(entityManager);
        } else {
            await connection.transaction(updateCatalogInfo);
        }
        // カタログ情報をキー名でソートして返す
        return this.responseSort(res.getAsJson());
    }

    /**
     * カタログ削除
     * @param connection
     * @param dto
     */
    public async deleteCatalog (connection: Connection, dto: CatalogServiceDto): Promise<{}> {
        // カタログ名の存在確認
        const catalogDomain = new CatalogDomain();
        const catalogRepository = new CatalogRepository(connection);
        const catalogInfoCount = await catalogRepository.getRecordCount(null, catalogDomain);
        if (catalogInfoCount <= 0) {
            // カタログ名が存在しない場合、エラーをthrow
            throw new AppError(message.NOT_ACTIVATE, ResponseCode.UNAUTHORIZED);
        }
        // 対象codeの存在確認
        let catalogItemDomain = new CatalogItemDomain();
        catalogItemDomain.code = dto.getCode();
        const catalogItemRepository = new CatalogItemRepository(connection);
        const catalogId = await catalogItemRepository.getCatalogId(null, catalogItemDomain, false);
        if (!catalogId) {
            // 対象カタログが存在しない場合
            throw new AppError(message.CATALOG_NOT_FOUND, ResponseCode.BAD_REQUEST);
        }

        // オペレータ情報を取得
        const operator: OperatorDomain = dto.getOperator();

        // カタログを削除
        await connection.transaction(async em => {
            catalogItemDomain = new CatalogItemDomain();
            catalogItemDomain.code = dto.getCode();
            catalogItemDomain.updatedBy = operator.loginId;
            await catalogItemRepository.deleteRecord(em, catalogItemDomain);

            // 検索サービスのデータ削除
            await this.deleteSearchService(catalogId);
        });

        // レスポンスを返す
        const ret: CatalogDeleteResDto = new CatalogDeleteResDto();
        ret.code = dto.getCode();
        return ret.getAsJson();
    }

    /**
     * 公開カタログ取得
     */
    public async getPublicCatalog (dto: CatalogServiceDto) {
        const connection = getConnection('postgres');
        // ext_nameを取得
        const catalogDomain = new CatalogDomain();
        const catalogRepository = new CatalogRepository(connection);
        const catalogInfo = await catalogRepository.getRecord(null, catalogDomain);
        if (!catalogInfo) {
            // 対象カタログコード範囲が存在しない場合
            throw new AppError(message.NOT_ACTIVATE, ResponseCode.UNAUTHORIZED);
        }
        const extName = catalogInfo.extName;

        // コードとnsを取得
        const publicCodes: number[] = config['publicCodes'].map((code: string) => Number(code));
        const names: string[] = config['publicNss'].map((ns: string) => ns.replace('{ext_name}', extName));
        const nsRepository = new NameSpaceRepository(connection);
        const publicNsIds = await nsRepository.getNsIds(null, names);
        const catalogItemRepository = new CatalogItemRepository(connection);
        const nsIdsCatalogItemDomain = new CatalogItemDomain();
        nsIdsCatalogItemDomain.nsIds = publicNsIds;
        const codesByNs = await catalogItemRepository.getCodesByNsIds(null, nsIdsCatalogItemDomain);
        const codes = publicCodes.concat(codesByNs);

        // CatalogItemにレスポンスがないCodeを取得
        const responseEmptyCatalogItemDomain = new CatalogItemDomain();
        responseEmptyCatalogItemDomain.codes = codes;
        const responseEmptyCodes = await catalogItemRepository.getResponseEmptyCodes(null, responseEmptyCatalogItemDomain);

        let res: {}[] = [];
        // レスポンスが空のコードのカタログを取得
        if (responseEmptyCodes && Array.isArray(responseEmptyCodes) && responseEmptyCodes.length > 0) {
            const publicCodeObjects: CatalogPostByCodesReqDto[] = [];
            responseEmptyCodes.forEach(value => {
                const codeObject: CodeObject = new CodeObject();
                codeObject._value = value;
                const codeDto: CatalogPostByCodesReqDto = new CatalogPostByCodesReqDto();
                codeDto._code = codeObject;
                publicCodeObjects.push(codeDto);
            });
            const serviceDto = new CatalogServiceDto();
            serviceDto.setOperator(dto.getOperator());
            serviceDto.setCodes(publicCodeObjects);
            res = res.concat(await this.getCatalogByCodes(connection, serviceDto));
        }

        // レスポンスがあるコードを抜き出す
        const responseExistCodes = codes.filter(code => !responseEmptyCodes.includes(code));
        const responseExistCatalogItemDomain = new CatalogItemDomain();
        responseExistCatalogItemDomain.codes = responseExistCodes;
        res = res.concat(await catalogItemRepository.getResponseByCodes(null, responseExistCatalogItemDomain));
        return res;
    }

    // 以下private method
    /**
     * レスポンスソート
     * @param response
     */
    private responseListSort (response: {}[]): {}[] {
        // レスポンスをKey名でソート
        response.forEach((row: any) => {
            this.responseSort(row);
        });
        return response;
    }

    /**
     * レスポンスソート
     * @param response
     */
    private responseSort (response: {}): {} {
        // レスポンスをKey名でソート
        const keys = Object.keys(response['template']);
        keys.sort();
        const template = {};
        for (const key of keys) {
            template[key] = response['template'][key];
        }
        response['template'] = template;
        if (response['prop']) {
            response['prop'].sort(function (a: any, b: any) {
                if (a.key > b.key) {
                    return 1;
                } else {
                    return -1;
                }
            });
        }
        return response;
    }

    /**
     * カタログ情報取得
     * @param connection
     * @param em
     * @param namespace
     * @param code
     * @param version
     * @param operator
     * @param includeDeleted
     */
    private async getCatalogInfo (connection: Connection, em: EntityManager, namespace: string, code: number, version: number, codes: CodeObject[], operator: OperatorDomain, includeDeleted = false): Promise<{}[]> {
        // カタログ取得開始ログ出力

        // 各domain, repository変数の宣言
        let catalogItemDomain;
        let itemTemplateDomain;
        const catalogItemRepository = new CatalogItemRepository(connection);
        const itemTemplateRepository = new ItemTemplateRepository(connection);

        // カタログ情報を取得
        catalogItemDomain = new CatalogItemDomain();
        catalogItemDomain.ns = namespace;
        catalogItemDomain.code = code;
        catalogItemDomain.version = version;
        catalogItemDomain.codeVersions = codes;
        catalogItemDomain.includeDeleted = includeDeleted;
        const catalogItemList = await catalogItemRepository.getRecord(em, catalogItemDomain);
        if (!catalogItemList || catalogItemList.length <= 0) {
            // 対象カタログが存在しない場合、エラーをthrow
            throw new AppError(message.CATALOG_NOT_FOUND, ResponseCode.NOT_FOUND);
        }

        // 対象カタログが存在する場合
        const catalogList: {}[] = [];
        for (const catalogItem of catalogItemList) {
            // レスポンスが生成済みの場合
            if (catalogItem.response) {
                catalogList.push(JSON.parse(catalogItem.response));
                continue;
            }
            // 対象ネームスペースを取得
            const nsDomain = new NameSpaceDomain();
            nsDomain.id = catalogItem.nsId;
            const nsRepository = new NameSpaceRepository(connection);
            const nsInfo = await nsRepository.getRecordById(em, nsDomain);

            // 継承カタログ情報を全て取得
            const inheritCatalogList = await this.getInheritCodeVersion(connection, em, catalogItem);

            // descriptionを生成
            let description = null;
            try {
                description = JSON.parse(catalogItem.description);
            } catch (ex) {
                description = catalogItem.description;
            }

            // カタログ情報を生成
            const catalogInfo: {} = {
                ns: nsInfo.name,
                name: catalogItem.name,
                _code: {
                    _value: Number(catalogItem.code),
                    _ver: Number(catalogItem.version)
                },
                inherit: catalogItem.inheritCode && catalogItem.inheritVersion ? {
                    _value: Number(catalogItem.inheritCode),
                    _ver: Number(catalogItem.inheritVersion)
                } : null,
                description: description
            };
            // テンプレート情報を生成
            let template: {} = {
                _code: {
                    _value: Number(catalogItem.code),
                    _ver: Number(catalogItem.version)
                }
            };
            // プロパティ情報を生成
            let prop: {}[] = null;

            // 属性情報を生成
            let catalogAttribute: {} = null;

            // value情報を生成
            let value: {}[] = [];
            let inheritValue: {}[] = [];

            // 全プロパティを格納するリストを生成
            let allTemplatePropertyList: TemplatePropertyEntity[] = [];

            // 継承カタログ情報を設定
            for (const inheritCatalog of inheritCatalogList) {
                if (!inheritCatalog) {
                    continue;
                }
                // 継承カタログ情報を設定
                const inheritCataloginfo = await this.createCatalogInfo(inheritCatalog, em, connection, template, prop, allTemplatePropertyList, inheritValue, nsInfo, true, catalogItem);
                prop = inheritCataloginfo.prop;
                allTemplatePropertyList = inheritCataloginfo.allTemplatePropertyList;
                inheritValue = inheritCataloginfo.value;
                template = inheritCataloginfo.template;
            }

            // カタログ情報を設定
            const catalogItemInfo = await this.createCatalogInfo(catalogItem, em, connection, template, prop, allTemplatePropertyList, value, nsInfo, false);
            prop = catalogItemInfo.prop;
            allTemplatePropertyList = catalogItemInfo.allTemplatePropertyList;
            value = catalogItemInfo.value;
            template = catalogItemInfo.template;

            if (template) {
                for (const key in template) {
                    if (Array.isArray(template[key])) {
                        template[key] = template[key].filter((info: any) => info !== null && info !== undefined);
                        if (template[key].length === 0) {
                            template[key] = null;
                        }
                    }
                }
            }

            // ドキュメント・イベント・モノのカタログコード追加
            template = await this.addCatalogCode(template, nsInfo.name, Number(catalogItem.code), Number(catalogItem.version));

            // カタログ属性情報を取得
            const attributeDomain = new CatalogItemAttributeDomain();
            attributeDomain.catalogItemId = catalogItem.id;
            const attributeRepository = new CatalogItemAttributeRepository(connection);
            const attributeList = await attributeRepository.getRecord(em, attributeDomain);

            // カタログ属性が存在する場合
            if (attributeList.length > 0) {
                const attributeObjects: {}[] = [];
                const attributeTags: {}[] = [];
                for (const attribute of attributeList) {
                    if (attribute.type === 1) {
                        attributeObjects.push(
                            {
                                key: {
                                    _value: attribute.keyCode,
                                    _ver: attribute.keyVersion
                                },
                                value: attribute.value ? JSON.parse(attribute.value) : null,
                                description: attribute.description
                            }
                        );
                    } else if (attribute.type === 2) {
                        // nsIdからネームスペース取得
                        const nameSpaceDomain = new NameSpaceDomain();
                        nameSpaceDomain.id = attribute.nsId;
                        const nameSpaceRepository = new NameSpaceRepository(connection);
                        const ns = await nameSpaceRepository.getRecordById(em, nameSpaceDomain);

                        attributeTags.push(
                            {
                                ns: ns.name,
                                values: attribute.value ? JSON.parse(attribute.value) : null
                            }
                        );
                    }
                }
                catalogAttribute = {
                    objects: attributeObjects,
                    tags: attributeTags
                };
            }

            // カタログ情報を生成
            if (inheritValue && inheritValue.length > 0) {
                if (value && value.length > 0) {
                    const valueKeys: string[] = value.map(val => val['key']);
                    value.push(...inheritValue.filter(val => valueKeys.indexOf(val['key']) < 0));
                } else {
                    value = inheritValue;
                }
            }
            const catalog: {} = {
                catalogItem: catalogInfo,
                template: template,
                prop: prop && prop.length > 0 ? prop : null,
                value: value && value.length > 0 ? value : null,
                attribute: catalogAttribute
            };
            catalogList.push(catalog);

            // 対象カタログIDを取得
            catalogItemDomain = new CatalogItemDomain();
            catalogItemDomain.code = catalog['catalogItem']['_code']['_value'];
            catalogItemDomain.version = catalog['catalogItem']['_code']['_ver'];
            catalogItemDomain.isReserved = false;
            const catalogId = await catalogItemRepository.getCatalogId(em, catalogItemDomain, true);

            // レスポンスをDBに格納
            catalogItemDomain = new CatalogItemDomain();
            catalogItemDomain.code = catalog['catalogItem']['_code']['_value'];
            catalogItemDomain.version = catalog['catalogItem']['_code']['_ver'];
            catalogItemDomain.response = JSON.stringify(catalog);
            catalogItemDomain.updatedBy = operator.loginId;
            await catalogItemRepository.updateResponseRecord(em, catalogItemDomain);

            // アイテムテンプレート情報を取得
            itemTemplateDomain = new ItemTemplateDomain();
            itemTemplateDomain.catalogItemId = catalogId;
            const innerItemTemplateList = await itemTemplateRepository.getInnerRecord(em, itemTemplateDomain);

            for (const innerItemTemplate of innerItemTemplateList) {
                // 対象カタログの内部クラスを取得
                await this.getInnerCatalogInfo(connection, em, catalog['catalogItem']['_code']['_value'], catalog['catalogItem']['_code']['_ver'], innerItemTemplate.innerName, operator);
            }
        }

        // 各種カタログ情報から応答JSONを生成
        return catalogList;
    }

    /**
     * 内部クラス情報取得
     * @param connection
     * @param em
     * @param code
     * @param version
     * @param name
     * @param operator
     */
    private async getInnerCatalogInfo (connection: Connection, em: EntityManager, code: number, version: number, name: string, operator: OperatorDomain): Promise<{}> {
        // 各domain, repository変数の宣言
        let cmatrixIndexDomain;
        let itemTemplateDomain;
        const cmatrixIndexRepository = new CmatrixIndexRepository(connection);
        const itemTemplateRepository = new ItemTemplateRepository(connection);

        // カタログ情報を取得
        const catalogItemDomain = new CatalogItemDomain();
        catalogItemDomain.code = code;
        catalogItemDomain.version = version;
        const catalogItemRepository = new CatalogItemRepository(connection);
        const catalogItemList = await catalogItemRepository.getRecord(em, catalogItemDomain);
        if (!catalogItemList || catalogItemList.length <= 0) {
            // 対象カタログが存在しない場合、エラーをthrow
            throw new AppError(message.CATALOG_NOT_FOUND, ResponseCode.NOT_FOUND);
        }

        // カタログ情報を取得
        const catalogItemInfo = catalogItemList[0];

        let innerInfo: {} = {};

        // 対象ネームスペースを取得
        const nsDomain = new NameSpaceDomain();
        nsDomain.id = catalogItemInfo.nsId;
        const nsRepository = new NameSpaceRepository(connection);
        const nsInfo = await nsRepository.getRecordById(em, nsDomain);

        // 継承カタログ情報を全て取得
        const inheritCatalogList = await this.getInheritCodeVersion(connection, em, catalogItemInfo);

        // descriptionを生成
        let description = null;
        try {
            description = JSON.parse(catalogItemInfo.description);
        } catch (ex) {
            description = catalogItemInfo.description;
        }

        // カタログ情報を生成
        const catalogInfo: {} = {
            ns: nsInfo.name,
            name: catalogItemInfo.name,
            _code: {
                _value: Number(catalogItemInfo.code),
                _ver: Number(catalogItemInfo.version)
            },
            inherit: catalogItemInfo.inheritCode && catalogItemInfo.inheritVersion ? {
                _value: Number(catalogItemInfo.inheritCode),
                _ver: Number(catalogItemInfo.inheritVersion)
            } : null,
            description: description
        };
        // テンプレート情報を生成
        const template: {} = {};
        // プロパティ情報を生成
        let prop: {}[] = null;

        // 内部クラス情報を生成
        let inner: {} = null;

        // 内部クラス保持アイテムテンプレート情報を生成
        let innerItemTemplate: ItemTemplateEntity = null;

        // 継承カタログ情報を設定
        for (const inheritCatalog of inheritCatalogList) {
            // Cmatrix情報を取得
            cmatrixIndexDomain = new CmatrixIndexDomain();
            cmatrixIndexDomain.catalogItemId = inheritCatalog.id;
            const cmatrixList = await cmatrixIndexRepository.getRecord(em, cmatrixIndexDomain);

            // アイテムテンプレート情報を取得
            itemTemplateDomain = new ItemTemplateDomain();
            itemTemplateDomain.catalogItemId = inheritCatalog.id;
            const inheritItemTemplateList = await itemTemplateRepository.getInnerRecord(em, itemTemplateDomain);

            // アイテムテンプレートが存在する場合
            if (inheritItemTemplateList.length > 0) {
                let preInnerName: string = null;
                for (const inheritItemTemplate of inheritItemTemplateList) {
                    // 指定内部クラス異なる場合
                    if (name !== inheritItemTemplate.innerName) {
                        continue;
                    }
                    // 前回と同じクラス名の場合、処理なし
                    if (preInnerName === inheritItemTemplate.innerName) {
                        continue;
                    }
                    // 内部クラス情報を設定
                    innerItemTemplate = inheritItemTemplate;
                    inner = {
                        name: inheritItemTemplate.innerName
                    };

                    // テンプレートプロパティ情報を取得
                    const templateProp = await this.createTamplateProperty(inheritItemTemplate, connection, em, prop, inheritCatalog, cmatrixList, template, nsInfo, true);
                    prop = templateProp.prop;
                    // 前回内部クラス名を保持
                    preInnerName = inheritItemTemplate.innerName;
                }
            }
        }

        // スコープを狭めるためにアイテムテンプレート情報の取得処理をブロック化
        {
            // Cmatrix情報を取得
            cmatrixIndexDomain = new CmatrixIndexDomain();
            cmatrixIndexDomain.catalogItemId = catalogItemInfo.id;
            const cmatrixList = await cmatrixIndexRepository.getRecord(em, cmatrixIndexDomain);

            // アイテムテンプレート情報を取得
            itemTemplateDomain = new ItemTemplateDomain();
            itemTemplateDomain.catalogItemId = catalogItemInfo.id;
            itemTemplateDomain.innerName = name;
            const itemTemplateList = await itemTemplateRepository.getInnerRecord(em, itemTemplateDomain);

            // アイテムテンプレートが存在する場合
            if (itemTemplateList.length > 0) {
                let preInnerName: string = null;
                for (const itemTemplate of itemTemplateList) {
                    // 前回と同じクラス名の場合、処理なし
                    if (preInnerName === itemTemplate.innerName) {
                        continue;
                    }
                    // 内部クラス情報を設定
                    innerItemTemplate = itemTemplate;
                    inner = {
                        name: itemTemplate.innerName
                    };
                    // テンプレートプロパティ情報を取得
                    const templateProp = await this.createTamplateProperty(itemTemplate, connection, em, prop, catalogItemInfo, cmatrixList, template, nsInfo, false);
                    prop = templateProp.prop;
                    // 前回内部クラス名を保持
                    preInnerName = itemTemplate.innerName;
                }
            }
        }
        if (!innerItemTemplate) {
            // 対象カタログが存在しない場合、エラーをthrow
            throw new AppError(message.CATALOG_NOT_FOUND, ResponseCode.NOT_FOUND);
        }

        // カタログ情報を生成
        innerInfo = {
            catalogItem: catalogInfo,
            template: template,
            prop: prop,
            inner: inner
        };

        // 各種カタログ情報から応答JSONを生成
        return innerInfo;
    }

    /**
     * カタログ情報追加
     * @param connection
     * @param em
     * @param namespaceId
     * @param code
     * @param version
     * @param type
     * @param catalog
     * @param operator
     * @param versionUpFlag
     */
    public async insertCatalogInfo (connection: Connection, em: EntityManager, namespaceId: number, code: number, version: number, type: string, catalog: {}, operator: OperatorDomain, versionUpFlag: boolean = true): Promise<number> {
        // 各domain, repository変数の宣言
        let catalogItemDomain;
        let itemTemplateDomain;
        const catalogItemRepository = new CatalogItemRepository(connection);
        const itemTemplateRepository = new ItemTemplateRepository(connection);

        // 対象予約codeの存在確認
        catalogItemDomain = new CatalogItemDomain();
        catalogItemDomain.code = code;
        catalogItemDomain.version = version;
        catalogItemDomain.isReserved = true;
        const reserveCatalogId = await catalogItemRepository.getCatalogId(em, catalogItemDomain, true);

        // 継承カタログが存在する場合
        if (catalog['catalogItem'].inherit && catalog['catalogItem'].inherit._value) {
            // 継承クラスの存在確認
            catalogItemDomain = new CatalogItemDomain();
            catalogItemDomain.code = catalog['catalogItem'].inherit._value;
            catalogItemDomain.version = catalog['catalogItem'].inherit._ver;
            catalogItemDomain.isReserved = false;
            const catalogId = await catalogItemRepository.getCatalogId(em, catalogItemDomain, false);

            // バージョン指定がない場合
            if (!catalog['catalogItem'].inherit._ver) {
                // 最大バージョンを取得
                catalogItemDomain = new CatalogItemDomain();
                catalogItemDomain.code = catalog['catalogItem'].inherit._value;
                catalog['catalogItem'].inherit._ver = await catalogItemRepository.getMaxVersion(em, catalogItemDomain);
            }
            // 予約レコードを追加
            await this.insertReserveCatalog(connection, em, catalogId, catalog['catalogItem'].inherit._value, catalog['catalogItem'].inherit._ver, operator);
        }

        // descriptionを生成
        let catalogItemDescription: string = null;
        if (Array.isArray(catalog['catalogItem'].description)) {
            const descriptionList: {}[] = catalog['catalogItem'].description;
            const tempList: {} = {};
            for (const description of descriptionList) {
                const keyValue = this.getKeyValueObject(description);
                if (!keyValue) {
                    // descriptionがnullでkeyValueが取得できない場合
                    continue;
                }
                if (tempList[description['key']]) {
                    if (!Array.isArray(tempList[description['key']])) {
                        const tempValue = tempList[description['key']];
                        tempList[description['key']] = [];
                        tempList[description['key']].push(tempValue);
                    }
                    tempList[description['key']].push(keyValue[description['key']]);
                } else {
                    tempList[description['key']] = keyValue[description['key']];
                }
            }
            catalogItemDescription = JSON.stringify(tempList);
        } else {
            catalogItemDescription = catalog['catalogItem'].description;
        }

        // カタログ情報を生成
        catalogItemDomain = new CatalogItemDomain();
        catalogItemDomain.id = reserveCatalogId;
        catalogItemDomain.code = code;
        catalogItemDomain.version = version;
        catalogItemDomain.nsId = namespaceId;
        catalogItemDomain.name = catalog['catalogItem'].name;
        catalogItemDomain.inheritCode = catalog['catalogItem'].inherit ? catalog['catalogItem'].inherit._value : null;
        catalogItemDomain.inheritVersion = catalog['catalogItem'].inherit ? catalog['catalogItem'].inherit._ver : null;
        catalogItemDomain.description = catalogItemDescription;
        catalogItemDomain.isReserved = false;
        catalogItemDomain.response = null;
        catalogItemDomain.updatedBy = operator.loginId;

        let catalogItemId: number = null;
        if (reserveCatalogId || (!reserveCatalogId && !versionUpFlag)) {
            // バージョンアップしない、もしくは予約カタログ情報が存在する場合
            // カタログ情報を更新
            await catalogItemRepository.updateRecord(em, catalogItemDomain);

            // 更新したカタログ情報IDを取得
            catalogItemId = await catalogItemRepository.getCatalogId(em, catalogItemDomain, true);
        } else {
            // バージョンアップする、もしくは予約カタログ情報が存在しない場合
            // カタログ情報を追加
            const result = await catalogItemRepository.insertRecord(em, catalogItemDomain);

            // 追加したカタログ情報IDを取得
            catalogItemId = Number(result.identifiers[0].id);
        }

        // アイテムテンプレート情報を削除
        itemTemplateDomain = new ItemTemplateDomain();
        itemTemplateDomain.catalogItemId = catalogItemId;
        itemTemplateDomain.updatedBy = operator.loginId;
        const itemTemplateList = await itemTemplateRepository.getRecord(em, itemTemplateDomain, false);
        for (const itemTemplate of itemTemplateList) {
            itemTemplateDomain.id = itemTemplate.id;
            await itemTemplateRepository.deleteRecord(em, itemTemplateDomain);
        }

        // templateが存在する場合
        let itemTemplateId: number = null;
        const template = catalog['template'];
        if (template) {
            // アイテムテンプレート情報を生成
            itemTemplateDomain = new ItemTemplateDomain();
            itemTemplateDomain.catalogItemId = catalogItemId;
            itemTemplateDomain.template = template.value ? JSON.stringify(template.value) : null;
            itemTemplateDomain.innerInheritCode = catalog['catalogItem'].inherit ? catalog['catalogItem'].inherit._value : null;
            itemTemplateDomain.innerInheritVersion = catalog['catalogItem'].inherit ? catalog['catalogItem'].inherit._ver : null;
            itemTemplateDomain.updatedBy = operator.loginId;

            // アイテムテンプレート情報を追加
            const result = await itemTemplateRepository.insertRecord(em, itemTemplateDomain);

            // 追加したアイテムテンプレート情報IDを取得
            itemTemplateId = Number(result.identifiers[0].id);

            // propが存在する場合
            const prop = template.prop;
            if (prop) {
                for (const propElement of prop) {
                    // テンプレートプロパティ情報を生成
                    await this.insertTemplateProperty(connection, em, catalogItemId, itemTemplateId, catalog, propElement, operator);
                }
            }
        }

        // カタログ属性情報を削除
        const catalogAttributeDomain = new CatalogItemAttributeDomain();
        catalogAttributeDomain.catalogItemId = catalogItemId;
        catalogAttributeDomain.updatedBy = operator.loginId;
        const catalogAttributeRepository = new CatalogItemAttributeRepository(connection);
        await catalogAttributeRepository.deleteRecordByCatalogItemId(em, catalogAttributeDomain);

        // attributeが存在する場合
        const attribute = catalog['attribute'];
        if (attribute) {
            // カタログ属性情報を生成
            await this.insertAttribute(attribute, catalogItemId, code, operator, em, connection);
        }

        // 検索サービスにデータ追加
        await this.insertSearchService(catalogItemId, code, catalog);

        // 対象カタログIDを返す
        return catalogItemId;
    }

    // 以下private methodから呼び出されるprivate method
    /**
     * カタログ情報を設定する
     * @param Catalogitem
     * @param em
     * @param connection
     * @param template
     * @param prop
     * @param allTemplatePropertyList
     * @param value
     * @param nsInfo
     * @param isInherit
     * @param InheritedCatalogitem 継承の場合、継承先のcatalogItem
     */
    private async createCatalogInfo (Catalogitem: CatalogItemEntity, em: EntityManager, connection: Connection, template: {}, prop: {}[], allTemplatePropertyList: TemplatePropertyEntity[], value: {}[], nsInfo: NameSpaceEntity, isInherit: boolean, InheritedCatalogitem?: CatalogItemEntity) {
        // Cmatrix情報を取得
        const cmatrixIndexDomain = new CmatrixIndexDomain();
        cmatrixIndexDomain.catalogItemId = Catalogitem.id;
        const cmatrixIndexRepository = new CmatrixIndexRepository(connection);
        const cmatrixList = await cmatrixIndexRepository.getRecord(em, cmatrixIndexDomain);

        // アイテムテンプレート情報を取得
        const itemTemplateDomain = new ItemTemplateDomain();
        itemTemplateDomain.catalogItemId = Catalogitem.id;
        const itemTemplateRepository = new ItemTemplateRepository(connection);
        const itemTemplateList = await itemTemplateRepository.getRecord(em, itemTemplateDomain, true);
        // アイテムテンプレートが存在する場合
        if (itemTemplateList.length > 0) {
            for (const itemTemplate of itemTemplateList) {
                // value情報格納
                if (itemTemplate.template) {
                    value.push(...JSON.parse(itemTemplate.template));
                }
                // テンプレートプロパティ情報を取得
                const templateProp = await this.createTamplateProperty(itemTemplate, connection, em, prop, Catalogitem, cmatrixList, template, nsInfo, isInherit);
                prop = templateProp.prop;
                if (templateProp.templatePropertyList.length > 0) {
                    // 全プロパティを格納するリストに追加
                    allTemplatePropertyList = allTemplatePropertyList.concat(templateProp.templatePropertyList);
                }

                // プロパティがない場合、かつvalueがある場合
                const templateKeyValues = JSON.parse(itemTemplate.template);
                if (templateKeyValues && Array.isArray(templateKeyValues)) {
                    let firstDataCheck: {} = {};
                    let cmartixNum: number = 1;
                    for (const templateKeyValue of templateKeyValues) {
                        const resultTemplate = templateProp.templatePropertyList.find((info: TemplatePropertyEntity) => {
                            if (info.keyName === templateKeyValue.key) {
                                return true;
                            }
                        });
                        const inheritResultTemplate = allTemplatePropertyList.find((info: TemplatePropertyEntity) => {
                            if (info.keyName === templateKeyValue.key) {
                                return true;
                            }
                        });
                        if (resultTemplate || inheritResultTemplate) {
                            // セットされた値を取得
                            // 継承の場合、継承先のカタログから値を取得
                            let keyValue;
                            const resultTemplateProperty = !resultTemplate ? inheritResultTemplate : resultTemplate;
                            let res;
                            if (isInherit) {
                                keyValue = await this.convertKeyValue(connection, em, InheritedCatalogitem.code, InheritedCatalogitem.version, templateKeyValue.key, templateKeyValue.value, null);
                                res = await this.createTemplateByValues(resultTemplateProperty, templateKeyValue, firstDataCheck, connection, em, template, keyValue, cmartixNum, InheritedCatalogitem);
                            } else {
                                keyValue = await this.convertKeyValue(connection, em, Catalogitem.code, Catalogitem.version, templateKeyValue.key, templateKeyValue.value, null);
                                res = await this.createTemplateByValues(resultTemplateProperty, templateKeyValue, firstDataCheck, connection, em, template, keyValue, cmartixNum, Catalogitem);
                            }
                            // templateに値を追加
                            template = res.template;
                            cmartixNum = res.cmartixNum;
                            firstDataCheck = res.firstDataCheck;
                        }
                    }
                }
            }
        }
        // レスポンスを生成
        const response = {
            value: value,
            allTemplatePropertyList: allTemplatePropertyList,
            prop: prop,
            template: template
        };
        return response;
    }

    /**
     * テンプレートプロパティ情報を取得する
     * @param itemTemplate
     * @param connection
     * @param em
     * @param prop
     * @param catalogItemInfo
     * @param cmatrixList
     * @param template
     * @param nsInfo
     * @param isInherit
     */
    private async createTamplateProperty (itemTemplate: ItemTemplateEntity, connection: Connection, em: EntityManager, prop: {}[], catalogItemInfo: CatalogItemEntity, cmatrixList: CmatrixIndexEntity[], template: {}, nsInfo: NameSpaceEntity, isInherit: boolean) {
        const templatePropertyDomain = new TemplatePropertyDomain();
        templatePropertyDomain.itemTemplateId = itemTemplate.id;
        const templatePropertyRepository = new TemplatePropertyRepository(connection);
        const templatePropertyList = await templatePropertyRepository.getRecord(em, templatePropertyDomain);
        if (templatePropertyList.length > 0) {
            if (!prop) {
                prop = [];
            }
            for (const templateProperty of templatePropertyList) {
                // プロパティ候補選択を取得
                const propertyCandidateDomain = new PropertyCandidateDomain();
                propertyCandidateDomain.templatePropertyId = templateProperty.id;
                const propertyCandidateRepository = new PropertyCandidateRepository(connection);
                const propertyCandidateList = await propertyCandidateRepository.getRecord(em, propertyCandidateDomain);

                // テンプレートコードを取得
                const templateCodeDomain = new TemplateCodeDomain();
                templateCodeDomain.templatePropertyId = templateProperty.id;
                const templateCodeRepository = new TemplateCodeRepository(connection);
                const templateCodeList = await templateCodeRepository.getRecord(em, templateCodeDomain);

                // templatePropertyのkeyNameに対応するvalue情報生成
                const keyValue = await this.createKeyValue(connection, em, catalogItemInfo, itemTemplate, templateProperty);
                template[templateProperty.keyName] = keyValue;

                // nsにcmatrixが含まれる場合、Cmatrixをテンプレートに追加
                if (nsInfo.name.indexOf('/cmatrix') >= 0) {
                    template['index'] = cmatrixList[0].indexKey;
                    template['value'] = cmatrixList[0].value;
                }

                // プロパティを生成
                const propInfo = await this.createProp(connection, em, catalogItemInfo, itemTemplate, templateProperty, propertyCandidateList, templateCodeList, cmatrixList, isInherit);
                const tempProp = prop.filter(info => info['key'] !== propInfo['key']);
                tempProp.push(propInfo);
                prop = tempProp;
            }
        }
        // レスポンスを生成
        const res = {
            prop: prop,
            templatePropertyList: templatePropertyList
        };
        return res;
    }

    /**
     * テンプレートプロパティのkeyNameに対応するvalue情報生成
     * @param connection
     * @param em
     * @param catalogItem
     * @param itemTemplate
     * @param templateProperty
     * @param candidateList
     * @param templateCodeList
     * @param cmatrixList
     * @returns keyNameに対応するvalueのオブジェクトあるいはオブジェクト配列
     */
    private async createKeyValue (connection: Connection, em: EntityManager, catalogItem: CatalogItemEntity, itemTemplate: ItemTemplateEntity, templateProperty: TemplatePropertyEntity): Promise<any> {
        // テンプレートを取得
        const template = JSON.parse(itemTemplate.template);
        const valueList: any[] = [];
        if (template && Array.isArray(template)) {
            for (let index = 0; index < template.length; index++) {
                if (template[index].key === templateProperty.keyName) {
                    valueList.push(template[index].value);
                }
            }
        }
        // 該当プロパティがない場合
        if (valueList.length <= 0) {
            valueList.push(null);
        }

        // タイプ毎にプロパティを生成
        let keyValue: any = null;
        const keyValueList: {}[] = [];
        switch (templateProperty.type) {
        case 'number':
        case 'string':
        case 'boolean':
            if (templateProperty.indexKey) {
                // Cmatrix情報を取得
                const cmatrixInfo = await this.getCmatrixIndex(connection, em, catalogItem.id, templateProperty.indexKey);
                keyValue = {
                    index: cmatrixInfo.indexKey,
                    value: cmatrixInfo.value
                };
            } else {
                keyValue = valueList[0];
            }
            break;
        case 'number[]':
        case 'string[]':
        case 'boolean[]':
            for (const value of valueList) {
                if (templateProperty.indexKey) {
                    // Cmatrix情報を取得
                    const cmatrixInfo = await this.getCmatrixIndex(connection, em, catalogItem.id, templateProperty.indexKey);
                    keyValueList.push({
                        index: cmatrixInfo.indexKey,
                        value: cmatrixInfo.value
                    });
                } else {
                    keyValueList.push(value);
                }
            }
            keyValue = null;
            for (let index = 0; index < keyValueList.length; index++) {
                if (keyValueList[index]) {
                    keyValue = keyValueList;
                    break;
                }
            }
            break;
        case 'code':
            if (templateProperty.indexKey) {
                // Cmatrix情報を取得
                const cmatrixInfo = await this.getCmatrixIndex(connection, em, catalogItem.id, templateProperty.indexKey);
                keyValue = {
                    index: cmatrixInfo.indexKey,
                    value: cmatrixInfo.value
                };
            } else {
                // コードオブジェクトを取得
                keyValue = this.getCodeObject(valueList[0]);
            }
            break;
        case 'code[]':
            for (const value of valueList) {
                if (templateProperty.indexKey) {
                    // Cmatrix情報を取得
                    const cmatrixInfo = await this.getCmatrixIndex(connection, em, catalogItem.id, templateProperty.indexKey);
                    keyValueList.push({
                        index: cmatrixInfo.indexKey,
                        value: cmatrixInfo.value
                    });
                } else {
                    // コードオブジェクトを取得
                    keyValueList.push(this.getCodeObject(value));
                }
            }
            keyValue = null;
            for (let index = 0; index < keyValueList.length; index++) {
                if (keyValueList[index]) {
                    keyValue = keyValueList;
                    break;
                }
            }
            break;
        case 'item':
            if (templateProperty.indexKey) {
                // Cmatrix情報を取得
                const cmatrixInfo = await this.getCmatrixIndex(connection, em, catalogItem.id, templateProperty.indexKey);
                keyValue = {
                    index: cmatrixInfo.indexKey,
                    value: cmatrixInfo.value
                };
            } else if (templateProperty.code) {
                // コードオブジェクトを取得
                keyValue = await this.getCodeObjectByTemplateProperty(connection, em, templateProperty.code, templateProperty.version, templateProperty.keyName);
            } else {
                // コードオブジェクトを取得
                keyValue = this.getCodeObject(valueList[0]);
            }
            break;
        case 'item[]':
            for (const value of valueList) {
                if (templateProperty.indexKey) {
                    // Cmatrix情報を取得
                    const cmatrixInfo = await this.getCmatrixIndex(connection, em, catalogItem.id, templateProperty.indexKey);
                    keyValueList.push({
                        index: cmatrixInfo.indexKey,
                        value: cmatrixInfo.value
                    });
                } else if (templateProperty.code) {
                    // コードオブジェクトを取得
                    keyValueList.push(await this.getCodeObjectByTemplateProperty(connection, em, templateProperty.code, templateProperty.version, templateProperty.keyName));
                } else {
                    // コードオブジェクトを取得
                    keyValueList.push(this.getCodeObject(value));
                }
            }
            keyValue = null;
            for (let index = 0; index < keyValueList.length; index++) {
                if (keyValueList[index]) {
                    keyValue = keyValueList;
                    break;
                }
            }
            break;
        case 'inner':
            if (templateProperty.indexKey) {
                // Cmatrix情報を取得
                const cmatrixInfo = await this.getCmatrixIndex(connection, em, catalogItem.id, templateProperty.indexKey);
                keyValue = {
                    index: cmatrixInfo.indexKey,
                    value: cmatrixInfo.value
                };
            } else {
                // コードオブジェクトを取得
                keyValue = this.getCodeObject(valueList[0]);
            }
            break;
        case 'inner[]':
            for (const value of valueList) {
                if (templateProperty.indexKey) {
                    // Cmatrix情報を取得
                    const cmatrixInfo = await this.getCmatrixIndex(connection, em, catalogItem.id, templateProperty.indexKey);
                    keyValueList.push({
                        index: cmatrixInfo.indexKey,
                        value: cmatrixInfo.value
                    });
                } else if (templateProperty.code) {
                    // コードオブジェクトを取得
                    keyValueList.push(await this.getCodeObjectByTemplateProperty(connection, em, templateProperty.code, templateProperty.version, templateProperty.keyName));
                } else {
                    // コードオブジェクトを取得
                    keyValueList.push(this.getCodeObject(value));
                }
            }
            keyValue = null;
            for (let index = 0; index < keyValueList.length; index++) {
                if (keyValueList[index]) {
                    keyValue = keyValueList;
                    break;
                }
            }
            break;
        }
        return keyValue;
    }

    /**
     * プロパティデータ生成
     * @param connection
     * @param em
     * @param catalogItem
     * @param itemTemplate
     * @param templateProperty
     * @param candidateList
     * @param templateCodeList
     * @param cmatrixList
     * @param isInherit
     */
    private async createProp (connection: Connection, em: EntityManager, catalogItem: CatalogItemEntity, itemTemplate: ItemTemplateEntity, templateProperty: TemplatePropertyEntity, candidateList: PropertyCandidateEntity[], templateCodeList: TemplateCodeEntity[], cmatrixList: CmatrixIndexEntity[], isInherit: boolean): Promise<{}> {
        // タイプ毎にプロパティを生成
        let prop = {};
        switch (templateProperty.type) {
        case 'number':
        case 'string':
        case 'number[]':
        case 'string[]':
            prop = {
                key: templateProperty.keyName,
                type: {
                    of: templateProperty.type,
                    cmatrix: null,
                    format: templateProperty.formatCode && templateProperty.formatVersion ? {
                        _value: templateProperty.formatCode,
                        _ver: templateProperty.formatVersion
                    } : null,
                    unit: templateProperty.unitCode && templateProperty.unitVersion ? {
                        _value: templateProperty.unitCode,
                        _ver: templateProperty.unitVersion
                    } : null,
                    candidate: null
                },
                description: templateProperty.description
            };
            // プロパティ候補を設定
            prop['type'].candidate = await this.createCandidate(connection, em, candidateList);
            break;
        case 'boolean':
        case 'boolean[]':
            prop = {
                key: templateProperty.keyName,
                type: {
                    of: templateProperty.type,
                    cmatrix: null
                },
                description: templateProperty.description
            };
            break;
        case 'item':
            prop = {
                key: templateProperty.keyName,
                type: {
                    of: templateProperty.type,
                    _code: null,
                    cmatrix: null,
                    candidate: null
                },
                description: templateProperty.description
            };
            // codeの場合
            if (templateProperty.code && templateProperty.version) {
                prop['type']._code = {
                    _value: templateProperty.code,
                    _ver: templateProperty.version
                };
            }
            // プロパティ候補を設定
            prop['type'].candidate = await this.createCandidate(connection, em, candidateList);
            break;
        case 'code':
            prop = {
                key: templateProperty.keyName,
                type: {
                    of: templateProperty.type,
                    cmatrix: null,
                    candidate: null
                },
                description: templateProperty.description
            };
            // プロパティ候補を設定
            prop['type'].candidate = await this.createCandidate(connection, em, candidateList);
            break;
        case 'item[]':
        case 'code[]':
            prop = {
                key: templateProperty.keyName,
                type: {
                    of: templateProperty.type,
                    cmatrix: null,
                    candidate: null
                },
                description: templateProperty.description
            };
            // プロパティ候補を設定
            prop['type'].candidate = await this.createCandidate(connection, em, candidateList);
            break;
        case 'inner':
        case 'inner[]':
            // 内部クラス名を取得
            var innerName = await this.getInnerName(connection, em, templateProperty.id);
            prop = {
                key: templateProperty.keyName,
                type: {
                    of: templateProperty.type,
                    inner: innerName,
                    cmatrix: null,
                    candidate: null
                },
                description: templateProperty.description
            };
            // プロパティ候補を設定
            prop['type'].candidate = await this.createCandidate(connection, em, candidateList);
            break;
        }
        // cmatrixが存在している場合
        const cmatrix = cmatrixList.find(function (value: CmatrixIndexEntity, index: number, obj: any[]) {
            if (value.indexKey === templateProperty.indexKey) {
                return true;
            }
        });
        if (cmatrix && cmatrix.indexKey) {
            prop['type'].cmatrix = {
                index: cmatrix.indexKey,
                reserved: cmatrix.reserved ? true.valueOf() : false.valueOf()
            };
        }
        // isInheritフラグを設定
        if (prop) {
            prop['isInherit'] = isInherit;
        }
        return prop;
    }

    /**
     * templateに値を設定する
     * @param resultTemplateProperty
     * @param templateKeyValue
     * @param firstDataCheck
     * @param connection
     * @param em
     * @param template
     * @param keyValue
     * @param cmartixNum
     * @param Catalogitem
     */
    private async createTemplateByValues (resultTemplateProperty: TemplatePropertyEntity, templateKeyValue: any, firstDataCheck: {}, connection: Connection, em: EntityManager, template: {}, keyValue: {}, cmartixNum: number, Catalogitem: CatalogItemEntity) {
        // 対象のタイプを取得
        const type: string = resultTemplateProperty.type;

        // 対象のタイプが配列かどうかチェック
        const isArray: boolean = !!(type && type.indexOf('[]') >= 0);

        // 対象キーが1つ目かどうかチェック
        if (!(templateKeyValue.key in firstDataCheck)) {
            firstDataCheck[templateKeyValue.key] = true;
        }

        // 対象アイテムIDを取得
        const itemTemplateId: number = resultTemplateProperty.itemTemplateId;

        let catalogItemId: number = null;
        if (itemTemplateId) {
            // アイテムテンプレート情報を取得
            const itemTemplateDomain = new ItemTemplateDomain();
            itemTemplateDomain.id = itemTemplateId;
            const itemTemplateRepository = new ItemTemplateRepository(connection);
            catalogItemId = await itemTemplateRepository.getCatalogItemId(em, itemTemplateDomain);
        }
        // 対象のインデックスキーを取得
        const indexKey: string = resultTemplateProperty.indexKey;

        let cmatrixInfo: CmatrixIndexEntity = null;
        if (indexKey && itemTemplateId) {
            // Cmatrix情報を取得
            cmatrixInfo = await this.getCmatrixIndex(connection, em, catalogItemId, indexKey);
        }

        // template[templateKeyValue.key]がオブジェクト型の場合(resultTemplateProperty.typeが配列型以外)
        if (template[templateKeyValue.key] &&
            template[templateKeyValue.key]['index'] &&
            template[templateKeyValue.key]['value'] !== undefined) {
            // 対象キーが1つ目の場合
            if (firstDataCheck[templateKeyValue.key]) {
                firstDataCheck[templateKeyValue.key] = false;
            }
            template[templateKeyValue.key]['value'] = keyValue;
        } else if (cmatrixInfo) {
            // template[templateKeyValue.key]が配列型の場合(resultTemplateProperty.typeが配列型)かつcmatrixInfoがある場合
            // 対象キーが1つ目の場合、template[templateKeyValue.key]を空配列で初期化
            if (firstDataCheck[templateKeyValue.key]) {
                cmartixNum = 1;
                template[templateKeyValue.key] = [];
                firstDataCheck[templateKeyValue.key] = false;
            }

            // 対象キー名を取得
            let keyName: string = null;
            if (Array.isArray(keyValue)) {
                for (let keyIndex = 0; keyIndex < keyValue.length; keyIndex++) {
                    for (const key in keyValue[keyIndex]) {
                        keyName = key;
                    }
                }
            }

            // テンプレートプロパティ情報を取得
            const templatePropertyDomain = new TemplatePropertyDomain();
            templatePropertyDomain.catalogItemid = Catalogitem.id;
            templatePropertyDomain.keyName = keyName;
            const templatePropertyRepository = new TemplatePropertyRepository(connection);
            const chileTemplateProperty = await templatePropertyRepository.getRecordByCatalogItemId(em, templatePropertyDomain);

            // 対象のタイプが配列かどうかチェック
            const isChildArray: boolean = !!(chileTemplateProperty && chileTemplateProperty.type && chileTemplateProperty.type.indexOf('[]') >= 0);

            let chileKeyValue: any = null;
            if (isChildArray && Array.isArray(keyValue)) {
                chileKeyValue = [];
                chileKeyValue = chileKeyValue.concat(keyValue);
            } else if (isChildArray && !Array.isArray(keyValue)) {
                chileKeyValue = [];
                chileKeyValue.push(keyValue);
            } else if (!isChildArray && Array.isArray(keyValue)) {
                chileKeyValue = keyValue[0];
            } else if (!isChildArray && !Array.isArray(keyValue)) {
                chileKeyValue = keyValue;
            }
            const cmatrixIndex: string = cmatrixInfo.indexKey.replace('(n)', cmartixNum.toString());
            template[templateKeyValue.key] = template[templateKeyValue.key].concat({
                index: cmatrixIndex,
                value: chileKeyValue
            });
            cmartixNum++;
        } else {
            // template[templateKeyValue.key]が配列型の場合(resultTemplateProperty.typeが配列型)かつcmatrixInfoが無い場合
            // 対象キーが1つ目の場合、template[templateKeyValue.key]を空配列で初期化
            if (firstDataCheck[templateKeyValue.key]) {
                if (isArray) {
                    template[templateKeyValue.key] = [];
                }
                firstDataCheck[templateKeyValue.key] = false;
            }
            if (isArray) {
                template[templateKeyValue.key] = template[templateKeyValue.key].concat(keyValue);
            } else {
                template[templateKeyValue.key] = keyValue;
            }
        }
        // レスポンスを生成
        const response = {
            template: template,
            cmartixNum: cmartixNum,
            firstDataCheck: firstDataCheck
        };
        return response;
    }

    /**
     * プロパティ候補生成
     * @param connection
     * @param em
     * @param candidateList
     */
    private async createCandidate (connection: Connection, em: EntityManager, candidateList: PropertyCandidateEntity[]): Promise<{}> {
        // プロパティ候補が存在する場合
        let result: {} = null;
        if (candidateList && candidateList.length > 0) {
            result = {};
            const nsList: string[] = [];
            const codeList: {}[] = [];
            let base: {} = null;
            let valueList: string[] = [];
            let innerList: string[] = [];
            const nsDomain = new NameSpaceDomain();
            const nsRepository = new NameSpaceRepository(connection);
            for (const candidate of candidateList) {
                // 値が存在する場合
                if (candidate.value) {
                    valueList = JSON.parse(candidate.value);
                    break;
                } else if (candidate.inners) {
                    // 値が存在する場合
                    innerList = JSON.parse(candidate.inners);
                    break;
                } else {
                    // ネームスペースが存在する場合
                    if (candidate.nsId) {
                        // 対象ネームスペースを取得
                        nsDomain.id = candidate.nsId;
                        const nsInfo = await nsRepository.getRecordById(em, nsDomain);
                        if (candidate.isDescendant) {
                            nsInfo.name += '/*';
                        }
                        nsList.push(nsInfo.name);
                    }
                    // コード、バージョンが存在する場合
                    if (candidate.code && candidate.version) {
                        codeList.push({
                            _value: Number(candidate.code),
                            _ver: Number(candidate.version)
                        });
                    }
                    // 参照元コード、バージョンが存在する場合
                    if (candidate.baseCode && candidate.baseVersion) {
                        base = {
                            _value: Number(candidate.baseCode),
                            _ver: Number(candidate.baseVersion)
                        };
                    }
                }
            }
            if (valueList.length > 0) {
                result['value'] = valueList;
            } else if (innerList.length > 0) {
                result['inner'] = innerList;
            } else {
                result['ns'] = nsList.length > 0 ? nsList : null;
                result['_code'] = codeList.length > 0 ? codeList : null;
                result['base'] = base || null;
            }
        }
        return result;
    }

    /**
     * テンプレートプロパティ情報生成
     * @param connection
     * @param em
     * @param template
     * @param prop prop配列内の1要素
     */
    private async insertTemplateProperty (connection: Connection, em: EntityManager, catalogItemId: number, itemTemplateId: number, catalog: {}, prop: any, operator: OperatorDomain): Promise<void> {
        // 各domain, repository変数の宣言
        let catalogItemDomain;
        const catalogItemRepository = new CatalogItemRepository(connection);

        // 存在しない型の場合
        if (!prop.type ||
            !prop.type.of ||
            this.targetType.indexOf(prop.type.of) < 0) {
            return;
        }

        // テンプレートプロパティ情報を生成
        const templatePropertyDomain = new TemplatePropertyDomain();
        templatePropertyDomain.itemTemplateId = itemTemplateId;
        templatePropertyDomain.keyName = prop.key;
        templatePropertyDomain.type = prop.type.of;
        templatePropertyDomain.code = prop.type._code ? prop.type._code._value : null;
        templatePropertyDomain.version = prop.type._code ? prop.type._code._ver : null;
        templatePropertyDomain.filter = null;
        templatePropertyDomain.indexKey = prop.type.cmatrix ? prop.type.cmatrix.index : null;
        templatePropertyDomain.formatCode = prop.type.format ? prop.type.format._value : null;
        templatePropertyDomain.formatVersion = prop.type.format ? prop.type.format._ver : null;
        templatePropertyDomain.unitCode = prop.type.unit ? prop.type.unit._value : null;
        templatePropertyDomain.unitVersion = prop.type.unit ? prop.type.unit._ver : null;
        templatePropertyDomain.description = prop.description;
        templatePropertyDomain.updatedBy = operator.loginId;

        // テンプレートプロパティ情報を追加
        const templatePropertyRepository = new TemplatePropertyRepository(connection);
        const insertResult = await templatePropertyRepository.insertRecord(em, templatePropertyDomain);

        // 追加したテンプレートプロパティ情報IDを取得
        const templatePropertyId: number = Number(insertResult.identifiers[0].id);

        // itemの場合
        if (prop.type.of === 'item') {
            if (prop.type._code &&
                prop.type._code._value &&
                prop.type._code._ver) {
                const code = prop.type._code._value;
                const version = prop.type._code._ver;

                // 参照先カタログアイテムIDを取得
                catalogItemDomain = new CatalogItemDomain();
                catalogItemDomain.code = code;
                catalogItemDomain.version = version;

                const refCatalogId = await catalogItemRepository.getCatalogId(em, catalogItemDomain, false);

                // 予約レコードを追加
                await this.insertReserveCatalog(connection, em, refCatalogId, code, version, operator);

                // テンプレートコード情報を生成
                const templateCodeDomain = new TemplateCodeDomain();
                templateCodeDomain.templatePropertyId = templatePropertyId;
                templateCodeDomain.code = code;
                templateCodeDomain.version = version;
                templateCodeDomain.updatedBy = operator.loginId;

                // テンプレートコード情報を追加
                const templateCodeRepository = new TemplateCodeRepository(connection);
                await templateCodeRepository.insertRecord(em, templateCodeDomain);
            }
        }
        // innerの場合
        if (prop.type.of === 'inner' || prop.type.of === 'inner[]') {
            // innerを取得
            const innerList = catalog['inner'];

            // innerが存在する場合
            if (innerList) {
                for (const InnerCatalog of innerList) {
                    const inner: string[] = [];
                    if (prop.type.inner) {
                        inner.push(prop.type.inner);
                    }
                    if (prop.type.candidate && prop.type.candidate.inner) {
                        for (let candidateIndex = 0; candidateIndex < prop.type.candidate.inner.length; candidateIndex++) {
                            inner.push(prop.type.candidate.inner[candidateIndex]);
                        }
                    }
                    const itemTemplateRepository = new ItemTemplateRepository(connection);
                    for (const innerVal of inner) {
                        if (InnerCatalog['name'] === innerVal) {
                            // アイテムテンプレート情報を生成
                            const innerItemTemplateDomain = new ItemTemplateDomain();
                            innerItemTemplateDomain.catalogItemId = catalogItemId;
                            innerItemTemplateDomain.template = null;
                            innerItemTemplateDomain.templatePropertyId = templatePropertyId;
                            innerItemTemplateDomain.innerName = innerVal;
                            innerItemTemplateDomain.updatedBy = operator.loginId;

                            // アイテムテンプレート情報を追加
                            const result = await itemTemplateRepository.insertRecord(em, innerItemTemplateDomain);

                            // 追加したアイテムテンプレート情報IDを取得
                            const innerItemTemplateId = Number(result.identifiers[0].id);

                            // innerのプロパティを取得
                            const innerPropList = InnerCatalog['template']['prop'];

                            // innerのプロパティが存在する場合、再帰処理
                            for (const innerProp of innerPropList) {
                                await this.insertTemplateProperty(connection, em, catalogItemId, innerItemTemplateId, InnerCatalog, innerProp, operator);
                            }
                            break;
                        }
                    }
                }
            }
        }
        // フォーマットコードが指定されている場合
        if (prop.type.format) {
            const code = prop.type.format._value;
            const version = prop.type.format._ver;

            // カタログリレーション情報を生成・追加
            await this.insertCatalogRelationship(code, version, 'format', em, connection, operator, catalogItemId, itemTemplateId, templatePropertyId);
        }
        // 単位コードが指定されている場合
        if (prop.type.unit) {
            const code = prop.type.unit._value;
            const version = prop.type.unit._ver;

            // カタログリレーション情報を生成・追加
            await this.insertCatalogRelationship(code, version, 'unit', em, connection, operator, catalogItemId, itemTemplateId, templatePropertyId);
        }
        // CMatrixが指定されている場合
        if (prop.type.cmatrix) {
            // CMatrix情報を生成
            const cmatrixIndexDomain = new CmatrixIndexDomain();
            cmatrixIndexDomain.catalogItemId = catalogItemId;
            cmatrixIndexDomain.indexKey = prop.type.cmatrix.index;
            cmatrixIndexDomain.value = null;
            cmatrixIndexDomain.reserved = prop.type.cmatrix.reserved;
            cmatrixIndexDomain.updatedBy = operator.loginId;

            // CMatrix情報を追加
            const cmatrixIndexRepository = new CmatrixIndexRepository(connection);
            await cmatrixIndexRepository.insertRecord(em, cmatrixIndexDomain);
        }
        // 選択候補が指定されている場合
        if (prop.type.candidate) {
            // 選択候補情報の生成・追加
            await this.insertPropertyCandidate(prop, templatePropertyId, operator, connection, em, catalogItemId, itemTemplateId);
        }
    }

    /**
     * カタログリレーション情報を生成・追加する
     * @param code
     * @param version
     * @param refType
     * @param em
     * @param connection
     * @param operator
     * @param catalogItemId
     * @param itemTemplateId
     * @param templatePropertyId
     * @param propertyCandidateId insertPropertyCandidateから呼び出す場合
     */
    private async insertCatalogRelationship (code: any, version: any, refType: string, em: EntityManager, connection: Connection, operator: OperatorDomain, catalogItemId: number, itemTemplateId: number, templatePropertyId: number, propertyCandidateId: number = null) {
        // 参照先カタログアイテムIDを取得
        const catalogItemDomain = new CatalogItemDomain();
        catalogItemDomain.code = code;
        catalogItemDomain.version = version;
        const catalogItemRepository = new CatalogItemRepository(connection);
        let refCatalogId = await catalogItemRepository.getCatalogId(em, catalogItemDomain, false);

        // 予約レコードを追加
        refCatalogId = await this.insertReserveCatalog(connection, em, refCatalogId, code, version, operator);

        // カタログリレーション情報を生成
        const catalogRelationshipDomain = new CatalogRelationshipDomain();
        catalogRelationshipDomain.catalogItemId = catalogItemId;
        catalogRelationshipDomain.refCatalogItemId = refCatalogId;
        catalogRelationshipDomain.refType = refType;
        catalogRelationshipDomain.isGetLatest = false;
        catalogRelationshipDomain.itemTemplateId = itemTemplateId;
        catalogRelationshipDomain.templatePropertyId = templatePropertyId;
        catalogRelationshipDomain.propertyCandidateId = propertyCandidateId;
        catalogRelationshipDomain.updatedBy = operator.loginId;

        // カタログリレーション情報を追加
        const catalogRelationshipRepository = new CatalogRelationshipRepository(connection);
        await catalogRelationshipRepository.insertRecord(em, catalogRelationshipDomain);
    }

    /**
     * 選択候補情報の生成・追加を行う
     * @param prop prop
     * @param templatePropertyId
     * @param operator
     * @param connection
     * @param em
     * @param catalogItemId
     * @param itemTemplateId
     */
    private async insertPropertyCandidate (prop: any, templatePropertyId: number, operator: OperatorDomain, connection: Connection, em: EntityManager, catalogItemId: number, itemTemplateId: number) {
        let catalogItemDomain;
        const catalogItemRepository = new CatalogItemRepository(connection);
        let propertyCandidateDomain;
        const propertyCandidateRepository = new PropertyCandidateRepository(connection);

        // 値が存在する場合
        if (prop.type.candidate.value) {
            // 選択候補情報を生成
            propertyCandidateDomain = new PropertyCandidateDomain();
            propertyCandidateDomain.templatePropertyId = templatePropertyId;
            propertyCandidateDomain.isDescendant = false;
            propertyCandidateDomain.value = JSON.stringify(prop.type.candidate.value);
            propertyCandidateDomain.updatedBy = operator.loginId;

            // 選択候補情報を追加
            await propertyCandidateRepository.insertRecord(em, propertyCandidateDomain);

        // 内部クラスが存在する場合
        } else if (prop.type.candidate.inner) {
            // 選択候補情報を生成
            propertyCandidateDomain = new PropertyCandidateDomain();
            propertyCandidateDomain.templatePropertyId = templatePropertyId;
            propertyCandidateDomain.isDescendant = false;
            propertyCandidateDomain.inners = JSON.stringify(prop.type.candidate.inner);
            propertyCandidateDomain.updatedBy = operator.loginId;

            // 選択候補情報を追加
            await propertyCandidateRepository.insertRecord(em, propertyCandidateDomain);

        // それ以外の場合
        } else {
            // ネームスペースが存在する場合
            if (prop.type.candidate.ns) {
                const nsList = prop.type.candidate.ns;
                for (let candidateIndex = 0; candidateIndex < nsList.length; candidateIndex++) {
                    // 対象nsを取得
                    const candidateNs: string = nsList[candidateIndex];
                    // 対象nsからnsIdを取得
                    const getCandidateNsIdRes = await getCandidateNsId(candidateNs);

                    // 選択候補情報を生成
                    propertyCandidateDomain = new PropertyCandidateDomain();
                    propertyCandidateDomain.templatePropertyId = templatePropertyId;
                    propertyCandidateDomain.nsId = getCandidateNsIdRes.candidateNsId;
                    propertyCandidateDomain.isDescendant = getCandidateNsIdRes.isDescendant;
                    propertyCandidateDomain.updatedBy = operator.loginId;

                    // 選択候補情報を追加
                    await propertyCandidateRepository.insertRecord(em, propertyCandidateDomain);
                }
            }
            // コードが存在する場合
            if (prop.type.candidate._code) {
                const codeList = prop.type.candidate._code;
                for (const code of codeList) {
                    // 選択候補情報を生成
                    propertyCandidateDomain = new PropertyCandidateDomain();
                    propertyCandidateDomain.templatePropertyId = templatePropertyId;
                    propertyCandidateDomain.isDescendant = false;
                    propertyCandidateDomain.code = code._value;
                    propertyCandidateDomain.version = code._ver;
                    propertyCandidateDomain.updatedBy = operator.loginId;

                    // 選択候補情報を追加
                    const result = await propertyCandidateRepository.insertRecord(em, propertyCandidateDomain);
                    const propertyCandidateId: number = Number(result.identifiers[0].id);

                    // バージョン指定がない場合
                    const codeValue = code._value;
                    const version = code._ver;

                    // カタログリレーション情報を生成・追加
                    await this.insertCatalogRelationship(codeValue, version, 'candidate', em, connection, operator, catalogItemId, itemTemplateId, templatePropertyId, propertyCandidateId);
                }
            }
            // 基底クラスが存在する場合
            if (prop.type.candidate.base) {
                // バージョン指定がない場合
                const candidateCode = prop.type.candidate.base._value;
                let candidateVersion = prop.type.candidate.base._ver;
                if (!candidateVersion) {
                    // 最大バージョンを取得
                    catalogItemDomain = new CatalogItemDomain();
                    catalogItemDomain.code = candidateCode;
                    candidateVersion = await catalogItemRepository.getMaxVersion(em, catalogItemDomain);
                }

                // 選択候補情報を生成
                propertyCandidateDomain = new PropertyCandidateDomain();
                propertyCandidateDomain.templatePropertyId = templatePropertyId;
                propertyCandidateDomain.isDescendant = false;
                propertyCandidateDomain.baseCode = candidateCode;
                propertyCandidateDomain.baseVersion = candidateVersion;
                propertyCandidateDomain.updatedBy = operator.loginId;

                // 選択候補情報を追加
                const result = await propertyCandidateRepository.insertRecord(em, propertyCandidateDomain);
                const propertyCandidateId: number = Number(result.identifiers[0].id);

                // カタログリレーション情報を生成・追加
                await this.insertCatalogRelationship(candidateCode, candidateVersion, 'base', em, connection, operator, catalogItemId, itemTemplateId, templatePropertyId, propertyCandidateId);
            }
        }

        /**
         * 選択候補nsからnsIdを取得する
         * @param candidateNs
         */
        async function getCandidateNsId (candidateNs: string) {
            let isDescendant: boolean = false;
            // nsに/*が含まれる場合
            if (candidateNs && candidateNs.indexOf('/*') === (candidateNs.length - 2)) {
                // /*を除外
                isDescendant = true;
                candidateNs = candidateNs.substr(0, candidateNs.indexOf('/*'));
            }
            // nsにext, {ext_name}が含まれる場合
            if (candidateNs &&
                candidateNs.indexOf('/ext/') >= 0 &&
                candidateNs.indexOf('{ext_name}') >= 0) {
                // ext_nameを取得
                const catalogDomain = new CatalogDomain();
                const catalogRepository = new CatalogRepository(connection);
                const catalogInfo = await catalogRepository.getRecord(em, catalogDomain);

                // {ext_name}を置き換え
                candidateNs = candidateNs.replace('{ext_name}', catalogInfo.extName);
            }
            // 対象ns_idを取得
            const nsDomain = new NameSpaceDomain();
            nsDomain.name = candidateNs;
            const nsRepository = new NameSpaceRepository(connection);
            const candidateNsId: number = await nsRepository.getNamespaceId(em, nsDomain);

            // 対象ネームスペースが存在しない場合
            if (!candidateNsId) {
                throw new AppError(message.NAMESPACE_NOT_FOUND, ResponseCode.BAD_REQUEST);
            }
            // レスポンスを生成
            const res = {
                candidateNsId: candidateNsId,
                isDescendant: isDescendant
            };
            return res;
        }
    }

    /**
     * 予約カタログ追加
     * @param connection
     * @param em
     * @param catalogItemId
     * @param code
     * @param version
     * @param operator
     */
    private async insertReserveCatalog (connection: Connection, em: EntityManager, catalogItemId: number, code: number, version: number, operator: OperatorDomain): Promise<number> {
        // 対象カタログが存在しない場合
        let retCatalogItemId: number = catalogItemId;
        if (!catalogItemId) {
            // カタログアイテムの予約レコードを追加
            const catalogItemDomain = new CatalogItemDomain();
            catalogItemDomain.code = code;
            // catalogItemDomain.version = version <= 0 ? 1 : version;
            catalogItemDomain.version = version;
            catalogItemDomain.isReserved = true;
            catalogItemDomain.updatedBy = operator.loginId;
            const catalogItemRepository = new CatalogItemRepository(connection);
            const result = await catalogItemRepository.insertRecord(em, catalogItemDomain);
            retCatalogItemId = Number(result.identifiers[0].id);
        }
        return retCatalogItemId;
    }

    /**
     * コードオブジェクト取得
     * @param template
     */
    private getCodeObject (template: {}[]): {} {
        if (!template) {
            return null;
        }
        if (template.length === 2 &&
            template[0]['key'] === '_value' &&
            template[1]['key'] === '_ver') {
            // コードオブジェクトの場合(正常系)
            return {
                _value: Number(template[0]['value']),
                _ver: Number(template[1]['value'])
            };
        // 以下不正なカタログによるバグの修正時に追加された処理？保険で残している。
        } else if (template.length === 1 &&
            template[0]['key'] &&
            template[0]['value'] !== undefined &&
            !Array.isArray(template[0]['value'])) {
            // key, valueの場合
            return {
                [template[0]['key']]: template[0]['value']
            };
        }
        let response = null;
        for (let index = 0; index < template.length; index++) {
            // 値が配列の場合、再帰処理
            if (Array.isArray(template[index]['value'])) {
                response = this.getCodeObject(template[index]['value']);
                break;
            }
        }
        return response;
    }

    /**
     * KeyValueオブジェクト取得
     * @param template
     */
    private getKeyValueObject (template: {} | {}[]): {} {
        if (!template) {
            return null;
        }
        if (Array.isArray(template['value'])) {
            const templateValueList: {}[] = template['value'];
            const resObject = {};
            for (const templateValue of templateValueList) {
                const value = this.getKeyValueObject(templateValue);
                resObject[templateValue['key']] = value[templateValue['key']];
            }
            return {
                [template['key']]: resObject
            };
        } else {
            const value = template['value'];
            return {
                [template['key']]: value
            };
        }
    }

    /**
     * 継承クラスカタログ取得(再帰)
     * @param connection
     * @param em
     * @param catalog
     */
    private async getInheritCodeVersion (connection: Connection, em: EntityManager, catalog: CatalogItemEntity): Promise<CatalogItemEntity[]> {
        const resultList: CatalogItemEntity[] = [];
        resultList.push(catalog);
        const catalogItemDomain = new CatalogItemDomain();
        const catalogItemRepository = new CatalogItemRepository(connection);
        let index: number = 0;
        while (true) {
            if (!resultList[index] || !resultList[index].inheritCode || !resultList[index].inheritVersion) {
                // 継承クラス指定がない場合
                break;
            }
            // 継承クラスの存在確認
            catalogItemDomain.code = resultList[index].inheritCode;
            catalogItemDomain.version = resultList[index].inheritVersion;
            const catalogList = await catalogItemRepository.getRecord(em, catalogItemDomain);

            // 継承クラスのコード、バージョンを設定
            resultList.push(catalogList[0]);
            index++;
        }
        // 先頭の要素を削除
        resultList.splice(0, 1);

        // 取得した継承クラスコード、バージョンを返す
        return resultList.reverse();
    }

    /**
     * 対象テンプレートプロパティ取得
     * @param connection
     * @param code
     * @param version
     * @param keyName
     */
    private async getCodeObjectByTemplateProperty (connection: Connection, em: EntityManager, code: number, version: number, keyName: string): Promise<{}> {
        // 対象カタログを取得
        const catalogItemDomain = new CatalogItemDomain();
        catalogItemDomain.code = code;
        catalogItemDomain.version = version;
        const catalogItemRepository = new CatalogItemRepository(connection);
        const catalogList = await catalogItemRepository.getRecord(em, catalogItemDomain);
        if (catalogList.length <= 0) {
            // 対象カタログが存在しない場合
            throw new AppError(message.CATALOG_NOT_FOUND, ResponseCode.NOT_FOUND);
        }
        // 対象アイテムを取得
        const catalogInfo = catalogList[0];
        const itemDomain = new ItemTemplateDomain();
        itemDomain.catalogItemId = catalogInfo.id;
        const itemRepository = new ItemTemplateRepository(connection);
        const itemList = await itemRepository.getRecord(em, itemDomain, true);
        if (itemList.length <= 0) {
            // 対象アイテムが存在しない場合
            return null;
        }

        // 対象テンプレートを取得
        const itemInfo = itemList[0];
        const templateDomain = new TemplatePropertyDomain();
        templateDomain.itemTemplateId = itemInfo.id;
        templateDomain.keyName = keyName;
        const templateRepository = new TemplatePropertyRepository(connection);
        const templateList = await templateRepository.getRecord(em, templateDomain);
        if (templateList.length <= 0) {
            // 対象テンプレートが存在しない場合
            return null;
        }

        // Cmatixの場合
        const templateInfo = templateList[0];
        if (templateInfo.indexKey) {
            // Cmatrix情報を取得
            const cmatrixIndexDomain = new CmatrixIndexDomain();
            cmatrixIndexDomain.catalogItemId = catalogInfo.id;
            const cmatrixIndexRepository = new CmatrixIndexRepository(connection);
            const cmatrixList = await cmatrixIndexRepository.getRecord(em, cmatrixIndexDomain);
            for (const cmatrix of cmatrixList) {
                if (templateInfo.indexKey === cmatrix.indexKey) {
                    return {
                        index: cmatrix.indexKey,
                        value: cmatrix.value
                    };
                }
            }
        }
        return null;
    }

    /**
     * 対象Cmatrix取得
     * @param connection
     * @param em
     * @param catalogItemId
     * @param indeKey
     */
    private async getCmatrixIndex (connection: Connection, em: EntityManager, catalogItemId: number, indeKey: string): Promise<CmatrixIndexEntity> {
        // Cmatrix情報を取得
        const cmatrixIndexDomain = new CmatrixIndexDomain();
        cmatrixIndexDomain.catalogItemId = catalogItemId;
        cmatrixIndexDomain.indexKey = indeKey;
        const cmatrixIndexRepository = new CmatrixIndexRepository(connection);
        const cmatrixList = await cmatrixIndexRepository.getRecord(em, cmatrixIndexDomain);
        if (cmatrixList.length <= 0) {
            // 対象CMatrixが存在しない場合
            throw new AppError(message.CMATRIX_NOT_FOUND, ResponseCode.NOT_FOUND);
        }
        return cmatrixList[0];
    }

    /**
     * オブジェクト変換
     * @param connection
     * @param em
     * @param code
     * @param version
     * @param keyName
     * @param values
     * @param basedata
     */
    private async convertKeyValue (connection: Connection, em: EntityManager, code: number, version: number, keyName: string, values: any, basedata: any): Promise<{}> {
        if (values && Array.isArray(values)) {
            // 配列の場合
            if (values.length === 2 &&
                values[0].key === '_value' &&
                values[1].key === '_ver') {
                // 該当タイプを取得
                const templatePropertyEntity = await this.getTemplatePropertyByKeyName(connection, em, code, version, keyName);
                const type: string = templatePropertyEntity.type;
                if (type.indexOf('[]') >= 0) {
                    // コードオブジェクト配列の場合
                    return [
                        this.getCodeObject(values)
                    ];
                } else {
                    // コードオブジェクトの場合
                    return this.getCodeObject(values);
                }
            } else {
                // コードオブジェクト以外の場合

                // 該当タイプを取得
                const templatePropertyEntity = await this.getTemplatePropertyByKeyName(connection, em, code, version, keyName, values.length > 1);
                const type: string = templatePropertyEntity.type;
                if (type && (type === 'item' || type === 'item[]')) {
                    // item, item[]の場合、対象オブジェクトを取得
                    const templatePropertyList = await this.getTemplatePropertyListByItem(connection, em, templatePropertyEntity.itemTemplateId);

                    // 対象キーが配列の場合
                    let valueList: {}[] = [];
                    if (Array.isArray(basedata)) {
                        valueList = basedata;
                    }
                    let valueInfo: {} = null;
                    for (const value of values) {
                        for (const templateProperty of templatePropertyList) {
                            if (templateProperty.keyName === value.key) {
                                if (valueInfo === null) {
                                    valueInfo = {};
                                }
                                const keyValue = await this.convertKeyValue(connection, em, code, version, value.key, value.value, valueInfo[templateProperty.keyName]);
                                if (valueInfo[templateProperty.keyName] !== keyValue) {
                                    if (valueInfo[templateProperty.keyName]) {
                                        // item[] の場合、同じkeyNameに対してkeyValueを追加する
                                        valueInfo[templateProperty.keyName] = valueInfo[templateProperty.keyName].concat(keyValue);
                                    } else {
                                        valueInfo[templateProperty.keyName] = keyValue;
                                    }
                                }
                                break;
                            }
                        }
                    }
                    valueList.push(valueInfo);
                    const response = type === 'item' ? valueInfo : valueList;
                    return response;
                } else if (type && type === 'inner') {
                    // inner, inner[]の場合、対象オブジェクトを取得
                    const templatePropertyList = await this.getTemplatePropertyListByInner(connection, em, templatePropertyEntity.id);

                    // 対象キーが配列の場合
                    let valueInfo: {} = null;
                    for (const value of values) {
                        for (const templateProperty of templatePropertyList) {
                            if (templateProperty.keyName === value.key) {
                                if (valueInfo === null) {
                                    valueInfo = {};
                                }
                                valueInfo[templateProperty.keyName] = await this.convertKeyValue(connection, em, code, version, value.key, value.value, valueInfo[templateProperty.keyName]);

                                // カタログが指定されている場合、カタログのnsにcmatrixが含まれるならテンプレートにそれを追加
                                if (value.value && value.value.length === 2 &&
                                    value.value[0].key === '_value' &&
                                    value.value[1].key === '_ver') {
                                    await getCmatrixInfo(valueInfo, templateProperty);
                                }
                                break;
                            }
                        }
                    }
                    return valueInfo;
                } else if (type && type === 'inner[]') {
                    // inner, inner[]の場合、対象オブジェクトを取得
                    const templatePropertyList = await this.getTemplatePropertyListByInner(connection, em, templatePropertyEntity.id);

                    // 対象キーが配列の場合
                    let valueList: {}[] = [];
                    if (Array.isArray(basedata)) {
                        valueList = basedata;
                    }
                    let valueInfo: {} = null;
                    for (const value of values) {
                        for (const templateProperty of templatePropertyList) {
                            if (templateProperty.keyName === value.key) {
                                if (valueInfo === null) {
                                    valueInfo = {};
                                }
                                const keyValue = await this.convertKeyValue(connection, em, code, version, value.key, value.value, valueInfo[templateProperty.keyName]);
                                if (valueInfo[templateProperty.keyName] !== keyValue) {
                                    if (valueInfo[templateProperty.keyName]) {
                                        valueInfo[templateProperty.keyName] = valueInfo[templateProperty.keyName].concat(keyValue);
                                    } else {
                                        valueInfo[templateProperty.keyName] = keyValue;
                                    }
                                }
                                break;
                            }
                        }
                    }
                    valueList.push(valueInfo);
                    return valueList;
                }
            }
        }
        // 配列、オブジェクト以外の場合
        return values;

        /**
         * 対象カタログのnsにcmatrixが含まれる場合、cmatrixをテンプレートに追加する
         * @param valueInfo
         * @param templateProperty
         */
        async function getCmatrixInfo (valueInfo: {}, templateProperty: TemplatePropertyEntity) {
            // 元の値を保持
            const tempValueInfo = valueInfo[templateProperty.keyName];

            // 対象カタログを取得
            const catalogItemDomain = new CatalogItemDomain();
            catalogItemDomain.code = templateProperty.code;
            catalogItemDomain.version = templateProperty.version;
            const catalogItemRepository = new CatalogItemRepository(connection);
            const catalogList = await catalogItemRepository.getRecord(em, catalogItemDomain);
            if (catalogList.length <= 0) {
                // 対象カタログが存在しない場合
                throw new AppError(message.CATALOG_NOT_FOUND, ResponseCode.NOT_FOUND);
            }
            const catalogInfo = catalogList[0];

            // 対象ネームスペースを取得
            const nsDomain = new NameSpaceDomain();
            nsDomain.id = catalogInfo.nsId;
            const nsRepository = new NameSpaceRepository(connection);
            const nsInfo = await nsRepository.getRecordById(null, nsDomain);

            // nsにcmatrixが含まれる場合、Cmatrixをテンプレートに追加
            if (nsInfo.name.indexOf('/cmatrix') >= 0) {
                // Cmatrix情報を取得
                const cmatrixIndexDomain = new CmatrixIndexDomain();
                cmatrixIndexDomain.catalogItemId = catalogInfo.id;
                const cmatrixIndexRepository = new CmatrixIndexRepository(connection);
                const cmatrixList = await cmatrixIndexRepository.getRecord(em, cmatrixIndexDomain);
                valueInfo[templateProperty.keyName] = {
                    index: cmatrixList[0].indexKey,
                    value: tempValueInfo
                };
            }
        }
    }

    /**
     * 対象テンプレートプロパティリスト取得
     * @param connection
     * @param code
     * @param version
     */
    private async getTemplatePropertyList (connection: Connection, em: EntityManager, code: number, version: number): Promise<TemplatePropertyEntity[]> {
        // 対象カタログを取得
        const catalogItemDomain = new CatalogItemDomain();
        catalogItemDomain.code = code;
        catalogItemDomain.version = version;
        const catalogItemRepository = new CatalogItemRepository(connection);
        const catalogList = await catalogItemRepository.getRecord(em, catalogItemDomain);
        // 対象アイテムを取得
        const catalogInfo = catalogList[0];
        const itemDomain = new ItemTemplateDomain();
        itemDomain.catalogItemId = catalogInfo.id;
        const itemRepository = new ItemTemplateRepository(connection);
        const itemList = await itemRepository.getRecord(em, itemDomain, false);
        if (itemList.length <= 0) {
            // 対象アイテムが存在しない場合
            return [];
        }

        // 対象テンプレートを取得
        let templateList: TemplatePropertyEntity[] = [];
        for (const itemTemplate of itemList) {
            const templateDomain = new TemplatePropertyDomain();
            templateDomain.itemTemplateId = itemTemplate.id;
            const templateRepository = new TemplatePropertyRepository(connection);
            templateList = templateList.concat(await templateRepository.getRecord(em, templateDomain));
        }
        return templateList;
    }

    /**
     * 対象プロパティタイプ取得
     * @param connection
     * @param code
     * @param version
     * @param keyName
     */
    private async getTemplatePropertyByKeyName (connection: Connection, em: EntityManager, code: number, version: number, keyName: string, isObject?: boolean): Promise<TemplatePropertyEntity> {
        // カタログ情報を取得
        const catalogItemDomain = new CatalogItemDomain();
        catalogItemDomain.code = code;
        catalogItemDomain.version = version;
        const catalogItemRepository = new CatalogItemRepository(connection);
        const catalogItemList = await catalogItemRepository.getRecord(em, catalogItemDomain);

        // アイテムテンプレート情報を取得
        const catalogItemInfo = catalogItemList[0];
        const itemTemplateDomain = new ItemTemplateDomain();
        itemTemplateDomain.catalogItemId = catalogItemInfo.id;
        const itemTemplateRepository = new ItemTemplateRepository(connection);
        const itemTemplateList = await itemTemplateRepository.getRecord(em, itemTemplateDomain, false);
        // まずitemTemplateListの各itemTemplateに紐づくtemplatePropertyからkeyNameが一致するものを探す
        for (const itemTemplate of itemTemplateList) {
            // テンプレートプロパティ情報を取得
            const templatePropertyDomain = new TemplatePropertyDomain();
            templatePropertyDomain.itemTemplateId = itemTemplate.id;
            const templatePropertyRepository = new TemplatePropertyRepository(connection);
            const templatePropertyList = await templatePropertyRepository.getRecord(em, templatePropertyDomain);
            if (!templatePropertyList || templatePropertyList.length <= 0) {
                continue;
            }
            for (const templateProperty of templatePropertyList) {
                // 一致するキーが存在する場合
                if (templateProperty.keyName === keyName) {
                    return templateProperty;
                }
            }
        }
        // keyNameが一致するものがなかった場合、各templatePropertyについてプロパティ候補を取得しkeyNameが一致するものを探す
        for (const itemTemplate of itemTemplateList) {
            // テンプレートプロパティ情報を取得
            const templatePropertyDomain = new TemplatePropertyDomain();
            templatePropertyDomain.itemTemplateId = itemTemplate.id;
            const templatePropertyRepository = new TemplatePropertyRepository(connection);
            const templatePropertyList = await templatePropertyRepository.getRecord(em, templatePropertyDomain);
            if (!templatePropertyList || templatePropertyList.length <= 0) {
                continue;
            }
            // プロパティ候補選択を取得
            let list: TemplatePropertyEntity[] = [];
            for (const templateProperty of templatePropertyList) {
                const propertyCandidateDomain = new PropertyCandidateDomain();
                propertyCandidateDomain.templatePropertyId = templateProperty.id;
                const propertyCandidateRepository = new PropertyCandidateRepository(connection);
                const propertyCandidateList = await propertyCandidateRepository.getRecord(em, propertyCandidateDomain);
                for (const propertyCandidate of propertyCandidateList) {
                    if (propertyCandidate.code) {
                        list = list.concat(await this.getTemplatePropertyList(connection, em, propertyCandidate.code, propertyCandidate.version));
                    } else if (propertyCandidate.baseCode) {
                        list = list.concat(await this.getTemplatePropertyList(connection, em, propertyCandidate.baseCode, propertyCandidate.baseVersion));
                    }
                }
            }
            for (let templateIndex = 0; templateIndex < list.length; templateIndex++) {
                // 一致するキーが存在する場合
                if (list[templateIndex].keyName === keyName) {
                    if (isObject) {
                        // 対象がobjectで候補探索する場合は、typeがstring, number, booleanでないこと（Region-Rootアクターカタログでstatusが壊れるため）
                        if (!(list[templateIndex].type === 'string' || list[templateIndex].type === 'number' || list[templateIndex].type === 'boolean')) {
                            return list[templateIndex];
                        }
                    } else {
                        return list[templateIndex];
                    }
                }
            }
        }
        let templateProperEntity;
        // 該当プロパティが存在せず、継承クラスが存在する場合
        if (catalogItemInfo.inheritCode && catalogItemInfo.inheritVersion) {
            templateProperEntity = await this.getTemplatePropertyByKeyName(connection, em, catalogItemInfo.inheritCode, catalogItemInfo.inheritVersion, keyName, isObject);
        }
        return templateProperEntity;
    }

    /**
     * inner対象プロパティリスト取得
     * @param connection
     * @param em
     * @param templatePropertyId
     */
    private async getTemplatePropertyListByInner (connection: Connection, em: EntityManager, templatePropertyId: number): Promise<TemplatePropertyEntity[]> {
        // アイテムテンプレート情報を取得
        const itemTemplateDomain = new ItemTemplateDomain();
        itemTemplateDomain.templatePropertyId = templatePropertyId;
        const itemTemplateRepository = new ItemTemplateRepository(connection);
        const itemTemplateList = await itemTemplateRepository.getRecord(em, itemTemplateDomain, false);
        if (!itemTemplateList || itemTemplateList.length <= 0) {
            // アイテムテンプレート情報が存在しない場合
            return [];
        }
        let templateList: TemplatePropertyEntity[] = [];
        for (const itemTemplate of itemTemplateList) {
            // テンプレートプロパティ情報を取得
            const templatePropertyDomain = new TemplatePropertyDomain();
            templatePropertyDomain.itemTemplateId = itemTemplate.id;
            const templatePropertyRepository = new TemplatePropertyRepository(connection);
            const templatePropertyList = await templatePropertyRepository.getRecord(em, templatePropertyDomain);
            if (!templatePropertyList || templatePropertyList.length <= 0) {
                continue;
            }
            templateList = templateList.concat(templatePropertyList);
        }
        return templateList;
    }

    /**
     * item対象プロパティリスト取得
     * @param connection
     * @param em
     * @param itemTemplateId
     */
    private async getTemplatePropertyListByItem (connection: Connection, em: EntityManager, itemTemplateId: number): Promise<TemplatePropertyEntity[]> {
        // アイテムテンプレート情報を取得
        const itemTemplateDomain = new ItemTemplateDomain();
        itemTemplateDomain.id = itemTemplateId;
        const itemTemplateRepository = new ItemTemplateRepository(connection);
        const itemTemplateList = await itemTemplateRepository.getRecord(em, itemTemplateDomain, false);
        let templateList: TemplatePropertyEntity[] = [];
        // テンプレートプロパティ情報を取得
        const templatePropertyDomain = new TemplatePropertyDomain();
        templatePropertyDomain.itemTemplateId = itemTemplateList[0].id;
        const templatePropertyRepository = new TemplatePropertyRepository(connection);
        const templatePropertyList = await templatePropertyRepository.getRecord(em, templatePropertyDomain);
        templateList = templateList.concat(templatePropertyList);
        // プロパティ候補選択を取得
        for (const templateProperty of templatePropertyList) {
            const propertyCandidateDomain = new PropertyCandidateDomain();
            propertyCandidateDomain.templatePropertyId = templateProperty.id;
            const propertyCandidateRepository = new PropertyCandidateRepository(connection);
            const propertyCandidateList = await propertyCandidateRepository.getRecord(em, propertyCandidateDomain);
            for (const propertyCandidate of propertyCandidateList) {
                if (propertyCandidate.code) {
                    templateList = templateList.concat(await this.getTemplatePropertyList(connection, em, propertyCandidate.code, propertyCandidate.version));
                } else if (propertyCandidate.baseCode) {
                    templateList = templateList.concat(await this.getTemplatePropertyList(connection, em, propertyCandidate.baseCode, propertyCandidate.baseVersion));
                }
            }
        }

        // IDが重複しているデータを削除
        templateList.sort((a: TemplatePropertyEntity, b: TemplatePropertyEntity): number => {
            if (a.id > b.id) {
                return 1;
            } else {
                return -1;
            }
        });
        const filteredTemplateList = templateList.filter((element: TemplatePropertyEntity, index: number, self: TemplatePropertyEntity[]) => {
            const findIndex = self.findIndex((info: TemplatePropertyEntity) => {
                return info.id === element.id;
            });
            return findIndex === index;
        });
        return filteredTemplateList;
    }

    /**
     * 内部クラス取得
     * @param connection
     * @param em
     * @param templatePropertyId
     */
    private async getInnerName (connection: Connection, em: EntityManager, templatePropertyId: number): Promise<string> {
        // アイテムテンプレート情報を取得
        const itemTemplateDomain = new ItemTemplateDomain();
        itemTemplateDomain.templatePropertyId = templatePropertyId;
        const itemTemplateRepository = new ItemTemplateRepository(connection);
        const itemTemplateList = await itemTemplateRepository.getRecord(em, itemTemplateDomain, false);
        if (!itemTemplateList || itemTemplateList.length <= 0) {
            return null;
        }
        return itemTemplateList[0].innerName;
    }

    /**
     * カタログ属性情報を追加する
     * @param attribute
     * @param catalogItemId
     * @param code
     * @param operator
     * @param em
     * @param connection
     */
    private async insertAttribute (attribute: any, catalogItemId: number, code: number, operator: OperatorDomain, em: EntityManager, connection: Connection) {
        const catalogAttributeRepository = new CatalogItemAttributeRepository(connection);
        if (attribute.objects && attribute.objects.length > 0) {
            for (const object of attribute.objects) {
                const catalogAttributeObjectDomain = new CatalogItemAttributeDomain();
                catalogAttributeObjectDomain.catalogItemId = catalogItemId;
                catalogAttributeObjectDomain.catalogCode = code;
                catalogAttributeObjectDomain.type = 1;
                if (object.key) {
                    catalogAttributeObjectDomain.keyCode = object.key._value;
                    catalogAttributeObjectDomain.keyVersion = object.key._ver;
                }
                catalogAttributeObjectDomain.value = object.value ? JSON.stringify(object.value) : null;
                catalogAttributeObjectDomain.description = object.description ? object.description : null;
                catalogAttributeObjectDomain.updatedBy = operator.loginId;

                // カタログ属性情報を追加
                await catalogAttributeRepository.insertRecord(em, catalogAttributeObjectDomain);
            }
        }
        if (attribute.tags && attribute.tags.length > 0) {
            for (const tag of attribute.tags) {
                // nsの値からnsレコードのid取得
                const namespaceDomain = new NameSpaceDomain();
                namespaceDomain.name = tag.ns;
                const nameSpaceRepository = new NameSpaceRepository(connection);
                const nsId = await nameSpaceRepository.getNamespaceId(em, namespaceDomain);

                const catalogTagObjectDomain = new CatalogItemAttributeDomain();
                catalogTagObjectDomain.catalogItemId = catalogItemId;
                catalogTagObjectDomain.catalogCode = code;
                catalogTagObjectDomain.type = 2;
                catalogTagObjectDomain.nsId = nsId;
                catalogTagObjectDomain.value = tag.values ? JSON.stringify(tag.values) : null;
                catalogTagObjectDomain.updatedBy = operator.loginId;

                // カタログ属性情報を追加
                await catalogAttributeRepository.insertRecord(em, catalogTagObjectDomain);
            }
        }
    }

    /**
     * 検索サービスにデータを追加する
     * @param catalogItemId
     * @param code
     * @param catalog
     */
    private async insertSearchService (catalogItemId: number, code: number, catalog: {}) {
        const searchService = new SearchService();
        await searchService.updateRecord(catalogItemId, code, catalog['catalogItem'].description, catalog['catalogItem'].name);
    }

    /**
     * 検索サービスのデータを削除する
     * @param catalogId
     */
    private async deleteSearchService (catalogId: number) {
        const searchService = new SearchService();
        await searchService.deleteRecord(catalogId);
    }

    /**
     * カタログコード追加（ドキュメント・イベント・モノ）
     * @param template
     * @param ns
     * @param code
     * @param version
     */
    private async addCatalogCode (template: {}, ns: string, code: number, version: number): Promise<{}> {
        // ネームスペースとコードのインデックスからドキュメント・イベント・モノか判別
        if (/^catalog\/(model|built_in|ext\/.*)\/(document|event|thing).*/.test(ns) &&
            template['code'] &&
            template['code']['index'] &&
            ['2_1_2', '3_1_2', '4_1_2'].includes(template['code']['index'])) {
            // ドキュメント・イベント・モノならテンプレートにカタログコード追加
            if (!template['code']['value']) {
                template['code']['value'] = { _value: code, _ver: version };
            } else if (template['code']['value']['_value'] === code || (!template['code']['value']['_value'] && !template['code']['value']['_ver'])) {
                template['code']['value']['_value'] = code;
                template['code']['value']['_ver'] = version;
            }
        }
        return template;
    }
}
