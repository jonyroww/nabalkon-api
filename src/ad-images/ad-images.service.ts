import { Injectable } from "@nestjs/common";
import { CreateAdImageDto } from "./dto/create-ad-image.dto";
import { AdImageRepository } from "./repositories/AdImage.repository";
import { GetAllDto } from "./dto/get-all-ad-images.dto";

@Injectable()
export class AdImagesService {
  constructor(private adImageRepository: AdImageRepository) {}

  async createAdImage(body: CreateAdImageDto) {
    const adImage = this.adImageRepository.create(body);
    await this.adImageRepository.save(adImage);
    return adImage;
  }

  async getAllAdImages(query: GetAllDto) {
    const qb = this.adImageRepository.createQueryBuilder("ad_images");
    qb.where("ad_images.deleted_at is null");
    if (query.ad_id) {
      qb.andWhere("ad_images.ad_id = :ad_id", { ad_id: query.ad_id });
    }

    if (query.id) {
      qb.andWhere("ad_images.id = :id", { id: query.id });
    }

    const [data, total] = await qb.getManyAndCount();
    return { total: total, data: data };
  }
}
