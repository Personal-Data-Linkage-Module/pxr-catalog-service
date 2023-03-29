/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import path = require('path');
import fs = require('fs');
import { connectDatabase } from '../common/Connection';
import { getConnection } from 'typeorm';
/* eslint-enable */

// テスト用にlisten数を無制限に設定
require('events').EventEmitter.defaultMaxListeners = 0;

/**
 * URL
 */
export namespace Url {
    /**
     * ベースURL
     */
    export const baseURI: string = '/catalog';

    /**
     * モデルURL
     */
    export const modelURI: string = baseURI + '/model';

    /**
     * ビルトインURL
     */
    export const builtInURI: string = baseURI + '/built_in';

    /**
     * 拡張URL
     */
    export const extURI: string = baseURI + '/ext';

    /**
     * カタログ名URL
     */
    export const nameURI: string = baseURI + '/name';

    /**
     * カタログコード範囲URL
     */
    export const codeURI: string = baseURI + '/code';

    /**
     * ネームスペースURL
     */
    export const nsURI: string = baseURI + '/ns';

    /**
     * ネームスペースURL(モデル)
     */
    export const nsModelURI: string = nsURI + '/model';

    /**
     * ネームスペースURL(ビルトイン)
     */
    export const nsBuiltInURI: string = nsURI + '/built_in';

    /**
     * ネームスペースURL(拡張)
     */
    export const nsExtURI: string = nsURI + '/ext';

    /**
     * 内部クラスURL
     */
    export const innerURI: string = baseURI + '/inner';

    /**
     * 全文テキスト検索URL
     */
    export const textURI: string = baseURI + '/text';

    /**
     * 変更セットURL
     */
    export const updateSetURI: string = baseURI + '/updateSet';

    /**
     * 変更セット情報取得URL
     */
    export const updateSetSearchInfoURI: string = updateSetURI + '/search/info';

    /**
     * 未承認変更セットリスト取得URL
     */
    export const updateSetSearchRequestURI: string = updateSetURI + '/search/request';

    /**
     * 承認済変更セットリスト取得URL
     */
    export const updateSetSearchApprovalURI: string = updateSetURI + '/search/approval';

    /**
     * 変更セット登録URL
     */
    export const updateSetRegisterURI: string = updateSetURI + '/register';

    /**
     * 変更セット申請URL
     */
    export const updateSetRequestURI: string = updateSetURI + '/request';

    /**
     * 変更セット承認URL
     */
    export const updateSetApprovalURI: string = updateSetURI + '/approval';

    /**
     * 公開カタログ取得URL
     */
    export const getCatalogPubilcURI: string = baseURI + '/public';
}

/**
 * テスト用共通クラス
 */
export default class Common {
    async connect () {
        await connectDatabase();
    }

    /**
     * SQLファイル実行
     * @param fileName
     */
    public async executeSqlFile (fileName: string) {
        // ファイルをオープン
        const fd: number = fs.openSync(path.join('./ddl/unit-test/', fileName), 'r');

        // ファイルからSQLを読込
        const sql: string = fs.readFileSync(fd, 'utf-8');

        // ファイルをクローズ
        fs.closeSync(fd);

        // DBを初期化
        await getConnection('postgres').query(sql);
    }

    /**
     * SQL実行
     * @param sql
     */
    public async executeSqlString (sql: string) {
        // DBを初期化
        await getConnection('postgres').query(sql);
    }
}
