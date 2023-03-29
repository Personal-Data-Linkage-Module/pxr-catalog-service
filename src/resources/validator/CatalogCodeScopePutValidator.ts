/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Request, Response, NextFunction } from 'express';
import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
/* eslint-enable */
import { transformAndValidate } from 'class-transformer-validator';
import AppError from '../../common/AppError';
import { ResponseCode } from '../../common/ResponseCode';
import CatalogCodeScopePutReqDto from '../dto/CatalogCodeScopePutReqDto';
import Config from '../../common/Config';
const Message = Config.ReadConfig('./config/message.json');

/**
 * カタログコード範囲更新APIのバリデーションチェッククラス
 */
@Middleware({ type: 'before' })
export default class CatalogCodeScopePutValidator implements ExpressMiddlewareInterface {
    /**
     * 対象タイプ
     */
    private readonly targetType = [
        'model',
        'built_in',
        'ext'
    ];

    async use (request: Request, response: Response, next: NextFunction) {
        // 空かどうか判定し、空と判定した場合にはエラーをスローする
        if (!request.body || JSON.stringify(request.body) === JSON.stringify({})) {
            throw new AppError(Message.REQUEST_IS_EMPTY, ResponseCode.BAD_REQUEST);
        }
        // パラメータを取得
        let dto = await transformAndValidate(CatalogCodeScopePutReqDto, request.body);
        dto = <CatalogCodeScopePutReqDto>dto;

        // nsIdが空の場合
        if (!request.params['id']) {
            throw new AppError(Message.validation.isEmpty, ResponseCode.BAD_REQUEST);
        }
        // nsIdが数値以外の場合
        if (isNaN(Number(request.params['id']))) {
            throw new AppError(Message.validation.isEmpty, ResponseCode.BAD_REQUEST);
        }
        // 存在しないタイプの場合
        if (!dto.type ||
            this.targetType.indexOf(dto.type) < 0) {
            throw new AppError(Message.CODE_SCOPE_TYPE_INVALID, ResponseCode.BAD_REQUEST);
        }
        // 開始コード、終了コード相関が正しくない場合
        if (dto.start_code > dto.end_code) {
            throw new AppError(Message.CODE_SCOPE_INVALID, ResponseCode.BAD_REQUEST);
        }
        if (next) {
            next();
        }
    }
}
