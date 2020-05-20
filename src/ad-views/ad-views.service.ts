import { Injectable } from '@nestjs/common';
import { AdViewRepository } from './repositories/AdView.repository';
import { AdIdDto } from './dto/ad-id.dto';
import { User } from '../users/entities/User.entity';
import { AdsRepository } from '../ads/repositories/ads.repository';
import { AdsStatus } from '../constants/AdsStatus.enum';
import { makeError } from '../common/errors/index';
import { GetAdViewsQueryDto } from './dto/get-ad-views-query.dto';

@Injectable()
export class AdViewsService {
  constructor(
    private adViewRepository: AdViewRepository,
    private adsRepository: AdsRepository,
  ) {}

  async createAdView(user: User, params: AdIdDto) {
    const ad = await this.adsRepository.findOne({ id: params.adId });
    if (!ad || ad.deleted_at || ad.status != AdsStatus.ACTIVE) {
      throw makeError('AD_NOT_ACTIVATED_OR_WAS_DELETED');
    }
    ad.views_count += 1
    await this.adsRepository.save(ad);

    const adView = this.adViewRepository.create();
    adView.user_id = user.id;
    adView.ad_id = params.adId;
    await this.adViewRepository.save(adView);
    return adView;
  }

  async getAdViews(params: AdIdDto, query: GetAdViewsQueryDto) {
    const ad = await this.adsRepository.findOne({ id: params.adId });
    if (!ad || ad.deleted_at || ad.status != AdsStatus.ACTIVE) {
      throw makeError('AD_NOT_ACTIVATED_OR_WAS_DELETED');
    }

    const qb = this.adViewRepository.createQueryBuilder('ad_views');
    qb.where('ad_id = :ad_id', { ad_id: params.adId });
    if (query.from_time) {
      qb.andWhere('created_at >= :from_time', { from_time: query.from_time });
    }
    if (query.to_time) {
      qb.andWhere('created_at < :to_time', { from_time: query.to_time });
    }
    const [data, total] = await qb.getManyAndCount();
    return { total: total, data: data };
  }
}
