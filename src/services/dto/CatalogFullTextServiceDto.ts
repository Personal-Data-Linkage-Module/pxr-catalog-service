/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/**
 *
 *
 *
 * $Date$
 * $Revision$
 * $Author$
 *
 * TEMPLATE VERSION :  76463
 */
/* eslint-disable */
import OperatorDomain from 'domains/OperatorDomain';
/* eslint-enable */

// SDE-IMPL-REQUIRED 本ファイルをコピーしてサービスレイヤーのDTOを実装します。

/**
 * カタログ全文検索操作データ
 */
export default class CatalogFullTextServiceDto {
    /**
     * オペレータ情報
     */
    private operator: OperatorDomain = null;

    /**
     * 検索キーワード
     */
    private keyword: string = null;

    /**
     * 検索キーワード
     */
    private ns: string[] = null;

    /**
     * 検索キーワード
     */
    private attribute: {}[] = null;

    /**
     * カタログID
     */
    private id: number = null;

    /**
     * カタログコード
     */
    private code: number = null;

    /**
     * 説明
     */
    private description: string = null;

    /**
     * 名称
     */
    private name: string = null;

    public getOperator (): OperatorDomain {
        return this.operator;
    }

    public setOperator (operator: OperatorDomain): void {
        this.operator = operator;
    }

    public getKeyword (): string {
        return this.keyword;
    }

    public setKeyword (keyword: string): void {
        this.keyword = keyword;
    }

    public getNs (): string[] {
        return this.ns;
    }

    public setNs (ns: string[]): void {
        this.ns = ns;
    }

    public getAttribute (): {}[] {
        return this.attribute;
    }

    public setAttribute (attribute: {}[]): void {
        this.attribute = attribute;
    }

    public getId (): number {
        return this.id;
    }

    public setId (id: number): void {
        this.id = id;
    }

    public getCode (): number {
        return this.code;
    }

    public setCode (code: number): void {
        this.code = code;
    }

    public getDescription (): string {
        return this.description;
    }

    public setDescription (description: string): void {
        this.description = description;
    }

    public getName (): string {
        return this.name;
    }

    public setName (name: string): void {
        this.name = name;
    }
}
