import { Request, Response } from "express";
import User from "../entities/user/user.entity";

export interface ExpressRequest extends Request {
  user?: { id: string };
  currentUser?: User;
}
export interface ExpressContext {
  req: ExpressRequest;
  res: Response;
}
