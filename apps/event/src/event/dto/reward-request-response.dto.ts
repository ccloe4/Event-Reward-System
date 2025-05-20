import { RewardRequestErrorCode } from '@libs/interfaces';
import { IsBoolean, IsString } from 'class-validator';

export class RewardRequestResponseDto {
  @IsBoolean()
  success: boolean;

  @IsString()
  eventName: string;

  @IsString()
  message: string;

  errorCode?: RewardRequestErrorCode;
}
