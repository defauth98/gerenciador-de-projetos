import { DataSource } from 'typeorm';

import { ProjectEntity } from './project.entity';

export const projectProvider = [
  {
    provide: 'PROJECT_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ProjectEntity),
    inject: ['DATA_SOURCE'],
  },
];
