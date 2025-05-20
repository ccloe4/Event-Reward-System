import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { RewardService } from '../services/reward.service';
import { CreateRewardDto } from '../dto/create-reward.dto';
import { RewardResponseDto } from '../dto/reward-response.dto';
import { plainToInstance } from 'class-transformer';

@Controller('reward')
export class RewardController {
  constructor(private readonly rewardService: RewardService) {}

  @Post('create')
  async createReward(@Body() dto: CreateRewardDto): Promise<RewardResponseDto> {
    const reward = await this.rewardService.create(dto);
    return plainToInstance(RewardResponseDto, reward.toObject(), { excludeExtraneousValues: true });
  }

  @Get()
  async getRewards(@Query('eventName') eventName: string): Promise<RewardResponseDto[]> {
    const rewards = await this.rewardService.findAllByEventName(eventName);
    return plainToInstance(
      RewardResponseDto,
      rewards.map((r) => r.toObject()),
      { excludeExtraneousValues: true },
    );
  }
}
