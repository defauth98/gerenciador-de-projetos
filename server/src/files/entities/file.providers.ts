import { DataSource } from 'typeorm';

import { File } from './file.entity';

export const fileProvider = [
  {
    provide: 'FILE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(File),
    inject: ['DATA_SOURCE'],
  },
];
