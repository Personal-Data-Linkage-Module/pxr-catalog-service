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
export default class StubCloudSearchServer {
    _app: express.Express;
    _server: Server;

    constructor (status: number, port: number) {
        this._app = express();

        // イベントハンドラー
        const _listener = (req: express.Request, res: express.Response) => {
            const keyword = req.query ? req.query.q : null;
            if (keyword === 'アクター') {
                res.status(status).json(
                    {
                        hits: {
                            found: 1,
                            hit: [
                                {
                                    id: 1,
                                    fields: {
                                        code: 46,
                                        _score: 0,
                                        description: 'ユニットテスト用スタブ',
                                        id: 1,
                                        name: 'name',
                                        ext_name: 'unit-test'
                                    }
                                }
                            ]
                        }
                    }
                );
            } else if (keyword === 'actorCmatrix') {
                res.status(status).json(
                    {
                        hits: {
                            found: 2,
                            hit: [
                                {
                                    id: 1,
                                    fields: {
                                        code: 46,
                                        _score: 0,
                                        description: 'ユニットテスト用スタブ',
                                        id: 1,
                                        name: 'name',
                                        ext_name: 'unit-test'
                                    }
                                },
                                {
                                    id: 2,
                                    fields: {
                                        code: 30001,
                                        _score: 0,
                                        description: 'ユニットテスト用スタブ(cmatrix-model)',
                                        id: 1,
                                        name: 'cmatrix',
                                        ext_name: 'unit-test'
                                    }
                                }
                            ]
                        }
                    }
                );
            } else {
                res.status(status).end();
            }
        };

        // ハンドラーのイベントリスナーを追加、アプリケーションの起動
        this._app.get('/2013-01-01/search', _listener);
        this._server = this._app.listen(port);
    }
}
