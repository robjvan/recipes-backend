import { IsEnum, MinLength, IsString, MaxLength } from 'class-validator';
import { UserPlatform } from '../enum/user-platform.enum';

export class UserLoginDto {
  @IsString()
  username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(32)
  password: string;

  @IsEnum(UserPlatform)
  platform: UserPlatform;
}
