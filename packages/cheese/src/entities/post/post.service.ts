import { Service } from "typedi";
import Post from "./post.entity";

@Service()
class PostService {
  async posts(): Promise<Post[]> {
    return await Post.find({});
  }
}

export default PostService;
