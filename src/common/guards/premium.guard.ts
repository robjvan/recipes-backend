// import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common';
// import { UserSubscriptionService } from 'src/api/users/user-subscription.service';

// @Injectable()
// export class PremiumGuard implements CanActivate {
//   @Inject(UserSubscriptionService) private userSubsService: UserSubscriptionService;

//   async canActivate(
//     context: ExecutionContext,
//   ): Promise<boolean> {
//     let isPremium = false;

//     try {
//       const userSubRecord = await this.userSubsService.findOneByUserId(context.switchToHttp().getRequest().user.id);
//       if (userSubRecord.accountTier == 1 || userSubRecord.accountTier == 2) {
//         isPremium = true;
//       }
//     } catch (err) {}

//     return isPremium;
//   }
// }
