import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import axios from 'axios';
import { Data, DATA_BASE } from './access.controller';
import { AccessService } from './access.service';

export function fillDb(): Data[] {
  let data: Data[] = [];

  data.push({
    id: 0,
    clientId: 'saas-demo',
    clientKeycloakSecret: 'clientKeyckloakSecret1',
    clientSaasSecret: 'clientSaasSecret1',
  });

  data.push({
    id: 1,
    clientId: 'clientId2',
    clientKeycloakSecret: 'clientKeyckloakSecret2',
    clientSaasSecret: 'clientSaasSecret2',
  });

  data.push({
    id: 2,
    clientId: 'clientId3',
    clientKeycloakSecret: 'clientKeyckloakSecret3',
    clientSaasSecret: 'clientSaasSecret3',
  });
  return data;
}

class ProtectRoutes {
  db: Data[];

  constructor(private accessService: AccessService) {}

  checkClient(clientId: string, secret: string) {
    console.log(this.accessService.encryptWithAES(secret), secret);

    return DATA_BASE.some((data) => 
      data.clientId === clientId && secret === data.clientSaasSecret
    );
  }
}

@Injectable()
export class GuardProtector implements CanActivate {
  protector: ProtectRoutes;

  constructor(private accessService: AccessService) {
    this.protector = new ProtectRoutes(accessService);
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log(request.headers);

    let ret = this.protector.checkClient(
      request.headers['client-id'],
      request.headers['client-saas-secret'],
    );

    console.log(ret);

    return ret;
  }
}
