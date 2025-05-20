import { IsString } from 'class-validator';

export class SignUpResponseDto {
  @IsString()
  message: string;
}
