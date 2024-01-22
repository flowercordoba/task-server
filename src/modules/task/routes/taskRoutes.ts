import { Router } from 'express';
import { TaskService } from '@service/task.service';
import { TaskController } from '@task/controllers/controller';


export class Taskroutes {
  static get routes(): Router {
    const router = Router();

    const taskService = new TaskService();
    const controller = new TaskController(taskService);

    router.post('/task/create', controller.create);
    router.get('/task/:id', controller.getTaskById);
    router.get('/task', controller.getTasks);
    router.put('/task/edit/:id', controller.edit);
    router.post('/task/asignar/:id', controller.asignar);
    router.post('/task/completed/:id', controller.getCompletedTasksByPriority);
    router.delete('/task/delete/:id', controller.delete);


    return router;
  }
}
