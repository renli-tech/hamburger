import { GraphQLSchema } from "graphql";
import { gql } from "apollo-server";
import { printSubgraphSchema, buildSubgraphSchema } from "@apollo/subgraph";
import { addResolversToSchema, GraphQLResolverMap } from "apollo-graphql";
import {
  buildSchema,
  BuildSchemaOptions,
  createResolversMap,
} from "type-graphql";
import Container from "typedi";

export async function buildFederatedSchema(
  options: Omit<BuildSchemaOptions, "skipCheck">,
  referenceResolvers?: GraphQLResolverMap<unknown>
): Promise<GraphQLSchema> {
  const schema = await buildSchema({
    ...options,
    container: Container,
    // directives: [...specifiedDirectives, ...federationDirectives, ...(options.directives || [])],
    skipCheck: true,
  });

  const federatedSchema = buildSubgraphSchema({
    typeDefs: gql(printSubgraphSchema(schema)),
    resolvers: createResolversMap(schema) as GraphQLResolverMap<unknown>,
  });

  if (referenceResolvers) {
    addResolversToSchema(federatedSchema, referenceResolvers);
  }
  return federatedSchema;
}
