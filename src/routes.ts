/* eslint-disable @typescript-eslint/no-unused-vars */
// import { authMiddleware } from '@globals/helpers/auth-middleware';

// import { userRoutes } from '@user/routes/userRoutes';
import { Authroutes } from '@auth/routes/authRoutes';
import { Application } from 'express';


const BASE_PATH = '/api';

export default (app: Application) => {
  const routes = () => {

    app.use(BASE_PATH, Authroutes.routes);
    // app.use(BASE_PATH, authRoutes.signoutRoute());
    // app.use(BASE_PATH, authMiddleware.verifyUser, userRoutes.routes());
  };
  routes();
};
