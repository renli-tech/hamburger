import { listen } from "../../modules/listen";
import GraphName from "./graphImport.entity";
import GraphNameResolver from "./graphImport.resolver";
import { resolveGraphNameReference } from "./graphImport.reference";
import { createSubgraph } from "../../helpers/createSubgraph";

export * from "./graphImport.entity";
export * from "./graphImport.resolver";

const name = "graphImport";

export async function init(): Promise<string> {
  const { url, schema } = await listen(
    {
      name,
      orphanedTypes: [GraphName],
      resolvers: [GraphNameResolver],
    },
    { __resolveReference: resolveGraphNameReference }
  );

  await createSubgraph(name, schema);

  return url;
}
