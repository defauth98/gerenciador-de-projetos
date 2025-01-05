import { ValidationError } from '@nestjs/common';

type ValidationConstrainsSchema<T> = {
  [K in keyof T]: 'isString' | 'isNumber' | 'isBoolean' | 'isDate';
};

export function validateConstrains<T>(
  validationSchema: ValidationConstrainsSchema<T>,
  errors: ValidationError[],
) {
  for (const [key, value] of Object.entries(validationSchema)) {
    const error = errors.find((error) => error.property === key);
    expect(Object.keys(error.constraints)).toEqual([value]);
  }
}
