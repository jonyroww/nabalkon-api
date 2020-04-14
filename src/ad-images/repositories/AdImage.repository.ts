import { EntityRepository } from "typeorm";
import { BaseRepository } from "typeorm-transactional-cls-hooked";
import { AdImage } from "../entities/AdImage.entity";

@EntityRepository(AdImage)
export class AdImageRepository extends BaseRepository<AdImage> {}
