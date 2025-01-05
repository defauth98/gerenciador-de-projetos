import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

import { FileEntity } from '../entities/file.entity';

export class CreateFileDto implements Partial<FileEntity> {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  ownerUserId?: number;

  @ApiProperty()
  @IsString()
  fileType: string;

  @ApiProperty()
  @IsString()
  filePath: string;
}
