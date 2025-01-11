import 'reflect-metadata';

import { config } from 'dotenv';
import { runSeeders } from 'typeorm-extension';

import { dataSource } from '../datasource';

config();

dataSource.initialize().then(async () => {
  await dataSource.synchronize(true);
  await runSeeders(dataSource);
  process.exit();
});
