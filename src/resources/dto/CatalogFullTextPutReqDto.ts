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
 * PUT: カタログ全文検索更新のリクエストDTO
 */
export default class CatalogFullTextPutReqDto {
    @IsDefined()
    @IsNotEmpty()
    @Transform(code => parseInt(code))
    @IsNumber()
    code: number = null;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    description: string = null;

    @IsDefined()
    @IsNotEmpty()
    @Transform(id => parseInt(id))
    @IsNumber()
    id: number = null;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    name: string = null;
}
