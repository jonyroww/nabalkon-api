import { Injectable } from "@nestjs/common";
import { AdViewRepository } from "./repositories/AdView.repository";
import { CreateAdViewParamsDto } from "./dto/ad-id.dto";
import { User } from "../users/entities/User.entity";

@Injectable()
export class AdViewsService {
  constructor(private adViewRepository: AdViewRepository) {}

  async createAdView(user: User, params: CreateAdViewParamsDto) {
    const adView = this.adViewRepository.create();
    adView.user_id = user.id;
    adView.ad_id = params.adId;
    await this.adViewRepository.save(adView);
    return adView;
  }
}
