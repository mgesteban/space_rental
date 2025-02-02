import { AppDataSource } from '../config/database.js';
import { Room } from '../models/Room.js';
const createInitialRooms = async () => {
    try {
        await AppDataSource.initialize();
        console.log('Connected to database');
        const rooms = [
            {
                name: 'Conference Room A',
                capacity: 20,
                equipment_details: 'Projector, Video conferencing system, Whiteboard, High-speed internet',
                status: 'available',
                imageUrl: '/images/conference-room-a.jpg'
            },
            {
                name: 'Meeting Room B',
                capacity: 10,
                equipment_details: 'Smart TV, Video conferencing system, Whiteboard, High-speed internet',
                status: 'available',
                imageUrl: '/images/meeting-room-b.jpg'
            },
            {
                name: 'Training Room C',
                capacity: 30,
                equipment_details: 'Multiple projectors, Audio system, Training computers, Whiteboards',
                status: 'available',
                imageUrl: '/images/training-room-c.jpg'
            },
            {
                name: 'Board Room D',
                capacity: 15,
                equipment_details: 'Executive furniture, Large display, Video conferencing, Premium audio system',
                status: 'available',
                imageUrl: '/images/board-room-d.jpg'
            },
            {
                name: 'Collaboration Space E',
                capacity: 12,
                equipment_details: 'Interactive displays, Modular furniture, Collaboration tools, High-speed internet',
                status: 'available',
                imageUrl: '/images/collaboration-space-e.jpg'
            }
        ];
        for (const roomData of rooms) {
            const room = new Room();
            Object.assign(room, roomData);
            await AppDataSource.manager.save(room);
            console.log(`Created room: ${room.name}`);
        }
        console.log('Initial rooms created successfully');
        await AppDataSource.destroy();
        process.exit(0);
    }
    catch (error) {
        console.error('Error creating initial rooms:', error);
        process.exit(1);
    }
};
createInitialRooms();
//# sourceMappingURL=createInitialRooms.js.map