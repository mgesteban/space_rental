import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import RoomCard from './RoomCard';
import { Room } from '../../types/room';

interface RoomListProps {
  rooms: Room[];
  onRoomSelect: (room: Room) => void;
}

const RoomList: React.FC<RoomListProps> = ({ rooms, onRoomSelect }) => {
  return (
    <Container maxWidth="lg" sx={{ py: 6, px: { xs: 2, sm: 3, md: 4 } }}>
      <Typography 
        variant="h4" 
        component="h2" 
        sx={{ 
          mb: 4, 
          fontWeight: 500,
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}
      >
        <Box 
          component="span" 
          sx={{ 
            width: 4, 
            height: 32, 
            backgroundColor: 'primary.main',
            display: 'inline-block',
            borderRadius: 1,
            mr: 2
          }} 
        />
        Available Rooms
      </Typography>
      {rooms.length === 0 ? (
        <Typography variant="h6" align="center" sx={{ mt: 8, mb: 8 }}>
          No rooms available at the moment.
        </Typography>
      ) : (
        <Box 
          sx={{ 
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)'
            },
            gap: 4,
            mt: 4
          }}
        >
          {rooms.map((room) => (
            <Box key={room.id}>
              <RoomCard room={room} onSelect={onRoomSelect} />
            </Box>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default RoomList;
