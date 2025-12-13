"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuthInterceptor = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
let JwtAuthInterceptor = class JwtAuthInterceptor {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers['authorization'];
        console.log("auth header", authHeader);
        if (!authHeader) {
            throw new common_1.UnauthorizedException('Authorization header missing');
        }
        const token = authHeader.replace('Bearer ', '');
        console.log("token", token);
        try {
            console.log("verifying token");
            const payload = this.jwtService.verify(token);
            console.log("payload", payload);
            request.user = payload;
        }
        catch (err) {
            console.log("token verification failed", err);
            throw new common_1.UnauthorizedException('Invalid or expired token');
        }
        return next.handle();
    }
};
exports.JwtAuthInterceptor = JwtAuthInterceptor;
exports.JwtAuthInterceptor = JwtAuthInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], JwtAuthInterceptor);
