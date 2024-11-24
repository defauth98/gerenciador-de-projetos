import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectsController } from './project.controller';
import { projectProvider } from './entities/project.providers';
import { DatabaseModule } from 'src/database/database.module';
import { userProvider } from 'src/user/entities/user.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ProjectsController],
  providers: [ProjectService, ...projectProvider, ...userProvider],
})
export class ProjectsModule {}
