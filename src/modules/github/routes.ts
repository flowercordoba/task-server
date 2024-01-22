import { Router } from 'express';


import { GithubNotification } from './controller';


export class GitRoutes {
  static get routes(): Router {
    const router = Router();


    const controller = new GithubNotification();

    router.post('/github', controller.webhookHandler);


    return router;
  }
}
