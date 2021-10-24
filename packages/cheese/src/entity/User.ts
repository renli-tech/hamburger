import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { ObjectType, Field, ArgsType, Int } from "type-graphql";
import {
  Entity,
  Column,
  BaseEntity,
  BeforeInsert,
  ObjectID,
  ObjectIdColumn,
} from "typeorm";

export type Role = "ADMIN" | "USER";

@ArgsType()
export class LoginInput implements Partial<User> {
  @IsNotEmpty()
  @Field()
  email: string;

  @IsNotEmpty()
  @Field()
  password: string;
}

@ArgsType()
export class RegisterInput implements Partial<User> {
  @IsNotEmpty()
  @Field()
  username: string;

  @IsNotEmpty()
  @Field()
  password: string;

  @IsNotEmpty()
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  age: number;
}

@ArgsType()
export class UpdateUserInput implements Partial<User> {
  @IsNotEmpty()
  @Field({ nullable: true })
  username?: string;

  @IsNotEmpty()
  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  avatar?: string;

  @Field({ nullable: true })
  bio?: string;

  @MinLength(8)
  @IsNotEmpty()
  @Field({ nullable: true })
  password?: string;
}

@ArgsType()
export class ResetPasswordInput implements Partial<User> {
  @IsNotEmpty()
  @Field()
  password: string;

  @IsNotEmpty()
  @Field()
  token: number;
}

@ObjectType()
@Entity("users")
class User extends BaseEntity {
  @Field(() => String)
  @ObjectIdColumn()
  id: ObjectID;

  @Field()
  @Column()
  @MinLength(2)
  username: string;

  @Field()
  @Column()
  @IsEmail()
  email: string;

  @Field({ nullable: true })
  @Column()
  avatar?: string;

  @Field({ nullable: true })
  @Column()
  bio?: string;

  @MinLength(6)
  @Column()
  password: string;

  @Field(() => Int)
  @Column()
  age: number;

  @Field()
  @Column()
  dateJoined: Date;

  @Column({ default: 0 })
  token = 0;

  @Field(() => String)
  @Column()
  role: Role = "USER";

  @BeforeInsert()
  before(): void {
    this.dateJoined = new Date();
  }

  constructor(data?: RegisterInput) {
    super();
  }
}

export default User;
