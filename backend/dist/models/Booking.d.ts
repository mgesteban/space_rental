import type { User } from './User.js';
import type { Room } from './Room.js';
export declare class Booking {
    id: number;
    user: User;
    room: Room;
    date: Date;
    start_time: string;
    end_time: string;
    status: 'pending' | 'rented' | 'cancelled';
    form_type: 'internal' | 'external';
    created_at: Date;
    updated_at: Date;
}
