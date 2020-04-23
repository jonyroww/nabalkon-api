import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteAdsGroupController } from './favorite-ads-group.controller';

describe('FavoriteAdsGroup Controller', () => {
  let controller: FavoriteAdsGroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavoriteAdsGroupController],
    }).compile();

    controller = module.get<FavoriteAdsGroupController>(FavoriteAdsGroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
