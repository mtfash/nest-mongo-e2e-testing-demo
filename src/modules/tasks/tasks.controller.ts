import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './schemas/task.schema';
import { CreateTaskDto } from './dtos/create-task.dto';

@Controller({ path: 'tasks', version: '1' })
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async getAllTasks(): Promise<Task[]> {
    return await this.tasksService.findAll();
  }

  @Post()
  async createPost(@Body() createTaskDto: CreateTaskDto) {
    return await this.tasksService.create(createTaskDto);
  }
}
