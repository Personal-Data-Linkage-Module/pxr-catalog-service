/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import AppError from '../common/AppError';
import { ResponseCode } from '../common/ResponseCode';
import Config from '../common/Config';
/* eslint-enable */
const Message = Config.ReadConfig('./config/message.json');

/**
 * 検索サービスクラス
 */
export default class SearchService {
    /**
     * データ検索
     * @param keyword
     */
    public async getRecord (keyword: string): Promise<{}> {
        // 検索サービスの実装が必要
        // 実装するまでは例外スロー
        throw new AppError(Message.NOT_IMPLEMENTED_SEARCHSERVICE, ResponseCode.BAD_REQUEST);
    }

    /**
     * データ追加
     * @param id
     * @param code
     * @param description
     * @param name
     */
    public async updateRecord (id: number, code: number, description: string, name: string): Promise<void> {
    }

    /**
     * データ削除
     * @param id
     */
    public async deleteRecord (id: number): Promise<void> {
    }
}
