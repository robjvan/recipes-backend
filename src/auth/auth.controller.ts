import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/common/entities/dto/create-user.dto';
import { UserLoginDto } from 'src/common/entities/dto/user-login.dto';
import { UserService } from 'src/api/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  // Register a new user
  @Post('/signup')
  userSignup(@Body() userDetails: CreateUserDto) {
    return this.userService.createUser(userDetails);
  }

  // Login as an existing user
  @Post('/login')
  userLogin(@Body() userCreds: UserLoginDto) {
    return this.authService.userLogin(userCreds);
  }

  // Confirm email address of a new user
  @Get('/confirm/:token')
  async confirmUser(@Param('token') token: string) {
    await this.userService.confirmUser(token);
    return null;
    // TODO(Rob): Add some sort of "you may now login" message
  }

  @Get('test')
  sendTestMsg() {
    return this.authService.sendTestMsg();
  }
}
