import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './modules/tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

const { NODE_ENV } = process.env;
const envFilePath = NODE_ENV === 'test' ? '.env.test' : '.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    TasksModule,
  ],
})
export class AppModule {}
