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
    IsOptional,
    Min,
    Max
} from 'class-validator';
import { Transform } from 'class-transformer';
/* eslint-enable */

/**
 * GET: カタログ履歴取得のリクエストDTO
 */
export default class CatalogGetHistoryCodeReqDto {
    @Min(1)
    @Max(Number.MAX_SAFE_INTEGER)
    @IsNumber()
    @Transform(({ value }) => { return parseInt(value); })
    @IsNotEmpty()
    @IsDefined()
        code: number = null;

    @Min(1)
    @Max(Number.MAX_SAFE_INTEGER)
    @IsNumber()
    @Transform(({ value }) => { return parseInt(value); })
    @IsNotEmpty()
    @IsDefined()
        min: number = null;

    @Min(1)
    @Max(Number.MAX_SAFE_INTEGER)
    @IsNumber()
    @Transform(({ value }) => { return parseInt(value); })
    @IsOptional()
        max: number = null;
}
