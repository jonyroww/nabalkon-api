import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { UserBasketAds } from '../entities/Basket.entity';

@EntityRepository(UserBasketAds)
export class UserBasketAdsRepository extends BaseRepository<UserBasketAds> {}
