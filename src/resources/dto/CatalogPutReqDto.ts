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
    IsJSON,
    IsNotEmpty,
    IsOptional
} from 'class-validator';
import { Transform } from 'class-transformer';
/* eslint-enable */

/**
 * PUT: カタログ更新のリクエストDTO
 */
export default class CatalogPutReqDto {
    @IsDefined()
    @IsNotEmpty()
    catalogItem: {} = null;

    @IsDefined()
    @IsOptional()
    template: {} = null;

    @IsDefined()
    @IsOptional()
    inner: {} = null;

    @IsDefined()
    @IsOptional()
    attribute: {} = null;
}
