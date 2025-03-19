# Journaling App

## Setup

Ensure you have the following requirements:

- Docker/Docker Compose
- Python 3.12+
- Poetry 2.0+
- Node 21.0+

### Frontend

The frontend is powered by NextJS. To run the frontend in development:

- `cd frontend`
- `npm run dev`
- Open `http://localhost:3000` on your browser

### Backend

The backend is powered by FastAPI, PostgreSQL and run in Docker. To start the application:

- Run `docker compose up -d`
