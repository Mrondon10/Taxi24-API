import 'dotenv/config';
import { createConnection } from 'typeorm';
import { Driver } from './src/driver/driver.entity';
import { Passenger } from './src/passenger/passenger.entity';

async function seed() {
  const connection = await createConnection({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [Driver, Passenger],
    synchronize: true,
  });

  const driverRepository = connection.getRepository(Driver);
  const passengerRepository = connection.getRepository(Passenger);

  const drivers = [
    { name: 'John Doe', locationLat: 40.712776, locationLng: -74.005974, isAvailable: true },
    { name: 'Jane Doe', locationLat: 40.712776, locationLng: -74.005974, isAvailable: true },
  ];

  const passengers = [
    { name: 'Alice', locationLat: 40.712776, locationLng: -74.005974 },
    { name: 'Bob', locationLat: 40.712776, locationLng: -74.005974 },
  ];

  await driverRepository.save(drivers);
  await passengerRepository.save(passengers);
  console.log('Seeding complete');
  await connection.close();
}

seed();
