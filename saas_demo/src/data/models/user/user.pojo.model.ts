import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = UserPOJO & Document;

@Schema()
export class UserPOJO {
  @AutoMap()
  @Prop()
  userName: string;

  @AutoMap()
  @Prop()
  password: string;

  @AutoMap()
  @Prop()
  email: string;

  @AutoMap()
  @Prop()
  phone: string;
}

export const UserSchema = SchemaFactory.createForClass(UserPOJO);
