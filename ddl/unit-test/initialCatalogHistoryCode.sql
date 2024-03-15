INSERT INTO pxr_catalog.catalog_item
(
    id, code, version, ns_id, name, description,
    inherit_code, inherit_version, is_reserved, is_disabled,
    response,
    attributes,
    created_by, created_at, updated_by, updated_at
) VALUES
(
    101, 1000001, 1, 5, 'ユニットテスト', 'ユニットテスト用(ext)',
    NULL, NULL, False, False,
    '{ "catalogItem": { "ns": "catalog/ext/unit-test", "name": "ユニットテスト", "_code": { "_value": 1000001, "_ver": 1 }, "inherit": null, "description": null }, "template": { "_code": { "_value": 1000001, "_ver": 1 } }, "prop": null, "value": null, "attribute": null }',
    NULL,
    'catalog_registrant', '2021/11/10 11:30:01.087', 'catalog_registrant', '2021/11/10 11:30:01.087'
),
(
    102, 1000001, 2, 5, 'ユニットテスト', 'ユニットテスト用(ext)',
    NULL, NULL, False, False,
    '{ "catalogItem": { "ns": "catalog/ext/unit-test", "name": "ユニットテスト", "_code": { "_value": 1000001, "_ver": 2 }, "inherit": null, "description": null }, "template": { "_code": { "_value": 1000001, "_ver": 2 } }, "prop": null, "value": null, "attribute": null }',
    NULL,
    'catalog_registrant', '2021/11/10 11:31:01.087', 'catalog_registrant', '2021/11/10 11:31:01.087'
),
(
    103, 1000001, 3, 5, 'ユニットテスト', 'ユニットテスト用(ext,論理削除)',
    NULL, NULL, False, true,
    '{ "catalogItem": { "ns": "catalog/ext/unit-test", "name": "ユニットテスト", "_code": { "_value": 1000001, "_ver": 3 }, "inherit": null, "description": null }, "template": { "_code": { "_value": 1000001, "_ver": 3 } }, "prop": null, "value": null, "attribute": null }',
    NULL,
    'catalog_registrant', '2021/11/10 11:32:01.087', 'catalog_registrant', '2021/11/10 11:32:01.087'
),
(
    104, 1000001, 4, 5, 'ユニットテスト', 'ユニットテスト用(ext)',
    NULL, NULL, False, False,
    '{ "catalogItem": { "ns": "catalog/ext/unit-test", "name": "ユニットテスト", "_code": { "_value": 1000001, "_ver": 4 }, "inherit": null, "description": null }, "template": { "_code": { "_value": 1000001, "_ver": 4 } }, "prop": null, "value": null, "attribute": null }',
    NULL,
    'catalog_registrant', '2021/11/10 11:32:01.087', 'catalog_registrant', '2021/11/10 11:32:01.087'
),
(
    105, 1000001, 5, 5, 'ユニットテスト', 'ユニットテスト用(ext)',
    NULL, NULL, False, False,
    '{ "catalogItem": { "ns": "catalog/ext/unit-test", "name": "ユニットテスト", "_code": { "_value": 1000001, "_ver": 5 }, "inherit": null, "description": null }, "template": { "_code": { "_value": 1000001, "_ver": 5 } }, "prop": null, "value": null, "attribute": null }',
    NULL,
    'catalog_registrant', '2021/11/10 11:32:01.087', 'catalog_registrant', '2021/11/10 11:32:01.087'
),
(
    106, 1000002, 1, 5, 'ユニットテスト', 'ユニットテスト用(ext)',
    NULL, NULL, False, False,
    '{ "catalogItem": { "ns": "catalog/ext/unit-test", "name": "ユニットテスト", "_code": { "_value": 1000002, "_ver": 1 }, "inherit": null, "description": null }, "template": { "_code": { "_value": 1000002, "_ver": 1 } }, "prop": null, "value": null, "attribute": null }',
    NULL,
    'catalog_registrant', '2021/11/10 11:30:01.087', 'catalog_registrant', '2021/11/10 11:30:01.087'
)
;