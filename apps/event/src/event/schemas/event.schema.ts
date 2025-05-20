import { EventCondition } from '@libs/interfaces';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EventDocument = Event & Document;

@Schema({ versionKey: false })
export class Event {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ required: true, type: Object })
  condition: EventCondition;

  @Prop({ type: Date, default: Date.now })
  startDate: Date;

  @Prop({ type: Date })
  endDate: Date;

  @Prop({ default: true })
  isActive: boolean;
}

export const EventSchema = SchemaFactory.createForClass(Event);
EventSchema.index({ name: 1, isActive: 1 }, { unique: true });
