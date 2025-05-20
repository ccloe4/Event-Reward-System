import { Roles, RolesGuard } from '@libs/common';
import { Controller, Get, Post, Req, Res, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { ProxyService } from '../services/proxy.service';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('event')
export class EventProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  @Post('create')
  @Roles('OPERATOR', 'ADMIN')
  createEvent(@Req() req: Request, @Res() res: Response) {
    return this.proxyService.forwardRequest(req, res, 'http://event:3002/event/create');
  }

  @Get()
  @Roles('USER', 'OPERATOR', 'ADMIN')
  getAllEvents(@Req() req: Request, @Res() res: Response) {
    return this.proxyService.forwardRequest(req, res, 'http://event:3002/event');
  }

  @Get()
  @Roles('USER', 'OPERATOR', 'ADMIN')
  getEventByName(@Req() req: Request, @Res() res: Response, @Query('eventName') eventName: string) {
    return this.proxyService.forwardRequest(
      req,
      res,
      `http://event:3003/event?eventName=${eventName}`,
    );
  }

  @Post('quest/clear')
  @Roles('USER', 'OPERATOR', 'ADMIN')
  clearQuest(@Req() req: Request, @Res() res: Response) {
    return this.proxyService.forwardRequest(req, res, 'http://event:3002/event/quest/clear');
  }

  @Post('reward/create')
  @Roles('OPERATOR', 'ADMIN')
  createReward(@Req() req: Request, @Res() res: Response) {
    return this.proxyService.forwardRequest(req, res, 'http://event:3002/reward/create');
  }

  @Get('reward')
  @Roles('OPERATOR', 'ADMIN')
  getRewards(@Req() req: Request, @Res() res: Response, @Query('eventName') eventName: string) {
    return this.proxyService.forwardRequest(
      req,
      res,
      `http://event:3002/reward?eventName=${eventName}`,
    );
  }

  @Post('reward/request')
  @Roles('USER', 'ADMIN')
  async requestReward(@Req() req: Request, @Res() res: Response) {
    return this.proxyService.forwardRequest(req, res, 'http://event:3002/reward/request');
  }

  @Get('reward/request/me')
  @Roles('USER', 'ADMIN')
  getMyRequests(@Req() req: Request, @Res() res: Response) {
    return this.proxyService.forwardRequest(req, res, 'http://event:3002/reward/request/me');
  }

  @Get('reward/request')
  @Roles('AUDITOR', 'ADMIN')
  getAllRequests(@Req() req: Request, @Res() res: Response) {
    return this.proxyService.forwardRequest(req, res, 'http://event:3002/reward/request');
  }
}
