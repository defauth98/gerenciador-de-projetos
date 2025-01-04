import 'reflect-metadata';

import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';

import { File } from '../files/entities/file.entity';
import { FilesFactory } from '../files/entities/file.factory';
import { Project } from '../project/entities/project.entity';
import { ProjectFactory } from '../project/entities/project.factory';
import { Task } from '../tasks/entities/task.entity';
import { TaskFactory } from '../tasks/entities/task.factory';
import { User } from '../user/entities/user.entity';
import { UsersFactory } from '../user/entities/user.factory';
import MainSeeder from './main.seeder';

config();

const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, File, Project, Task],
  synchronize: true,
  factories: [UsersFactory, FilesFactory, ProjectFactory, TaskFactory],
  seeds: [MainSeeder],
} as DataSourceOptions & SeederOptions);

dataSource.initialize().then(async () => {
  await dataSource.synchronize(true);
  await runSeeders(dataSource);
  process.exit();
});
