
# FoosBuddy - Table Football Management App

FoosBuddy is a full-stack application for managing table football (foosball) leagues, tournaments, players, and matches.

## Features

- Create and manage foosball leagues
- Organize tournaments with different formats
- Register players and track their stats
- Schedule and record match results
- View leaderboards and player rankings

## Tech Stack

- Frontend: React, TypeScript, Tailwind CSS, Shadcn UI
- Backend: Express.js with hardcoded data (no database required)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install frontend dependencies:
   ```
   npm install
   ```
3. Install backend dependencies:
   ```
   cd server
   npm install
   ```

### Running the Application

1. Start the backend server:
   ```
   cd server
   npm run dev
   ```
   The server will run on http://localhost:5000

2. In a separate terminal, start the frontend:
   ```
   npm run dev
   ```
   The frontend will be available at http://localhost:5173

## API Endpoints

### Leagues
- GET `/api/leagues` - Get all leagues
- GET `/api/leagues/:id` - Get league by ID
- POST `/api/leagues` - Create a new league

### Tournaments
- GET `/api/tournaments` - Get all tournaments
- GET `/api/tournaments/:id` - Get tournament by ID
- POST `/api/tournaments` - Create a new tournament

### Players
- GET `/api/players` - Get all players
- GET `/api/players/:id` - Get player by ID
- POST `/api/players` - Register a new player

### Matches
- GET `/api/matches` - Get all matches
- GET `/api/matches/upcoming` - Get upcoming matches
- GET `/api/matches/recent` - Get recent matches
- GET `/api/matches/:id` - Get match by ID
- POST `/api/matches` - Schedule a new match
- PUT `/api/matches/:id/result` - Record match result

## License

This project is available under the MIT License.
