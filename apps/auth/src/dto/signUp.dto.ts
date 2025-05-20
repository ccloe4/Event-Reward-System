import { IsString } from 'class-validator';

export class SignUpDto {
  @IsString()
  userId: string;

  @IsString()
  password: string;
}
