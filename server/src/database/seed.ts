import "reflect-metadata";
import { UsersFactory } from "../user/entities/user.factory";
import { DataSource, DataSourceOptions } from "typeorm";
import { runSeeders, SeederOptions } from "typeorm-extension";
import MainSeeder from "./main.seeder";

import { config } from 'dotenv'
import { User } from "../user/entities/user.entity";

config()

const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User],
  synchronize: true,
  factories: [UsersFactory],
  seeds: [MainSeeder]
} as DataSourceOptions & SeederOptions);

dataSource.initialize().then(async () => {
  await dataSource.synchronize(true);
  await runSeeders(dataSource);
  process.exit();
});