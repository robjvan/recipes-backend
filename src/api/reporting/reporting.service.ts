import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipe } from '../../common/entities/recipe.entity';
import { User } from 'src/common/entities/user.entity';
import { Repository } from 'typeorm';

//* Reporting service will push key metrics to the front end
//* Restricted to admins only 

@Injectable()
export class ReportingService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
    @InjectRepository(Recipe)
    private readonly recipesRepo: Repository<Recipe>,
  ) {}

  //! Must be restricted to ONLY admin users!

  // Useful metrics:
  //    User tier counts - free, monthly, annual
  //    User activity counts - Logged in within last 7/30/90 days
  //    Recipe counts - total, by allergen, created within last 7/30/90 days

  // Fun/nonsense metrics:
  //    Most used ingredients? Most popular name?  
  //    Total amount of various ingredients used in all recipes? 
}