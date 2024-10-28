import { Test, TestingModule } from '@nestjs/testing';
import { PassengerController } from './passenger.controller';
import { PassengerService } from './passenger.service';

describe('PassengerController', () => {
  let controller: PassengerController;
  let service: PassengerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PassengerController],
      providers: [
        {
          provide: PassengerService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([
              { id: 1, name: 'Passenger 1' },
              { id: 2, name: 'Passenger 2' },
            ]),
            findById: jest.fn().mockResolvedValue({ id: 1, name: 'Passenger 1' }),
            findClosestDrivers: jest.fn().mockResolvedValue([
              { id: 1, name: 'Driver 1' },
              { id: 2, name: 'Driver 2' },
            ]),
          },
        },
      ],
    }).compile();

    controller = module.get<PassengerController>(PassengerController);
    service = module.get<PassengerService>(PassengerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of passengers', async () => {
    const passengers = await controller.getAllPassengers();
    expect(passengers).toEqual([
      { id: 1, name: 'Passenger 1' },
      { id: 2, name: 'Passenger 2' },
    ]);
  });

  it('should return a passenger by ID', async () => {
    const passenger = await controller.getPassengerById(1);
    expect(passenger).toEqual({ id: 1, name: 'Passenger 1' });
  });

  it('should return the closest drivers for a passenger', async () => {
    const drivers = await controller.getClosestDrivers(1, 3);
    expect(drivers).toEqual([
      { id: 1, name: 'Driver 1' },
      { id: 2, name: 'Driver 2' },
    ]);
  });
});
