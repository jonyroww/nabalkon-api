import { EntityRepository } from "typeorm";
import { BaseRepository } from "typeorm-transactional-cls-hooked";
import { FavoriteAdGroup } from "../entities/ad-group.entity.dto";
@EntityRepository(FavoriteAdGroup)
export class FavoriteAdGroupRepository extends BaseRepository<
  FavoriteAdGroup
> {}
