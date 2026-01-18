import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map, catchError, throwError } from 'rxjs';

@Injectable()
export class HandleInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      map((data) => ({
        status: 'success',
        data,
      })),
      catchError((err) =>
        throwError(
          () =>
            new HttpException(
              {
                status: 'fail',
                data: err.message,
              },
              err.code,
            ),
        ),
      ),
    );
  }
}
