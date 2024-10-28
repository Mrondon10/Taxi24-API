import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { TripService } from './trip.service';
import { Trip } from './trip.entity';
import { CreateTripDto } from './dto/create-trip.dto';

@Controller('trips')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Get('active')
  async getActiveTrips(): Promise<Trip[]> {
    return this.tripService.findActiveTrips();
  }

  @Post()
  async createTrip(@Body() createTripDto: CreateTripDto): Promise<Trip> {
    return this.tripService.createTrip(createTripDto);
  }
  
  @Patch(':id/complete')
  async completeTrip(@Param('id') id: number, @Body() completeTripDto: any): Promise<Trip> {
    return this.tripService.completeTrip(id, completeTripDto);
  }
}
