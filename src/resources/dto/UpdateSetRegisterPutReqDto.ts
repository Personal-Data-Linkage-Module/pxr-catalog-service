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

export class NameSpace {
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    ns: string = null;

    @IsOptional()
    @IsString()
    description: string = null;

    /**
     * コンストラクタ
     * @param info
     */
    public constructor (info: {}) {
        if (info) {
            this.ns = info['ns'] ? info['ns'] : null;
            this.description = info['description'] ? info['description'] : null;
        }
    }
}

export class NameSpaceType {
    @IsDefined()
    @IsNotEmpty()
    @Transform(type => parseInt(type))
    @IsNumber()
    @Min(1)
    @Max(3)
    type: number = null;

    @IsOptional()
    @IsNumber()
    nsId: number = null;

    @IsOptional()
    @IsString()
    comment: string = null;

    @IsOptional()
    @ValidateNested()
    @Transform(template => template ? new NameSpace(template) : null)
    template: NameSpace = null;

    /**
     * コンストラクタ
     * @param info
     */
    public constructor (info: {}) {
        if (info) {
            this.type = info['type'] || info['type'] === 0 ? info['type'] : null;
            this.nsId = info['nsId'] || info['nsId'] === 0 ? info['nsId'] : null;
            this.comment = info['comment'] ? info['comment'] : null;
            this.template = info['template'] ? info['template'] : null;
        }
    }
}

export class Catalog {
    @IsDefined()
    @IsNotEmpty()
    catalogItem: {} = null;

    @IsOptional()
    template: {} = null;

    @IsOptional()
    inner: {} = null;

    @IsOptional()
    attribute: {} = null;

    /**
     * コンストラクタ
     * @param info
     */
    public constructor (info: {}) {
        if (info) {
            this.catalogItem = info['catalogItem'] ? info['catalogItem'] : null;
            this.template = info['template'] ? info['template'] : null;
            this.inner = info['inner'] ? info['inner'] : null;
            this.attribute = info['attribute'] ? info['attribute'] : null;
        }
    }
}
export class CatalogType {
    @IsDefined()
    @IsNotEmpty()
    @Transform(type => parseInt(type))
    @IsNumber()
    @Min(1)
    @Max(3)
    type: number = null;

    @IsOptional()
    @IsNumber()
    catalogCode: number = null;

    @IsOptional()
    @IsString()
    comment: string = null;

    @IsOptional()
    @ValidateNested()
    @Transform(template => template ? new Catalog(template) : null)
    template: Catalog = null;

    /**
     * コンストラクタ
     * @param info
     */
    public constructor (info: {}) {
        if (info) {
            this.type = info['type'] || info['type'] === 0 ? info['type'] : null;
            this.catalogCode = info['catalogCode'] || info['catalogCode'] === 0 ? info['catalogCode'] : null;
            this.comment = info['comment'] ? info['comment'] : null;
            this.template = info['template'] ? info['template'] : null;
        }
    }
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

export class AttributeType {
    @IsDefined()
    @IsNotEmpty()
    @Transform(type => parseInt(type))
    @IsNumber()
    @Min(1)
    @Max(3)
    type: number = null;

    @IsDefined()
    @IsNumber()
    catalogCode: number = null;

    @IsOptional()
    @IsString()
    comment: string = null;

    @IsOptional()
    @ValidateNested()
    @Type(() => Attribute)
    attribute: Attribute = null;

    /**
     * コンストラクタ
     * @param info
     */
    public constructor (info: {}) {
        if (info) {
            this.type = info['type'] || info['type'] === 0 ? info['type'] : null;
            this.catalogCode = info['catalogCode'] || info['catalogCode'] === 0 ? info['catalogCode'] : null;
            this.attribute = info['attribute'] ? info['attribute'] : null;
        }
    }
}

export default class UpdateSetRegisterPutReqDto {
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
     * 名称
     */
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    name: string = null;

    /**
     * 説明
     */
    @IsOptional()
    @IsString()
    description: string = null;

    /**
     * タイプ
     */
    @IsOptional()
    @Transform(transformToNumber)
    @IsNumber()
    type: number = null;

    /**
     * ネームスペースリスト
     */
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Transform(nsList => {
        let list: NameSpaceType[] = null;
        if (nsList && Array.isArray(nsList)) {
            list = [];
            for (let index = 0; index < nsList.length; index++) {
                list.push(new NameSpaceType(nsList[index]));
            }
        } else {
            return nsList;
        }
        return list;
    })
    ns: NameSpaceType[] = null;

    /**
     * カタログリスト
     */
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Transform(catalogList => {
        let list: CatalogType[] = null;
        if (catalogList && Array.isArray(catalogList)) {
            list = [];
            for (let index = 0; index < catalogList.length; index++) {
                list.push(new CatalogType(catalogList[index]));
            }
        } else {
            return catalogList;
        }
        return list;
    })
    catalog: CatalogType[] = null;

    /**
     * 属性リスト
     */
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => AttributeType)
    attribute: AttributeType[] = null;

    /**
     * その他
     */
    @IsOptional()
    appendix: {} = null;
}
