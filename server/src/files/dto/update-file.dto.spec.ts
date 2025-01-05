import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

import { validateConstrains } from '../../helpers/validateConstrains';
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

    validateConstrains<UpdateFileDto>(
      {
        name: 'isString',
        ownerUserId: 'isNumber',
        filePath: 'isString',
        fileType: 'isString',
      },
      errors,
    );
    expect(errors).toHaveLength(4);
  });
});
