import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginRequestDto } from './dto/login-request.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './types/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(data: LoginRequestDto) {
    const user = await this.usersService.findByEmail(data.email);
    if (user && user.password === data.password) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload: JwtPayload = { name: user.name, sub: user.id };

    return {
      code: 0,
      user: user,
      jwt: this.jwtService.sign(payload),
    };
  }
}
