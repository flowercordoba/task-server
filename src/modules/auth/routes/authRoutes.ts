import { Auth } from '@auth/controllers/controller';
import { config } from '@root/config';
import { AuthService } from '@service/auth.service';
import { EmailService } from '@service/email.service';
import { Router } from 'express';


export class Authroutes {
  static get routes(): Router {
    const router = Router();

    const emailService = new EmailService(config.MAILER_SERVICE, config.MAILER_EMAIL, config.MAILER_SECRET_KEY, config.SEND_EMAIL);

    const authService = new AuthService(emailService);

    const controller = new Auth(authService);

    router.post('/auth/login', controller.loginCTRL);
    router.post('/auth/register', controller.registerCTRL);

    router.get('/validate-email/:token', controller.emailValidate);

    return router;
  }
}
