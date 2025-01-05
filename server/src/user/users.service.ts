import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync, hashSync } from 'bcrypt';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
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

    const payload: Partial<UserEntity> = {
      email: createUserDto.email,
      name: createUserDto.name,
      passwordHash,
    };

    const user = await this.userRepository.save(payload);

    return {
      token: await this.jwtService.signAsync({ userId: user.id }),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const { passwordHash } = user;

    const isValid = compareSync(password, passwordHash);

    if (!isValid) {
      throw new UnauthorizedException();
    }

    return {
      token: await this.jwtService.signAsync({ userId: user.id }),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
