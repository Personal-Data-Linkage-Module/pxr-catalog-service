/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/**
 * ネームスペースリクエスト
 */
export namespace CatalogBulkNsRequest {
    export const list: {}[] =
    [
        {
            ns: 'catalog/model/actor',
            description: 'アクターを定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/actor/app',
            description: 'アプリケーションプロバイダーを定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/actor/app/application',
            description: 'アプリケーションを定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/actor/app/share',
            description: 'アプリケーションが提供する状態共有機能を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/actor/app/store',
            description: 'アプリケーションが蓄積可能なデータを定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/actor/consumer',
            description: 'データコンシューマーを定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/actor/data-trader',
            description: 'データ取引サービスプロバイダーを定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/actor/pxr-root',
            description: '流通制御サービスプロバイダーを定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/actor/region-root',
            description: '領域運営サービスプロバイダーを定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/actor/region-root/region',
            description: '領域運営サービスプロバイダーが管理するRegionを定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/actor/wf',
            description: 'ワークフロープロバイダーを定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/actor/wf/role',
            description: 'ワークフロー職員のロールを定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/actor/wf/share',
            description: 'ワークフローが提供する状態共有機能を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/actor/wf/store',
            description: 'ワークフローが蓄積可能なデータを定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/actor/wf/workflow',
            description: 'ワークフローを定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/attribute',
            description: 'カタログ属性を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/attribute/category',
            description: 'カタログ属性（カテゴリ）を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/attribute/category/data',
            description: 'カタログ属性（データカテゴリ）を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/attribute/consideration',
            description: 'カタログ属性（対価）を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/attribute/consideration/store',
            description: 'カタログ属性（蓄積の対価）を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/attribute/consideration/supply',
            description: 'カタログ属性（提供の対価）を定義するための名前空間です。'
        },
        {
            ns: 'catalog/ext/test-org/category/supply/purpose',
            description: '提供先のアクターが提供されたデータを利用する目的のカテゴリを定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/attribute/constraint',
            description: 'カタログ属性（制約）を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/attribute/constraint/refer',
            description: 'カタログ属性（参照制約）を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/attribute/constraint/share',
            description: 'カタログ属性（共有制約）を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/attribute/constraint/store',
            description: 'カタログ属性（蓄積制約）を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/attribute/constraint/supply',
            description: 'カタログ属性（提供制約）を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/attribute/env',
            description: 'カタログ属性（環境情報）を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/attribute/env/thing',
            description: 'カタログ属性（モノに関する環境情報）を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/attribute/env/thing/recorder',
            description: 'カタログ属性（モノに関する環境情報（レコーダー））を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/attribute/env/thing/recorder/company',
            description: 'カタログ属性（モノに関する環境情報（レコーダー）の企業）を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/attribute/env/thing/sensor',
            description: 'カタログ属性（モノに関する環境情報（センサー））を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/attribute/env/thing/sensor/company',
            description: 'カタログ属性（モノに関する環境情報（センサー）の企業）を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/auth',
            description: '操作権を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/auth/actor',
            description: '操作権（アクター認定）を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/auth/alliance',
            description: '操作権（提携）を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/auth/app-wf-user',
            description: '操作権（アプリケーションおよびワークフロー利用者管理）を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/auth/book',
            description: '操作権（My-Condition-Book管理）を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/auth/catalog',
            description: '操作権（カタログ管理）を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/auth/info-account',
            description: '操作権（情報口座管理）を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/auth/join',
            description: '操作権（Region参加）を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/auth/member',
            description: '操作権（運営メンバー管理）を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/auth/setting',
            description: '操作権（アクター設定）を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/auth/workflow',
            description: '操作権（ワークフロー管理）を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/block',
            description: 'PXR-Blockを定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/block/app',
            description: 'アプリケーションプロバイダー用PXR-Blockを定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/block/consumer',
            description: 'データコンシューマー用PXR-Blockを定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/block/data-trader',
            description: 'データ取引サービスプロバイダー用PXR-Blockを定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/block/pxr-root',
            description: '流通制御サービスプロバイダー用PXR-Blockを定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/block/region-root',
            description: '領域運営サービスプロバイダー用PXR-Blockを定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/block/wf',
            description: 'ワークフロープロバイダー用PXR-Blockを定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/book',
            description: 'My-Condition-Bookを定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/book/access-log',
            description: 'My-Condition-Bookに関するアクセスログを定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/book/policy',
            description: 'My-Condition-Bookに関する方針を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/category',
            description: 'カテゴリを定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/category/data',
            description: '個人向けのデータカテゴリを定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/category/share',
            description: '共有に関連するカテゴリを定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/category/share/actor',
            description: '共有先のサービス提供組織のカテゴリを定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/category/share/service',
            description: '共有先のサービス提供組織のワークフローやアプリケーションのサービスカテゴリを定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/category/supply',
            description: '提供に関連するカテゴリを定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/category/supply/actor',
            description: '提供先のアクターカテゴリを定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/category/supply/purpose',
            description: '提供先のアクターが提供されたデータを利用する目的のカテゴリを定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/cmatrix',
            description: 'CMatrix列を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/cmatrix/1',
            description: '個人属性列を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/cmatrix/2',
            description: 'ドキュメント属性列を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/cmatrix/2/1',
            description: 'ドキュメント識別子列を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/cmatrix/2/2',
            description: 'ドキュメント時刻列を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/cmatrix/2/3',
            description: 'アクター列を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/cmatrix/3',
            description: 'イベント属性列を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/cmatrix/3/1',
            description: 'イベント識別子列を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/cmatrix/3/2',
            description: 'イベント時刻列を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/cmatrix/3/3',
            description: 'イベント位置列を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/cmatrix/3/4',
            description: 'イベント環境列を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/cmatrix/3/5',
            description: 'アクター列を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/cmatrix/4',
            description: 'モノ属性列を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/cmatrix/4/1',
            description: 'モノ識別子列を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/cmatrix/4/2',
            description: 'モノ値列を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/cmatrix/4/2/1',
            description: '定性値列を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/cmatrix/4/2/2',
            description: '定量値列を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/cmatrix/4/2/3',
            description: 'バイナリ値列を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/cmatrix/4/2/3/1',
            description: 'バイナリ値列（binary-manage_id）を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/cmatrix/4/2/3/2',
            description: 'バイナリ値列（uri）を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/cmatrix/4/2/3/3',
            description: '自由入力を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/cmatrix/4/3',
            description: 'モノ環境列を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/cmatrix/4/4',
            description: 'アクター列を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/ctoken',
            description: 'CTokenを定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/data-supply-contract',
            description: 'データ提供契約申込に関するの定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/data-supply-contract/condition',
            description: 'データ提供対象者の条件を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/data-supply-contract/target-condition',
            description: 'データ提供対象者の条件を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/document',
            description: 'ドキュメントを定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/env',
            description: '環境情報を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/env/event',
            description: 'イベントに関する環境情報を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/env/thing',
            description: 'モノに関する環境情報を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/event',
            description: 'イベントを定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/event/relation',
            description: '関係性イベントを定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/format',
            description: '値のフォーマットを定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/licence',
            description: 'ワークフロー職員が保有する資格を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/notification',
            description: '通知カテゴリを定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/notification/Region参加申請',
            description: 'Region参加申請の通知カテゴリを定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/notification/アクター認定申請',
            description: 'アクター認定申請の通知カテゴリを定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/notification/データ提供',
            description: 'アクター認定申請の通知カテゴリを定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/notification/利用者',
            description: '利用者の通知カテゴリを定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/notification/情報口座',
            description: '情報口座の通知カテゴリを定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/notification/提携申請',
            description: '提携申請の通知カテゴリを定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/notification/本人性確認コード',
            description: '本人性確認コードの通知カテゴリを定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/page',
            description: '文章構造を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/person',
            description: '個人属性を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/person/identification',
            description: '本人性確認事項を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/person/item-type',
            description: '個人属性の項目種別を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/person/profile',
            description: 'プロフィールを定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/person/user-information',
            description: '利用者情報を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/processing',
            description: '加工処理を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/processing/method',
            description: '加工処理の方法を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/purpose',
            description: '提供先のアクターが提供されたデータを利用する目的のカテゴリを定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/qualitative',
            description: '定性値候補を定義するための名前空間です。'
        },
        {
            ns: 'catalog/ext/test-org/qualitative/qa',
            description: 'QAの定性値候補を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/qualitative/experience',
            description: 'あり・なし（有無）の候補値を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/qualitative/gender',
            description: '性別の候補値を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/qualitative/qa',
            description: '回答候補を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/qualitative/relation',
            description: '関係性の候補値を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/qualitative/relation/trust',
            description: '関係性（My-Condition-Bookの管理に関する信託関係）の候補値を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/qualitative/Yes_or_No',
            description: 'はい・いいえの候補値を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/setting',
            description: '流通制御によるグローバル設定を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/setting/actor',
            description: '流通制御によるアクター個別設定を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/setting/actor/app',
            description: '流通制御によるアプリケーションプロバイダーのアクター個別設定を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/setting/actor/consumer',
            description: '流通制御によるデータコンシューマーのアクター個別設定を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/setting/actor/data-trader',
            description: '流通制御によるデータ取引サービスプロバイダーのアクター個別設定を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/setting/actor/pxr',
            description: '流通制御によるPXRポータルの個別設定を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/setting/actor/pxr-root',
            description: '流通制御による流通制御サービスプロバイダーのアクター個別設定を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/setting/actor/region-root',
            description: '流通制御による領域運営サービスプロバイダーのアクター個別設定を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/setting/actor/wf',
            description: '流通制御によるワークフロープロバイダーのアクター個別設定を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/setting/actor-own',
            description: 'アクターによる個別設定を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/setting/actor-own/app',
            description: 'アプリケーションプロバイダーによるアクター個別設定を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/setting/actor-own/consumer',
            description: 'データコンシューマーによるアクター個別設定を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/setting/actor-own/data-trader',
            description: 'データ取引サービスプロバイダーによるアクター個別設定を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/setting/actor-own/pxr',
            description: '流通制御によるPXRポータルの個別設定を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/setting/actor-own/pxr-root',
            description: '流通制御サービスプロバイダーによるアクター個別設定を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/setting/actor-own/region-root',
            description: '領域運営サービスプロバイダーによるアクター個別設定を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/setting/actor-own/wf',
            description: 'ワークフロープロバイダーによるアクター個別設定を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/setting/global',
            description: 'システム全体のグローバル設定を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/thing',
            description: 'モノを定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/thing/qa',
            description: '質問を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/thing/qa/group',
            description: '質問グループを定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/thing/relation',
            description: '関係性を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/thing/autocode',
            description: 'codeの自動生成を確認するための名前空間です。'
        },
        {
            ns: 'catalog/model/unit',
            description: '単位を定義するための名前空間です。'
        },
        {
            ns: 'catalog/model/unit/ratio',
            description: '割合の単位を定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/attribute',
            description: 'カタログ属性を定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/attribute/env',
            description: 'カタログ属性（環境情報）を定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/attribute/env/thing',
            description: 'カタログ属性（モノに関する環境情報）を定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/attribute/env/thing/recorder',
            description: 'カタログ属性（モノに関する環境情報（レコーダー））を定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/attribute/env/thing/recorder/company',
            description: 'カタログ属性（モノに関する環境情報（レコーダー）の企業）を定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/attribute/env/thing/sensor',
            description: 'カタログ属性（モノに関する環境情報（センサー））を定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/attribute/env/thing/sensor/company',
            description: 'カタログ属性（モノに関する環境情報（センサー）の企業）を定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/attribute/recorder',
            description: 'カタログ属性（レコーダー）を定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/attribute/sensor',
            description: 'カタログ属性（センサー）を定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/category',
            description: 'カテゴリを定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/category/data',
            description: '個人向けのデータカテゴリを定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/category/share',
            description: '共有に関連するカテゴリを定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/category/share/actor',
            description: '共有先のサービス提供組織のカテゴリを定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/category/share/service',
            description: '共有先のサービス提供組織のワークフローカテゴリを定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/category/supply',
            description: '提供に関連するカテゴリを定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/category/supply/actor',
            description: '提供先のアクターカテゴリを定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/category/supply/purpose',
            description: '提供先のアクターが提供されたデータを利用する目的のカテゴリを定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/cmatrix',
            description: 'CMatrix列を定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/ctoken',
            description: 'CTokenを定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/data-supply-contract',
            description: 'データ提供契約申込に関するの定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/data-supply-contract/condition',
            description: 'データ提供対象者の条件を定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/document',
            description: 'ドキュメントを定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/env',
            description: '環境情報を定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/env/event',
            description: 'イベントに関する環境情報を定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/env/thing',
            description: 'モノに関する環境情報を定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/env/thing/recorder',
            description: 'モノに関する環境情報（レコーダー）を定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/env/thing/sensor',
            description: 'モノに関する環境情報（センサー）を定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/event',
            description: 'イベントを定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/format',
            description: '値のフォーマットを定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/licence',
            description: 'ワークフロー職員が保有する資格を定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/person',
            description: '個人属性を定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/person/identification',
            description: '本人性確認事項を定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/person/item-type',
            description: '個人属性の項目種別を定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/person/profile',
            description: 'プロフィールを定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/person/user-information',
            description: '利用者情報を定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/processing',
            description: 'データ加工処理を定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/processing/method',
            description: '加工処理の方法を定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/qualitative',
            description: '定性値候補を定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/qualitative/qa',
            description: '回答候補を定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/setting',
            description: '流通制御によるグローバル設定を定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/setting/actor',
            description: '流通制御によるアクター個別設定を定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/setting/actor/app',
            description: '流通制御によるアプリケーションプロバイダーのアクター個別設定を定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/setting/actor/consumer',
            description: '流通制御によるデータコンシューマーのアクター個別設定を定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/setting/actor/data-trader',
            description: '流通制御によるデータ取引サービスプロバイダーのアクター個別設定を定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/setting/actor/pxr',
            description: '流通制御によるPXRポータルの個別設定を定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/setting/actor/pxr-root',
            description: '流通制御による流通制御サービスプロバイダーのアクター個別設定を定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/setting/actor/region-root',
            description: '流通制御による領域運営サービスプロバイダーのアクター個別設定を定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/setting/actor/wf',
            description: '流通制御によるワークフロープロバイダーのアクター個別設定を定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/setting/actor-own',
            description: 'アクターによる個別設定を定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/setting/actor-own/app',
            description: 'アクターによるアプリケーションプロバイダーの個別設定を定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/setting/actor-own/consumer',
            description: 'アクターによるデータコンシューマーのアクター個別設定を定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/setting/actor-own/data-trader',
            description: 'アクターによるデータ取引サービスプロバイダーのアクター個別設定を定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/setting/actor-own/pxr',
            description: 'アクターによるPXRポータルの個別設定を定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/setting/actor-own/pxr-root',
            description: 'アクターによる流通制御サービスプロバイダーのアクター個別設定を定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/setting/actor-own/region-root',
            description: 'アクターによる領域運営サービスプロバイダーのアクター個別設定を定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/setting/actor-own/wf',
            description: 'アクターによるワークフロープロバイダーのアクター個別設定を定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/setting/app',
            description: '流通制御によるアプリケーションプロバイダーのグローバル設定を定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/setting/consumer',
            description: '流通制御によるデータコンシューマーのグローバル設定を定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/setting/data-trader',
            description: '流通制御によるデータ取引サービスプロバイダーのグローバル設定を定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/setting/pxr',
            description: '流通制御によるPXRポータルのグローバル設定を定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/setting/pxr-root',
            description: '流通制御による流通制御サービスプロバイダーのグローバル設定を定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/setting/region-root',
            description: '流通制御による領域運営サービスプロバイダーのグローバル設定を定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/setting/wf',
            description: '流通制御によるワークフロープロバイダーのグローバル設定を定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/thing',
            description: 'モノを定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/thing/relation',
            description: '関係性を定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/unit',
            description: '値の単位を定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/unit/acceleration',
            description: '加速度を定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/unit/angle',
            description: '平面角を定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/unit/area',
            description: '面積を定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/unit/counters',
            description: '助数詞を定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/unit/force',
            description: '力を定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/unit/illuminance',
            description: '照度を定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/unit/length',
            description: '長さを定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/unit/magnetic_flux_density',
            description: '磁束密度を定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/unit/mass',
            description: '重さを定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/unit/number_per_unit',
            description: '単位当たりの数を定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/unit/other',
            description: 'その他の単位を定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/unit/parts_per_notation',
            description: '小さい数値で表される無次元量を定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/unit/power',
            description: '仕事率・工率・電力・放射束を定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/unit/pressure',
            description: '圧力を定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/unit/temperature',
            description: '温度を定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/unit/time',
            description: '時刻を定義するための名前空間です。'
        },
        {
            ns: 'catalog/built_in/unit/velocity',
            description: '速度を定義するための名前空間です。'
        },
        {
            ns: 'catalog/ext/test-org',
            description: '組織固有のカタログ項目を定義するための名前空間です。'
        },
        {
            ns: 'catalog/ext/test-org/licence',
            description: 'ワークフロー職員が保有する資格を定義するための名前空間です。'
        },
        {
            ns: 'catalog/ext/test-org/actor',
            description: 'アクターを定義するための名前空間です。'
        },
        {
            ns: 'catalog/ext/test-org/actor/pxr-root',
            description: '流通制御サービスプロバイダーを定義するための名前空間です。'
        },
        {
            ns: 'catalog/ext/test-org/actor/region-root',
            description: '領域運営サービスプロバイダーを定義するための名前空間です。'
        },
        {
            ns: 'catalog/ext/test-org/person/user-information/actor_1000002',
            description: 'organizationの利用者情報を定義するための名前空間です。'
        },
        {
            ns: 'catalog/ext/test-org/actor/region-root/actor_1000002/region',
            description: 'organizationが管理するRegionを定義するための名前空間です。'
        },
        {
            ns: 'catalog/ext/test-org/data-supply-contract',
            description: 'データ提供契約申込に関するの定義するための名前空間です。'
        },
        {
            ns: 'catalog/ext/test-org/data-supply-contract/condition',
            description: 'データ提供対象者の条件を定義するための名前空間です。'
        },
        {
            ns: 'catalog/ext/test-org/actor/app',
            description: 'アプリケーションプロバイダーを定義するための名前空間です。'
        },
        {
            ns: 'catalog/ext/test-org/actor/wf',
            description: 'ワークフロープロバイダーを定義するための名前空間です。'
        },
        {
            ns: 'catalog/ext/test-org/actor/wf/actor_1000004',
            description: 'テスト用研究プロジェクトを定義するための名前空間です。'
        },
        {
            ns: 'catalog/ext/test-org/actor/wf/actor_1000004/role',
            description: 'テスト用研究プロジェクトのロールを定義するための名前空間です。'
        },
        {
            ns: 'catalog/ext/test-org/actor/wf/actor_1000004/store',
            description: 'テスト用研究プロジェクトが蓄積可能なデータを定義するための名前空間です。'
        },
        {
            ns: 'catalog/ext/test-org/actor/wf/actor_1000004/workflow',
            description: 'テスト用研究プロジェクトのワークフローを定義するための名前空間です。'
        },
        {
            ns: 'catalog/ext/test-org/actor/consumer',
            description: 'データコンシューマーを定義するための名前空間です。'
        },
        {
            ns: 'catalog/ext/test-org/person',
            description: '個人属性を定義するための名前空間です。'
        },
        {
            ns: 'catalog/ext/test-org/person/item-type',
            description: '個人属性の項目種別を定義するための名前空間です。'
        },
        {
            ns: 'catalog/ext/test-org/person/identification',
            description: '本人性確認事項を定義するための名前空間です。'
        },
        {
            ns: 'catalog/ext/test-org/attribute',
            description: 'カタログ属性を定義するための名前空間です。'
        },
        {
            ns: 'catalog/ext/test-org/attribute/env',
            description: 'カタログ属性（環境情報）を定義するための名前空間です。'
        },
        {
            ns: 'catalog/ext/test-org/attribute/env/thing',
            description: 'カタログ属性（モノに関する環境情報）を定義するための名前空間です。'
        },
        {
            ns: 'catalog/ext/test-org/attribute/env/thing/sensor',
            description: 'カタログ属性（モノに関する環境情報（センサー））を定義するための名前空間です。'
        },
        {
            ns: 'catalog/ext/test-org/attribute/env/thing/sensor/company',
            description: 'カタログ属性（モノに関する環境情報（センサー）の企業）を定義するための名前空間です。'
        },
        {
            ns: 'catalog/ext/test-org/attribute/env/thing/recorder',
            description: 'カタログ属性（モノに関する環境情報（レコーダー））を定義するための名前空間です。'
        },
        {
            ns: 'catalog/ext/test-org/attribute/env/thing/recorder/company',
            description: 'カタログ属性（モノに関する環境情報（レコーダー）の企業）を定義するための名前空間です。'
        },
        {
            ns: 'catalog/ext/test-org/event',
            description: 'イベントを定義するための名前空間です。'
        },
        {
            ns: 'catalog/ext/test-org/event/actor_1000004',
            description: 'テスト用研究プロジェクトのイベントを定義するための名前空間です。'
        },
        {
            ns: 'catalog/ext/test-org/thing',
            description: 'モノを定義するための名前空間です。'
        },
        {
            ns: 'catalog/ext/test-org/category',
            description: 'カテゴリを定義するための名前空間です。'
        },
        {
            ns: 'catalog/ext/test-org/category/share',
            description: '共有に関連するカテゴリを定義するための名前空間です。'
        },
        {
            ns: 'catalog/ext/test-org/category/share/actor',
            description: '共有先のサービス提供組織のカテゴリを定義するための名前空間です。'
        },
        {
            ns: 'catalog/ext/test-org/category/share/service',
            description: '共有先のサービス提供組織のワークフローやアプリケーションのサービスカテゴリを定義するための名前空間です。'
        },
        {
            ns: 'catalog/ext/test-org/category/supply',
            description: '提供に関連するカテゴリを定義するための名前空間です。'
        },
        {
            ns: 'catalog/ext/test-org/category/supply/actor',
            description: '提供先のアクターカテゴリを定義するための名前空間です。'
        },
        {
            ns: 'catalog/ext/test-org/category/data',
            description: '個人向けのデータカテゴリを定義するための名前空間です。'
        },
        {
            ns: 'catalog/ext/test-org/env',
            description: '環境情報を定義するための名前空間です。'
        },
        {
            ns: 'catalog/ext/test-org/env/event',
            description: 'イベントに関する環境情報を定義するための名前空間です。'
        },
        {
            ns: 'catalog/ext/test-org/env/thing',
            description: 'モノに関する環境情報を定義するための名前空間です。'
        },
        {
            ns: 'catalog/ext/test-org/qualitative',
            description: '定性値候補を定義するための名前空間です。'
        },
        {
            ns: 'catalog/ext/test-org/document',
            description: 'ドキュメントを定義するための名前空間です。'
        },
        {
            ns: 'catalog/ext/test-org/document/actor_1000004',
            description: 'テスト用研究プロジェクトのドキュメントを定義するための名前空間です。'
        },
        {
            ns: 'catalog/ext/test-org/processing',
            description: 'データ加工処理を定義するための名前空間です。'
        },
        {
            ns: 'catalog/ext/test-org/processing/method',
            description: '加工処理の方法を定義するための名前空間です。'
        },
        {
            ns: 'catalog/ext/test-org/ctoken',
            description: 'CTokenを定義するための名前空間です。'
        }
    ];
}
