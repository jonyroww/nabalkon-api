import { Injectable } from '@nestjs/common';
import { UserIdDto } from '../common/dto/user-id.dto';
import { CreateFavoriteAdGroupDto } from './dto/create-ad-group.dto';
import { FavoriteAdGroupRepository } from './repositories/ad-group.repository';
import { FavoriteAdRepository } from '../favorite-ads/repositories/favorite-ads.repository';
import { AdsRepository } from '../ads/repositories/ads.repository';
import { UserRepository } from '../users/repositories/User.repository';
import { makeError } from '../common/errors/index';

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
    const user = await this.userRepository.findOne({ id: params.userId });
    if (!user && user.deleted_at) {
      throw makeError('USER_NOT_FOUND');
    }
    const group = this.favoriteAdGroupRepository.create(body);
    group.user_id = params.userId;
    await this.favoriteAdGroupRepository.save(group);
    return group;
  }

  async getFavoriteAdGroups(params: UserIdDto) {
    const user = await this.userRepository.findOne({ id: params.userId });
    if (!user && user.deleted_at) {
      throw makeError('USER_NOT_FOUND');
    }
  }
}
