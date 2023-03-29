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
import CatalogPostByCodesReqDto from 'resources/dto/CatalogPostByCodesReqDto';
/* eslint-enable */

// SDE-IMPL-REQUIRED 本ファイルをコピーしてサービスレイヤーのDTOを実装します。

/**
 * カタログ操作データ
 */
export default class CatalogServiceDto {
    /**
     * オペレータ情報
     */
    private operator: OperatorDomain = null;

    /**
     * ネームスペース
     */
    private ns: string = null;

    /**
     * タイプ
     */
    private type: string = null;

    /**
     * カタログコード
     */
    private code: number = null;

    /**
     * カタログバージョン
     */
    private version: number = null;

    /**
     * バージョンアップフラグ
     */
    private versionUpFlag: boolean = false;

    /**
     * 論理削除済データ取得フラグ
     */
    private includeDeleted: boolean = false;

    /**
     * 内部クラス名
     */
    private name: string = null;

    /**
     * カタログ情報
     */
    private catalog: {} = null;

    /**
     * カタログコードリスト
     */
    private codes: CatalogPostByCodesReqDto[] = null;

    public getOperator (): OperatorDomain {
        return this.operator;
    }

    public setOperator (operator: OperatorDomain): void {
        this.operator = operator;
    }

    public getNs (): string {
        return this.ns;
    }

    public setNs (ns: string): void {
        this.ns = ns;
    }

    public getType (): string {
        return this.type;
    }

    public setType (type: string): void {
        this.type = type;
    }

    public getCode (): number {
        return this.code;
    }

    public setCode (code: number): void {
        this.code = code;
    }

    public getVersion (): number {
        return this.version;
    }

    public setVersion (version: number): void {
        this.version = version;
    }

    public getVersionUpFlag (): boolean {
        return this.versionUpFlag;
    }

    public setVersionUpFlag (versionUpFlag: boolean): void {
        this.versionUpFlag = versionUpFlag;
    }

    public getIncludeDeleted (): boolean {
        return this.includeDeleted;
    }

    public setIncludeDeleted (includeDeleted: boolean): void {
        this.includeDeleted = includeDeleted;
    }

    public getName (): string {
        return this.name;
    }

    public setName (name: string): void {
        this.name = name;
    }

    public getCatalog (): {} {
        return this.catalog;
    }

    public setCatalog (catalog: {}): void {
        this.catalog = catalog;
    }

    public getCodes (): CatalogPostByCodesReqDto[] {
        return this.codes;
    }

    public setCodes (codes: CatalogPostByCodesReqDto[]): void {
        this.codes = codes;
    }
}
