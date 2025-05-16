import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class UserModel {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export type UserDocument = UserModel &
  Document & {
    createdAt: Date;
    updatedAt: Date;
  };

export const UserSchema = SchemaFactory.createForClass(UserModel);
