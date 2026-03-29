import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { canIgnoreAuth } from '../auth.utils';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return canIgnoreAuth(this.reflector, context)
      ? true
      : super.canActivate(context);
  }

  handleRequest(
    err: Error | null,
    user: any,
    info: any,
    context: ExecutionContext,
  ): any {
    // If auth is optional and no user, return undefined instead of throwing
    if (canIgnoreAuth(this.reflector, context) && (!user || err)) {
      return undefined;
    }
    return super.handleRequest(err, user, info, context);
  }
}
