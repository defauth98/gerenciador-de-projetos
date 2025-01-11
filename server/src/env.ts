import { IsOptional, IsString } from 'class-validator';

export class EnvironmentVariables {
  @IsString()
  DB_HOST: string;

  @IsString()
  DB_PORT: string;

  @IsString()
  DB_USER: string;

  @IsString()
  DB_PASSWORD: string;

  @IsString()
  DB_NAME: string;

  @IsString()
  @IsOptional()
  ADMIN_EMAIL: string;

  @IsString()
  @IsOptional()
  ADMIN_PASSWORD: string;
}
