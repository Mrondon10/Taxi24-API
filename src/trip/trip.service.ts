import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trip } from './trip.entity';
import { CreateTripDto } from './dto/create-trip.dto';

@Injectable()
export class TripService {
  constructor(
    @InjectRepository(Trip)
    private tripRepository: Repository<Trip>,
  ) {}

  async createTrip(createTripDto: CreateTripDto): Promise<Trip> {
    const trip = this.tripRepository.create(createTripDto);
    return this.tripRepository.save(trip);
  }

  async completeTrip(id: number, completeTripDto: any): Promise<Trip> {
    await this.tripRepository.update(id, completeTripDto);
    return this.tripRepository.findOne({ where: { id } });
  }

  async findActiveTrips(): Promise<Trip[]> {
    return this.tripRepository.find({ where: { status: 'active' } });
  }
}
