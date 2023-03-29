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
import AttributePutReqDto from '../dto/AttributePutReqDto';
import Config from '../../common/Config';
const Message = Config.ReadConfig('./config/message.json');

/**
 * カタログ更新APIのバリデーションチェッククラス
 */
@Middleware({ type: 'before' })
export default class AttributePutValidator implements ExpressMiddlewareInterface {
    async use (request: Request, response: Response, next: NextFunction) {
        // 空かどうか判定し、空と判定した場合にはエラーをスローする
        if (!request.body || JSON.stringify(request.body) === JSON.stringify({})) {
            throw new AppError(Message.REQUEST_IS_EMPTY, ResponseCode.BAD_REQUEST);
        }
        // パラメータを取得
        await transformAndValidate(AttributePutReqDto, request.body);
        if (next) {
            next();
        }
    }
}
