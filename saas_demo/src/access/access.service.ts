import { ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';
import * as CryptoJS from 'crypto-js';


@Injectable()
export class AccessService {
  constructor(private readonly jwtService: JwtService) {}

  async checkeycloackAccess(authorizationToken, planToCheck) {
    const headers = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    const body = {
      client_id: 'saas-demo',
      client_secret: 'yOUjr4bRjjDrakKrCpO74IWX5DT348Jf',
      token: authorizationToken,
    };

    return await axios
      .post(
        'http://localhost:8080/realms/demo-realm/protocol/openid-connect/token/introspect',
        body,
        headers,
      )
      .then((data: any) => {
        console.log(
          data.data.active &&
            data.data.resource_access['saas-demo'].roles.includes(planToCheck),
        );

        return (
          data.data.active &&
          data.data.resource_access !== undefined &&
          data.data.resource_access['saas-demo'].roles.includes(planToCheck)
        );
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  }

  encryptWithAES = (text) => {
    const passphrase = '123';
    return CryptoJS.AES.encrypt(text, passphrase).toString();
  };

  decryptWithAES = (ciphertext) => {
    const passphrase = '123';
    const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
  };
}
