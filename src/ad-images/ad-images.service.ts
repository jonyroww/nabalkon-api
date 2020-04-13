import { Injectable } from "@nestjs/common";
import { CreateAdImageDto } from "./dto/create-ad-image.dto";
import { AdImageRepository } from "./repositories/AdImage.repository";

@Injectable()
export class AdImagesService {
  constructor(private adImageRepository: AdImageRepository) {}

  async createAdImage(body: CreateAdImageDto) {
    const adImage = this.adImageRepository.create(body);
    await this.adImageRepository.save(adImage);
    return adImage;
  }
}
