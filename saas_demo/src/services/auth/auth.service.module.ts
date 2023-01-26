import { UserDataModule } from '@Data/user/user.data.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';

@Module({
  imports: [UserDataModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthServiceModule {}
