import { Directive, Field, ObjectType, ID } from "type-graphql";
import { BaseEntity, Entity, ObjectIdColumn } from "typeorm";

@Entity()
@Directive(`@key(fields: "id")`)
@ObjectType()
export default class Post extends BaseEntity {
  @ObjectIdColumn()
  @Field(() => ID)
  id: string;
}
