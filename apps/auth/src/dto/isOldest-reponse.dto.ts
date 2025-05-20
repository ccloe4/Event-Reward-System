import { IsBoolean } from 'class-validator';

export class IsOldestResponseDto {
  @IsBoolean()
  isOldest: boolean;
}
