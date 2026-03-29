import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { JwtAuthGuard } from '../guards/jwt-auth.guard';

export const OPTIONAL_AUTH = Symbol('OPTIONAL_AUTH');

type UseJwtAuthGuardOptions = {
  optional?: boolean;
};

export const UseJwtAuthGuard = (options?: UseJwtAuthGuardOptions) => {
  const decorators = [
    ...(options?.optional ? [SetMetadata(OPTIONAL_AUTH, true)] : []),
    UseGuards(JwtAuthGuard),
    ApiBearerAuth(),
    ApiBearerAuth('access-token'),
  ];
  return applyDecorators(...decorators);
};
