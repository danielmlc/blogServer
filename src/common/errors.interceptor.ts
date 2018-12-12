import { ExecutionContext, HttpException, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, call$: Observable<any>): Observable<any> {
        return call$.pipe(catchError((error, caught): any => {
            if (error instanceof HttpException) {
                return Promise.resolve({
                    success: false,
                    code: error.getStatus(),
                    message: error.getResponse(),
                    result: null,
                });
            }
            return Promise.resolve({
                success: false,
                code: 500,
                message: `出现了意外错误：${error.toString()}`,
                result: null,
            });
        }));
    }
}