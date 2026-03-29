import {
  Injectable,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { OAuth2Client } from 'google-auth-library';
import { DatabaseService } from '@/database/database.service';
import { UserService } from '../user/user.service';
import { UserProfileService } from '../user-profile/user-profile.service';
import { RolesService } from '../roles/roles.service';
import { WalletService } from '../wallet/wallet.service';
import { SocialUserInfo, SocialAuthResponse } from './dto/social-auth.dto';
import { UserProvider, User, UserRoleMap } from '@/database/entities';
import { v4 as uuidv4 } from 'uuid';
import { ErrorCode } from '@/shared/constants/error-codes.enum';
import { Knex } from 'knex';
import { AuthService } from './auth.service';

// Type definitions for social auth
interface UserProfileData {
  user_id: string;
  full_name?: string;
  avatar_url?: string;
  dob?: Date;
  created_at?: Date;
  updated_at?: Date;
}

@Injectable()
export class SocialAuthService {
  private readonly googleClient: OAuth2Client;

  constructor(
    private readonly databaseService: DatabaseService,
    private readonly userService: UserService,
    private readonly userProfileService: UserProfileService,
    private readonly rolesService: RolesService,
    private readonly walletService: WalletService,
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    const googleClientId = this.configService.get<string>(
      'oauth.google.clientId',
    );
    this.googleClient = new OAuth2Client(googleClientId);
  }

  /** Verify Google ID token and return basic profile */
  async verifyGoogleToken(idToken: string): Promise<SocialUserInfo> {
    try {
      const ticket = await this.googleClient.verifyIdToken({
        idToken,
        audience: this.configService.get<string>('oauth.google.clientId'),
      });

      const payload = ticket.getPayload();
      if (!payload) {
        throw new BadRequestException(
          ErrorCode.AUTH_SOCIAL_INVALID_GOOGLE_TOKEN,
        );
      }

      const { sub: id, email, name, picture } = payload;

      if (!email) {
        throw new BadRequestException(ErrorCode.AUTH_SOCIAL_EMAIL_REQUIRED);
      }

      return {
        provider_id: id,
        email,
        name,
        avatar_url: picture,
        provider: 'google',
      };
    } catch {
      throw new BadRequestException(ErrorCode.AUTH_SOCIAL_INVALID_GOOGLE_TOKEN);
    }
  }

  /** Verify Facebook access token and return basic profile */
  async verifyFacebookToken(accessToken: string): Promise<SocialUserInfo> {
    try {
      const response = await axios.get(
        `https://graph.facebook.com/me?fields=id,email,name,picture&access_token=${accessToken}`,
      );

      const { id, email, name, picture } = response.data as {
        id: string;
        email?: string;
        name?: string;
        picture?: {
          data: {
            url: string;
          };
        };
      };

      const finalEmail = email ?? `${id}@facebook.com`;

      return {
        provider_id: id,
        email: finalEmail,
        name,
        avatar_url: picture?.data?.url || '',
        provider: 'facebook',
      };
    } catch {
      throw new BadRequestException(
        ErrorCode.AUTH_SOCIAL_INVALID_FACEBOOK_TOKEN,
      );
    }
  }

  /** Orchestrate social login flow and return auth tokens */
  async handleSocialLogin(
    userInfo: SocialUserInfo,
  ): Promise<SocialAuthResponse> {
    const user = await this.databaseService.transaction(async (knex) => {
      const existingProvider = (await knex('user_providers')
        .where('provider', userInfo.provider)
        .where('provider_id', userInfo.provider_id)
        .first()) as UserProvider | undefined;

      let user: User | null;

      if (existingProvider) {
        user = await this.userService.findById(existingProvider.user_id);
        if (!user) {
          throw new BadRequestException(ErrorCode.AUTH_USER_NOT_FOUND);
        }
      } else {
        const existingUser = await this.userService.findByEmail(userInfo.email);

        if (existingUser) {
          throw new ConflictException(
            ErrorCode.AUTH_SOCIAL_EMAIL_ALREADY_EXISTS,
          );
        }

        user = await this.createUserWithSocialProvider(userInfo, knex);
      }

      if (!user) {
        throw new BadRequestException(ErrorCode.AUTH_USER_NOT_FOUND);
      }

      if (user.is_locked) {
        throw new BadRequestException(ErrorCode.AUTH_USER_LOCKED);
      }

      return user;
    });

    // Get user profile after transaction is committed
    let userProfile: UserProfileData | null = null;
    try {
      userProfile = await this.userProfileService.getProfile(user.id);
    } catch {
      userProfile = null;
    }

    const isProfileCompleted = !!(
      userProfile?.full_name &&
      user?.username
    );

    const response = await this.authService.generateAuthResponse(user);

    return {
      access_token: response.access_token,
      refresh_token: response.refresh_token,
      user: {
        ...response.user,
        is_profile_completed: isProfileCompleted,
        full_name: userProfile?.full_name,
      },
      roles: response.roles,
      shop: response.shop,
    };
  }

  /**
   * Create new user and link social provider
   */
  private async createUserWithSocialProvider(
    userInfo: SocialUserInfo,
    knex?: Knex.Transaction,
  ) {
    const executeInTransaction = async (trx: Knex.Transaction) => {
      const userId = uuidv4();

      const baseUsername = userInfo.email.split('@')[0];
      const username = await this.generateUniqueUsername(baseUsername, trx);

      const newUser = {
        id: userId,
        email: userInfo.email,
        username,
        password_hash: '',
        is_verified: true,
        is_locked: false,
        is_online: false,
        has_received_welcome_message: false,
        created_at: new Date(),
        updated_at: new Date(),
      };

      await trx('users').insert(newUser);

      const userProfile = {
        user_id: userId,
        full_name: userInfo.name || '',
        avatar_url: userInfo.avatar_url || '',
      };

      await this.userProfileService.createProfile(userId, userProfile, trx);

      const userProvider: UserProvider = {
        user_id: userId,
        provider: userInfo.provider,
        provider_id: userInfo.provider_id,
        created_at: new Date(),
        updated_at: new Date(),
      };

      await trx('user_providers').insert(userProvider);

      const userRole = await this.rolesService.findByName('user', trx);
      if (!userRole) {
        throw new BadRequestException(ErrorCode.AUTH_CANNOT_CREATE_USER);
      }

      await trx<UserRoleMap>('user_role_map').insert({
        user_id: userId,
        role_id: userRole.id,
        assigned_at: new Date(),
      });

      await this.walletService.getOrCreateWallet(userId, trx);

      return newUser;
    };

    if (knex) {
      return executeInTransaction(knex);
    } else {
      return this.databaseService.transaction(executeInTransaction);
    }
  }

  /**
   * Generate a unique username from base value
   */
  private async generateUniqueUsername(
    baseUsername: string,
    trx: Knex.Transaction,
  ): Promise<string> {
    let username = baseUsername;
    let counter = 1;

    while (true) {
      const existingUser = (await trx('users')
        .where('username', username)
        .first()) as User | undefined;
      if (!existingUser) {
        return username;
      }
      username = `${baseUsername}${counter}`;
      counter++;
    }
  }
}
