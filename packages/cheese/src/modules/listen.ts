/* eslint-disable  @typescript-eslint/ban-types */
import { ApolloServer } from "apollo-server";
import { buildFederatedSchema } from "../helpers/buildFederatedSchema";
import { Resolvers } from "../helpers/loadResolvers";
import { Logger } from "./Logger";

export const listen = async (
  config: {
    name: string;
    port: number;
    resolvers: Resolvers;
    orphanedTypes: Function[];
  },
  refObj?: {}
): Promise<string> => {
  const { name, port, resolvers, orphanedTypes } = config;

  const schema = await buildFederatedSchema(
    {
      resolvers: resolvers,
      orphanedTypes: orphanedTypes,
    },
    refObj
  );

  const server = new ApolloServer({
    schema,
  });

  const { url } = await server.listen({ port });
  Logger.success(`${name} graph ready at ${url}`);

  return url;
};
