import { Mapper, createMap } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { UserLoginWo } from '@Controllers/wo/user.wo';
import { Injectable } from '@nestjs/common';
import { UserLoginDTO } from '@Services/dto/user/user.dto';

@Injectable()
export class UserMapperConfig extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, UserLoginWo, UserLoginDTO);
      createMap(mapper, UserLoginDTO, UserLoginWo);
    };
  }
}
