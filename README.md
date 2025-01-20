# Space Rental Application

A modern web application for managing room rentals with user authentication, booking system, and administrative features. The application allows users to browse available rooms, make bookings, and download necessary forms, while providing administrators with tools to manage bookings and room availability.

## Features

### User Features
- 🏢 Browse available rooms with detailed information
- 📅 Interactive booking calendar
- 📝 Form downloads (internal/external use)
- 👤 User authentication system
- 📊 Booking history and status tracking

### Admin Features
- 📋 Booking management dashboard
- ✅ Approve/reject booking requests
- 🔄 Update room availability status
- 👥 Role-based access control
- 📈 Booking overview and tracking

### Room Management
- 🖼️ Visual room previews with images
- 📋 Detailed room specifications
- 🎯 Real-time availability status
- 💡 Equipment and capacity details
- 📊 Booking status indicators

## Tech Stack

### Frontend
- React 18.2.0
- TypeScript
- Material-UI (@mui/material)
- React Router
- date-fns for date handling

### Development Tools
- Node.js
- npm package manager
- Git version control

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository
```bash
git clone [repository-url]
cd space_rental
```

2. Install frontend dependencies
```bash
cd frontend
npm install
```

3. Start the development server
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Usage Guide

### Regular Users

1. **Registration/Login**
   - Create a new account or login with existing credentials
   - Regular users should use standard email format

2. **Browsing Rooms**
   - View available rooms on the home page
   - Click on rooms for detailed information
   - Check room capacity, equipment, and availability

3. **Making Bookings**
   - Select desired date and time
   - Choose between internal/external form types
   - Submit booking request
   - Track booking status

4. **Forms**
   - Download appropriate forms based on booking type
   - Fill out forms according to guidelines
   - Submit forms with booking request

### Administrators

1. **Admin Access**
   - Login with admin credentials (email containing 'admin')
   - Access additional admin features through navigation menu

2. **Managing Bookings**
   - View pending bookings in admin dashboard
   - Approve or reject booking requests
   - Track all bookings across the system

3. **Room Management**
   - Update room availability status
   - Monitor room usage and bookings
   - Manage booking conflicts

## Testing

### User Testing
1. Regular User:
   - Register/login with standard email
   - Test room browsing and booking features
   - Download and verify forms

2. Admin User:
   - Login with email containing 'admin'
   - Test booking management features
   - Verify admin-only access restrictions

### Component Testing
- Room display and interaction
- Booking calendar functionality
- Form downloads
- Authentication system
- Admin dashboard features

## Project Structure

```
frontend/
├── public/              # Static files
├── src/
│   ├── components/     # React components
│   │   ├── admin/     # Admin features
│   │   ├── auth/      # Authentication
│   │   ├── bookings/  # Booking system
│   │   ├── forms/     # Form handling
│   │   ├── rooms/     # Room management
│   │   └── navigation/# Navigation components
│   ├── types/         # TypeScript definitions
│   └── data/          # Sample data
└── package.json        # Dependencies
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
