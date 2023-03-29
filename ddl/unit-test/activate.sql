/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
-- アクティベート
INSERT INTO pxr_catalog.catalog
(
    id, name, description, ext_name,
    attributes, is_disabled, created_by, created_at, updated_by, updated_at
)
VALUES
(
    '8669de76-5843-4581-b61a-e73b642bf1e0',
    'PXRカタログ',
    '組織が運営するPLR基盤が提供するデータカタログです。',
    'test-org',
    NULL, false,
    'pxr_user', NOW(), 'pxr_user', NOW()
)
;
