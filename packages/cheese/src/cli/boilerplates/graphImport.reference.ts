import GraphName from "./graphImport.entity";

export async function resolveGraphNameReference(
  reference: Pick<GraphName, "id">
): Promise<GraphName | undefined> {
  const products = await GraphName.findOne({ id: reference.id });

  return products;
}
