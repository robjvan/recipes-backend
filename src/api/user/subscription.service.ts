import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSubscription } from 'src/common/entities/user-subscription.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubscriptionService {
  private logger: Logger = new Logger(SubscriptionService.name);
  constructor(
    @InjectRepository(UserSubscription)
    private subsRepo: Repository<UserSubscription>,
  ) {}

  /** Searches DB for the given userId.
   *
   * @param userId Id to search for
   * @returns User object matching given id
   * @throws NotFoundException if record is not found
   *
   * Example:
   * ```ts
   * const result: UserSubscription = await subService.findOneById(user.subscriptionId);
   * ```
   */
  async findOneById(id: number): Promise<UserSubscription> {
    let result: UserSubscription;

    try {
      result = await this.subsRepo.findOne({ where: { id } });
    } catch (err) {
      this.logger.error(
        `Could not fetch subscription record with id ${id}`,
        err,
      );
    }

    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }

  /** Updates a single UserSubscription record. Used to upgrade or downgrade a user membership tier.
   *
   * @param id User ID to update
   * @param newTier New membership tier to assign to user
   * @returns Updated UserSubscription record
   * @throws NotFoundException if record is not found
   * @throws InternalServerErrorException if updates could not be written to DB
   *
   * Example:
   * ```ts
   * const result: UserSubscription = await subService.updateOneById(user.id, 1);
   * ```
   */
  async updateOneById(id: number, newTier: number): Promise<UserSubscription> {
    let result: UserSubscription;

    // 1. Grab record from DB
    const subRecord = await this.findOneById(id);

    // 2. Update fields as needed
    Object.assign(subRecord, { userTierId: newTier });

    // 3. Save updated record to DB
    try {
      result = await this.subsRepo.save(subRecord);
    } catch (err) {
      this.logger.error(`Could not update record with ID ${id}`, err);
    }

    if (!result) {
      throw new InternalServerErrorException(
        `Error updating recipe with ID ${id}`,
      );
    }
    return result;
  }

  /** Creates new subscription record
   *
   * @returns Newly created UserSubscription record
   * @throws InternalServerErrorException if new record could not be created
   *
   * Example:
   * ```ts
   * const result: UserSubscription = await subscriptionService.create();
   * ```
   */
  async createSubscription(): Promise<UserSubscription> {
    let result: UserSubscription;

    const newSubRecord = this.subsRepo.create();
    try {
      result = await this.subsRepo.save(newSubRecord);
    } catch (err) {
      this.logger.error('Could not create new subscription record', err);
      throw new InternalServerErrorException();
    }

    return result;
  }
}
