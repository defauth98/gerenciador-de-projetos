import { FilesService } from './files.service';
import { faker } from '@faker-js/faker';
import { TestBed } from '@automock/jest';
import { Repository } from 'typeorm';
import { File } from './entities/file.entity';
import { BadRequestException } from '@nestjs/common';

describe('FilesService', () => {
  let filesService: FilesService;
  let filesRepository: jest.Mocked<Repository<File>>;

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

  const filePayload: File = {
    id: faker.number.int({ min: 1, max: 100 }),
    filePath: mockFile.path,
    name: mockFile.originalname,
    fileType: mockFile.mimetype,
    uploadedAt: new Date(),
    ownerUserId: faker.number.int({ min: 1, max: 100 }),  
  };

  beforeEach(async () => {
    const { unit, unitRef } = await TestBed.create(FilesService).compile();

    filesService = unit;
    filesRepository = unitRef.get('FILE_REPOSITORY');
  });

  beforeAll(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(filesService).toBeDefined();
  });

  describe('upload()', () => {
    const userId = faker.number.int({ min: 1, max: 100 });

    it('should throw an error when file is not provided', async () => {
      expect(filesService.upload(null, )).rejects.toEqual(
        new BadRequestException('File is required'),
      );
    });

    it('should throw an error when file size exceeds limit', async () => {
      const largeFile = { ...mockFile, size: 11 * 1024 * 1024 }; // 11MB

      expect(filesService.upload(largeFile, )).rejects.toEqual(
        new BadRequestException('File size exceeds 10MB limit'),
      );
    });

    it('should successfully save file metadata', async () => {
      filesRepository.save.mockResolvedValue(filePayload);

      const result = await filesService.upload(mockFile, );

      expect(result).toEqual(filePayload);
      expect(filesRepository.save).toHaveBeenCalledWith({
        originalName: mockFile.originalname,
        fileName: mockFile.filename,
        mimeType: mockFile.mimetype,
        size: mockFile.size,
        path: mockFile.path,
      });
    });
  });

  describe('findAll()', () => {
    const userId = faker.number.int({ min: 1, max: 100 });

    it('should return all files for a user', async () => {
      const filesArray = [filePayload, { ...filePayload, id: 2 }];
      filesRepository.find.mockResolvedValue(filesArray);

      const files = await filesService.findAll();

      expect(files).toEqual(filesArray);
      expect(filesRepository.find).toHaveBeenCalledWith({
        where: { userId },
        order: { createdAt: 'DESC' },
      });
    });

    it('should return empty array when no files found', async () => {
      filesRepository.find.mockResolvedValue([]);

      const files = await filesService.findAll();

      expect(files).toEqual([]);
    });
});

  describe('findOne()', () => {
    const userId = faker.number.int({ min: 1, max: 100 });

    it('should throw an error if file not found', () => {
      filesRepository.findOne.mockRejectedValue(null);

      expect(filesService.findOne(1)).rejects.toEqual(
        new BadRequestException('File not found'),
      );
    });

    it('should return a file if found', async () => {
      filesRepository.findOne.mockResolvedValue(filePayload);

      const file = await filesService.findOne(1);

      expect(file).toEqual(filePayload);
      expect(filesRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1, userId },
      });
    });
  });

  describe('remove()', () => {
    const userId = faker.number.int({ min: 1, max: 100 });

    it('should throw an error if file not found', () => {
      filesRepository.findOne.mockResolvedValue(null);

      expect(filesService.remove(1)).rejects.toEqual(
        new BadRequestException('File not found'),
      );
    });

    it('should delete the file and metadata', async () => {
      filesRepository.findOne.mockResolvedValue(filePayload);
      filesRepository.remove.mockResolvedValue(filePayload);

      // Mock fs.unlink
      jest.spyOn(require('fs'), 'unlinkSync').mockImplementation(() => {});

      const result = await filesService.remove(1);

      expect(result).toEqual(filePayload);
      expect(filesRepository.remove).toHaveBeenCalledWith(filePayload);
      expect(require('fs').unlinkSync).toHaveBeenCalledWith(filePayload.filePath);
    });

    it('should handle file system errors gracefully', async () => {
      filesRepository.findOne.mockResolvedValue(filePayload);
      jest.spyOn(require('fs'), 'unlinkSync').mockImplementation(() => {
        throw new Error('File system error');
      });

      await expect(filesService.remove(1)).rejects.toThrow('File system error');
    });
  });

  describe('download()', () => {
    const userId = faker.number.int({ min: 1, max: 100 });

    it('should throw an error if file not found', () => {
      filesRepository.findOne.mockImplementation(() => {
        throw new BadRequestException('File not found');
      });

      expect(filesService.download(1)).rejects.toEqual(
        new BadRequestException('File not found'),
      );
    });

    it('should return the file path and metadata', async () => {
      filesRepository.findOne.mockResolvedValue(filePayload);

      const result = await filesService.download(1);

      expect(result).toEqual({
        path: filePayload.filePath,
        filename: filePayload.name,
        mimetype: filePayload.fileType,
      });
    });
  });
}); 