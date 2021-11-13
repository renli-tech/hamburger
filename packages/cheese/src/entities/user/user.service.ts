import { Service } from "typedi";
import User from "./user.entity";

@Service()
class UserService {
  async users(): Promise<User[]> {
    return await User.find({});
  }
}

export default UserService;
