import {
  Headers,
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Header,
} from '@nestjs/common';
import { AuthGuard } from './login.guard';
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
  login(@Body() user: loginDto) {
    return this.loginService.login(user);
  }

  @Get('feature-a')
  @UseGuards(new AuthGuard('feature-a'))
  featureA(@Headers() headers) {
    return 'feature-a data';
  }

  @Get('feature-b')
  @UseGuards(new AuthGuard('feature-b'))
  featureB(@Headers() headers) {
    return 'feature-b data';
  }

  @Get('feature-e')
  @UseGuards(new AuthGuard('feature-e'))
  featureC(@Headers() headers) {
    return 'feature-e data';
  }
}
