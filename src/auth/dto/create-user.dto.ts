import {
  IsEmail,
  IsEnum,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserPlatform } from 'src/common/entities/enum/user-platform.enum';

export class CreateUserDto {
  @IsEmail({ unique: true })
  username: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  @MaxLength(32, { message: 'Password must be less than 32 characters' })
  @Matches(RegExp('(?=.*[a-z])'), {
    message:
      'Password must contain at least one lower case character',
  })
  @Matches(RegExp('(?=.*[A-Z])'), {
    message:
      'Password must contain at least one upper case character',
  })
  @Matches(RegExp('(?=.*[0-9])'), {
    message:
      'Password must contain at least one number',
  })
  @Matches(RegExp('(?=.*[-+_!@#$%^&*.,?])'), {
    message:
      'Password must contain at least one symbol',
  })
  password: string;
  
  @IsString()
  @IsEnum(UserPlatform)
  platform: UserPlatform;
}
