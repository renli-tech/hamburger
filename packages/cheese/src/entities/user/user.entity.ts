import { Directive, ObjectType, Field, ID } from "type-graphql";
import { BaseEntity, Column, Entity, ObjectIdColumn } from "typeorm";

export type Role = "ADMIN" | "USER";

@Entity()
@Directive(`@key(fields: "id")`)
@ObjectType()
class User extends BaseEntity {
  @Field(() => ID)
  @ObjectIdColumn()
  id: string;

  @Field()
  @Column()
  username: string;

  @Column()
  role: Role;
}

export default User;
