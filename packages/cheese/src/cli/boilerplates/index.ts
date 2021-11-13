import { PORT } from "../../config";
import { listen } from "../../modules/listen";
import GraphNameResolver from "./graphImport.resolver";
import GraphName from "./graphImport.entity";
import { resolveGraphNameReference } from "./graphImport.reference";

export * from "./graphImport.entity";
export * from "./graphImport.resolver";

export async function init(): Promise<string> {
  return await listen(
    {
      name: "user",
      port: parseInt(`${PORT}`) + 2,
      orphanedTypes: [GraphName],
      resolvers: [GraphNameResolver],
    },
    { __resolveReference: resolveGraphNameReference }
  );
}
