/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
-- 対象テーブルのデータをすべて削除
DELETE FROM pxr_catalog.attribute_update_set;
DELETE FROM pxr_catalog.catalog_update_set;
DELETE FROM pxr_catalog.ns_update_set;
DELETE FROM pxr_catalog.update_set;
DELETE FROM pxr_catalog.catalog_code_scope;
DELETE FROM pxr_catalog.catalog_relationship;
DELETE FROM pxr_catalog.catalog_item_attribute;
DELETE FROM pxr_catalog.cmatrix_index;
DELETE FROM pxr_catalog.property_candidate;
DELETE FROM pxr_catalog.template_code;
DELETE FROM pxr_catalog.template_property;
DELETE FROM pxr_catalog.item_template;
DELETE FROM pxr_catalog.catalog_item;
DELETE FROM pxr_catalog.catalog;
DELETE FROM pxr_catalog.ns;

-- 対象テーブルのシーケンスを初期化
SELECT SETVAL('pxr_catalog.catalog_update_set_id_seq', 1, false);
SELECT SETVAL('pxr_catalog.ns_update_set_id_seq', 1, false);
SELECT SETVAL('pxr_catalog.update_set_id_seq', 1, false);
SELECT SETVAL('pxr_catalog.catalog_code_scope_id_seq', 1, false);
SELECT SETVAL('pxr_catalog.catalog_relationship_id_seq', 1, false);
SELECT SETVAL('pxr_catalog.catalog_item_attribute_id_seq', 1, false);
SELECT SETVAL('pxr_catalog.cmatrix_index_id_seq', 1, false);
SELECT SETVAL('pxr_catalog.property_candidate_id_seq', 1, false);
SELECT SETVAL('pxr_catalog.template_code_id_seq', 1, false);
SELECT SETVAL('pxr_catalog.template_property_id_seq', 1, false);
SELECT SETVAL('pxr_catalog.item_template_id_seq', 1, false);
SELECT SETVAL('pxr_catalog.catalog_item_id_seq', 1, false);
SELECT SETVAL('pxr_catalog.ns_id_seq', 1, false);
