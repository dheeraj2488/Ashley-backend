import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  
  @Injectable()
  export class JwtAuthInterceptor implements NestInterceptor {
    constructor(private readonly jwtService: JwtService) {}
  
    intercept(context: ExecutionContext, next: CallHandler) {
      const request = context.switchToHttp().getRequest();
  
      const authHeader = request.headers['authorization'];
        console.log("auth header" , authHeader);
      if (!authHeader) {
        throw new UnauthorizedException('Authorization header missing');
      }
  
      const token = authHeader.replace('Bearer ', '');
      console.log("token" , token);
  
      try {
        console.log("verifying token");
        const payload = this.jwtService.verify(token);
        console.log("payload" , payload);
        request.user = payload; 
      } catch (err) {
        console.log("token verification failed" , err);
        throw new UnauthorizedException('Invalid or expired token');
      }
  
      return next.handle();
    }
  }
  