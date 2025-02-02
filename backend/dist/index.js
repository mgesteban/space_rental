import { createServer } from './app.js';
import { connectDB, AppDataSource } from './config/database.js';
import dotenv from 'dotenv';
dotenv.config();
const startServer = async () => {
    try {
        // Connect to PostgreSQL using TypeORM
        await connectDB();
        const app = createServer();
        const PORT = Number(process.env.PORT) || 5000;
        // Enable dual-stack (IPv6 + IPv4) support
        const server = app.listen(PORT, () => {
            const address = server.address();
            console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
            if (address && typeof address === 'object') {
                console.log(`Listening on ${address.address}:${address.port}`);
            }
        });
        // Handle server errors
        server.on('error', (error) => {
            if (error.syscall !== 'listen') {
                throw error;
            }
            // Handle specific listen errors
            switch (error.code) {
                case 'EACCES':
                    console.error(`Port ${PORT} requires elevated privileges`);
                    process.exit(1);
                    break;
                case 'EADDRINUSE':
                    console.error(`Port ${PORT} is already in use`);
                    process.exit(1);
                    break;
                default:
                    throw error;
            }
        });
        // Graceful shutdown
        const shutdown = async () => {
            console.log('Shutting down gracefully...');
            server.close(async () => {
                try {
                    await AppDataSource.destroy();
                    console.log('Database connections closed.');
                    process.exit(0);
                }
                catch (err) {
                    console.error('Error during shutdown:', err);
                    process.exit(1);
                }
            });
        };
        process.on('SIGTERM', shutdown);
        process.on('SIGINT', shutdown);
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};
// Handle uncaught errors
process.on('unhandledRejection', (error) => {
    console.error('Unhandled rejection:', error);
});
process.on('uncaughtException', (error) => {
    console.error('Uncaught exception:', error);
    process.exit(1);
});
startServer();
//# sourceMappingURL=index.js.map