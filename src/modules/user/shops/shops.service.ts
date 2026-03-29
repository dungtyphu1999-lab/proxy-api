import {
  Injectable,
  ConflictException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ShopsRepository } from './shops.repository';
import { Shop } from '@/database/entities/shop.entity';
import { ProductListItemDto, ProductShopDto } from '../products/dtos/get-products.dto';
import { GetProductsByShopInputDto } from '../products/dtos/get-products-by-shop-input.dto';
import { PaginationMetadataDto } from '@/shared/dto/pagination.dtos';
import { SlugUtil } from '@/shared/utils/slug.util';

@Injectable()
export class ShopsService {
  constructor(private readonly shopsRepository: ShopsRepository) {}

  async createShop(
    ownerId: string,
    createDto: Pick<
      Shop,
      'name' | 'description' | 'avatar_url' | 'shop_request_id'
    >,
  ): Promise<Shop> {
    const userShops = await this.shopsRepository.findShopByOwnerId(ownerId);
    if (userShops) {
      throw new ConflictException('User can only have one shop');
    }

    try {
      const baseSlug = SlugUtil.generate(createDto.name);
      const slug = await SlugUtil.makeUnique(baseSlug, (candidate) =>
        this.shopsRepository.existsBySlug(candidate),
      );

      return await this.shopsRepository.createShop(ownerId, {
        ...createDto,
        slug,
      });
    } catch {
      throw new BadRequestException('Failed to create shop');
    }
  }

  async findShopDetailOfUser(ownerId: string) {
    return await this.shopsRepository.findShopDetailByOwnerId(ownerId);
  }

  async findShopOfUser(ownerId: string) {
    return await this.shopsRepository.findShopByOwnerId(ownerId);
  }

}
