import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { Task, TaskSchema } from './schemas/task.schema';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

const { NODE_ENV } = process.env;

let envPath = '.env';

if (NODE_ENV === 'test') {
  envPath = '.env.test';
}

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: envPath,
      isGlobal: true,
    }),
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
