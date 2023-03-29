/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
INSERT INTO pxr_catalog.catalog_item
(
    id, code, version, ns_id, name, description,
    inherit_code, inherit_version, is_reserved, is_disabled,
    response,
    attributes,
    created_by, created_at, updated_by, updated_at
) VALUES 
(
    101, 46, 1, 1, 'アクター', 'ユニットテスト用(model)',
    NULL, NULL, False, False,
    '{"catalogItem":{"ns":"catalog/model/unit-test","name":"アクター","_code":{"_value":46,"_ver":1},"inherit":null,"description":"ユニットテスト用(model)"},"template":{"_code":{"_value":46,"_ver":1},"information-site":null,"region-alliance":null,"share":null,"store":null},"prop":null,"attribute":null}',
    NULL,
    'catalog_registrant', '2021/11/10 11:30:01.087', 'catalog_registrant', '2021/11/10 11:30:01.087'
),
(
    102, 30001, 2, 2, 'CMatrix', 'ユニットテスト用(cmatrix-model)',
    107, 1, False, False,
    '{"catalogItem":{"ns":"catalog/model/cmatrix/unit-test","name":"CMatrix","_code":{"_value":30001,"_ver":1},"inherit":{"_value":107,"_ver":1},"description":"本人性確認で利用する運転免許証の定義です。"},"template":{"_code":{"_value":30001,"_ver":1},"information-site":null,"region-alliance":null,"share":null,"store":null},"prop":null,"attribute":null}',
    null,
    'catalog_registrant', '2021/11/09 15:18:00.477', 'catalog_registrant', '2021/11/09 15:18:00.477'
),
(
    103, 30002, 1, 3, 'CMatrix', 'ユニットテスト用(built_in)',
    NULL, NULL, False, False,
    '{"catalogItem":{"ns":"catalog/built_in/unit-test","name":"CMatrix","_code":{"_value":20025,"_ver":1},"inherit":null,"description":"本人性確認で利用する運転免許証の定義です。"},"template":{"_code":{"_value":30001,"_ver":1},"information-site":null,"region-alliance":null,"share":null,"store":null},"prop":null,"attribute":null}',
    null,
    'catalog_registrant', '2021/11/09 15:18:00.477', 'catalog_registrant', '2021/11/09 15:18:00.477'
)
;

INSERT INTO pxr_catalog.catalog_item_attribute
(
    type, catalog_item_id, catalog_code, key_code, key_version, 
    ns_id, value, description,
    is_disabled, created_by, created_at, updated_by, updated_at
) VALUES
(
    1, 101, 46, 100001, 1,
    null, '{company:{_value:1000055,_ver: 1},"manufacturing-name":"鼓膜温センサー","model-number":"C-Temp"}','センサー属性',
    false, 'catalog_registrant', '2021/11/09 15:18:00.477', 'catalog_registrant', '2021/11/09 15:18:00.477'
),
(
    2, 101, 46, null, null,
    1, '[{_value: 124120,_ver: 1}]',null,
    false, 'catalog_registrant', '2021/11/09 15:18:00.477', 'catalog_registrant', '2021/11/09 15:18:00.477'
),
(
    1, 102, 30001, 30004, 1,
    null, '{company:{_value:1000055,_ver: 1},"manufacturing-name":"鼓膜温センサー","model-number":"C-Temp"}','センサー属性',
    false, 'catalog_registrant', '2021/11/09 15:18:00.477', 'catalog_registrant', '2021/11/09 15:18:00.477'
),
(
    2, 102, 30001, null, null,
    2, '[{_value: 124124,_ver: 1}]',null,
    false, 'catalog_registrant', '2021/11/09 15:18:00.477', 'catalog_registrant', '2021/11/09 15:18:00.477'
),
(
    1, 103, 20025, 20026, 1,
    null, '{company:{_value:124124,_ver: 1},"manufacturing-name":"鼓膜温センサー","model-number":"C-Temp"}','センサー属性',
    false, 'catalog_registrant', '2021/11/09 15:18:00.477', 'catalog_registrant', '2021/11/09 15:18:00.477'
),
(
    2, 103, 20025, null, null,
    2, '[{_value: 100001,_ver: 1},{_value: 12400,_var: 1}]',null,
    false, 'catalog_registrant', '2021/11/09 15:18:00.477', 'catalog_registrant', '2021/11/09 15:18:00.477'
)
;
