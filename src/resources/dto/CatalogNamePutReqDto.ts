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
 * PUT: カタログ名称更新のリクエストDTO
 */
export default class CatalogNamePutReqDto {
    @IsDefined()
    @IsNotEmpty()
    @IsString()
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
