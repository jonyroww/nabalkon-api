import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteAdsGroupService } from './favorite-ads-group.service';

describe('FavoriteAdsGroupService', () => {
  let service: FavoriteAdsGroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FavoriteAdsGroupService],
    }).compile();

    service = module.get<FavoriteAdsGroupService>(FavoriteAdsGroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
