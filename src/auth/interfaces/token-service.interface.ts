export interface TokenPayload {
    userId: string;
    email: string;
    roleId: string;
}

export abstract class TokenService {
    abstract generateToken(payload: TokenPayload): Promise<string>;
}