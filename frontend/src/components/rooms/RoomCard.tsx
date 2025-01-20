import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box, Stack, Chip, Divider } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/Inventory';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BlockIcon from '@mui/icons-material/Block';
import BuildIcon from '@mui/icons-material/Build';
import EventIcon from '@mui/icons-material/Event';
import { Room } from '../../types/room';
import { sampleBookings } from '../../data/sampleBookings';
import { format } from 'date-fns';

interface RoomCardProps {
  room: Room;
  onSelect: (room: Room) => void;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, onSelect }) => {
  // Get upcoming bookings for this room
  const upcomingBookings = sampleBookings
    .filter(booking => booking.room_id === room.id)
    .sort((a, b) => new Date(`${a.date}T${a.start_time}`).getTime() - new Date(`${b.date}T${b.start_time}`).getTime())
    .slice(0, 2); // Show only next 2 bookings
  return (
    <Card sx={{ 
      maxWidth: 400, 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.12)'
      }
    }}>
      <CardMedia
        component="img"
        height="250"
        sx={{
          objectFit: 'cover',
          objectPosition: 'center'
        }}
        image={room.imageUrl || '/room-placeholder.jpg'}
        alt={room.name}
      />
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="h5" component="h2">
            {room.name}
          </Typography>
          <Chip
            icon={
              room.status === 'available' ? <CheckCircleIcon /> :
              room.status === 'maintenance' ? <BuildIcon /> :
              <BlockIcon />
            }
            label={room.status.charAt(0).toUpperCase() + room.status.slice(1)}
            color={
              room.status === 'available' ? 'success' :
              room.status === 'maintenance' ? 'warning' :
              'error'
            }
            size="small"
            sx={{ ml: 1 }}
          />
        </Box>
        <Stack spacing={2} sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PeopleIcon sx={{ color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              Capacity: {room.capacity} people
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
            <InventoryIcon sx={{ color: 'text.secondary', mt: 0.3 }} />
            <Typography variant="body2" color="text.secondary">
              {room.equipment_details}
            </Typography>
          </Box>
        </Stack>

        {upcomingBookings.length > 0 && (
          <>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                <EventIcon fontSize="small" />
                Upcoming Bookings
              </Typography>
              <Stack spacing={1}>
                {upcomingBookings.map(booking => (
                  <Box key={booking.id}>
                    <Typography variant="body2" color="text.secondary">
                      {format(new Date(`${booking.date}T${booking.start_time}`), 'MMM d, h:mm a')}
                      {' - '}
                      {format(new Date(`${booking.date}T${booking.end_time}`), 'h:mm a')}
                    </Typography>
                    <Chip
                      label={booking.status.toUpperCase()}
                      color={booking.status === 'rented' ? 'success' : 'warning'}
                      size="small"
                      sx={{ mt: 0.5 }}
                    />
                  </Box>
                ))}
              </Stack>
            </Box>
          </>
        )}

        <Box sx={{ mt: 'auto' }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => onSelect(room)}
            sx={{ py: 1.5, fontSize: '1rem' }}
          >
            View Details
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RoomCard;
