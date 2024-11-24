import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get('time')
  get(): string {
    return new Date().toISOString();
  }
}
