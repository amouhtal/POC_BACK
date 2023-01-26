import { UserLoginWo, UserSignUpWo } from '@Controllers/wo/user.wo';
import { Body } from '@nestjs/common';
import { Controller, Post } from '@nestjs/common';
import { AuthService } from '@Services/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() user: UserLoginWo) {
    return 'hello world!';
  }

  @Post('sign-up')
  signUp(@Body() user: UserSignUpWo) {

  }
}
