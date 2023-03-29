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
    MaxLength
} from 'class-validator';
import { MaxKey } from 'typeorm';
/* eslint-enable */

/**
 * POST: アクティベートのリクエストDTO
 */
export default class CatalogNamePostReqDto {
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    name: string = null;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    description: string = null;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    // eslint-disable-next-line camelcase
    ext_name: string = null;
}
