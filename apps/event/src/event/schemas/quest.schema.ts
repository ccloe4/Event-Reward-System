import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type QuestDocument = Quest & Document;

@Schema({ versionKey: false, timestamps: true })
export class Quest {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  questName: string;

  @Prop({ type: String, ref: 'Event', required: true })
  eventName: string;
}

export const QuestSchema = SchemaFactory.createForClass(Quest);
