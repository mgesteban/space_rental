import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { 
  ThemeProvider, 
  createTheme, 
  CssBaseline,
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
  IconButton
} from '@mui/material';
import NavigationMenu from './components/navigation/NavigationMenu';
import './App.css';
import RoomList from './components/rooms/RoomList';
import RoomDetail from './components/rooms/RoomDetail';
import { Room } from './types/room';
import { AuthProvider } from './components/auth/AuthContext';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminRoute from './components/auth/AdminRoute';
import UserMenu from './components/auth/UserMenu';
import FormsPage from './components/forms/FormsPage';
import AdminDashboard from './components/admin/AdminDashboard';

// Sample room data
const sampleRooms: Room[] = [
  {
    id: '1',
    name: 'Conference Room A',
    capacity: 30,
    equipment_details: 'Projector, Video conferencing system, Whiteboard',
    status: 'maintenance',
    imageUrl: 'images/conference-room-a.jpg'
  },
  {
    id: '2',
    name: 'Meeting Room B',
    capacity: 15,
    equipment_details: 'Smart TV, Whiteboard, Conference phone',
    status: 'unavailable',
    imageUrl: 'images/meeting-room-b.jpg'
  },
  {
    id: '3',
    name: 'Training Room C',
    capacity: 50,
    equipment_details: 'Dual projectors, Audio system, Multiple whiteboards',
    status: 'available',
    imageUrl: 'images/training-room-c.jpg'
  },
  {
    id: '4',
    name: 'Board Room D',
    capacity: 20,
    equipment_details: 'Interactive display, Video conferencing, Premium audio',
    status: 'available',
    imageUrl: 'images/board-room-d.jpg'
  },
  {
    id: '5',
    name: 'Collaboration Space E',
    capacity: 25,
    equipment_details: 'Flexible furniture, Multiple displays, Brainstorming tools',
    status: 'available',
    imageUrl: 'images/collaboration-space-e.jpg'
  }
];

// Material-UI theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#2c3e50',
      light: '#3e5871',
      dark: '#1a252f',
    },
    secondary: {
      main: '#e74c3c',
      light: '#eb6b5e',
      dark: '#a13529',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    h1: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

const AppContent: React.FC = () => {
  const [rooms] = useState<Room[]>(sampleRooms);
  const navigate = useNavigate();

  const handleRoomSelect = (room: Room) => {
    navigate(`/room/${room.id}`);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static" elevation={0}>
        <Container maxWidth="lg">
          <Toolbar sx={{ py: 2, px: 0 }}>
            <NavigationMenu />
            <Typography variant="h4" component="h1" sx={{ flexGrow: 1, fontWeight: 600 }}>
              Space Rental
            </Typography>
            <UserMenu />
          </Toolbar>
        </Container>
      </AppBar>
      <Box component="main" sx={{ py: 6 }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <RoomList rooms={rooms} onRoomSelect={handleRoomSelect} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/room/:id"
            element={
              <ProtectedRoute>
                <RoomDetail rooms={rooms} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/forms"
            element={
              <ProtectedRoute>
                <FormsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
        </Routes>
      </Box>
    </Box>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppContent />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
