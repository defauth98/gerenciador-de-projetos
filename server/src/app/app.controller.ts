import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get('time')
  getTime(): string {
    return new Date().toISOString();
  }
}
