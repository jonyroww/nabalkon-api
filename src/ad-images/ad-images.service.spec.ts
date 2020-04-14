import { Test, TestingModule } from '@nestjs/testing';
import { AdImagesService } from './ad-images.service';

describe('AdImagesService', () => {
  let service: AdImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdImagesService],
    }).compile();

    service = module.get<AdImagesService>(AdImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
