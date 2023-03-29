/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Request, Response, NextFunction } from 'express';
import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
/* eslint-enable */
import { transformAndValidate } from 'class-transformer-validator';
import CatalogGetInnerReqDto from '../dto/CatalogGetInnerReqDto';

/**
 * 内部クラス取得APIのバリデーションチェッククラス
 */
@Middleware({ type: 'before' })
export default class CatalogGetInnerValidator implements ExpressMiddlewareInterface {
    async use (request: Request, response: Response, next: NextFunction) {
        // パラメータを取得
        await transformAndValidate(CatalogGetInnerReqDto, request.params);
        if (next) {
            next();
        }
    }
}
