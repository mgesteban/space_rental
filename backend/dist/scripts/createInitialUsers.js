import { AppDataSource } from '../config/database.js';
import { User } from '../models/User.js';
import bcrypt from 'bcryptjs';
const createInitialUsers = async () => {
    try {
        await AppDataSource.initialize();
        console.log('Connected to database');
        // Create admin user
        const adminUser = new User();
        adminUser.email = 'admin@spacerentalmagneo.com';
        adminUser.name = 'Admin User';
        adminUser.role = 'admin';
        adminUser.password = await bcrypt.hash('MagNeoHelp145#', 10);
        // Create test user
        const testUser = new User();
        testUser.email = 'user@spacerentalmagneo.com';
        testUser.name = 'Test User';
        testUser.role = 'user';
        testUser.password = await bcrypt.hash('MagNeoHelp145#', 10);
        // Save users
        await AppDataSource.manager.save([adminUser, testUser]);
        console.log('Initial users created successfully');
        // Close the connection
        await AppDataSource.destroy();
        console.log('Database connection closed');
        process.exit(0);
    }
    catch (error) {
        console.error('Error creating initial users:', error);
        process.exit(1);
    }
};
createInitialUsers();
//# sourceMappingURL=createInitialUsers.js.map