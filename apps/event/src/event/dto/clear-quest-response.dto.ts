import { IsBoolean, IsString } from 'class-validator';

export class ClearQuestResponseDto {
  @IsBoolean()
  success: boolean;

  @IsString()
  message: string;
}
