/* eslint-disable */
import { Request, Response, NextFunction } from 'express';
import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
/* eslint-enable */
import { transformAndValidate } from 'class-transformer-validator';
import CatalogGetHistoryCodeReqDto from '../dto/CatalogGetHistoryCodeReqDto';
import AppError from '../../common/AppError';
import { ResponseCode } from '../../common/ResponseCode';
import Config from '../../common/Config';
const message = Config.ReadConfig('./config/message.json');

/**
 * カタログ履歴取得APIのバリデーションチェッククラス
 */
@Middleware({ type: 'before' })
export default class CatalogGetHistoryCodeValidator implements ExpressMiddlewareInterface {
    async use (request: Request, response: Response, next: NextFunction) {
        // パラメータを取得
        const dto = await transformAndValidate(CatalogGetHistoryCodeReqDto, Object.assign(request.params, request.query));
        if (dto.max && dto.min > dto.max) {
            throw new AppError(message.INVALID_VERSION_RANGE, ResponseCode.BAD_REQUEST);
        }
        if (next) {
            next();
        }
    }
}
