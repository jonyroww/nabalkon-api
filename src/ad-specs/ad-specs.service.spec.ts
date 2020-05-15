import { Test, TestingModule } from '@nestjs/testing';
import { AdSpecsService } from './ad-specs.service';

describe('AdSpecsService', () => {
  let service: AdSpecsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdSpecsService],
    }).compile();

    service = module.get<AdSpecsService>(AdSpecsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
