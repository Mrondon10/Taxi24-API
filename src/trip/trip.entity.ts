import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Trip {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  driverId: number;

  @Column()
  passengerId: number;

  @Column({ default: 'active' })
  status: string;

  @Column('float')
  originLat: number;

  @Column('float')
  originLng: number;

  @Column('float')
  destinationLat: number;

  @Column('float')
  destinationLng: number;

  @Column('float', { nullable: true })
  distance: number;
}
