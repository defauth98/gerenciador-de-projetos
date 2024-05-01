import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('login')
export class LoginController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  login(@Body() loginDto: LoginDto) {
    return this.usersService.login(loginDto);
  }
}
