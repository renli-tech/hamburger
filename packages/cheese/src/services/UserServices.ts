import { UserInputError } from "apollo-server-express";
import bcrypt from "bcryptjs";
import { Service } from "typedi";
import User, { LoginInput, RegisterInput } from "../entity/User";
import { createAuthToken } from "../modules/jwt";

@Service()
export class UserService {
  async login(data: LoginInput): Promise<User> {
    const user = await User.findOne({ email: data.email });
    if (!user) throw new UserInputError("Incorrect email or password");
    const isValidPassword = await bcrypt.compare(data.password, user.password);
    if (!isValidPassword)
      throw new UserInputError("Incorrect email or password");
    return user;
  }

  async register(data: RegisterInput): Promise<User> {
    const email = data.email.toLowerCase().trim();
    await this.checkUserExists({ email });
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = new User({ ...data, password: hashedPassword });
    return await user.save();
  }

  async checkUserExists(where: Partial<User>): Promise<void> {
    const user = await User.findOne({ where });

    if (user) {
      throw new UserInputError("User with email details already exists");
    }
    return;
  }

  createAuthToken(user: User): string {
    return createAuthToken({ id: user.id });
  }
}
