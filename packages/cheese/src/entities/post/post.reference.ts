import Post from "./post.entity";

export async function resolvePostReference(
  reference: Pick<Post, "id">
): Promise<Post | undefined> {
  const products = await Post.findOne({ id: reference.id });

  return products;
}
