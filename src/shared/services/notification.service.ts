/* eslint-disable @typescript-eslint/no-explicit-any */

import NotificationModel from '@data/mongo/models/notification.model';

export class NotificationService {
  async createNotification(id: any, message: any) {
    const notification = new NotificationModel({
      user: id,
      message
    });
    await notification.save();
    return notification;
  }

  async getUserNotifications(id: string) {
    return await NotificationModel.find({ user: id }).sort({ createdAt: -1 });
  }

  async markNotificationAsRead(notificationId: any) {
    return await NotificationModel.findByIdAndUpdate(notificationId, { read: true }, { new: true });
  }
}
