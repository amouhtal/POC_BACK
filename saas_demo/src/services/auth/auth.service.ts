import { UserRepository } from '@Data/user/user.repository';
import { Injectable } from '@nestjs/common';
import { userDTO } from '@Services/dto/user/user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  signUp(userDto: userDTO){
    // this.userRepository.create()
  }
}
