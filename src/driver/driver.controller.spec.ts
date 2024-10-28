import { Test, TestingModule } from '@nestjs/testing';
import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';

describe('DriverController', () => {
  let controller: DriverController;
  let service: DriverService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DriverController],
      providers: [
        {
          provide: DriverService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([
              { id: 1, name: 'Driver 1', isAvailable: true },
              { id: 2, name: 'Driver 2', isAvailable: false },
            ]),
            findAvailableDrivers: jest.fn().mockResolvedValue([
              { id: 1, name: 'Driver 1', isAvailable: true },
            ]),
            findDriversWithinRadius: jest.fn().mockResolvedValue([
              { id: 1, name: 'Driver 1', isAvailable: true },
            ]),
            findById: jest.fn().mockResolvedValue({ id: 1, name: 'Driver 1' }),
          },
        },
      ],
    }).compile();

    controller = module.get<DriverController>(DriverController);
    service = module.get<DriverService>(DriverService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of drivers', async () => {
    const drivers = await controller.getAllDrivers();
    expect(drivers).toEqual([
      { id: 1, name: 'Driver 1', isAvailable: true },
      { id: 2, name: 'Driver 2', isAvailable: false },
    ]);
  });

  it('should return available drivers', async () => {
    const availableDrivers = await controller.getAvailableDrivers();
    expect(availableDrivers).toEqual([{ id: 1, name: 'Driver 1', isAvailable: true }]);
  });

  it('should return drivers within radius', async () => {
    const drivers = await controller.getDriversWithinRadius(40.7128, -74.0060, 3);
    expect(drivers).toEqual([{ id: 1, name: 'Driver 1', isAvailable: true }]);
  });

  it('should return a driver by ID', async () => {
    const driver = await controller.getDriverById(1);
    expect(driver).toEqual({ id: 1, name: 'Driver 1' });
  });
});


