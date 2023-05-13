import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserSubscription } from 'src/common/entities/user-subscription.entity';
import { User } from 'src/common/entities/user.entity';
import { UserLoginRecord } from 'src/common/entities/user-login-record.entity';
import { UserSignupRecord } from 'src/common/entities/user-signup-record.entity';
import { JwtStrategy } from './jwt/jwt-strategy';
import { MailModule } from 'src/mail/mail.module';
import { UserService } from 'src/api/user/user.service';
import { UserModule } from 'src/api/user/user.module';
import { SubscriptionService } from 'src/api/user/subscription.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UserSubscription,
      UserLoginRecord,
      UserSignupRecord,
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: 3600 },
      }),
    }),
    MailModule,
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, SubscriptionService, UserService],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
