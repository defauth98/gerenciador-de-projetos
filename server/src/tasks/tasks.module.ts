import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';

import { taskProvider } from './entities/task.providers';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [DatabaseModule],
  controllers: [TasksController],
  providers: [TasksService, ...taskProvider],
})
export class TasksModule {}
