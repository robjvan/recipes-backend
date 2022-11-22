import { Body, Controller, Post } from '@nestjs/common';
import { CheckUsernameDto } from 'src/auth/dto/check-username.dto';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { User } from 'src/common/entities/user.entity';
import { AuthService } from './auth.service';
import { ConfirmEmailDto } from './dto/confirm-email.dto';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Create a new user
  @Post('/signup')
  signUp(@Body() body: CreateUserDto): Promise<User> {
    return this.authService.createUser(body);
  }

  // Sign in as an existing user
  @Post('/signin')
  signIn(@Body() body: SignInDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(body);
  }

  // Confirm email address of an existing user
  @Post('/confirmemail')
  confirmEmail(@Body() body: ConfirmEmailDto): Promise<User> {
    return this.authService.confirmEmail(body);
  }

  /// Check if username already exists in DB
  @Post('/checkusername')
  checkIfUserExists(@Body() data: CheckUsernameDto): Promise<boolean> {
    return this.authService.checkIfUserExists(data.username);
  }
}
