import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

import { CreateFileDto } from './create-file.dto';

export class UpdateFileDto extends PartialType(CreateFileDto) {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  ownerUserId?: number | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  fileType?: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  filePath?: string | null;
}
