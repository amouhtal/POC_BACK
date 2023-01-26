import {
  Headers,
  Controller,
  Get,
  Query,
  UseGuards,
  Body,
} from '@nestjs/common';
import { AccessService } from './access.service';
import { fillDb, GuardProtector } from './acess.guard';

export class loginDto {
  username: string;
  password: string;
  client_id: string;
  grant_type: string;
  client_secret: string;
}

export interface Data {
  id: number;
  clientId: string;
  clientKeycloakSecret: string;
  clientSaasSecret: string;
}

export let DATA_BASE: Data[] = fillDb();

@Controller()
export class AcessController {
  constructor(private readonly accessService: AccessService) {}

  @Get('access')
  @UseGuards(GuardProtector)
  async deco(@Headers() headers, @Query() query) {
    return this.accessService.checkeycloackAccess(
      headers.authorizationjwt,
      query.planToCheck,
    );
  }

  @Get('protecter-route')
  sensitiveDate() {
    return 'data';
  }

  @Get('sign-up')
  createClients(@Body() body) {
    const cryptedSecret = this.accessService.encryptWithAES(body.secret); // return saas secret

    DATA_BASE.push({
      id: DATA_BASE.length,
      clientId: body.clientid,
      clientSaasSecret: cryptedSecret,
      clientKeycloakSecret: body.clientkeycloacksecret,
    });

    return cryptedSecret;
  }
}
