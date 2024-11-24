import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger();

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = context.switchToHttp().getRequest();

    this.logger.verbose(
      `[${request.method}] ${request.path} body: ${request.body && JSON.stringify(request.body, null, 2)} `,
    );

    const now = Date.now();
    return next
      .handle()

      .pipe(tap(() => this.logger.verbose(`Duration: ${Date.now() - now}ms`)));
  }
}
