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

const {
  NODE_ENV,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  TEST_DB_HOST,
  TEST_DB_PORT,
  TEST_DB_USER,
  TEST_DB_PASSWORD,
  TEST_DB_NAME,
} = process.env;

export const dataSourceOptions = {
  type: 'mysql',
  host: NODE_ENV === 'test' ? TEST_DB_HOST : DB_HOST,
  port: NODE_ENV === 'test' ? Number(TEST_DB_PORT) : Number(DB_PORT),
  username: NODE_ENV === 'test' ? TEST_DB_USER : DB_USER,
  password: NODE_ENV === 'test' ? TEST_DB_PASSWORD : DB_PASSWORD,
  database: NODE_ENV === 'test' ? TEST_DB_NAME : DB_NAME,
  entities: [UserEntity, FileEntity, ProjectEntity, TaskEntity],
  synchronize: true,
  factories: [UsersFactory, FilesFactory, ProjectFactory, TaskFactory],
  seeds: [MainSeeder],
} as DataSourceOptions & SeederOptions;

export const dataSource = new DataSource(dataSourceOptions);
