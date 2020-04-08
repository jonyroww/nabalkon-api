import { Injectable } from "@nestjs/common";
import { AdsRepository } from "./repositories/ads.repository";
import { CreateAdDto } from "./dto/create-ad.dto";
import { AdsState } from "../constants/AdsState.enum";
import { AdsStatus } from "../constants/AdsStatus.enum";
import { AdsTransferMode } from "../constants/AdsTransferMode.enum";
import { GetAllQueryDto } from "./dto/get-all-query.dto";
import { Order } from "../constants/Order.enum";
import { User } from "../users/entities/User.entity";

@Injectable()
export class AdsService {
  constructor(private adsRepository: AdsRepository) {}

  async createAd(body: CreateAdDto, user: User) {
    const ad = this.adsRepository.create(body);
    ad.status = AdsStatus.AWAITING_FOR_ACTIVATION;
    ad.user_id = user.id;
    await this.adsRepository.save(ad);
    return ad;
  }

  async getAllAds(query: GetAllQueryDto) {
    const qb = this.adsRepository.createQueryBuilder("ads");

    qb.where("ads.deleted_at is null")
      .andWhere("ads.status = :status", {
        status: AdsStatus.ACTIVE,
      })
      .andWhere("ads.active_until > NOW()");

    if (query.q) {
      qb.addSelect(`word_similarity (:q, "title")`, "similarity_rank");
      qb.andWhere(`:q <% "title"`);
      qb.setParameter("q", query.q);
    }

    if (query.category_id) {
      qb.andWhere("ads.category_id = :category_id", {
        category_id: query.category_id,
      });
    }

    if (query.city) {
      qb.andWhere("ads.city = :city", {
        city: query.city,
      });
    }

    qb.andWhere("ads.price >= :price_from", {
      price_from: query.price_from || 0,
    });

    if (query.price_to) {
      qb.andWhere("ads.price < :price_to", {
        price_to: query.price_to,
      });
    }

    if (query.sort && query.order) {
      qb.orderBy(query.sort, query.order || Order.ASC);
    }

    const [data, total] = await qb
      .take(query.limit)
      .offset(query.offset)
      .getManyAndCount();
    return { total: total, data: data };
  }
}
