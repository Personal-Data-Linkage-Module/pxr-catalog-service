/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
-- ネームスペースを追加
-- 継承データ用
INSERT INTO pxr_catalog.ns
(
    type, name, description,
    is_disabled, attributes,
    created_by, created_at, updated_by, updated_at
)
VALUES
(
    'model', 'catalog/model/unit-test/inherit', 'ユニットテストinherit用(model)',
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
    'built_in', 'catalog/built_in/unit-test/inherit', 'ユニットテストinherit用(built_in)',
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
    'ext', 'catalog/ext/unit-test/inherit', 'ユニットテストinherit用(ext)',
    false, null,
    'pxr_user', NOW(), 'pxr_user', NOW()
)
;
-- cmatrixデータ用
INSERT INTO pxr_catalog.ns
(
    type, name, description,
    is_disabled, attributes,
    created_by, created_at, updated_by, updated_at
)
VALUES
(
    'model', 'catalog/model/unit-test/cmatrix', 'ユニットテストcmatrix用(model)',
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
    'built_in', 'catalog/built_in/unit-test/cmatrix', 'ユニットテストcmatrix用(built_in)',
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
    'ext', 'catalog/ext/unit-test/cmatrix', 'ユニットテストcmatrix用(ext)',
    false, null,
    'pxr_user', NOW(), 'pxr_user', NOW()
)
;
