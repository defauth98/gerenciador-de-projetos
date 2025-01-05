import { faker } from '@faker-js/faker/.';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

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
});
