import { DataSource } from 'typeorm';

import { TaskEntity } from './task.entity';

export const taskProvider = [
  {
    provide: 'TASK_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(TaskEntity),
    inject: ['DATA_SOURCE'],
  },
];
