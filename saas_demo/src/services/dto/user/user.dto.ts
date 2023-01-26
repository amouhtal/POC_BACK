import { AutoMap } from "@automapper/classes";

export class UserLoginDTO {
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
