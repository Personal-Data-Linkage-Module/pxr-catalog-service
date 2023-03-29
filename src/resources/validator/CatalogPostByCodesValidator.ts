/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Request, Response, NextFunction } from 'express';
import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
/* eslint-enable */
import { transformAndValidate } from 'class-transformer-validator';
import CatalogPostByCodesReqDto from '../dto/CatalogPostByCodesReqDto';

/**
 * カタログ取得APIのバリデーションチェッククラス
 */
@Middleware({ type: 'before' })
export default class CatalogPostByCodesValidator implements ExpressMiddlewareInterface {
    async use (request: Request, response: Response, next: NextFunction) {
        // パラメータを取得
        await transformAndValidate(CatalogPostByCodesReqDto, request.body);
        if (next) {
            next();
        }
    }
}
