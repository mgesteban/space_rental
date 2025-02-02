#!/bin/bash

# Exit on any error
set -e

# Update system packages
sudo dnf update -y

# Install Node.js 18
sudo dnf install -y nodejs nodejs-devel gcc-c++ make

# Install Nginx
sudo dnf install -y nginx

# Install development tools
sudo dnf groupinstall -y "Development Tools"
sudo dnf install -y python3

# Start and enable nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Update nginx config
sudo tee /etc/nginx/nginx.conf << EOF
worker_processes  1;

events {
    worker_connections  1024;
    use epoll;
}

http {
    include       mime.types;
    default_type  application/octet-stream;

    sendfile        on;
    keepalive_timeout  65;

    server {
        listen 80;
        server_name _;

        # Serve frontend static files
        location / {
            root /home/ec2-user/space-rental/frontend/build;
            try_files \$uri \$uri/ /index.html;
        }

        # Proxy API requests to backend
        location /api {
            proxy_pass http://localhost:5000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade \$http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host \$host;
            proxy_cache_bypass \$http_upgrade;

            # CORS headers
            add_header 'Access-Control-Allow-Origin' 'http://ec2-3-128-172-245.us-east-2.compute.amazonaws.com' always;
            add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS' always;
            add_header 'Access-Control-Allow-Headers' 'Authorization, Content-Type' always;
            add_header 'Access-Control-Allow-Credentials' 'true' always;

            # Handle OPTIONS method for CORS preflight
            if (\$request_method = 'OPTIONS') {
                add_header 'Access-Control-Allow-Origin' 'http://ec2-3-128-172-245.us-east-2.compute.amazonaws.com' always;
                add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS' always;
                add_header 'Access-Control-Allow-Headers' 'Authorization, Content-Type' always;
                add_header 'Access-Control-Allow-Credentials' 'true' always;
                add_header 'Content-Type' 'text/plain charset=UTF-8';
                add_header 'Content-Length' 0;
                return 204;
            }
        }
    }
}
EOF

# Test and reload nginx
sudo nginx -t
sudo systemctl reload nginx

# Create app directories
mkdir -p /home/ec2-user/space-rental/backend
mkdir -p /home/ec2-user/space-rental/frontend

# Install PM2 globally
sudo npm install -g pm2

# Set PM2 to start on boot
sudo pm2 startup systemd

# Create production environment file template
cat > /home/ec2-user/space-rental/backend/.env << EOF
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://space_rental_user:SpaceRental2024!@space-rental-db.chqogmqkok1p.us-east-2.rds.amazonaws.com:5432/space_rental
# Replace these values with secure secrets from a password manager or secret store
JWT_SECRET=SpaceRental2024!SecureJWTSecret#Production
JWT_EXPIRE=30d
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100
CORS_ORIGIN=["http://ec2-3-128-172-245.us-east-2.compute.amazonaws.com"]
EOF

# Set proper permissions
chmod 600 /home/ec2-user/space-rental/backend/.env
chown ec2-user:ec2-user /home/ec2-user/space-rental/backend/.env

echo "Setup complete! Please update the JWT_SECRET in .env with a secure value."
