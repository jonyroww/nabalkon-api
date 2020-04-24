import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteAdsService } from './favorite-ads.service';

describe('FavoriteAdsService', () => {
  let service: FavoriteAdsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FavoriteAdsService],
    }).compile();

    service = module.get<FavoriteAdsService>(FavoriteAdsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
