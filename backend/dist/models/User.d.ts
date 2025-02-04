import type { Booking } from './Booking.js';
export declare class User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'user';
    bookings: Booking[];
    created_at: Date;
    updated_at: Date;
}
