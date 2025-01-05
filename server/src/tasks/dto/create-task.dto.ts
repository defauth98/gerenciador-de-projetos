import { ApiProperty } from '@nestjs/swagger';

import { TaskEntity } from '../entities/task.entity';

export class CreateTaskDto implements Partial<TaskEntity> {
  @ApiProperty()
  name: string;

  @ApiProperty()
  checked: boolean;

  @ApiProperty()
  priority: string;

  @ApiProperty()
  dueDate: Date;

  @ApiProperty()
  ownerUserId: number;

  @ApiProperty()
  responsibleUserId: number;
}
