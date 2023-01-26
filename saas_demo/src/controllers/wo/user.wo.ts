import { AutoMap } from '@automapper/classes';
import { IsNotEmpty } from 'class-validator';

export class UserLoginWo {
  userName: string;
  email: string;
  password: string;
}

export class UserSignUpWo {
  userName: string;
  password: string;
  phone: string;
  //   clientId: string;
  //   grantType: string;
  //   clientSecret: string;
}
