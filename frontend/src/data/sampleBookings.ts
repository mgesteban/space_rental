import { addDays, format } from 'date-fns';
import { Booking } from '../types/room';

// Get today's date at midnight
const today = new Date();
today.setHours(0, 0, 0, 0);

// Format date helper
const formatDate = (date: Date) => format(date, 'yyyy-MM-dd');

export const sampleBookings: Booking[] = [
  // Conference Room A bookings
  {
    id: 'b1',
    room_id: '1',
    user_id: 'u1',
    date: formatDate(today),
    start_time: '09:00',
    end_time: '12:00',
    status: 'rented',
    form_type: 'internal'
  },
  {
    id: 'b2',
    room_id: '1',
    user_id: 'u2',
    date: formatDate(addDays(today, 1)),
    start_time: '14:00',
    end_time: '16:00',
    status: 'pending',
    form_type: 'external'
  },

  // Meeting Room B bookings
  {
    id: 'b3',
    room_id: '2',
    user_id: 'u3',
    date: formatDate(addDays(today, 2)),
    start_time: '10:00',
    end_time: '15:00',
    status: 'rented',
    form_type: 'internal'
  },

  // Training Room C bookings
  {
    id: 'b4',
    room_id: '3',
    user_id: 'u4',
    date: formatDate(today),
    start_time: '13:00',
    end_time: '17:00',
    status: 'pending',
    form_type: 'internal'
  },
  {
    id: 'b5',
    room_id: '3',
    user_id: 'u5',
    date: formatDate(addDays(today, 3)),
    start_time: '09:00',
    end_time: '12:00',
    status: 'rented',
    form_type: 'external'
  },

  // Board Room D bookings
  {
    id: 'b6',
    room_id: '4',
    user_id: 'u6',
    date: formatDate(addDays(today, 1)),
    start_time: '09:00',
    end_time: '11:00',
    status: 'rented',
    form_type: 'internal'
  },

  // Collaboration Space E bookings
  {
    id: 'b7',
    room_id: '5',
    user_id: 'u7',
    date: formatDate(addDays(today, 2)),
    start_time: '13:00',
    end_time: '16:00',
    status: 'pending',
    form_type: 'external'
  }
];
