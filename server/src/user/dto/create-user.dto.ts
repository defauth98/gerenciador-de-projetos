import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto implements Partial<User> {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  passwordHash?: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ required: true })
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  passwordConfirmation: string;
}
