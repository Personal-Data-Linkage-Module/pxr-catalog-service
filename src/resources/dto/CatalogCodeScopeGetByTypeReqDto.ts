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
 * GET: カタログコード範囲取得のリクエストDTO
 */
export default class CatalogCodeScopeGetByTypeReqDto {
    @IsDefined()
    @IsNotEmpty()
    @IsString()
        type: string = null;
}
