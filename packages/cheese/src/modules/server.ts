import Express, { Application } from "express";
import chalk from "chalk";
import { GRAPHQL_PATH, PORT } from "../config";
import { createServer, Server as HTTPServer } from "http";

class Server {
  private readonly _app: Application;
  private readonly _server: HTTPServer;

  readonly logger: {
    info: (message: string) => void;
    error: (message: string) => void;
  };

  constructor() {
    this._app = Express();
    this._server = createServer(this.app);
    this.logger = {
      info: this.info,
      error: this.error,
    };
  }

  protected get app(): Application {
    return this._app;
  }

  protected get server(): HTTPServer {
    return this._server;
  }

  protected error(message: string): void {
    console.log(`[${chalk.red("ERROR")}] `, message);
  }
  protected info(message: string): void {
    console.log(`[${chalk.blue("INFO")}] `, chalk.green(message));
  }

  start(): void {
    this._server.listen(PORT, () =>
      this.logger.info(
        `Server started at http://localhost:${PORT}${GRAPHQL_PATH} 🚀` + "\n"
      )
    );
  }
}

export default Server;
