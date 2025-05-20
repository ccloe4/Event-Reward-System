import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Quest, QuestDocument } from '../schemas/quest.schema';
import { Model } from 'mongoose';
import { ClearQuestResponseDto } from '../dto/clear-quest-response.dto';
import { ClearQuestDto } from '../dto/clear-quest.dto';
import { EventService } from './event.service';

@Injectable()
export class QuestService {
  constructor(
    @InjectModel(Quest.name) private questModel: Model<QuestDocument>,
    private readonly eventService: EventService,
  ) {}

  async clearQuest(userId: string, dto: ClearQuestDto): Promise<ClearQuestResponseDto> {
    const { questName, answer } = dto;

    const existing = await this.questModel.findOne({ questName, userId });
    if (existing) {
      return {
        success: false,
        message: '이미 완료한 퀘스트 입니다.',
      };
    }

    const validEvent = await this.eventService.findEventByQuestName(questName);
    if (!validEvent) {
      return {
        success: false,
        message: '존재하지 않는 퀘스트 입니다.',
      };
    }

    const correct = questName === answer;
    if (!correct) {
      return {
        success: false,
        message: '퀘스트 정답이 일치하지 않습니다.',
      };
    }

    await this.questModel.create({ userId, questName });

    return {
      success: true,
      message: '퀘스트 클리어!',
    };
  }
}
