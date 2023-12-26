/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import {
    IsDefined,
    IsString,
    IsUrl,
    IsNumber,
    IsInt,
    ValidateNested,
    IsDate,
    IsBoolean,
    IsNotEmpty,
    IsOptional
} from 'class-validator';
import { Transform } from 'class-transformer';
/* eslint-enable */

/**
 * GET: 内部クラス取得のリクエストDTO
 */
export default class CatalogGetInnerReqDto {
    @IsDefined()
    @IsNotEmpty()
    @Transform(({ value }) => { return parseInt(value); })
    @IsNumber()
        code: number = null;

    @IsOptional()
    @Transform(({ value }) => { return parseInt(value); })
    @IsNumber()
        version: number = null;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
        name: string = null;
}
