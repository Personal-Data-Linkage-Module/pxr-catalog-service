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
import NameSpacePostReqDto from '../dto/NameSpacePostReqDto';
import Config from '../../common/Config';
const Message = Config.ReadConfig('./config/message.json');

/**
 * ネームスペース追加APIのバリデーションチェッククラス
 */
@Middleware({ type: 'before' })
export default class NameSpacePostValidator implements ExpressMiddlewareInterface {
    async use (request: Request, response: Response, next: NextFunction) {
        // 空かどうか判定し、空と判定した場合にはエラーをスローする
        if (!request.body || JSON.stringify(request.body) === JSON.stringify({})) {
            throw new AppError(Message.REQUEST_IS_EMPTY, ResponseCode.BAD_REQUEST);
        }
        // パラメータを取得
        const dto = await transformAndValidate(NameSpacePostReqDto, request.body);

        // 配列はエラー
        if (Array.isArray(dto)) {
            throw new AppError(Message.UNEXPECTED_ARRAY_REQUEST, ResponseCode.BAD_REQUEST);
        }
        // ネームスペース内に該当typeが存在しない場合
        const type: string = this.getTypeByURL(request.originalUrl);
        if (dto.ns.indexOf('/' + type + '/') < 0) {
            throw new AppError(Message.INVALID_NS_TYPE, ResponseCode.BAD_REQUEST);
        }
        if (next) {
            next();
        }
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
        if (url.indexOf('/ext') >= 0) {
            return 'ext';
        }
        return null;
    }
}
