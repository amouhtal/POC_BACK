import { UserPOJO, UserSchema } from '@Data/models/user/user.pojo.model';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      ,
      { name: UserPOJO.name, schema: UserSchema },
    ]),
  ],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class UserDataModule {}
