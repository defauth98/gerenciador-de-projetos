import 'reflect-metadata';
import { UsersFactory } from '../user/entities/user.factory';
import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import MainSeeder from './main.seeder';

import { config } from 'dotenv';
import { User } from '../user/entities/user.entity';
import { FilesFactory } from '../files/entities/file.factory';
import { File } from '../files/entities/file.entity';
import { Project } from '../project/entities/project.entity';
import { Task } from '../tasks/entities/task.entity';
import { ProjectFactory } from '../project/entities/project.factory';
import { TaskFactory } from '../tasks/entities/task.factory';

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
