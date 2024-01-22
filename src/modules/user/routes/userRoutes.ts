import express, { Router } from 'express';
import { Get } from '@user/controllers/get-profile';

class UserRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.get('/user/profile',  Get.prototype.profile);
    this.router.get('/user/profile/:userId', Get.prototype.profileByUserId);

    return this.router;
  }
}

export const userRoutes: UserRoutes = new UserRoutes();
