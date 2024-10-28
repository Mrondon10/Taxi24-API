import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Passenger } from './passenger.entity';
import { PassengerService } from './passenger.service';
import { PassengerController } from './passenger.controller';
import { Driver } from '../driver/driver.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Passenger, Driver])],
  providers: [PassengerService],
  controllers: [PassengerController],
})
export class PassengerModule {}