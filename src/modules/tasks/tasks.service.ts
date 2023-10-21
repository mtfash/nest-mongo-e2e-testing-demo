import { Injectable } from '@nestjs/common';
import { Task } from './schemas/task.schema';
import { CreateTaskDto } from './dtos/create-task.dto';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  async getTasks(): Promise<Task[]> {
    return this.tasksRepository.find({});
  }

  async getTaskById(id: string): Promise<Task> {
    return this.tasksRepository.findOne({ id });
  }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const { name, description, priority, done } = createTaskDto;
    return await this.tasksRepository.create({
      name,
      description,
      priority,
      done,
    });
  }
}
