jest.mock('bcrypt');

import { TestBed } from '@automock/jest';
import { faker } from '@faker-js/faker';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { User } from './entities/user.entity';
import { UserService } from './users.service';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: jest.Mocked<Repository<User>>;
  let jwtService: jest.Mocked<JwtService>;

  const correctPassword = faker.internet.password();

  const createUserData: CreateUserDto = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: correctPassword,
    passwordConfirmation: correctPassword,
  };

  const loginPayload: LoginDto = {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  const userPayload: User = {
    id: 1,
    name: faker.person.fullName(),
    email: faker.internet.email(),
    createdAt: new Date(),
    updatedAt: new Date(),
    passwordHash: faker.internet.password(),
  };

  beforeEach(async () => {
    const { unit, unitRef } = await TestBed.create(UserService).compile();

    userService = unit;
    userRepository = unitRef.get('USER_REPOSITORY');
    jwtService = unitRef.get(JwtService);
  });

  beforeAll(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('create()', () => {
    it('should throw an error when the password is different from the confirmation', async () => {
      createUserData.passwordConfirmation = faker.internet.password();

      expect(userService.create(createUserData)).rejects.toEqual(
        new BadRequestException('Invalid password'),
      );
      expect(userRepository.findOne).toHaveBeenCalledTimes(0);
    });

    it('should throw an error when email already exists', () => {
      createUserData.passwordConfirmation = correctPassword;
      userRepository.findOne.mockResolvedValue(userPayload);

      expect(userService.create(createUserData)).rejects.toEqual(
        new BadRequestException('User already exists'),
      );
      expect(userRepository.findOne).toHaveBeenCalledTimes(1);
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { email: createUserData.email },
      });
    });

    it('should create an user if valid payload are provided', async () => {
      userRepository.findOne.mockResolvedValue(null);
      userRepository.save.mockResolvedValue(userPayload);
      jwtService.signAsync.mockResolvedValue('any token');
      jest.spyOn(bcrypt, 'hashSync').mockReturnValue('password_hash');

      const user = await userService.create(createUserData);

      expect(user.token).toBe('any token');
      expect(user.user.id).toBe(userPayload.id);
      expect(user.user.email).toBe(userPayload.email);
      expect(user.user.name).toBe(userPayload.name);
      expect(userRepository.save).toHaveBeenCalled();
      expect(userRepository.save).toHaveBeenCalledWith({
        email: createUserData.email,
        name: createUserData.name,
        passwordHash: 'password_hash',
      });
    });
  });

  describe('login()', () => {
    it('should throw an error if user not found', () => {
      expect(userService.login(loginPayload)).rejects.toEqual(
        new BadRequestException('User not found'),
      );
      expect(userRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if invalid password is provided', () => {
      userRepository.findOne.mockResolvedValue(userPayload);
      jest.spyOn(bcrypt, 'compareSync').mockReturnValue(false);

      expect(userService.login(loginPayload)).rejects.toEqual(
        new UnauthorizedException(),
      );
      expect(userRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('should login if valid credentials are provided', async () => {
      userRepository.findOne.mockResolvedValue(userPayload);
      jwtService.signAsync.mockResolvedValue('any token');
      const compareSyncSpy = jest
        .spyOn(bcrypt, 'compareSync')
        .mockReturnValue(true);

      const loginResult = await userService.login(loginPayload);

      expect(loginResult.token).toEqual('any token');
      expect(loginResult.user.id).toBe(userPayload.id);
      expect(loginResult.user.name).toBe(userPayload.name);
      expect(loginResult.user.email).toBe(userPayload.email);
      expect(userRepository.findOne).toHaveBeenCalledTimes(1);
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: {
          email: loginPayload.email,
        },
      });
      expect(compareSyncSpy).toHaveBeenCalledWith(
        loginPayload.password,
        userPayload.passwordHash,
      );
    });
  });
});
