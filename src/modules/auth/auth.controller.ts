import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInRequest, SignUpRequest } from './dto';
import { AuthGuard } from '@nestjs/passport';
import type { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() dto: SignUpRequest) {
    return this.authService.signUp(dto);
  }

  @Post('signin')
  signIn(@Body() dto: SignInRequest) {
    return this.authService.signIn(dto);
  }

  @Get('login')
  @UseGuards(AuthGuard('yandex'))
  login() {
    return true;
  }

  @Get('auth/yandex/callback')
  @UseGuards(AuthGuard('yandex'))
  callback(@Req() req: Request, @Res() res: Response) {
    req.session['user'] = req.user;
    return res.redirect('/profile');
  }

  profile(@Req() req: Request) {
    if (!req.session['user']) {
      return { error: 'Не авторизован' };
    }

    return {
      message: 'Ваш профиль',
      user: req.session['user'],
    };
  }

  @Get('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    req.session.destroy(() => {
      res.redirect('/');
    });
  }
}
