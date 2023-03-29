/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
// eslint-disable-next-line no-unused-vars
import { createConnection, getConnectionManager, Connection, getConnection } from 'typeorm';
import CatalogEntity from '../repositories/postgres/CatalogEntity';
import CatalogCodeScopeEntity from '../repositories/postgres/CatalogCodeScopeEntity';
import NameSpaceEntity from '../repositories/postgres/NameSpaceEntity';
import CatalogItemEntity from '../repositories/postgres/CatalogItemEntity';
import CatalogItemAttributeEntity from '../repositories/postgres/CatalogItemAttributeEntity';
import CatalogRelationshipEntity from '../repositories/postgres/CatalogRelationshipEntity';
import ItemTemplateEntity from '../repositories/postgres/ItemTemplateEntity';
import TemplatePropertyEntity from '../repositories/postgres/TemplatePropertyEntity';
import TemplateCodeEntity from '../repositories/postgres/TemplateCodeEntity';
import CmatrixIndexEntity from '../repositories/postgres/CmatrixIndexEntity';
import PropertyCandidateEntity from '../repositories/postgres/PropertyCandidateEntity';
import UpdateSetEntity from '../repositories/postgres/UpdateSetEntity';
import UpdateSetNsEntity from '../repositories/postgres/UpdateSetNsEntity';
import UpdateSetCatalogEntity from '../repositories/postgres/UpdateSetCatalogEntity';
import fs = require('fs');

// 環境ごとにconfigファイルを読み込む
const connectOption = JSON.parse(fs.readFileSync('./config/ormconfig.json', 'utf-8'));

// エンティティを設定
connectOption['entities'] = [
    CatalogEntity,
    CatalogCodeScopeEntity,
    NameSpaceEntity,
    CatalogItemEntity,
    CatalogItemAttributeEntity,
    CatalogRelationshipEntity,
    ItemTemplateEntity,
    TemplatePropertyEntity,
    TemplateCodeEntity,
    CmatrixIndexEntity,
    PropertyCandidateEntity,
    UpdateSetEntity,
    UpdateSetCatalogEntity,
    UpdateSetNsEntity
];

/**
 * DBクラス
 */
export default class Db {
    /**
     * DB接続オブジェクト
     */
    private connection: Connection = null;

    /**
     * DB接続オブジェクト取得
     */
    public getConnect (): Connection {
        return this.connection;
    }

    /**
     * DB接続
     */
    public async connect () {
        try {
            // DB接続を取得
            this.connection = await createConnection(connectOption);
        } catch (err) {
            if (err.name === 'AlreadyHasActiveConnectionError') {
                // 既にアクティブな接続が存在する場合
                this.connection = getConnectionManager().get('postgres');
            } else {
                throw err;
            }
        }
    }

    /**
     * DB切断
     */
    public async disconnect () {
        // 切断は不要な為、切断しない
        /*
        if (this.connection && this.connection.isConnected) {
            // DB切断
            await this.connection.close();
        }
        */
    }
}
