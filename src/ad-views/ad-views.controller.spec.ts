import { Test, TestingModule } from '@nestjs/testing';
import { AdViewsController } from './ad-views.controller';

describe('AdViews Controller', () => {
  let controller: AdViewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdViewsController],
    }).compile();

    controller = module.get<AdViewsController>(AdViewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
