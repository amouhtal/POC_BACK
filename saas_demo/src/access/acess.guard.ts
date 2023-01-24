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

  constructor(private accessService: AccessService) {
    this.db = DATA_BASE;
  }

  insertData(data: Data): void {
    this.db.push(data);
  }

  getData(): Data[] {
    return this.db;
  }

  checkClient(clientId: string, clientKeycloakSecret: string, secret: string) {
    let exist: boolean = false;

    this.db.forEach((data) => { 
      if (
        data.clientId === clientId &&
        data.clientKeycloakSecret === clientKeycloakSecret &&
        this.accessService.decryptWithAES(data.clientSaasSecret) === secret
      ) {
        exist = true;
      }
    });

    return exist;
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

    return this.protector.checkClient(
      request.body.clientId,
      request.body.clientKeycloakSecret,
      request.body.clientSaasSecret,
    );
  }
}
