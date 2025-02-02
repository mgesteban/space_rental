import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import type { Booking } from './Booking.js';

@Entity('rooms')
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  capacity: number;

  @Column()
  equipment_details: string;

  @Column({
    type: 'enum',
    enum: ['available', 'unavailable', 'maintenance'],
    default: 'available'
  })
  status: 'available' | 'unavailable' | 'maintenance';

  @Column({ nullable: true })
  imageUrl: string;

  @OneToMany('Booking', 'room')
  bookings: Booking[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
