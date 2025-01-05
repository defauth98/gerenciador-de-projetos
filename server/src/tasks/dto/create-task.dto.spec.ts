import { faker } from '@faker-js/faker/.';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

import { validateConstrains } from '../../helpers/validateConstrains';
import { CreateTaskDto } from './create-task.dto';

describe('Create task dto', () => {
  it('should have validation errors if invalid payload are provided', () => {
    const invalidCreateTaskPayload: CreateTaskDto = {
      name: null,
      checked: null,
      dueDate: null,
      ownerUserId: null,
      priority: null,
      responsibleUserId: null,
    };
    const createTaskDto = plainToClass(CreateTaskDto, invalidCreateTaskPayload);

    const errors = validateSync(createTaskDto);
    validateConstrains<CreateTaskDto>(
      {
        name: 'isString',
        checked: 'isBoolean',
        priority: 'isString',
        dueDate: 'isDate',
        ownerUserId: 'isNumber',
        responsibleUserId: 'isNumber',
      },
      errors,
    );
    expect(errors).toHaveLength(6);
  });

  it('should have no validation errors if valid payload are provided', () => {
    const validCreateTaskPayload: CreateTaskDto = {
      name: faker.lorem.word(),
      checked: true,
      dueDate: new Date(),
      ownerUserId: 1,
      priority: faker.lorem.word(),
      responsibleUserId: 1,
    };
    const createFileDto = plainToClass(CreateTaskDto, validCreateTaskPayload);

    const errors = validateSync(createFileDto);
    expect(errors).toHaveLength(0);
  });
});
