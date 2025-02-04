import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import type { User } from './User.js';
import type { Room } from './Room.js';

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne('User', 'bookings')
  user: User;

  @ManyToOne('Room', 'bookings')
  room: Room;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'time' })
  start_time: string;

  @Column({ type: 'time' })
  end_time: string;

  @Column({
    type: 'enum',
    enum: ['pending', 'rented', 'cancelled'],
    default: 'pending'
  })
  status: 'pending' | 'rented' | 'cancelled';

  @Column({
    type: 'enum',
    enum: ['internal', 'external'],
    default: 'internal'
  })
  form_type: 'internal' | 'external';

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
