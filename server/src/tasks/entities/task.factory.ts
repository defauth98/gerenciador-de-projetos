import * as faker from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';

import { Task } from './task.entity';

export const TaskFactory = setSeederFactory(Task, (): Partial<Task> => {
  return {
    name: faker.faker.lorem.words(),
    priority: 'High',
    checked: Boolean(Math.floor(Math.random())),
    dueDate: faker.faker.date.future(),
    ownerUserId: 1,
    responsibleUserId: Math.floor(Math.random() * 10),
  };
});
