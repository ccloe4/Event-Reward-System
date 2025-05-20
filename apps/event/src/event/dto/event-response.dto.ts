import { Expose, Transform } from 'class-transformer';
import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';
import { EventCondition } from '@libs/interfaces';

export class EventResponseDto {
  @Expose()
  @IsString()
  name: string;

  @Expose()
  @Transform(({ value }) => ({ ...value }))
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
