import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [DatabaseModule, UsersModule, ProjectsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
