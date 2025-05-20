import { Expose } from 'class-transformer';
import { RewardType } from '@libs/interfaces/enums/reward-type.enum';
import { IsMongoId, IsNumber, IsString } from 'class-validator';

export class RewardResponseDto {
  @Expose()
  @IsMongoId()
  id: string;

  @Expose()
  @IsString()
  type: RewardType;

  @Expose()
  @IsNumber()
  quantity: number;

  @Expose()
  @IsMongoId()
  eventId: string;
}
