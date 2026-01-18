import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { pbkdf2 } from 'node:crypto';
import { IGetTokensParams, ITokens } from '../interfaces';

@Injectable()
export class UtilsService {
  private readonly PASSWORD_LENGTH = 256;
  private readonly BYTE_TO_STRING_ENCODING: BufferEncoding = 'hex';
  private readonly ITERATIONS = 10000;
  private readonly DIGEST = 'sha256';

  constructor(private readonly jwtService: JwtService) {}

  async getTokens(
    { id, email, firstName }: IGetTokensParams,
    secret: JwtSignOptions['secret'],
    expiresIn: JwtSignOptions['expiresIn'],
  ): Promise<ITokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync({
        sub: id,
        email,
        firstName,
      }),
      this.jwtService.signAsync(
        {
          sub: id,
          email,
          firstName,
        },
        { secret, expiresIn },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async generateHashPassword(password: string, salt: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      pbkdf2(
        password,
        salt,
        this.ITERATIONS,
        this.PASSWORD_LENGTH,
        this.DIGEST,
        (err, hash) => {
          if (err) {
            return reject(err);
          }

          resolve(hash.toString(this.BYTE_TO_STRING_ENCODING));
        },
      );
    });
  }

  async verifyPassword(
    password: string,
    passwordHash: string,
    salt: string,
  ): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      pbkdf2(
        password,
        salt,
        this.ITERATIONS,
        this.PASSWORD_LENGTH,
        this.DIGEST,
        (err, hash) => {
          if (err) {
            return reject(err);
          }

          resolve(passwordHash === hash.toString(this.BYTE_TO_STRING_ENCODING));
        },
      );
    });
  }
}
