import { Test, TestingModule } from '@nestjs/testing';
import { AdImagesController } from './ad-images.controller';

describe('AdImages Controller', () => {
  let controller: AdImagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdImagesController],
    }).compile();

    controller = module.get<AdImagesController>(AdImagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
