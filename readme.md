# Axpo Auction App

Axpo Auction is a full-stack auction application built with a Node.js and Express backend, and a Next.js frontend.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication and authorization
- Create, edit, and delete auctions
- Real-time bidding
- User profiles
- Auction history

## Tech Stack

**Frontend:**

- Next.js
- TypeScript
- SCSS

**Backend:**

- Node.js
- Express
- PostgreSQL

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ashishume/Axpo-Auction.git
   cd Axpo-Auction
   ```

## Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up PostgreSQL (locally):

   - Ensure PostgreSQL is installed and running.
   - Create a `.env` file in the `backend` directory with the following content:
     ```
     DB_USER=your_username
     DB_HOST=localhost
     DB_DATABASE=your_database
     DB_PASSWORD=your_password
     DB_PORT=5432
     ```
   - OR You can setup postgres from supabase (https://supabase.com/) and paste the url in the connection string


4. Start the server:
   ```bash
   npm start
   ```

The backend server should now be running on `http://localhost:7000`.

## Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd ../frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```


3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend should now be running on `http://localhost:3000`.

## Usage

1. Open your browser and go to `http://localhost:3000`.
2. Register a new user or log in with an existing account.
3. Create, view, and participate in auctions.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes.
4. Commit your changes:
   ```bash
   git commit -m 'Add some feature'
   ```
5. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
6. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
