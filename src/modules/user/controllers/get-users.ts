import { Response, Request } from 'express';

import { CustonError } from '../../../shared';
import { UserServices } from '@service/user.service';

export class GetUsers {
  constructor(private readonly userServices: UserServices) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustonError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  };


  public async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userServices.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }


}
