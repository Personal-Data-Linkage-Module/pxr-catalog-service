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
    IsOptional,
    IsArray
} from 'class-validator';
import { Transform } from 'class-transformer';
/* eslint-enable */

/**
 * GET: カタログ全文検索取得のリクエストDTO
 */
export default class CatalogFullTextGetReqDto {
    @IsOptional()
    @IsString()
    keyword: string = null;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    namespace: string[] = null;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    attribute: {}[] = null;
}
