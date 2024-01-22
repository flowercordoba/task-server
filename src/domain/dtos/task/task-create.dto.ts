/* eslint-disable @typescript-eslint/no-explicit-any */
import { Validators } from '../../../shared';

export class TaskDto {
  private constructor(
    public readonly title: string,
    public readonly description: string,
    public readonly isCompleted: boolean,
    public readonly dueDate: Date,
    public readonly priority: string,
    public readonly user: string,
    public readonly category: string,
    public readonly assignedUsers: string[]
  ) {}

  static create(object: { [key: string]: any }): [string?, TaskDto?] {
    const { title, description = '', isCompleted = false, dueDate, priority = 'media', user, category, assignedUsers = [] } = object;

    const errors: string[] = [];
    if (!title) {
      errors.push('Missing title');
    }
    if (typeof isCompleted !== 'boolean') {
      errors.push('Invalid isCompleted flag');
    }
    if (!user) {
      errors.push('Missing user');
    }
    if (!Validators.isMongoID(user)) {
      return ['Invalid user ID'];
    }
    if (!category) {
      errors.push('Missing category');
    }
    if (!Validators.isMongoID(category)) {
      return ['Invalid category ID'];
    }
    if (!Array.isArray(assignedUsers)) {
      errors.push('Invalid assignedUsers list');
    }
    if (errors.length > 0) {
      return [errors.join(', ')];
    }

    return [undefined, new TaskDto(title, description, isCompleted, dueDate, priority, user, category, assignedUsers)];
  }
}
