import { CategoryModel } from '../../data/mongo';
import { CreateCategoryDto, PaginationDto, UpdateCategoryDto, UserEntity } from '../../domain';
import { CustonError } from '../helpers/errors/custom.error';

export class CategoryService {
  constructor() {}
  async createCategory(createCategoryDto: CreateCategoryDto, user: UserEntity) {
    const categoryExists = await CategoryModel.findOne({ name: createCategoryDto.name });
    if (categoryExists) {
      throw CustonError.badRequest('Category already exists');
    }

    try {
      const category = new CategoryModel({
        ...createCategoryDto,
        user: user.id
      });

      await category.save();
      return {
        id: category.id,
        name: category.name,
        available: category.available
      };
    } catch (error) {
      throw CustonError.internalServer(`${error}`);
    }
  }

  /**
   * Busca una categoría por su ID.
   *
   * @param cid - El ID de la categoría a buscar.
   * @returns La categoría encontrada o lanza un error si no se encuentra.
   */
  async getCategoryById(cid: string) {
    try {
      const category = await CategoryModel.findById(cid);
      if (!category) {
        throw CustonError.notFound(`Category with ID ${cid} not found`);
      }
      return category;
    } catch (error) {
      throw CustonError.internalServer(`Internal Server Error: ${error}`);
    }
  }

  async getCategories(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;

    try {
      // const total = await CategoryModel.countDocuments();
      // const categories = await CategoryModel.find()
      //   .skip( (page - 1) * limit )
      //   .limit( limit )
      const [total, categories] = await Promise.all([
        CategoryModel.countDocuments(),
        CategoryModel.find()
          .skip((page - 1) * limit)
          .limit(limit)
      ]);

      return {
        page: page,
        limit: limit,
        total: total,
        next: `/api/categories?page=${page + 1}&limit=${limit}`,
        prev: page - 1 > 0 ? `/api/categories?page=${page - 1}&limit=${limit}` : null,

        categories: categories.map((category) => ({
          id: category.id,
          name: category.name,
          available: category.available
        }))
      };
    } catch (error) {
      throw CustonError.internalServer('Internal Server Error');
    }
  }

  /**
   * Elimina una categoría por su ID.
   *
   * @param id - El ID de la categoría a eliminar.
   * @returns Un mensaje de confirmación o lanza un error si no se encuentra la categoría.
   */
  async deleteCategory(id: string) {
    try {
      const category = await CategoryModel.findByIdAndDelete(id);
      if (!category) {
        throw CustonError.notFound(`Category with ID ${id} not found`);
      }
      return { message: `Category with ID ${id} has been deleted` };
    } catch (error) {
      throw CustonError.internalServer(`Internal Server Error: ${error}`);
    }
  }

  /**
   * Actualiza una categoría por su ID.
   *
   * @param id - El ID de la categoría a actualizar.
   * @param updateCategoryDto - Un DTO que contiene los datos actualizados para la categoría.
   * @returns La categoría actualizada o lanza un error si no se encuentra.
   */
  async updateCategory(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      const category = await CategoryModel.findByIdAndUpdate(id, { $set: updateCategoryDto }, { new: true });
      if (!category) {
        throw CustonError.notFound(`Category with ID ${id} not found`);
      }
      return category;
    } catch (error) {
      throw CustonError.internalServer(`Internal Server Error: ${error}`);
    }
  }
}
