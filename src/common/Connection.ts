/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Connection, createConnection, getConnectionManager } from 'typeorm';
import Config from './Config';
import CatalogEntity from '../repositories/postgres/CatalogEntity';
import NameSpaceEntity from '../repositories/postgres/NameSpaceEntity';
import CatalogCodeScopeEntity from '../repositories/postgres/CatalogCodeScopeEntity';
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
import UpdateSetAttributeEntity from '../repositories/postgres/UpdateSetAttributeEntity';
import { applicationLogger } from './logging';
import { sprintf } from 'sprintf-js';
/* eslint-enable */
// import uuid = require('uuid');
// const contextService = require('request-context');

const config = Config.ReadConfig('./config/ormconfig.json');

// エンティティを設定
config['entities'] = [
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
    UpdateSetNsEntity,
    UpdateSetAttributeEntity
];

/**
 * コネクションの生成
 */
export async function connectDatabase (): Promise<Connection> {
    let connection = null;
    try {
        // データベースに接続
        connection = await createConnection(config);
    } catch (err) {
        if (err.name === 'AlreadyHasActiveConnectionError') {
            // すでにコネクションが張られている場合には、流用する
            connection = getConnectionManager().get('postgres');
        } else {
            throw err;
        }
    }
    // 接続したコネクションを返却
    return connection;
}
