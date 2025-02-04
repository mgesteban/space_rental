import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';
import roomRoutes from './routes/roomRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { errorHandler } from './middleware/error.js';
import "reflect-metadata";
export const createServer = () => {
    const app = express();
    // Security middleware
    app.use(helmet());
    // Enable CORS with credentials
    app.use(cors({
        origin: process.env.NODE_ENV === 'production'
            ? JSON.parse(process.env.CORS_ORIGIN || '[]')
            : ['http://localhost:3000'],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }));
    app.use(express.json());
    app.use(hpp());
    // Rate limiting
    const limiter = rateLimit({
        windowMs: 10 * 60 * 1000,
        max: 100 // limit each IP to 100 requests per windowMs
    });
    app.use('/api/', limiter);
    // Routes
    app.use('/api/auth', authRoutes);
    app.use('/api/rooms', roomRoutes);
    // Error handling
    app.use(errorHandler);
    return app;
};
//# sourceMappingURL=app.js.map