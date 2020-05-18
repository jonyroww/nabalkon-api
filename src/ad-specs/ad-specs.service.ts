import { Injectable } from '@nestjs/common';
import { AdIdDto } from '../ads/dto/ad-id.dto';
import { AdSpecRepository } from './repositories/ad-spec.repository';
import { CreateAdSpecDto } from './dto/create-ad-spec-body.dto';

@Injectable()
export class AdSpecsService {
  constructor(private adSpecRepository: AdSpecRepository) {}
  async createAdSpec(params: AdIdDto, body: CreateAdSpecDto) {
    const spec = this.adSpecRepository.create(body);
    spec.ad_id = params.adId;
    await this.adSpecRepository.save(spec);
    return spec;
  }
}
