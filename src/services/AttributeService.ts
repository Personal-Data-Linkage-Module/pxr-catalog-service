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
import Config from '../common/Config';
import CatalogService from './CatalogService';
import CatalogServiceDto from './dto/CatalogServiceDto';
/* eslint-enable */

/**
 * カタログ操作サービス
 */
export default class AttributeService {
    /**
     * 属性更新
     * @param connection
     * @param dto
     */
    public async putAttribute (connection: Connection, em: EntityManager, dto: CatalogServiceDto): Promise<{}> {
        // リクエストのコードに基づく最新のカタログを取得
        const catalogService = new CatalogService();
        const getCatalogServiceDto = new CatalogServiceDto();
        getCatalogServiceDto.setCode(dto.getCode());
        getCatalogServiceDto.setOperator(dto.getOperator());
        const catalog = await catalogService.getCatalogByCodeVersion(connection, em, getCatalogServiceDto);
        // カタログ更新用に整形
        const prop = catalog['prop'] && Array.isArray(catalog['prop']) ? catalog['prop'].filter(ele => !ele['isInherit']) : null;
        catalog['template']['prop'] = prop;
        catalog['template']['value'] = catalog['value'];
        // 取得したカタログの attribute をリクエスト.attribute で置き換える
        catalog['attribute'] = dto.getCatalog()['attribute'];
        const putCatalogServiceDto = new CatalogServiceDto();
        putCatalogServiceDto.setOperator(dto.getOperator());
        putCatalogServiceDto.setCode(dto.getCode());
        putCatalogServiceDto.setCatalog(catalog);
        putCatalogServiceDto.setVersionUpFlag(false);
        // attribute を置換したカタログを使用して、カタログサービス カタログ更新 API を versionUpFlag = false で呼び出す
        const updateCatalog = await catalogService.updateCatalog(connection, em, putCatalogServiceDto);

        return updateCatalog;
    }
}
