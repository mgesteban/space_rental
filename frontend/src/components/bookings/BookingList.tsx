import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Chip,
  Typography,
  Paper,
  Box
} from '@mui/material';
import { format } from 'date-fns';
import { Booking } from '../../types/room';

interface BookingListProps {
  bookings: Booking[];
  title?: string;
}

const BookingList: React.FC<BookingListProps> = ({ bookings, title = 'Upcoming Bookings' }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'rented':
        return 'success';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const formatDateTime = (date: string, time: string) => {
    const dateObj = new Date(`${date}T${time}`);
    return format(dateObj, 'MMM d, yyyy h:mm a');
  };

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {bookings.length === 0 ? (
        <Typography color="text.secondary">No bookings found</Typography>
      ) : (
        <List>
          {bookings.map((booking) => (
            <ListItem
              key={booking.id}
              divider
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'flex-start', sm: 'center' },
                gap: 1
              }}
            >
              <ListItemText
                primary={
                  <Box sx={{ mb: 1 }}>
                    <Chip
                      label={booking.status.toUpperCase()}
                      color={getStatusColor(booking.status)}
                      size="small"
                      sx={{ mr: 1 }}
                    />
                    <Chip
                      label={booking.form_type.toUpperCase()}
                      variant="outlined"
                      size="small"
                    />
                  </Box>
                }
                secondary={
                  <>
                    <Typography variant="body2" component="span" display="block">
                      Start: {formatDateTime(booking.date, booking.start_time)}
                    </Typography>
                    <Typography variant="body2" component="span" display="block">
                      End: {formatDateTime(booking.date, booking.end_time)}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default BookingList;
