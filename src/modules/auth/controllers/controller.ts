/* eslint-disable @typescript-eslint/no-unused-vars */
import { LoginUserDto, RegisterUserDto } from '@domain/index';
import { AuthService, CustonError } from '@root/shared';
import { Request, Response } from 'express';

export class Auth {
  constructor(public readonly authService: AuthService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustonError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${error}`);
    return res.status(500).json({ error: 'Internal server error' });
  };

  registerCTRL = (req: Request, res: Response) => {
    const [error, registerDto] = RegisterUserDto.create(req.body);
    if (error) {
      return res.status(400).json({ error });
    }

    this.authService
      .registerUser(registerDto!)
      .then((user) => res.json(user))
      .catch((error) => this.handleError(error, res));
  };
  loginCTRL = (req: Request, res: Response) => {


    const [error, loginUserDto] = LoginUserDto.create(req.body);
    if (error) {
      return res.status(400).json({ error });
    }


    this.authService
      .loginUser(loginUserDto!)
      .then((user) => res.json(user))
      .catch((error) => this.handleError(error, res));

      // console.log(loginUserDto);
  };

  emailValidate = (req: Request, res: Response) => {
    const { token } = req.params;

    this.authService
      .validateEmail(token)
      .then(() => res.json('Email was validated properly'))
      .catch((error) => this.handleError(error, res));
  };
}
