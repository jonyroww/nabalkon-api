import { Injectable } from '@nestjs/common';
import { UserIdDto } from '../common/dto/user-id.dto';
import { CreateFavoriteAdGroupDto } from './dto/create-ad-group.dto';
import { FavoriteAdGroupRepository } from './repositories/ad-group.repository';
import { FavoriteAdRepository } from '../favorite-ads/repositories/favorite-ads.repository';
import { AdsRepository } from '../ads/repositories/ads.repository';
import { UserRepository } from '../users/repositories/User.repository';
import { makeError } from '../common/errors/index';
import { UpdateGroupDto } from './dto/update-group.dto';

@Injectable()
export class FavoriteAdsGroupService {
  constructor(
    private favoriteAdGroupRepository: FavoriteAdGroupRepository,
    private favoriteAdRepository: FavoriteAdRepository,
    private userRepository: UserRepository,
    private adsRepository: AdsRepository,
  ) {}

  async createFavoriteAdGroup(
    params: UserIdDto,
    body: CreateFavoriteAdGroupDto,
  ) {
    const group = this.favoriteAdGroupRepository.create(body);
    group.user_id = params.userId;
    await this.favoriteAdGroupRepository.save(group);
    return group;
  }

  async getFavoriteAdGroups(params: UserIdDto) {
    const qb = this.favoriteAdGroupRepository.createQueryBuilder(
      'favorite_ads_groups',
    );
    qb.where('favorite_ads_groups.user_id = :user_id', {
      user_id: params.userId,
    });

    const [data, total] = await qb
      .take(params.limit)
      .offset(params.offset)
      .getManyAndCount();
    return { total: total, data: data };
  }

  async getOneFavoriteAdGroup(params: UpdateGroupDto) {
    const qb = this.favoriteAdGroupRepository.createQueryBuilder(
      'favorite_ads_groups',
    );
    qb.where('favorite_ads_groups.user_id = :user_id', {
      user_id: params.userId,
    }).andWhere('favorite_ads_groups.id = :group_id', {
      group_id: params.groupId,
    });

    return qb.getOne();
  }

  async deleteFavoriteAdGroup(params: UpdateGroupDto) {
    const group = await this.favoriteAdGroupRepository.findOne({
      id: params.groupId,
    });

    if (group) {
      await this.favoriteAdGroupRepository.delete({ id: group.id });
    } else {
      throw makeError('NO_SUCH_GROUP');
    }
    return;
  }
}
