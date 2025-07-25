// src/auth/jwt-auth.guard.ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') { }

// // src/auth/jwt-auth.guard.ts
// import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
// import { JwtService } from '../jwt/jwt.service';
// import { jwtConstants } from '../constants';
// import { Request } from 'express';

// @Injectable()
// export class JwtAuthGuard implements CanActivate {

//     constructor(private jwtService: JwtService) { }

//     async canActivate(context: ExecutionContext) {
//         const request = context.switchToHttp().getRequest();
//         const token = this.extractTokenFromHeader(request);

//         if (!token) {
//             throw new UnauthorizedException();
//         }

//         try {
//             const payload = await this.jwtService.verifyAsync(token, { secret: jwtConstants.secret });

//             request['user'] = payload;
//         } catch {
//             throw new UnauthorizedException();
//         }

//         return true;
//     }

//     private extractTokenFromHeader(request: Request): string | undefined {
//         const [type, token] = request.headers.authorization?.split(' ') ?? [];
//         return type === 'Bearer' ? token : undefined;
//     }
// }
