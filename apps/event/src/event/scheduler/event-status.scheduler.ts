import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';
import { Event, EventDocument } from '../schemas/event.schema';
import { Model } from 'mongoose';

@Injectable()
export class EventStatusScheduler {
  constructor(
    @InjectModel(Event.name)
    private readonly eventModel: Model<EventDocument>,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async deactivateExpiredEvents() {
    const now = new Date();

    const result = await this.eventModel.updateMany(
      { endDate: { $lte: now }, isActive: true },
      { $set: { isActive: false } },
    );

    if (result.modifiedCount > 0) {
      console.log(`만료된 이벤트 ${result.modifiedCount}개 비활성화 완료`);
    }
  }
}
