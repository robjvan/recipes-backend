import { Module } from '@nestjs/common';
import { ReportingService } from './reporting.service';
import { ReportingController } from './reporting.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/common/entities/user.entity';
import { Recipe } from '../../common/entities/recipe.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Recipe]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [ReportingService],
  controllers: [ReportingController],
})
export class ReportingModule {}
