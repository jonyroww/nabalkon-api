import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteAdsController } from './favorite-ads.controller';

describe('FavoriteAds Controller', () => {
  let controller: FavoriteAdsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavoriteAdsController],
    }).compile();

    controller = module.get<FavoriteAdsController>(FavoriteAdsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
