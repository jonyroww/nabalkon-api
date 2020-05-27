import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { FavoriteAd } from '../entities/favorite-ads.entity';
@EntityRepository(FavoriteAd)
export class FavoriteAdRepository extends BaseRepository<FavoriteAd> {}
