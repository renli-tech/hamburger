import { Directive, ObjectType, Field, ID } from "type-graphql";
import { BaseEntity, Column, Entity, ObjectIdColumn } from "typeorm";

export type Role = "ADMIN" | "USER";

@Entity()
@Directive("@extends")
@Directive(`@key(fields: "id")`)
@ObjectType()
class User extends BaseEntity {
  @Directive("@external")
  @Field(() => ID)
  @ObjectIdColumn()
  id: string;

  @Directive("@external")
  @Field()
  @Column()
  username: string;

  @Column()
  role: Role;
}

export default User;
