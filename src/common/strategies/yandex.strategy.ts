import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-yandex';

@Injectable()
export class YandexStrategy extends PassportStrategy(Strategy, 'yandex') {
  constructor(private configService: ConfigService) {
    super({
      callbackURL: configService.get<string>('YANDEX_CALLBACK_URL', ''),
      clientID: configService.get<string>('YANDEX_CLIENT_ID', ''),
      clientSecret: configService.get<string>('YANDEX_CLIENT_SECRET', ''),
    });
  }

  validate(accessToken: string, refreshToken: string, profile: any) {
    return {
      id: profile.id,
      email: profile.emails?.[0]?.value,
      displayName: profile.displayName,
      accessToken,
      refreshToken,
    };
  }
}
