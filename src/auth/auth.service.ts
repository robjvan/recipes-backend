import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserLoginDto } from 'src/common/entities/dto/user-login.dto';
import { User } from 'src/common/entities/user.entity';
import { Repository } from 'typeorm';
import { UserLoginRecord } from 'src/common/entities/user-login-record.entity';
import { UserSignupRecord } from 'src/common/entities/user-signup-record.entity';
import { IJwtPayload } from './jwt/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private logger: Logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
    @InjectRepository(UserSignupRecord)
    private userSignupRepo: Repository<UserSignupRecord>,
    @InjectRepository(UserLoginRecord)
    private userLoginsRepo: Repository<UserLoginRecord>,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  /** Sign in as an existing user
   *
   * @param userCredentials Username and password of exisiting user
   * @returns Authorization token as { accessToken: string}
   * @throws UnauthorizedException if user is not signed in
   * @throws ForbiddenException is user has not verified email address
   * @throws NotFoundException if username does not exist in DB
   *
   * Example:
   * ```ts
   * const token: string = await authService.userLogin(userCredentials);
   * ```
   */
  async userLogin(
    userCredentials: UserLoginDto,
  ): Promise<{ accessToken: string }> {
    let accessToken: string;
    let user: User;

    /// 1. Extract data from request
    const { username, password, platform } = userCredentials;

    /// 2. Fetch the user with the given username
    try {
      user = await this.usersRepo.findOneBy({ username: username });
    } catch (err) {
      throw new NotFoundException(`User with username: ${username} not found`);
    }

    /// 3. Check if password is correct
    if (user && (await bcrypt.compare(password, user.password))) {
      ///  4. Sign payload using username
      const payload: IJwtPayload = { username };
      accessToken = this.jwtService.sign(payload);
    } else {
      throw new UnauthorizedException('Please check login credentials'); // Throws a 401 error
    }

    /// 5. Check if email address has been verified
    if (!user.emailConfirmed) {
      throw new ForbiddenException('Email address has not been confirmed'); // Throws a 403 error
    }

    /// 6. Capture user login
    await this.captureUserLoginRecord({ userId: user.id, platform });

    /// 7. Return access token
    return { accessToken };
  }

  /** Capture user sign up record and save new record to the DB
   *
   * @param signupRecord Details of user signup to be recorded (userId, platform)
   * @returns Newly created UserSignupRecord object
   * @throws InternalServerErrorException if record could not be saved
   *
   * Example:
   * ```ts
   * const result: UserSignupRecord = await authService.captureUserSignupRecord(user.userid, 'mobile');
   * ```
   */
  async captureUserSignupRecord(
    signupRecord: UserSignupRecord,
  ): Promise<UserSignupRecord> {
    const { userId, platform } = signupRecord;
    let result: UserLoginRecord;

    /// 1. Create user login record
    const record: UserLoginRecord = this.userSignupRepo.create({
      userId,
      platform,
    });

    /// 2. Save new user login record to DB
    try {
      result = await this.userSignupRepo.save(record);
    } catch (err) {
      this.logger.error('Could not save user sign up record', err);
      throw new InternalServerErrorException();
    }

    if (!result) {
      throw new InternalServerErrorException();
    }

    return result;
  }

  /** Capture user log in and save new record to the DB
   *
   * @param loginRecord Details of user login to record (userId, platform)
   * @returns Newly created UserLoginRecord object
   * @throws InternalServerErrorException if record could not be saved
   *
   * Example:
   * ```ts
   * const result: UserLoginRecord = await authService.captureUserLoginRecord(user.userId, 'mobile');
   * ```
   */
  async captureUserLoginRecord(
    loginRecord: UserLoginRecord,
  ): Promise<UserLoginRecord> {
    const { userId, platform } = loginRecord;
    let result: UserLoginRecord;

    /// 1. Create user login record
    const record: UserLoginRecord = this.userLoginsRepo.create({
      userId,
      platform,
    });

    /// 2. Save new user login record to DB
    try {
      result = await this.userLoginsRepo.save(record);
    } catch (err) {
      this.logger.error('Could not save UserLoginRecord', err);
      throw new InternalServerErrorException();
    }

    if (!result) {
      throw new InternalServerErrorException();
    }

    return result;
  }

  /** Sends a test email message to 'robjvan@gmail.com'
   *
   * Example:
   * ```ts
   * authService.sendTestMsg();
   * ```
   */
  sendTestMsg(): void {
    this.mailService.sendTestMsg();
  }
}
