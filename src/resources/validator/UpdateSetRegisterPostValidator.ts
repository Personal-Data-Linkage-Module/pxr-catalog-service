/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Request, Response, NextFunction } from 'express';
import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import UpdateSetRegisterPostReqDto, { CatalogType } from '../dto/UpdateSetRegisterPostReqDto';
/* eslint-enable */
import { transformAndValidate } from 'class-transformer-validator';
import AppError from '../../common/AppError';
import { ResponseCode } from '../../common/ResponseCode';
import Config from '../../common/Config';
import { UpdateSetType } from '../../common/UpdateSet';
const Message = Config.ReadConfig('./config/message.json');

/**
 * 変更セット登録APIのバリデーションチェッククラス
 */
@Middleware({ type: 'before' })
export default class UpdateSetRegisterPostValidator implements ExpressMiddlewareInterface {
    async use (request: Request, response: Response, next: NextFunction) {
        // 空かどうか判定し、空と判定した場合にはエラーをスローする
        if (!request.body || JSON.stringify(request.body) === JSON.stringify({})) {
            throw new AppError(Message.REQUEST_IS_EMPTY, ResponseCode.BAD_REQUEST);
        }
        // パラメータを取得
        let dto = await transformAndValidate(UpdateSetRegisterPostReqDto, request.body);
        dto = <UpdateSetRegisterPostReqDto>dto;

        // ネームスペース、カタログ、属性がいずれも指定されていない場合
        if ((!dto.ns || dto.ns.length === 0) &&
            (!dto.catalog || dto.catalog.length === 0) &&
            (!dto.attribute || dto.attribute.length === 0)) {
            throw new AppError(Message.NOT_NS_CATALOG_ATTRIBUTE, ResponseCode.BAD_REQUEST);
        }

        if (dto.ns) {
            // ネームスペースのテンプレート確認
            for (let index = 0; index < dto.ns.length; index++) {
                // 追加、更新の場合
                if (dto.ns[index]['type'] === UpdateSetType.ADD ||
                    dto.ns[index]['type'] === UpdateSetType.UPDATE) {
                    if (!dto.ns[index]['template']) {
                        // ネームスペーステンプレートが存在しない場合、エラーを投げる
                        throw new AppError(Message.NOT_TEMPLATE, ResponseCode.BAD_REQUEST);
                    }
                }
                // 更新、削除の場合
                if (dto.ns[index]['type'] === UpdateSetType.UPDATE ||
                    dto.ns[index]['type'] === UpdateSetType.DELETE) {
                    if (!dto.ns[index]['nsId']) {
                        // ネームスペースIDが存在しない場合、エラーを投げる
                        throw new AppError(Message.NOT_NS_ID, ResponseCode.BAD_REQUEST);
                    }
                }
            }
            // ネームスペースの重複確認
            const confirmList: string[] = [];
            for (let index = 0; index < dto.ns.length; index++) {
                // 削除の場合
                if (dto.ns[index]['type'] === UpdateSetType.DELETE) {
                    continue;
                }
                // 追加、更新の中で重複している場合
                if (confirmList.indexOf(dto.ns[index].template.ns) > 0) {
                    throw new AppError(Message.DUPLICATION_NS, ResponseCode.BAD_REQUEST);
                }
                confirmList.push(dto.ns[index].template.ns);
            }
        }
        if (dto.catalog) {
            // カタログテンプレート確認
            for (let index = 0; index < dto.catalog.length; index++) {
                // 追加、更新の場合
                if (dto.catalog[index]['type'] === UpdateSetType.ADD ||
                    dto.catalog[index]['type'] === UpdateSetType.UPDATE) {
                    if (!dto.catalog[index]['template']) {
                        // カタログテンプレートが存在しない場合、エラーを投げる
                        throw new AppError(Message.NOT_TEMPLATE, ResponseCode.BAD_REQUEST);
                    }
                }
                // 更新、削除の場合
                if (dto.catalog[index]['type'] === UpdateSetType.UPDATE ||
                    dto.catalog[index]['type'] === UpdateSetType.DELETE) {
                    if (!dto.catalog[index]['catalogCode']) {
                        // カタログIDが存在しない場合、エラーを投げる
                        throw new AppError(Message.NOT_CODE, ResponseCode.BAD_REQUEST);
                    }
                }
            }
            // カタログの重複確認
            const confirmList: number[] = [];
            for (let index = 0; index < dto.catalog.length; index++) {
                // 削除の場合
                if (dto.catalog[index]['type'] === UpdateSetType.DELETE) {
                    continue;
                }
                // 追加、更新の中で重複している場合
                const code: number = dto.catalog[index].template.catalogItem['_code'] ? dto.catalog[index].template.catalogItem['_code']['_value'] : null;
                if (confirmList.indexOf(code) > 0) {
                    throw new AppError(Message.DUPLICATION_CODE, ResponseCode.BAD_REQUEST);
                }
                confirmList.push(code);
            }
            // 継承コードがマイナス値の場合
            const refCatalogCode: CatalogType[] = dto.catalog.filter(function (info, index) {
                if (info.template &&
                    info.template.catalogItem &&
                    info.template.catalogItem['inherit'] &&
                    info.template.catalogItem['inherit']['_value'] &&
                    info.template.catalogItem['inherit']['_value'] < 0) {
                    return true;
                }
            });
            // 一致する継承コードが定義されているか確認
            for (let index = 0; index < refCatalogCode.length; index++) {
                let isCodeMatch: boolean = false;
                for (let catalogIndex = 0; catalogIndex < dto.catalog.length; catalogIndex++) {
                    if (dto.catalog[catalogIndex].template &&
                        dto.catalog[catalogIndex].template.catalogItem &&
                        dto.catalog[catalogIndex].template.catalogItem['_code'] &&
                        dto.catalog[catalogIndex].template.catalogItem['_code']['_value'] &&
                        dto.catalog[catalogIndex].template.catalogItem['_code']['_value'] < 0) {
                        if (dto.catalog[catalogIndex].template.catalogItem['_code']['_value'] === refCatalogCode[index].template.catalogItem['inherit']['_value']) {
                            isCodeMatch = true;
                        }
                    }
                }
                // 定義されていない場合
                if (!isCodeMatch) {
                    throw new AppError(Message.TARGET_NOT_CODE, ResponseCode.BAD_REQUEST);
                }
            }
        }
        if (dto.attribute) {
            // 属性のテンプレート確認
            for (let index = 0; index < dto.attribute.length; index++) {
                // 追加、更新の場合
                if (dto.attribute[index]['type'] === UpdateSetType.ADD ||
                    dto.attribute[index]['type'] === UpdateSetType.UPDATE) {
                    if (!dto.attribute[index]['attribute']) {
                        // 属性テンプレートが存在しない場合、エラーを投げる
                        throw new AppError(Message.NOT_ATTRIBUTE, ResponseCode.BAD_REQUEST);
                    }
                }
            }
        }
        if (next) {
            next();
        }
    }
}
