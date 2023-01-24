import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import axios from 'axios';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private plan: string) {

  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorizationToken = request.headers.authorization.split(' ')[1];
    let resp;
    const headers = {
      headers: {
        authorizationJwt: authorizationToken,
      },
    };
    const url =
      'http://localhost:4000/access' +
      '?' +
      'planToCheck=' +
      this.plan;
    console.log(url);

    resp = await axios.get(url, headers).catch((e) => {
      return e.data;
    });

    if (resp === undefined || !resp.data) return false;
    else return true;
  }
}

//{ planToCheck: '/plan-a' }
