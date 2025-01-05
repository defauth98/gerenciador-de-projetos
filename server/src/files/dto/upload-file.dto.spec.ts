import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

import { UploadFileDto } from './upload-file.dto';

describe('Upload file dto', () => {
  it('should have validation errors if invalid payload are provided', () => {
    const invalidUploadFilePayload: UploadFileDto = {
      file: {} as any,
    };
    const updateFileDto = plainToClass(UploadFileDto, invalidUploadFilePayload);

    const errors = validateSync(updateFileDto);
    expect(errors).toHaveLength(0);
  });
});
