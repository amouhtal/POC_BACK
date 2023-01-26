import { Module } from '@nestjs/common';
import { AuthServiceModule } from '@Services/auth/auth.service.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [AuthServiceModule],
  providers: [],
  controllers: [AuthController],
})
export class AuthControllerModule {}