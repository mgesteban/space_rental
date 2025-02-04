import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { User } from '../models/User.js';
import { Room } from '../models/Room.js';
import { Booking } from '../models/Booking.js';
dotenv.config();
export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'space_rental',
    ssl: {
        rejectUnauthorized: false
    },
    synchronize: process.env.NODE_ENV === 'development',
    logging: process.env.NODE_ENV === 'development',
    entities: [User, Room, Booking],
    migrations: [],
    subscribers: [],
    extra: {
        // Enable both IPv6 and IPv4 with proper fallback
        family: 0,
        poolSize: 10,
        connectionTimeoutMillis: 0,
    },
});
export const connectDB = async () => {
    try {
        await AppDataSource.initialize();
        console.log('PostgreSQL Connected');
    }
    catch (error) {
        console.error('Error connecting to PostgreSQL:', error);
        process.exit(1);
    }
};
//# sourceMappingURL=database.js.map