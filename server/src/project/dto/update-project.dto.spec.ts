import { faker } from '@faker-js/faker/.';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

import { validateConstrains } from '../../helpers/validateConstrains';
import { ProjectEntity } from '../entities/project.entity';
import { UpdateProjectDto } from './update-project.dto';

describe('Update project dto', () => {
  it('should not have validation errors if nullish payload are provided', () => {
    const validUpdateProjectPayload: Partial<ProjectEntity> = {
      title: null,
      advisorId: null,
      coAdvisorId: null,
      description: null,
      dueDate: null,
      status: null,
      theme: null,
    };
    const updateProjectDto = plainToClass(
      UpdateProjectDto,
      validUpdateProjectPayload,
    );

    const errors = validateSync(updateProjectDto);
    expect(errors).toHaveLength(0);
  });

  it('should have no validation errors if valid payload are provided', () => {
    const validCreateProjectPayload: UpdateProjectDto = {
      title: faker.lorem.word(),
      description: faker.lorem.word(),
      status: faker.lorem.word(),
      dueDate: new Date(),
      advisorId: 1,
      coAdvisorId: 1,
      theme: faker.lorem.word(),
    };
    const updateProjectDto = plainToClass(
      UpdateProjectDto,
      validCreateProjectPayload,
    );

    const errors = validateSync(updateProjectDto);
    expect(errors).toHaveLength(0);
  });

  it('should have validation errors if invalid payload are provided', () => {
    const invalidCreateProjectPayload = {
      title: 1,
      advisorId: '',
      coAdvisorId: '',
      description: 1,
      dueDate: 1,
      status: 1,
      theme: 1,
    };
    const updateProjectDto = plainToClass(
      UpdateProjectDto,
      invalidCreateProjectPayload,
    );

    const errors = validateSync(updateProjectDto);

    validateConstrains<UpdateProjectDto>(
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
});
