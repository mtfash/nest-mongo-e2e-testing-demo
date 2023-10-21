import { Task } from '../../schemas/task.schema';

export const taskStub = (): Task => ({
  name: 'Buy stuff',
  description: 'task description',
  priority: 'high',
  done: false,
});
