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

// SDE-IMPL-REQUIRED 本ファイルをコピーして外部サービスに公開する REST API インタフェースを定義します。

/* eslint-disable */
import { Request, Response } from 'express';
import {
    JsonController, Put, Body, Header, Res, Req, UseBefore, Get, Post, Delete
} from 'routing-controllers';
import CatalogFullTextGetReqDto from './dto/CatalogFullTextGetReqDto';
// import CatalogFullTextPostReqDto from './dto/CatalogFullTextPostReqDto';
// import CatalogFullTextPutReqDto from './dto/CatalogFullTextPutReqDto';
// import CatalogFullTextDeleteReqDto from './dto/CatalogFullTextDeleteReqDto';
/* eslint-enable */
import EnableSimpleBackPressure from './backpressure/EnableSimpleBackPressure';
import OperatorService from '../services/OperatorService';
import CatalogFullTextService from '../services/CatalogFullTextService';
import CatalogFullTextServiceDto from '../services/dto/CatalogFullTextServiceDto';
import CatalogFullTextGetValidator from './validator/CatalogFullTextGetValidator';
// import CatalogFullTextPostValidator from './validator/CatalogFullTextPostValidator';
// import CatalogFullTextPutValidator from './validator/CatalogFullTextPutValidator';
// import CatalogFullTextDeleteValidator from './validator/CatalogFullTextDeleteValidator';
import { transformAndValidate } from 'class-transformer-validator';
import { getConnection } from 'typeorm';

// SDE-IMPL-REQUIRED REST API のベースルートを指定します。("/")をベースルートにする場合は引数なしとしてください。
@JsonController('/catalog')
export default class CatalogFullTextController {
    /**
     * カタログ全文検索
     * @param req
     * @param dto
     * @param res
     */
    @Post('/text')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    // SDE-MSA-PRIN 過負荷を回避する （MSA-PRIN-ID-02）
    @EnableSimpleBackPressure()
    @UseBefore(CatalogFullTextGetValidator)
    async getCatalogFullText (@Req() req: Request, @Res() res: Response): Promise<any> {
        // パラメータを取得
        let dto = await transformAndValidate(CatalogFullTextGetReqDto, req.body);
        dto = <CatalogFullTextGetReqDto>dto;

        // オペレーターセッション情報を取得
        const operator = await OperatorService.authMe(req);

        // サービス層のDTOを生成
        const serviceDto = new CatalogFullTextServiceDto();
        serviceDto.setOperator(operator);
        serviceDto.setKeyword(dto.keyword);
        serviceDto.setNs(dto.namespace);
        serviceDto.setAttribute(dto.attribute);

        // サービス層の処理を実行
        const service = new CatalogFullTextService();
        const ret = await service.getCatalogFullText(getConnection('postgres'), serviceDto);
        return ret;
    }

    /**
     * カタログ全文検索テキスト登録
     * @param req
     * @param dto
     * @param res
     */
    /*
    @Post('/text')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(CatalogFullTextPostValidator)
    async postCatalogFullText (@Req() req: Request, @Body() dto: CatalogFullTextPostReqDto, @Res() res: Response): Promise<any> {
        let ret: any = null;
        try {
            // パラメータを取得
            let dto = await transformAndValidate(CatalogFullTextPostReqDto, req.body);
            dto = <CatalogFullTextPostReqDto>dto;

            // オペレーターセッション情報を取得
            const operator = await OperatorService.authMe(req);

            // サービス層のDTOを生成
            const serviceDto = new CatalogFullTextServiceDto();
            serviceDto.setOperator(operator);
            serviceDto.setId(dto.id);
            serviceDto.setCode(dto.code);
            serviceDto.setDescription(dto.description);
            serviceDto.setName(dto.name);

            // サービス層の処理を実行
            const service = new CatalogFullTextService();
            ret = await service.insertCatalogFullText(serviceDto);
        } finally {
            // DB切断
            // await db.disconnect();
        }
        return ret;
    }
    */

    /**
     * カタログ全文検索テキスト更新
     * @param req
     * @param dto
     * @param res
     */
    /*
    @Put('/text/:code')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(CatalogFullTextPutValidator)
    async putCatalogFullText (@Req() req: Request, @Body() dto: CatalogFullTextPutReqDto, @Res() res: Response): Promise<any> {
        let ret: any = null;
        try {
            // パラメータを取得
            let dto = await transformAndValidate(CatalogFullTextPutReqDto, req.body);
            dto = <CatalogFullTextPutReqDto>dto;

            // オペレーターセッション情報を取得
            const operator = await OperatorService.authMe(req);

            // サービス層のDTOを生成
            const serviceDto = new CatalogFullTextServiceDto();
            serviceDto.setOperator(operator);
            serviceDto.setId(dto.id);
            serviceDto.setCode(dto.code);
            serviceDto.setDescription(dto.description);
            serviceDto.setName(dto.name);

            // サービス層の処理を実行
            const service = new CatalogFullTextService();
            ret = await service.updateCatalogFullText(serviceDto);
        } finally {
            // DB切断
            // await db.disconnect();
        }
        return ret;
    }
    */

    /**
     * カタログ全文検索テキスト削除
     * @param req
     * @param dto
     * @param res
     */
    /*
    @Delete('/text/:code')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(CatalogFullTextDeleteValidator)
    async deleteCatalogFullText (@Req() req: Request, @Res() res: Response): Promise<any> {
        let ret: any = null;
        try {
            // パラメータを取得
            const dto = await transformAndValidate(CatalogFullTextDeleteReqDto, req.params);

            // オペレーターセッション情報を取得
            const operator = await OperatorService.authMe(req);

            // サービス層のDTOを生成
            const serviceDto = new CatalogFullTextServiceDto();
            serviceDto.setOperator(operator);
            serviceDto.setId(dto.code);

            // サービス層の処理を実行
            const service = new CatalogFullTextService();
            ret = await service.deleteCatalogFullText(serviceDto);
        } finally {
            // DB切断
            // await db.disconnect();
        }
        return ret;
    }
    */
}
