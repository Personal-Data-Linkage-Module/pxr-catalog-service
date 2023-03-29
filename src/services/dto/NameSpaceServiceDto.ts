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
 * ネームスペース操作データ
 */
export default class NameSpaceServiceDto {
    /**
     * オペレータ情報
     */
    private operator: OperatorDomain = null;

    /**
     * ネームスペースID
     */
    private nsId: number = null;

    /**
     * タイプ
     */
    private type: string = null;

    /**
     * ネームスペース
     */
    private ns: string = null;

    /**
     * 説明
     */
    private description: string = null;

    public getOperator (): OperatorDomain {
        return this.operator;
    }

    public setOperator (operator: OperatorDomain): void {
        this.operator = operator;
    }

    public getNsId (): number {
        return this.nsId;
    }

    public setNsId (nsId: number): void {
        this.nsId = nsId;
    }

    public getType (): string {
        return this.type;
    }

    public setType (type: string): void {
        this.type = type;
    }

    public getNs (): string {
        return this.ns;
    }

    public setNs (ns: string): void {
        this.ns = ns;
    }

    public getDescription (): string {
        return this.description;
    }

    public setDescription (description: string): void {
        this.description = description;
    }
}
