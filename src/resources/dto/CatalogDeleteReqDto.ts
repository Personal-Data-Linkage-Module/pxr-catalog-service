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
    IsNotEmpty
} from 'class-validator';
import { Transform } from 'class-transformer';
/* eslint-enable */

/**
 * DELETE: カタログ削除のリクエストDTO
 */
export default class CatalogDeleteReqDto {
    @IsDefined()
    @IsNotEmpty()
    @Transform(code => parseInt(code))
    @IsNumber()
    code: number = null;
}
