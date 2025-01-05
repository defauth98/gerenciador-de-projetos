import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';

import { ProjectEntity } from '../entities/project.entity';

export class CreateProjectDto implements Partial<ProjectEntity> {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  theme: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumber()
  advisorId: number;

  @ApiProperty()
  @IsNumber()
  coAdvisorId: number;

  @ApiProperty()
  @IsDate()
  dueDate: Date;

  @ApiProperty()
  @IsString()
  status: string;
}
