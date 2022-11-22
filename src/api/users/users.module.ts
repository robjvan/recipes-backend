import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from 'src/common/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSubscriptionService } from 'src/api/users/user-subscription.service';
import { UserSubscription } from '../../common/entities/user-subscription.entity';
import { PassportModule } from '@nestjs/passport';
import { UserCountry } from 'src/common/entities/country.entity';
import { DemographicInfo } from 'src/common/entities/demographic-info.entity';
import { UserLoginRecord } from 'src/common/entities/user-login-record.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UserSubscription,
      UserCountry,
      DemographicInfo,
      UserLoginRecord,
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [UsersService, UserSubscriptionService],
  controllers: [UsersController],
  exports: [],
})
export class UsersModule {}
