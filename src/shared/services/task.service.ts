/* eslint-disable @typescript-eslint/no-explicit-any */
import { TaskModel } from '@data/mongo';
import { CustonError } from '..';
import { PaginationDto, TaskDto } from '../../domain';
import { Types } from 'mongoose';

/**
 * La clase TaskService proporciona la lógica de negocio para la gestión de tareas.
 */
export class TaskService {
  constructor() {}

  /**
   * Crea una nueva tarea en la base de datos.
   *
   * @param createTaskDto - El DTO que contiene la información para crear una nueva tarea.
   * @throws {CustonError} Si la tarea ya existe.
   * @returns La tarea recién creada.
   */
  async createTask(createTaskDto: TaskDto) {
    // Verifica si ya existe una tarea con el mismo nombre.
    const taskExists = await TaskModel.findOne({
      title: createTaskDto.title
    });
    if (taskExists) {
      throw CustonError.badRequest('Task already exists');
    }

    // Intenta crear la nueva tarea en la base de datos.
    try {
      const task = new TaskModel(createTaskDto);
      await task.save();
      return task;
    } catch (error) {
      throw CustonError.internalServer(`${error}`);
    }
  }

  /**
   * Recupera una lista paginada de tareas.
   *
   * @param paginationDto - El DTO que contiene la información de paginación.
   * @returns Un objeto que contiene la lista de tareas y la información de paginación.
   */
  async getTasks(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;

    try {
      // Recupera el total de tareas y una lista paginada de tareas.
      const [total, tasks] = await Promise.all([
        TaskModel.countDocuments(),
        TaskModel.find()
          .skip((page - 1) * limit)
          .limit(limit)
          .populate('user')
          .populate('category')
      ]);

      // Construye el objeto de respuesta con las tareas y la información de paginación.
      return {
        page,
        limit,
        total,
        next: page * limit < total ? `/api/tasks?page=${page + 1}&limit=${limit}` : null,
        prev: page - 1 > 0 ? `/api/tasks?page=${page - 1}&limit=${limit}` : null,
        tasks
      };
    } catch (error) {
      // En caso de error durante la recuperación, lanza un error de servidor interno.
      throw CustonError.internalServer('Internal Server Error');
    }
  }

  // Método para obtener tareas completadas filtradas por prioridad.
  async getCompletedTasksByPriority(paginationDto: PaginationDto, priority: string) {
    const { page, limit } = paginationDto;
    try {
      const [total, tasks] = await Promise.all([
        TaskModel.countDocuments({ isCompleted: true, priority: priority }),
        TaskModel.find({ isCompleted: true, priority: priority })
          .populate('user')
          .populate('category')
          .skip((page - 1) * limit)
          .limit(limit)
      ]);

      return {
        page,
        limit,
        total,
        tasks
      };
    } catch (error) {
      throw CustonError.internalServer(`${error}`);
    }
  }

  async getTaskById(id: string) {
    try {
      const task = await TaskModel.findById(id)
        .populate('user') //usuario que creó la tarea
        .populate('category'); // y de la categoría asociada.
      if (!task) {
        throw new CustonError(404, 'no se puedo encontrar la terea por el id');
      }
      return task;
    } catch (error) {
      throw CustonError.internalServer(`${error}`);
    }
  }

  async updateTask(id: string, updateData: any) {
    try {
      const updatedTask = await TaskModel.findByIdAndUpdate(id, updateData, { new: true });
      if (!updatedTask) {
        throw new CustonError(404, 'Task not found');
      }
      return updatedTask;
    } catch (error) {
      throw CustonError.internalServer(`${error}`);
    }
  }

  async deleteTask(id: string) {
    
    try {
      const deletedTask = await TaskModel.findByIdAndDelete(id);
      if (!deletedTask) {
        throw new CustonError(404, 'Task not found');
      }
      return { message: 'Task deleted successfully' };
    } catch (error) {
      throw CustonError.internalServer(`${error}`);
    }
  }

   /**
   * Asigna usuarios a una tarea específica.
   *
   * @param taskId - El ID de la tarea a la que se van a asignar los usuarios.
   * @param userIds - Lista de IDs de los usuarios a asignar a la tarea.
   * @throws {CustonError} Si la tarea no se encuentra o si hay un error en el servidor.
   * @returns La tarea actualizada.
   */
   async asignarTask(taskId: string, userIds: string[]) {
    try {
      const task = await TaskModel.findById(taskId);
      if (!task) {
        throw new CustonError(404, 'Task not found');
      }

      // Convierte los string a ObjectId
      const objectIdUserIds = userIds.map(id => new Types.ObjectId(id));

      // Actualiza la lista de usuarios asignados a la tarea.
      task.assignedUsers = objectIdUserIds;
      await task.save();

      return task;
    } catch (error) {
      throw CustonError.internalServer(`${error}`);
    }
  }
  public async markTaskAsCompleted(taskId: string) {
    try {
      const task = await TaskModel.findByIdAndUpdate(taskId, { isCompleted: true }, { new: true });
      if (!task) {
        throw CustonError.notFound('Task not found');
      }
      return task;
    } catch (error) {
      throw CustonError.internalServer('Internal Server Error');
    }
  }

  public async markTaskAsInProgress(taskId: string) {
    try {
      const task = await TaskModel.findByIdAndUpdate(taskId, { isCompleted: false }, { new: true });
      if (!task) {
        throw CustonError.notFound('Task not found');
      }
      return task;
    } catch (error) {
      throw CustonError.internalServer('Internal Server Error');
    }
  }




}
