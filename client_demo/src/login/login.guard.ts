import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private plan: string) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorizationToken = request.headers.authorization.split(' ')[1];
    let resp;
    const headers = {
      headers: {
        authorizationJwt: authorizationToken,
        "client-id": request.headers["client-id"] ,
        "client-saas-secret":  request.headers["client-saas-secret"]
      },
    };
    
    const url =
      'http://localhost:4000/access' + '?' + 'planToCheck=' + this.plan;

      
      resp = await axios.get(url, headers).catch((e) => {
        return e.data;
      });
      console.log('url');

    if (resp === undefined || !resp.data) return false;
    else return true;
  }
}

//{ planToCheck: '/plan-a' }
