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
    Min,
    Max
} from 'class-validator';
import { Transform } from 'class-transformer';
import { UpdateSetStatus } from '../../common/UpdateSet';
/* eslint-enable */

/**
 * POST: 変更セット承認リクエストDTO
 */
export default class UpdateSetApprovalPostReqDto {
    /**
     * ID
     */
    @IsDefined()
    @IsNotEmpty()
    @Transform(id => parseInt(id))
    @IsNumber()
    @Min(1)
    id: number = null;

    /**
     * ステータス
     */
    @IsDefined()
    @IsNotEmpty()
    @Transform(id => parseInt(id))
    @IsNumber()
    @Min(UpdateSetStatus.APPROVAL)
    @Max(UpdateSetStatus.DENY)
    status: number = null;

    /**
     * 承認コメント
     */
    @IsDefined()
    @IsString()
    @IsOptional()
    comment: string = null;
}
