import { UserMapper } from '@Controllers/mappers/user.mapper';
import { UserMapperConfig } from '@Controllers/mappers/user.mapper.config';
import { Module } from '@nestjs/common';
import { AuthServiceModule } from '@Services/auth/auth.service.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [AuthServiceModule],
  controllers: [AuthController,],
  providers: [UserMapperConfig, UserMapper],
})
export class AuthControllerModule {}
