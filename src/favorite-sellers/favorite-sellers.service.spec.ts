import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteSellersService } from './favorite-sellers.service';

describe('FavoriteSellersService', () => {
  let service: FavoriteSellersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FavoriteSellersService],
    }).compile();

    service = module.get<FavoriteSellersService>(FavoriteSellersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
