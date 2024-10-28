import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Passenger {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('float')
  locationLat: number;

  @Column('float')
  locationLng: number;
}
