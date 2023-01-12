import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { LoginRequestDto } from "./dto/login-request.dto";
import { Request as IncomingRequest } from "express";
import { LocalAuthGuard } from "./guard/local-auth.guard";

@ApiTags('authentication')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/login')
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @UseGuards(LocalAuthGuard)
  login(@Request() req: IncomingRequest) {
    return this.authService.login(req.user);
  }
}