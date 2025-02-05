import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { userProvider } from '../user/entities/user.providers';
import { projectProvider } from './entities/project.providers';
import { ProjectsController } from './project.controller';
import { ProjectService } from './project.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ProjectsController],
  providers: [ProjectService, ...projectProvider, ...userProvider],
})
export class ProjectsModule {}
