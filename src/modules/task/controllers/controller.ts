import { Response, Request } from 'express';

import { TaskService } from '../../../shared/services/task.service';
import { CustonError } from '../../../shared';
import { PaginationDto, TaskDto } from '../../../domain';

export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustonError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  };

  create = (req: Request, res: Response) => {
    const [error, createTaskDto] = TaskDto.create({
      ...req.body,
      user: req.body.user.id
    });

    if (error) {
      return res.status(400).json({ error });
    }
    // return res.json('createTask')

    this.taskService
      .createTask(createTaskDto!)
      .then((task) => res.status(201).json(task))
      .catch((error) => this.handleError(error, res));
  };

  getTasks = async (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query;
    const [error, paginationDto] = PaginationDto.create(+page, +limit);
    if (error) {
      return res.status(400).json({ error });
    }
    // return res.json('getTasks')

    this.taskService
      .getTasks(paginationDto!)
      .then((tasks) => res.json(tasks))
      .catch((error) => this.handleError(error, res));
  };

  getCompletedTasksByPriority = async (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query;
    const priority = req.params.priority; // Asumiendo que la prioridad se pasa como un parámetro en la ruta.
    const [error, paginationDto] = PaginationDto.create(+page, +limit);

    if (error) {
      return res.status(400).json({ error });
    }

    this.taskService
      .getCompletedTasksByPriority(paginationDto!, priority)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };

  getTaskById = async (req: Request, res: Response) => {
    try {
      const taskId = req.params.id; // Obtiene el ID de la URL
      const task = await this.taskService.getTaskById(taskId);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.json(task); // Envía la tarea encontrada
    } catch (error) {
      this.handleError(error, res);
    }
  };


  edit = async (req: Request, res: Response) => {
    try {
      const taskId = req.params.id;
      const updatedTask = await this.taskService.updateTask(taskId, req.body);
      res.json(updatedTask);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const taskId = req.params.id;
      const result = await this.taskService.deleteTask(taskId);
      res.json(result);
    } catch (error) {
      this.handleError(error, res);
    }
  };


  asignar = async (req: Request, res: Response) => {
    try {
      const taskId = req.params.id;
      const userIds = req.body.id;
      if (!Array.isArray(userIds)) {
        return res.status(400).json({ error: 'userIds must be an array' });
      }

      const updatedTask = await this.taskService.asignarTask(taskId, userIds);
      res.status(200).json(updatedTask);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  public async markTaskAsInProgress(req: Request, res: Response): Promise<void> {
    try {
      const taskId = req.params.taskId;
      const updatedTask = await this.taskService.markTaskAsInProgress(taskId);
      res.status(200).json(updatedTask);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  public async markTaskAsCompleted(req: Request, res: Response): Promise<void> {
    try {
      const taskId = req.params.taskId;
      const updatedTask = await this.taskService.markTaskAsCompleted(taskId);
      res.status(200).json(updatedTask);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }



}
