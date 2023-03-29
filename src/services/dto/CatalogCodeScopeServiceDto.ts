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
 * カタログコード範囲操作データ
 */
export default class CatalogCodeScopeServiceDto {
    /**
     * オペレータ情報
     */
    private operator: OperatorDomain = null;

    /**
     * カタログコード範囲ID
     */
    private id: number = null;

    /**
     * タイプ
     */
    private type: string = null;

    /**
     * カタログコード範囲開始
     */
    private startCode: number = null;

    /**
     * カタログコード範囲終了
     */
    private endCode: number = null;

    public getOperator (): OperatorDomain {
        return this.operator;
    }

    public setOperator (operator: OperatorDomain): void {
        this.operator = operator;
    }

    public getId (): number {
        return this.id;
    }

    public setId (id: number): void {
        this.id = id;
    }

    public getType (): string {
        return this.type;
    }

    public setType (type: string): void {
        this.type = type;
    }

    public getStartCode (): number {
        return this.startCode;
    }

    public setStartCode (startCode: number): void {
        this.startCode = startCode;
    }

    public getEndCode (): number {
        return this.endCode;
    }

    public setEndCode (endCode: number): void {
        this.endCode = endCode;
    }
}
