import { Request, Response } from 'express';

export class Password {
  public async create(req: Request, res: Response): Promise<void> {
    res.send('hola desde Password').json({ ok: true });

  }


}
