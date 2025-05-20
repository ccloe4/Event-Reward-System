import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SignInDocument = SignIn & Document;

@Schema({ versionKey: false })
export class SignIn {
  @Prop({ type: String, required: true })
  userId: string;

  @Prop({ type: Date, required: true })
  date: Date;
}

export const SignInSchema = SchemaFactory.createForClass(SignIn);
SignInSchema.index({ userId: 1, date: 1 }, { unique: true });
