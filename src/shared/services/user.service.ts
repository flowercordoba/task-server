import { CustonError } from '..';
import { UserModel } from '../../data/mongo';

export class UserServices {
  constructor() {}

  public async getLoggedInUserProfile(userId: string) {
    try {
      const user = await UserModel.findById(userId);

      if (!user) {
        throw CustonError.notFound('User not found');
      }

      // Filtrar datos sensibles si es necesario
      const userProfile = {
        username: user.name,
        email: user.email,
        // Agrega otros campos que desees mostrar
      };

      return userProfile;
    } catch (error) {
      throw CustonError.internalServer(`${error}`);
    }
  }

  public async getUserProfileById(userId: string) {
    try {
      const user = await UserModel.findById(userId);

      if (!user) {
        throw CustonError.notFound('User not found');
      }

      // Filtrar datos sensibles si es necesario
      const userProfile = {
        username: user.name,
        email: user.email,
        // Agrega otros campos que desees mostrar
      };

      return userProfile;
    } catch (error) {
      throw CustonError.internalServer(`${error}`);
    }
  }
}
