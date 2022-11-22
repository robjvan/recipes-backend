import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RecipesService } from 'src/api/recipes/recipes.service';
import { UserSubscriptionService } from 'src/api/users/user-subscription.service';
import { UsersService } from 'src/api/users/users.service';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { AdminService } from './admin.service';

@Controller('admin')
@UseGuards(AuthGuard(), new AdminGuard())
export class AdminController {
  constructor(
    private adminService: AdminService,
    private userSubscriptionsService: UserSubscriptionService,
    private recipesService: RecipesService,
    private usersService: UsersService,
  ) {}

  /// Fetch all recipes
  @Get('/recipes')
  findAllRecipes() {
    return this.recipesService.findAllRecipes();
  }

  /// Fetch all users
  @Get('/users')
  findAllUsers() {
    return this.usersService.findAllUsers();
  }

  // Fetch all subscriptions
  @Get('/subscriptions')
  findAllSubs() {
    return this.userSubscriptionsService.findAll();
  }

  /// Delete User by ID
  @Delete('/users/:id')
  getUserByUsername(@Param('id') id: number) {
    return this.usersService.deleteUserById(id);
  }

  /// Delete User by username
  @Delete('/users/username')
  deleteUserById(@Body() username: string) {
    return this.usersService.deleteUserByUsername(username);
  }

  /// Clear tables
  @Delete('/cleartables')
  clearTables() {
    return this.adminService.clearTables();
  }

  // Get subscription information for user
  @Get('/:id/subscription')
  fetchSubscriptionDetails(@Param('id') userId: number) {
    return this.userSubscriptionsService.findOneByUserId(userId);
  }

  // Get user by ID
  @Get('/:id')
  findOneById(@Param('id') id: number) {
    return this.usersService.findOneById(id);
  }
}
