import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Passenger } from './passenger.entity';
import { Driver } from '../driver/driver.entity';

@Injectable()
export class PassengerService {
  constructor(
    @InjectRepository(Passenger)
    private passengerRepository: Repository<Passenger>,
    @InjectRepository(Driver)
    private driverRepository: Repository<Driver>,
  ) {}

  async findAll(): Promise<Passenger[]> {
    return this.passengerRepository.find();
  }

  async findById(id: number): Promise<Passenger> {
    return this.passengerRepository.findOne({ where: { id } });
  }

  async findClosestDrivers(passengerId: number, radius: number): Promise<Driver[]> {
    const passenger = await this.findById(passengerId);
    if (!passenger) throw new Error("Passenger not found");

    return this.driverRepository.query(
      `
      SELECT *, 
           (6371 * acos(cos(radians($1)) * cos(radians("locationLat")) * cos(radians("locationLng") - radians($2)) + sin(radians($1)) * sin(radians("locationLat")))) AS distance
    FROM "driver"
    WHERE "isAvailable" = true
      AND (6371 * acos(cos(radians($1)) * cos(radians("locationLat")) * cos(radians("locationLng") - radians($2)) + sin(radians($1)) * sin(radians("locationLat")))) <= $3
    ORDER BY distance ASC
    LIMIT 3;
      `,
      [passenger.locationLat, passenger.locationLng, radius],
    );
  }
}
