import { faker } from '@faker-js/faker';
import { CreateUserDto } from './create-user.dto';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

describe('CreateUserDto', () => {
  const correctPassword = faker.internet.password();

  const createUserData: CreateUserDto = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: correctPassword,
    passwordConfirmation: correctPassword,
  };

  it('should not to be valid if invalid email are provided ', () => {
    const createUserDto = plainToClass(CreateUserDto, {
      ...createUserData,
      email: null,
    });
    const errors = validateSync(createUserDto);
    expect(errors).toHaveLength(1);

    errors.forEach((error) => {
      expect(error.property).toBe('email');
    });
  });

  it('should not to be valid if invalid password are provided ', () => {
    const createUserDto = plainToClass(CreateUserDto, {
      ...createUserData,
      password: null,
    });
    const errors = validateSync(createUserDto);
    expect(errors).toHaveLength(1);

    errors.forEach((error) => {
      expect(error.property).toBe('password');
    });
  });

  it('should not to be valid if invalid password are provided ', () => {
    const createUserDto = plainToClass(CreateUserDto, {
      ...createUserData,
      passwordConfirmation: null,
    });
    const errors = validateSync(createUserDto);
    expect(errors).toHaveLength(1);

    errors.forEach((error) => {
      expect(error.property).toBe('passwordConfirmation');
    });
  });

  it('should not to be valid if invalid password are provided ', () => {
    const createUserDto = plainToClass(CreateUserDto, {
      ...createUserData,
      name: null,
    });
    const errors = validateSync(createUserDto);
    expect(errors).toHaveLength(1);

    errors.forEach((error) => {
      expect(error.property).toBe('name');
    });
  });

  it('should to be valid if valid data are provided ', () => {
    const createUserDto = plainToClass(CreateUserDto, createUserData);
    const errors = validateSync(createUserDto);
    expect(errors).toHaveLength(0);
  });
});
