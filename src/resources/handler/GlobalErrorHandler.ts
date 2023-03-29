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
/* eslint-disable */
import { ExpressErrorMiddlewareInterface, Middleware } from 'routing-controllers';
import { ValidationError } from 'class-validator';
import * as express from 'express';

import { applicationLogger } from '../../common/logging';
import AppError from '../../common/AppError';
/* eslint-enable */
import Config from '../../common/Config';
const Message = Config.ReadConfig('./config/message.json');

@Middleware({ type: 'after' })
export default class GlobalErrorHandler implements ExpressErrorMiddlewareInterface {
    public error (err: any, request: express.Request, response: express.Response, next: express.NextFunction) {
        // エラーオブジェクト毎のエラーハンドリング
        if (err) {
            // Validationエラー時のハンドリング
            let reason: any[] = [];
            for (const index in err) {
                const res = this.getError(err[index]);
                if (res) {
                    reason = reason.concat(res);
                }
            }
            // Validationエラーが発生していた場合、レスポンスを生成する
            if (reason.length > 0 && !response.finished) {
                // レスポンスを生成する
                response.status(400).send({
                    status: 400,
                    reasons: reason
                });

            // AppError時のハンドリング
            } else if (err instanceof AppError && !response.finished) {
                // ログ出力する
                applicationLogger.error('Application internal error.', err);
                // レスポンスを生成する
                response.status(err.statusCode).send({
                    status: err.statusCode,
                    message: err.message
                });

            // エラーにhttpCodeというプロパティが含まれている場合
            } else if (err.httpCode > 0 && !response.finished) {
                applicationLogger.error(`${err.name} has occured.`, err);
                response.status(err.httpCode).send({
                    status: err.httpCode,
                    message: err.name
                });

            // その他エラーが発生してしまった場合
            } else if (!response.finished) {
                // ログ出力する
                applicationLogger.error('Undefined error.', err);
                // レスポンスを生成する
                response.status(503).send({
                    status: 503,
                    message: Message.UNDEFINED_ERROR
                });
            }
        }

        if (next) {
            next(err);
        }
    }

    private getError (e: ValidationError): {}[] {
        if (e instanceof ValidationError) {
            if (!e.constraints && e.children.length > 0) {
                let reason: {}[] = [];
                for (const child of e.children) {
                    const childReason = this.getError(child);
                    if (childReason !== null && childReason.length > 0) {
                        reason = reason.concat(childReason);
                    }
                }
                return reason.length > 0 ? reason : null;
            } else {
                applicationLogger.error('Request parameter validation error.',
                    'errorParam:', e.property + ',',
                    'paramConstraints:', JSON.stringify(e.constraints));
                const { constraints } = e;
                const reason: {}[] = [];
                for (const num in constraints) {
                    if (constraints.isDefined && num !== 'isDefined') {
                        continue;
                    }
                    const res = {
                        property: e.property,
                        value: e.value && e.value !== 0 && e.value !== ''
                            ? e.value : null,
                        message: Message.validation[num]
                    };
                    reason.push(res);
                }
                return reason;
            }
        }
        return null;
    }
}
