/* eslint-disable @typescript-eslint/no-unused-vars */
import { authRoutes } from '@auth/routes/authRoutes';
// import { authMiddleware } from '@globals/helpers/auth-middleware';

// import { userRoutes } from '@user/routes/userRoutes';
import { Application } from 'express';


const BASE_PATH = '/api';

export default (app: Application) => {
  const routes = () => {

    app.use(BASE_PATH, authRoutes.routes());
    app.use(BASE_PATH, authRoutes.signoutRoute());
    // app.use(BASE_PATH, authMiddleware.verifyUser, userRoutes.routes());
  };
  routes();
};
