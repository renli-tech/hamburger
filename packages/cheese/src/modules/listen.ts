/* eslint-disable  @typescript-eslint/ban-types */
import { ApolloServer } from "apollo-server";
import { ApolloServerPluginInlineTraceDisabled } from "apollo-server-core";
import { GraphQLSchema } from "graphql";
import { PORT } from "../config";
import { buildFederatedSchema } from "../helpers/buildFederatedSchema";
import { Resolvers } from "../helpers/loadResolvers";
import { Logger } from "./Logger";
import { blue } from "chalk";

export const usedPort: { name: string; port: number }[] = [];

export const listen = async (
  config: {
    name: string;
    resolvers: Resolvers;
    orphanedTypes: Function[];
  },
  refObj?: {}
): Promise<{ url: string; schema: GraphQLSchema }> => {
  const { name, resolvers, orphanedTypes } = config;

  const schema = await buildFederatedSchema(
    {
      resolvers: resolvers,
      orphanedTypes: orphanedTypes,
    },
    refObj
  );

  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginInlineTraceDisabled],
  });

  const { url } = await server.listen({ port: await getPort(name) });
  Logger.success(`${blue(name)} subgraph ready at ${url}`);

  return { url, schema };
};

const getPort = async (name: string) => {
  const parentPort = PORT;
  const nextPort = parseInt(parentPort.toString()) + usedPort.length + 1;

  usedPort.push({ name, port: nextPort });
  return nextPort;
};
