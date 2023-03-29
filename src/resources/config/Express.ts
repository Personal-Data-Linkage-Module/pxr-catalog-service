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
import 'reflect-metadata';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import { useExpressServer, useContainer } from 'routing-controllers';
import { Container } from 'typedi';
import setupLogging from './Logging';
import setupHealthCheck from './HealthCheck';
import GlobalValidate from '../validator/GlobalValidate';
import GlobalErrorHandler from '../handler/GlobalErrorHandler';
import NameSpaceController from '../../resources/NameSpaceController';
import CatalogCodeScopeController from '../../resources/CatalogCodeScopeController';
import CatalogNameController from '../../resources/CatalogNameController';
import CatalogFullTextController from '../../resources/CatalogFullTextController';
import CatalogController from '../../resources/CatalogController';
import AttributeController from '../../resources/AttributeController';
import Config from '../../common/Config';
import UpdateSetController from '../../resources/UpdateSetController';
// import * as log4js from 'log4js';
// import * as uuid from 'uuid';
// import { performanceLogger } from '../../common/logging';
// import { sprintf } from 'sprintf-js';
import SwaggerUi = require('swagger-ui-express');
import cookieParser = require('cookie-parser');
// export const applicationLogger: log4js.Logger = log4js.getLogger('application');
// const performance = require('perf_hooks').performance;
// const contextService = require('request-context');

/*
const blocked = require('blocked-at');
blocked((time: number, stack: any) => {
    performanceLogger.warn(`Blocked for ${time}ms, operation started here:`, stack);
}, {
    // 検出ブロッキング時間(ミリ秒)の閾値。 デフォルトは 20 mse
    threshold: 20
});
*/

/**
 * リクエスト、レスポンスログ出力
 */
/*
const apiloggerMiddleware = (req: any, res: any, next: any) => {
    // リクエスト時のログを出力
    const url = req.url;
    applicationLogger.warn(sprintf('[%s] url:%s start', contextService.get('request:requestId'), url));

    // 開始時間を取得
    const startTime = performance.now();

    const defaultEnd = res.end;
    res.end = (...restArgs: string[]) => {
        // 終了時間を取得
        const endTime = performance.now();

        // 処理時間を取得
        const duration = endTime - startTime;

        // レスポンス時のログを出力
        applicationLogger.warn(sprintf('[%s] url:%s finish time:%dmsec', contextService.get('request:requestId'), url, duration));
        defaultEnd.apply(res, restArgs);
    };
    next();
};
const generateRequestIdMiddleware = (req: any, res: any, next: any) => {
    contextService.set('request:requestId', uuid());
    next();
};
*/

export class ExpressConfig {
    app: express.Express;

    constructor () {
        this.app = express();

        setupLogging(this.app);
        // SDE-MSA-PRIN 監視に優しい設計にする （MSA-PRIN-CD-04）
        setupHealthCheck(this.app);
        // SDE-MSA-PRIN ステートレスにする （MSA-PRIN-SD-01）

        this.app.use(bodyParser.json({ limit: '100mb' }));
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cookieParser());

        /**
         * HelmetによるHTTPヘッダーのセキュリティ対策設定
         */
        this.app.use(helmet());

        // SDE-IMPL-RECOMMENDED Content-Security-Policyの設定は以下で行ってください
        this.app.use(helmet.contentSecurityPolicy({
            directives: {
                defaultSrc: ["'self'"],
                styleSrc: ["'self'", "'unsafe-inline'"],
                imgSrc: ["'self'", 'data:']
                // mediaSrc: ['media1.com', 'media2.com'],
                // scriptSrc: ['scripts.example.com'],
            }
        }));

        // Swaggaer設定ファイルを読込
        const SwaggerConfig = Config.ReadConfig('./config/openapi.json');

        // Swagger UIのセットアップ
        this.app.use('/api-docs', SwaggerUi.serve, SwaggerUi.setup(SwaggerConfig));

        // SwaggerUIのアセットを静的に配布する設定
        this.app.use('/api-docs-assets', express.static('api-docs'));

        // リクエスト、レスポンスのログ出力を設定
        // this.app.use(contextService.middleware('request'));
        // this.app.use(generateRequestIdMiddleware);
        // this.app.use(apiloggerMiddleware);

        this.setupControllers();
    }

    setupControllers () {
        // const resourcesPath = path.resolve('dist', 'resources');

        useContainer(Container);

        useExpressServer(this.app, {
            // SDE-IMPL-RECOMMENDED CORS（Cross-Origin Resource Sharing）設定は以下で行ってください。
            /*
            cors: {
                methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
                credentials: true,
                allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
                exposedHeaders: [],
                maxAge: 1800
            },
            */
            defaultErrorHandler: false,
            controllers: [
                CatalogController,
                CatalogNameController,
                NameSpaceController,
                CatalogCodeScopeController,
                CatalogFullTextController,
                UpdateSetController,
                AttributeController
            ],
            middlewares: [GlobalValidate, GlobalErrorHandler],
            development: false
        });
    }
}
