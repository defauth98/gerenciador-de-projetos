import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UserController } from './user.controller';
import { userProvider } from './entities/user.providers';
import { DatabaseModule } from '../database/database.module';
import { LoginController } from './login.controller';
import { JwtModule } from '@nestjs/jwt';

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
