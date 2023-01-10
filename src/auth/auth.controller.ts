import { Body, Controller, Post } from "@nestjs/common";
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { LoginRequestDto } from "./dto/login-request.dto";

@ApiTags('authentication')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/login')
    @ApiOkResponse()
    @ApiBadRequestResponse()
    login(@Body() body: LoginRequestDto) {
      
    }
}