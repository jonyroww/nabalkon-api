import { Injectable } from "@nestjs/common";
import { UserBasketAdsRepository } from "./repositories/Basket.repository";
import { AdIdDto } from "./dto/ad-id.dto";
import { CreateUsersBasketDto } from "./dto/create-users-basket-ad.dto";
import { AdsRepository } from "../ads/repositories/ads.repository";
import { AdsStatus } from "../constants/AdsStatus.enum";
import { makeError } from "src/common/errors";

@Injectable()
export class BasketService {
  constructor(
    private userBasketAdsRepository: UserBasketAdsRepository,
    private adsRepository: AdsRepository
  ) {}

  async createUsersBasketAd(params: CreateUsersBasketDto, body: AdIdDto) {
    const adInBasket = await this.userBasketAdsRepository.find({
      where: { user_id: params.userId, ad_id: body.adId },
    });
    if (adInBasket) {
      throw makeError("AD_ALREADY_ADDED");
    }
    const ad = await this.adsRepository.findOne({ id: body.adId });
    if (
      !ad ||
      ad.status != AdsStatus.ACTIVE ||
      ad.deleted_at ||
      ad.active_until < new Date()
    ) {
      throw makeError("NO_SUCH_AD");
    } else {
      const userBasketAd = this.userBasketAdsRepository.create();
      userBasketAd.user_id = params.userId;
      userBasketAd.ad_id = body.adId;
      await this.userBasketAdsRepository.save(userBasketAd);
      return userBasketAd;
    }
  }
}
