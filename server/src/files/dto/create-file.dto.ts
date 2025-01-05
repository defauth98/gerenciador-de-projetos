import { ApiProperty } from '@nestjs/swagger';
import { TaskEntity } from 'src/tasks/entities/task.entity';

export class CreateFileDto implements TaskEntity {
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
