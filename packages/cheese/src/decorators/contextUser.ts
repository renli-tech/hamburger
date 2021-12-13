/* eslint-disable @typescript-eslint/no-redeclare */
import { createParamDecorator } from "type-graphql";
import User from "../entities/user/user.entity";
import { ResolverContext } from "../modules/resolverContext";

export function ContextUser(): ParameterDecorator {
  return createParamDecorator<ResolverContext>(async ({ context }) => {
    return context.req.currentUser;
  });
}

export type ContextUser = User | null;
