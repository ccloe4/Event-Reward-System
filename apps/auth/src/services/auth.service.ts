import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from '../schemas/user.schema';
import { SignInResponseDto } from '../dto/signIn-response.dto';
import { SignUpResponseDto } from '../dto/signUp-response.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async signUp(userId: string, password: string): Promise<SignUpResponseDto> {
    const exists = await this.userModel.findOne({ userId });
    if (exists) throw new ConflictException('이미 존재하는 아이디입니다.');

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.userModel({
      userId: userId,
      password: hashedPassword,
      roles: ['USER'],
    });
    await user.save();

    return { message: '회원가입 성공' };
  }

  async validateUser(userId: string, password: string): Promise<UserDocument | null> {
    const user = await this.userModel.findOne({ userId });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async signIn(user: UserDocument): Promise<SignInResponseDto> {
    const payload = {
      userId: user.userId,
      sub: user._id,
      roles: user.roles,
    };

    return { accessToken: this.jwtService.sign(payload) };
  }

  async isOldestUser(userId: string): Promise<boolean> {
    const oldest = await this.userModel.find({ roles: 'USER' }).sort({ createdAt: 1 }).limit(1);
    return oldest[0]?.userId === userId;
  }
}
