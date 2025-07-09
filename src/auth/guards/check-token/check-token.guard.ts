import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class CheckTokenGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('No authorization header');
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    // try {
    //   const payload = JwtModule.verify(token, process.env.JWT_KEY);
    //   request['user'] = payload; // opcional: guardas el payload en la request para usarlo después
    //   return true;
    // } catch (err) {
    //   throw new UnauthorizedException('Invalid token');
    // }

    return true;
  }
}
