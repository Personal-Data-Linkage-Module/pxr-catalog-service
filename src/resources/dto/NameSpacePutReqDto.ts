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
 * PUT: ネームスペース更新のリクエストDTO
 */
export default class NameSpacePutReqDto {
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    ns: string = null;

    @IsDefined()
    @IsNotEmpty()
    description: string = null;
}
