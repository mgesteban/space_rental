import React, { useState } from 'react';
import {
  Paper,
  Box,
  Typography,
  Grid,
  Button,
  Alert,
  Stack,
  TextField
} from '@mui/material';

interface BookingCalendarProps {
  roomId: string;
  onBookingSubmit: (booking: {
    date: string;
    startTime: string;
    endTime: string;
  }) => void;
}

const BookingCalendar: React.FC<BookingCalendarProps> = ({ roomId, onBookingSubmit }) => {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [error, setError] = useState('');

  const validateTimes = (start: string, end: string) => {
    const [startHour] = start.split(':').map(Number);
    const [endHour] = end.split(':').map(Number);

    if (startHour < 9 || startHour >= 17 || endHour < 9 || endHour > 17) {
      setError('Booking times must be between 9 AM and 5 PM');
      return false;
    }

    if (startHour >= endHour) {
      setError('End time must be after start time');
      return false;
    }

    setError('');
    return true;
  };

  const handleSubmit = () => {
    if (!date || !startTime || !endTime) {
      setError('Please fill in all fields');
      return;
    }

    if (validateTimes(startTime, endTime)) {
      onBookingSubmit({
        date,
        startTime,
        endTime
      });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Paper elevation={0} sx={{ p: 3, bgcolor: 'background.default' }}>
      <Typography variant="h6" gutterBottom>
        Book a Time
      </Typography>
      
      <Stack spacing={3}>
        <TextField
          type="date"
          label="Select Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          inputProps={{ min: new Date().toISOString().split('T')[0] }}
          fullWidth
        />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              type="time"
              label="Start Time"
              value={startTime}
              onChange={(e) => {
                setStartTime(e.target.value);
                if (endTime) validateTimes(e.target.value, endTime);
              }}
              InputLabelProps={{ shrink: true }}
              inputProps={{ step: 300 }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              type="time"
              label="End Time"
              value={endTime}
              onChange={(e) => {
                setEndTime(e.target.value);
                if (startTime) validateTimes(startTime, e.target.value);
              }}
              InputLabelProps={{ shrink: true }}
              inputProps={{ step: 300 }}
              fullWidth
            />
          </Grid>
        </Grid>

        {error && (
          <Alert severity="error">
            {error}
          </Alert>
        )}

        {date && startTime && endTime && !error && (
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Your booking summary:
            </Typography>
            <Typography variant="body1">
              {formatDate(date)}
              <br />
              {startTime} - {endTime}
            </Typography>
          </Box>
        )}

        <Button
          variant="contained"
          color="primary"
          fullWidth
          disabled={!date || !startTime || !endTime || !!error}
          onClick={handleSubmit}
        >
          Confirm Booking
        </Button>
      </Stack>
    </Paper>
  );
};

export default BookingCalendar;
