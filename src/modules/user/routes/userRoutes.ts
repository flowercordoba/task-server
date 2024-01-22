import express, { Router } from 'express';
import { Get } from '@user/controllers/get-profile';
import { GetUsers } from '@user/controllers/get-users';
import { UserServices } from '@service/user.service';

class UserRoutes {
  private router: Router;
  private getController: Get;
  private getUsersController: GetUsers;

  constructor() {
    this.router = express.Router();

    const userService = new UserServices();
    this.getController = new Get();
    this.getUsersController = new GetUsers(userService);
  }

  public routes(): Router {
    this.router.get('/user/profile', this.getController.profile.bind(this.getController));
    this.router.get('/user/profile/:id', this.getController.profileByUserId.bind(this.getController));
    this.router.get('/user/list', this.getUsersController.getUsers.bind(this.getUsersController));

    return this.router;
  }
}

export const userRoutes: UserRoutes = new UserRoutes();
