import * as faker from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';

import { User } from './user.entity';

export const UsersFactory = setSeederFactory(User, (): Partial<User> => {
  return {
    name: faker.faker.person.fullName(),
    email: faker.faker.internet.email(),
    passwordHash:
      '$2b$12$wB3ldtLK/Zp7558f7genzegcepXklEoYx.XpgeUcHuPEJM46SzprK',
  };
});
