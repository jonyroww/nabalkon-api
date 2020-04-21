import { Injectable } from "@nestjs/common";
import { UserBasketAdsRepository } from "./repositories/Basket.repository";
import { AdIdDto } from "./dto/ad-id.dto";
import { UserIdDto } from "./dto/user-id.dto";
import { AdsRepository } from "../ads/repositories/ads.repository";
import { AdsStatus } from "../constants/AdsStatus.enum";
import { makeError } from "src/common/errors";
import { DeleteUsersBasketDto } from "./dto/delete-ad-params.dto";

@Injectable()
export class BasketService {
  constructor(
    private userBasketAdsRepository: UserBasketAdsRepository,
    private adsRepository: AdsRepository
  ) {}

  async createUsersBasketAd(params: UserIdDto, body: AdIdDto) {
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

  async getUsersBasketAd(params: UserIdDto) {
    const ads = await this.userBasketAdsRepository.find({
      where: { user_id: params.userId },
    });
    const adIds = ads.map((ad) => ad.ad_id);
    const qb = this.adsRepository.createQueryBuilder("ads");
    qb.where("ads.id IN (:...adIds)", { adIds: adIds });
    qb.andWhere("ads.deleted_at is null");
    qb.andWhere("ads.active_until > NOW()");
    qb.andWhere("ads.status = :status", { status: AdsStatus.ACTIVE });
    const [data, total] = await qb
      .limit(params.limit)
      .offset(params.offset)
      .getManyAndCount();
    return { total: total, data: data };
  }

  async deleteUsersBasketAd(params: DeleteUsersBasketDto) {
    const ad = await this.userBasketAdsRepository.findOne({
      where: { user_id: params.userId, ad_id: params.adId },
    });
    if (ad) {
      await this.userBasketAdsRepository.delete({ id: ad.id });
      return;
    } else {
      throw makeError("NO_SUCH_AD");
    }
  }
}
