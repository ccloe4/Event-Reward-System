import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ versionKey: false, timestamps: true })
export class User {
  @Prop({ type: String, unique: true, required: true })
  userId: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: [String], default: ['USER'] })
  roles: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
