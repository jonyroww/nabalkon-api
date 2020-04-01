import { Injectable } from "@nestjs/common";
import { AdsRepository } from "./repositories/ads.repository";
import { CreateAdDto } from "./dto/create-ad.dto";
import { AdsState } from "../constants/AdsState.enum";
import { AdsStatus } from "../constants/AdsStatus.enum";
import { AdsTransferMode } from "../constants/AdsTransferMode.enum";

@Injectable()
export class AdsService {
  constructor(private adsRepository: AdsRepository) {}

  async createAd(body: CreateAdDto) {
    const ad = this.adsRepository.create(body);
    ad.status = AdsStatus.AWAITING_FOR_ACTIVATION;
    ad.user_id = 1;
    await this.adsRepository.save(ad);
    return ad;
  }

  async getAllAds() {}
}
