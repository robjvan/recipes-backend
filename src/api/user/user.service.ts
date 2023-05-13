import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomBytes, randomInt } from 'crypto';
import { CreateUserDto } from 'src/common/entities/dto/create-user.dto';
import { User } from 'src/common/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserSubscription } from 'src/common/entities/user-subscription.entity';
import { AuthService } from 'src/auth/auth.service';
import { MailService } from 'src/mail/mail.service';
import { SubscriptionService } from './subscription.service';

@Injectable()
export class UserService {
  private logger: Logger = new Logger(UserService.name);
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
    @InjectRepository(UserSubscription)
    private subscriptionRepo: Repository<UserSubscription>,
    private authService: AuthService,
    private mailService: MailService,
    private subscriptionService: SubscriptionService,
  ) {}

  /** Creates a new user account in the DB
   *
   * @param userDetails User information for the new acccount
   * @returns null
   */
  async createUser(
    userDetails: CreateUserDto,
  ): Promise<User | InternalServerErrorException> {
    const emailToken: string = randomBytes(16).toString('hex'); /// Generate 8bytes of random chars
    const smsToken = randomInt(100000, 1000000); /// Generate 6-digit SMS verification code

    /// This will store our new user element, we need this to attach the ID to the subscriptionRecord
    let userRecordResult: User;

    /// 1. Extract data from request
    const { username, password, name } = userDetails;

    /// 2. Check if email address already exists in DB
    const userExists = await this.userAlreadyExists(username);

    if (userExists) {
      return new ConflictException('Email already used');
    } else {
      /// 3. Generate salt and hash user password
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      /// 4. Generate new User record
      const newRecord: User = this.usersRepo.create({
        username,
        emailToken,
        smsToken,
        name,
        password: hashedPassword,
      });

      /// 5. Create new subscription record for user
      const subRecord: UserSubscription =
        await this.subscriptionService.createSubscription();

      /// 6. Assign subscriptionId and save back to DB
      Object.assign(newRecord, { subscriptionId: subRecord.id });

      /// 7. Save new user object to the DB
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
        /// 8. Capture user signup
        await this.authService.captureUserSignupRecord({
          userId: userRecordResult.id,
          platform: userDetails.platform,
        });

        /// 9. Send "Confirm Email" message
        this.mailService.sendUserConfirmation(userRecordResult, emailToken);

        /// 10. Return result
        return userRecordResult;
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  /** Find single user record by username.
   *
   * @param username User username to fetch.
   * @returns User record with given username.
   * @throws NotFoundException if no user record can be found
   *
   * Example:
   * ```ts
   * const result: User = await UserService.findOneByUsername('email@domain.com');
   * ```
   */
  async findOneByUsername(username: string): Promise<User> {
    let result: User;

    try {
      result = await this.usersRepo.findOne({ where: { username } });
    } catch (err) {
      this.logger.error(
        `Could not fetch user record with username ${username}`,
        err,
      );
    }

    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }

  /** Searches DB for the given userId
   *
   * @param userId Id to search for
   * @returns User object matching given id
   * @throws NotFoundException if no user record can be found
   *
   * Example:
   * ```ts
   * const result: User = await UserService.findOneById(user.id);
   * ```
   */
  async findOneById(id: number): Promise<User> {
    let result: User;

    try {
      result = await this.usersRepo.findOne({ where: { id } });
    } catch (err) {
      this.logger.error(`Could not fetch user record with id ${id}`, err);
    }

    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }

  /** Updates a single User record. Used to update user data.
   *
   * @param id User ID to update
   * @param newData New user account data
   * @returns Updated user record
   * @throws NotFoundException if user record is not found
   * @throws InternalServerErrorException if updated data could not be written to DB
   *
   * Example:
   * ```ts
   * const result = await UserService.updateOneById(user.id, newData);
   * ```
   */
  updateOneById(userId: number, newData: Partial<User>) {
    let result: User;

    // TODO: Build UserService.updateOneById();

    return result;
  }

  /** Disables an active user account
   *
   * @param userId ID of user account to disable
   * @returns Scrambled user record for verification
   * @throws NotFoundException if user record is not found
   * @throws InternalServerErrorException if user data scrambling failed
   *
   * Example:
   * ```ts
   * const result: User = await UserService.cancelMembership(user.id);
   * ```
   */
  cancelMembership(userId: number) {
    /// Disable the account and scramble/zero all personal data
    /// but retain generated recipes.  Disabling instead of deleting allows
    /// the user to reactivate account at a later date.

    let result: User;

    // TODO: Build UserService.cancelMembership();

    return result;
  }

  /** Confirm email address of existing user
   *
   * @param token Email token of user
   * @returns Updated user record
   * @throws NotFoundException if user record could not be found
   * @throws InternalServerErrorException if user record could not be updated
   *
   * Example:
   * ```ts
   * const result: User = await UserService.confirmUser(token);
   * ```
   */
  async confirmUser(token: string): Promise<User> {
    let record: User;
    let result: User;

    try {
      /// 1. Search DB for user with given emailToken
      record = await this.usersRepo.findOneBy({
        emailToken: token,
      });

      if (record) {
        /// 2. Set emailConfirmed to true
        Object.assign(record, { emailConfirmed: true });
        try {
          result = await this.usersRepo.save(record);

          /// 3. Return result
          return result;
        } catch (err) {
          throw new InternalServerErrorException(
            'Could not save updated user record',
          );
        }
      }
    } catch (err) {
      throw new NotFoundException();
    }
  }

  /** Checks if an email address already exists in the DB
   *
   * @param email Email address to search for
   * @returns True if the user already exists in the DB, false if not
   *
   * Example:
   * ```ts
   * const userExists = await UserService.userAlreadyExists(user.username);
   * ```
   */
  async userAlreadyExists(username: string): Promise<boolean> {
    try {
      const dbResult: User[] = await this.usersRepo.findBy({ username });
      return dbResult.length != 0 ? true : false;
    } catch (e) {
      this.logger.debug(`Could not check for existing user, ${e}`);
      return null;
    }
  }
}
