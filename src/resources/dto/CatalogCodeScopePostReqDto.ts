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
/* eslint-enable */

/**
 * POST: カタログコード範囲追加のリクエストDTO
 */
export default class CatalogCodeScopePostReqDto {
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    type: string = null;

    @IsDefined()
    @IsNotEmpty()
    @IsNumber()
    // eslint-disable-next-line camelcase
    start_code: number = null;

    @IsDefined()
    @IsNotEmpty()
    @IsNumber()
    // eslint-disable-next-line camelcase
    end_code: number = null;
}
