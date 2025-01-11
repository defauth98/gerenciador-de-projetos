import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

import { FileEntity } from '../files/entities/file.entity';
import { FilesFactory } from '../files/entities/file.factory';
import { ProjectEntity } from '../project/entities/project.entity';
import { ProjectFactory } from '../project/entities/project.factory';
import { TaskEntity } from '../tasks/entities/task.entity';
import { TaskFactory } from '../tasks/entities/task.factory';
import { UserEntity } from '../user/entities/user.entity';
import { UsersFactory } from '../user/entities/user.factory';
import MainSeeder from './seed/main.seeder';

config();

export const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [UserEntity, FileEntity, ProjectEntity, TaskEntity],
  synchronize: true,
  factories: [UsersFactory, FilesFactory, ProjectFactory, TaskFactory],
  seeds: [MainSeeder],
} as DataSourceOptions & SeederOptions);
