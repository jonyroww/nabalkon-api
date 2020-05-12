import { Injectable } from '@nestjs/common';
import { FavoriteAdRepository } from './repositories/favorite-ads.repository';
import { UserIdDto } from '../common/dto/user-id.dto';
import { CreateFavoriteAdDto } from './dto/create-favorite-ad-body.dto';
import { UserRepository } from '../users/repositories/User.repository';
import { makeError } from '../common/errors/index';
import { GetAllFavoriteAdDto } from './dto/get-all-favorite-ad.dto';
import { AdsRepository } from '../ads/repositories/ads.repository';
import { AdsStatus } from '../constants/AdsStatus.enum';
import { Order } from '../constants/Order.enum';
import { DeleteFavoriteAdDto } from './dto/delete-favorite-ad.dto';

@Injectable()
export class FavoriteAdsService {
  constructor(
    private favoriteAdRepository: FavoriteAdRepository,
    private userRepository: UserRepository,
    private adsRepository: AdsRepository,
  ) {}

  async createFavoriteAd(params: UserIdDto, body: CreateFavoriteAdDto) {
    const user = await this.userRepository.findOne({ id: params.userId });
    if (!user && user.deleted_at) {
      throw makeError('USER_NOT_FOUND');
    }
    const favoriteAd = this.favoriteAdRepository.create();
    favoriteAd.ad_id = body.adId;
    favoriteAd.group_id = body.groupId;
    favoriteAd.user_id = params.userId;
    await this.favoriteAdRepository.save(favoriteAd);
    return favoriteAd;
  }

  async getAllFavoriteAds(query: GetAllFavoriteAdDto, params: UserIdDto) {
    const user = await this.userRepository.findOne({ id: params.userId });
    if (!user && user.deleted_at) {
      throw makeError('USER_NOT_FOUND');
    }
    const favoriteAdIds = user.favorite_ads.map(ad => ad.id);
    const qb = this.adsRepository.createQueryBuilder('ads');
    qb.where('ads.id IN (:...favoriteAdIds)', {
      favoriteAdIds: favoriteAdIds,
    })
      .andWhere('ads.deleted_at is null')
      .andWhere('ads.status = :status', {
        status: AdsStatus.ACTIVE,
      })
      .andWhere('ads.active_until > NOW()');

    if (query.q) {
      qb.addSelect(`word_similarity (:q, "title")`, 'similarity_rank');
      qb.andWhere(`:q <% "title"`);
      qb.setParameter('q', query.q);
    }

    if (query.category_id) {
      qb.andWhere('ads.category_id = :category_id', {
        category_id: query.category_id,
      });
    }

    if (query.city) {
      qb.andWhere('ads.city = :city', {
        city: query.city,
      });
    }

    qb.andWhere('ads.price >= :price_from', {
      price_from: query.price_from || 0,
    });

    if (query.price_to) {
      qb.andWhere('ads.price < :price_to', {
        price_to: query.price_to,
      });
    }

    if (query.sort && query.order) {
      qb.orderBy(query.sort, query.order || Order.ASC);
    }

    const [data, total] = await qb
      .take(query.limit)
      .offset(query.offset)
      .getManyAndCount();
    return { total: total, data: data };
  }

  async deleteFavoriteAd(params: DeleteFavoriteAdDto) {
    const user = await this.userRepository.findOne({ id: params.userId });
    if (!user && user.deleted_at) {
      throw makeError('USER_NOT_FOUND');
    }
    const favoriteAd = await this.favoriteAdRepository.findOne({
      user_id: params.userId,
      ad_id: params.adId,
    });
    if (!favoriteAd) {
      throw makeError('NO_SUCH_AD');
    }
    await this.favoriteAdRepository.delete({
      user_id: params.userId,
      ad_id: params.adId,
    });
    return;
  }
}
