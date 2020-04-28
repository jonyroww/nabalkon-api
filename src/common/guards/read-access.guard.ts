import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { RoleName } from '../../constants/RoleName.enum';
import { User } from '../../users/entities/User.entity';
import { makeError } from '../errors/index';

export class UserWriteAccessGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const http = context.switchToHttp();
    const request = http.getRequest<Request>();

    const user = request.user as User;
    const userId = parseInt(request.params.userId, 10);

    if (user.role === RoleName.ADMIN) {
      return true;
    } else if (userId === user.id) {
      return true;
    } else {
      throw makeError('FORBIDDEN');
    }
  }
}
