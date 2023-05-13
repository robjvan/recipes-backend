import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserPlatform } from '../enum/user-platform.enum';

export class CreateUserDto {
  @IsEmail()
  username: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @MinLength(6)
  @MaxLength(32)
  password: string;

  @IsEnum(UserPlatform)
  platform: UserPlatform;

  @IsNumber()
  subscriptionTier: number;
}
