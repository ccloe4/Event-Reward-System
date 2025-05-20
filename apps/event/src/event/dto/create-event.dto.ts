import { IsString, IsNotEmpty, IsIn, IsOptional, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class EventConditionDto {
  @IsIn(['signInDays', 'oldestUser', 'questClear'])
  type: 'signInDays' | 'oldestUser' | 'questClear';

  @IsOptional()
  @IsNumber()
  requiredDays?: number;

  @IsOptional()
  @IsString()
  questName?: string;
}

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @ValidateNested()
  @Type(() => EventConditionDto)
  condition: EventConditionDto;

  @IsOptional()
  @Type(() => Date)
  startDate?: Date;

  @IsOptional()
  @Type(() => Date)
  endDate?: Date;
}
