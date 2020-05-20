import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { AdSpec } from '../entities/ad-spec.entity';

@EntityRepository(AdSpec)
export class AdSpecRepository extends BaseRepository<AdSpec> {}
