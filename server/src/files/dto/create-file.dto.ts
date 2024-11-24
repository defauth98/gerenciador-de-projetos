import { ApiProperty } from '@nestjs/swagger';
import { Task } from 'src/tasks/entities/task.entity';

export class CreateFileDto implements Task {
  @ApiProperty()
  id: number;

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
