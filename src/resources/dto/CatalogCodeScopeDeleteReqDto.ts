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
 * DELETE: カタログコード範囲削除のリクエストDTO
 */
export default class CatalogCodeScopeDeleteReqDto {
    @IsDefined()
    @IsNotEmpty()
    @Transform(id => parseInt(id))
    @IsNumber()
    id: number = null;
}
