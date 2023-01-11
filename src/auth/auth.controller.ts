import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { LoginRequestDto } from "./dto/login-request.dto";
import { AuthGuard } from "@nestjs/passport";
import { Request as IncomingRequest } from "express";

@ApiTags('authentication')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/login')
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @UseGuards(AuthGuard('local'))
  login(@Request() req: IncomingRequest) {
    return req.user;
  }
}