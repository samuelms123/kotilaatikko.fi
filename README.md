# Kotilaatikko Project Starter

Online food package delivery platform built with React.

## Features

- Front page with carousel, newsletter subscription and contact info
- User registration and profile
- Store view that uses backend MariaDB to fetch meals
- Backend that handles food orders through KlarnaAPI (playground)
- Content management system for admin users:
  - Add/remove meal packages to DB
  - Newsletter creation and management
  - Track incoming orders made by users

## Getting Started

### Prerequisites

Your virtual machine should have these installed:

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/mehiis/react-project.git
```

2. Navigate to the project directory

```bash
cd react-project
```

3. Install dependencies:

```bash
npm install
```

4. Install ngrok for https tunneling if your virtual machine is running inside a local network only:

```bash
npm install @ngrok/ngrok
```

5. Configure .env file in react-project/backend to match the provided example .env
