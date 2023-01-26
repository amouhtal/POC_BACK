import { AutoMap } from '@automapper/classes';

export class UserLoginWO {
  @AutoMap()
  username: string;
  @AutoMap()
  password: string;
  @AutoMap()
  client_id: string;
  @AutoMap()
  grant_type: string;
  @AutoMap()
  client_secret: string;
}

export class UserSignUpWO {
  @AutoMap()
  userName: string;
  @AutoMap()
  password: string;
  @AutoMap()
  phone: string;
  @AutoMap()
  secret: string;
  @AutoMap()
  clientid: string;
  @AutoMap()
  clientkeycloacksecret: string;
}
