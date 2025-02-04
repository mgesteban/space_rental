# Deployment Issues and Analysis

## Current Environment
1. EC2 Instance:
   - Host: ec2-3-128-172-245.us-east-2.compute.amazonaws.com
   - Operating System: Amazon Linux 2 (confirmed by yum package manager)
   - SSH Key: space-rental-backend-key.pem

2. Project Setup:
   - Frontend: React with TypeScript
   - Backend: Node.js with TypeScript
   - Database: PostgreSQL
   - Package Manager: npm
   - Module System: ES Modules (package.json "type": "module")

## Critical Issues

### 1. Module System Inconsistency

#### Configuration Conflicts
1. Package.json:
   ```json
   {
     "type": "module"
   }
   ```

2. TypeScript Configuration (tsconfig.json):
   ```json
   {
     "compilerOptions": {
       "module": "commonjs",
       "target": "es2018",
       "moduleResolution": "node"
     }
   }
   ```

3. Affected Files:
   - backend/src/scripts/syncDatabase.js (using require)
   - backend/src/scripts/createInitialUsers.js (using import)
   - backend/src/config/database.ts (using import)

#### Root Causes
1. Mixed Module Systems:
   - package.json declares ES Modules
   - TypeScript compiles to CommonJS
   - Scripts use mixed import styles

2. TypeScript Configuration Issues:
   - Using older target (es2018)
   - Using CommonJS module system
   - Node-style module resolution

3. Build Process Issues:
   - TypeScript output doesn't match runtime expectations
   - File extensions missing in imports
   - Path resolution differences between dev and prod

### 2. Operating System Configuration Mismatch
- deploy-setup.sh using amazon-linux-extras which is not available in Amazon Linux 2023
- Package conflicts between Node.js versions (system vs nodesource)
- PostgreSQL version mismatch (using PostgreSQL 14 commands for PostgreSQL 15)
- Incorrect PostgreSQL data directory paths (/var/lib/pgsql/data vs /var/lib/pgsql/15/data)
- PostgreSQL service name mismatch (postgresql vs postgresql-15)

#### Amazon Linux 2023 Specific Issues (February 1, 2025)
1. Package Management:
   - amazon-linux-extras command not available in AL2023
   - Need to use dnf instead of yum
   - Module conflicts with Node.js installation
   - PostgreSQL repository configuration different from AL2

2. PostgreSQL 15 Setup:
   - Different data directory structure
   - Different initialization command
   - Different service names
   - Different authentication configuration paths

3. Required Changes:
   - Replace amazon-linux-extras with dnf
   - Use postgresql15 packages instead of postgresql
   - Update PostgreSQL paths and commands for version 15
   - Handle Node.js module conflicts with dnf

### 3. Database Migration to AWS RDS ✅
- Previous Setup: Local PostgreSQL on EC2 instance (Resolved)
- New Setup: AWS RDS PostgreSQL instance

#### Migration Complete (February 1, 2025 4:25 PM)
1. RDS Instance Details:
   - Identifier: space-rental-db
   - Engine: PostgreSQL 15.10
   - Instance Class: db.t3.micro (1 vCPU, 1GB RAM)
   - Storage: 20GB
   - Endpoint: space-rental-db.chqogmqkok1p.us-east-2.rds.amazonaws.com
   - Port: 5432
   - Master Username: space_rental_user
   - Master Password: SpaceRental2024!
   - Database Name: space_rental

2. Benefits Achieved:
   - Managed database service with automated maintenance
   - Automated backups with 7-day retention
   - Enhanced monitoring enabled
   - Publicly accessible for development
   - Integrated with default VPC security groups

3. Security Configuration (February 1, 2025 4:44 PM):
   - Created IAM policy "SpaceRentalRDSAccess" with enhanced permissions:
     * RDS instance and parameter group management
     * EC2 security group management
     * Service-linked role management
     * Parameter group operations
   - Configured security group sg-0df4c79ef716f5a87:
     * Added inbound rule for PostgreSQL (port 5432)
     * Restricted access to specific IP (99.117.98.251/32)
     * Rule ID: sgr-0bd419debd6a8168f
   - Created custom parameter group "space-rental-params":
     * Based on postgres15 family
     * Configured for password authentication
     * Applied to RDS instance

4. Connection Configuration:
   - Database endpoint: space-rental-db.chqogmqkok1p.us-east-2.rds.amazonaws.com
   - Port: 5432
   - SSL/TLS encryption enabled (TLSv1.2)
   - Cipher: ECDHE-RSA-AES256-GCM-SHA384
   - Connection string:
     ```
     postgresql://space_rental_user:SpaceRental2024!@space-rental-db.chqogmqkok1p.us-east-2.rds.amazonaws.com:5432/space_rental
     ```

5. Current Status:
   - RDS instance status: available
   - Parameter group: applying changes
   - Security group: configured for specific IP
   - IAM permissions: updated for parameter group management

6. Next Steps:
   - Wait for parameter group changes to take effect
   - Test database connection with new settings
   - Run schema synchronization
   - Create initial users and data
   - Set up CloudWatch monitoring
   - Plan for production security hardening

### 4. Database Connection Issues (February 2, 2025)
1. Connection Timeout (RESOLVED ✅):
   - Issue: `ETIMEDOUT` when trying to connect to RDS instance
   - Root cause: Security group rules needed updating
   - Resolution:
     * Updated RDS security group to allow inbound traffic from EC2
     * Verified VPC settings and routing
     * Confirmed RDS endpoint resolution from EC2
     * Successfully established database connection

2. Database Schema and Data (COMPLETED ✅):
   - Successfully synchronized database schema
   - Initial users already present and working
   - Created and executed room seeding script:
     * Added 5 rooms with proper details
     * Included equipment information
     * Linked to correct image paths
     * Set proper status and capacity
   - Verified data through API endpoint tests

3. Environment Configuration (COMPLETED ✅):
   - Moved database credentials to .env file
   - Updated database configuration to use environment variables
   - Added SSL configuration with `rejectUnauthorized: false` for development
   - Successfully tested database connection with new configuration

3. Node.js Installation Resolution:
   - Previous issue: Conflicts with existing Node.js packages on Amazon Linux 2023
   - Solution implemented:
     * Removed complex Node.js uninstallation steps
     * Simplified installation using native package manager
     * Updated deploy-setup.sh to use `dnf install -y nodejs nodejs-devel gcc-c++ make`
     * Successfully installed Node.js 18 without conflicts

4. Environment Configuration Updates:
   - Updated production environment to use RDS database:
     ```
     DATABASE_URL=postgresql://space_rental_user:SpaceRental2024!@space-rental-db.chqogmqkok1p.us-east-2.rds.amazonaws.com:5432/space_rental
     ```
   - Set secure JWT secret for production
   - Updated CORS settings for EC2 domain
   - Configured PM2 for production deployment

### 4. Previous Database Setup Issues
- PostgreSQL initialization failing
- Database user creation not properly handled
- Connection issues (IPv4/IPv6)
- Schema synchronization failing due to module system issues
- TypeORM circular dependency issues in entity relationships

#### Entity Relationship Fixes (February 1, 2025)
1. Issue:
   - Circular dependencies between User, Room, and Booking entities
   - Runtime error: "Cannot access 'User' before initialization"
   - ES Modules strict initialization order causing problems

2. Solution:
   - Converted entity relationships to use string-based references
   - Updated relationship decorators:
     * Changed `@ManyToOne(() => Entity)` to `@ManyToOne('Entity')`
     * Changed `@OneToMany(() => Entity)` to `@OneToMany('Entity')`
   - Changed entity imports to use `type` imports
   - Affected files:
     * User.ts: Changed OneToMany relationship to Booking
     * Room.ts: Changed OneToMany relationship to Booking
     * Booking.ts: Changed ManyToOne relationships to User and Room

3. Benefits:
   - Avoids TypeORM circular dependency issues
   - Better compatibility with ES Modules
   - Cleaner type imports
   - More reliable entity initialization

### 4. File Permission Issues
- SSH key permissions
- Application file ownership and permissions
- Directory structure permissions

### 5. Environment Configuration
- CORS settings need updating for correct hostname
- Environment variables not properly set
- Production vs Development settings

## Required Actions

### 1. Module System Analysis

#### Current Setup
- package.json has "type": "module"
- TypeScript files using ES Module imports/exports
- Some scripts using CommonJS require/exports

#### ES Modules Considerations
- Pros:
  - Modern JavaScript standard
  - Better static analysis
  - Better tree-shaking
  - Native async imports
  - TypeScript has better support for ES Modules
  - Frontend already using ES Modules

- Cons:
  - Some older Node.js packages might not support ES Modules
  - Need .js extension in import paths
  - __dirname and __filename not available by default
  - Different error handling for dynamic imports

#### Affected Components
1. Database Scripts:
   - syncDatabase.js
   - createInitialUsers.js
   - Need to handle __dirname for file paths

2. TypeORM Configuration:
   - database.ts using ES imports
   - TypeORM supports both module systems
   - No major conflicts expected

3. Node.js Scripts:
   - PM2 supports ES Modules
   - Node.js v18+ has stable ES Modules support
   - Need to update file extensions in imports

4. Dependencies Analysis:
   - Core Dependencies:
     * express@4.21.2 - Full ES Module support
     * typeorm@0.3.20 - Full ES Module support
     * pg@8.13.1 - Full ES Module support
     * bcryptjs@2.4.3 - Supports both module systems
     * jsonwebtoken@9.0.2 - Supports both module systems
     * dotenv@16.4.7 - Full ES Module support
     * cors@2.8.5 - Full ES Module support
     * helmet@8.0.0 - Full ES Module support

   - Development Dependencies:
     * typescript@4.9.5 - Supports ES Module output
     * ts-node@10.9.2 - Supports ES Module
     * nodemon@3.1.9 - Supports ES Module
     * jest@28.1.3 - Requires additional configuration for ES Modules

   - Potential Issues:
     * jest configuration needs updating for ES Modules
     * ts-node may need additional flags for ES Module support
     * TypeScript configuration needs module: "NodeNext" for proper ES Module support

#### Decision
- Continue with ES Modules because:
  1. It's the future standard
  2. Better TypeScript integration
  3. Frontend already uses it
  4. All major dependencies support it
  5. Node.js v18+ has stable support

#### Required Changes
- [x] Update TypeScript Configuration:
     ```json
     {
       "compilerOptions": {
         "module": "NodeNext",
         "moduleResolution": "NodeNext",
         "target": "ES2022",
         "outDir": "./dist",
         "rootDir": "./src",
         "allowJs": true,
         "checkJs": true,
         "declaration": true,
         "sourceMap": true,
         "esModuleInterop": true,
         "resolveJsonModule": true
       }
     }
     ```

#### Progress (February 1, 2025)
1. Module System Standardization:
   - ✅ Updated tsconfig.json for ES Modules
   - ✅ Fixed syncDatabase.js to use ES Module imports
   - ✅ Updated database.ts with proper ES Module exports and imports
   - ✅ Verified createInitialUsers.js ES Module compatibility
   - ✅ Added .js extensions to all TypeScript imports
   - ✅ Fixed default export issue in database.ts
   - ✅ Updated index.ts to use named imports
   - ✅ Successfully compiled TypeScript with ES Module configuration
   - ✅ Created proper type definitions with separation of concerns
   - ✅ Successfully ran database synchronization script

2. Next Module-Related Tasks:
   - ✅ Run createInitialUsers script (February 1, 2025)
     * Successfully created admin and test users
     * Cleaned up duplicate users
     * Only kept admin@spacerentalmagneo.com and user@spacerentalmagneo.com
   - ✅ Configure development environment for ES Modules
     * Updated ts-node configuration for ESM support
     * Fixed nodemon configuration
     * Successfully running development server
   - [ ] Test user authentication flow
   - [ ] Update deployment scripts for ES Modules
   - [ ] Test database scripts in production environment
   - [ ] Verify PM2 ES Module compatibility
   - [ ] Test full application startup in production mode

3. Type System Improvements:
   - ✅ Separated runtime entities from type definitions
   - ✅ Created dedicated user.ts for type interfaces
   - ✅ Updated express.d.ts to use proper type imports
   - ✅ Fixed circular dependency issues in type imports

- [ ] Update Script Files:
     * Convert require() to import statements
     * Add .js extensions to all import paths
     * Replace __dirname with import.meta.url
     * Update dynamic imports to use URL paths

- [ ] Update Jest Configuration:
     * Add transform configuration for ES Modules
     * Update test file extensions
     * Configure proper module resolution

- [ ] Update Build Process:
     * Ensure tsc preserves ES Module syntax
     * Update build scripts for proper module resolution
     * Add proper file extensions in compiled output

- [ ] Update Deployment Scripts:
     * Ensure PM2 configuration supports ES Modules
     * Update any script execution commands
     * Fix path resolutions in production

### 2. Operating System Configuration
- [x] Update deploy-setup.sh for Amazon Linux 2:
     * Replaced zypper with yum/amazon-linux-extras
     * Updated Node.js 18 installation
     * Updated PostgreSQL 14 installation
     * Updated Nginx installation
- [x] Correct package installation commands:
     * Added EPEL repository
     * Added proper PostgreSQL dependencies
     * Updated development tools installation
- [x] Fix service initialization:
     * Updated PostgreSQL initialization for Amazon Linux 2
     * Maintained Nginx configuration but updated installation
     * Added proper service enabling and starting
- [ ] Test service configurations:
     * Verify PostgreSQL authentication
     * Test Nginx configuration
     * Verify Node.js version
     * Check PM2 startup configuration

### 3. Database Setup
- [x] Correct PostgreSQL installation for Amazon Linux 2:
     * Using amazon-linux-extras for PostgreSQL 14
     * Installing required dependencies
     * Proper initialization with postgresql-setup

- [ ] Fix PostgreSQL Authentication Chain:
     * Issue: Complex authentication flow causing failures
     * Root Causes:
       - PostgreSQL using 'peer' authentication by default
       - Mismatch between sudo privileges and PostgreSQL authentication
       - Circular dependency in authentication setup
       - Existing database initialization blocking fresh setup

     * Understanding pg_hba.conf (Host-Based Authentication):
       - pg_hba.conf is PostgreSQL's client authentication configuration file
       - Controls how PostgreSQL authenticates different connection types:
         * Local socket connections (Unix domain sockets)
         * TCP/IP connections (both IPv4 and IPv6)
         * Different databases and users
       - Default authentication methods:
         * 'peer': Uses operating system's user credentials (problematic for Node.js apps)
         * 'ident': Similar to peer but for TCP/IP connections
         * 'md5': Password-based authentication (what we need)
         * 'scram-sha-256': More secure password authentication
       - Why it's critical:
         * Wrong authentication method = connection failures
         * Security implications if configured incorrectly
         * Different methods needed for different connection types
         * Must be configured before database operations

     * Required Actions:
       - Handle initial postgres user authentication properly
       - Configure pg_hba.conf before attempting database operations:
         * Backup original pg_hba.conf
         * Replace 'peer' and 'ident' with 'md5'
         * Allow password authentication for local connections
         * Allow password authentication for TCP/IP connections
         * Restart PostgreSQL to apply changes
       - Ensure proper user context for PostgreSQL commands
       - Consider complete database reinitialization if needed

- [ ] Fix database initialization script:
     * Ensure proper authentication method is set before user creation
     * Handle existing database state properly
     * Create user with correct authentication method
     * Set up proper ownership and permissions

- [ ] Update connection configuration:
     * Configure authentication for different connection types:
       - Local socket connections (peer/ident)
       - TCP/IP connections (md5/scram-sha-256)
     * Handle both superuser and application user authentication
     * Ensure proper restart after configuration changes

- [ ] Fix schema synchronization:
     * Ensure TypeORM can connect with proper credentials
     * Verify entity relationships after circular dependency fix
     * Test schema creation with proper permissions
     * Validate connection string format and parameters

### 4. Deployment Script
- [ ] Update deploy.sh with correct paths
- [ ] Fix file copying and permissions
- [ ] Add proper error handling
- [ ] Add deployment verification

### 5. Environment Configuration
- [ ] Update CORS settings
- [ ] Set correct environment variables
- [ ] Configure proper production settings
- [ ] Update API endpoints

## Next Steps
1. Choose and implement consistent module system
2. Update OS-specific configurations
3. Fix database setup and initialization
4. Update deployment scripts
5. Test deployment process
