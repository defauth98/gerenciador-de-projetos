import * as faker from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';

import { File } from './file.entity';

export const FilesFactory = setSeederFactory(File, (): Partial<File> => {
  const filename = faker.faker.string.uuid();

  return {
    name: filename,
    fileType: 'docx',
    filePath: `/uploads/${filename}`,
    ownerUserId: Math.floor(Math.random() * 10) + 1,
    uploadedAt: new Date(),
  };
});
