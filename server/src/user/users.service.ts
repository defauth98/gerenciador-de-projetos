import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { hashSync, compareSync } from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
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

    const payload: Partial<User> = {
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
