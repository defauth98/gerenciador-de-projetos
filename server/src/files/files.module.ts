import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { fileProvider } from './entities/file.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [FilesController],
  providers: [FilesService, ...fileProvider],
})
export class FilesModule {}
