/**
 * GET: カタログ履歴取得のレスポンスDTO
 */
export class CodeObject {
    _value: number = null;

    _ver: number = null;
}

export class CatalogItem {
    ns: string = null;

    name: string = null;

    _code: CodeObject = null;

    inherit: CodeObject = null;

    description: string = null;
}

export default class CatalogGetHistoryCodeResDto {
    catalogItem: CatalogItem = null;

    template: {} = null;

    prop: {}[] | null = null;

    value: {}[] | null = null;

    attribute: {} | null = null;
}
