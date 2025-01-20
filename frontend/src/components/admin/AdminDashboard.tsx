import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip
} from '@mui/material';
import { useAuth } from '../auth/AuthContext';
import { sampleBookings } from '../../data/sampleBookings';
import { Booking, Room } from '../../types/room';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const AdminDashboard: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>(sampleBookings);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleBookingStatusUpdate = (bookingId: string, newStatus: 'rented' | 'cancelled') => {
    setBookings(prevBookings =>
      prevBookings.map(booking =>
        booking.id === bookingId
          ? { ...booking, status: newStatus }
          : booking
      )
    );
  };

  const PendingBookingsPanel = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Room</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Form Type</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings
            .filter(booking => booking.status === 'pending')
            .map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>Room {booking.room_id}</TableCell>
                <TableCell>{booking.date}</TableCell>
                <TableCell>{`${booking.start_time} - ${booking.end_time}`}</TableCell>
                <TableCell>
                  <Chip 
                    label={booking.form_type} 
                    color={booking.form_type === 'internal' ? 'primary' : 'secondary'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip 
                    label={booking.status}
                    color="warning"
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      size="small"
                      variant="contained"
                      color="success"
                      onClick={() => handleBookingStatusUpdate(booking.id, 'rented')}
                    >
                      Approve
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      color="error"
                      onClick={() => handleBookingStatusUpdate(booking.id, 'cancelled')}
                    >
                      Reject
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const AllBookingsPanel = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Room</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Form Type</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell>Room {booking.room_id}</TableCell>
              <TableCell>{booking.date}</TableCell>
              <TableCell>{`${booking.start_time} - ${booking.end_time}`}</TableCell>
              <TableCell>
                <Chip 
                  label={booking.form_type} 
                  color={booking.form_type === 'internal' ? 'primary' : 'secondary'}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <Chip 
                  label={booking.status}
                  color={
                    booking.status === 'rented' 
                      ? 'success' 
                      : booking.status === 'pending' 
                        ? 'warning' 
                        : 'error'
                  }
                  size="small"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  if (user?.role !== 'admin') {
    return (
      <Container>
        <Typography variant="h5" color="error" sx={{ mt: 4 }}>
          Access Denied: Admin privileges required
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Pending Bookings" />
          <Tab label="All Bookings" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <PendingBookingsPanel />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <AllBookingsPanel />
      </TabPanel>
    </Container>
  );
};

export default AdminDashboard;
