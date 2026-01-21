import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from 'src/common/database';
import { SignInRequest, SignUpRequest } from './dto';
import { UtilsService } from 'src/common/utils';
import { ConfigService } from '@nestjs/config';
import { ITokens } from 'src/common/interfaces';

@Injectable()
export class AuthService {
  constructor(
    private readonly repository: UsersRepository,
    private readonly utils: UtilsService,
    private readonly configService: ConfigService,
  ) {}

  async signUp(dto: SignUpRequest): Promise<ITokens> {
    const user = await this.repository.create({
      ...dto,
      password: await this.utils.generateHashPassword(
        dto.password,
        this.configService.get<string>('PASSWORD_SAULT', 'SAULT'),
      ),
    });

    return this.utils.getTokens(
      {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
      },
      this.configService.get('JWT_AUTH_REFRESH_SECRET'),
      this.configService.get('JWT_AUTH_EXPIRES_IN_REFRESH'),
    );
  }

  async signIn(dto: SignInRequest): Promise<ITokens> {
    const user = await this.repository.getByEmail(dto.email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const verifiedPassword = await this.utils.verifyPassword(
      dto.password,
      user.password,
      await this.utils.generateHashPassword(
        dto.password,
        this.configService.get<string>('PASSWORD_SAULT', 'SAULT'),
      ),
    );

    if (!verifiedPassword) {
      throw new UnauthorizedException();
    }

    return this.utils.getTokens(
      {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
      },
      this.configService.get('JWT_AUTH_REFRESH_SECRET'),
      this.configService.get('JWT_AUTH_EXPIRES_IN_REFRESH'),
    );
  }
}
