/* eslint-disable @typescript-eslint/no-unused-vars */
// import { authMiddleware } from '@globals/helpers/auth-middleware';

// import { userRoutes } from '@user/routes/userRoutes';
import { Authroutes } from '@auth/routes/authRoutes';
import { AuthMiddleware } from '@middleware/auth.middleware';
import { Taskroutes } from '@task/routes/taskRoutes';
import { Application } from 'express';
import { CategorieRoutes } from './modules/categorie/routes';
import { GitRoutes } from './modules/github/routes';
import { NotificationRoutes } from '@notification/routes';
import { userRoutes } from '@user/routes/userRoutes';


const BASE_PATH = '/api';

export default (app: Application) => {
  const routes = () => {

    app.use(BASE_PATH, Authroutes.routes);
    app.use(BASE_PATH, GitRoutes.routes);
    app.use(BASE_PATH, AuthMiddleware.validateJWT, Taskroutes.routes);
    app.use(BASE_PATH, AuthMiddleware.validateJWT, CategorieRoutes.routes);
    app.use(BASE_PATH, AuthMiddleware.validateJWT, NotificationRoutes.routes);
    // app.use(BASE_PATH, authRoutes.signoutRoute());
    app.use(BASE_PATH,AuthMiddleware.validateJWT,userRoutes.routes());
  };

  routes();
};
