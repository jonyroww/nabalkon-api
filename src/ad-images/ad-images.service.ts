import { Injectable } from "@nestjs/common";
import { CreateAdImageBodyDto } from "./dto/create-ad-image-body.dto";
import { AdImageRepository } from "./repositories/AdImage.repository";
import { GetAllDto } from "./dto/get-all-ad-images.dto";
import { CreateAdImageParamsDto } from "./dto/create-ad-params.dto";
import { DeleteAdImageParamsDto } from "./dto/delete-ad-image.dto";

@Injectable()
export class AdImagesService {
  constructor(private adImageRepository: AdImageRepository) {}

  async createAdImage(
    body: CreateAdImageBodyDto,
    params: CreateAdImageParamsDto
  ) {
    const adImage = this.adImageRepository.create(body);
    adImage.ad_id = params.adId;
    await this.adImageRepository.save(adImage);
    return adImage;
  }

  async getAllAdImages(params: GetAllDto) {
    const qb = this.adImageRepository.createQueryBuilder("ad_images");
    qb.where("ad_images.deleted_at is null");
    qb.andWhere("ad_images.ad_id = :ad_id", { ad_id: params.adId });

    const [data, total] = await qb.getManyAndCount();
    return { total: total, data: data };
  }

  async deleteAllAdImages(params: DeleteAdImageParamsDto) {
    const adImage = await this.adImageRepository.findOne({
      ad_id: params.adId,
      id: params.imageId
    });
    adImage.deleted_at = new Date();
    await this.adImageRepository.save(adImage);
    return adImage;
  }
}
