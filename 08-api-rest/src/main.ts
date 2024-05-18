import express from 'express';
import { router } from './router';
import { userRouter } from './modules/User/router';
class Main {
  private _server;

  constructor() {
    this._server = express();
    this._middleware();
    this._router();
  }

  private _middleware() {
    this.server.use(express.json());
  }

  private _router() {
    this.server.use('/user', userRouter);
  }

  get server() {
    return this._server;
  }
}
export default new Main();
