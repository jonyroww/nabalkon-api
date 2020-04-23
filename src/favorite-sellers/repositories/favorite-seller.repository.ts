import { EntityRepository } from "typeorm";
import { BaseRepository } from "typeorm-transactional-cls-hooked";
import { FavoriteSeller } from "../entities/favorite-seller.entity";

@EntityRepository(FavoriteSeller)
export class FavoriteSellerRepository extends BaseRepository<FavoriteSeller> {}
