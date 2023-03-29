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
import CatalogCodeScopeGetByTypeReqDto from './dto/CatalogCodeScopeGetByTypeReqDto';
import CatalogCodeScopePostReqDto from './dto/CatalogCodeScopePostReqDto';
import CatalogCodeScopePutReqDto from './dto/CatalogCodeScopePutReqDto';
import CatalogCodeScopeDeleteReqDto from './dto/CatalogCodeScopeDeleteReqDto';
/* eslint-enable */
import EnableSimpleBackPressure from './backpressure/EnableSimpleBackPressure';
import OperatorService from '../services/OperatorService';
import CatalogCodeScopeService from '../services/CatalogCodeScopeService';
import CatalogCodeScopeServiceDto from '../services/dto/CatalogCodeScopeServiceDto';
import CatalogCodeScopeGetValidator from './validator/CatalogCodeScopeGetValidator';
import CatalogCodeScopeGetByTypeValidator from './validator/CatalogCodeScopeGetByTypeValidator';
import CatalogCodeScopePostValidator from './validator/CatalogCodeScopePostValidator';
import CatalogCodeScopePutValidator from './validator/CatalogCodeScopePutValidator';
import CatalogCodeScopeDeleteValidator from './validator/CatalogCodeScopeDeleteValidator';
import { transformAndValidate } from 'class-transformer-validator';
import { getConnection } from 'typeorm';

// SDE-IMPL-REQUIRED REST API のベースルートを指定します。("/")をベースルートにする場合は引数なしとしてください。
@JsonController('/catalog')
export default class CatalogCodeScopeController {
    /**
     * カタログコード範囲取得
     * @param req
     * @param dto
     * @param res
     */
    @Get('/code')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    // SDE-MSA-PRIN 過負荷を回避する （MSA-PRIN-ID-02）
    @EnableSimpleBackPressure()
    @UseBefore(CatalogCodeScopeGetValidator)
    async getCatalogCodeScope (@Req() req: Request, @Res() res: Response): Promise<any> {
        // オペレーターセッション情報を取得
        const operator = await OperatorService.authMe(req);

        // サービス層のDTOを生成
        const serviceDto = new CatalogCodeScopeServiceDto();
        serviceDto.setOperator(operator);

        // サービス層の処理を実行
        const service = new CatalogCodeScopeService();
        const ret = await service.getCatalogCodeScope(getConnection('postgres'), serviceDto);
        return ret;
    }

    /**
     * カタログコード範囲取得
     * @param req
     * @param dto
     * @param res
     */
    @Get('/code/:type')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    // SDE-MSA-PRIN 過負荷を回避する （MSA-PRIN-ID-02）
    @EnableSimpleBackPressure()
    @UseBefore(CatalogCodeScopeGetByTypeValidator)
    async getCatalogCodeScopeByType (@Req() req: Request, @Res() res: Response): Promise<any> {
        // パラメータを取得
        const dto = await transformAndValidate(CatalogCodeScopeGetByTypeReqDto, req.params);

        // オペレーターセッション情報を取得
        const operator = await OperatorService.authMe(req);

        // サービス層のDTOを生成
        const serviceDto = new CatalogCodeScopeServiceDto();
        serviceDto.setOperator(operator);
        serviceDto.setType(dto.type);

        // サービス層の処理を実行
        const service = new CatalogCodeScopeService();
        const ret = await service.getCatalogCodeScopeByType(getConnection('postgres'), serviceDto);
        return ret;
    }

    /**
     * カタログコード範囲追加
     * @param req
     * @param dto
     * @param res
     */
    @Post('/code')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(CatalogCodeScopePostValidator)
    async postCatalogCodeScope (@Req() req: Request, @Res() res: Response): Promise<any> {
        // パラメータを取得
        let dto = await transformAndValidate(CatalogCodeScopePostReqDto, req.body);
        dto = <CatalogCodeScopePostReqDto>dto;

        // オペレーターセッション情報を取得
        const operator = await OperatorService.authMe(req);

        // サービス層のDTOを生成
        const serviceDto = new CatalogCodeScopeServiceDto();
        serviceDto.setOperator(operator);
        serviceDto.setType(dto.type);
        serviceDto.setStartCode(dto.start_code);
        serviceDto.setEndCode(dto.end_code);

        // サービス層の処理を実行
        const service = new CatalogCodeScopeService();
        const ret = await service.insertCatalogCodeScope(getConnection('postgres'), serviceDto);
        return ret;
    }

    /**
     * カタログコード範囲更新
     * @param req
     * @param dto
     * @param res
     */
    @Put('/code/:id')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(CatalogCodeScopePutValidator)
    async putCatalogCodeScope (@Req() req: Request, @Res() res: Response): Promise<any> {
        // パラメータを取得
        let dto = await transformAndValidate(CatalogCodeScopePutReqDto, req.body);
        dto = <CatalogCodeScopePutReqDto>dto;

        // オペレーターセッション情報を取得
        const operator = await OperatorService.authMe(req);

        // サービス層のDTOを生成
        const serviceDto = new CatalogCodeScopeServiceDto();
        serviceDto.setOperator(operator);
        serviceDto.setId(Number(req.params['id']));
        serviceDto.setType(dto.type);
        serviceDto.setStartCode(dto.start_code);
        serviceDto.setEndCode(dto.end_code);

        // サービス層の処理を実行
        const service = new CatalogCodeScopeService();
        const ret = await service.updateCatalogCodeScope(getConnection('postgres'), serviceDto);
        return ret;
    }

    /**
     * カタログコード範囲削除
     * @param req
     * @param dto
     * @param res
     */
    @Delete('/code/:id')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(CatalogCodeScopeDeleteValidator)
    async deleteCatalogCodeScope (@Req() req: Request, @Res() res: Response): Promise<any> {
        // パラメータを取得
        const dto = await transformAndValidate(CatalogCodeScopeDeleteReqDto, req.params);

        // オペレーターセッション情報を取得
        const operator = await OperatorService.authMe(req);

        // サービス層のDTOを生成
        const serviceDto = new CatalogCodeScopeServiceDto();
        serviceDto.setOperator(operator);
        serviceDto.setId(dto.id);

        // サービス層の処理を実行
        const service = new CatalogCodeScopeService();
        const ret = await service.deleteCatalogCodeScope(getConnection('postgres'), serviceDto);
        return ret;
    }
}
