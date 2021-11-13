import { Field, ObjectType } from "type-graphql";
import User from "../entities/user/user.entity";

@ObjectType()
export class AuthResponse {
  @Field()
  user: User;

  @Field()
  token: string;
}
