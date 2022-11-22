import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSubscription } from '../../common/entities/user-subscription.entity';
import { User } from '../../common/entities/user.entity';
import { UsersService } from './users.service';

@Injectable()
export class UserSubscriptionService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
    @InjectRepository(UserSubscription)
    private userSubscriptionsRepo: Repository<UserSubscription>,
    private usersService: UsersService,
  ) {}

  /** Fetch all user subscriptions records in DB - ADMINS ONLY
   *
   * @returns All available UserSubscription{} objects
   */
  async findAll(): Promise<UserSubscription[]> {
    let result: UserSubscription[];

    try {
      result = await this.userSubscriptionsRepo.find();
    } catch (err) {
      Logger.error(`Could not fetch user records`, err);
    }

    return result;
  }

  /** Clear DB table - ADMINS ONLY
   */
  async clearTable(): Promise<void> {
    await this.usersRepo.clear();
    await this.userSubscriptionsRepo.clear();
  }

  /** Find single user subscription record by ID
   * 
   * @param id UserSubscription ID to fetch
   * @returns UserSubscription record with given ID
   */
  async findOneById(id: number): Promise<UserSubscription> {
    let result: UserSubscription;

    try {
      result = await this.userSubscriptionsRepo.findOne({where: {id}});

      if (!result) {
        throw new NotFoundException(); 
      }

      return result;

    } catch (err) {
      Logger.error(`Could not fetch user subscription with id ${id}`, err);
    }
  }

  /** Find subscription record by user ID
   *
   * @param userId User ID to find subscription for
   * @returns UserSubscription record
   */
  async findOneByUserId(userId: number): Promise<UserSubscription> {
    /// 1. Fetch User record byt userId to get subscriptionId
    const subscriptionId = (await this.usersService.findOneById(userId)).subscriptionId;
    
    /// 2. Fetch subscription record with given ID
    const result = await this.findOneById(subscriptionId);

    /// 3. Return result
    return result;
  }

  /** Find subscription record by username 
   *
   * @param userId User ID to find subscription for
   * @returns UserSubscription record
   */
  async findOneByUsername(username: string): Promise<UserSubscription> {
    /// 1. Get userId
    const user = await this.usersService.findOneByUsername( username );

    /// 2. Pass userId to findOneByUserId
    return await this.findOneByUserId(user.id);
  }
}
