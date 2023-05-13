import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SubscriptionService } from './subscription.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/common/entities/user.entity';
import { UserSubscription } from 'src/common/entities/user-subscription.entity';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { MailService } from 'src/mail/mail.service';
import { UserSignupRecord } from 'src/common/entities/user-signup-record.entity';
import { UserLoginRecord } from 'src/common/entities/user-login-record.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UserSubscription,
      UserSignupRecord,
      UserLoginRecord,
    ]),
    PassportModule,
  ],
  controllers: [UserController],
  providers: [
    UserService,
    SubscriptionService,
    AuthService,
    MailService,
    JwtService,
  ],
})
export class UserModule {}
