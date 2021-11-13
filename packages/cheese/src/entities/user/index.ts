import { listen } from "../../modules/listen";
import { PORT } from "../../config";
import User from "./user.entity";
import UserResolver from "./user.resolver";
import { resolveUserReference } from "./user.reference";

export * from "./user.entity";
export * from "./user.resolver";

export async function init(): Promise<string> {
  return await listen(
    {
      name: "user",
      port: parseInt(`${PORT}`) + 1,
      orphanedTypes: [User],
      resolvers: [UserResolver],
    },
    { __resolveReference: resolveUserReference }
  );
}
