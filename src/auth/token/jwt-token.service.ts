import { JwtService } from "@nestjs/jwt";
import { TokenPayload, TokenService } from "../interfaces/token-service.interface";

export class JwtTokenService implements TokenService {
    constructor(private readonly jwtService: JwtService) { }

    async generateToken(payload: TokenPayload): Promise<string> {
        return this.jwtService.signAsync(payload);
    }
}