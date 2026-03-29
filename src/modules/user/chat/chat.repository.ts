import { Injectable, Logger } from '@nestjs/common';
import { BaseRepository } from '@/database/repositories/base.repository';
import { DatabaseService } from '@/database/database.service';
import { ChatConversation } from '@/database/entities/chat-conversation.entity';
import {
  GetConversationsInputDto,
  ConversationDto,
  ConversationParticipantDto,
  ConversationType,
  ConversationStatus,
} from './dto/get-conversations.dto';
import { CreateConversationOutputDto } from './dto/create-conversation.dto';
import {
  GetMessagesInputDto,
  MessageDto,
  MessageSenderDto,
} from './dto/get-messages.dto';
import {
  CreateMessageInputDto,
  CreateMessageOutputDto,
  MessageType,
} from './dto/create-message.dto';
import {
  SearchConversationResultDto,
  SearchMessageResultDto,
} from './dto/search-chat.dto';
import { CHAT_CONSTANTS } from './chat.constants';
import {
  ConversationQueryResult,
  ChatMessageQueryResult,
  ConversationBasicResult,
  ConversationAccessResult,
  ConversationWithLastSenderResult,
  SearchConversationQueryResult,
  SearchMessageQueryResult,
  SearchContactQueryResult,
  ChatMessageInsertResult,
} from './chat.types';
import { SearchContactResultDto } from './dto/search-chat.dto';

@Injectable()
export class ChatRepository extends BaseRepository<ChatConversation> {
  private readonly logger = new Logger(ChatRepository.name);

  constructor(private readonly databaseService: DatabaseService) {
    super('chat_conversations');
  }

  async findConversationsByUserId(
    userId: string,
    params: GetConversationsInputDto,
  ): Promise<{ items: ConversationDto[]; total: number }> {
    const {
      page = 1,
      take: pageSize = 10,
      type,
      status,
      is_pinned,
      search,
      exclude_conversation_id,
    } = params;
    const offset = (page - 1) * pageSize;

    let query = this.qb
      .select([
        'cc.id',
        'cc.title',
        'cc.last_message',
        'cc.last_message_at',
        'cc.last_sender_id',
        'cc.type',
        'cc.status',
        'cc.is_pinned',
        'cc.is_muted',
        'cc.muted_until',
        'cc.notifications_enabled',
        'cc.unread_count',
        'cc.created_at',
        'cc.updated_at',
        'cc.initiator_id',
        'cc.participant_id',
        'initiator.username as initiator_name',
        'initiator_avatar.avatar_url as initiator_avatar_url',
        'initiator.is_online as initiator_is_online',
        'initiator.last_online_at as initiator_last_online_at',
        this.knexInstance.raw(
          `CASE WHEN cc.type = 'user_to_shop' THEN cc.title ELSE participant.username END as participant_name`,
        ),
        'participant_avatar.avatar_url as participant_avatar_url',
        'participant.is_online as participant_is_online',
        'participant.last_online_at as participant_last_online_at',
        this.qb
          .select('cm.message_type')
          .from('chat_messages as cm')
          .whereRaw('cm.conversation_id = cc.id')
          .where('cm.is_deleted', false)
          .orderBy('cm.created_at', 'desc')
          .limit(1)
          .as('last_message_type'),
      ])
      .from('chat_conversations as cc')
      .leftJoin('users as initiator', 'cc.initiator_id', 'initiator.id')
      .leftJoin(
        'user_profiles as initiator_avatar',
        'cc.initiator_id',
        'initiator_avatar.user_id',
      )
      .leftJoin('users as participant', 'cc.participant_id', 'participant.id')
      .leftJoin(
        'user_profiles as participant_avatar',
        'cc.participant_id',
        'participant_avatar.user_id',
      )
      .where(function () {
        this.where('cc.initiator_id', userId).orWhere(
          'cc.participant_id',
          userId,
        );
      })
      .where(function () {
        this.whereExists(function () {
          this.select('*')
            .from('chat_messages as cm')
            .whereRaw('cm.conversation_id = cc.id')
            .where('cm.is_deleted', false);
        })
          .orWhere('cc.type', 'user_to_admin')
          .orWhere(function () {
            if (exclude_conversation_id) {
              this.where('cc.id', exclude_conversation_id);
            }
          });
      });

    // Apply filters
    if (type) {
      query = query.where('cc.type', type);
    }

    if (status) {
      query = query.where('cc.status', status);
    }

    if (is_pinned !== undefined) {
      query = query.where('cc.is_pinned', is_pinned);
    }

    if (search) {
      query = query.where(function () {
        this.where('cc.last_message', 'ilike', `%${search}%`)
          .orWhere(function () {
            // If current user is initiator and type is user_to_shop, search in title (shop name)
            this.where('cc.initiator_id', userId)
              .andWhere('cc.type', 'user_to_shop')
              .andWhere('cc.title', 'ilike', `%${search}%`);
          })
          .orWhere(function () {
            // If current user is initiator and type is NOT user_to_shop, search in participant username
            this.where('cc.initiator_id', userId)
              .andWhere('cc.type', '!=', 'user_to_shop')
              .andWhere('participant.username', 'ilike', `%${search}%`);
          })
          .orWhere(function () {
            // If current user is participant, search in initiator username
            this.where('cc.participant_id', userId).andWhere(
              'initiator.username',
              'ilike',
              `%${search}%`,
            );
          });
      });
    }

    // Get total count safely
    const countQuery = this.qb
      .from('chat_conversations as cc')
      .leftJoin('users as initiator', 'cc.initiator_id', 'initiator.id')
      .leftJoin('users as participant', 'cc.participant_id', 'participant.id')
      .where(function () {
        this.where('cc.initiator_id', userId).orWhere(
          'cc.participant_id',
          userId,
        );
      })
      .where(function () {
        this.whereExists(function () {
          this.select('*')
            .from('chat_messages as cm')
            .whereRaw('cm.conversation_id = cc.id')
            .where('cm.is_deleted', false);
        })
          .orWhere('cc.type', 'user_to_admin')
          .orWhere(function () {
            if (exclude_conversation_id) {
              this.where('cc.id', exclude_conversation_id);
            }
          });
      });

    if (type) {
      countQuery.where('cc.type', type);
    }
    if (status) {
      countQuery.where('cc.status', status);
    }
    if (is_pinned !== undefined) {
      countQuery.where('cc.is_pinned', is_pinned);
    }
    if (search) {
      countQuery.where(function () {
        this.where('cc.last_message', 'ilike', `%${search}%`)
          .orWhere(function () {
            // If current user is initiator and type is user_to_shop, search in title (shop name)
            this.where('cc.initiator_id', userId)
              .andWhere('cc.type', 'user_to_shop')
              .andWhere('cc.title', 'ilike', `%${search}%`);
          })
          .orWhere(function () {
            // If current user is initiator and type is NOT user_to_shop, search in participant username
            this.where('cc.initiator_id', userId)
              .andWhere('cc.type', '!=', 'user_to_shop')
              .andWhere('participant.username', 'ilike', `%${search}%`);
          })
          .orWhere(function () {
            // If current user is participant, search in initiator username
            this.where('cc.participant_id', userId).andWhere(
              'initiator.username',
              'ilike',
              `%${search}%`,
            );
          });
      });
    }

    const totalResult =
      await countQuery.countDistinct<{ total: string }[]>('cc.id as total');
    const total = parseInt(totalResult[0]?.total ?? '0', 10);

    // Get paginated results
    const results = (await query
      .groupBy([
        'cc.id',
        'cc.title',
        'cc.last_message',
        'cc.last_message_at',
        'cc.last_sender_id',
        'cc.type',
        'cc.status',
        'cc.is_pinned',
        'cc.is_muted',
        'cc.muted_until',
        'cc.notifications_enabled',
        'cc.unread_count',
        'cc.created_at',
        'cc.updated_at',
        'cc.initiator_id',
        'cc.participant_id',
        'initiator.username',
        'initiator_avatar.avatar_url',
        'initiator.is_online',
        'initiator.last_online_at',
        'participant.username',
        'participant_avatar.avatar_url',
        'participant.is_online',
        'participant.last_online_at',
      ])
      // Add special ordering for exclude_conversation_id to appear first
      .modify(function (queryBuilder) {
        if (exclude_conversation_id) {
          queryBuilder.orderByRaw(`CASE WHEN cc.id = ? THEN 0 ELSE 1 END`, [
            exclude_conversation_id,
          ]);
        }
      })
      .orderBy('cc.is_pinned', 'desc')
      .orderBy('cc.last_message_at', 'desc')
      .orderBy('cc.created_at', 'desc')
      .limit(pageSize)
      .offset(offset)) as ConversationQueryResult[];

    const items = results.map((result: ConversationQueryResult) =>
      this.mapToDto(result, userId),
    );

    return { items, total };
  }

  async findConversationById(
    conversationId: string,
  ): Promise<ConversationAccessResult | undefined> {
    const result = (await this.qb
      .select(['id', 'initiator_id', 'participant_id', 'unread_count'])
      .from('chat_conversations')
      .where('id', conversationId)
      .first()) as ConversationAccessResult | undefined;

    return result;
  }

  async findConversationWithLastSender(
    conversationId: string,
  ): Promise<ConversationWithLastSenderResult | undefined> {
    const result = (await this.qb
      .select([
        'id',
        'initiator_id',
        'participant_id',
        'unread_count',
        'last_sender_id',
      ])
      .from('chat_conversations')
      .where('id', conversationId)
      .first()) as ConversationWithLastSenderResult | undefined;

    return result;
  }

  async findConversationByParticipants(
    initiatorId: string,
    participantId: string,
    type: string,
    shopId?: string,
  ): Promise<ConversationBasicResult | undefined> {
    const result = (await this.qb
      .select(['id', 'participant_id', 'type', 'title', 'shop_id'])
      .from('chat_conversations')
      .where(function () {
        this.where(function () {
          this.where('initiator_id', initiatorId).andWhere(
            'participant_id',
            participantId,
          );
        }).orWhere(function () {
          this.where('initiator_id', participantId).andWhere(
            'participant_id',
            initiatorId,
          );
        });
      })
      .where('type', type)
      .where(function () {
        if (type === 'user_to_shop' && shopId) {
          this.where('shop_id', shopId);
        }
      })
      .first()) as ConversationBasicResult | undefined;

    return result;
  }

  async findOrCreateConversation(
    initiatorId: string,
    participantId: string,
    type: ConversationType,
    title?: string,
    shopId?: string,
  ): Promise<{ conversation: CreateConversationOutputDto; is_new: boolean }> {
    // First, try to find existing conversation in both directions
    const existingConversation = (await this.qb
      .select([
        'id',
        'initiator_id',
        'participant_id',
        'type',
        'title',
        'shop_id',
      ])
      .from('chat_conversations')
      .where(function () {
        this.where(function () {
          this.where('initiator_id', initiatorId).andWhere(
            'participant_id',
            participantId,
          );
        }).orWhere(function () {
          this.where('initiator_id', participantId).andWhere(
            'participant_id',
            initiatorId,
          );
        });
      })
      .where('type', type)
      .where(function () {
        if (type === ConversationType.USER_TO_SHOP && shopId) {
          this.where('shop_id', shopId);
        }
      })
      .first()) as
      | (ConversationBasicResult & { initiator_id: string })
      | undefined;

    if (existingConversation) {
      return {
        conversation: {
          id: existingConversation.id,
          participant_id: existingConversation.participant_id,
          type: existingConversation.type as ConversationType,
          title: existingConversation.title,
          is_new: false,
        },
        is_new: false,
      };
    }

    // Create new conversation if not exists
    const [newConversation] = (await this.qb
      .insert({
        initiator_id: initiatorId,
        participant_id: participantId,
        shop_id:
          type === ConversationType.USER_TO_SHOP ? (shopId ?? null) : null,
        type,
        title,
        status: CHAT_CONSTANTS.DEFAULT_CONVERSATION_STATUS,
        is_pinned: CHAT_CONSTANTS.DEFAULT_IS_PINNED,
        is_muted: CHAT_CONSTANTS.DEFAULT_IS_MUTED,
        notifications_enabled: CHAT_CONSTANTS.DEFAULT_NOTIFICATIONS_ENABLED,
        unread_count: CHAT_CONSTANTS.DEFAULT_UNREAD_COUNT,
        created_at: new Date(),
        updated_at: new Date(),
      })
      .into('chat_conversations')
      .returning([
        'id',
        'participant_id',
        'type',
        'title',
      ])) as ConversationBasicResult[];

    return {
      conversation: {
        id: newConversation.id,
        participant_id: newConversation.participant_id,
        type: newConversation.type as ConversationType,
        title: newConversation.title,
        is_new: true,
      },
      is_new: true,
    };
  }

  private mapToDto(
    result: ConversationQueryResult,
    userId: string,
  ): ConversationDto {
    const initiator: ConversationParticipantDto = {
      id: result.initiator_id,
      name: result.initiator_name || CHAT_CONSTANTS.UNKNOWN_USER_NAME,
      avatar_url: result.initiator_avatar_url,
      is_online: result.initiator_is_online,
      last_online_at: result.initiator_last_online_at,
    };

    const participant: ConversationParticipantDto = {
      id: result.participant_id,
      name: result.participant_name || CHAT_CONSTANTS.UNKNOWN_USER_NAME,
      avatar_url: result.participant_avatar_url,
      is_online: result.participant_is_online,
      last_online_at: result.participant_last_online_at,
    };

    // Determine title based on current user
    let title = result.title;
    if (userId === result.initiator_id) {
      // Current user is initiator, show participant name
      title = result.participant_name || CHAT_CONSTANTS.UNKNOWN_USER_NAME;
    } else if (userId === result.participant_id) {
      // Current user is participant, show initiator name
      title = result.initiator_name || CHAT_CONSTANTS.UNKNOWN_USER_NAME;
    }

    return {
      id: result.id,
      title,
      last_message: result.last_message,
      last_message_at: result.last_message_at,
      last_message_type: result.last_message_type as
        | 'text'
        | 'image'
        | 'file'
        | 'system'
        | undefined,
      last_sender_id: result.last_sender_id,
      type: result.type as ConversationType,
      status: result.status as ConversationStatus,
      is_pinned: result.is_pinned,
      is_muted: result.is_muted,
      muted_until: result.muted_until,
      notifications_enabled: result.notifications_enabled,
      unread_count: result.unread_count,
      created_at: result.created_at,
      updated_at: result.updated_at,
      initiator,
      participant,
    };
  }

  async findMessagesByConversationId(
    conversationId: string,
    params: GetMessagesInputDto,
  ): Promise<{ items: MessageDto[]; total: number }> {
    const { take: pageSize = 20 } = params;
    const offset = params.skip;

    const query = this.qb
      .select([
        'cm.id',
        'cm.content',
        'cm.message_type',
        'cm.file_url',
        'cm.file_name',
        'cm.file_size',
        'cm.file_type',
        'cm.is_read',
        'cm.read_at',
        'cm.is_deleted',
        'cm.deleted_at',
        'cm.sender_id',
        'u.username as sender_name',
        'up.avatar_url as sender_avatar_url',
        'cm.created_at',
        'cm.updated_at',
      ])
      .from('chat_messages as cm')
      .leftJoin('users as u', 'cm.sender_id', 'u.id')
      .leftJoin('user_profiles as up', 'cm.sender_id', 'up.user_id')
      .where('cm.conversation_id', conversationId)
      .where('cm.is_deleted', false)
      .groupBy([
        'cm.id',
        'cm.content',
        'cm.message_type',
        'cm.file_url',
        'cm.file_name',
        'cm.file_size',
        'cm.file_type',
        'cm.is_read',
        'cm.read_at',
        'cm.is_deleted',
        'cm.deleted_at',
        'cm.sender_id',
        'u.username',
        'up.avatar_url',
        'cm.created_at',
        'cm.updated_at',
      ]);

    // Get total count
    const totalResult = await this.qb
      .from('chat_messages as cm')
      .where('cm.conversation_id', conversationId)
      .where('cm.is_deleted', false)
      .countDistinct<{ total: string }[]>('cm.id as total');

    const total = parseInt(totalResult[0]?.total ?? '0', 10);

    // Get paginated results
    const results = await query
      .orderBy('cm.created_at', 'desc')
      .limit(pageSize)
      .offset(offset);

    const items = results.map((result: ChatMessageQueryResult) =>
      this.mapMessageToDto(result),
    );

    return { items, total };
  }

  private mapMessageToDto(result: ChatMessageQueryResult): MessageDto {
    const sender: MessageSenderDto = {
      id: result.sender_id,
      name: result.sender_name || CHAT_CONSTANTS.UNKNOWN_USER_NAME,
      avatar_url: result.sender_avatar_url,
    };

    return {
      id: result.id,
      content: result.content,
      message_type: result.message_type as MessageType,
      file_url: result.file_url,
      file_name: result.file_name,
      file_size: result.file_size,
      file_type: result.file_type,
      is_read: result.is_read,
      read_at: result.read_at,
      is_deleted: result.is_deleted,
      deleted_at: result.deleted_at,
      sender,
      created_at: result.created_at,
      updated_at: result.updated_at,
    };
  }

  async createMessage(
    senderId: string,
    createDto: CreateMessageInputDto,
  ): Promise<CreateMessageOutputDto> {
    return this.databaseService.transaction(async (trx) => {
      const results = (await trx
        .insert({
          conversation_id: createDto.conversation_id,
          sender_id: senderId,
          content: createDto.content,
          message_type: createDto.message_type || MessageType.TEXT,
          file_url: createDto.file_url,
          file_name: createDto.file_name,
          file_size: createDto.file_size,
          file_type: createDto.file_type,
          is_read: CHAT_CONSTANTS.DEFAULT_IS_READ,
          is_deleted: CHAT_CONSTANTS.DEFAULT_IS_DELETED,
          created_at: new Date(),
          updated_at: new Date(),
        })
        .into('chat_messages')
        .returning([
          'id',
          'conversation_id',
          'sender_id',
          'content',
          'message_type',
          'file_url',
          'file_name',
          'file_size',
          'file_type',
          'is_read',
          'is_deleted',
          'created_at',
          'updated_at',
        ])) as ChatMessageInsertResult[];

      const newMessage = results[0];

      return {
        ...newMessage,
        message_type: newMessage.message_type as MessageType,
      } as CreateMessageOutputDto;
    });
  }

  async updateConversationLastMessage(
    conversationId: string,
    lastMessage: string,
    lastSenderId: string,
  ): Promise<void> {
    // First get current unread count and last sender
    const currentConversation = (await this.qb
      .select(['unread_count', 'last_sender_id'])
      .from('chat_conversations')
      .where('id', conversationId)
      .first()) as
      | { unread_count: number; last_sender_id: string | null }
      | undefined;

    // If sender is different from last sender, reset to 1. If same sender, increment by 1
    const isDifferentSender =
      currentConversation?.last_sender_id !== lastSenderId;
    const newUnreadCount = isDifferentSender
      ? 1
      : (currentConversation?.unread_count || 0) + 1;

    await this.qb
      .update({
        last_message: lastMessage,
        last_message_at: new Date(),
        last_sender_id: lastSenderId,
        unread_count: newUnreadCount,
        updated_at: new Date(),
      })
      .from('chat_conversations')
      .where('id', conversationId);
  }

  async markConversationAsRead(
    conversationId: string,
    userId: string,
  ): Promise<void> {
    try {
      // Check if user is part of the conversation
      const conversation =
        await this.findConversationWithLastSender(conversationId);
      if (!conversation) {
        throw new Error('Conversation not found');
      }

      if (
        conversation.initiator_id !== userId &&
        conversation.participant_id !== userId
      ) {
        throw new Error('Access denied to this conversation');
      }

      // Check if the user reading is the sender of the last message
      const isLastMessageSender = conversation.last_sender_id === userId;

      // Mark all unread messages in conversation as read and reset unread count
      await this.databaseService.transaction(async (trx) => {
        // Mark all unread messages from other users as read
        await trx
          .update({
            is_read: true,
            read_at: new Date(),
            updated_at: new Date(),
          })
          .from('chat_messages')
          .where('conversation_id', conversationId)
          .where('sender_id', '!=', userId)
          .where('is_read', false);

        // Only reset unread count if the user reading is NOT the sender of the last message
        if (!isLastMessageSender) {
          await trx
            .update({
              unread_count: 0,
              updated_at: new Date(),
            })
            .from('chat_conversations')
            .where('id', conversationId);
        }
      });

      this.logger.log(
        `Conversation ${conversationId} marked as read by user ${userId} (isLastMessageSender: ${isLastMessageSender})`,
      );
    } catch (error) {
      this.logger.error(
        `Failed to mark conversation as read: ${(error as Error).message}`,
      );
      throw error;
    }
  }

  async searchConversations(
    userId: string,
    query: string,
    limit: number = 50,
  ): Promise<SearchConversationResultDto[]> {
    const results = (await this.databaseService.transaction(async (trx) => {
      return trx
        .select([
          'cc.id',
          'cc.title',
          'cc.last_message',
          'cc.type',
          'cc.last_message_at',
          'cc.participant_id',
          'u.username as participant_name',
          'up.avatar_url as participant_avatar_url',
          trx.raw(
            'GREATEST(similarity(cc.last_message, ?), similarity(u.username, ?)) as relevance_score',
            [query, query],
          ),
        ])
        .from('chat_conversations as cc')
        .leftJoin('users as u', 'cc.participant_id', 'u.id')
        .leftJoin('user_profiles as up', 'cc.participant_id', 'up.user_id')
        .where(function () {
          this.where('cc.initiator_id', userId).orWhere(
            'cc.participant_id',
            userId,
          );
        })
        .where(function () {
          this.where('cc.last_message', 'ilike', `%${query}%`)
            .orWhereRaw('cc.last_message % ?', [query])
            .orWhere(function () {
              // If current user is initiator, search in participant username
              this.where('cc.initiator_id', userId).andWhere(
                'u.username',
                'ilike',
                `%${query}%`,
              );
            })
            .orWhere(function () {
              // If current user is participant, search in initiator username
              this.where('cc.participant_id', userId).andWhere(
                'u.username',
                'ilike',
                `%${query}%`,
              );
            })
            .orWhere(function () {
              // If current user is initiator, search in participant username with similarity
              this.where('cc.initiator_id', userId).andWhereRaw(
                'u.username % ?',
                [query],
              );
            })
            .orWhere(function () {
              // If current user is participant, search in initiator username with similarity
              this.where('cc.participant_id', userId).andWhereRaw(
                'u.username % ?',
                [query],
              );
            });
        })
        .orderBy('relevance_score', 'desc')
        .orderBy('cc.last_message_at', 'desc')
        .limit(limit);
    })) as SearchConversationQueryResult[];

    return results.map((result) => ({
      id: result.id,
      title: result.title,
      last_message: result.last_message,
      type: result.type,
      participant: {
        id: result.participant_id,
        name: result.participant_name || CHAT_CONSTANTS.UNKNOWN_USER_NAME,
        avatar_url: result.participant_avatar_url,
      },
      relevance_score: parseFloat(result.relevance_score || '0'),
      last_message_at: result.last_message_at,
    }));
  }

  async searchMessages(
    userId: string,
    query: string,
    conversationId?: string,
    limit: number = 50,
  ): Promise<SearchMessageResultDto[]> {
    const results = (await this.databaseService.transaction(async (trx) => {
      let queryBuilder = trx
        .select([
          'cm.id',
          'cm.content',
          'cm.message_type',
          'cm.conversation_id',
          'cm.sender_id',
          'cm.created_at',
          'cc.title as conversation_title',
          'u.username as sender_name',
          'up.avatar_url as sender_avatar_url',
          trx.raw('similarity(cm.content, ?) as relevance_score', [query]),
        ])
        .from('chat_messages as cm')
        .leftJoin('chat_conversations as cc', 'cm.conversation_id', 'cc.id')
        .leftJoin('users as u', 'cm.sender_id', 'u.id')
        .leftJoin('user_profiles as up', 'cm.sender_id', 'up.user_id')
        .where('cm.is_deleted', false)
        .where(function () {
          this.where('cc.initiator_id', userId).orWhere(
            'cc.participant_id',
            userId,
          );
        })
        .where(function () {
          this.where('cm.content', 'ilike', `%${query}%`).orWhereRaw(
            'cm.content % ?',
            [query],
          );
        });

      if (conversationId) {
        queryBuilder = queryBuilder.where('cm.conversation_id', conversationId);
      }

      return queryBuilder
        .groupBy(
          'cm.id',
          'cm.content',
          'cm.message_type',
          'cm.conversation_id',
          'cm.sender_id',
          'cm.created_at',
          'cc.title',
          'u.username',
          'up.avatar_url',
          'relevance_score',
        )
        .orderBy('relevance_score', 'desc')
        .orderBy('cm.created_at', 'desc')
        .limit(limit);
    })) as SearchMessageQueryResult[];

    return results.map((result) => ({
      id: result.id,
      content: result.content,
      message_type: result.message_type,
      conversation_id: result.conversation_id,
      conversation_title: result.conversation_title,
      sender: {
        id: result.sender_id,
        name: result.sender_name || CHAT_CONSTANTS.UNKNOWN_USER_NAME,
        avatar_url: result.sender_avatar_url,
      },
      relevance_score: parseFloat(result.relevance_score || '0'),
      created_at: result.created_at,
    }));
  }

  async searchContacts(
    userId: string,
    query: string,
    limit: number = 50,
  ): Promise<SearchContactResultDto[]> {
    const results = await this.databaseService.transaction(async (trx) => {
      const sql = `
        SELECT 
          u.id,
          u.username as name,
          up.avatar_url,
          u.phone_number,
          cc.id as conversation_id,
          cc.title as conversation_title,
          cc.last_message,
          cc.last_message_at,
          similarity(u.username, ?) as relevance_score
        FROM chat_conversations cc
        LEFT JOIN users u ON (
          (cc.initiator_id = ? AND u.id = cc.participant_id) OR 
          (cc.participant_id = ? AND u.id = cc.initiator_id)
        )
        LEFT JOIN user_profiles up ON u.id = up.user_id
        LEFT JOIN user_role_map urm ON u.id = urm.user_id
        LEFT JOIN roles r ON urm.role_id = r.id
        WHERE u.id != ? 
          AND u.username ILIKE ? 
          AND (r.name != 'admin' OR r.name IS NULL)
          AND (
            EXISTS (
              SELECT 1 FROM chat_messages cm 
              WHERE cm.conversation_id = cc.id 
              AND cm.is_deleted = false
            )
          )
        GROUP BY u.id, u.username, up.avatar_url, u.phone_number, cc.id, cc.title, cc.last_message, cc.last_message_at, relevance_score
        ORDER BY relevance_score DESC, cc.last_message_at DESC
        LIMIT ?
      `;

      return trx.raw<{ rows: SearchContactQueryResult[] }>(sql, [
        query,
        userId,
        userId,
        userId,
        `%${query}%`,
        limit,
      ]);
    });

    const rows: SearchContactQueryResult[] = results.rows;

    return rows.map((result) => ({
      id: result.id,
      name: result.name || CHAT_CONSTANTS.UNKNOWN_USER_NAME,
      avatar_url: result.avatar_url,
      phone_number: result.phone_number,
      conversation_id: result.conversation_id,
      conversation_title: result.conversation_title,
      last_message: result.last_message,
      last_message_at: result.last_message_at,
      relevance_score: parseFloat(result.relevance_score || '0'),
    }));
  }

  async getTotalUnreadCount(userId: string): Promise<number> {
    const result = (await this.qb
      .sum('unread_count as total_unread_count')
      .from('chat_conversations')
      .where(function () {
        this.where('initiator_id', userId).orWhere('participant_id', userId);
      })
      .whereRaw('last_sender_id != ? OR last_sender_id IS NULL', [userId])
      .first()) as { total_unread_count: string | null } | undefined;

    return parseInt(result?.total_unread_count || '0') || 0;
  }

  async findConversationDetailsById(
    conversationId: string,
    userId: string,
  ): Promise<ConversationDto | undefined> {
    const result = (await this.qb
      .select([
        'cc.id',
        'cc.title',
        'cc.last_message',
        'cc.last_message_at',
        'cc.last_sender_id',
        'cc.type',
        'cc.status',
        'cc.is_pinned',
        'cc.is_muted',
        'cc.muted_until',
        'cc.notifications_enabled',
        'cc.unread_count',
        'cc.created_at',
        'cc.updated_at',
        'cc.initiator_id',
        'cc.participant_id',
        'initiator.username as initiator_name',
        'initiator_avatar.avatar_url as initiator_avatar_url',
        'initiator.is_online as initiator_is_online',
        'initiator.last_online_at as initiator_last_online_at',
        this.knexInstance.raw(
          `CASE WHEN cc.type = 'user_to_shop' THEN cc.title ELSE participant.username END as participant_name`,
        ),
        'participant_avatar.avatar_url as participant_avatar_url',
        'participant.is_online as participant_is_online',
        'participant.last_online_at as participant_last_online_at',
      ])
      .from('chat_conversations as cc')
      .leftJoin('users as initiator', 'cc.initiator_id', 'initiator.id')
      .leftJoin(
        'user_profiles as initiator_avatar',
        'cc.initiator_id',
        'initiator_avatar.user_id',
      )
      .leftJoin('users as participant', 'cc.participant_id', 'participant.id')
      .leftJoin(
        'user_profiles as participant_avatar',
        'cc.participant_id',
        'participant_avatar.user_id',
      )
      .where('cc.id', conversationId)
      .where(function () {
        this.where('cc.initiator_id', userId).orWhere(
          'cc.participant_id',
          userId,
        );
      })
      .first()) as ConversationQueryResult | undefined;

    if (!result) {
      return undefined;
    }

    return this.mapToDto(result, userId);
  }

  /**
   * Get message count for a conversation
   */
  async getConversationMessageCount(conversationId: string): Promise<number> {
    const result = (await this.qb
      .count('id as message_count')
      .from('chat_messages')
      .where('conversation_id', conversationId)
      .where('is_deleted', false)
      .first()) as { message_count: string } | undefined;

    return parseInt(result?.message_count || '0', 10);
  }

  /**
   * Delete conversation and all its messages
   */
  async deleteConversation(conversationId: string): Promise<void> {
    await this.databaseService.transaction(async (trx) => {
      // Delete all messages in the conversation
      await trx
        .from('chat_messages')
        .where('conversation_id', conversationId)
        .del();

      // Delete the conversation
      await trx.from('chat_conversations').where('id', conversationId).del();
    });

    this.logger.log(`Conversation ${conversationId} deleted successfully`);
  }

  /**
   * Get unread messages for user when connecting
   */
  async getUnreadMessagesForUser(userId: string): Promise<
    Array<{
      conversation_id: string;
      unread_count: number;
      message_preview: string;
      sender_id: string;
    }>
  > {
    const unreadConversations = (await this.qb
      .select([
        'id as conversation_id',
        'unread_count',
        'last_message as message_preview',
        'last_sender_id as sender_id',
      ])
      .from('chat_conversations')
      .where(function () {
        this.where('initiator_id', userId).orWhere('participant_id', userId);
      })
      .where('unread_count', '>', 0)
      .whereRaw('(last_sender_id != ? OR last_sender_id IS NULL)', [
        userId,
      ])) as Array<{
      conversation_id: string;
      unread_count: number;
      message_preview: string | null;
      sender_id: string | null;
    }>;

    return unreadConversations.map((conversation) => ({
      conversation_id: conversation.conversation_id,
      unread_count: conversation.unread_count,
      message_preview: conversation.message_preview || '',
      sender_id: conversation.sender_id || '',
    }));
  }
}
