import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class AppService {
  getRoot(res: Response) {
    return res.render('index', { title: 'Repotran | Home' });
  }
  getSignUp(res: Response) {
    return res.render('signup', { title: 'Create an account | Repotran' });
  }
  getSignIn(res: Response) {
    return res.render('signin', {
      title: 'Sign in into your account | Repotran',
    });
  }
  getPasswordForgot(res: Response) {
    return res.render('passwordForgot', {
      title: 'Forget Password | Repotran',
    });
  }
  getDashboard(res: Response) {
    return res.render('dashboard', { title: 'Dashboard | Repotran' });
  }
}
