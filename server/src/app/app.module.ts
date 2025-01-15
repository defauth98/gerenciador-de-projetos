import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { DatabaseModule } from '../database/database.module';
import { FilesModule } from '../files/files.module';
import { ProjectsModule } from '../project/project.module';
import { TasksModule } from '../tasks/tasks.module';
import { UserModule } from '../user/user.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    ProjectsModule,
    UserModule,
    TasksModule,
    FilesModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
