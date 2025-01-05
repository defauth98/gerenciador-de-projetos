import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsNumber, IsString } from 'class-validator';

import { TaskEntity } from '../entities/task.entity';

export class CreateTaskDto implements Partial<TaskEntity> {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsBoolean()
  checked: boolean;

  @ApiProperty()
  @IsString()
  priority: string;

  @ApiProperty()
  @IsDate()
  dueDate: Date;

  @ApiProperty()
  @IsNumber()
  ownerUserId: number;

  @ApiProperty()
  @IsNumber()
  responsibleUserId: number;
}
