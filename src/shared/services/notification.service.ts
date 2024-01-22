/* eslint-disable @typescript-eslint/no-explicit-any */

import NotificationModel from '@data/mongo/models/notification.model';
import { EmailService, SendMailOptions } from './email.service';
import { UserModel } from '@data/mongo';

export class NotificationService {
  private emailService: EmailService;


  constructor(emailService: EmailService) {
    this.emailService = emailService;
  }

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

  async createNotificationT(userId: string, message: string) {
    const notification = new NotificationModel({
      user: userId,
      message
    });
    await notification.save();

    // Obtener el email del usuario (implementar según tu lógica de usuario)
    const userEmail = await this.getUserEmail(userId);

    const mailOptions: SendMailOptions = {
      to: userEmail,
      subject: 'Notificación de Tarea',
      htmlBody: `<p>${message}</p>`
    };

    await this.emailService.sendEmail(mailOptions);

    return notification;
  }
  private async getUserEmail(userId: string): Promise<string> {
    try {
      const user = await UserModel.findById(userId).exec();
      if (!user) {
        throw new Error('Usuario no encontrado');
      }
      return user.email; // Asume que tu modelo de usuario tiene un campo 'email'
    } catch (error) {
      console.error('Error al obtener el correo electrónico del usuario:', error);
      throw error; // O maneja el error como creas conveniente
    }
  }



}
