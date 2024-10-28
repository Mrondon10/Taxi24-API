import { Controller, Get, Param, Query } from '@nestjs/common';
import { PassengerService } from './passenger.service';
import { Passenger } from './passenger.entity';
import { Driver } from '../driver/driver.entity';

@Controller('passengers')
export class PassengerController {
  constructor(private readonly passengerService: PassengerService) {}

  @Get()
  async getAllPassengers(): Promise<Passenger[]> {
    return this.passengerService.findAll();
  }

  @Get(':id')
  async getPassengerById(@Param('id') id: number): Promise<Passenger> {
    return this.passengerService.findById(id);
  }

  @Get(':id/closest-drivers')
  async getClosestDrivers(
    @Param('id') passengerId: number,
    @Query('radius') radius: number = 3,
  ): Promise<Driver[]> {
    return this.passengerService.findClosestDrivers(passengerId, radius);
  }
}
