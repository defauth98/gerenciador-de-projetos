import { faker } from '@faker-js/faker/.';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

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
    const nameValidationError = errors.find(
      (error) => error.property === 'name',
    );
    const ownerUserIdValidationError = errors.find(
      (error) => error.property === 'ownerUserId',
    );
    const fileTypeValidationError = errors.find(
      (error) => error.property === 'fileType',
    );
    const filePathValidationError = errors.find(
      (error) => error.property === 'fileType',
    );

    expect(Object.keys(fileTypeValidationError.constraints)).toEqual([
      'isString',
    ]);
    expect(Object.keys(ownerUserIdValidationError.constraints)).toEqual([
      'isNumber',
    ]);
    expect(Object.keys(nameValidationError.constraints)).toEqual(['isString']);
    expect(Object.keys(filePathValidationError.constraints)).toEqual([
      'isString',
    ]);
    expect(errors).toHaveLength(4);
  });

  it('should have no validation errors if valid payload are provided', () => {
    const validaFilePayload: CreateFileDto = {
      name: faker.lorem.word(),
      filePath: faker.lorem.word(),
      fileType: faker.lorem.word(),
      ownerUserId: 1,
    };
    const createFileDto = plainToClass(CreateFileDto, validaFilePayload);

    const errors = validateSync(createFileDto);
    expect(errors).toHaveLength(0);
  });
});
