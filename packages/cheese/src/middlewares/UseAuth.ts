import { AuthenticationError } from "apollo-server-express";
import { createMethodDecorator } from "type-graphql";
import { Role } from "../entity/User";
import { ResolverContext } from "../modules/resolverContext";

// Just for checking roles and auth
export function UseAuth(roles?: Role[]): MethodDecorator {
  return createMethodDecorator<ResolverContext>(
    async ({ context: { req } }, next) => {
      const argRoles = roles || [];
      if (req?.currentUser) {
        if (argRoles.length === 0) return next();
        if (argRoles.includes(req.currentUser.role)) return next();
        throw new AuthenticationError("Not authorized");
      } else {
        throw new AuthenticationError("Not authenticated");
      }
    }
  );
}
