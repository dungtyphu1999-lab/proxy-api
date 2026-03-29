import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@/database/repositories/base.repository';
import { UserProfile } from '@/database/entities/user-profile.entity';
import { User } from '@/database/entities/user.entity';
import { pickBy } from 'lodash';
import { Knex } from 'knex';

@Injectable()
export class UserProfileRepository extends BaseRepository<UserProfile> {
  constructor() {
    super('user_profiles');
  }

  async createProfile(
    userId: string,
    data: Partial<UserProfile>,
    trx?: Knex.Transaction,
  ) {
    const qb = trx ? trx<UserProfile>('user_profiles') : this.qb;
    const [userProfile] = await qb
      .insert({
        ...data,
        user_id: userId,
      })
      .returning('*');
    return userProfile;
  }

  async findProfile(userId: string): Promise<UserProfile | undefined> {
    return this.qb.where({ user_id: userId }).first();
  }

  async updateProfile(userId: string, data: Partial<UserProfile>) {
    const updateData: Partial<UserProfile> = pickBy(data, (value) => !!value);
    const [userProfile] = await this.qb
      .where({ user_id: userId })
      .update(updateData)
      .returning('*');
    return userProfile;
  }

  async updateProfile2(userId: string, data: Partial<UserProfile>) {
    const updateData: Partial<UserProfile> = pickBy(
      data,
      (value) => value !== undefined,
    );
    const profileUpdate: Partial<UserProfile> = pickBy(
      {
        full_name: updateData.full_name,
        avatar_url: updateData.avatar_url,
        is_profile_updated: true,
      },
      (value) => value !== undefined,
    );
    const [userProfile] = await this.qb
      .where({ user_id: userId })
      .update(profileUpdate)
      .returning('*');

    const dataUser = pickBy(
      {
        username: updateData.username,
        phone_number: updateData.phone_number,
      },
      (value) => value !== undefined,
    );
    if (Object.keys(dataUser).length > 0) {
      await this.qb
        .from('users')
        .where({ id: userId })
        .update(dataUser)
        .returning('*');
    }

    return userProfile;
  }

  async deleteProfile(userId: string): Promise<void> {
    await this.qb.where({ user_id: userId }).del();
  }

  async saveCode(userId: string, code: string, expiredAt: Date) {
    console.log('Saving verification code for user:', userId, code, expiredAt);
    const updated = await this.qb.from('users').where('id', userId).update({
      verification_code: code,
      verification_code_expired_at: expiredAt,
    });

    if (updated === 0) {
      throw new Error(`User not found: ${userId}`);
    }
  }

  async findUserId(userId: string): Promise<User | undefined> {
    return this.knexInstance<User>('users').where({ id: userId }).first();
  }

  async findByUsernameExit(
    username: string,
    userId: string,
  ): Promise<User | undefined> {
    return this.knexInstance<User>('users')
      .where({ username })
      .andWhereNot({ id: userId })
      .first();
  }
}
