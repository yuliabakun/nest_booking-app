import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { method, path: url, params, body } = request;
    const userAgent = request.get('user-agent') || '';

    this.logger.log(
      `REQUEST ${method} path: ${url}${params[0]} payload: ${JSON.stringify(body)}`,
    );

    response.on('close', () => {
      const { statusCode } = response;

      this.logger.log(
        `RESPONSE ${method} path: ${url}${params[0]}, status: ${statusCode} - userAgent ${userAgent}`,
      );
    });

    next();
  }
}
