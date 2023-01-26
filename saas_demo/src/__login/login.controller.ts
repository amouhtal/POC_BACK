import { Body, Controller, ExecutionContext, Get, Post } from '@nestjs/common';
import { LoginService } from './login.service';

export class loginDto {
  username: string;
  password: string;
  client_id: string;
  grant_type: string;
  client_secret: string;
}

@Controller()
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('login')
  async login(@Body() user: loginDto): Promise<any> {
    const varr = await this.loginService.login(user);

    return varr.data;
  }
}
