import { ErrorCode } from '@/shared/constants/error-codes.enum';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthenticatedRequest } from '../dto/req-user.dto';

@Injectable()
export class DomainRoleGuard implements CanActivate {
  private readonly domainRoleMap: Record<string, string>;
  private readonly disableGuard: boolean;
  private readonly logger = new Logger(DomainRoleGuard.name);

  constructor() {
    const env = String(process.env.NODE_ENV || '').toLowerCase();
    const requestedDisable = process.env.DISABLE_DOMAIN_GUARD === 'true';
    // Allow disabling only in local development.
    this.disableGuard = requestedDisable && env === 'development';

    try {
      const parsed = JSON.parse(process.env.DOMAIN_ROLE_MAP || '{}') as Record<
        string,
        string
      >;
      this.domainRoleMap = this.normalizeDomainRoleMap(parsed);
    } catch {
      this.domainRoleMap = {};
    }
  }

  private normalizeDomainRoleMap(
    source: Record<string, string>,
  ): Record<string, string> {
    const normalized: Record<string, string> = {};

    for (const [key, role] of Object.entries(source || {})) {
      const variants = this.getHostVariants(key);
      for (const variant of variants) {
        normalized[variant] = role;
      }
    }

    return normalized;
  }

  private getHostVariants(value: string): string[] {
    const raw = String(value || '')
      .trim()
      .toLowerCase()
      .replace(/\/+$/, '');
    if (!raw) return [];

    const variants = new Set<string>([raw]);
    try {
      const url =
        raw.startsWith('http://') || raw.startsWith('https://')
          ? new URL(raw)
          : new URL(`https://${raw}`);
      variants.add(url.origin.toLowerCase());
      variants.add(url.host.toLowerCase());
      variants.add(url.hostname.toLowerCase());
    } catch {
      // ignore invalid URL input and keep raw variant
    }

    return [...variants];
  }

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();
    const frontendHost = req.headers['x-frontend-host'] as string | undefined;
    const user = req.user as AuthenticatedRequest['user'];
    const hostHeader = String(req.headers.host || '').toLowerCase();
    const isLocalHostRequest =
      hostHeader.startsWith('localhost:') ||
      hostHeader.startsWith('127.0.0.1:');

    if ((this.disableGuard && isLocalHostRequest) || !frontendHost) {
      if (this.disableGuard && !isLocalHostRequest) {
        this.logger.warn(
          'DISABLE_DOMAIN_GUARD is ignored for non-localhost requests.',
        );
      } else if (this.disableGuard) {
        this.logger.warn('DomainRoleGuard is disabled in local development.');
      }
      return true;
    }

    const hostCandidates = this.getHostVariants(frontendHost);
    const expectedRole = hostCandidates
      .map((candidate) => this.domainRoleMap[candidate])
      .find(Boolean);

    if (!expectedRole) {
      this.logger.warn(
        `DomainRoleGuard: invalid site "${frontendHost}", candidates=${hostCandidates.join(', ')}`,
      );
      throw new BadRequestException(ErrorCode.AUTH_INVALID_SITE);
    }
    if (expectedRole && !user.roles.includes(expectedRole)) {
      throw new BadRequestException(ErrorCode.AUTH_INVALID_SITE);
    }

    return true;
  }
}
