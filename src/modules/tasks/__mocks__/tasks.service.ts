import { taskStub } from '../test/stubs/task.stub';

export const TasksService = jest.fn().mockReturnValue({
  getTasks: jest.fn().mockResolvedValue([taskStub()]),
  create: jest.fn().mockResolvedValue(taskStub()),
});
