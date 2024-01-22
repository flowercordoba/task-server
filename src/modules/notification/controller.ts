/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';

import { NotificationService } from '../../shared/services/notification.service';

export class NotificationController {
  notificationService: any;
  constructor(notificationService: any) {
    this.notificationService = notificationService;
  }

  async createNotification(req: Request, res: Response) {
    try {
      const { id, message } = req.body;
      const notification = await this.notificationService.createNotification(id, message);
      res.status(201).json(notification);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getUserNotifications(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
      const notifications = await this.notificationService.getUserNotifications(userId);
      res.status(200).json(notifications);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async markNotificationAsRead(req: Request, res: Response) {
    try {
      const notificationId = req.params.notificationId;
      const notification = await this.notificationService.markNotificationAsRead(notificationId);
      res.status(200).json(notification);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default new NotificationController(NotificationService);
