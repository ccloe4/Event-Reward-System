import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { RewardRequestDto } from '../dto/reward-request.dto';
import { RewardRequestService } from '../services/reward-request.service';
import { AuthenticatedRequest } from '@libs/interfaces';
import { RewardRequestResponseDto } from '../dto/reward-request-response.dto';
import { GetRewardRequestResponseDto } from '../dto/get-reward-request-response.dto';
import { plainToInstance } from 'class-transformer';

@Controller('reward/request')
export class RewardRequestController {
  constructor(private readonly requestService: RewardRequestService) {}

  @Post()
  async requestReward(
    @Req() req: AuthenticatedRequest,
    @Body() dto: RewardRequestDto,
  ): Promise<RewardRequestResponseDto> {
    return await this.requestService.requestReward(dto, req.user.userId);
  }

  @Get('me')
  async getMyRequests(@Req() req: AuthenticatedRequest): Promise<GetRewardRequestResponseDto[]> {
    const requests = await this.requestService.getUserRequests(req.user.userId);
    return plainToInstance(GetRewardRequestResponseDto, requests, {
      excludeExtraneousValues: true,
    });
  }

  @Get()
  async getAll(): Promise<GetRewardRequestResponseDto[]> {
    const requests = await this.requestService.getAllRequests();
    return plainToInstance(GetRewardRequestResponseDto, requests, {
      excludeExtraneousValues: true,
    });
  }
}
