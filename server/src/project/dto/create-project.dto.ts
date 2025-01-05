import { ApiProperty } from '@nestjs/swagger';

import { ProjectEntity } from '../entities/project.entity';

export class CreateProjectDto implements Partial<ProjectEntity> {
  @ApiProperty()
  title: string;

  @ApiProperty()
  theme: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  advisorId: number;

  @ApiProperty()
  coAdvisorId: number;

  @ApiProperty()
  dueDate: Date;

  @ApiProperty()
  status: string;
}
