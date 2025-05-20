import { RewardRequestStatus } from '@libs/interfaces';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type RewardRequestDocument = RewardRequest & Document;

@Schema({ versionKey: false, timestamps: true })
export class RewardRequest {
  @Prop({ type: String, ref: 'Event', required: true })
  eventName: string;

  @Prop({ type: Types.ObjectId, required: true })
  userId: Types.ObjectId;

  @Prop({ type: String, default: RewardRequestStatus.PENDING, enum: RewardRequestStatus })
  status: RewardRequestStatus;
}

export const RewardRequestSchema = SchemaFactory.createForClass(RewardRequest);
