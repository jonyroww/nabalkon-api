import { Test, TestingModule } from '@nestjs/testing';
import { AdSpecsController } from './ad-specs.controller';

describe('AdSpecs Controller', () => {
  let controller: AdSpecsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdSpecsController],
    }).compile();

    controller = module.get<AdSpecsController>(AdSpecsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
