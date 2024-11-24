import { ApiProperty } from '@nestjs/swagger';
import { Project } from '../entities/project.entity';

export class CreateProjectDto implements Partial<Project> {
  id: number;

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

  createdAt: Date;
  updatedAt: Date;
}
