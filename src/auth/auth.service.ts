import {
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/common/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInDto } from './dto/sign-in.dto';
import { Repository } from 'typeorm';
import { UsersService } from 'src/api/users/users.service';
import * as bcrypt from 'bcrypt';
import { IJwtPayload } from './jwt/jwt-payload.interface';
import { UserLoginRecord } from 'src/common/entities/user-login-record.entity';
import { ConfirmEmailDto } from './dto/confirm-email.dto';
import { UserSubscription } from 'src/common/entities/user-subscription.entity';
import { UserLoginRecordDto } from './dto/user-login-record.dto';
import { UserSignupRecord } from 'src/common/entities/user-signup-record.entity';
import { randomBytes, randomInt } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
    @InjectRepository(UserSubscription)
    private userSubscriptionsRepo: Repository<UserSubscription>,
    @InjectRepository(UserLoginRecord)
    private userLoginsRepo: Repository<UserLoginRecord>,
    @InjectRepository(UserSignupRecord)
    private userSignupRepo: Repository<UserSignupRecord>,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /** Capture user sign up record and save new record to the DB
   *
   * @param signupRecord Details of user signup to be recorded (userId, platform)
   */
  async captureUserSignupRecord(signupRecord: UserSignupRecord): Promise<void> {
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
      Logger.error('Could not save user sign up record', err);
    }

    if (!result) {
      throw new InternalServerErrorException();
    }

    return null;
  }

  /** Capture user log in and save new record to the DB
   *
   * @param loginRecord Details of user login to record (userId, platform)
   */
  async captureUserLoginRecord(loginRecord: UserLoginRecordDto): Promise<void> {
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
      Logger.error('Could not save UserLoginRecord', err);
    }

    if (!result) {
      throw new InternalServerErrorException();
    }

    return null;
  }

  /** Confirm email address of existing user
   *
   * @param email Email address of existing user
   * @returns Updated user record
   */
  async confirmEmail(body: ConfirmEmailDto): Promise<User> {
    const { username, token } = body;
    let record: User;
    let result: User;

    try {
      /// 1. Search DB for user with matching emailToken
      record = await this.usersRepo.findOne({
        where: [{ username }, { emailToken: token }],
      });

      if (!record) {
        throw new NotFoundException();
      }

      /// 2. Set email confirmed to true
      result = await this.usersService.updateUserRecordById(record.id, {
        emailConfirmed: true,
      });
    } catch (err) {
      throw new NotFoundException();
    }

    /// 3. Return updated user?
    return result;
  }

  /** Create a new user
   *
   * @param credentials Username and password of new user
   * @returns Newly created user record
   */
  async createUser(credentials: CreateUserDto): Promise<User> {
    const { username, password } = credentials;
    const emailToken: string = randomBytes(8).toString('hex'); /// Generate 8bytes of random chars
    const smsToken = randomInt(1000000); /// Generate 6-digit SMS verification code
    
    /// This will store our new user element, we need this to attach the ID to the subscriptionRecord
    let userRecordResult: User;

    /// 1. Generate salt and hash user password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // 2. Create new user record
    const newRecord: User = this.usersRepo.create({
      username,
      emailToken,
      smsToken,
      password: hashedPassword,
    });

    /// 3. Save new user to DB
    try {
      userRecordResult = await this.usersRepo.save(newRecord);
    } catch (err) {
      if (err.code === '23505') {
        // duplicate username error code
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }

    if (userRecordResult) {
      /// 4. Create new subscription record for user
      const newSubRecord = this.userSubscriptionsRepo.create();
      const newSubRecordResult = await this.userSubscriptionsRepo.save(
        newSubRecord,
      );

      /// 5. Assign subscriptionId and save back to DB
      Object.assign(userRecordResult, {
        subscriptionId: newSubRecordResult.id,
      });
      try {
        userRecordResult = await this.usersRepo.save(userRecordResult);
      } catch (err) {
        Logger.error(`Could not save user with subscription ID`, err);
      }

      /// 6. Capture user signup
      await this.captureUserSignupRecord({
        userId: userRecordResult.id,
        platform: credentials.platform,
      });
    }

    // TODO: return "confirm email" message response
    // TODO: Fire 'sendConfirmEmailMessage' workflow

    /// 7. Return result
    return userRecordResult;
  }

  /** Sign in as an existing user
   *
   * @param credentials Username and password of exisiting user
   * @returns Authorization token as { accessToken: string}
   */
  async signIn(credentials: SignInDto): Promise<{ accessToken: string }> {
    const { username, password, platform } = credentials;

    // let user: User;
    let accessToken: string;

    /// 1. Fetch the user with the given username
    const user = await this.usersRepo.findOne({ where: { username } });

    /// 2. Ensure user exists and password is correct
    if (user && (await bcrypt.compare(password, user.password))) {
      /// 3. Sign payload using username
      const payload: IJwtPayload = { username };
      accessToken = this.jwtService.sign(payload);
    } else {
      throw new UnauthorizedException('Please check login credentials'); // Throws a 401 error
    }

    /// 4. Check if email address has been verified
    if (!user.emailConfirmed) {
      throw new ForbiddenException('Email address has not been confirmed'); // Throws a 403 error
    }

    /// 5. Capture user login
    await this.captureUserLoginRecord({ userId: user.id, platform });

    /// 6. Return access token
    return { accessToken };
  }

  /** Check if a username already exists in the DB
   * 
   * @param username Username to search for in the DB
   * @returns True if the username already exists, else false
   */
  async checkIfUserExists(username: string): Promise<boolean> {
    try {
      await this.usersService.findOneByUsername(username);

      //* If no exception is thrown, it means a matching record was found. 
      //* No further processing required.
        return true;
    } catch (err) {
      //* In this case, an exception means no record was found.
    }
    return false;
  }
}
