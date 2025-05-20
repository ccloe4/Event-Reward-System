import { IsString } from 'class-validator';

export class ClearQuestDto {
  @IsString()
  questName: string;

  @IsString()
  answer: string;
}
