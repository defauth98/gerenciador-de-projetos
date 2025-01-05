import { faker } from '@faker-js/faker/.';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

import { validateConstrains } from '../../helpers/validateConstrains';
import { CreateProjectDto } from './create-project.dto';

describe('Create project dto', () => {
  it('should have validation errors if invalid payload are provided', () => {
    const invalidCreateProjectPayload: CreateProjectDto = {
      title: null,
      advisorId: null,
      coAdvisorId: null,
      description: null,
      dueDate: null,
      status: null,
      theme: null,
    };
    const createProjectDto = plainToClass(
      CreateProjectDto,
      invalidCreateProjectPayload,
    );

    const errors = validateSync(createProjectDto);
    validateConstrains<CreateProjectDto>(
      {
        advisorId: 'isNumber',
        coAdvisorId: 'isNumber',
        theme: 'isString',
        description: 'isString',
        dueDate: 'isDate',
        status: 'isString',
        title: 'isString',
      },
      errors,
    );
    expect(errors).toHaveLength(7);
  });

  it('should have no validation errors if valid payload are provided', () => {
    const validCreateProjectPayload: CreateProjectDto = {
      title: faker.lorem.word(),
      description: faker.lorem.word(),
      status: faker.lorem.word(),
      dueDate: new Date(),
      advisorId: 1,
      coAdvisorId: 1,
      theme: faker.lorem.word(),
    };
    const createFileDto = plainToClass(
      CreateProjectDto,
      validCreateProjectPayload,
    );

    const errors = validateSync(createFileDto);
    expect(errors).toHaveLength(0);
  });
});
