import { GraphQLRequestContext, GraphQLResponse } from "apollo-server-types";

export function formatResponse(
  res: GraphQLResponse | null,
  context: GraphQLRequestContext<unknown>
): GraphQLResponse {
  console.log("\n");
  if (context.operationName !== "IntrospectionQuery") {
    console.log(
      (context.operation?.operation
        ? `${context.operation.operation.replace(/(?:^|\s|-)\S/g, (x) =>
            x.toUpperCase()
          )}: `
        : "") + context.operationName
    );
  }

  if (!res) throw Error("No response");
  return res;
}
