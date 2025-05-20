import { IsString } from 'class-validator';

export class RewardRequestDto {
  @IsString()
  eventName: string;
}
