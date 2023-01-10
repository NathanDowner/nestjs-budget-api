import { Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { LoginRequestDto } from "./dto/login-request.dto";

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {

  }

  async validateUser(data: LoginRequestDto) {
    const user = await this.usersService.findByEmail(data.email);
    if (user && user.password === data.password) {
      return user;
    }
    return null;
  }
}