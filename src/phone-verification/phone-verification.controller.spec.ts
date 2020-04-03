import { Test, TestingModule } from '@nestjs/testing';
import { PhoneVerificationController } from './phone-verification.controller';

describe('PhoneVerification Controller', () => {
  let controller: PhoneVerificationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhoneVerificationController],
    }).compile();

    controller = module.get<PhoneVerificationController>(PhoneVerificationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
