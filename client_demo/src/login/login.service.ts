import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { loginDto } from './login.controller';
import axios from 'axios';
@Injectable()
export class LoginService {
  constructor(private readonly httpService: HttpService) {}
  async login(user: loginDto): Promise<any> {
    let token = await axios
      .post('http://localhost:4000/login', user)
      .then((value) => {
        return value.data;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
    return token;
  }
}
