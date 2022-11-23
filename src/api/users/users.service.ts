import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../common/entities/user.entity';
import { UserType } from 'src/common/entities/enum/user-type.enum';
// import { CreateUserDto } from 'src/auth/dto/create-user.dto';
// import { UserSubscription } from '../../common/entities/user-subscription.entity';
// import { UserCountry } from 'src/common/entities/country.entity';
// import { DemographicInfo } from 'src/common/entities/demographic-info.entity';
// import { UserLoginRecord } from 'src/common/entities/user-login-record.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) // @InjectRepository(UserCountry)
  // private userCountriesRepo: Repository<UserCountry>,
  // @InjectRepository(DemographicInfo)
  // private userDemographicsRepo: Repository<DemographicInfo>,
  // @InjectRepository(UserLoginRecord)
  // private userLoginRecordsRepo: Repository<UserLoginRecord>,
  {}

  /** Find single user record by username.
   *
   * @param username User username to fetch.
   * @returns User record with given username.
   */
  async findOneByUsername(username: string): Promise<User> {
    let result: User;

    try {
      result = await this.usersRepo.findOne({ where: { username } });
    } catch (err) {
      Logger.error(
        `Could not fetch user record with username ${username}`,
        err,
      );
    }

    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }

  /** Find single user record by ID.
   *
   * @param id User ID to fetch.
   * @returns User record with given ID.
   */
  async findOneById(id: number): Promise<User> {
    let result: User;

    try {
      result = await this.usersRepo.findOne({ where: { id } });
    } catch (err) {
      Logger.error(`Could not fetch user record with ID ${id}`, err);
    }

    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }

  /** Fetch all user records in DB - ADMINS ONLY
   *
   * @returns All available User{} objects.
   */
  async findAllUsers(): Promise<User[]> {
    let result: User[];

    try {
      result = await this.usersRepo.find();
    } catch (err) {
      Logger.error(`Could not fetch user records`, err);
    }

    return result;
  }

  /** Fetch user record for currently signed in user
   *
   * @param user Current authenticated user{}
   * @returns User record for current user
   */
  async findCurrent(userId: number): Promise<User> {
    return this.findOneById(userId);
  }

  /** Delete a user and subscription record from the DB.
   *
   * @param id ID of user account to be deleted.
   * @returns Record of removed User.
   */
  async deleteUserById(id: number): Promise<User> {
    let result: User;
    // let subDeleteResult: UserSubscription;

    // const record = await this.findOneById(id)
    // const subRecordId = record.subscriptionId;

    // try {
    //   const subRecord = await this.userSubscriptionsRepo.findOne({
    //     where: { id: subRecordId },
    //   });
    //   subDeleteResult = await this.userSubscriptionsRepo.remove(subRecord);

    //   if (!subDeleteResult) {
    //     throw new InternalServerErrorException();
    //   }

    //   try {
    //     result = await this.usersRepo.remove(record);

    //     if (!result) {
    //       throw new InternalServerErrorException();
    //     }

    //     return result;
    //   } catch (err) {
    //     Logger.error(`Could not remove user with id ${id}`, err);
    //   }
    // } catch (err) {
    //   Logger.error(
    //     `Could not fetch subscription with id ${subRecordId}`,
    //     err,
    //   );
    // }

    return result;
  }

  /** Delete a user and subscription record from the DB by username.
   *
   * @param username Username of user account to be deleted.
   * @returns Record of removed User.
   */
  async deleteUserByUsername(username: string): Promise<User> {
    /// 1. Find user record to get userId
    const user = await this.findOneByUsername(username);

    /// 2. Pass found user ID to deleteUserById
    return this.deleteUserById(user.id);
  }

  /** Promote user account to ADMIN.
   *
   * @param userId ID of user account to promote.
   * @returns Updated user record.
   */
  async promoteUserAccount(userId: number): Promise<User> {
    return await this.updateUserRecordById(userId, {
      accountType: UserType.ADMIN,
    });
  }

  /** Update user record by user id.
   *
   * @param userId ID of user record to update.
   * @param newData Partial User{} object with new data to be written to record.
   * @returns Updated user record.
   */
  async updateUserRecordById(
    userId: number,
    newData: Partial<User>,
  ): Promise<User> {
    let result: User;

    /// 1. Find user record in db
    const record = await this.findOneById(userId);

    /// 2. Update fields as needed
    Object.assign(record, newData);

    /// 3. Save updated record to DB
    try {
      result = await this.usersRepo.save(record);
    } catch (err) {
      Logger.error(`Could not update user record`, err);
    }

    /// 4. Return result
    return result;
  }

  /** Update user record by username.
   *
   * @param userId ID of user record to update.
   * @param newData Partial User{} object with new data to be written to record.
   * @returns Updated user record.
   */
  async updateUserRecordByUsername(
    username: string,
    newData: Partial<User>,
  ): Promise<User> {
    let result: User;

    /// 1. Find user record in db
    const record = await this.findOneByUsername(username);

    /// 2. Update fields as needed
    Object.assign(record, newData);

    /// 3. Save updated record to DB
    try {
      result = await this.usersRepo.save(record);
    } catch (err) {
      Logger.error(`Could not update user record`, err);
    }

    /// 4. Return result
    return result;
  }
}
