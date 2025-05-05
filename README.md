# Kotilaatikko Project Starter

Online food package delivery platform built with React. Enables users to browse and purchase site admin authored mail order meal packages.

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

### Prerequisites

Access to Metropolia webdisk:

- [https://webdisk.metropolia.fi/htcomnet/login.html]

Your virtual machine should have these installed:

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

#### Frontend setup

1. Build the frontend:

```bash
npm build
```

2. Upload site to [https://webdisk.metropolia.fi/htcomnet/login.html]

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
