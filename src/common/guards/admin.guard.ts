import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';


@Injectable()
export class AdminGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    let isAdmin = false;
    try {
      isAdmin = context.switchToHttp().getRequest().user.accountType == 'admin';
    } catch (err) {}
    return isAdmin;
  }
}
