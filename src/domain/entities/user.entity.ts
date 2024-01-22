/* eslint-disable @typescript-eslint/no-explicit-any */
import { CustonError } from '../../shared';

export class UserEntity {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public emailValidated: boolean,
    public password: string,
    public role: string[],
    public img?: string
  ) {}

  static fromObject(object: { [key: string]: any }) {
    const { id, _id, name, email, emailValidated, password, role, img } = object;

    if (!_id && !id) {
      throw CustonError.badRequest('Missing id');
    }

    if (!name) {
      throw CustonError.badRequest('Missing name');
    }
    if (!email) {
      throw CustonError.badRequest('Missing email');
    }
    if (emailValidated === undefined) {
      throw CustonError.badRequest('Missing emailValidated');
    }
    if (!password) {
      throw CustonError.badRequest('Missing password');
    }
    if (!role) {
      throw CustonError.badRequest('Missing role');
    }

    return new UserEntity(_id || id, name, email, emailValidated, password, role, img);
  }
}
