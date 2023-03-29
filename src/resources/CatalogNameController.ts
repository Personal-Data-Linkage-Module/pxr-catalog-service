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
import CatalogNameGetReqDto from './dto/CatalogNameGetReqDto';
import CatalogNamePostReqDto from './dto/CatalogNamePostReqDto';
import CatalogNamePutReqDto from './dto/CatalogNamePutReqDto';
/* eslint-enable */
import EnableSimpleBackPressure from './backpressure/EnableSimpleBackPressure';
import OperatorService from '../services/OperatorService';
import CatalogNameService from '../services/CatalogNameService';
import CatalogNameServiceDto from '../services/dto/CatalogNameServiceDto';
import CatalogNameGetValidator from './validator/CatalogNameGetValidator';
import CatalogNamePostValidator from './validator/CatalogNamePostValidator';
import CatalogNamePutValidator from './validator/CatalogNamePutValidator';
import { transformAndValidate } from 'class-transformer-validator';
import { getConnection } from 'typeorm';

// SDE-IMPL-REQUIRED REST API のベースルートを指定します。("/")をベースルートにする場合は引数なしとしてください。
@JsonController('/catalog')
export default class CatalogNameController {
    /**
     * カタログ名称取得
     * @param req
     * @param res
     */
    @Get('/name')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    // SDE-MSA-PRIN 過負荷を回避する （MSA-PRIN-ID-02）
    @EnableSimpleBackPressure()
    @UseBefore(CatalogNameGetValidator)
    async getCatalogName (@Req() req: Request, @Res() res: Response): Promise<any> {
        // オペレーターセッション情報を取得
        const operator = await OperatorService.authMe(req);

        // サービス層のDTOを生成
        const serviceDto = new CatalogNameServiceDto();
        serviceDto.setOperator(operator);

        // サービス層の処理を実行
        const service = new CatalogNameService();
        const ret = await service.getCatalogName(getConnection('postgres'), serviceDto);
        return ret;
    }

    /**
     * アクティベート
     * @param req
     * @param dto
     * @param res
     */
    @Post('/name')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(CatalogNamePostValidator)
    async postCatalogName (@Req() req: Request, @Res() res: Response): Promise<any> {
        // パラメータを取得
        let dto = await transformAndValidate(CatalogNamePostReqDto, req.body);
        dto = <CatalogNamePostReqDto>dto;

        // オペレーターセッション情報を取得
        const operator = await OperatorService.authMe(req);

        // サービス層のDTOを生成
        const serviceDto = new CatalogNameServiceDto();
        serviceDto.setOperator(operator);
        serviceDto.setName(dto.name);
        serviceDto.setDescription(dto.description);
        serviceDto.setExtName(dto.ext_name);

        // サービス層の処理を実行
        const service = new CatalogNameService();
        const ret = await service.insertCatalogName(getConnection('postgres'), serviceDto);
        return ret;
    }

    /**
     * カタログ名称更新
     * @param req
     * @param dto
     * @param res
     */
    @Put('/name')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(CatalogNamePutValidator)
    async putCatalogName (@Req() req: Request, @Res() res: Response): Promise<any> {
        // パラメータを取得
        let dto = await transformAndValidate(CatalogNamePutReqDto, req.body);
        dto = <CatalogNamePutReqDto>dto;

        // オペレーターセッション情報を取得
        const operator = await OperatorService.authMe(req);

        // サービス層のDTOを生成
        const serviceDto = new CatalogNameServiceDto();
        serviceDto.setOperator(operator);
        serviceDto.setName(dto.name);
        serviceDto.setDescription(dto.description);
        serviceDto.setExtName(dto.ext_name);

        // サービス層の処理を実行
        const service = new CatalogNameService();
        const ret = await service.updateCatalogName(getConnection('postgres'), serviceDto);
        return ret;
    }
}
