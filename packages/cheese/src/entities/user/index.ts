import { listen } from "../../modules/listen";
import User from "./user.entity";
import UserResolver from "./user.resolver";
import { resolveUserReference } from "./user.reference";
import { createSubgraph } from "../../helpers/createSubgraph";

export * from "./user.entity";
export * from "./user.resolver";

const name = "user";

export async function init(): Promise<string> {
  const { url, schema } = await listen(
    {
      name,
      orphanedTypes: [User],
      resolvers: [UserResolver],
    },
    { __resolveReference: resolveUserReference }
  );

  await createSubgraph(name, schema);

  return url;
}
