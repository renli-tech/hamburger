import { MinLength } from "class-validator";
import { Directive, Field, ObjectType, ID } from "type-graphql";
import {
  BaseEntity,
  Entity,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity()
@Directive(`@key(fields: "id")`)
@ObjectType()
export default class Post extends BaseEntity {
  @ObjectIdColumn()
  @Field(() => ID)
  id: string;

  @Field()
  @Column()
  @MinLength(2)
  caption: string;

  @Field()
  @Column()
  postedById: string;

  @Field()
  @CreateDateColumn()
  datePosted: Date;
}
