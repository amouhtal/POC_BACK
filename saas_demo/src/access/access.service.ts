import { ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';
import * as crypto from 'crypto';
import { share } from 'rxjs';


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
      client_id: 'saas-app-demo',
      client_secret: '12iu7uig7MhbXJfQZFCVF8683RqkBW7R',
      token: authorizationToken,
    };

    return await axios
      .post(
        'http://localhost:8080/realms/saas-client-demo/protocol/openid-connect/token/introspect',
        body,
        headers,
      )
      .then((data: any) => {
        console.log(
          data.data.active &&
            data.data.resource_access['saas-app-demo'].roles.includes(planToCheck),
        );

        return (
          data.data.active &&
          data.data.resource_access !== undefined &&
          data.data.resource_access['saas-app-demo'].roles.includes(planToCheck)
        );
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  }

  encryptWithAES = (text) => {
    const passphrase = '123';
    const hash = crypto.createHmac('sha256', passphrase)
    .update(text)
    .digest('hex');
    return hash;
  };

  decryptWithAES = (ciphertext) => {
    // const passphrase = '123';
    // const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
    // const originalText = bytes.toString(CryptoJS.enc.Utf8);
    // return originalText;
  };
}
