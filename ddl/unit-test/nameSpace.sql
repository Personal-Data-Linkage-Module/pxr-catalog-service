/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
-- ネームスペースを全て削除
DELETE FROM pxr_catalog.ns;
SELECT SETVAL('pxr_catalog.ns_id_seq', 1, false);

-- ネームスペースを追加
-- 基本データ用
INSERT INTO pxr_catalog.ns
(
    type, name, description,
    is_disabled, attributes,
    created_by, created_at, updated_by, updated_at
)
VALUES
(
    'model', 'catalog/model/unit-test', 'ユニットテスト用(model)',
    false, null,
    'pxr_user', NOW(), 'pxr_user', NOW()
)
;
INSERT INTO pxr_catalog.ns
(
    type, name, description,
    is_disabled, attributes,
    created_by, created_at, updated_by, updated_at
)
VALUES
(
    'model', 'catalog/model/cmatrix/unit-test', 'ユニットテスト用(cmatrix-model)',
    false, null,
    'pxr_user', NOW(), 'pxr_user', NOW()
)
;
INSERT INTO pxr_catalog.ns
(
    type, name, description,
    is_disabled, attributes,
    created_by, created_at, updated_by, updated_at
)
VALUES
(
    'built_in', 'catalog/built_in/unit-test', 'ユニットテスト用(built_in)',
    false, null,
    'pxr_user', NOW(), 'pxr_user', NOW()
)
;
INSERT INTO pxr_catalog.ns
(
    type, name, description,
    is_disabled, attributes,
    created_by, created_at, updated_by, updated_at
)
VALUES
(
    'built_in', 'catalog/built_in/cmatrix/unit-test', 'ユニットテスト用(cmatrix-built_in)',
    false, null,
    'pxr_user', NOW(), 'pxr_user', NOW()
)
;
INSERT INTO pxr_catalog.ns
(
    type, name, description,
    is_disabled, attributes,
    created_by, created_at, updated_by, updated_at
)
VALUES
(
    'ext', 'catalog/ext/unit-test', 'ユニットテスト用(ext)',
    false, null,
    'pxr_user', NOW(), 'pxr_user', NOW()
)
;
INSERT INTO pxr_catalog.ns
(
    type, name, description,
    is_disabled, attributes,
    created_by, created_at, updated_by, updated_at
)
VALUES
(
    'ext', 'catalog/ext/cmatrix/unit-test', 'ユニットテスト用(cmatrix-ext)',
    false, null,
    'pxr_user', NOW(), 'pxr_user', NOW()
)
;
INSERT INTO pxr_catalog.ns
(
    type, name, description,
    is_disabled, attributes,
    created_by, created_at, updated_by, updated_at
)
VALUES
(
    'ext', 'catalog/ext/test-org/unit-test', 'ユニットテスト用(extname-ext)',
    false, null,
    'pxr_user', NOW(), 'pxr_user', NOW()
)
;
