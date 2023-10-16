import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './schemas/task.schema';
import mongoose from 'mongoose';
import { CreateTaskDto } from './dtos/create-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private taskModel: mongoose.Model<Task>,
  ) {}

  async findAll(): Promise<Task[]> {
    return this.taskModel.find();
  }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = await this.taskModel.create(createTaskDto);
    return await task.save();
  }
}
