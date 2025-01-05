import { rm } from 'node:fs/promises';

import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { FileEntity } from './entities/file.entity';

@Injectable()
export class FilesService {
  constructor(
    @Inject('FILE_REPOSITORY')
    private readonly filesRepository: Repository<FileEntity>,
  ) {}

  async upload(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      throw new BadRequestException('File size exceeds 10MB limit');
    }

    const fileEntity = this.filesRepository.create({
      filePath: file.path,
      fileType: file.mimetype,
      name: file.originalname,
      ownerUserId: 1,
    });

    return this.filesRepository.save({ ...fileEntity, uploadedAt: new Date() });
  }

  async findAll() {
    const files = await this.filesRepository.find({
      relations: {
        owner: true,
      },
    });

    return files.map((file) => ({
      ...file,
      filePath: `http://localhost:3333/api/files/download/${file.filePath.split('/').pop()}`,
    }));
  }

  findOne(id: number) {
    return this.filesRepository.findOne({ where: { id } });
  }

  async remove(id: number) {
    const file = await this.filesRepository.findOne({ where: { id } });

    if (!file) {
      throw new BadRequestException('File not found');
    }

    rm(`./${file.filePath}`);

    return this.filesRepository.delete({ id });
  }
}
