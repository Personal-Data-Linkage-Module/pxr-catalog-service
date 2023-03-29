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
import NameSpaceGetReqDto from './dto/NameSpaceGetReqDto';
import NameSpaceGetByNsIdReqDto from './dto/NameSpaceGetByNsIdReqDto';
import NameSpacePostReqDto from './dto/NameSpacePostReqDto';
import NameSpacePutReqDto from './dto/NameSpacePutReqDto';
import NameSpaceDeleteReqDto from './dto/NameSpaceDeleteReqDto';
/* eslint-enable */
import EnableSimpleBackPressure from './backpressure/EnableSimpleBackPressure';
import OperatorService from '../services/OperatorService';
import NameSpaceService from '../services/NameSpaceService';
import NameSpaceServiceDto from '../services/dto/NameSpaceServiceDto';
import NameSpaceGetValidator from './validator/NameSpaceGetValidator';
import NameSpaceGetByNsIdValidator from './validator/NameSpaceGetByNsIdValidator';
import NameSpacePostValidator from './validator/NameSpacePostValidator';
import NameSpacePutValidator from './validator/NameSpacePutValidator';
import NameSpaceDeleteValidator from './validator/NameSpaceDeleteValidator';
import { transformAndValidate } from 'class-transformer-validator';
import { getConnection } from 'typeorm';

// SDE-IMPL-REQUIRED REST API のベースルートを指定します。("/")をベースルートにする場合は引数なしとしてください。
@JsonController('/catalog')
export default class NameSpaceController {
    /**
     * ネームスペース取得
     * @param req
     * @param res
     */
    @Get('/ns')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    // SDE-MSA-PRIN 過負荷を回避する （MSA-PRIN-ID-02）
    @EnableSimpleBackPressure()
    @UseBefore(NameSpaceGetValidator)
    async getNameSpace (@Req() req: Request, @Res() res: Response): Promise<any> {
        // パラメータを取得
        let dto = await transformAndValidate(NameSpaceGetReqDto, req.query);
        dto = <NameSpacePostReqDto>dto;

        // オペレーターセッション情報を取得
        const operator = await OperatorService.authMe(req);

        // サービス層のDTOを生成
        const serviceDto = new NameSpaceServiceDto();
        serviceDto.setOperator(operator);
        serviceDto.setNs(dto.ns);

        // サービス層の処理を実行
        const service = new NameSpaceService();
        const ret = await service.getNameSpace(getConnection('postgres'), serviceDto);
        return ret;
    }

    /**
     * ネームスペース取得
     * @param req
     * @param res
     */
    @Get('/ns/:nsId')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    // SDE-MSA-PRIN 過負荷を回避する （MSA-PRIN-ID-02）
    @EnableSimpleBackPressure()
    @UseBefore(NameSpaceGetByNsIdValidator)
    async getNameSpaceByNsId (@Req() req: Request, @Res() res: Response): Promise<any> {
        // パラメータを取得
        const dto = await transformAndValidate(NameSpaceGetByNsIdReqDto, req.params);

        // オペレーターセッション情報を取得
        const operator = await OperatorService.authMe(req);

        // サービス層のDTOを生成
        const serviceDto = new NameSpaceServiceDto();
        serviceDto.setOperator(operator);
        serviceDto.setNsId(dto.nsId);

        // サービス層の処理を実行
        const service = new NameSpaceService();
        const ret = await service.getNameSpaceByNsId(getConnection('postgres'), serviceDto);
        return ret;
    }

    /**
     * ネームスペース追加
     * @param req
     * @param dto
     * @param res
     */
    @Post('/ns/model')
    @Post('/ns/built_in')
    @Post('/ns/ext')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(NameSpacePostValidator)
    async postNameSpace (@Req() req: Request, @Res() res: Response): Promise<any> {
        // パラメータを取得
        let dto = await transformAndValidate(NameSpacePostReqDto, req.body);
        dto = <NameSpacePostReqDto>dto;

        // オペレーターセッション情報を取得
        const operator = await OperatorService.authMe(req);

        // サービス層のDTOを生成
        const serviceDto = new NameSpaceServiceDto();
        serviceDto.setOperator(operator);
        serviceDto.setType(this.getTypeByURL(req.originalUrl));
        serviceDto.setNs(dto.ns);
        serviceDto.setDescription(dto.description);

        // サービス層の処理を実行
        const service = new NameSpaceService();
        const ret = await service.insertNameSpace(getConnection('postgres'), serviceDto);
        return ret;
    }

    /**
     * ネームスペース更新
     * @param req
     * @param dto
     * @param res
     */
    @Put('/ns/model/:nsId')
    @Put('/ns/built_in/:nsId')
    @Put('/ns/ext/:nsId')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(NameSpacePutValidator)
    async putNameSpace (@Req() req: Request, @Res() res: Response): Promise<any> {
        // パラメータを取得
        let dto = await transformAndValidate(NameSpacePutReqDto, req.body);
        dto = <NameSpacePutReqDto>dto;

        // オペレーターセッション情報を取得
        const operator = await OperatorService.authMe(req);

        // サービス層のDTOを生成
        const serviceDto = new NameSpaceServiceDto();
        serviceDto.setOperator(operator);
        serviceDto.setType(this.getTypeByURL(req.originalUrl));
        serviceDto.setNsId(Number(req.params['nsId']));
        serviceDto.setNs(dto.ns);
        serviceDto.setDescription(dto.description);

        // サービス層の処理を実行
        const service = new NameSpaceService();
        const ret = await service.updateNameSpace(getConnection('postgres'), serviceDto);
        return ret;
    }

    /**
     * ネームスペース削除
     * @param req
     * @param res
     */
    @Delete('/ns/model/:nsId')
    @Delete('/ns/built_in/:nsId')
    @Delete('/ns/ext/:nsId')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(NameSpaceDeleteValidator)
    async deleteNameSpace (@Req() req: Request, @Res() res: Response): Promise<any> {
        // パラメータを取得
        const dto = await transformAndValidate(NameSpaceDeleteReqDto, req.params);

        // オペレーターセッション情報を取得
        const operator = await OperatorService.authMe(req);

        // サービス層のDTOを生成
        const serviceDto = new NameSpaceServiceDto();
        serviceDto.setOperator(operator);
        serviceDto.setType(this.getTypeByURL(req.originalUrl));
        serviceDto.setNsId(dto.nsId);

        // サービス層の処理を実行
        const service = new NameSpaceService();
        const ret = await service.deleteNameSpace(getConnection('postgres'), serviceDto);
        return ret;
    }

    /**
     * URLから該当タイプを設定
     * @param url
     */
    private getTypeByURL (url: string): string {
        if (url.indexOf('/model') >= 0) {
            return 'model';
        }
        if (url.indexOf('/built_in') >= 0) {
            return 'built_in';
        }
        return 'ext';
    }
}
