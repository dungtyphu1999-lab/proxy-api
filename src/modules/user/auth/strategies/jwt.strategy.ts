import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AppConfigService } from '@/config/app-config.service';
import { JwtAuthenticatedRequest } from '@/shared/dto/jwt-authenticated-request.dto';
import { ErrorCode } from '@/shared/constants/error-codes.enum';
import { UserService } from '@/modules/user/user/user.service';
import { omit } from 'lodash';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private appConfigService: AppConfigService,
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: appConfigService.jwt.secret,
    });
  }

  async validate(payload: JwtAuthenticatedRequest['user']) {
    if (!payload) {
      throw new UnauthorizedException('Invalid token');
    }

    // Query database for current user status
    const currentUser = await this.userService.findById(payload.user.id);
    if (!currentUser) {
      throw new UnauthorizedException('User not found');
    }

    if (!currentUser.is_verified) {
      throw new ForbiddenException(ErrorCode.AUTH_USER_NOT_VERIFIED);
    }
    if (currentUser.is_locked) {
      throw new ForbiddenException(ErrorCode.AUTH_USER_LOCKED);
    }

    return {
      sub: payload.sub,
      email: payload.email,
      user: omit(currentUser, ['password_hash']),
      roles: payload.roles,
      shop: payload.shop,
    };
  }
}
