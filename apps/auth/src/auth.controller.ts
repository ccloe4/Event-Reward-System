import { Controller, Post, Body, UnauthorizedException, Get, Query } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { SignUpDto } from './dto/signUp.dto';
import { SignInDto } from './dto/signIn.dto';
import { SignInService } from './services/signIn.service';
import { SignInResponseDto } from './dto/signIn-response.dto';
import { SignUpResponseDto } from './dto/signUp-response.dto';
import { UserDto } from './dto/user.dto';
import { SignInDaysResponseDto } from './dto/signIn-days-response.dto';
import { IsOldestResponseDto } from './dto/isOldest-reponse.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly signInService: SignInService,
  ) {}

  @Post('signUp')
  async signUp(@Body() dto: SignUpDto): Promise<SignUpResponseDto> {
    return this.authService.signUp(dto.userId, dto.password);
  }

  @Post('signIn')
  async signIn(@Body() dto: SignInDto): Promise<SignInResponseDto> {
    const user = await this.authService.validateUser(dto.userId, dto.password);
    if (!user) {
      throw new UnauthorizedException('아이디 또는 비밀번호가 틀렸습니다.');
    }

    await this.signInService.recordSignIn(user.userId);

    return this.authService.signIn(user);
  }

  @Get('signIn')
  async getSignInDays(@Query('userId') userId: string): Promise<SignInDaysResponseDto> {
    const days = await this.signInService.getSignInDays(userId);
    return { days };
  }

  @Post('isOldest')
  async isOldestUser(@Body() dto: UserDto): Promise<IsOldestResponseDto> {
    const isOldest = await this.authService.isOldestUser(dto.userId);
    return { isOldest };
  }
}
