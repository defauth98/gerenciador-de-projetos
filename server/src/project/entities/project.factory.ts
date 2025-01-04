import * as faker from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import * as _ from 'lodash';
import { Project } from './project.entity';

export const ProjectFactory = setSeederFactory(
  Project,
  (): Partial<Project> => {
    return {
      advisorId: 1,
      coAdvisorId: Math.floor(Math.random() * 10) + 1,
      description: faker.faker.lorem.paragraph(),
      dueDate: new Date('2024-01-12'),
      status: 'In progress',
      theme: faker.faker.lorem.word(),
      title: faker.faker.lorem.words(),
      members: [
        {
          id: 1,
        },
        {
          id: 2,
        },
        {
          id: 3,
        },
        {
          id: 4,
        },
        {
          id: 5,
        },
      ],
    };
  },
);