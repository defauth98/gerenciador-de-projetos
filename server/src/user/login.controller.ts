import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserService } from './users.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('login')
export class LoginController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  login(@Body() loginDto: LoginDto) {
    return this.usersService.login(loginDto);
  }
}
