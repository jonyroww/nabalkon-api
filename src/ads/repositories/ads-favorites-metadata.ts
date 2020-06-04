import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { AdsFavoritesMetadata } from '../entities/ads-favorites-metadata.entity';

@EntityRepository(AdsFavoritesMetadata)
export class AdsFavoritesMetadataRepository extends BaseRepository<
  AdsFavoritesMetadata
> {}
