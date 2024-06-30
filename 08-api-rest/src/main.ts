import express from 'express';
// import { userRouter } from './modules/User/router';
import { router } from './router';
class Main {
  private _server;

  constructor() {
    this._server = express();
    this._middleware();
    this._router();
  }

  private _middleware() {
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: true }));
  }

  private _router() {
    this.server.use(router);
  }

  get server() {
    return this._server;
  }
}
export default new Main();
