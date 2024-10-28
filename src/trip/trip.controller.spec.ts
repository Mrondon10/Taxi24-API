import { Test, TestingModule } from '@nestjs/testing';
import { TripController } from './trip.controller';
import { TripService } from './trip.service';

describe('TripController', () => {
  let controller: TripController;
  let service: TripService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TripController],
      providers: [
        {
          provide: TripService,
          useValue: {
            createTrip: jest.fn().mockResolvedValue({
              id: 1,
              driverId: 1,
              passengerId: 2,
              originLat: 40.7128,
              originLng: -74.0060,
              destinationLat: 40.7580,
              destinationLng: -73.9855,
              status: 'active',
            }),
            completeTrip: jest.fn().mockResolvedValue({
              id: 1,
              driverId: 1,
              passengerId: 2,
              status: 'completed',
              distance: 5.0,
            }),
            findActiveTrips: jest.fn().mockResolvedValue([
              {
                id: 1,
                driverId: 1,
                passengerId: 2,
                status: 'active',
              },
            ]),
          },
        },
      ],
    }).compile();

    controller = module.get<TripController>(TripController);
    service = module.get<TripService>(TripService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new trip', async () => {
    const newTrip = await controller.createTrip({
      driverId: 1,
      passengerId: 2,
      originLat: 40.7128,
      originLng: -74.0060,
      destinationLat: 40.7580,
      destinationLng: -73.9855,
    });
    expect(newTrip).toEqual({
      id: 1,
      driverId: 1,
      passengerId: 2,
      originLat: 40.7128,
      originLng: -74.0060,
      destinationLat: 40.7580,
      destinationLng: -73.9855,
      status: 'active',
    });
  });

  it('should complete a trip', async () => {
    const completedTrip = await controller.completeTrip(1, {
      distance: 5.0,
    });
    expect(completedTrip).toEqual({
      id: 1,
      driverId: 1,
      passengerId: 2,
      status: 'completed',
      distance: 5.0,
    });
  });

  it('should return all active trips', async () => {
    const activeTrips = await controller.getActiveTrips();
    expect(activeTrips).toEqual([
      {
        id: 1,
        driverId: 1,
        passengerId: 2,
        status: 'active',
      },
    ]);
  });
});

