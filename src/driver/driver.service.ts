import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Driver } from './driver.entity';

@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(Driver)
    private driverRepository: Repository<Driver>,
  ) {}

  async findAll(): Promise<Driver[]> {
    return this.driverRepository.find();
  }

  async findAvailableDrivers(): Promise<Driver[]> {
    return this.driverRepository.find({ where: { isAvailable: true } });
  }

  async findDriversWithinRadius(lat: number, lng: number, radius: number): Promise<Driver[]> {
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
        [lat, lng, radius],
    );
  }

  async findById(id: number): Promise<Driver> {
    return this.driverRepository.findOne({ where: { id } });
  }
}

