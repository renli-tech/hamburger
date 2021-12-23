/* eslint-disable  @typescript-eslint/ban-types */
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginInlineTraceDisabled } from "apollo-server-core";
import { GraphQLSchema } from "graphql";
import { JWT_AUTH, PORT } from "../config";
import { buildFederatedSchema } from "../helpers/buildFederatedSchema";
import { Resolvers } from "../helpers/loadResolvers";
import { Logger } from "./Logger";
import { blue } from "chalk";
import express from "express";
import { createServer } from "http";
import { PubSub } from "graphql-subscriptions";
import jwt, { Options } from "express-jwt";
import cookieParser from "cookie-parser";

export const usedPort: { name: string; port: number }[] = [];

export const listen = async (
  config: {
    name: string;
    resolvers: Resolvers;
    orphanedTypes: Function[];
  },
  refObj?: {}
): Promise<{ url: string; schema: GraphQLSchema }> => {
  const app = express();
  app
    .use(jwt(JWT_AUTH as Options))
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .use((err: any, _: any, __: any, next: any) => {
      if (err.name === "UnauthorizedError") next();
    })
    .use(cookieParser());
  const server = createServer(app);
  const { name, resolvers, orphanedTypes } = config;

  const schema = await buildFederatedSchema(
    {
      resolvers: resolvers,
      orphanedTypes: orphanedTypes,
    },
    refObj
  );

  // PubSub
  const pubSub = new PubSub();

  const apollo = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginInlineTraceDisabled],
    context: ({ res, req }) => ({ res, req, pubSub }),
  });

  const port = await getPort(name);
  const url = `http://localhost:${port}/graphql`;

  await apollo.start();
  await apollo.applyMiddleware({
    app,
    cors: { credentials: true, origin: "https://studio.apollographql.com" },
  });

  await new Promise((res) => {
    server.listen(port, () => {
      res(null);
    });
  });
  Logger.success(`${blue(name)} subgraph ready at ${url}`);

  return { url, schema };
};

const getPort = async (name: string) => {
  const parentPort = PORT;
  const nextPort = parseInt(parentPort.toString()) + usedPort.length + 1;

  usedPort.push({ name, port: nextPort });
  return nextPort;
};
