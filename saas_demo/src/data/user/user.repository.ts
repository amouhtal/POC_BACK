import { UserDocument, UserPOJO } from '@Data/models/user/user.pojo.model';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(UserPOJO.name) private userModel: Model<UserDocument>,
  ) {}

  async create(userPOJO: UserPOJO): Promise<UserPOJO> {
    const newUser = new this.userModel(userPOJO);
    return await newUser.save()
  }

  findByEmail() {}
}
