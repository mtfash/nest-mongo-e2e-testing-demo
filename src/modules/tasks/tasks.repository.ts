import { Task, TaskDocument } from './schemas/task.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '../../database/entity.repository';

export class TasksRepository extends EntityRepository<TaskDocument> {
  constructor(@InjectModel(Task.name) taskModel: Model<TaskDocument>) {
    super(taskModel);
  }
}
