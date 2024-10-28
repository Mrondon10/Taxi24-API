import { Test, TestingModule } from '@nestjs/testing';
import { PassengerService } from './passenger.service';

describe('PassengerService', () => {
  let service: PassengerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PassengerService,
        {
          provide: 'PassengerRepository',
          useValue: {
            find: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue({ id: 1, name: 'Passenger 1' }),
          },
        },
        {
          provide: 'DriverRepository',
          useValue: {
            find: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue({ id: 1, name: 'Driver 1' }),
          },
        },
      ],
    }).compile();

    service = module.get<PassengerService>(PassengerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

