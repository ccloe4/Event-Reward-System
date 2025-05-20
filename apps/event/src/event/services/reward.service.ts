import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Reward, RewardDocument } from '../schemas/reward.schema';
import { Model } from 'mongoose';
import { CreateRewardDto } from '../dto/create-reward.dto';
import { EventDocument } from '../schemas/event.schema';

@Injectable()
export class RewardService {
  constructor(
    @InjectModel(Reward.name) private rewardModel: Model<RewardDocument>,
    @InjectModel(Event.name) private readonly eventModel: Model<EventDocument>,
  ) {}

  async create(dto: CreateRewardDto): Promise<RewardDocument> {
    const event = await this.eventModel.findOne({ name: dto.eventName });
    if (!event) {
      throw new NotFoundException(`'${dto.eventName}'와 일치하는 이벤트가 없습니다.`);
    }

    const reward = new this.rewardModel({
      type: dto.type,
      quantity: dto.quantity,
      eventId: event._id,
    });

    return reward.save();
  }

  async findAllByEventName(eventName: string) {
    const event = await this.eventModel.findOne({ name: eventName });
    if (!event) {
      throw new NotFoundException(`'${eventName}'와 일치하는 이벤트가 없습니다.`);
    }

    return this.rewardModel.find({ eventId: event._id }).populate('eventId', 'name');
  }
}
