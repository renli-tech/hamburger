import { createParamDecorator } from "type-graphql";
import User from "../entity/User";
import { ResolverContext } from "../modules/resolverContext";

export function ContextUser(): ParameterDecorator {
  return createParamDecorator<ResolverContext>(async ({ context }) => {
    return context.req.currentUser;
  });
}
export type ContextUser = User | null;
