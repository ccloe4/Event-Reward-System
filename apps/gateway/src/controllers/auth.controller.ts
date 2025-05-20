import { Controller, Post, Req, Res } from '@nestjs/common';
import { ProxyService } from '../services/proxy.service';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  @Post('signUp')
  async signUp(@Req() req: Request, @Res() res: Response) {
    return this.proxyService.forwardRequest(req, res, 'http://auth:3001/auth/signUp');
  }

  @Post('signIn')
  async signIn(@Req() req: Request, @Res() res: Response) {
    return this.proxyService.forwardRequest(req, res, 'http://auth:3001/auth/signIn');
  }
}
