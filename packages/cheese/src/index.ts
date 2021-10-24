import "reflect-metadata";
import "dotenv/config";
import Server from "./modules/server";
import jwt, { Options } from "express-jwt";
import cookieParser from "cookie-parser";
import { buildSchema } from "type-graphql";
import Container from "typedi";
import { loadResolvers } from "./loadResolvers";
import { ApolloServer } from "apollo-server-express";
import { ExpressContext } from "./modules/express";
import {
  ApolloServerPluginCacheControl,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from "apollo-server-core";
import { createConnection } from "typeorm";
import { JWT_AUTH } from "./config";
import { PubSub } from "graphql-subscriptions";
import getConnection from "./modules/readORMConfig";
import { loadEntities } from "./loadEntities";
class App extends Server {
  constructor() {
    super();
    this.init().catch((error) => {
      this.logger.error(error);
      process.exit(1);
    });
  }

  async init() {
    await this.setUpAuth();
    await this.setUpDb();
    await this.setupApollo();
    this.start();
  }

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

  async setUpDb() {
    const config = await getConnection().then((connection) => {
      return { ...connection, entities: loadEntities() };
    });
    createConnection(config)
      .then(async () => {
        this.logger.info("Database Connected");
      })
      .catch((err) => {
        this.logger.error("Error connecting to database " + err);
      });
  }

  async setupApollo() {
    const pubSub = new PubSub();
    const schema = await buildSchema({
      container: Container,
      resolvers: loadResolvers(),
    });
    const apolloServer = new ApolloServer({
      context: ({ req, res }: ExpressContext) => ({ req, res, pubSub }),
      plugins: [
        ApolloServerPluginCacheControl(),
        ApolloServerPluginLandingPageGraphQLPlayground(),
      ],
      schema,
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app: this.app, cors: true });
    this.logger.info("Apollo setup correctly");
  }
}

new App();
