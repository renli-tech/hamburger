import User from "./user.entity";

export async function resolveUserReference(
  reference: Pick<User, "id">
): Promise<User | undefined> {
  return await User.findOne(reference.id);
}
