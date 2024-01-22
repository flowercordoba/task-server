/* eslint-disable @typescript-eslint/no-explicit-any */
import { config } from '@root/config';
import jwt from 'jsonwebtoken';



const JWT_TOKEN = config.JWT_TOKEN;

/**
 * JwtAdapter es una clase que proporciona métodos estáticos para generar y validar tokens JWT.
 */
export class JwtAdapter {
  /**
   * Genera un token JWT basado en un payload y un período de validez.
   *
   * @param payload - Los datos que se incluirán en el token.
   * @param duration - La duración de validez del token (por defecto es 2 horas).
   * @returns Una promesa que resuelve en un token JWT o null en caso de error.
   */
  static async generateToken(payload: any, duration: string = '12h') {
    return new Promise((resolve) => {
      jwt.sign(payload, JWT_TOKEN, { expiresIn: duration }, (err, token) => {
        if (err) {
          // En caso de error al generar el token, resuelve a null
          return resolve(null);
        }
        // Resuelve con el token generado
        resolve(token);
      });
    });
  }

  /**
   * Valida un token JWT y decodifica su payload.
   *
   * @param token - El token JWT a validar.
   * @returns Una promesa que resuelve en el payload decodificado del token o null si es inválido.
   */
  static validateToken<T>(token: string): Promise<T | null> {
    return new Promise((resolve) => {
      jwt.verify(token, JWT_TOKEN, (err, decoded) => {
        if (err) {
          // Si hay un error al verificar el token, resuelve a null
          return resolve(null);
        }
        // Resuelve con el payload decodificado
        resolve(decoded as T);
      });
    });
  }
}
