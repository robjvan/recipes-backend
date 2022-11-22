import { Module } from '@nestjs/common';
import { InsightsService } from './insights.service';
import { InsightsController } from './insights.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from '../../common/entities/recipe.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([Recipe]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [InsightsService],
  controllers: [InsightsController],
})
export class InsightsModule {}
