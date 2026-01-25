import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from '../../common/database';
import { UtilsModule } from '../../common/utils/utils.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  AccessTokenStrategy,
  RefreshTokenStrategy,
  YandexStrategy,
} from '../../common/strategies';
import { SessionSerializer } from 'src/common/serializers';

@Module({
  imports: [
    DatabaseModule,
    UtilsModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_AUTH_SECRET'),
        signOptions: {
          expiresIn: configService.get('JWT_AUTH_EXPIRES_IN'),
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    YandexStrategy,
    SessionSerializer,
  ],
})
export class AuthModule {}
