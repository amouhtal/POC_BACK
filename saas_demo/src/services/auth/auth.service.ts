import { UserRepository } from '@Data/user/user.repository';
import { Injectable } from '@nestjs/common';
import { UserLoginDTO } from '@Services/dto/user/user.dto';
import { getLoginTokens } from './helpers/auth.fetch';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}
  response: any;

  async login(user: UserLoginDTO): Promise<UserLoginDTO> {
    const headers = {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    };
    const realm: string = 'demo-realm';

    const Tokens = getLoginTokens(realm, user, headers);
    return Tokens;
  }
  signUp(userDto: UserLoginDTO) {
    
    // this.userRepository.create()
  }
}
