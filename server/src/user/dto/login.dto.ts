import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

import { User } from '../entities/user.entity';

export class LoginDto implements Partial<User> {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  passwordHash?: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}
