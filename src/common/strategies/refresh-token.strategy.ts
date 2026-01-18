import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { JwtPayload } from './types';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>(
        'JWT_AUTH_REFRESH_SECRET',
        'refresh-secret',
      ),
    });
  }

  validate(payload: JwtPayload): {
    id: string;
    email: string;
    firstName: string;
    iat: number;
    exp: number;
  } {
    return {
      id: payload.sub,
      email: payload.email,
      firstName: payload.firstName,
      iat: payload.iat,
      exp: payload.exp,
    };
  }
}
