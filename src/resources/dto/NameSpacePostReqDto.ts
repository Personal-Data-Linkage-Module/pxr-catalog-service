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
 * POST: ネームスペース追加のリクエストDTO
 */
export default class NameSpacePostReqDto {
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    ns: string = null;

    @IsDefined()
    @IsNotEmpty()
    description: string = null;
}
