import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './modules/tasks/tasks.module';

config();

@Module({
  imports: [MongooseModule.forRoot(process.env.DB_URI), TasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
