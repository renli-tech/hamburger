import { Request, Response } from "express";
import User from "../entity/User";

export interface ExpressRequest extends Request {
  user?: { id: string };
  currentUser?: User;
}
export interface ExpressContext {
  req: ExpressRequest;
  res: Response;
}
