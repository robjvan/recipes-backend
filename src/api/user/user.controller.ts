import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { User } from 'src/common/entities/user.entity';
import { SubscriptionService } from './subscription.service';

@Controller('api/v1/user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(
    private userService: UserService,
    private subscriptionService: SubscriptionService,
  ) {}

  /// Get current user data
  @Get('')
  fetchCurrentUser(@GetUser() user: User) {
    return this.userService.findOneById(user.id);
  }

  /// Get subscription data for current user
  @Get('/subscription')
  fetchSubscriptionDetails(@GetUser() user: User) {
    return this.subscriptionService.findOneById(user.id);
  }

  /// Update user information
  @Patch('')
  updateCurrentUser(@GetUser() user: User, @Body() newData: Partial<User>) {
    return this.userService.updateOneById(user.id, newData);
  }

  /// Update user subscription data (upgrade or downgrade)
  @Patch('/subscription')
  updateCurrentSubscription(@GetUser() user: User, @Body() newTier: number) {
    return this.subscriptionService.updateOneById(user.id, newTier);
  }

  /// Close down user account
  @Get('/cancel')
  cancelMembership(@GetUser() user: User) {
    return this.userService.cancelMembership(user.id);
  }
}
