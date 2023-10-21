import { Test } from '@nestjs/testing';
import { TasksController } from '../tasks.controller';
import { TasksService } from '../tasks.service';
import { Task } from '../schemas/task.schema';
import { taskStub } from './stubs/task.stub';
import { CreateTaskDto } from '../dtos/create-task.dto';

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

  describe('getTasks', () => {
    describe('when getTasks is called', () => {
      let tasks: Task[];

      beforeEach(async () => {
        tasks = await tasksController.getAllTasks();
      });

      test('it should call tasksService.getTasks', () => {
        expect(tasksService.getTasks).toHaveBeenCalled();
      });

      test('it should return an array of tasks', () => {
        expect(tasks).toEqual([taskStub()]);
      });
    });
  });

  describe('getTask', () => {
    describe('when getTask is called', () => {
      let task: Task;

      beforeEach(async () => {
        task = await tasksController.getTask('a8b0-28abe092-3882bac');
      });

      test('it should call tasksService.getTaskById', () => {
        expect(tasksService.getTaskById).toBeCalled();
      });

      test('it should return a task', () => {
        expect(task).toEqual(taskStub());
      });
    });
  });

  describe('createTask', () => {
    let task: Task;
    let createTaskDto: CreateTaskDto;

    describe('when createTask is called', () => {
      beforeEach(async () => {
        createTaskDto = {
          description: 'some description',
          done: false,
          name: 'name',
          priority: 'high',
        };

        task = await tasksController.createTask(createTaskDto);
      });

      test('it should call tasksService.create', () => {
        expect(tasksService.create).toHaveBeenCalledWith(createTaskDto);
      });

      test('it should return a task', () => {
        console.log(task, taskStub());
        expect(task).toEqual(taskStub());
      });
    });
  });
});
