import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

export interface Data {
  id: number;
  clientId: string;
  clientKeycloakSecret: string;
  clientSaasSecret: string;
}

function fillDb(): Data[] {
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

export let DATA_BASE: Data[] = fillDb();

function checkClient(clientId: string, secret: string) {
  console.log(this.accessService.encryptWithAES(secret), secret);

  return DATA_BASE.some(
    (data) => data.clientId === clientId && secret === data.clientSaasSecret,
  );
}

@Injectable()
export class GuardProtector implements CanActivate {
  //   protector: ProtectRoutes;

  constructor() {
    // this.protector = new ProtectRoutes(accessService);
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log(request.headers);

    let ret = checkClient(
      request.headers['client-id'],
      request.headers['client-saas-secret'],
    );

    console.log(ret);

    return ret;
  }
}
