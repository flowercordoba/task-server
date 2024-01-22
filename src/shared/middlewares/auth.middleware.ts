import { NextFunction, Request, Response } from 'express';

import { UserEntity } from '../../domain';
import { UserModel } from '../../data/mongo';
import { JwtAdapter } from '@helpers/utils';

/**
 * AuthMiddleware contiene métodos para manejar la autenticación en la aplicación.
 */
export class AuthMiddleware {
  /**
   * Valida el token JWT presente en la solicitud.
   *
   * @param req - El objeto de solicitud de Express.
   * @param res - El objeto de respuesta de Express.
   * @param next - La función de middleware siguiente en la pila.
   */
  static async validateJWT(req: Request, res: Response, next: NextFunction) {
    // Obtiene el header de autorización de la solicitud
    const authorization = req.header('Authorization');
    if (!authorization) {
      return res.status(401).json({ error: 'No token provided' });
    }
    if (!authorization.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Invalid Bearer token' });
    }

    // Extrae el token de la cabecera de autorización
    const token = authorization.split(' ').at(1) || '';

    try {
      // Valida el token y extrae el payload
      const payload = await JwtAdapter.validateToken<{ id: string }>(token);
      if (!payload) {
        return res.status(401).json({ error: 'Invalid token' });
      }

      // Busca el usuario asociado al token
      const user = await UserModel.findById(payload.id);
      if (!user) {
        return res.status(401).json({ error: 'Invalid token - user' });
      }

      // Convierte el usuario a un objeto de dominio y lo añade a la solicitud
      req.body.user = UserEntity.fromObject(user);

      // Continúa con el siguiente middleware en la cadena
      next();
    } catch (error) {
      // Maneja cualquier error durante la validación del token
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
