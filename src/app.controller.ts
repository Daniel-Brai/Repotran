import { Controller, Get, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  root(@Res() res: Response) {
    return this.appService.getRoot(res);
  }

  @Get('/account/signup')
  @HttpCode(HttpStatus.OK)
  signup(@Res() res: Response) {
    return this.appService.getSignUp(res);
  }

  @Get('/account/signin')
  @HttpCode(HttpStatus.OK)
  signin(@Res() res: Response) {
    return this.appService.getSignIn(res);
  }

  @Get('/account/forgot-password')
  @HttpCode(HttpStatus.OK)
  reset(@Res() res: Response) {
    return this.appService.getPasswordForgot(res);
  }

  @Get('/account/dashboard')
  @HttpCode(HttpStatus.OK)
  dashboard(@Res() res: Response) {
    return this.appService.getDashboard(res);
  }
}
