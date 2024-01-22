import { Request, Response } from 'express';

export class SignUp {
  public async create(req: Request, res: Response): Promise<void> {
    res.send('hola desde register');
  }
}
