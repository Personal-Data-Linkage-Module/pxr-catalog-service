/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Request, Response, NextFunction } from 'express';
import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
/* eslint-enable */
import { transformAndValidate } from 'class-transformer-validator';
import CatalogDeleteReqDto from '../dto/CatalogDeleteReqDto';

/**
 * カタログ更新APIのバリデーションチェッククラス
 */
@Middleware({ type: 'before' })
export default class CatalogDeleteValidator implements ExpressMiddlewareInterface {
    async use (request: Request, response: Response, next: NextFunction) {
        // パラメータを取得
        await transformAndValidate(CatalogDeleteReqDto, request.params);
        if (next) {
            next();
        }
    }
}
