import { Router } from 'express';

import { EmailService, NotificationService } from '../../shared';

import { NotificationController } from './controller';
import { config } from '@root/config';

export class NotificationRoutes {
  static get routes(): Router {
    const router = Router();
    const emailService = new EmailService(
      config.MAILER_SERVICE,
      config.MAILER_EMAIL,
      config.MAILER_SECRET_KEY,
      config.SEND_EMAIL
    );
    const notificationService = new NotificationService(emailService);
    const controller = new NotificationController(notificationService);

    router.post('/notifications/create', controller.createNotification);
    router.get('/notifications/user/:userId', controller.getUserNotifications);
    router.put('/notifications/:notificationId/read', controller.markNotificationAsRead);

    return router;
  }
}
