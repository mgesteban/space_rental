import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Chip,
  Button,
  Stack,
  Divider,
  Snackbar,
  Alert
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PeopleIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/Inventory';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BlockIcon from '@mui/icons-material/Block';
import BuildIcon from '@mui/icons-material/Build';
import { Room } from '../../types/room';
import BookingCalendar from '../bookings/BookingCalendar';
import BookingList from '../bookings/BookingList';
import { sampleBookings } from '../../data/sampleBookings';

interface RoomDetailProps {
  rooms: Room[];
}

const RoomDetail: React.FC<RoomDetailProps> = ({ rooms }) => {
  const [showBookingSuccess, setShowBookingSuccess] = useState(false);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const room = rooms.find(r => r.id === id);

  if (!room) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" align="center">
          Room not found
        </Typography>
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/')}
          >
            Back to Rooms
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/')}
        sx={{ mb: 4 }}
      >
        Back to Rooms
      </Button>

      <Paper elevation={0} sx={{ overflow: 'hidden', borderRadius: 2 }}>
        <Box
          sx={{
            height: 400,
            width: '100%',
            position: 'relative',
            backgroundColor: 'grey.100'
          }}
        >
          <img
            src={room.imageUrl || '/room-placeholder.jpg'}
            alt={room.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center'
            }}
          />
        </Box>

        <Box sx={{ p: 4 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Typography variant="h4" component="h1">
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
                />
              </Box>

              <Stack spacing={3}>
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Room Details
                  </Typography>
                  <Stack spacing={2}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PeopleIcon color="action" />
                      <Typography>
                        Capacity: {room.capacity} people
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                      <InventoryIcon color="action" sx={{ mt: 0.3 }} />
                      <Typography>
                        {room.equipment_details}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>

                <Divider />

                <Box>
                  <Typography variant="h6" gutterBottom>
                    Booking Information
                  </Typography>
                  <Typography color="text.secondary" paragraph>
                    This room can be booked for meetings, presentations, and events.
                    Please review our booking policies before proceeding.
                  </Typography>
                  
                  {/* Display room bookings */}
                  <BookingList 
                    bookings={sampleBookings.filter(booking => booking.room_id === room.id)}
                    title="Room Schedule"
                  />
                  {room.status === 'available' && (
                    <BookingCalendar
                      roomId={room.id}
                      onBookingSubmit={(booking) => {
                        console.log('Booking submitted:', booking);
                        setShowBookingSuccess(true);
                        // TODO: Send booking to backend
                      }}
                    />
                  )}
                  <Snackbar
                    open={showBookingSuccess}
                    autoHideDuration={6000}
                    onClose={() => setShowBookingSuccess(false)}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                  >
                    <Alert 
                      onClose={() => setShowBookingSuccess(false)} 
                      severity="success"
                      sx={{ width: '100%' }}
                    >
                      Booking request submitted successfully!
                    </Alert>
                  </Snackbar>
                </Box>
              </Stack>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  bgcolor: 'grey.50',
                  borderRadius: 2
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Quick Information
                </Typography>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Best suited for
                    </Typography>
                    <Typography>
                      {room.capacity > 30 ? 'Large gatherings and events' :
                       room.capacity > 15 ? 'Medium-sized meetings and training sessions' :
                       'Small team meetings and interviews'}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Equipment Highlights
                    </Typography>
                    <Typography>
                      {room.equipment_details.split(',')[0]}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default RoomDetail;
