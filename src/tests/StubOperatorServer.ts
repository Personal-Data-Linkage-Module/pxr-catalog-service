/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Server } from 'net';
/* eslint-enable */
import * as express from 'express';

/**
 * オペレーターサービス
 */
export default class StubOperatorServer {
    _app: express.Express;
    _server: Server;

    constructor (status: number, type: number) {
        this._app = express();

        // イベントハンドラー
        const _listener = (req: express.Request, res: express.Response) => {
            if (type === 0) {
                res.status(status).json({
                    sessionId: 'sessionId',
                    operatorId: 1,
                    type: type,
                    loginId: 'loginid',
                    name: 'test-user',
                    mobilePhone: '0311112222',
                    auth: {
                        add: true,
                        update: true,
                        delete: true
                    },
                    lastLoginAt: '2020-01-01T00:00:00.000+0900',
                    attributes: {},
                    roles: [
                        {
                            _value: 1,
                            _ver: 1
                        }
                    ],
                    block: {
                        _value: 1000110,
                        _ver: 1
                    },
                    actor: {
                        _value: 1000001,
                        _ver: 1
                    }
                });
            } else {
                res.status(status).json({
                    sessionId: 'sessionId',
                    operatorId: 1,
                    type: type,
                    loginId: 'loginid',
                    name: 'test-user',
                    mobilePhone: '0311112222',
                    auth: {
                        add: true,
                        update: true,
                        delete: true
                    },
                    lastLoginAt: '2020-01-01T00:00:00.000+0900',
                    attributes: {},
                    roles: [
                        {
                            _value: 1,
                            _ver: 1
                        }
                    ],
                    block: {
                        _value: 1000110,
                        _ver: 1
                    },
                    actor: {
                        _value: 1000001,
                        _ver: 1
                    }
                });
            }
        };

        // ハンドラーのイベントリスナーを追加、アプリケーションの起動
        this._app.post('/operator/session', _listener);
        this._server = this._app.listen(3000);
    }
}
