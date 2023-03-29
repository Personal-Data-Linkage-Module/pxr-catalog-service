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
    101, 46, 1, 1, 'ワークフロー', 'ワークフローの定義です。',
    NULL, NULL, False, False,
    '{"catalogItem":{"ns":"catalog/model/actor/wf/workflow","name":"ワークフロー","_code":{"_value":46,"_ver":1},"inherit":null,"description":"ワークフローの定義です。"},"template":{"_code":{"_value":46,"_ver":1},"information-site":null,"region-alliance":null,"share":null,"store":null},"prop":[{"key":"information-site","type":{"of":"string","cmatrix":null,"format":null,"unit":null,"candidate":null},"description":"ワークフローの情報サイト","isInherit":false},{"key":"region-alliance","type":{"of":"code[]","cmatrix":null,"candidate":{"ns":null,"_code":null,"base":{"_value":48,"_ver":1}}},"description":"参加している領域運営サービスプロバイダーのリージョンコード配列","isInherit":false},{"key":"share","type":{"of":"code[]","cmatrix":null,"candidate":{"ns":null,"_code":null,"base":{"_value":45,"_ver":1}}},"description":"ワークフローが提供する状態共有機能の定義","isInherit":false},{"key":"store","type":{"of":"code[]","cmatrix":null,"candidate":{"ns":null,"_code":null,"base":{"_value":44,"_ver":1}}},"description":"ワークフローが蓄積可能なデータの定義","isInherit":false}],"attribute":null}',
    NULL,
    'catalog_registrant', '2021/11/10 11:30:01.087', 'catalog_registrant', '2021/11/10 11:30:01.087'
),
(
    102, 30001, 2, 2, '運転免許証', '本人性確認で利用する運転免許証の定義です。',
    107, 1, False, False,
    '{"catalogItem":{"ns":"catalog/built_in/person/identification","name":"運転免許証","_code":{"_value":30001,"_ver":1},"inherit":{"_value":107,"_ver":1},"description":"本人性確認で利用する運転免許証の定義です。"},"template":{"_code":{"_value":30001,"_ver":1},"item-group":[{"title":"氏名","item":[{"title":"姓名","type":{"_value":30037,"_ver":1},"content":null}]},{"title":"生年月日（和暦）","item":[{"title":"生年月日（和暦）","type":{"_value":30038,"_ver":1},"content":null}]},{"title":"住所","item":[{"title":"住所","type":{"_value":30035,"_ver":1},"content":null}]}],"verification-ratio":null},"prop":[{"key":"item-group","type":{"of":"inner[]","inner":"ItemGroup","cmatrix":null,"candidate":null},"description":"個人属性グループの配列","isInherit":true},{"key":"verification-ratio","type":{"of":"number","cmatrix":null,"format":null,"unit":{"_value":20009,"_ver":1},"candidate":null},"description":"本人性の検証率","isInherit":true}],"attribute":null}',
    null,
    'catalog_registrant', '2021/11/09 15:18:00.477', 'catalog_registrant', '2021/11/09 15:18:00.477'
)
;

INSERT INTO pxr_catalog.ns
(
    type, name, description, is_disabled,
    attributes,
    created_by, created_at, updated_by, updated_at
) VALUES
(
    'ext', 'catalog/model/actor/wf/workflow', 'ワークフローの定義です。', False,
    NULL,
    'catalog_registrant', '2021/11/09 17:17:01.783', 'catalog_registrant', '2021/11/09 17:17:01.783'
),
(
    'ext', 'catalog/built_in/person/identification', '本人性確認で利用する運転免許証の定義です。', False,
    NULL,
    'catalog_registrant', '2021/11/09 17:17:01.792', 'catalog_registrant', '2021/11/09 17:17:01.792'
)
;
