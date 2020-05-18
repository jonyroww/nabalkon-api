import { Injectable } from '@nestjs/common';
import { AdsRepository } from './repositories/ads.repository';
import { CreateAdDto } from './dto/create-ad.dto';
import { AdsStatus } from '../constants/AdsStatus.enum';
import { GetAllQueryDto } from './dto/get-all-query.dto';
import { Order } from '../constants/Order.enum';
import { User } from '../users/entities/User.entity';
import { AdIdDto } from './dto/ad-id.dto';
import { makeError } from '../common/errors';
import { UserIdDto } from './dto/user-id.dto';
import { AdSpecRepository } from '../ad-specs/repositories/ad-spec.repository';
import { UpdateAdDto } from './dto/update-ad.dto';

@Injectable()
export class AdsService {
  constructor(
    private adsRepository: AdsRepository,
    private adsSpecRepository: AdSpecRepository,
  ) {}

  async createAd({ specs, ...body }: CreateAdDto, user: User) {
    const ad = this.adsRepository.create(body);
    ad.status = AdsStatus.AWAITING_FOR_ACTIVATION;
    ad.user_id = user.id;
    await this.adsRepository.save(ad);
    specs.map(async spec => {
      const adSpec = this.adsSpecRepository.create(spec);
      adSpec.ad_id = ad.id;
      await this.adsSpecRepository.save(adSpec);
    });
    return ad;
  }

  async getAllAds(query: GetAllQueryDto) {
    const qb = this.adsRepository.createQueryBuilder('ads');

    qb.where('ads.deleted_at is null')
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

  async getOneAd(params: AdIdDto) {
    const ad = await this.adsRepository.findOne({ id: params.adId });
    if (!ad || ad.deleted_at) {
      throw makeError('NO_SUCH_AD');
    }
    return ad;
  }

  async updateAd({ specs, ...body }: UpdateAdDto, user: User, params: AdIdDto) {
    const ad = await this.adsRepository.findOne({ id: params.adId });
    if (ad && ad.user_id === user.id && !ad.deleted_at) {
      const mergeAd = this.adsRepository.merge(ad, body);
      if (specs) {
        await this.adsSpecRepository.delete({ ad_id: params.adId });
        specs.map(async spec => {
          const adSpec = this.adsSpecRepository.create(spec);
          adSpec.ad_id = ad.id;
          await this.adsSpecRepository.save(adSpec);
        });
      }
      await this.adsRepository.save(mergeAd);
      return mergeAd;
    } else {
      throw makeError('NO_SUCH_AD');
    }
  }

  async getUsersAds(params: UserIdDto) {
    const qb = this.adsRepository.createQueryBuilder('ads');
    qb.where('ads.user_id = :user_id', { user_id: params.userId });
    const [data, total] = await qb.getManyAndCount();
    return { total: total, data: data };
  }
}
