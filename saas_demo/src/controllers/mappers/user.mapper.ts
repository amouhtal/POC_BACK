import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { UserLoginDTO } from '@Services/dto/user/user.dto';
import { UserLoginWO } from '@Controllers/wo/user.wo';

@Injectable()
export class UserMapper {
  constructor(@InjectMapper() private readonly classMapper: Mapper) {}

  mapUserLoginWOToUserLoginDTO(userLoginWO: UserLoginWO): UserLoginDTO {
    return this.classMapper.map(userLoginWO, UserLoginWO, UserLoginDTO);
  }

  mapUserUserLoginDTOToLoginWO(userLoginDTO: UserLoginDTO): UserLoginWO {
    return this.classMapper.map(userLoginDTO, UserLoginDTO, UserLoginWO);
  }
}
