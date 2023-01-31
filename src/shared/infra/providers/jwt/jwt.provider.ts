import jwt from 'jsonwebtoken';
import {
  DecodeOutput,
  IJwtProvider,
  OptionsInput,
} from '@/shared/infra/providers/jwt/jwt.provider.interface';

export class JwtProvider implements IJwtProvider {
  private readonly JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? '1d';
  private readonly JWT_ISSUER = process.env.JWT_ISSUER ?? 'default-issuer';
  private readonly JWT_SECRET = process.env.JWT_SECRET ?? 'default-secret';
  async generate({
    payload,
    options,
  }: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options: OptionsInput;
  }): Promise<string> {
    return jwt.sign(payload, this.JWT_SECRET, {
      ...options,
      expiresIn: this.JWT_EXPIRES_IN,
      issuer: this.JWT_ISSUER,
    });
  }

  async decode(token: string): Promise<DecodeOutput> {
    const decodedJwt = jwt.decode(token) as jwt.JwtPayload;
    return decodedJwt;
  }

  async verify(token: string): Promise<DecodeOutput> {
    const verifiedJwt = jwt.verify(token, this.JWT_SECRET) as jwt.JwtPayload;
    return verifiedJwt;
  }
}
