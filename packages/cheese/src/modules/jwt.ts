/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Response } from "express";
import jwt from "jsonwebtoken";

import { APP_AUTH_SECRET } from "../config";

type Payload = Record<string, unknown>;

export const createAuthToken = (payload: Payload): string => {
  const token = jwt.sign(payload, APP_AUTH_SECRET!, {
    issuer: "@humor/cheese",
    audience: ["@humor/bun", "@humor/meat"],
    expiresIn: "4w",
    algorithm: "HS256",
  });
  return token;
};

export function decryptToken<T>(token: string, secret: string): T {
  jwt.verify(token, secret);
  const payload = jwt.decode(token);
  return payload as T;
}

export const sendRefreshToken = (res: Response, token: string): void => {
  res.cookie("yxiz", token, {
    httpOnly: true,
    path: "/refresh_token",
  });
};
