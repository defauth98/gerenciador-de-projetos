import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get('time')
  getTime() {
    return {
      time: new Date().toDateString(),
    };
  }
}
