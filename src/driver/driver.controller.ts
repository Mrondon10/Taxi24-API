import { Controller, Get, Param, Query } from '@nestjs/common';
import { DriverService } from './driver.service';
import { Driver } from './driver.entity';

@Controller('drivers')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Get()
  async getAllDrivers(): Promise<Driver[]> {
    return this.driverService.findAll();
  }

  @Get('available')
  async getAvailableDrivers(): Promise<Driver[]> {
    return this.driverService.findAvailableDrivers();
  }

  @Get('available/:lat/:lng/:radius')
  async getDriversWithinRadius(
    @Param('lat') lat: number,
    @Param('lng') lng: number,
    @Param('radius') radius: number,
  ): Promise<Driver[]> {
    return this.driverService.findDriversWithinRadius(lat, lng, radius);
  }

  @Get(':id')
  async getDriverById(@Param('id') id: number): Promise<Driver> {
    return this.driverService.findById(id);
  }
}

