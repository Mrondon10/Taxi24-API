import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Driver {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('float')
  locationLat: number;

  @Column('float')
  locationLng: number;

  @Column({ default: true })
  isAvailable: boolean;
}
