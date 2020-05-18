import { Injectable } from '@nestjs/common';
import { AdIdDto } from '../ads/dto/ad-id.dto';
import { AdSpecRepository } from './repositories/ad-spec.repository';
import { PaginationFilterDto } from '../common/dto/pagination-filter.dto';

@Injectable()
export class AdSpecsService {
  constructor(private adSpecRepository: AdSpecRepository) {}
  async getAdSpecs(params: AdIdDto, query: PaginationFilterDto) {
    const qb = this.adSpecRepository.createQueryBuilder('ad_specs');
    qb.where('ad_specs.ad_id = :adId', { adId: params.adId });
    const [data, total] = await qb
      .take(query.limit)
      .offset(query.offset)
      .getManyAndCount();
    return { total: total, data: data };
  }
}
