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
 * カタログ名称操作データ
 */
export default class CatalogNameServiceDto {
    /**
     * オペレータ情報
     */
    private operator: OperatorDomain = null;

    /**
     * ID
     */
    private id: string = null;

    /**
     * カタログ名称
     */
    private name: string = null;

    /**
     * 説明
     */
    private description: string = null;

    /**
     * 拡張ネームスペース
     */
    private extName: string = null;

    public getOperator (): OperatorDomain {
        return this.operator;
    }

    public setOperator (operator: OperatorDomain): void {
        this.operator = operator;
    }

    public getId (): string {
        return this.id;
    }

    public setId (id: string): void {
        this.id = id;
    }

    public getName (): string {
        return this.name;
    }

    public setName (name: string): void {
        this.name = name;
    }

    public getDescription (): string {
        return this.description;
    }

    public setDescription (description: string): void {
        this.description = description;
    }

    public getExtName (): string {
        return this.extName;
    }

    public setExtName (extName: string): void {
        this.extName = extName;
    }
}
