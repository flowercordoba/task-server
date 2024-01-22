import { Router } from 'express';

import { CategoryService } from '../../shared';

import { Categorie } from './controller';

export class CategorieRoutes {
  static get routes(): Router {
    const router = Router();
    const categoryService = new CategoryService();

    const controller = new Categorie(categoryService);

    router.post('/categorie/create', controller.Create);
    router.get('/categorie/read/:id', controller.Read);
    router.get('/categorie/read', controller.getCategories);
    router.post('/categorie/update/:id', controller.Edit);
    router.delete('/categorie/detele/:id', controller.Delete);
    return router;
  }
}
