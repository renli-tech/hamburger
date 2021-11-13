import { printSchema, GraphQLSchema } from "graphql";
import gql from "graphql-tag";
import { buildSubgraphSchema } from "@apollo/federation";
import { addResolversToSchema, GraphQLResolverMap } from "apollo-graphql";
import {
  buildSchema,
  BuildSchemaOptions,
  createResolversMap,
} from "type-graphql";
import Container from "typedi";
// import { federationDirectives } from "@apollo/subgraph/dist/directives";

export async function buildFederatedSchema(
  options: Omit<BuildSchemaOptions, "skipCheck">,
  referenceResolvers?: GraphQLResolverMap<any>
): Promise<GraphQLSchema> {
  const schema = await buildSchema({
    ...options,
    container: Container,
    // directives: [...specifiedDirectives, ...federationDirectives, ...(options.directives || [])],
    skipCheck: true,
  });

  const federatedSchema = buildSubgraphSchema({
    typeDefs: gql(printSchema(schema)),
    resolvers: createResolversMap(schema) as any,
  });

  if (referenceResolvers) {
    addResolversToSchema(federatedSchema, referenceResolvers);
  }
  return federatedSchema;
}
