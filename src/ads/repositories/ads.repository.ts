import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { Ads } from '../entities/Ads.entity';

@EntityRepository(Ads)
export class AdsRepository extends BaseRepository<Ads> {}
