import { Request, Response } from 'express';

export class Get {
  public async profile(req: Request, res: Response): Promise<void> {
    res.send('profile');
  }

  public async profileByUserId(req: Request, res: Response): Promise<void> {
    res.send('profileByUserId');
  }
}
