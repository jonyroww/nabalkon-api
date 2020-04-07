import { Injectable } from "@nestjs/common";
import { makeError } from "../common/errors";
import bcrypt from "bcrypt";
import { UserRepository } from "../users/repositories/User.repository";

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}
  async validateUser(phone: string, password: string) {
    const user = await this.userRepository.findOne({ phone: phone });
    if (user) {
      if (user.deleted_at) {
        throw makeError("USER_NOT_FOUND");
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        return user;
      } else {
        throw makeError("WRONG_PASSWORD");
      }
    } else {
      throw makeError("USER_NOT_FOUND");
    }
  }
}
