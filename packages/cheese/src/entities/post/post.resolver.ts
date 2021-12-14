import { Query, Resolver } from "type-graphql";
import { Inject, Service } from "typedi";
import Post from "./post.entity";
import PostService from "./post.service";

@Service()
@Resolver(Post)
class PostResolver {
  @Inject()
  postService: PostService;

  @Query(() => [Post])
  async posts(): Promise<Post[]> {
    return await this.postService.posts();
  }
}

export default PostResolver;
