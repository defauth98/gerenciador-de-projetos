import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { Repository } from 'typeorm';
import { File } from './entities/file.entity';
import { rm } from 'node:fs/promises';

@Injectable()
export class FilesService {
  constructor(
    @Inject('FILE_REPOSITORY')
    private readonly filesRepository: Repository<File>,
  ) {}

  async upload(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    // Check file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      throw new BadRequestException('File size exceeds 10MB limit');
    }

    // Create file metadata
    const fileEntity = this.filesRepository.create({
      filePath: file.path,
      fileType: file.mimetype,
      name: file.originalname,
      ownerUserId: 1,
    });

    return this.filesRepository.save({ ...fileEntity, uploadedAt: new Date() });
  }

  create(createFileDto: CreateFileDto) {
    return this.filesRepository.save(createFileDto);
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

  update(id: number, updateFileDto: UpdateFileDto) {
    return this.filesRepository.update({ id }, updateFileDto);
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
