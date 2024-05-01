import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class LoginDto implements Partial<User> {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  passwordHash: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
