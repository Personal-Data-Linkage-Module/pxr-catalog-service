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
    IsArray
} from 'class-validator';
import { Transform } from 'class-transformer';
/* eslint-enable */

export class CodeObject {
    @IsDefined()
    @IsNotEmpty()
    @Transform(_value => parseInt(_value))
    @IsNumber()
    _value: number = null;

    @IsDefined()
    @IsNotEmpty()
    @Transform(_ver => parseInt(_ver))
    @IsNumber()
    _ver: number = null;
}
/**
 * GET: カタログ取得のリクエストDTO
 */
export default class CatalogPostByCodesReqDto {
    @IsDefined()
    @IsNotEmpty()
    @IsArray({ each: true })
    // eslint-disable-next-line no-use-before-define
    _code: CodeObject = null;
}
