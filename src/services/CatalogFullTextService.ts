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
import { Connection, InsertResult, UpdateResult } from 'typeorm';
import AppError from '../common/AppError';
import { ResponseCode } from '../common/ResponseCode';
import CatalogFullTextServiceDto from './dto/CatalogFullTextServiceDto';
import CatalogFullTextGetResDto, { CodeObjectDto } from '../resources/dto/CatalogFullTextGetResDto';
import CatalogFullTextPostResDto from '../resources/dto/CatalogFullTextPostResDto';
import CatalogFullTextPutResDto from '../resources/dto/CatalogFullTextPutResDto';
import CatalogFullTextDeleteResDto from '../resources/dto/CatalogFullTextDeleteResDto';
/* eslint-enable */
import SearchService from '../common/SearchService_Stub';
import CatalogItemDomain from '../domains/CatalogItemDomain';
import CatalogItemRepository from '../repositories/postgres/CatalogItemRepository';
import CatalogDomain from '../domains/CatalogDomain';
import CatalogRepository from '../repositories/postgres/CatalogRepository';
import Config from '../common/Config';
import NameSpaceDomain from '../domains/NameSpaceDomain';
import NameSpaceRepository from '../repositories/postgres/NameSpaceRepository';
const Message = Config.ReadConfig('./config/message.json');

/**
 * カタログ全文検索操作サービス
 */
export default class CatalogFullTextService {
    /**
     * カタログ全文検索取得
     * @param connection
     * @param dto
     */
    public async getCatalogFullText (connection: Connection, dto: CatalogFullTextServiceDto): Promise<{}> {
        // カタログ名の存在確認
        const catalogDomain = new CatalogDomain();
        const catalogRepository = new CatalogRepository(connection);
        const catalogInfoCount = await catalogRepository.getRecordCount(null, catalogDomain);
        if (catalogInfoCount <= 0) {
            // カタログ名が存在しない場合、エラーをthrow
            throw new AppError(Message.NOT_ACTIVATE, ResponseCode.UNAUTHORIZED);
        }

        const res: CatalogFullTextGetResDto = new CatalogFullTextGetResDto();

        // キーワード指定がある場合
        const keyword: string = dto.getKeyword();
        let searchResultList: number[] = [];
        if (keyword) {
            // 検索サービスからデータ取得
            const ret = await this.getSearchService(keyword);

            // 取得したデータからレスポンス及びコードのリストを生成
            if (ret && Number(ret['hits']['found']) > 0) {
                const list: {}[] = ret['hits']['hit'];
                for (let index = 0; index < list.length; index++) {
                    const codeObject = new CodeObjectDto();
                    codeObject.code = Number(list[index]['fields']['code']);
                    codeObject.version = null;
                    res.score.push(list[index]['fields']['_score']);
                    res.list.push(codeObject);
                    searchResultList.push(codeObject.code);
                }
            }
        }
        // ネームスペースで検索
        let nsList: string[] = dto.getNs();
        if (nsList && nsList.length > 0) {
            nsList = nsList.filter(ns => ns);
        }
        if (nsList && nsList.length > 0) {
            searchResultList = await this.searchByNs(searchResultList, nsList, connection, keyword, res);
        }
        // attributeで検索
        const attributeList: {}[] = dto.getAttribute();
        if (attributeList && attributeList.length > 0) {
            await this.searchByAttribute(attributeList, searchResultList, connection, keyword, nsList, res);
        }
        if (res.list.length <= 0) {
            // 対象カタログが存在しない場合、エラーをthrow
            throw new AppError(Message.CATALOG_NOT_FOUND, ResponseCode.NOT_FOUND);
        }

        // レスポンスを返す
        return res.getAsJson();
    }

    /**
     * 検索サービスからkeywordでデータを取得する
     * @param keyword
     */
    private async getSearchService (keyword: string) {
        const searchService = new SearchService();
        const ret = await searchService.getRecord(keyword);
        return ret;
    }

    /**
     * ネームスペースでカタログを検索する
     * @param searchResultList
     * @param nsList
     * @param connection
     * @param keyword
     * @param res
     */
    private async searchByNs (searchResultList: number[], nsList: string[], connection: Connection, keyword: string, res: CatalogFullTextGetResDto) {
        const catalogItemDomain = new CatalogItemDomain();
        catalogItemDomain.codeBySearch = searchResultList;
        catalogItemDomain.nsBySearch = nsList;
        const catalogItemRepository = new CatalogItemRepository(connection);
        const catalogList = await catalogItemRepository.getRecordByNs(null, catalogItemDomain);
        if (keyword) {
            const tempList: CodeObjectDto[] = [];
            const tempScore: number[] = [];
            searchResultList = [];
            for (let index = 0; index < catalogList.length; index++) {
                const listIndex: number = res.list.findIndex((info: CodeObjectDto) => {
                    if (info.code === catalogList[index].code) {
                        return true;
                    }
                });
                tempList.push(res.list[listIndex]);
                tempScore.push(res.score[listIndex]);
                searchResultList.push(res.list[listIndex].code);
            }
            res.list = tempList;
            res.score = tempScore;
        } else {
            for (let index = 0; index < catalogList.length; index++) {
                const codeObj: CodeObjectDto = new CodeObjectDto();
                codeObj.code = catalogList[index].code;
                res.list.push(codeObj);
                res.score.push(null);
            }
        }
        return searchResultList;
    }

    /**
     * 属性 (attribute) でカタログを検索する
     * @param attributeList
     * @param searchResultList
     * @param connection
     * @param keyword
     * @param nsList
     * @param res
     */
    private async searchByAttribute (attributeList: {}[], searchResultList: number[], connection: Connection, keyword: string, nsList: string[], res: CatalogFullTextGetResDto) {
        for (const attribute of attributeList) {
            const catalogItemDomain = new CatalogItemDomain();
            // attributeにobjectsもしくはtagsが含まれない場合
            if ((!attribute['objects'] || attribute['objects'].length <= 0) &&
                (!attribute['tags'] || attribute['tags'].length <= 0)) {
                // attributeに直接_valueがあれば、objects, tagsの中に該当コードを含む要素があるか調べる
                if (attribute['_value']) {
                    catalogItemDomain.attributeBySearch = attribute;
                } else {
                    continue;
                }
            }

            catalogItemDomain.codeBySearch = searchResultList;
            // attributeにtagsのみが存在する場合、tags[n].nsの値からns_idを取得しておく
            if ((!attribute['objects'] || attribute['objects'].length <= 0) &&
                (attribute['tags'] && attribute['tags'].length > 0)) {
                const nameSpaceDomain = new NameSpaceDomain();
                for (const tag of attribute['tags']) {
                    nameSpaceDomain.name = tag.ns;
                    const nameSpaceRepository = new NameSpaceRepository(connection);
                    const nsId = await nameSpaceRepository.getNamespaceId(null, nameSpaceDomain);
                    tag['nsId'] = nsId;
                }
            }

            catalogItemDomain.attributeBySearch = attribute;
            const catalogItemRepository = new CatalogItemRepository(connection);
            const catalogList = await catalogItemRepository.getRecordByAttribute(null, catalogItemDomain);
            if (keyword && nsList && nsList.length > 0) {
                const tempList: CodeObjectDto[] = [];
                const tempScore: number[] = [];
                for (let index = 0; index < catalogList.length; index++) {
                    const listIndex: number = res.list.findIndex((info: CodeObjectDto) => {
                        if (info.code === catalogList[index].code) {
                            return true;
                        }
                    });
                    if (listIndex >= 0) {
                        tempList.push(res.list[listIndex]);
                        tempScore.push(res.score[listIndex]);
                    }
                }
                res.list = tempList;
                res.score = tempScore;
            } else {
                for (let index = 0; index < catalogList.length; index++) {
                    const codeObj: CodeObjectDto = new CodeObjectDto();
                    codeObj.code = catalogList[index].code;
                    res.list.push(codeObj);
                    res.score.push(null);
                }
            }
        }
    }
}
