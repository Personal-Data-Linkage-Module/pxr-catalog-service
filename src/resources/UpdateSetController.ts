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
/* eslint-enable */
import EnableSimpleBackPressure from './backpressure/EnableSimpleBackPressure';
import OperatorService from '../services/OperatorService';
import { transformAndValidate } from 'class-transformer-validator';
import UpdateSetSearchGetValidator from './validator/UpdateSetSearchGetValidator';
import UpdateSetSearchGetReqDto from './dto/UpdateSetSearchGetReqDto';
import UpdateSetSearchRequestGetValidator from './validator/UpdateSetSearchRequestGetValidator';
import UpdateSetSearchApprovalGetValidator from './validator/UpdateSetSearchApprovalGetValidator';
import UpdateSetRegisterPostReqDto from './dto/UpdateSetRegisterPostReqDto';
import UpdateSetRegisterPostValidator from './validator/UpdateSetRegisterPostValidator';
import UpdateSetRegisterPutReqDto from './dto/UpdateSetRegisterPutReqDto';
import UpdateSetRegisterPutValidator from './validator/UpdateSetRegisterPutValidator';
import UpdateSetDeletePostReqDto from './dto/UpdateSetDeletePostReqDto';
import UpdateSetDeletePostValidator from './validator/UpdateSetDeletePostValidator';
import UpdateSetApprovalPostValidator from './validator/UpdateSetApprovalPostValidator';
import UpdateSetApprovalPostReqDto from './dto/UpdateSetApprovalPostReqDto';
import UpdateSetServiceDto from '../services/dto/UpdateSetServiceDto';
import UpdateSetService from '../services/UpdateSetService';
import UpdateSetRequestPostReqDto from './dto/UpdateSetRequestPostReqDto';
import UpdateSetRequestPostValidator from './validator/UpdateSetRequestPostValidator';
import { getConnection } from 'typeorm';

// SDE-IMPL-REQUIRED REST API のベースルートを指定します。("/")をベースルートにする場合は引数なしとしてください。
@JsonController('/catalog/updateSet')
export default class UpdateSetController {
    /**
     * 変更セット情報取得
     * @param req
     * @param res
     */
    @Get('/search/info/:id')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    // SDE-MSA-PRIN 過負荷を回避する （MSA-PRIN-ID-02）
    @EnableSimpleBackPressure()
    @UseBefore(UpdateSetSearchGetValidator)
    async getUpdateSetById (@Req() req: Request, @Res() res: Response): Promise<any> {
        // パラメータを取得
        const dto = await transformAndValidate(UpdateSetSearchGetReqDto, req.params);

        // オペレーターセッション情報を取得
        const operator = await OperatorService.authMe(req);

        // サービス層のDTOを生成
        const serviceDto = new UpdateSetServiceDto();
        serviceDto.setOperator(operator);
        serviceDto.setUpdateSetId(dto.id);

        // サービス層の処理を実行
        const service = new UpdateSetService();
        const ret = await service.getUpdateSetById(getConnection('postgres'), serviceDto);
        return ret;
    }

    /**
     * 未承認変更セットリスト取得
     * @param req
     * @param res
     */
    @Get('/search/request')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    // SDE-MSA-PRIN 過負荷を回避する （MSA-PRIN-ID-02）
    @EnableSimpleBackPressure()
    @UseBefore(UpdateSetSearchRequestGetValidator)
    async getUpdateSetRequest (@Req() req: Request, @Res() res: Response): Promise<any> {
        // オペレーターセッション情報を取得
        const operator = await OperatorService.authMe(req);

        // サービス層のDTOを生成
        const serviceDto = new UpdateSetServiceDto();
        serviceDto.setOperator(operator);

        // サービス層の処理を実行
        const service = new UpdateSetService();
        const ret = await service.getUpdateSetRequest(getConnection('postgres'), serviceDto);
        return ret;
    }

    /**
     * 承認済変更セットリスト取得
     * @param req
     * @param res
     */
    @Get('/search/approval')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    // SDE-MSA-PRIN 過負荷を回避する （MSA-PRIN-ID-02）
    @EnableSimpleBackPressure()
    @UseBefore(UpdateSetSearchApprovalGetValidator)
    async getUpdateSetApproval (@Req() req: Request, @Res() res: Response): Promise<any> {
        // オペレーターセッション情報を取得
        const operator = await OperatorService.authMe(req);

        // サービス層のDTOを生成
        const serviceDto = new UpdateSetServiceDto();
        serviceDto.setOperator(operator);

        // サービス層の処理を実行
        const service = new UpdateSetService();
        const ret = await service.getUpdateSetApproval(getConnection('postgres'), serviceDto);
        return ret;
    }

    /**
     * 変更セット登録
     * @param req
     * @param res
     */
    @Post('/register')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    // SDE-MSA-PRIN 過負荷を回避する （MSA-PRIN-ID-02）
    @EnableSimpleBackPressure()
    @UseBefore(UpdateSetRegisterPostValidator)
    async insertUpdateSet (@Req() req: Request, @Res() res: Response): Promise<any> {
        // パラメータを取得
        let dto = await transformAndValidate(UpdateSetRegisterPostReqDto, req.body);
        dto = <UpdateSetRegisterPostReqDto>dto;

        // オペレーターセッション情報を取得
        const operator = await OperatorService.authMe(req);

        // サービス層のDTOを生成
        const serviceDto = new UpdateSetServiceDto();
        serviceDto.setOperator(operator);
        serviceDto.setName(dto.name);
        serviceDto.setDescription(dto.description);
        serviceDto.setType(dto.type);
        serviceDto.setNsList(dto.ns);
        serviceDto.setCatalogList(dto.catalog);
        serviceDto.setAttributeList(dto.attribute);
        serviceDto.setAppendix(dto.appendix);

        // サービス層の処理を実行
        const service = new UpdateSetService();
        const ret = await service.insertUpdateSet(getConnection('postgres'), serviceDto);
        return ret;
    }

    /**
     * 変更セット登録変更
     * @param req
     * @param res
     */
    @Put('/register/:id')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    // SDE-MSA-PRIN 過負荷を回避する （MSA-PRIN-ID-02）
    @EnableSimpleBackPressure()
    @UseBefore(UpdateSetRegisterPutValidator)
    async updateUpdateSet (@Req() req: Request, @Res() res: Response): Promise<any> {
        // body, paramsを統合
        const data = Object.assign(req.body, req.params);

        // パラメータを取得
        let dto = await transformAndValidate(UpdateSetRegisterPutReqDto, data);
        dto = <UpdateSetRegisterPutReqDto>dto;

        // オペレーターセッション情報を取得
        const operator = await OperatorService.authMe(req);

        // サービス層のDTOを生成
        const serviceDto = new UpdateSetServiceDto();
        serviceDto.setOperator(operator);
        serviceDto.setUpdateSetId(dto.id);
        serviceDto.setName(dto.name);
        serviceDto.setDescription(dto.description);
        serviceDto.setType(dto.type);
        serviceDto.setNsList(dto.ns);
        serviceDto.setCatalogList(dto.catalog);
        serviceDto.setAttributeList(dto.attribute);
        serviceDto.setAppendix(dto.appendix);

        // サービス層の処理を実行
        const service = new UpdateSetService();
        const ret = await service.updateUpdateSet(getConnection('postgres'), serviceDto);
        return ret;
    }

    /**
     * 変更セット登録削除
     * @param req
     * @param res
     */
    @Delete('/register/:id')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    // SDE-MSA-PRIN 過負荷を回避する （MSA-PRIN-ID-02）
    @EnableSimpleBackPressure()
    @UseBefore(UpdateSetDeletePostValidator)
    async cancelUpdateSet (@Req() req: Request, @Res() res: Response): Promise<any> {
        // パラメータを取得
        const dto = await transformAndValidate(UpdateSetDeletePostReqDto, req.params);

        // オペレーターセッション情報を取得
        const operator = await OperatorService.authMe(req);

        // サービス層のDTOを生成
        const serviceDto = new UpdateSetServiceDto();
        serviceDto.setOperator(operator);
        serviceDto.setUpdateSetId(dto.id);

        // サービス層の処理を実行
        const service = new UpdateSetService();
        const ret = await service.deleteUpdateSet(getConnection('postgres'), serviceDto);
        return ret;
    }

    /**
     * 変更セット申請
     * @param req
     * @param res
     */
    @Post('/request')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    // SDE-MSA-PRIN 過負荷を回避する （MSA-PRIN-ID-02）
    @EnableSimpleBackPressure()
    @UseBefore(UpdateSetRequestPostValidator)
    async requestUpdateSet (@Req() req: Request, @Res() res: Response): Promise<any> {
        // パラメータを取得
        let dto = await transformAndValidate(UpdateSetRequestPostReqDto, req.body);
        dto = <UpdateSetRequestPostReqDto>dto;

        // オペレーターセッション情報を取得
        const operator = await OperatorService.authMe(req);

        // サービス層のDTOを生成
        const serviceDto = new UpdateSetServiceDto();
        serviceDto.setOperator(operator);
        serviceDto.setUpdateSetId(dto.id);
        serviceDto.setApprovalActor(dto.approvalActor);

        // サービス層の処理を実行
        const service = new UpdateSetService();
        const ret = await service.requestUpdateSet(getConnection('postgres'), serviceDto);
        return ret;
    }

    /**
     * 変更セット承認
     * @param req
     * @param res
     */
    @Post('/approval/:id')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    // SDE-MSA-PRIN 過負荷を回避する （MSA-PRIN-ID-02）
    @EnableSimpleBackPressure()
    @UseBefore(UpdateSetApprovalPostValidator)
    async approvalUpdateSet (@Req() req: Request, @Res() res: Response): Promise<any> {
        // body, paramsを統合
        const data = Object.assign(req.body, req.params);

        // パラメータを取得
        let dto = await transformAndValidate(UpdateSetApprovalPostReqDto, data);
        dto = <UpdateSetApprovalPostReqDto>dto;

        // オペレーターセッション情報を取得
        const operator = await OperatorService.authMe(req);

        // サービス層のDTOを生成
        const serviceDto = new UpdateSetServiceDto();
        serviceDto.setOperator(operator);
        serviceDto.setUpdateSetId(dto.id);
        serviceDto.setStatus(dto.status);
        serviceDto.setComment(dto.comment);

        // サービス層の処理を実行
        const service = new UpdateSetService();
        const ret = await service.approvalUpdateSet(getConnection('postgres'), serviceDto);
        return ret;
    }
}
