import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { userProvider } from './entities/user.providers';
import { DatabaseModule } from 'src/database/database.module';
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
  controllers: [UsersController, LoginController],
  providers: [UsersService, ...userProvider],
})
export class UsersModule {}
