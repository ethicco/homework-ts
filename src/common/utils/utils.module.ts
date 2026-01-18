import { Module } from '@nestjs/common';
import { UtilsService } from './utils.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
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
  providers: [UtilsService],
  exports: [UtilsService],
})
export class UtilsModule {}
