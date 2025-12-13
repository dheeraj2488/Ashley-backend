// src/common/interceptors/role.interceptor.ts
import { Injectable, NestInterceptor, ExecutionContext, CallHandler, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RoleInterceptor implements NestInterceptor {
  constructor() {}

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || user.role !== 'ADMIN') {
        throw new ForbiddenException('Admin access only');
      }

    return next.handle();
  }
}
