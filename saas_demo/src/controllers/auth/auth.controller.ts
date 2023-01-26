import { UserMapper } from '@Controllers/mappers/user.mapper';
import { UserLoginWo, UserSignUpWO } from '@Controllers/wo/user.wo';
import { Body } from '@nestjs/common';
import { Controller, Post } from '@nestjs/common';
import { AuthService } from '@Services/auth/auth.service';
import { UserLoginDTO } from '@Services/dto/user/user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userMapper: UserMapper,
  ) {}

  @Post('login')
  async login(@Body() user: UserLoginWo) {
    const userLoginWO: UserLoginWo = await this.authService.login(
      this.userMapper.mapUserLoginWOToUserLoginDTO(user),
    );
    console.log(userLoginWO);
    
    return userLoginWO;
  }

  @Post('sign-up')
  signUp(@Body() user: UserSignUpWO) {
    const cryptedSecret = this.authService.encryptWithAES(body.secret); /
  }
}
