import { faker } from '@faker-js/faker/.';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

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
    const titleValidationError = errors.find(
      (error) => error.property === 'title',
    );
    const descriptionValidationError = errors.find(
      (error) => error.property === 'description',
    );
    const advisorValidationError = errors.find(
      (error) => error.property === 'advisorId',
    );
    const coAdvisorValidationError = errors.find(
      (error) => error.property === 'coAdvisorId',
    );
    const dueDateValidationError = errors.find(
      (error) => error.property === 'dueDate',
    );
    const statusValidationError = errors.find(
      (error) => error.property === 'status',
    );

    expect(Object.keys(titleValidationError.constraints)).toEqual(['isString']);
    expect(Object.keys(descriptionValidationError.constraints)).toEqual([
      'isString',
    ]);
    expect(Object.keys(advisorValidationError.constraints)).toEqual([
      'isNumber',
    ]);
    expect(Object.keys(coAdvisorValidationError.constraints)).toEqual([
      'isNumber',
    ]);
    expect(Object.keys(dueDateValidationError.constraints)).toEqual(['isDate']);
    expect(Object.keys(statusValidationError.constraints)).toEqual([
      'isString',
    ]);
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
