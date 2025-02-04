import type { Booking } from './Booking.js';
export declare class Room {
    id: number;
    name: string;
    capacity: number;
    equipment_details: string;
    status: 'available' | 'unavailable' | 'maintenance';
    imageUrl: string;
    bookings: Booking[];
    created_at: Date;
    updated_at: Date;
}
