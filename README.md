# Rate Limiter API

A lightweight Express.js rate limiter built with TypeScript and Redis. It tracks requests by client IP address and blocks excess traffic when a request threshold is exceeded within a rolling 60-second window.

## Features

- IP-based request tracking using Redis
- Sliding window logic with a 60-second limit
- Default limit of 10 requests per minute per IP
- 429 response when the limit is exceeded
- Dockerized Redis setup for local development
- TypeScript source and production build support

## Tech Stack

- Node.js
- TypeScript
- Express
- Redis
- Docker Compose

## Project Structure

```text
rate-limiter/
├── src/
│   ├── rateLimiter.ts
│   ├── redis.ts
│   └── server.ts
├── docker-compose.yml
├── package.json
├── tsconfig.json
├── README.md
└── dist/ (generated after build)
```

## Prerequisites

- Node.js 18+
- npm
- Docker and Docker Compose
- Redis (or use the included Docker setup)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/DipeshDevkota/rate-limiter.git
cd rate-limiter
```

2. Install dependencies:

```bash
npm install
```

3. Start Redis using Docker Compose:

```bash
docker compose up -d
```

This starts a Redis instance on `localhost:6379`.

## Environment Variables

The application uses the following environment variable:

- `REDIS_URL` — Redis connection string, defaults to `redis://localhost:6379`

Example:

```bash
export REDIS_URL=redis://localhost:6379
```

## Running the Application

### Development mode

```bash
npm run dev
```

### Production build

```bash
npm run build
npm start
```

## API Behavior

The server listens on port `3000` and applies the rate limiter globally to all routes.

### Endpoint

```http
GET /
```

### Response examples

Successful request:

```json
{
  "message": "Rate limiter API is running"
}
```

When rate limit is exceeded:

```json
{
  "error": "Too many requests",
  "message": " Please try again later."
}
```

HTTP status:

```http
429 Too Many Requests
```

The response also includes a `Retry-After` header in seconds.

## Rate Limit Configuration

The default configuration is:

- Window: 60 seconds
- Max requests per IP: 10

These values are defined in `src/rateLimiter.ts` and can be adjusted as needed.

## Docker Setup

The repository includes a Redis container configuration in `docker-compose.yml`:

```yaml
services:
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
```

## Notes

- The limiter uses the client IP (`req.ip` or socket remote address) as the key.
- Redis stores per-IP counters, and entries expire automatically after the rate-limit window.
- If Redis is unavailable, the server returns a `500 Internal Server Error`.


