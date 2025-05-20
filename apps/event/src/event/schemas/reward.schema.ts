import { RewardType } from '@libs/interfaces/enums/reward-type.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type RewardDocument = Reward & Document;

@Schema({ versionKey: false })
export class Reward {
  @Prop({ type: String, enum: RewardType, required: true })
  type: RewardType;

  @Prop({ type: Number, default: 1 })
  quantity: number;

  @Prop({ type: Types.ObjectId, ref: 'Event', required: true })
  eventId: Types.ObjectId;
}

export const RewardSchema = SchemaFactory.createForClass(Reward);
