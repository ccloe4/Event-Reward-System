import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quest } from '../schemas/quest.schema';
import { EventCondition } from '@libs/interfaces';
import { isQuestClear, isSignInDays, isOldestUser } from '@libs/common';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class ConditionService {
  constructor(
    @InjectModel('Quest') private questModel: Model<Quest>,
    private readonly httpService: HttpService,
  ) {}

  async satisfyCondition(userId: string, condition: EventCondition): Promise<boolean> {
    if (isSignInDays(condition)) {
      return await this.checkSignInDays(userId, condition.requiredDays);
    }

    if (isOldestUser(condition)) {
      return await this.checkOldestUser(userId);
    }

    if (isQuestClear(condition)) {
      return await this.checkQuestClear(userId, condition.questName);
    }

    return false;
  }

  private async checkSignInDays(userId: string, requiredDays: number): Promise<boolean> {
    const res = await lastValueFrom(
      this.httpService.get(`http://auth:3001/auth/signIn?userId=${userId}`),
    );

    return res.data?.days >= requiredDays;
  }

  private async checkOldestUser(userId: string): Promise<boolean> {
    const res = await lastValueFrom(
      this.httpService.post('http://auth:3001/auth/isOldest', { userId }),
    );

    return res.data?.isOldest === true;
  }

  private async checkQuestClear(userId: string, questName: string): Promise<boolean> {
    const exists = await this.questModel.exists({ userId, questName });
    return !!exists;
  }
}
