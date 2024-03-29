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
    IsOptional,
    IsNotEmpty,
    IsArray,
    Min,
    Max,
    ValidateIf
} from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { UpdateSetType } from '../../common/UpdateSet';
import { transformToNumber } from '../../common/Transform';
/* eslint-enable */

/**
 * POST: 変更セット申請リクエストDTO
 */
export class CodeVersionObject {
    @Transform(({ value }) => { return transformToNumber(value); })
    @IsNumber()
    @IsNotEmpty()
    @IsDefined()
        _value: number;

    @Transform(({ value }) => { return transformToNumber(value); })
    @IsNumber()
    @IsDefined()
        _ver: number;
}

export default class UpdateSetRequestPostReqDto {
    /**
     * ID
     */
    @IsDefined()
    @IsNotEmpty()
    @Transform(({ value }) => { return parseInt(value); })
    @IsNumber()
    @Min(1)
        id: number = null;

    /**
     * 承認アクターコードオブジェクト
     */
    @IsDefined()
    @IsNotEmpty()
    @Transform(({ value }) => { return parseInt(value); })
    @IsNumber()
    @Min(1)
        approvalActor: number = null;
}
