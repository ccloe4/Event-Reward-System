import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RewardRequest, RewardRequestDocument } from '../schemas/reward-request.schema';
import { Model } from 'mongoose';
import { RewardRequestErrorCode, RewardRequestStatus } from '@libs/interfaces';
import { EventService } from './event.service';
import { RewardRequestResponseDto } from '../dto/reward-request-response.dto';
import { RewardRequestDto } from '../dto/reward-request.dto';
import { ConditionService } from './condition.service';
import { EventDocument } from '../schemas/event.schema';

@Injectable()
export class RewardRequestService {
  constructor(
    @InjectModel(RewardRequest.name)
    private requestModel: Model<RewardRequestDocument>,
    private readonly eventService: EventService,
    private readonly condisionService: ConditionService,
  ) {}

  async requestReward(dto: RewardRequestDto, userId: string): Promise<RewardRequestResponseDto> {
    const { eventName } = dto;
    const validEvent = await this.eventService.validateEventByName(eventName);

    if (!validEvent) {
      throw new HttpException(
        {
          success: false,
          eventName,
          message: '유효하지 않은 이벤트 이름입니다.',
          errorCode: RewardRequestErrorCode.INVALID_EVENT,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const existing = await this.requestModel.findOne({ eventName, userId });

    if (existing && existing.status === RewardRequestStatus.APPROVED) {
      throw new HttpException(
        {
          success: false,
          eventName,
          message: '이벤트 보상이 이미 지급되었습니다.',
          errorCode: RewardRequestErrorCode.ALREADY_REQUESTED,
        },
        HttpStatus.CONFLICT,
      );
    }

    const isSatisfied = await this.checkCondition(userId, validEvent);

    if (isSatisfied) {
      const request = await this.requestModel.create({
        eventName,
        userId,
        status: RewardRequestStatus.APPROVED,
      });
      return { success: true, eventName: request.eventName, message: '보상이 지급되었습니다.' };
    } else {
      const request = await this.requestModel.create({
        eventName,
        userId,
        status: RewardRequestStatus.REJECTED,
      });
      return {
        success: true,
        eventName: request.eventName,
        message: '보상을 요청했으나 이벤트 조건을 달성하지 못했습니다.',
      };
    }
  }

  async checkCondition(userId: string, event: EventDocument): Promise<boolean> {
    const condition = event.condition;
    return await this.condisionService.satisfyCondition(userId, condition);
  }

  async getUserRequests(userId: string): Promise<RewardRequestDocument[]> {
    return this.requestModel.find({ userId }).exec();
  }

  async getAllRequests(): Promise<RewardRequestDocument[]> {
    return this.requestModel.find().exec();
  }
}
