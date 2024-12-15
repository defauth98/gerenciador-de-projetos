import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get('time')
  getTime(): string {
    // TODO: make this return an object
    return new Date().toISOString();
  }
}
