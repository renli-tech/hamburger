import { FieldResolver, Resolver, Root } from "type-graphql";
import { Inject, Service } from "typedi";
import UserService from "../../../user/user.service";
import Post from "../../post.entity";
import User from "../entities/user.entity";

@Service()
@Resolver(User)
export default class UserResolver {
  @Inject()
  userService: UserService;

  @FieldResolver(() => [Post])
  async post(@Root() user: User): Promise<Array<Post>> {
    return Post.find({ postedById: user.id });
  }
}
