import { ApiProperty } from '@nestjs/swagger';

export class UploadFileDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'File to upload (png, jpeg, jpg, pdf, doc, docx)',
  })
  file: Express.Multer.File;
}
