import "reflect-metadata";
import "dotenv/config";
import Server from "./modules/server";
import jwt, { Options } from "express-jwt";
import cookieParser from "cookie-parser";
import { ApolloServer } from "apollo-server-express";
import { ExpressContext, ExpressRequest } from "./modules/express";
import { createConnection } from "typeorm";
import { JWT_AUTH } from "./config";
import { PubSub } from "graphql-subscriptions";
import getConnection from "./helpers/getConnection";
import { loadEntities } from "./helpers/loadEntities";
import { ApolloGateway, RemoteGraphQLDataSource } from "@apollo/gateway";
import chalk from "chalk";
import { getServiceList } from "./helpers/getServiceList";

/**
 * The Cheese
 */
class Cheese extends Server {
  constructor() {
    super();
    this.init().catch((error) => {
      this.logger.error(error);
      process.exit(1);
    });
  }

  /**
   * @description Initializing the world most cheessy server
   * Basically the entry point
   */
  async init() {
    await this.setUpAuth();
    await this.setUpDb();
    await this.setupApollo();
    await this.start();
    this.logger.success(chalk.bgYellow("[CHEESE]") + ": Setup Completed");
  }

  /**
   * @description Setting up Authentication with JWT
   */
  async setUpAuth() {
    this.app
      .use(jwt(JWT_AUTH as Options))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .use((err: any, _: any, __: any, next: any) => {
        if (err.name === "UnauthorizedError") next();
      })
      .use(cookieParser());
    this.logger.info("Auth ready");
  }

  /**
   * @description Setting up the Database
   */
  async setUpDb() {
    const config = await getConnection().then((connection) => {
      return {
        ...connection,
        entities: loadEntities(),
        useUnifiedTopology: true,
      };
    });
    createConnection(config)
      .then(async () => {
        this.logger.success("Database Connected");
      })
      .catch((err) => {
        this.logger.error("Error connecting to database " + err);
      });
  }

  async setupApollo() {
    // PubSub
    const pubSub = new PubSub();

    // Service List
    const serviceList = await getServiceList();

    type Context = { req: ExpressRequest };

    const gateway = new ApolloGateway({
      serviceList,
      buildService({ name, url }) {
        return new RemoteGraphQLDataSource<Context>({
          url,
          willSendRequest({ request, context }) {
            const { req } = context as Context;
            // console.log("recive req",req.headers["authorization"]);

            if (req) {
              request.http?.headers.set(
                "user",
                req.user ? JSON.stringify(req.user) : ""
              );
              request.http?.headers.set(
                "authorization",
                req.headers["authorization"] || ""
              );
            }
          },
        });
      },
    });

    const apolloServer = new ApolloServer({
      context: ({ req, res }: ExpressContext) => {
        return { req, res, pubSub };
      },
      gateway,
    });

    // Starting the Apollo server
    await apolloServer.start();
    await apolloServer.applyMiddleware({
      app: this.app,
      cors: { credentials: true, origin: "https://studio.apollographql.com" },
    });
    this.logger.success("Apollo setup correctly");
  }
}

new Cheese();
