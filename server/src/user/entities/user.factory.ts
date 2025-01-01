import * as faker from "@faker-js/faker";
import { setSeederFactory } from "typeorm-extension";
import { User } from "./user.entity";
import { hashSync } from "bcrypt";
import * as _ from 'lodash'


export const UsersFactory = setSeederFactory(User, () => {


  const user: User = {
    id: Number(_.uniqueId()),
    name: faker.faker.person.fullName(),
    email: faker.faker.internet.email(),
    passwordHash: hashSync(faker.faker.internet.password(), 12),
    createdAt: new Date(),
    updatedAt: new Date()
  }

  return user;
});