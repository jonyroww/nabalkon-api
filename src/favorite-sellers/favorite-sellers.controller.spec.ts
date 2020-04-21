import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteSellersController } from './favorite-sellers.controller';

describe('FavoriteSellers Controller', () => {
  let controller: FavoriteSellersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavoriteSellersController],
    }).compile();

    controller = module.get<FavoriteSellersController>(FavoriteSellersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
