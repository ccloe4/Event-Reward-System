import { Expose } from 'class-transformer';
import { IsBoolean, IsDate, IsObject, IsOptional, IsString } from 'class-validator';
import { EventCondition } from '@libs/interfaces';

export class GetRewardRequestResponseDto {
  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsObject()
  condition: EventCondition;

  @Expose()
  @IsDate()
  startDate: Date;

  @Expose()
  @IsOptional()
  @IsDate()
  endDate?: Date;

  @Expose()
  @IsBoolean()
  isActive: boolean;
}
