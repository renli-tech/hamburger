import User, { LoginInput, RegisterInput } from "../entity/User";
import {
  Args,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Inject, Service } from "typedi";
import { AuthResponse } from "../modules/responses";
import { ContextUser } from "../decorators/contextUser";
import { ResolverContext } from "../modules/resolverContext";
import { UserService } from "../services/UserServices";
import { sendRefreshToken } from "../modules/jwt";
import { isAuth } from "../middlewares/IsAuth";

@Service()
@Resolver(User)
class UserResolver {
  @Inject(() => UserService)
  userService: UserService;

  @Query(() => [User])
  async users(): Promise<Array<User>> {
    return User.find({});
  }

  @UseMiddleware(isAuth)
  @Query(() => User, { nullable: true })
  me(@ContextUser() user: ContextUser): User | null {
    return user;
  }

  // LOGIN
  @Mutation(() => AuthResponse)
  async login(
    @Args() data: LoginInput,
    @Ctx() { res }: ResolverContext
  ): Promise<AuthResponse> {
    const user = await this.userService.login(data);
    const token = this.userService.createAuthToken(user);

    sendRefreshToken(res, token);
    return { user, token };
  }

  // REGISTER
  @Mutation(() => AuthResponse)
  async register(
    @Args() data: RegisterInput,
    @Ctx() { res }: ResolverContext
  ): Promise<AuthResponse> {
    const user = await this.userService.register(data);

    const token = this.userService.createAuthToken(user);

    sendRefreshToken(res, token);

    return { user, token };
  }
}

export default UserResolver;
