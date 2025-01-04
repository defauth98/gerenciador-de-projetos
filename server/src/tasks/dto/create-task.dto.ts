import { ApiProperty } from '@nestjs/swagger';

import { Task } from '../entities/task.entity';

export class CreateTaskDto implements Partial<Task> {
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
