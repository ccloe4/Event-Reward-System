import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Request, Response } from 'express';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ProxyService {
  constructor(private readonly httpService: HttpService) {}

  async forwardRequest(req: Request, res: Response, url: string) {
    try {
      const response$ = this.httpService.request({
        method: req.method,
        url,
        data: req.body,
        headers: {
          ...req.headers,
          host: undefined,
          'content-length': undefined,
          connection: undefined,
          'x-user': req.user ? JSON.stringify(req.user) : '{}',
        },
        validateStatus: () => true,
      });

      const response = await lastValueFrom(response$);
      res.status(response.status).json(response.data);
    } catch (error) {
      res.status(500).json({
        message: 'Gateway Proxy Error',
        error: error.message,
      });
    }
  }
}
