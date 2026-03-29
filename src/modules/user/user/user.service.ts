import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from '@/database/entities';
import { Knex } from 'knex';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }

  async findByUsername(username: string) {
    return this.userRepository.findByUsername(username);
  }

  async findByPhone(phone: string) {
    return this.userRepository.findByPhone(phone);
  }

  async findById(id: string) {
    return this.userRepository.findById(id);
  }

  async createUser(userData: Partial<User>, trx?: Knex.Transaction) {
    return this.userRepository.createUser(userData, trx);
  }

  async updateUser(id: string, updates: Partial<User>) {
    return this.userRepository.updateUser(id, updates);
  }

  async findAdminUser(): Promise<User | null> {
    return this.userRepository.findAdminUser();
  }

  async hasAdminRole(userId: string): Promise<boolean> {
    return this.userRepository.hasAdminRole(userId);
  }

  async updateLastOnlineAt(userId: string): Promise<void> {
    return this.userRepository.updateLastOnlineAt(userId);
  }

  async getLastOnlineAt(userId: string): Promise<Date | null> {
    return this.userRepository.getLastOnlineAt(userId);
  }

  async setOnlineStatus(userId: string, isOnline: boolean): Promise<void> {
    return this.userRepository.setOnlineStatus(userId, isOnline);
  }

  async updateLastOnlineAtAndSetOnline(userId: string): Promise<void> {
    return this.userRepository.updateLastOnlineAtAndSetOnline(userId);
  }

  async updateUsersOfflineIfInactive(minutes: number): Promise<number> {
    return this.userRepository.updateUsersOfflineIfInactive(minutes);
  }
}
