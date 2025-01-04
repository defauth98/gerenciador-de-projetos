import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { DatabaseModule } from '../database/database.module';
import { userProvider } from './entities/user.providers';
import { LoginController } from './login.controller';
import { UserController } from './user.controller';
import { UserService } from './users.service';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      global: true,
      secret: 'secret',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [UserController, LoginController],
  providers: [UserService, ...userProvider],
})
export class UserModule {}
