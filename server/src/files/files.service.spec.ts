/* eslint-disable @typescript-eslint/no-var-requires */
import { rm } from 'node:fs/promises';

import { TestBed } from '@automock/jest';
import { faker } from '@faker-js/faker';
import { BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { FileEntity } from './entities/file.entity';
import { FilesService } from './files.service';

jest.mock('node:fs/promises');

const rmMockedFn = jest.mocked(rm);

describe('FilesService', () => {
  let filesService: FilesService;
  let filesRepository: jest.Mocked<Repository<FileEntity>>;

  const mockFile = {
    fieldname: 'file',
    originalname: faker.system.fileName(),
    encoding: '7bit',
    mimetype: faker.system.mimeType(),
    size: faker.number.int({ min: 1000, max: 1000000 }),
    destination: 'uploads/',
    filename: faker.system.fileName(),
    path: `uploads/${faker.system.fileName()}`,
    buffer: Buffer.from('mock file content'),
    stream: null as any,
  };

  const filePayload: FileEntity = {
    id: faker.number.int({ min: 1, max: 100 }),
    filePath: mockFile.path,
    name: mockFile.originalname,
    fileType: mockFile.mimetype,
    uploadedAt: new Date(),
    ownerUserId: faker.number.int({ min: 1, max: 100 }),
    projectId: faker.number.int({ min: 1, max: 100 }),
    owner: {
      id: faker.number.int({ min: 1, max: 100 }),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      createdAt: new Date(),
      passwordHash: 'any hash',
      updatedAt: new Date(),
    },
  };

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(FilesService).compile();

    filesService = unit;
    filesRepository = unitRef.get('FILE_REPOSITORY');
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(filesService).toBeDefined();
  });

  describe('upload()', () => {
    it('should throw an error when file is not provided', async () => {
      expect(filesService.upload(null)).rejects.toEqual(
        new BadRequestException('File is required'),
      );
    });

    it('should throw an error when file size exceeds limit', async () => {
      const largeFile = { ...mockFile, size: 11 * 1024 * 1024 }; // 11MB

      expect(filesService.upload(largeFile)).rejects.toEqual(
        new BadRequestException('File size exceeds 10MB limit'),
      );
    });

    it('should successfully save file metadata', async () => {
      filesRepository.create.mockReturnValue(filePayload);
      filesRepository.save.mockResolvedValue(filePayload);

      const result = await filesService.upload(mockFile);

      expect(result).toEqual(filePayload);
      expect(filesRepository.create).toHaveBeenCalledWith({
        filePath: mockFile.path,
        fileType: mockFile.mimetype,
        name: mockFile.originalname,
        ownerUserId: 1,
      });
    });
  });

  describe('findAll()', () => {
    it('should return all files for a user', async () => {
      const filesArray = [filePayload, { ...filePayload, id: 2 }];
      filesRepository.find.mockResolvedValue(filesArray);

      const files = await filesService.findAll(1);

      expect(files).toEqual(
        filesArray.map((file) => ({
          ...file,
          filePath: `http://localhost:3333/api/files/download/${file.filePath.split('/').pop()}`,
        })),
      );
      expect(filesRepository.find).toHaveBeenCalledWith({
        where: {
          projectId: 1,
        },
        relations: {
          owner: true,
        },
      });
    });

    it('should return empty array when no files found', async () => {
      filesRepository.find.mockResolvedValue([]);

      const files = await filesService.findAll(1);

      expect(files).toEqual([]);
    });
  });

  describe('findOne()', () => {
    it('should throw an error if file not found', () => {
      filesRepository.findOne.mockReturnValue(null);

      const file = filesService.findOne(1);

      expect(file).toBeNull();
    });

    it('should return a file if found', async () => {
      filesRepository.findOne.mockResolvedValue(filePayload);

      const file = await filesService.findOne(1);

      expect(file).toEqual(filePayload);
      expect(filesRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });

  describe('remove()', () => {
    it('should call findOne method with correct params', async () => {
      filesRepository.findOne.mockResolvedValue(filePayload);

      await filesService.remove(1);

      expect(filesRepository.findOne).toHaveBeenCalled();
      expect(filesRepository.findOne).toHaveBeenCalledTimes(1);
      expect(filesRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw an error if file not exists', () => {
      filesRepository.findOne.mockResolvedValue(null);

      expect(filesService.remove(1)).rejects.toEqual(
        new BadRequestException('File not found'),
      );
    });

    it('should call delete file with correct params', async () => {
      filesRepository.findOne.mockResolvedValue(filePayload);

      await filesService.remove(1);

      expect(rmMockedFn).toHaveBeenCalled();
      expect(rmMockedFn).toHaveBeenCalledTimes(1);
      expect(rmMockedFn).toHaveBeenCalledWith(`./${filePayload.filePath}`);
    });
  });
});
