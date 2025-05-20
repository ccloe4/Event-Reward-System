import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Event, EventDocument } from '../schemas/event.schema';
import { Model } from 'mongoose';
import { CreateEventDto } from '../dto/create-event.dto';
import { EventCondition } from '@libs/interfaces';
import { isQuestClear, isSignInDays } from '@libs/common';

@Injectable()
export class EventService {
  constructor(@InjectModel(Event.name) private eventModel: Model<EventDocument>) {}

  async create(dto: CreateEventDto): Promise<EventDocument> {
    const condition = dto.condition as EventCondition;

    if (isSignInDays(condition)) {
      if (typeof condition.requiredDays !== 'number') {
        throw new BadRequestException('signInDays 이벤트는 requiredDays가 필요합니다.');
      }
    }

    if (isQuestClear(condition)) {
      if (!condition.questName) {
        throw new BadRequestException('questClear 이벤트는 questName이 필요합니다.');
      }
    }

    const { name } = dto;

    const exists = await this.findByName(name);

    if (exists) {
      throw new ConflictException('이미 존재하는 이벤트 이름입니다.');
    }

    const event = new this.eventModel(dto);
    return event.save();
  }

  async findByName(name: string): Promise<EventDocument | null> {
    return this.eventModel.findOne({ name, isActive: true }).exec();
  }

  async findAll(): Promise<EventDocument[]> {
    return this.eventModel.find().exec();
  }

  async validateEventByName(name: string): Promise<EventDocument | null> {
    return await this.findByName(name);
  }

  async findEventByQuestName(questName: string): Promise<EventDocument | null> {
    return await this.eventModel.findOne({
      'condition.type': 'questClear',
      'condition.questName': questName,
      isActive: true,
    });
  }
}
