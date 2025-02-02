import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { IUser } from '../src/models/User';
import User from '../src/models/User';
import dotenv from 'dotenv';
import { jest, beforeAll, beforeEach, afterAll } from '@jest/globals';

// Load test environment variables
dotenv.config({ path: '.env.test' });

// Increase timeout for Atlas connection
jest.setTimeout(60000);

// Create a mock user and token for testing protected routes
export const mockUser: IUser = {
  _id: new mongoose.Types.ObjectId(),
  name: 'Test Admin',
  email: 'admin@test.com',
  password: 'test1234',
  role: 'admin',
} as IUser;

export const mockToken = jwt.sign(
  { id: mockUser._id },
  process.env.JWT_SECRET as string,
  { expiresIn: '1h' }
);

// Function to create mock user in database
export const createMockUser = async () => {
  const user = new User(mockUser);
  await user.save();
};

// Connect to the test database and set up mock data before running tests
beforeAll(async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in test environment');
    }
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to test database');
    await createMockUser();
    console.log('Created mock user for testing');
  } catch (error) {
    console.error('Failed to connect to test database:', error);
    throw error;
  }
});

// Clear all data and recreate mock user between tests
beforeEach(async () => {
  try {
    if (mongoose.connection.db) {
      const collections = await mongoose.connection.db.collections();
      for (const collection of collections) {
        await collection.deleteMany({});
      }
      // Recreate mock user for next test
      await createMockUser();
    }
  } catch (error) {
    console.error('Failed to reset test database:', error);
    throw error;
  }
});

// Cleanup after all tests
afterAll(async () => {
  try {
    await mongoose.disconnect();
    console.log('Disconnected from test database');
  } catch (error) {
    console.error('Failed to cleanup test database:', error);
  }
});
