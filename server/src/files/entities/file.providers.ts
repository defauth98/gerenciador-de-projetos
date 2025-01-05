import { DataSource } from 'typeorm';

import { FileEntity } from './file.entity';

export const fileProvider = [
  {
    provide: 'FILE_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(FileEntity),
    inject: ['DATA_SOURCE'],
  },
];
