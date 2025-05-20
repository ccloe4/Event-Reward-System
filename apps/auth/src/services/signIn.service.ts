// auth/src/sign-in/sign-in.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SignIn, SignInDocument } from '../schemas/signIn.schema';
import { Model } from 'mongoose';

@Injectable()
export class SignInService {
  constructor(@InjectModel(SignIn.name) private signInModel: Model<SignInDocument>) {}

  async getSignInDays(userId: string): Promise<number> {
    const signIns = await this.signInModel.find({ userId });
    return signIns.length;
  }

  async recordSignIn(userId: string): Promise<void> {
    const now = new Date();
    const kst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
    const kstDate = new Date(kst.getFullYear(), kst.getMonth(), kst.getDate());
    try {
      await this.signInModel.create({ userId, date: kstDate });
    } catch (err) {
      if (err.code === 11000) {
        // 이미 기록된 경우 무시
        return;
      }
      throw err;
    }
  }
}
