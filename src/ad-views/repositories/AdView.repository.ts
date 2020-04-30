import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { AdView } from '../entities/AdView.entity';

@EntityRepository(AdView)
export class AdViewRepository extends BaseRepository<AdView> {}
