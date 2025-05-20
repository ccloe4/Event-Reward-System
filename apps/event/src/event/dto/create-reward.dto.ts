import { RewardType } from '@libs/interfaces';
import { IsString, IsNumber } from 'class-validator';

export class CreateRewardDto {
  @IsString()
  type: RewardType;

  @IsNumber()
  quantity: number;

  @IsString()
  eventName: string;
}
