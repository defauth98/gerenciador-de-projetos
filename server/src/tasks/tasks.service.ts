import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskEntity } from './entities/task.entity';

@Injectable()
export class TasksService {
  @Inject('TASK_REPOSITORY')
  private taskRepository: Repository<TaskEntity>;

  create(createTaskDto: CreateTaskDto) {
    return this.taskRepository.save(createTaskDto);
  }

  findAll(projectId: number) {
    return this.taskRepository.find({ where: { projectId } });
  }

  findOne(id: number) {
    return this.taskRepository.findOne({ where: { id } });
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return this.taskRepository.update({ id }, updateTaskDto);
  }

  remove(id: number) {
    return this.taskRepository.delete(id);
  }
}
