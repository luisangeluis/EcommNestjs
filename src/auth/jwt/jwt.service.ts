import { Injectable } from '@nestjs/common';
import { JwtVerifyOptions, JwtService as NestJwtService } from '@nestjs/jwt';

@Injectable()
export class JwtService {
    constructor(private readonly jwtService: NestJwtService) { }

    async signAsync(payload: any): Promise<string> {
        return await this.jwtService.signAsync(payload);
    }

    // verifyAsync(token: string, options?: JwtVerifyOptions): any {
    //     return this.jwtService.verifyAsync(token, options);
    // }

    // decode(token: string): any {
    //     return this.jwtService.decode(token);
    // }
}
