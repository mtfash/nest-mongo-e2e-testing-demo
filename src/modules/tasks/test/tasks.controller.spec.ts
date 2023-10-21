import { Test } from '@nestjs/testing';
import { TasksController } from '../tasks.controller';
import { TasksService } from '../tasks.service';
import { Task } from '../schemas/task.schema';
import { taskStub } from './stubs/task.stub';

jest.mock('../tasks.service');

describe('TasksController', () => {
  let tasksController: TasksController;
  let tasksService: TasksService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [TasksController],
      providers: [TasksService],
    }).compile();

    tasksController = moduleRef.get<TasksController>(TasksController);
    tasksService = moduleRef.get<TasksService>(TasksService);
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    describe('when findAll is called', () => {
      let tasks: Task[];

      beforeEach(async () => {
        tasks = await tasksController.getAllTasks();
      });

      test('it should call tasksService.findAll() method', () => {
        expect(tasksService.getTasks).toBeCalled();
      });

      test('it should return an array of tasks', () => {
        expect(tasks).toEqual([taskStub()]);
      });
    });
  });
});
