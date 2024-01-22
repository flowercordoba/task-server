import { Request, Response } from 'express';

import { CategoryService, CustonError } from '../../shared';
import { CreateCategoryDto, PaginationDto, UpdateCategoryDto } from '../../domain';

export class Categorie {
  constructor(private readonly categoryService: CategoryService) {}
  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustonError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${error}`);
    return res.status(500).json({ error: 'Internal server error' });
  };

  Create = async (req: Request, res: Response) => {
    const [error, createCategorieDto] = CreateCategoryDto.create(req.body);
    if (error) {
      return res.status(400).json({ error });
    }
    this.categoryService
      .createCategory(createCategorieDto!, req.body.user)
      .then((category) => res.status(201).json(category))
      .catch((error) => this.handleError(error, res)); // res.json(req.body)
  };
  Read = async (req: Request, res: Response) => {
    try {
      // Aquí debes usar 'id', que es el nombre del parámetro definido en la ruta
      const categoryId = req.params.id; // Cambia 'categoryId' por 'id'

      const category = await this.categoryService.getCategoryById(categoryId);
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }

      // Retorna la categoría encontrada y el usuario que la creó.
      res.json({ category: category, createdBy: category.user });
    } catch (error) {
      this.handleError(error, res);
    }
  };
  getCategories = async (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query;
    const [error, paginationDto] = PaginationDto.create(+page, +limit);
    if (error) {
      return res.status(400).json({ error });
    }

    this.categoryService
      .getCategories(paginationDto!)
      .then((categories) => res.json(categories))
      .catch((error) => this.handleError(error, res));
  };

  Edit = async (req: Request, res: Response) => {
    const categoryId = req.params.id;
    const [error, updateCategoryDto] = UpdateCategoryDto.create(req.body);

    if (error) {
      return res.status(400).json({ error });
    }

    this.categoryService
      .updateCategory(categoryId, updateCategoryDto!)
      .then((category) => res.json(category))
      .catch((error) => this.handleError(error, res));
  };
  Delete = async (req: Request, res: Response) => {
    const categoryId = req.params.id;

    this.categoryService
      .deleteCategory(categoryId)
      .then((result) => res.json(result))
      .catch((error) => this.handleError(error, res));
  };
}
