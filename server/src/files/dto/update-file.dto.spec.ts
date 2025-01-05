import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

import { UpdateFileDto } from './update-file.dto';

describe('Update file dto', () => {
  it('should pass in validation with valid payload are provided', () => {
    const validUpdateFilePayload: UpdateFileDto = {};
    const updateFileDto = plainToClass(UpdateFileDto, validUpdateFilePayload);

    const errors = validateSync(updateFileDto);

    expect(errors).toHaveLength(0);
  });

  it('should have validation errors if invalid payload are provided', () => {
    const invalidUpdateFilePayload = {
      name: 1,
      ownerUserId: '1',
      filePath: 1,
      fileType: 1,
    };
    const updateFileDto = plainToClass(UpdateFileDto, invalidUpdateFilePayload);

    const errors = validateSync(updateFileDto);

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
});
