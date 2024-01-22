/* eslint-disable @typescript-eslint/no-explicit-any */

import { regularExps } from '@helpers/utils';

export class UpdateUserDto {
  private constructor(
    public name?: string,
    public email?: string,
    public password?: string
  ) {}

  static create(object: { [key: string]: any }): [string?, UpdateUserDto?] {
    const { name, email, password } = object;

    if (!name) {
      return ['Missing name'];
    }
    if (!email) {
      return ['Missing email'];
    }
    if (!regularExps.email.test(email)) {
      return ['Email is not valid'];
    }
    if (!password) {
      return ['Missing password'];
    }
    if (password.length < 6) {
      return ['Password too short'];
    }

    return [undefined, new UpdateUserDto(name, email, password)];
  }
}
