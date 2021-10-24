import { AuthenticationError } from "apollo-server-express";
import { createParamDecorator } from "type-graphql";
import { ResolverContext } from "../modules/resolverContext";

export function CurrentUser(): ParameterDecorator {
  return createParamDecorator<ResolverContext>(async ({ context }) => {
    if (!context.req.currentUser) {
      throw new AuthenticationError("Not authenticated");
    }

    return context.req.currentUser;
  });
}
