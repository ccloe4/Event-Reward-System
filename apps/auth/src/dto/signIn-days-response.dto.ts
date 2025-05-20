import { IsNumber } from 'class-validator';

export class SignInDaysResponseDto {
  @IsNumber()
  days: number;
}
