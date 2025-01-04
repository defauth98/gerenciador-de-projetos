import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { LoginDto } from './dto/login.dto';
import { UserService } from './users.service';

@ApiTags('Auth')
@Controller('login')
export class LoginController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  login(@Body() loginDto: LoginDto) {
    return this.usersService.login(loginDto);
  }
}
