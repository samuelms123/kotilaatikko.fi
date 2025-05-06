# Kotilaatikko Project Starter

Online food package delivery platform built with React. Enables users to browse and purchase site admin authored mail order meal packages.

This project serves as a useful template for food package delivery sites.

Link to questionnaire: https://docs.google.com/forms/d/14uSWWsobukuv93JEH9IMoyOi6ki6zYq_qvagdybfYO4/edit?pli=1 (requires Metropolia user)

## Features

- Front page with animated hero, meal packages carousel, newsletter subscription and contact info
- Store view with dynamic meal package listing
- Single store item viewing
- User registration and profile
- Content management system for admin users:
  - Add/remove meal packages to DB. Controls to add ingredients, place meal in a category, include image
  - Add/remove ingredients and categories from DB
  - Newsletter creation and management
  - Track incoming orders made by users, view order information

## Getting Started

In this guide, you will set up a back- and frontend on a virtual machine.

### Prerequisites

Your virtual machine should have these installed:

- Node.js (v14 or higher)
- nginx
- npm (v6 or higher)
- pm2

### Installation

#### Frontend setup

1. Git clone the whole project onto your VM home folder
   
```bash
git clone https://github.com/mehiis/react-project
```

2. Make a .env file inside /frontend/:

```bash
touch .env
```
2.1 Edit the .env to include:

```bash
VITE_AUTH_API=http://yourIpHere:80/api/v1

VITE_IMG_SERVE_URL=htt://yourIpHere:80

VITE_BASE_URL_/127.0.0.1/
```

3. Make sure your vite.config.js has the correct base path you want (most likely "/" in this case)

4. Build the frontend inside react-project/frontend/:

```bash
npm run build
```

5. Next, setup etc/nginx/conf.d/api.conf. Use your VM's IP instead of 10.120.32.65

```bash
server {
    listen 80;
    server_name 10.120.32.65;

    # Root directory for frontend
    root /home/!!!yourusername!!!/react-project/frontend/dist;
    index index.html;

    # Static assets (JS, CSS, images)
    location /assets/ {
        try_files $uri =404;
        # Cache control for assets
        expires 1y;
        add_header Cache-Control "public";
    }

    # Vite-specific files
    location /vite.svg {
        try_files $uri =404;
    }

    # API endpoint
    location /api/v1/ {
        proxy_pass http://localhost:8080/api/v1/;
    }

    # Uploads directory
    location /uploads/ {
        alias /home/!!!yourusername!!!/react-project/backend/public/uploads/;
        try_files $uri $uri/ =404;
    }

    # phpMyAdmin
    location /phpMyAdmin/ {
        proxy_pass http://localhost:8080/phpMyAdmin/;
    }

    # Main entry point - handle client-side routing
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

6. Point your VITE_IMG_SERVE_URL in .env to your backend IP where you serve images

#### Virtual Machine Setup / Backend

1. Clone the repository onto your VM:

```bash
git clone https://github.com/mehiis/react-project.git
```

2. Navigate to the project backend directory

```bash
cd react-project
```

3. Install dependencies:

```bash
npm i
```

4. Configure .env file in react-project/backend to match the provided example .env
