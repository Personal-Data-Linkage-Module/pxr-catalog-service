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
import AppError from '../common/AppError';
import { ResponseCode } from '../common/ResponseCode';
import Config from '../common/Config';
import AttributePutReqDto from './dto/AttributePutReqDto';
/* eslint-enable */
import EnableSimpleBackPressure from './backpressure/EnableSimpleBackPressure';
import OperatorDomain from '../domains/OperatorDomain';
import OperatorService from '../services/OperatorService';
import AttributeService from '../services/AttributeService';
import CatalogServiceDto from '../services/dto/CatalogServiceDto';
import AttributePutValidator from './validator/AttributePutValidator';
import { transformAndValidate } from 'class-transformer-validator';
import { getConnection } from 'typeorm';

const message = Config.ReadConfig('./config/message.json');

// SDE-IMPL-REQUIRED REST API のベースルートを指定します。("/")をベースルートにする場合は引数なしとしてください。
@JsonController('/catalog')
export default class AttributeController {
    /**
     * 属性更新
     * @param req
     * @param dto
     * @param res
     */
    @Put('/attribute')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    // SDE-MSA-PRIN 過負荷を回避する （MSA-PRIN-ID-02）
    @EnableSimpleBackPressure()
    @UseBefore(AttributePutValidator)
    async updateAttribute (@Req() req: Request, @Res() res: Response): Promise<any> {
        // パラメータを取得
        let dto = await transformAndValidate(AttributePutReqDto, req.body);
        dto = <AttributePutReqDto>dto;

        // オペレーターセッション情報を取得
        const operator = await OperatorService.authMe(req);

        // オペレータータイプが運営メンバー以外の場合はエラー
        const ignoreOperatorTypelist = [OperatorDomain.TYPE_PERSONAL_NUMBER, OperatorDomain.TYPE_WORKFLOW_NUMBER, OperatorDomain.TYPE_APPLICATION_NUMBER];
        if (ignoreOperatorTypelist.includes(operator.type)) {
            throw new AppError(message.NO_OPERATION_AUTHORITY, ResponseCode.UNAUTHORIZED);
        }

        // サービス層のDTOを生成
        const serviceDto = new CatalogServiceDto();
        serviceDto.setOperator(operator);
        serviceDto.setCode(dto.code);
        const catalog = {
            attribute: dto.attribute
        };
        serviceDto.setCatalog(catalog);

        // サービス層の処理を実行
        const service = new AttributeService();
        const ret = await service.putAttribute(getConnection('postgres'), null, serviceDto);
        return ret;
    }
}
