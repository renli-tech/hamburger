import { listen } from "../../modules/listen";
import Post from "./post.entity";
import PostResolver from "./post.entity";
import { resolvePostReference } from "./post.reference";
import { createSubgraph } from "../../helpers/createSubgraph";

export * from "./post.entity";
export * from "./post.resolver";

const name = "post";

export async function init(): Promise<string> {
  const { url, schema } = await listen(
    {
      name,
      orphanedTypes: [Post],
      resolvers: [PostResolver],
    },
    { __resolveReference: resolvePostReference }
  );

  await createSubgraph(name, schema);

  return url;
}
