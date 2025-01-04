import { faker } from '@faker-js/faker';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

import { LoginDto } from './login.dto';

describe('LoginDto', () => {
  const loginData: LoginDto = {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  it('should not to be valid if email are not provided', () => {
    const loginDto = plainToClass(LoginDto, {
      ...loginData,
      email: null,
    });
    const errors = validateSync(loginDto);
    expect(errors).toHaveLength(1);

    errors.forEach((error) => {
      expect(error.property).toBe('email');
      expect(error.constraints).toEqual({ isEmail: 'email must be an email' });
    });
  });

  it('should not to be valid if email is not valid', () => {
    const loginDto = plainToClass(LoginDto, {
      ...loginData,
      email: 'invalid_email',
    });
    const errors = validateSync(loginDto);
    expect(errors).toHaveLength(1);

    errors.forEach((error) => {
      expect(error.constraints).toEqual({ isEmail: 'email must be an email' });
    });
  });

  it('should not to be valid if password are not provided', () => {
    const loginDto = plainToClass(LoginDto, {
      ...loginData,
      password: null,
    });
    const errors = validateSync(loginDto);
    expect(errors).toHaveLength(1);

    errors.forEach((error) => {
      expect(error.property).toBe('password');
      expect(error.constraints).toEqual({
        isString: 'password must be a string',
      });
    });
  });
});
