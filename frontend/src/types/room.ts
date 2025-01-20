export interface Room {
  id: string;
  name: string;
  capacity: number;
  equipment_details: string;
  status: 'available' | 'unavailable' | 'maintenance';
  imageUrl?: string;
}

export interface Booking {
  id: string;
  user_id: string;
  room_id: string;
  date: string;
  start_time: string;
  end_time: string;
  status: 'pending' | 'rented' | 'cancelled';
  form_type: 'internal' | 'external';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}
