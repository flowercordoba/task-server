import { UserServices } from '@service/user.service';
import { Request, Response } from 'express';

export class Get {
  private userServices: UserServices;


  constructor() {
    this.userServices = new UserServices();
  }
  public async profile(req: Request, res: Response): Promise<void> {
    try {
      const user = req.body.user;

      const userProfile = {
        id: user.id,
        name: user.name,
        email: user.email,

      };
      res.status(200).json({ userProfile });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  public async profileByUserId(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.id;
      const userProfile = await this.userServices.getUserProfileById(userId);
      res.status(200).json(userProfile);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }


}
