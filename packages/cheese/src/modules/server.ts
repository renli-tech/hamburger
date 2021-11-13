import Express, { Application } from "express";
import { GRAPHQL_PATH, PORT } from "../config";
import { createServer, Server as HTTPServer } from "http";
import { Logger } from "./Logger";

class Server {
  private readonly _app: Application;
  private readonly _server: HTTPServer;

  readonly logger = Logger;

  constructor() {
    this._app = Express();
    this._server = createServer(this.app);
  }

  protected get app(): Application {
    return this._app;
  }

  protected get server(): HTTPServer {
    return this._server;
  }

  async start(): Promise<void> {
    this._server.listen(PORT, () =>
      this.logger.success(
        `Server started at http://localhost:${PORT}${GRAPHQL_PATH} 🚀` + "\n"
      )
    );

    return;
  }
}

export default Server;
