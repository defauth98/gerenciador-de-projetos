import * as faker from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';

import { UserEntity } from './user.entity';

export const UsersFactory = setSeederFactory(
  UserEntity,
  (): Partial<UserEntity> => {
    return {
      name: faker.faker.person.fullName(),
      email: faker.faker.internet.email(),
      passwordHash:
        '$2b$12$wB3ldtLK/Zp7558f7genzegcepXklEoYx.XpgeUcHuPEJM46SzprK',
    };
  },
);
