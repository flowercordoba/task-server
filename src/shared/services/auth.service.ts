/* eslint-disable @typescript-eslint/no-unused-vars */

import { config } from '@root/config';
import { UserModel } from '../../data/mongo';
import { RegisterUserDto, LoginUserDto } from '../../domain';
import { UserEntity } from '../../domain/entities/user.entity';
import { CustonError } from '../helpers/errors/custom.error';

import { EmailService } from './email.service';
import { JwtAdapter, bcryptAdapter } from '@helpers/utils';

export class AuthService {

  constructor(

    private readonly emailService: EmailService
  ) {}

  public async registerUser(registerUserDto: RegisterUserDto) {
    const existUser = await UserModel.findOne({ email: registerUserDto.email });
    if (existUser) {
      throw CustonError.badRequest('Email already exist');
    }

    try {
      const user = new UserModel(registerUserDto);

      // Encriptar la contraseña
      user.password = bcryptAdapter.hash(registerUserDto.password);

      await user.save();

      // Email de confirmación

      const { password, ...userEntity } = UserEntity.fromObject(user);

      const token = await JwtAdapter.generateToken({ id: user.id });
      if (!token) {
        throw CustonError.internalServer('Error while creating JWT');
      }

      return {
        user: userEntity,
        token: token
      };
    } catch (error) {
      throw CustonError.internalServer(`${error}`);
    }
  }

  public async loginUser(loginUserDto: LoginUserDto) {
    const user = await UserModel.findOne({ email: loginUserDto.email });
    if (!user) {
      throw CustonError.badRequest('Email not exist');
    }

    const isMatching = bcryptAdapter.compare(loginUserDto.password, user.password);
    if (!isMatching) {
      throw CustonError.badRequest('Password is not valid');
    }

    const { password, ...userEntity } = UserEntity.fromObject(user);

    const token = await JwtAdapter.generateToken({ id: user.id });
    if (!token) {
      throw CustonError.internalServer('Error while creating JWT');
    }

    return {
      user: userEntity,
      token: token
    };
  }

  private sendEmailValidationLink = async (email: string) => {
    const token = await JwtAdapter.generateToken({ email });
    if (!token) {
      throw CustonError.internalServer('Error getting token');
    }

    const link = `${config.WEBSERVICE_URL}/auth/validate-email/${token}`;
    const html = `
      <h1>Validate your email</h1>
      <p>Click on the following link to validate your email</p>
      <a href="${link}">Validate your email: ${email}</a>
    `;

    const options = {
      to: email,
      subject: 'Validate your email',
      htmlBody: html
    };

    const isSent = await this.emailService.sendEmail(options);
    if (!isSent) {
      throw CustonError.internalServer('Error sending email');
    }

    return true;
  };

  public validateEmail = async (token: string) => {
    const payload = await JwtAdapter.validateToken(token);
    if (!payload) {
      throw CustonError.unaUtherized('Invalid token');
    }

    const { email } = payload as { email: string };
    if (!email) {
      throw CustonError.internalServer('Email not in token');
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      throw CustonError.internalServer('Email not exists');
    }

    user.emailValidated = true;
    await user.save();

    return true;
  };
}
