import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { hashSync, compareSync } from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password, passwordConfirmation } = createUserDto;

    if (password != passwordConfirmation) {
      throw new BadRequestException('Invalid password');
    }

    const userExists = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });

    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    const passwordHash = hashSync(password, 12);

    const payload: Partial<User> = {
      email: createUserDto.email,
      name: createUserDto.name,
      passwordHash,
    };

    Logger.log(`User created`, payload);

    const user = await this.userRepository.save(payload);

    return {
      token: jwt.sign({ userId: user.id }, 'secret'),
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    const { passwordHash } = user;

    const isValid = compareSync(password, passwordHash);

    if (isValid) {
      return {
        token: jwt.sign({ userId: user.id }, 'secret'),
      };
    }

    throw new UnauthorizedException();
  }
}
