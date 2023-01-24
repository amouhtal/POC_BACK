import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AcessController } from './access/access.controller';
import { AccessService } from './access/access.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginController } from './login/login.controller';
import { LoginService } from './login/login.service';

@Module({
  imports: [HttpModule, JwtModule.register({ secret: 'yOUjr4bRjjDrakKrCpO74IWX5DT348Jf' })],
  controllers: [AppController,LoginController,AcessController ],
  providers: [AppService ,LoginService, AccessService],
})
export class AppModule {}
