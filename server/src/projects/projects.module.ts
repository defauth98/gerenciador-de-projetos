import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { projectProvider } from './entities/project.providers';
import { DatabaseModule } from 'src/database/database.module';
import { userProvider } from 'src/users/entities/user.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ProjectsController],
  providers: [ProjectsService, ...projectProvider, ...userProvider],
})
export class ProjectsModule {}
