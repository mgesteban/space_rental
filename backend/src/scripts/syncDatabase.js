import { AppDataSource } from '../config/database.js';

const syncDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Connected to database');

    // Synchronize database schema
    await AppDataSource.synchronize();
    console.log('Database schema synchronized successfully');

    // Close the connection
    await AppDataSource.destroy();
    console.log('Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error synchronizing database:', error);
    process.exit(1);
  }
};

syncDatabase();
