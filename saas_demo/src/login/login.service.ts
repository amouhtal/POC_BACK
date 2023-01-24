import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { loginDto } from './login.controller';
import axios from 'axios';

@Injectable()
export class LoginService {
  constructor(private readonly httpService: HttpService) {}
  data: any;
  async login(user: loginDto, ): Promise<any> {
    await axios
      .post(
        'http://localhost:8080/realms/demo-realm/protocol/openid-connect/token',
        user,
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
      )
      .then((data) => {
        this.data = data;
      });

    return this.data;
  }
}
