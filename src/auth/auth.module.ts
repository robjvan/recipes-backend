import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from 'src/common/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt-strategy';
import { UsersService } from 'src/api/users/users.service';
import { UserSubscription } from 'src/common/entities/user-subscription.entity';
import { UserCountry } from 'src/common/entities/country.entity';
import { DemographicInfo } from 'src/common/entities/demographic-info.entity';
import { UserLoginRecord } from 'src/common/entities/user-login-record.entity';
import { UserSignupRecord } from 'src/common/entities/user-signup-record.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UserSubscription,
      UserCountry,
      DemographicInfo,
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
  ],
  providers: [AuthService, JwtStrategy, UsersService, UserSignupRecord],
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
