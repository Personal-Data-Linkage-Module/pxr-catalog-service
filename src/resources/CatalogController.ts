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

// SDE-IMPL-REQUIRED 本ファイルをコピーして外部サービスに公開する REST API インタフェースを定義します。

/* eslint-disable */
import { Request, Response } from 'express';
import {
    JsonController, Put, Body, Header, Res, Req, QueryParam, UseBefore, Get, Post, Delete
} from 'routing-controllers';
import CatalogGetReqDto from './dto/CatalogGetReqDto';
import CatalogGetByCodeReqDto from './dto/CatalogGetByCodeReqDto';
import CatalogGetByCodeVersionReqDto from './dto/CatalogGetByCodeVersionReqDto';
import CatalogPostReqDto from './dto/CatalogPostReqDto';
import CatalogPutReqDto from './dto/CatalogPutReqDto';
import CatalogDeleteReqDto from './dto/CatalogDeleteReqDto';
import CatalogGetInnerReqDto from './dto/CatalogGetInnerReqDto';
import CatalogPostByCodesReqDto from './dto/CatalogPostByCodesReqDto';
// import { applicationLogger } from '../common/logging';
/* eslint-enable */
import EnableSimpleBackPressure from './backpressure/EnableSimpleBackPressure';
import OperatorDomain from '../domains/OperatorDomain';
import OperatorService from '../services/OperatorService';
import CatalogService from '../services/CatalogService';
import CatalogServiceDto from '../services/dto/CatalogServiceDto';
import CatalogGetValidator from './validator/CatalogGetValidator';
import CatalogGetByCodeValidator from './validator/CatalogGetByCodeValidator';
import CatalogGetByCodeVersionValidator from './validator/CatalogGetByCodeVersionValidator';
import CatalogPostValidator from './validator/CatalogPostValidator';
import CatalogPutValidator from './validator/CatalogPutValidator';
import CatalogDeleteValidator from './validator/CatalogDeleteValidator';
import CatalogGetInnerValidator from './validator/CatalogGetInnerValidator';
import CatalogPostByCodesValidator from './validator/CatalogPostByCodesValidator';
import { transformAndValidate } from 'class-transformer-validator';
import CatalogPublicGetValidator from './validator/CatalogPublicGetValidator';
import { getConnection } from 'typeorm';
import AsyncLock = require('async-lock');

// SDE-IMPL-REQUIRED REST API のベースルートを指定します。("/")をベースルートにする場合は引数なしとしてください。
@JsonController('/catalog')
export default class CatalogController {
    /**
     * 排他制御オブジェクト
     */
    private static lock: AsyncLock = new AsyncLock();

    /**
     * カタログ取得(name指定)
     * @param req
     * @param dto
     * @param res
     */
    @Get('/')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    // SDE-MSA-PRIN 過負荷を回避する （MSA-PRIN-ID-02）
    @EnableSimpleBackPressure()
    @UseBefore(CatalogGetValidator)
    async getCatalog (@Req() req: Request, @Res() res: Response): Promise<any> {
        // パラメータを取得
        const dto = await transformAndValidate(CatalogGetReqDto, req.query);

        // オペレーターセッション情報を取得
        const operator = await OperatorService.authMe(req);

        // サービス層のDTOを生成
        const serviceDto = new CatalogServiceDto();
        serviceDto.setOperator(operator);
        serviceDto.setNs(dto.ns);

        // サービス層の処理を実行
        const service = new CatalogService();
        const ret = await service.getCatalog(getConnection('postgres'), serviceDto);
        return ret;
    }

    /**
     * 公開カタログ取得
     * @param req
     * @param res
     */
    @Get('/public')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    // SDE-MSA-PRIN 過負荷を回避する （MSA-PRIN-ID-02）
    @EnableSimpleBackPressure()
    @UseBefore(CatalogPublicGetValidator)
    async getPublicCatalog (@Req() req: Request, @Res() res: Response): Promise<any> {
        // 公開カタログでログイン情報がないため、カタログのレスポンス作成時に必要となるセッション情報を作成
        const operator = new OperatorDomain({ loginId: 'public' });

        // サービス層のDTOを生成
        const serviceDto = new CatalogServiceDto();
        serviceDto.setOperator(operator);

        // サービス層の処理を実行
        const service = new CatalogService();
        const ret = await service.getPublicCatalog(serviceDto);

        return ret;
    }

    /**
     * カタログ取得(code指定)
     * @param req
     * @param dto
     * @param res
     */
    @Get('/:code')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    // SDE-MSA-PRIN 過負荷を回避する （MSA-PRIN-ID-02）
    @EnableSimpleBackPressure()
    @UseBefore(CatalogGetByCodeValidator)
    async getCatalogByCode (@Req() req: Request, @Res() res: Response): Promise<any> {
        // パラメータを取得
        const dto = await transformAndValidate(CatalogGetByCodeReqDto, req.params);

        // オペレーターセッション情報を取得
        const operator = await OperatorService.authMe(req);

        // サービス層のDTOを生成
        const serviceDto = new CatalogServiceDto();
        serviceDto.setOperator(operator);
        serviceDto.setCode(dto.code);

        // サービス層の処理を実行
        const service = new CatalogService();
        const ret = await service.getCatalogByCodeVersion(getConnection('postgres'), null, serviceDto);
        return ret;
    }

    /**
     * カタログ取得(code,version指定)
     * @param req
     * @param dto
     * @param res
     */
    @Get('/:code/:ver')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    // SDE-MSA-PRIN 過負荷を回避する （MSA-PRIN-ID-02）
    @EnableSimpleBackPressure()
    @UseBefore(CatalogGetByCodeVersionValidator)
    async getCatalogByCodeVersion (@Req() req: Request, @Res() res: Response, @QueryParam('includeDeleted') includeDeleted = false): Promise<any> {
        // パラメータを取得
        const dto = await transformAndValidate(CatalogGetByCodeVersionReqDto, req.params);

        // オペレーターセッション情報を取得
        const operator = await OperatorService.authMe(req);

        // サービス層のDTOを生成
        const serviceDto = new CatalogServiceDto();
        serviceDto.setOperator(operator);
        serviceDto.setCode(dto.code);
        serviceDto.setVersion(dto.ver);
        serviceDto.setIncludeDeleted(includeDeleted);

        // サービス層の処理を実行
        const service = new CatalogService();
        const ret = await service.getCatalogByCodeVersion(getConnection('postgres'), null, serviceDto);
        return ret;
    }

    /**
     * カタログ取得(複数code指定)
     * @param req
     * @param dto
     * @param res
     */
    @Post('/')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    // SDE-MSA-PRIN 過負荷を回避する （MSA-PRIN-ID-02）
    @EnableSimpleBackPressure()
    @UseBefore(CatalogPostByCodesValidator)
    async getCatalogByCodes (@Req() req: Request, @Res() res: Response): Promise<any> {
        // パラメータを取得
        let dto = await transformAndValidate(CatalogPostByCodesReqDto, req.body);
        dto = <CatalogPostByCodesReqDto[]>dto;

        // オペレーターセッション情報を取得
        const operator = await OperatorService.authMe(req);

        // サービス層のDTOを生成
        const serviceDto = new CatalogServiceDto();
        serviceDto.setOperator(operator);
        serviceDto.setCodes(dto);

        // サービス層の処理を実行
        const service = new CatalogService();
        const ret = await service.getCatalogByCodes(getConnection('postgres'), serviceDto);
        return ret;
    }

    /**
     * 内部クラス取得
     * @param req
     * @param dto
     * @param res
     */
    @Get('/inner/:code/:name/')
    @Get('/inner/:code/:version/:name')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    // SDE-MSA-PRIN 過負荷を回避する （MSA-PRIN-ID-02）
    @EnableSimpleBackPressure()
    @UseBefore(CatalogGetInnerValidator)
    async getInnerCatalog (@Req() req: Request, @Res() res: Response): Promise<any> {
        // パラメータを取得
        const dto = await transformAndValidate(CatalogGetInnerReqDto, req.params);

        // オペレーターセッション情報を取得
        const operator = await OperatorService.authMe(req);

        // サービス層のDTOを生成
        const serviceDto = new CatalogServiceDto();
        serviceDto.setOperator(operator);
        serviceDto.setCode(dto.code);
        serviceDto.setVersion(dto.version);
        serviceDto.setName(dto.name);

        // サービス層の処理を実行
        const service = new CatalogService();
        const ret = await service.getInnerCatalog(getConnection('postgres'), serviceDto);
        return ret;
    }

    /**
     * カタログ追加
     * @param req
     * @param dto
     * @param res
     */
    @Post('/model')
    @Post('/built_in')
    @Post('/ext')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(CatalogPostValidator)
    async postCatalog (@Req() req: Request, @Res() res: Response): Promise<any> {
        // 排他処理
        let ret: any = null;
        await CatalogController.lock.acquire(['CatalogController', 'postCatalog'], async () => {
            // パラメータを取得
            let dto = await transformAndValidate(CatalogPostReqDto, req.body);
            dto = <CatalogPostReqDto>dto;

            // オペレーターセッション情報を取得
            const operator = await OperatorService.authMe(req);

            // サービス層のDTOを生成
            const serviceDto = new CatalogServiceDto();
            serviceDto.setOperator(operator);
            serviceDto.setType(this.getTypeByURL(req.originalUrl));
            serviceDto.setCode(dto.catalogItem['_code'] ? dto.catalogItem['_code']['_value'] : null);
            serviceDto.setVersion(dto.catalogItem['_code'] ? dto.catalogItem['_code']['_ver'] : null);
            serviceDto.setCatalog({
                catalogItem: dto.catalogItem,
                template: dto.template,
                inner: dto.inner,
                attribute: dto.attribute
            });

            // サービス層の処理を実行
            const service = new CatalogService();
            ret = await service.insertCatalog(getConnection('postgres'), serviceDto);
        });
        return ret;
    }

    /**
     * カタログ更新
     * @param req
     * @param dto
     * @param res
     */
    @Put('/model/:code')
    @Put('/built_in/:code')
    @Put('/ext/:code')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(CatalogPutValidator)
    async putCatalog (@Req() req: Request, @Res() res: Response): Promise<any> {
        // パラメータを取得
        let dto = await transformAndValidate(CatalogPutReqDto, req.body);
        dto = <CatalogPutReqDto>dto;

        // オペレーターセッション情報を取得
        const operator = await OperatorService.authMe(req);

        // バージョンアップフラグを取得
        let versionUpFlag: string = <string>req.query['versionUpFlag'];
        if (versionUpFlag === undefined) {
            versionUpFlag = 'true';
        }

        // サービス層のDTOを生成
        const serviceDto = new CatalogServiceDto();
        serviceDto.setOperator(operator);
        serviceDto.setType(this.getTypeByURL(req.originalUrl));
        serviceDto.setCode(Number(req.params['code']));
        const versionUpflag: boolean = (versionUpFlag.toLowerCase() === 'true');
        serviceDto.setVersionUpFlag(versionUpflag);
        serviceDto.setCatalog({
            catalogItem: dto.catalogItem,
            template: dto.template,
            inner: dto.inner,
            attribute: dto.attribute
        });

        // サービス層の処理を実行
        const service = new CatalogService();
        const ret = await service.updateCatalog(getConnection('postgres'), null, serviceDto);
        return ret;
    }

    /**
     * カタログ削除
     * @param req
     * @param dto
     * @param res
     */
    @Delete('/model/:code')
    @Delete('/built_in/:code')
    @Delete('/ext/:code')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(CatalogDeleteValidator)
    async deleteCatalog (@Req() req: Request, @Res() res: Response): Promise<any> {
        // パラメータを取得
        const dto = await transformAndValidate(CatalogDeleteReqDto, req.params);

        // オペレーターセッション情報を取得
        const operator = await OperatorService.authMe(req);

        // サービス層のDTOを生成
        const serviceDto = new CatalogServiceDto();
        serviceDto.setOperator(operator);
        serviceDto.setCode(dto.code);

        // サービス層の処理を実行
        const service = new CatalogService();
        const ret = await service.deleteCatalog(getConnection('postgres'), serviceDto);
        return ret;
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
        return 'ext';
    }
}
