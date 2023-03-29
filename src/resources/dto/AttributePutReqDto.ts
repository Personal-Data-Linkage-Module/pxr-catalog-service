/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import {
    IsDefined,
    IsString,
    IsNumber,
    ValidateNested,
    IsOptional,
    IsNotEmpty,
    IsArray,
} from 'class-validator';
/* eslint-enable */
import { Transform, Type } from 'class-transformer';
import { transformToNumber } from '../../common/Transform';

/**
 * PUT: 変更セット登録変更リクエストDTO
 */
export class CodeVersionObject {
    @Transform(transformToNumber)
    @IsNumber()
    @IsNotEmpty()
    @IsDefined()
    _value: number;

    @Transform(transformToNumber)
    @IsNumber()
    @IsDefined()
    _ver: number;
}

export class ValueObject {
    @IsOptional()
    @Type(() => CodeVersionObject)
    @ValidateNested({ each: true })
    @IsNotEmpty()
    company: CodeVersionObject = null;

    @IsOptional()
    @IsString()
    'manufacturing-name': string;

    @IsOptional()
    @IsString()
    'model-number': string;
}

export class AttributeObject {
    @IsOptional()
    @Type(() => CodeVersionObject)
    @ValidateNested({ each: true })
    @IsNotEmpty()
    key: CodeVersionObject = null;

    @IsOptional()
    @Type(() => ValueObject)
    @ValidateNested({ each: true })
    @IsNotEmpty()
    value: ValueObject = null;

    @IsOptional()
    @IsString()
    description: string = null;

    /**
     * コンストラクタ
     * @param info
     */
    public constructor (info: {}) {
        if (info) {
            this.key = info['key'] ? info['key'] : null;
            this.value = info['value'] ? info['value'] : null;
            this.description = info['description'] ? info['description'] : null;
        }
    }
}

export class Tag {
    @IsOptional()
    @IsString()
    ns: string = null;

    @IsOptional()
    @Type(type => CodeVersionObject)
    @IsArray()
    @ValidateNested({ each: true })
    values: CodeVersionObject[];

    /**
     * コンストラクタ
     * @param info
     */
    public constructor (info: {}) {
        if (info) {
            this.ns = info['ns'] ? info['ns'] : null;
            this.values = info['values'] ? info['values'] : null;
        }
    }
}

export class Attribute {
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => AttributeObject)
    objects: AttributeObject[] = null;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Tag)
    tags: Tag[] = null;
}

export default class AttributePutReqDto {
    /**
     * コード
     */
    @IsDefined()
    @Transform(code => parseInt(code))
    @IsNumber()
    code: number = null;

    /**
     * 属性
     */
    @IsDefined()
    @Type(type => Attribute)
    @ValidateNested({ each: true })
    @IsNotEmpty()
    attribute: Attribute = null;
}
