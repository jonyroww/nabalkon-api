import { Test, TestingModule } from '@nestjs/testing';
import { AdViewsService } from './ad-views.service';

describe('AdViewsService', () => {
  let service: AdViewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdViewsService],
    }).compile();

    service = module.get<AdViewsService>(AdViewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
