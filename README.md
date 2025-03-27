# Journaling App

Journaling App powered by NextJS, ExpressJS and MySQL. For more info view the [system document](https://docs.google.com/document/d/10MMZZwDfa4RkFFTh8tjPsckxutnnsm-uubhyyKeEXjE/edit?usp=sharing)

## Setup

Ensure you have the following requirements:

- Docker/Docker Compose
- Node 21.0+

## Backend

The backend is powered by ExpressJS & MySQL. To start the application:

- Run `docker compose up -d`
- Open `http://localhost:8000` to confirm status

The API endpoints are as follows:

- _Journal_: Handles all journal & category CRUD

  - `/api/v1/journal`: Journal
  - `/api/v1/categories`: Journal

- _Auth_: Handles user registration, login & account CRUD
  - `/api/v1/auth/users`

## Frontend

The frontend is powered by NextJS. To run the frontend in development, ensure the backend in the previous section is running:

- `cd frontend`
- `npm install`
- `npm run dev`
- Open `http://localhost:3000` on your browser

### Testing

FRONTEND:

- TODO: Add e2e, component tests
- TODO: Add integration tests with backend

BACKEND:

- TODO: Add unit tests
- TODO: Add integration tests
