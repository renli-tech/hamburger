import { ObjectType, Directive, Field, ID } from "type-graphql";
import { ObjectIdColumn } from "typeorm";

@Directive("@extends")
@Directive(`@key(fields: "id")`)
@ObjectType()
export default class User {
  @Directive("@external")
  @Field(() => ID)
  @ObjectIdColumn()
  id: string;
}
