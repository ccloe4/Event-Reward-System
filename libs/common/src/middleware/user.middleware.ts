import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtUser } from '@libs/interfaces/interfaces/jwt-user.interface';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const xUser = req.headers['x-user'] as string;

    if (xUser) {
      try {
        req.user = JSON.parse(xUser) as JwtUser;
      } catch {
        req.user = undefined;
      }
    }

    next();
  }
}
