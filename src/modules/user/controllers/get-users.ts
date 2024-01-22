import { Response, Request } from 'express';

import { UserServices } from '@service/user.service';
export class GetUsers {
  constructor(private readonly userServices: UserServices) {}

  public async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userServices.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }


}
