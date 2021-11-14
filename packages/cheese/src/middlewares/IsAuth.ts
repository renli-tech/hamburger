import { MiddlewareFn } from "type-graphql";
import { APP_AUTH_SECRET } from "../config";
import User from "../entities/user/user.entity";
import { ExpressContext } from "../modules/express";
import { decryptToken } from "../modules/jwt";

export const isAuth: MiddlewareFn<ExpressContext> = async (
  { context },
  next
) => {
  const authorization = context.req.headers["authorization"];

  if (!authorization) {
    throw new Error("Please be authenticated");
  }

  try {
    const token = authorization.split(" ")[1];
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const payload = decryptToken<{ id: string }>(token, APP_AUTH_SECRET!);
    context.req.user = payload;
    context.req.currentUser = await User.findOne(payload.id);
  } catch (err) {
    throw new Error("Please be authentated");
  }

  return next();
};
