import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

import { OPTIONAL_AUTH } from './decorators/use-jwt-auth-guard.decorator';

export const canIgnoreAuth = (
  reflector: Reflector,
  context: ExecutionContext,
): boolean => {
  return (
    !!reflector.get<boolean>(OPTIONAL_AUTH, context.getHandler()) &&
    !context.switchToHttp().getRequest<Request>().header('authorization')
  );
};
