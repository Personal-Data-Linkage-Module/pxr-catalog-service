/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Request, Response, NextFunction } from 'express';
import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
/* eslint-enable */
import { transformAndValidate } from 'class-transformer-validator';
import { sprintf } from 'sprintf-js';
import AppError from '../../common/AppError';
import { ResponseCode } from '../../common/ResponseCode';
import CatalogNamePutReqDto from '../dto/CatalogNamePutReqDto';
import Config from '../../common/Config';
const Message = Config.ReadConfig('./config/message.json');

/**
 * カタログ名称更新APIのバリデーションチェッククラス
 */
@Middleware({ type: 'before' })
export default class CatalogNamePutValidator implements ExpressMiddlewareInterface {
    async use (request: Request, response: Response, next: NextFunction) {
        // 空かどうか判定し、空と判定した場合にはエラーをスローする
        if (!request.body || JSON.stringify(request.body) === JSON.stringify({})) {
            throw new AppError(Message.REQUEST_IS_EMPTY, ResponseCode.BAD_REQUEST);
        }
        // パラメータを取得
        const dto = await transformAndValidate(CatalogNamePutReqDto, request.body);
        // 配列はエラー
        if (Array.isArray(dto)) {
            throw new AppError(Message.UNEXPECTED_ARRAY_REQUEST, ResponseCode.BAD_REQUEST);
        // 空文字の場合
        } else if (!dto.name) {
            throw new AppError(sprintf(Message.validation.isEmpty, 'ns'), ResponseCode.BAD_REQUEST);
        // 空文字の場合
        } else if (!dto.description) {
            throw new AppError(sprintf(Message.validation.isEmpty, 'description'), ResponseCode.BAD_REQUEST);
        // 空文字の場合
        } else if (!dto.ext_name) {
            throw new AppError(sprintf(Message.validation.isEmpty, 'ext_name'), ResponseCode.BAD_REQUEST);
        }
        if (next) {
            next();
        }
    }
}
