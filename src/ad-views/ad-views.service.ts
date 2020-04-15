import { Injectable } from "@nestjs/common";
import { AdViewRepository } from "./repositories/AdView.repository";
import { AdIdDto } from "./dto/ad-id.dto";
import { User } from "../users/entities/User.entity";

@Injectable()
export class AdViewsService {
  constructor(private adViewRepository: AdViewRepository) {}

  async createAdView(user: User, params: AdIdDto) {
    const adView = this.adViewRepository.create();
    adView.user_id = user.id;
    adView.ad_id = params.adId;
    await this.adViewRepository.save(adView);
    return adView;
  }

  async getAdViews(params: AdIdDto) {
    const qb = this.adViewRepository.createQueryBuilder("ad_views");
    qb.where("ad_id = :ad_id", { ad_id: params.adId });
    const [data, total] = await qb.getManyAndCount();
    return { total: total, data: data };
  }
}
