import { Logger } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

import { EnvironmentVariables } from './env';

export async function validateEnv() {
  const envClass = plainToClass(EnvironmentVariables, process.env);
  const errors = validateSync(envClass);

  if (errors.length) {
    Logger.error(
      `Missing envs: ${errors.map((error) => error.property).join(',')}`,
    );
    process.exit(1);
  }
}
