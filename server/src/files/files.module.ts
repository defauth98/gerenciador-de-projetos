import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { fileProvider } from './entities/file.providers';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';

@Module({
  imports: [DatabaseModule],
  controllers: [FilesController],
  providers: [FilesService, ...fileProvider],
})
export class FilesModule {}
