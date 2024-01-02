import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Role as PrismaRole } from '@prisma/client';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  name: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(PrismaRole)
  role: PrismaRole;
}

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
