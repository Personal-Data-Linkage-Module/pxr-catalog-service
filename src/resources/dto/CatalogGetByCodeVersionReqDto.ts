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
    IsNotEmpty
} from 'class-validator';
import { Transform } from 'class-transformer';
/* eslint-enable */

/**
 * GET: カタログ取得のリクエストDTO
 */
export default class CatalogGetByCodeVersionReqDto {
    @IsDefined()
    @IsNotEmpty()
    @Transform(code => parseInt(code))
    @IsNumber()
    code: number = null;

    @IsDefined()
    @IsNotEmpty()
    @Transform(ver => parseInt(ver))
    @IsNumber()
    ver: number = null;
}
