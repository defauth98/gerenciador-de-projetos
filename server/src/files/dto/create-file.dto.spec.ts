import { faker } from '@faker-js/faker/.';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

import { validateConstrains } from '../../helpers/validateConstrains';
import { CreateFileDto } from './create-file.dto';

describe('Create file dto', () => {
  it('should have validation errors if invalid payload are provided', () => {
    const invalidFilePayload: CreateFileDto = {
      filePath: null,
      fileType: null,
      name: null,
      ownerUserId: null,
    };
    const createFileDto = plainToClass(CreateFileDto, invalidFilePayload);

    const errors = validateSync(createFileDto);
    validateConstrains<CreateFileDto>(
      {
        filePath: 'isString',
        fileType: 'isString',
        name: 'isString',
        ownerUserId: 'isNumber',
      },
      errors,
    );
    expect(errors).toHaveLength(4);
  });

  it('should have no validation errors if valid payload are provided', () => {
    const validFilePayload: CreateFileDto = {
      name: faker.lorem.word(),
      filePath: faker.lorem.word(),
      fileType: faker.lorem.word(),
      ownerUserId: 1,
    };
    const createFileDto = plainToClass(CreateFileDto, validFilePayload);

    const errors = validateSync(createFileDto);
    expect(errors).toHaveLength(0);
  });
});
